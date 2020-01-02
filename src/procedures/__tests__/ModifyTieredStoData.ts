/* eslint-disable import/no-duplicates */
import { ImportMock, MockManager } from 'ts-mock-imports';
import { restore, SinonStub, spy } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { BigNumber, ContractVersion } from '@polymathnetwork/contract-wrappers';
import { FundRaiseType } from '@polymathnetwork/contract-wrappers';
import * as modifyTieredStoDataModule from '../ModifyTieredStoData';
import { ModifyTieredStoData } from '../ModifyTieredStoData';
import { Procedure } from '../Procedure';
import { PolymathError } from '../../PolymathError';
import {
  Currency,
  ErrorCode,
  ModifyTieredStoDataProcedureArgs,
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

const polyTokenAddress = '0x8888888888888888888888888888888888888888';
const erc20TokenAddress = '0x9999999999999999999999999999999999999999';

const tieredParams: ModifyTieredStoDataProcedureArgs = {
  symbol: 'TEST1',
  stoAddress: '0x5555555555555555555555555555555555555555',
  startDate: new Date(2030, 1),
  endDate: new Date(2040, 1),
  nonAccreditedInvestmentLimit: new BigNumber(1),
  minimumInvestment: new BigNumber(1),
  currencies: [Currency.StableCoin],
  stableCoinAddresses: ['0x7777777777777777777777777777777777777777'],
};

const raisedFundsWallet = '0x5555555555555555555555555555555555555555';
const unsoldTokensWallet = '0x6666666666666666666666666666666666666666';
const treasuryWallet = unsoldTokensWallet;
const currentWalletAddress = '0x2222222222222222222222222222222222222222';
const customCurrency = {
  currencySymbol: 'USD',
  ethOracleAddress: '0x8888888888888888888888888888888888888888',
  polyOracleAddress: '0x8888888888888888888888888888888888888888',
};
const tieredStoObject = {
  nonAccreditedInvestmentLimit: tieredParams.nonAccreditedInvestmentLimit,
  minimumInvestment: tieredParams.minimumInvestment,
  startDate: tieredParams.startDate,
  endDate: tieredParams.endDate,
  fundraiseCurrencies: tieredParams.currencies,
  raisedFundsWallet,
  stableCoinAddresses: tieredParams.stableCoinAddresses,
  tiers: [
    {
      tokensOnSale: new BigNumber(1),
      price: new BigNumber(1),
    },
  ],
};

describe('ModifyTieredStoData', () => {
  let target: ModifyTieredStoData;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let securityTokenFactoryMock: MockManager<securityTokenFactoryModule.SecurityTokenFactory>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;
  let moduleWrapperFactoryMock: MockManager<
    moduleWrapperFactoryModule.MockedModuleWrapperFactoryModule
  >;
  let polyTokenMock: MockManager<contractWrappersModule.PolyToken>;
  let erc20TokenMock: MockManager<contractWrappersModule.ERC20>;
  let tieredSto_3_0_0_Mock: MockManager<contractWrappersModule.USDTieredSTO_3_0_0>;
  let tieredSto_3_1_0_Mock: MockManager<contractWrappersModule.USDTieredSTO_3_1_0>;

  // Mock factories
  let tieredStoFactoryMock: MockManager<tieredStoFactoryModule.TieredStoFactory>;

  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;

  let factoryMockSetup: Factories;
  let securityTokenId: string;
  let tieredStoId: string;

  let getCustomOracleAddressStub: SinonStub;

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test ModifyTieredStoData
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

    wrappersMock.set('polyToken', polyTokenMock.getMockInstance());

    tieredStoFactoryMock = ImportMock.mockClass(tieredStoFactoryModule, 'TieredStoFactory');

    factoryMockSetup = mockFactories();
    factoryMockSetup.tieredStoFactory = tieredStoFactoryMock.getMockInstance();
    factoryMockSetup.securityTokenFactory = securityTokenFactoryMock.getMockInstance();
    contextMock.set('factories', factoryMockSetup);

    tieredSto_3_1_0_Mock = ImportMock.mockClass(contractWrappersModule, 'CappedSTO_3_1_0');
    tieredSto_3_0_0_Mock = ImportMock.mockClass(contractWrappersModule, 'CappedSTO_3_1_0');

    tieredSto_3_0_0_Mock.set('contractVersion', ContractVersion.V3_0_0);
    tieredSto_3_1_0_Mock.set('contractVersion', ContractVersion.V3_1_0);
    getCustomOracleAddressStub = tieredSto_3_1_0_Mock.mock(
      'getCustomOracleAddress',
      Promise.resolve()
    );
    getCustomOracleAddressStub
      .withArgs({ fundRaiseType: FundRaiseType.ETH })
      .returns(Promise.resolve(customCurrency.ethOracleAddress));
    getCustomOracleAddressStub
      .withArgs({ fundRaiseType: FundRaiseType.POLY })
      .returns(Promise.resolve(customCurrency.polyOracleAddress));
    tieredSto_3_1_0_Mock.mock(
      'denominatedCurrency',
      Promise.resolve(customCurrency.currencySymbol)
    );

    securityTokenId = SecurityToken.generateId({ symbol: tieredParams.symbol });
    tieredStoId = TieredSto.generateId({
      securityTokenId,
      stoType: StoType.Tiered,
      address: tieredParams.stoAddress,
    });

    moduleWrapperFactoryMock.mock('getModuleInstance', tieredSto_3_1_0_Mock.getMockInstance());
    contextMock.set(
      'currentWallet',
      new Wallet({ address: () => Promise.resolve(currentWalletAddress) })
    );

    tieredSto_3_1_0_Mock.mock('isFinalized', Promise.resolve(false));

    tieredStoFactoryMock.mock('fetch', tieredStoObject);

    wrappersMock.mock('getTreasuryWallet', Promise.resolve(treasuryWallet));

    // Instantiate ModifyTieredStoData with a tiered sto
    target = new ModifyTieredStoData(tieredParams, contextMock.getMockInstance());
  });

  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have ModifyTieredStoData type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.ModifyTieredStoData);
    });
  });

  describe('ModifyTieredStoData', () => {
    test('should add a transaction to the queue to modify times', async () => {
      target = new ModifyTieredStoData(
        {
          ...tieredParams,
          startDate: new Date(2031, 1),
          endDate: new Date(2041, 1),
        },
        contextMock.getMockInstance()
      );
      const addTransactionSpy = spy(target, 'addTransaction');
      tieredSto_3_1_0_Mock.mock('modifyTimes', Promise.resolve('ModifyTimes'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy.getCall(0).calledWith(tieredSto_3_1_0_Mock.getMockInstance().modifyTimes)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.ModifyTimes);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should add a transaction to the queue to modify fund raise currency to ETH', async () => {
      target = new ModifyTieredStoData(
        {
          ...tieredParams,
          currencies: [Currency.ETH],
        },
        contextMock.getMockInstance()
      );
      const addTransactionSpy = spy(target, 'addTransaction');
      tieredSto_3_1_0_Mock.mock('modifyFunding', Promise.resolve('ModifyFunding'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(tieredSto_3_1_0_Mock.getMockInstance().modifyFunding)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.ModifyFunding);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should add a transaction to the queue to modify fund raise currency to POLY', async () => {
      target = new ModifyTieredStoData(
        {
          ...tieredParams,
          currencies: [Currency.POLY],
        },
        contextMock.getMockInstance()
      );
      const addTransactionSpy = spy(target, 'addTransaction');
      tieredSto_3_1_0_Mock.mock('modifyFunding', Promise.resolve('ModifyFunding'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(tieredSto_3_1_0_Mock.getMockInstance().modifyFunding)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.ModifyFunding);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should add a transaction to the queue to modify fund raise currency to stable coin', async () => {
      tieredStoFactoryMock.mock('fetch', {
        ...tieredStoObject,
        fundraiseCurrencies: [Currency.POLY, Currency.ETH],
      });
      const addTransactionSpy = spy(target, 'addTransaction');
      tieredSto_3_1_0_Mock.mock('modifyFunding', Promise.resolve('ModifyFunding'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(tieredSto_3_1_0_Mock.getMockInstance().modifyFunding)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.ModifyFunding);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should add a transaction to the queue to modify times with a V3.0.0 wrapper', async () => {
      target = new ModifyTieredStoData(
        {
          ...tieredParams,
          startDate: new Date(2031, 1),
          endDate: new Date(2041, 1),
          customCurrency: undefined,
        },
        contextMock.getMockInstance()
      );
      moduleWrapperFactoryMock.mock('getModuleInstance', tieredSto_3_0_0_Mock.getMockInstance());
      const addTransactionSpy = spy(target, 'addTransaction');
      tieredSto_3_0_0_Mock.mock('modifyTimes', Promise.resolve('ModifyTimes'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy.getCall(0).calledWith(tieredSto_3_0_0_Mock.getMockInstance().modifyTimes)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.ModifyTimes);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should add a transaction to the queue to modify all oracle information', async () => {
      target = new ModifyTieredStoData(
        {
          ...tieredParams,
          customCurrency: {
            currencySymbol: 'CAD',
            ethOracleAddress: '0x0123456789012345678901234567890123456789',
            polyOracleAddress: '0x1123456789012345678901234567890123456789',
          },
        },
        contextMock.getMockInstance()
      );

      const addTransactionSpy = spy(target, 'addTransaction');
      tieredSto_3_1_0_Mock.mock('modifyOracles', Promise.resolve('ModifyOracles'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(tieredSto_3_1_0_Mock.getMockInstance().modifyOracles)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.ModifyOracles);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should add a transaction to the queue to modify currency symbol oracle', async () => {
      target = new ModifyTieredStoData(
        {
          ...tieredParams,
          customCurrency: {
            currencySymbol: 'THISONE',
            ethOracleAddress: undefined,
            polyOracleAddress: undefined,
          },
        },
        contextMock.getMockInstance()
      );

      const addTransactionSpy = spy(target, 'addTransaction');
      tieredSto_3_1_0_Mock.mock('modifyOracles', Promise.resolve('ModifyOracles'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(tieredSto_3_1_0_Mock.getMockInstance().modifyOracles)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.ModifyOracles);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should add a transaction to the queue to modify eth oracle address', async () => {
      target = new ModifyTieredStoData(
        {
          ...tieredParams,
          customCurrency: {
            currencySymbol: undefined,
            ethOracleAddress: '0x0123456789012345678901234567890123456789',
            polyOracleAddress: undefined,
          },
        },
        contextMock.getMockInstance()
      );

      const addTransactionSpy = spy(target, 'addTransaction');
      tieredSto_3_1_0_Mock.mock('modifyOracles', Promise.resolve('ModifyOracles'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(tieredSto_3_1_0_Mock.getMockInstance().modifyOracles)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.ModifyOracles);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should add a transaction to the queue to modify poly oracle address', async () => {
      target = new ModifyTieredStoData(
        {
          ...tieredParams,
          customCurrency: {
            currencySymbol: undefined,
            ethOracleAddress: undefined,
            polyOracleAddress: '0x1123456789012345678901234567890123456789',
          },
        },
        contextMock.getMockInstance()
      );

      const addTransactionSpy = spy(target, 'addTransaction');
      tieredSto_3_1_0_Mock.mock('modifyOracles', Promise.resolve('ModifyOracles'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(tieredSto_3_1_0_Mock.getMockInstance().modifyOracles)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.ModifyOracles);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should add a transaction to the queue to modify limits', async () => {
      target = new ModifyTieredStoData(
        {
          ...tieredParams,
          nonAccreditedInvestmentLimit: new BigNumber(123),
          minimumInvestment: new BigNumber(123),
        },
        contextMock.getMockInstance()
      );
      const addTransactionSpy = spy(target, 'addTransaction');
      tieredSto_3_1_0_Mock.mock('modifyLimits', Promise.resolve('ModifyLimits'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy.getCall(0).calledWith(tieredSto_3_1_0_Mock.getMockInstance().modifyLimits)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.ModifyLimits);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should add a transaction to the queue to modify limits without a non accredited investment limit', async () => {
      target = new ModifyTieredStoData(
        {
          ...tieredParams,
          nonAccreditedInvestmentLimit: undefined,
          minimumInvestment: new BigNumber(123),
        },
        contextMock.getMockInstance()
      );
      const addTransactionSpy = spy(target, 'addTransaction');
      tieredSto_3_1_0_Mock.mock('modifyLimits', Promise.resolve('ModifyLimits'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy.getCall(0).calledWith(tieredSto_3_1_0_Mock.getMockInstance().modifyLimits)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.ModifyLimits);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should add a transaction to the queue to modify limits without a minimum investment', async () => {
      target = new ModifyTieredStoData(
        {
          ...tieredParams,
          nonAccreditedInvestmentLimit: new BigNumber(123),
          minimumInvestment: undefined,
        },
        contextMock.getMockInstance()
      );
      const addTransactionSpy = spy(target, 'addTransaction');
      tieredSto_3_1_0_Mock.mock('modifyLimits', Promise.resolve('ModifyLimits'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy.getCall(0).calledWith(tieredSto_3_1_0_Mock.getMockInstance().modifyLimits)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.ModifyLimits);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should add a transaction to the queue to modify raisedFundsWallet', async () => {
      target = new ModifyTieredStoData(
        {
          ...tieredParams,
          raisedFundsWallet: '0x0123456789012345678901234567890123456789',
        },
        contextMock.getMockInstance()
      );
      const addTransactionSpy = spy(target, 'addTransaction');
      tieredSto_3_1_0_Mock.mock('modifyAddresses', Promise.resolve('ModifyAddresses'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(tieredSto_3_1_0_Mock.getMockInstance().modifyAddresses)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.ModifyAddresses);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should add a transaction to the queue to modify unsoldTokensWallet', async () => {
      target = new ModifyTieredStoData(
        {
          ...tieredParams,
          unsoldTokensWallet: '0x0123456789012345678901234567890123456789',
        },
        contextMock.getMockInstance()
      );
      const addTransactionSpy = spy(target, 'addTransaction');
      tieredSto_3_1_0_Mock.mock('modifyAddresses', Promise.resolve('ModifyAddresses'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(tieredSto_3_1_0_Mock.getMockInstance().modifyAddresses)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.ModifyAddresses);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should add a transaction to the queue to modify addresses without a stable coin address', async () => {
      target = new ModifyTieredStoData(
        {
          ...tieredParams,
          raisedFundsWallet: '0x0123456789012345678901234567890123456789',
          unsoldTokensWallet: '0x1123456789012345678901234567890123456789',
          stableCoinAddresses: undefined,
        },
        contextMock.getMockInstance()
      );
      const addTransactionSpy = spy(target, 'addTransaction');
      tieredSto_3_1_0_Mock.mock('modifyAddresses', Promise.resolve('ModifyAddresses'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(tieredSto_3_1_0_Mock.getMockInstance().modifyAddresses)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.ModifyAddresses);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should add a transaction to the queue to modify tiers', async () => {
      target = new ModifyTieredStoData(
        {
          ...tieredParams,
          tiers: [
            {
              tokensOnSale: new BigNumber(123),
              price: new BigNumber(123),
              tokensWithDiscount: new BigNumber(10),
              discountedPrice: new BigNumber(20),
            },
          ],
        },
        contextMock.getMockInstance()
      );
      const addTransactionSpy = spy(target, 'addTransaction');
      tieredSto_3_1_0_Mock.mock('modifyTiers', Promise.resolve('ModifyTiers'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy.getCall(0).calledWith(tieredSto_3_1_0_Mock.getMockInstance().modifyTiers)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.ModifyTiers);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should add a transaction to the queue to modify 6 different pieces of sto information', async () => {
      target = new ModifyTieredStoData(
        {
          symbol: 'TEST1',
          stoAddress: '0x5555555555555555555555555555555555555555',
          startDate: new Date(2035, 1),
          endDate: new Date(2045, 1),
          raisedFundsWallet: '0x1111111111111111111111111111111111111111',
          unsoldTokensWallet: '0x2222222222222222222222222222222222222222',
          tiers: [
            {
              tokensOnSale: new BigNumber(123),
              price: new BigNumber(123),
            },
          ],
          nonAccreditedInvestmentLimit: new BigNumber(123),
          minimumInvestment: new BigNumber(113),
          currencies: [Currency.ETH, Currency.POLY],
          stableCoinAddresses: ['0x7777777777777777777777777777777777777777'],
          customCurrency: {
            currencySymbol: 'CAD',
            ethOracleAddress: '0x6666666666666666666666666666666666666666',
            polyOracleAddress: '0x9999999999999999999999999999999999999999',
          },
        },
        contextMock.getMockInstance()
      );
      const addTransactionSpy = spy(target, 'addTransaction');
      tieredSto_3_1_0_Mock.mock('modifyTimes', Promise.resolve('ModifyTimes'));
      tieredSto_3_1_0_Mock.mock('modifyTiers', Promise.resolve('ModifyTiers'));
      tieredSto_3_1_0_Mock.mock('modifyFunding', Promise.resolve('ModifyFunding'));
      tieredSto_3_1_0_Mock.mock('modifyOracles', Promise.resolve('ModifyOracles'));
      tieredSto_3_1_0_Mock.mock('modifyLimits', Promise.resolve('ModifyLimits'));
      tieredSto_3_1_0_Mock.mock('modifyAddresses', Promise.resolve('ModifyAddresses'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy.getCall(0).calledWith(tieredSto_3_1_0_Mock.getMockInstance().modifyTimes)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.ModifyTimes);
      expect(
        addTransactionSpy
          .getCall(1)
          .calledWith(tieredSto_3_1_0_Mock.getMockInstance().modifyFunding)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(1).lastArg.tag).toEqual(PolyTransactionTag.ModifyFunding);
      expect(
        addTransactionSpy
          .getCall(2)
          .calledWith(tieredSto_3_1_0_Mock.getMockInstance().modifyOracles)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(2).lastArg.tag).toEqual(PolyTransactionTag.ModifyOracles);
      expect(
        addTransactionSpy.getCall(3).calledWith(tieredSto_3_1_0_Mock.getMockInstance().modifyTiers)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(3).lastArg.tag).toEqual(PolyTransactionTag.ModifyTiers);
      expect(
        addTransactionSpy.getCall(4).calledWith(tieredSto_3_1_0_Mock.getMockInstance().modifyLimits)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(4).lastArg.tag).toEqual(PolyTransactionTag.ModifyLimits);
      expect(
        addTransactionSpy
          .getCall(5)
          .calledWith(tieredSto_3_1_0_Mock.getMockInstance().modifyAddresses)
      ).toEqual(true);
      expect(addTransactionSpy.getCall(5).lastArg.tag).toEqual(PolyTransactionTag.ModifyAddresses);
      expect(addTransactionSpy.callCount).toEqual(6);
    });

    test('should throw an error if custom currencies are used with 3_0_0 wrapper', async () => {
      target = new ModifyTieredStoData(
        {
          ...tieredParams,
          customCurrency,
        },
        contextMock.getMockInstance()
      );
      moduleWrapperFactoryMock.mock('getModuleInstance', tieredSto_3_0_0_Mock.getMockInstance());
      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.InvalidAddress,
          message: `Custom currency not supported in Tiered STO v3.0`,
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

    test('should throw if the tiered sto data has not been modified, there are no transactions to add to queue', async () => {
      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.InvalidAddress,
          message: `Modify STO data failed: nothing to modify`,
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

    test('should throw an error as there can be no modifications if the sto has already started', async () => {
      tieredStoFactoryMock.mock('fetch', {
        ...tieredStoObject,
        startDate: new Date(2010, 0),
      });

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `Cannot modify STO data: STO has already started`,
        })
      );
    });

    test('should successfully refresh the tiered sto factory with its resolver method using a poly transaction tag', async () => {
      const refreshStub = tieredStoFactoryMock.mock('refresh', Promise.resolve());
      const tag = PolyTransactionTag.ModifyOracles;
      const addedTransactions = [PolyTransactionTag.ModifyTimes, tag];
      await modifyTieredStoDataModule.createTieredStoFactoryRefreshResolver(
        factoryMockSetup.tieredStoFactory,
        addedTransactions,
        tag,
        tieredStoId
      )();

      expect(refreshStub.getCall(0).calledWithExactly(tieredStoId)).toEqual(true);
      expect(refreshStub.callCount).toEqual(1);
    });

    test('should not refresh tiered sto factory in the resolver if the tag does not match the final transaction', async () => {
      const refreshStub = tieredStoFactoryMock.mock('refresh', Promise.resolve());
      const tag = PolyTransactionTag.ModifyOracles;
      const addedTransactions = [tag, PolyTransactionTag.ModifyTimes];
      await modifyTieredStoDataModule.createTieredStoFactoryRefreshResolver(
        factoryMockSetup.tieredStoFactory,
        addedTransactions,
        tag,
        tieredStoId
      )();
      expect(refreshStub.callCount).toEqual(0);
    });
  });
});
