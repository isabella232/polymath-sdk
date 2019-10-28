import { ImportMock, MockManager } from 'ts-mock-imports';
import { SinonStub, stub, spy, restore } from 'sinon';
import BigNumber from 'bignumber.js';
import { TransactionReceiptWithDecodedLogs } from 'ethereum-protocol';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { MintTokens } from '../../procedures/MintTokens';
import { Procedure } from '~/procedures/Procedure';
import * as shareholdersEntityModule from '~/entities/SecurityToken/Shareholders';
import * as securityTokenEntityModule from '~/entities/SecurityToken/SecurityToken';
import { PolymathError } from '~/PolymathError';
import { ErrorCode, MintTokensProcedureArgs, ProcedureType } from '~/types';
import * as securityTokenFactoryModule from '~/entities/factories/SecurityTokenFactory';
import * as shareholderFactoryModule from '~/entities/factories/ShareholderFactory';
import * as utilsModule from '~/utils';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import * as moduleWrapperFactoryModule from '../../testUtils/MockedModuleWrapperFactoryModule';
import { Wallet } from '~/Wallet';
import { TransferErc20 } from '~/procedures';
import { mockFactories } from '~/testUtils/MockFactories';

const testAddress = '0x6666666666666666666666666666666666666666';
const testAddress2 = '0x9999999999999999999999999999999999999999';
const params1: MintTokensProcedureArgs = {
  symbol: 'TEST1',
  mintingData: [
    {
      address: testAddress,
      amount: new BigNumber(1),
    },
  ],
};

describe('MintTokens', () => {
  let target: MintTokens;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;
  let moduleWrapperFactoryMock: MockManager<
    moduleWrapperFactoryModule.MockedModuleWrapperFactoryModule
  >;
  let polyTokenMock: MockManager<contractWrappersModule.PolyToken>;
  let tokenFactoryStub: SinonStub<any, any>;
  let moduleWrapperFactoryStub: SinonStub<any, any>;

  // Mock factories
  let securityTokenFactoryMock: MockManager<securityTokenFactoryModule.SecurityTokenFactory>;
  let shareholderFactoryMock: MockManager<shareholderFactoryModule.ShareholderFactory>;
  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;
  let moduleFactoryMock: MockManager<contractWrappersModule.ModuleFactory_3_0_0>;
  securityTokenFactoryMock = ImportMock.mockClass(
    securityTokenFactoryModule,
    'SecurityTokenFactory'
  );
  shareholderFactoryMock = ImportMock.mockClass(shareholderFactoryModule, 'ShareholderFactory');
  let shareholdersEntityMock: MockManager<shareholdersEntityModule.Shareholders>;

  let securityTokenEntityMock: MockManager<securityTokenEntityModule.SecurityToken>;

  let findEventsStub: SinonStub<any, any>;
  let getAttachedModulesFactoryAddressStub: SinonStub<any, any>;

  beforeAll(() => {
    // Mock the context, wrappers, and tokenFactory to test MintTokens
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersModule, 'PolymathBase');
    tokenFactoryMock = ImportMock.mockClass(tokenFactoryModule, 'MockedTokenFactoryModule');
    moduleWrapperFactoryMock = ImportMock.mockClass(
      moduleWrapperFactoryModule,
      'MockedModuleWrapperFactoryModule'
    );

    shareholdersEntityMock = ImportMock.mockClass(shareholdersEntityModule, 'Shareholders');

    securityTokenEntityMock = ImportMock.mockClass(securityTokenEntityModule, 'SecurityToken');

    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('tokenFactory', tokenFactoryMock.getMockInstance());
    wrappersMock.set('moduleFactory', moduleWrapperFactoryMock.getMockInstance());

    securityTokenMock = ImportMock.mockClass(contractWrappersModule, 'SecurityToken_3_0_0');
    securityTokenMock.mock('address', Promise.resolve(testAddress));
    securityTokenMock.mock('balanceOf', Promise.resolve(new BigNumber(1)));

    moduleFactoryMock = ImportMock.mockClass(contractWrappersModule, 'ModuleFactory_3_0_0');
    moduleFactoryMock.mock('setupCostInPoly', Promise.resolve(new BigNumber(1)));
    moduleFactoryMock.mock('isCostInPoly', Promise.resolve(false));
    moduleFactoryMock.mock('setupCost', Promise.resolve(new BigNumber(1)));

    tokenFactoryStub = tokenFactoryMock.mock(
      'getSecurityTokenInstanceFromTicker',
      securityTokenMock.getMockInstance()
    );
    moduleWrapperFactoryStub = moduleWrapperFactoryMock.mock(
      'getModuleFactory',
      moduleFactoryMock.getMockInstance()
    );

    const factoryMockSetup = mockFactories();

    contextMock.set('currentWallet', new Wallet({ address: () => Promise.resolve(testAddress) }));

    polyTokenMock = ImportMock.mockClass(contractWrappersModule, 'PolyToken');
    polyTokenMock.mock('balanceOf', Promise.resolve(new BigNumber(2)));
    polyTokenMock.mock('address', Promise.resolve(testAddress));
    polyTokenMock.mock('allowance', Promise.resolve(new BigNumber(0)));
    wrappersMock.set('polyToken', polyTokenMock.getMockInstance());
    wrappersMock.mock('isTestnet', Promise.resolve(false));

    getAttachedModulesFactoryAddressStub = wrappersMock.mock(
      'getModuleFactoryAddress',
      Promise.resolve(testAddress)
    );

    const shareHolders = [
      {
        address: testAddress,
        canSendAfter: new Date(Date.now()),
        canReceiveAfter: new Date(Date.now()),
        kycExpiry: new Date(Date.now()),
        canBuyFromSto: true,
        isAccredited: true,
      },
      {
        address: testAddress2,
        canSendAfter: new Date(Date.now()),
        canReceiveAfter: new Date(Date.now()),
        kycExpiry: new Date(Date.now()),
        canBuyFromSto: true,
        isAccredited: true,
      },
    ];
    shareholdersEntityMock.mock('getShareholders', shareHolders);
    securityTokenEntityMock.mock('shareholders', shareholdersEntityMock.getMockInstance());
    securityTokenFactoryMock.mock('fetch', securityTokenFactoryMock.getMockInstance());
    factoryMockSetup.securityTokenFactory = securityTokenFactoryMock.getMockInstance();
    factoryMockSetup.shareholderFactory = shareholderFactoryMock.getMockInstance();
    contextMock.set('factories', factoryMockSetup);

    // Instantiate MintTokens
    target = new MintTokens(params1, contextMock.getMockInstance());
  });
  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have MintTokens type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.MintTokens);
    });
  });

  describe('MintTokens', () => {
    test('should send the transaction to MintTokens', async () => {
      const addProcedureSpy = spy(target, 'addProcedure');
      const addTransactionSpy = spy(target, 'addTransaction');
      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(securityTokenMock.getMockInstance().addModuleWithLabel)
      ).toEqual(true);
      expect(addTransactionSpy.callCount).toEqual(1);
      expect(addProcedureSpy.getCall(0).calledWith(TransferErc20)).toEqual(true);
      expect(addProcedureSpy.callCount).toEqual(1);
    });

    test('should correctly return the resolver', async () => {
      const shareholderObject = {
        shareholder: {
          securityTokenId: () => Promise.resolve(params1.symbol),
          address: () => Promise.resolve(testAddress),
        },
      };
      const fetchStub = shareholderFactoryMock.mock('fetch', shareholderObject);
      findEventsStub = ImportMock.mockFunction(utilsModule, 'findEvents', [
        {
          args: {
            _module: '0x3333333333333333333333333333333333333333',
          },
        },
      ]);

      // Real call
      const resolver = await target.prepareTransactions();
      await resolver.run({} as TransactionReceiptWithDecodedLogs);
      expect(resolver.result).toEqual(shareholderObject);
      expect(fetchStub.callCount).toBe(1);
    });

    test('should throw if there is no valid security token supplied', async () => {
      tokenFactoryMock.set(
        'getSecurityTokenInstanceFromTicker',
        stub()
          .withArgs({ address: params1.symbol })
          .throws()
      );

      expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `There is no Security Token with symbol ${params1.symbol}`,
        })
      );
    });
  });
});
