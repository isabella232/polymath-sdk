/* eslint-disable import/no-duplicates */
import { ImportMock, MockManager } from 'ts-mock-imports';
import { SinonStub, spy, restore } from 'sinon';
import {
  BigNumber,
  TransactionReceiptWithDecodedLogs,
  FundRaiseType as Currency,
  SecurityTokenEvents,
} from '@polymathnetwork/contract-wrappers';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { LaunchTieredSto } from '../../procedures/LaunchTieredSto';
import { Procedure } from '../Procedure';
import { PolymathError } from '../../PolymathError';
import {
  ErrorCode,
  LaunchTieredStoProcedureArgs,
  PolyTransactionTag,
  ProcedureType,
  StoType,
} from '../../types';
import * as tieredStoFactoryModule from '../../entities/factories/TieredStoFactory';
import * as utilsModule from '../../utils';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import * as moduleWrapperFactoryModule from '../../testUtils/MockedModuleWrapperFactoryModule';
import { Wallet } from '../../Wallet';
import { TransferErc20 } from '../../procedures';
import { mockFactories } from '../../testUtils/mockFactories';
import { SecurityToken, TieredSto } from '../../entities';

const params: LaunchTieredStoProcedureArgs = {
  symbol: 'TEST1',
  startDate: new Date(2030, 1),
  endDate: new Date(2031, 1),
  raisedFundsWallet: '0x5555555555555555555555555555555555555555',
  unsoldTokensWallet: '0x6666666666666666666666666666666666666666',
  tiers: [
    {
      tokensOnSale: new BigNumber(1),
      price: new BigNumber(1),
    },
  ],
  nonAccreditedInvestmentLimit: new BigNumber(1),
  minimumInvestment: new BigNumber(1),
  currencies: [Currency.StableCoin],
  stableCoinAddresses: ['0x7777777777777777777777777777777777777777'],
  customCurrency: {
    currencySymbol: 'USD',
    ethOracleAddress: '0x8888888888888888888888888888888888888888',
    polyOracleAddress: '0x8888888888888888888888888888888888888888',
  },
};

const currentWallet = '0x8888888888888888888888888888888888888888';
const securityTokenAddress = '0x9999999999999999999999999999999999999999';
const polyTokenAddress = '0x5555555555555555555555555555555555555555';
const moduleFactoryAddress = '0x4444444444444444444444444444444444444444';
const costInPoly = new BigNumber(5);
const costIn = new BigNumber(6);

describe('LaunchTieredSto', () => {
  let target: LaunchTieredSto;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;
  let moduleWrapperFactoryMock: MockManager<
    moduleWrapperFactoryModule.MockedModuleWrapperFactoryModule
  >;
  let polyTokenMock: MockManager<contractWrappersModule.PolyToken>;

  // Mock factories
  let tieredStoFactoryMock: MockManager<tieredStoFactoryModule.TieredStoFactory>;

  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;
  let moduleFactoryMock: MockManager<contractWrappersModule.ModuleFactory_3_0_0>;

  let findEventsStub: SinonStub<any, any>;

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test LaunchTieredSto
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
    securityTokenMock.mock('address', Promise.resolve(securityTokenAddress));
    securityTokenMock.mock('balanceOf', Promise.resolve(new BigNumber(10)));

    moduleFactoryMock = ImportMock.mockClass(contractWrappersModule, 'ModuleFactory_3_0_0');
    moduleFactoryMock.mock('setupCostInPoly', Promise.resolve(costInPoly));
    moduleFactoryMock.mock('isCostInPoly', Promise.resolve(false));
    moduleFactoryMock.mock('setupCost', Promise.resolve(costIn));

    tokenFactoryMock.mock(
      'getSecurityTokenInstanceFromTicker',
      securityTokenMock.getMockInstance()
    );
    moduleWrapperFactoryMock.mock('getModuleFactory', moduleFactoryMock.getMockInstance());
    tieredStoFactoryMock = ImportMock.mockClass(tieredStoFactoryModule, 'TieredStoFactory');

    const factoryMockSetup = mockFactories();
    factoryMockSetup.tieredStoFactory = tieredStoFactoryMock.getMockInstance();
    contextMock.set('factories', factoryMockSetup);
    contextMock.set('currentWallet', new Wallet({ address: () => Promise.resolve(currentWallet) }));

    polyTokenMock = ImportMock.mockClass(contractWrappersModule, 'PolyToken');
    polyTokenMock.mock('balanceOf', Promise.resolve(new BigNumber(20)));
    polyTokenMock.mock('address', Promise.resolve(polyTokenAddress));
    polyTokenMock.mock('allowance', Promise.resolve(new BigNumber(0)));
    wrappersMock.set('polyToken', polyTokenMock.getMockInstance());
    wrappersMock.mock('isTestnet', Promise.resolve(false));

    wrappersMock.mock('getModuleFactoryAddress', Promise.resolve(moduleFactoryAddress));

    // Instantiate LaunchTieredSto
    target = new LaunchTieredSto(params, contextMock.getMockInstance());
  });
  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have LaunchTieredSto type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.LaunchTieredSto);
    });
  });

  describe('LaunchTieredSto', () => {
    test('should add the transaction to the queue to launch usd tiered sto and add a procedure to transfer erc20 token', async () => {
      const addProcedureSpy = spy(target, 'addProcedure');
      const addTransactionSpy = spy(target, 'addTransaction');
      securityTokenMock.mock('addModuleWithLabel', Promise.resolve('AddModuleWithLabel'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(securityTokenMock.getMockInstance().addModuleWithLabel)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.fees).toEqual({
        usd: costIn,
        poly: costInPoly,
      });
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.EnableTieredSto);
      expect(addTransactionSpy.callCount).toEqual(1);
      expect(addProcedureSpy.getCall(0).calledWithExactly(TransferErc20)).toEqual(true);
      expect(addProcedureSpy.callCount).toEqual(1);
    });

    test('should add the transaction to the queue to launch usd tiered sto with cost in poly', async () => {
      const addProcedureSpy = spy(target, 'addProcedure');
      const addTransactionSpy = spy(target, 'addTransaction');
      securityTokenMock.mock('addModuleWithLabel', Promise.resolve('AddModuleWithLabel'));
      moduleFactoryMock.mock('isCostInPoly', Promise.resolve(true));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(securityTokenMock.getMockInstance().addModuleWithLabel)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.fees).toEqual({
        usd: null,
        poly: costInPoly,
      });
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.EnableTieredSto);
      expect(addTransactionSpy.callCount).toEqual(1);
      expect(addProcedureSpy.getCall(0).calledWithExactly(TransferErc20)).toEqual(true);
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
            "The Tiered STO was successfully launched but the corresponding event wasn't fired. Please report this issue to the Polymath team.",
        })
      );
    });

    test('should return the usd tiered sto object information', async () => {
      const stoObject = {
        securityTokenId: params.symbol,
        stoType: StoType.Tiered,
        address: securityTokenAddress,
      };
      const fetchStub = tieredStoFactoryMock.mock('fetch', Promise.resolve(stoObject));
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
          TieredSto.generateId({
            securityTokenId: SecurityToken.generateId({
              symbol: params.symbol,
            }),
            stoType: StoType.Tiered,
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

    test('should throw if using a custom currency, raising in ETH and not providing a valid ETH oracle address', async () => {
      target = new LaunchTieredSto(
        {
          ...params,
          currencies: [Currency.ETH],
          customCurrency: {
            currencySymbol: 'CAD',
          },
        },
        contextMock.getMockInstance()
      );

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: "Must provide ETH oracle for 'CAD'",
        })
      );
    });

    test('should throw if using a custom currency, raising in POLY and not providing a valid POLY oracle address', async () => {
      target = new LaunchTieredSto(
        {
          ...params,
          currencies: [Currency.POLY],
          customCurrency: {
            currencySymbol: 'CAD',
          },
        },
        contextMock.getMockInstance()
      );

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: "Must provide POLY oracle for 'CAD'",
        })
      );
    });
  });
});
