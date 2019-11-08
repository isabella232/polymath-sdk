import { ImportMock, MockManager } from 'ts-mock-imports';
import { restore, spy, stub } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import {
  BigNumber,
  CappedSTOFundRaiseType as CappedStoCurrency,
  SecurityTokenEvents,
  TransactionReceiptWithDecodedLogs,
} from '@polymathnetwork/contract-wrappers';
import { LaunchCappedSto } from '../../procedures/LaunchCappedSto';
import { Procedure } from '~/procedures/Procedure';
import { PolymathError } from '~/PolymathError';
import { ErrorCode, LaunchCappedStoProcedureArgs, ProcedureType, StoType } from '~/types';
import * as cappedStoFactoryModule from '~/entities/factories/CappedStoFactory';
import * as utilsModule from '~/utils';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import * as moduleWrapperFactoryModule from '../../testUtils/MockedModuleWrapperFactoryModule';
import { Wallet } from '~/Wallet';
import { TransferErc20 } from '~/procedures';
import { mockFactories } from '~/testUtils/mockFactories';
import { CappedSto, SecurityToken } from '~/entities';

const params: LaunchCappedStoProcedureArgs = {
  symbol: 'TEST1',
  startDate: new Date(2030, 1),
  endDate: new Date(2031, 1),
  tokensOnSale: new BigNumber(1000),
  rate: new BigNumber(10),
  currency: CappedStoCurrency.ETH,
  storageWallet: '0x6666666666666666666666666666666666666666',
  treasuryWallet: '0x6666666666666666666666666666666666666666',
};

describe('LaunchCappedSto', () => {
  let target: LaunchCappedSto;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;
  let moduleWrapperFactoryMock: MockManager<
    moduleWrapperFactoryModule.MockedModuleWrapperFactoryModule
  >;
  let polyTokenMock: MockManager<contractWrappersModule.PolyToken>;

  // Mock factories
  let cappedStoFactoryMock: MockManager<cappedStoFactoryModule.CappedStoFactory>;

  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;
  let moduleFactoryMock: MockManager<contractWrappersModule.ModuleFactory_3_0_0>;

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test LaunchCappedSto
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersModule, 'PolymathBase');
    tokenFactoryMock = ImportMock.mockClass(tokenFactoryModule, 'MockedTokenFactoryModule');
    moduleWrapperFactoryMock = ImportMock.mockClass(
      moduleWrapperFactoryModule,
      'MockedModuleWrapperFactoryModule'
    );

    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('tokenFactory', tokenFactoryMock.getMockInstance());
    wrappersMock.set('moduleFactory', moduleWrapperFactoryMock.getMockInstance());

    securityTokenMock = ImportMock.mockClass(contractWrappersModule, 'SecurityToken_3_0_0');
    securityTokenMock.mock('address', Promise.resolve(params.storageWallet));
    securityTokenMock.mock('balanceOf', Promise.resolve(new BigNumber(1)));

    moduleFactoryMock = ImportMock.mockClass(contractWrappersModule, 'ModuleFactory_3_0_0');
    moduleFactoryMock.mock('setupCostInPoly', Promise.resolve(new BigNumber(1)));
    moduleFactoryMock.mock('isCostInPoly', Promise.resolve(false));
    moduleFactoryMock.mock('setupCost', Promise.resolve(new BigNumber(1)));

    tokenFactoryMock.mock(
      'getSecurityTokenInstanceFromTicker',
      securityTokenMock.getMockInstance()
    );
    moduleWrapperFactoryMock.mock('getModuleFactory', moduleFactoryMock.getMockInstance());

    cappedStoFactoryMock = ImportMock.mockClass(cappedStoFactoryModule, 'CappedStoFactory');

    const factoryMockSetup = mockFactories();
    factoryMockSetup.cappedStoFactory = cappedStoFactoryMock.getMockInstance();
    contextMock.set('factories', factoryMockSetup);
    contextMock.set(
      'currentWallet',
      new Wallet({ address: () => Promise.resolve(params.storageWallet) })
    );

    polyTokenMock = ImportMock.mockClass(contractWrappersModule, 'PolyToken');
    polyTokenMock.mock('balanceOf', Promise.resolve(new BigNumber(2)));
    polyTokenMock.mock('address', Promise.resolve(params.treasuryWallet));
    polyTokenMock.mock('allowance', Promise.resolve(new BigNumber(0)));
    wrappersMock.set('polyToken', polyTokenMock.getMockInstance());
    wrappersMock.mock('isTestnet', Promise.resolve(false));

    wrappersMock.mock('getModuleFactoryAddress', Promise.resolve(params.treasuryWallet));

    // Instantiate LaunchCappedSto
    target = new LaunchCappedSto(params, contextMock.getMockInstance());
  });
  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have LaunchCappedSto type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.LaunchCappedSto);
    });
  });

  describe('LaunchCappedSto', () => {
    test('should add a transaction to the queue to launch a capped sto', async () => {
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

    test('should throw if corresponding capped sto event is not fired', async () => {
      ImportMock.mockFunction(utilsModule, 'findEvents', []);

      // Real call
      const resolver = await target.prepareTransactions();

      await expect(resolver.run({} as TransactionReceiptWithDecodedLogs)).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.UnexpectedEventLogs,
          message:
            "The Capped STO was successfully launched but the corresponding event wasn't fired. Please report this issue to the Polymath team.",
        })
      );
    });

    test('should return the capped sto', async () => {
      const stoObject = {
        sto: {
          securityTokenId: () => Promise.resolve(params.symbol),
          stoType: () => Promise.resolve(StoType.Capped),
          address: () => Promise.resolve(params.storageWallet),
        },
      };
      const fetchStub = cappedStoFactoryMock.mock('fetch', stoObject);
      const moduleAddress = '0x3333333333333333333333333333333333333333';
      const findEventsStub = ImportMock.mockFunction(utilsModule, 'findEvents', [
        {
          args: {
            _module: moduleAddress,
          },
        },
      ]);

      // Real call
      const resolver = await target.prepareTransactions();
      await resolver.run({} as TransactionReceiptWithDecodedLogs);

      // Verification for resolver result
      expect(resolver.result).toEqual(stoObject);
      // Verification for fetch
      expect(
        fetchStub.getCall(0).calledWithExactly(
          CappedSto.generateId({
            securityTokenId: SecurityToken.generateId({
              symbol: params.symbol,
            }),
            stoType: StoType.Capped,
            address: moduleAddress,
          })
        )
      ).toEqual(true);
      expect(fetchStub.callCount).toBe(1);
      // Verifications for findEvents
      expect(
        findEventsStub.getCall(0).calledWithMatch({
          eventName: SecurityTokenEvents.ModuleAdded,
        })
      ).toEqual(true);
      expect(findEventsStub.callCount).toBe(1);
    });

    test('should throw if there is no supplied valid security token', async () => {
      tokenFactoryMock
        .mock('getSecurityTokenInstanceFromTicker')
        .withArgs(params.symbol)
        .throws();

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `There is no Security Token with symbol ${params.symbol}`,
        })
      );
    });
  });
});
