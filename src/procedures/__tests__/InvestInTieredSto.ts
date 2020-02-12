/* eslint-disable import/no-duplicates */
import { ImportMock, MockManager } from 'ts-mock-imports';
import { restore, spy } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { BigNumber, FundRaiseType } from '@polymathnetwork/contract-wrappers';
import * as investInTieredStoModule from '../InvestInTieredSto';
import { InvestInTieredSto } from '../InvestInTieredSto';
import { Procedure } from '../Procedure';
import { PolymathError } from '../../PolymathError';
import {
  Currency,
  ErrorCode,
  InvestInTieredStoProcedureArgs,
  PolyTransactionTag,
  ProcedureType,
  StoType,
} from '../../types';
import * as tieredStoFactoryModule from '../../entities/factories/TieredStoFactory';
import * as contextModule from '../../Context';
import { Factories } from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import * as moduleWrapperFactoryModule from '../../testUtils/MockedModuleWrapperFactoryModule';
import { mockFactories } from '../../testUtils/mockFactories';
import { SecurityToken, TieredSto } from '../../entities';
import * as securityTokenFactoryModule from '../../entities/factories/SecurityTokenFactory';
import { Wallet } from '../../Wallet';
import { ApproveErc20 } from '../../procedures';

const treasuryWallet = '0x1111111111111111111111111111111111111111';
const currentWalletAddress = '0x2222222222222222222222222222222222222222';
const polyTokenAddress = '0x8888888888888888888888888888888888888888';
const erc20TokenAddress = '0x9999999999999999999999999999999999999999';

const tieredParams: InvestInTieredStoProcedureArgs = {
  symbol: 'TEST1',
  stoAddress: '0x5555555555555555555555555555555555555555',
  stableCoinAddress: '0x6666666666666666666666666666666666666666',
  amount: new BigNumber(2),
  currency: Currency.StableCoin,
  minTokens: new BigNumber(1),
  beneficiary: '0x3333333333333333333333333333333333333333',
};

const tieredStoObject = {
  isFinalized: false,
  isPaused: false,
  startDate: new Date(2010, 1),
  beneficialInvestmentsAllowed: true,
  fundraiseCurrencies: [Currency.StableCoin],
};

describe('InvestInTieredSto', () => {
  let target: InvestInTieredSto;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let securityTokenFactoryMock: MockManager<securityTokenFactoryModule.SecurityTokenFactory>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;
  let moduleWrapperFactoryMock: MockManager<
    moduleWrapperFactoryModule.MockedModuleWrapperFactoryModule
  >;
  let polyTokenMock: MockManager<contractWrappersModule.PolyToken>;
  let erc20TokenMock: MockManager<contractWrappersModule.ERC20>;
  let tieredStoMock: MockManager<contractWrappersModule.USDTieredSTO_3_1_0>;

  // Mock factories
  let tieredStoFactoryMock: MockManager<tieredStoFactoryModule.TieredStoFactory>;

  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;

  let factoryMockSetup: Factories;
  let securityTokenId: string;
  let tieredStoId: string;

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test InvestInTieredSto
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

    securityTokenFactoryMock = ImportMock.mockClass(
      securityTokenFactoryModule,
      'SecurityTokenFactory'
    );

    tokenFactoryMock.mock(
      'getSecurityTokenInstanceFromTicker',
      securityTokenMock.getMockInstance()
    );

    polyTokenMock = ImportMock.mockClass(contractWrappersModule, 'PolyToken');
    polyTokenMock.mock('balanceOf', new BigNumber(10));
    polyTokenMock.mock('address', polyTokenAddress);
    polyTokenMock.mock('allowance', new BigNumber(10));

    erc20TokenMock = ImportMock.mockClass(contractWrappersModule, 'ERC20');
    erc20TokenMock.mock('balanceOf', Promise.resolve(new BigNumber(10)));
    erc20TokenMock.mock('address', Promise.resolve(erc20TokenAddress));
    erc20TokenMock.mock('allowance', Promise.resolve(new BigNumber(10)));

    wrappersMock.mock('getERC20TokenWrapper', erc20TokenMock.getMockInstance());

    wrappersMock.mock('isTestnet', false);
    wrappersMock.set('polyToken', polyTokenMock.getMockInstance());

    tieredStoFactoryMock = ImportMock.mockClass(tieredStoFactoryModule, 'TieredStoFactory');

    factoryMockSetup = mockFactories();
    factoryMockSetup.tieredStoFactory = tieredStoFactoryMock.getMockInstance();
    factoryMockSetup.securityTokenFactory = securityTokenFactoryMock.getMockInstance();
    contextMock.set('factories', factoryMockSetup);

    tieredStoMock = ImportMock.mockClass(contractWrappersModule, 'CappedSTO_3_1_0');

    securityTokenId = SecurityToken.generateId({ symbol: tieredParams.symbol });
    tieredStoId = TieredSto.generateId({
      securityTokenId,
      stoType: StoType.Tiered,
      address: tieredParams.stoAddress,
    });

    moduleWrapperFactoryMock.mock('getModuleInstance', tieredStoMock.getMockInstance());
    contextMock.set(
      'currentWallet',
      new Wallet({ address: () => Promise.resolve(currentWalletAddress) })
    );

    tieredStoMock.mock('isFinalized', Promise.resolve(false));

    tieredStoFactoryMock.mock('fetch', tieredStoObject);

    wrappersMock.mock('getTreasuryWallet', Promise.resolve(treasuryWallet));

    // Instantiate InvestInTieredSto with a tiered sto
    target = new InvestInTieredSto(tieredParams, contextMock.getMockInstance());
  });

  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have InvestInTieredSto type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.InvestInTieredSto);
    });
  });

  describe('InvestInTieredSto', () => {
    test('should add a transaction to the queue to invest in a tiered sto with stablecoin', async () => {
      const addTransactionSpy = spy(target, 'addTransaction');
      const addProcedureSpy = spy(target, 'addProcedure');
      tieredStoMock.mock('buyWithUSDRateLimited', Promise.resolve('BuyWithUSDRateLimited'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(tieredStoMock.getMockInstance().buyWithUSDRateLimited)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(
        PolyTransactionTag.BuyWithScRateLimited
      );
      expect(addTransactionSpy.callCount).toEqual(1);
      expect(addProcedureSpy.getCall(0).calledWithExactly(ApproveErc20)).toEqual(true);
      expect(addProcedureSpy.callCount).toEqual(1);
    });

    test('should add a transaction to the queue to invest in a tiered sto with stablecoin without minimum tokens or beneficiary specified', async () => {
      target = new InvestInTieredSto(
        {
          ...tieredParams,
          minTokens: undefined,
          beneficiary: undefined,
        },
        contextMock.getMockInstance()
      );
      const addTransactionSpy = spy(target, 'addTransaction');
      const addProcedureSpy = spy(target, 'addProcedure');
      tieredStoMock.mock('buyWithUSDRateLimited', Promise.resolve('BuyWithUSDRateLimited'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(tieredStoMock.getMockInstance().buyWithUSDRateLimited)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(
        PolyTransactionTag.BuyWithScRateLimited
      );
      expect(addTransactionSpy.callCount).toEqual(1);
      expect(addProcedureSpy.getCall(0).calledWithExactly(ApproveErc20)).toEqual(true);
      expect(addProcedureSpy.callCount).toEqual(1);
    });

    test('should throw an error if the arguments indicate the currency is stable coin, but stable coin is not listed as a fundraise currency type', async () => {
      tieredStoFactoryMock.mock('fetch', {
        ...tieredStoObject,
        fundraiseCurrencies: [FundRaiseType.ETH],
      });
      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `STO ${
            tieredParams.stoAddress
          } doesn't support investments in the selected currency`,
        })
      );
    });

    test('should add a transaction to the queue to invest in a tiered sto with POLY', async () => {
      target = new InvestInTieredSto(
        {
          ...tieredParams,
          currency: Currency.POLY,
          stableCoinAddress: undefined,
        },
        contextMock.getMockInstance()
      );
      tieredStoFactoryMock.mock('fetch', {
        ...tieredStoObject,
        fundraiseCurrencies: [FundRaiseType.POLY],
      });
      const addTransactionSpy = spy(target, 'addTransaction');
      tieredStoMock.mock('buyWithPOLYRateLimited', Promise.resolve('BuyWithPOLYRateLimited'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(tieredStoMock.getMockInstance().buyWithPOLYRateLimited)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(
        PolyTransactionTag.BuyWithPolyRateLimited
      );
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should throw an error if the arguments indicate the currency is POLY, but POLY is not listed as a fundraise currency type', async () => {
      target = new InvestInTieredSto(
        {
          ...tieredParams,
          currency: Currency.POLY,
          stableCoinAddress: undefined,
        },
        contextMock.getMockInstance()
      );

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `STO ${
            tieredParams.stoAddress
          } doesn't support investments in the selected currency`,
        })
      );
    });

    test('should add a transaction to the queue to invest in a tiered sto with ETH', async () => {
      target = new InvestInTieredSto(
        {
          ...tieredParams,
          currency: Currency.ETH,
          stableCoinAddress: undefined,
        },
        contextMock.getMockInstance()
      );
      tieredStoFactoryMock.mock('fetch', {
        ...tieredStoObject,
        fundraiseCurrencies: [FundRaiseType.ETH],
      });
      const addTransactionSpy = spy(target, 'addTransaction');
      tieredStoMock.mock('buyWithETHRateLimited', Promise.resolve('BuyWithETHRateLimited'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(tieredStoMock.getMockInstance().buyWithETHRateLimited)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(
        PolyTransactionTag.BuyWithEthRateLimited
      );
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should throw an error if the arguments indicate the currency is ETH, but ETH is not listed as a fundraise currency type', async () => {
      target = new InvestInTieredSto(
        {
          ...tieredParams,
          currency: Currency.ETH,
          stableCoinAddress: undefined,
        },
        contextMock.getMockInstance()
      );

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `STO ${
            tieredParams.stoAddress
          } doesn't support investments in the selected currency`,
        })
      );
    });

    test('should throw an error if the tiered sto has not yet been launched or is archived', async () => {
      moduleWrapperFactoryMock.mock('getModuleInstance', Promise.resolve(undefined));

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.InvalidAddress,
          message: `STO ${tieredParams.stoAddress} is either archived or hasn't been launched`,
        })
      );
    });

    test('should throw if there is an invalid sto address', async () => {
      target = new InvestInTieredSto(
        {
          ...tieredParams,
          stoAddress: 'invalid',
        },
        contextMock.getMockInstance()
      );
      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.InvalidAddress,
          message: `Invalid STO address invalid`,
        })
      );
    });

    test('should throw if there is no valid security token supplied', async () => {
      tokenFactoryMock
        .mock('getSecurityTokenInstanceFromTicker')
        .withArgs(tieredParams.symbol)
        .throws();

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `There is no Security Token with symbol ${tieredParams.symbol}`,
        })
      );
    });

    test('should throw an error if the sto has already been finalized', async () => {
      tieredStoFactoryMock.mock('fetch', {
        ...tieredStoObject,
        isFinalized: true,
      });

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `STO ${tieredParams.stoAddress} has already been finalized`,
        })
      );
    });

    test('should throw an error if the sto start date is in the future', async () => {
      tieredStoFactoryMock.mock('fetch', {
        ...tieredStoObject,
        startDate: new Date(2040, 0),
      });

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `Cannot invest in STO ${tieredParams.stoAddress} because it hasn't started yet`,
        })
      );
    });

    test('should throw an error if beneficial investments are not allowed and the parameters include a beneficiary address', async () => {
      tieredStoFactoryMock.mock('fetch', {
        ...tieredStoObject,
        beneficialInvestmentsAllowed: false,
      });

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `Cannot invest on behalf of ${
            tieredParams.beneficiary
          } because this STO doesn't allow beneficial investments`,
        })
      );
    });

    test('should throw an error if the sto is paused', async () => {
      tieredStoFactoryMock.mock('fetch', {
        ...tieredStoObject,
        isPaused: true,
      });

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `STO ${tieredParams.stoAddress} is paused`,
        })
      );
    });

    test('should successfully refresh the tiered sto factory with its resolver method', async () => {
      const refreshStub = tieredStoFactoryMock.mock('refresh', Promise.resolve());
      await investInTieredStoModule.createRefreshTieredStoFactoryResolver(
        factoryMockSetup,
        tieredStoId
      )();

      expect(refreshStub.getCall(0).calledWithExactly(tieredStoId)).toEqual(true);
      expect(refreshStub.callCount).toEqual(1);
    });

    test('should successfully refresh the security token factory with its resolver method', async () => {
      const refreshStub = securityTokenFactoryMock.mock('refresh', Promise.resolve());
      await investInTieredStoModule.createRefreshSecurityTokenFactoryResolver(
        factoryMockSetup,
        securityTokenId
      )();

      expect(refreshStub.getCall(0).calledWithExactly(securityTokenId)).toEqual(true);
      expect(refreshStub.callCount).toEqual(1);
    });
  });
});
