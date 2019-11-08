import { ImportMock, MockManager } from 'ts-mock-imports';
import { SinonStub, stub, spy, restore } from 'sinon';
import {
  BigNumber,
  TransactionReceiptWithDecodedLogs,
  FundRaiseType as Currency,
  SecurityTokenEvents,
} from '@polymathnetwork/contract-wrappers';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { LaunchUsdTieredSto } from '../../procedures/LaunchUsdTieredSto';
import { Procedure } from '~/procedures/Procedure';
import { PolymathError } from '~/PolymathError';
import { ErrorCode, LaunchUsdTieredStoProcedureArgs, ProcedureType, StoType } from '~/types';
import * as usdTieredStoFactoryModule from '~/entities/factories/UsdTieredStoFactory';
import * as utilsModule from '~/utils';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import * as moduleWrapperFactoryModule from '../../testUtils/MockedModuleWrapperFactoryModule';
import { Wallet } from '~/Wallet';
import { TransferErc20 } from '~/procedures';
import { mockFactories } from '~/testUtils/mockFactories';
import { SecurityToken, UsdTieredSto } from '~/entities';

const params: LaunchUsdTieredStoProcedureArgs = {
  symbol: 'TEST1',
  startDate: new Date(2030, 1),
  endDate: new Date(2031, 1),
  storageWallet: '0x5555555555555555555555555555555555555555',
  treasuryWallet: '0x6666666666666666666666666666666666666666',
  tiers: [
    {
      tokensOnSale: new BigNumber(1),
      price: new BigNumber(1),
      discountedPrice: new BigNumber(1),
      tokensWithDiscount: new BigNumber(1),
    },
  ],
  nonAccreditedInvestmentLimit: new BigNumber(1),
  minimumInvestment: new BigNumber(1),
  currencies: [Currency.StableCoin],
  usdTokenAddresses: ['0x7777777777777777777777777777777777777777'],
};

describe('LaunchUsdTieredSto', () => {
  let target: LaunchUsdTieredSto;
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
  let usdTieredStoFactoryMock: MockManager<usdTieredStoFactoryModule.UsdTieredStoFactory>;

  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;
  let moduleFactoryMock: MockManager<contractWrappersModule.ModuleFactory_3_0_0>;

  let findEventsStub: SinonStub<any, any>;
  let getAttachedModulesFactoryAddressStub: SinonStub<any, any>;

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test LaunchUsdTieredSto
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

    tokenFactoryStub = tokenFactoryMock.mock(
      'getSecurityTokenInstanceFromTicker',
      securityTokenMock.getMockInstance()
    );
    moduleWrapperFactoryStub = moduleWrapperFactoryMock.mock(
      'getModuleFactory',
      moduleFactoryMock.getMockInstance()
    );
    usdTieredStoFactoryMock = ImportMock.mockClass(
      usdTieredStoFactoryModule,
      'UsdTieredStoFactory'
    );

    const factoryMockSetup = mockFactories();
    factoryMockSetup.usdTieredStoFactory = usdTieredStoFactoryMock.getMockInstance();
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

    getAttachedModulesFactoryAddressStub = wrappersMock.mock(
      'getModuleFactoryAddress',
      Promise.resolve(params.treasuryWallet)
    );

    // Instantiate LaunchUsdTieredSto
    target = new LaunchUsdTieredSto(params, contextMock.getMockInstance());
  });
  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have LaunchUsdTieredSto type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.LaunchUsdTieredSto);
    });
  });

  describe('LaunchUsdTieredSto', () => {
    test('should add the transaction to the queue to launch usd tiered sto and add a procedure to transfer erc20 token', async () => {
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

    test('should throw if corresponding usd tiered sto event is not fired', async () => {
      findEventsStub = ImportMock.mockFunction(utilsModule, 'findEvents', []);

      // Real call
      const resolver = await target.prepareTransactions();

      await expect(resolver.run({} as TransactionReceiptWithDecodedLogs)).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.UnexpectedEventLogs,
          message:
            "The USD Tiered STO was successfully launched but the corresponding event wasn't fired. Please report this issue to the Polymath team.",
        })
      );
    });

    test('should return the usd tiered sto', async () => {
      const stoObject = {
        sto: {
          securityTokenId: () => Promise.resolve(params.symbol),
          stoType: () => Promise.resolve(StoType.UsdTiered),
          address: () => Promise.resolve(params.storageWallet),
        },
      };
      const fetchStub = usdTieredStoFactoryMock.mock('fetch', stoObject);
      const moduleAddress = '0x3333333333333333333333333333333333333333';
      findEventsStub = ImportMock.mockFunction(utilsModule, 'findEvents', [
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
          UsdTieredSto.generateId({
            securityTokenId: SecurityToken.generateId({
              symbol: params.symbol,
            }),
            stoType: StoType.UsdTiered,
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
