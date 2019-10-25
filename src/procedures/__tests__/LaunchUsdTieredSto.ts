import * as sinon from 'sinon';
import { ImportMock, MockManager } from 'ts-mock-imports';
import { SinonStub } from 'sinon';
import BigNumber from 'bignumber.js';
import { TransactionReceiptWithDecodedLogs } from 'ethereum-protocol';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { FundRaiseType as Currency } from '@polymathnetwork/contract-wrappers';
import { LaunchUsdTieredSto } from '../../procedures/LaunchUsdTieredSto';
import { Procedure } from '~/procedures/Procedure';
import { PolymathError } from '~/PolymathError';
import { ErrorCode, LaunchUsdTieredStoProcedureArgs, ProcedureType, StoType } from '~/types';
import * as securityTokenFactoryModule from '~/entities/factories/SecurityTokenFactory';
import * as cappedStoFactoryModule from '~/entities/factories/CappedStoFactory';
import * as checkpointFactoryModule from '~/entities/factories/CheckpointFactory';
import * as dividendDistributionSecurityTokenFactoryModule from '~/entities/factories/DividendDistributionFactory';
import * as erc20DividendsManagerFactoryModule from '~/entities/factories/Erc20DividendsManagerFactory';
import * as erc20TokenBalanceFactoryModule from '~/entities/factories/Erc20TokenBalanceFactory';
import * as ethDividendsManagerFactoryModule from '~/entities/factories/EthDividendsManagerFactory';
import * as investmentFactoryModule from '~/entities/factories/InvestmentFactory';
import * as securityTokenReservationModule from '~/entities/factories/SecurityTokenReservationFactory';
import * as shareholderFactoryModule from '~/entities/factories/ShareholderFactory';
import * as usdTieredStoFactoryModule from '~/entities/factories/UsdTieredStoFactory';
import * as taxWithholdingFactoryModule from '~/entities/factories/TaxWithholdingFactory';
import * as utilsModule from '~/utils';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import * as moduleWrapperFactoryModule from '../../testUtils/MockedModuleWrapperFactoryModule';
import { Wallet } from '~/Wallet';
import { TransferErc20 } from '~/procedures';

const params1: LaunchUsdTieredStoProcedureArgs = {
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
  let securityTokenFactoryMock: MockManager<securityTokenFactoryModule.SecurityTokenFactory>;
  let cappedStoFactoryMock: MockManager<cappedStoFactoryModule.CappedStoFactory>;
  let checkpointFactoryMock: MockManager<checkpointFactoryModule.CheckpointFactory>;
  let dividendDistributionFactoryMock: MockManager<
    dividendDistributionSecurityTokenFactoryModule.DividendDistributionFactory
  >;
  let erc20DividendsManagerFactoryMock: MockManager<
    erc20DividendsManagerFactoryModule.Erc20DividendsManagerFactory
  >;
  let erc20TokenBalanceFactoryMock: MockManager<
    erc20TokenBalanceFactoryModule.Erc20TokenBalanceFactory
  >;
  let ethDividendsManagerFactoryMock: MockManager<
    ethDividendsManagerFactoryModule.EthDividendsManagerFactory
  >;
  let investmentFactoryMock: MockManager<investmentFactoryModule.InvestmentFactory>;
  let securityTokenReservationFactoryMock: MockManager<
    securityTokenReservationModule.SecurityTokenReservationFactory
  >;
  let shareholderFactoryMock: MockManager<shareholderFactoryModule.ShareholderFactory>;
  let usdTieredStoFactoryMock: MockManager<usdTieredStoFactoryModule.UsdTieredStoFactory>;
  let taxWithholdingFactoryMock: MockManager<taxWithholdingFactoryModule.TaxWithholdingFactory>;
  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;
  let moduleFactoryMock: MockManager<contractWrappersModule.ModuleFactory_3_0_0>;

  let findEventsStub: SinonStub<any, any>;
  let getAttachedModulesFactoryAddressStub: SinonStub<any, any>;

  beforeAll(() => {
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
    securityTokenMock.mock('address', Promise.resolve(params1.storageWallet));
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

    securityTokenFactoryMock = ImportMock.mockClass(
      securityTokenFactoryModule,
      'SecurityTokenFactory'
    );
    cappedStoFactoryMock = ImportMock.mockClass(cappedStoFactoryModule, 'CappedStoFactory');
    checkpointFactoryMock = ImportMock.mockClass(checkpointFactoryModule, 'CheckpointFactory');
    dividendDistributionFactoryMock = ImportMock.mockClass(
      dividendDistributionSecurityTokenFactoryModule,
      'DividendDistributionFactory'
    );
    erc20DividendsManagerFactoryMock = ImportMock.mockClass(
      erc20DividendsManagerFactoryModule,
      'Erc20DividendsManagerFactory'
    );
    erc20TokenBalanceFactoryMock = ImportMock.mockClass(
      erc20TokenBalanceFactoryModule,
      'Erc20TokenBalanceFactory'
    );
    ethDividendsManagerFactoryMock = ImportMock.mockClass(
      ethDividendsManagerFactoryModule,
      'EthDividendsManagerFactory'
    );
    investmentFactoryMock = ImportMock.mockClass(investmentFactoryModule, 'InvestmentFactory');
    securityTokenReservationFactoryMock = ImportMock.mockClass(
      securityTokenReservationModule,
      'SecurityTokenReservationFactory'
    );
    shareholderFactoryMock = ImportMock.mockClass(shareholderFactoryModule, 'ShareholderFactory');
    usdTieredStoFactoryMock = ImportMock.mockClass(
      usdTieredStoFactoryModule,
      'UsdTieredStoFactory'
    );
    taxWithholdingFactoryMock = ImportMock.mockClass(
      taxWithholdingFactoryModule,
      'TaxWithholdingFactory'
    );

    const factoryMockSetup = {
      securityTokenFactory: securityTokenFactoryMock.getMockInstance(),
      securityTokenReservationFactory: securityTokenReservationFactoryMock.getMockInstance(),
      erc20TokenBalanceFactory: erc20TokenBalanceFactoryMock.getMockInstance(),
      investmentFactory: investmentFactoryMock.getMockInstance(),
      cappedStoFactory: cappedStoFactoryMock.getMockInstance(),
      usdTieredStoFactory: usdTieredStoFactoryMock.getMockInstance(),
      dividendDistributionFactory: dividendDistributionFactoryMock.getMockInstance(),
      checkpointFactory: checkpointFactoryMock.getMockInstance(),
      erc20DividendsManagerFactory: erc20DividendsManagerFactoryMock.getMockInstance(),
      ethDividendsManagerFactory: ethDividendsManagerFactoryMock.getMockInstance(),
      shareholderFactory: shareholderFactoryMock.getMockInstance(),
      taxWithholdingFactory: taxWithholdingFactoryMock.getMockInstance(),
    };
    contextMock.set('factories', factoryMockSetup);
    contextMock.set(
      'currentWallet',
      new Wallet({ address: () => Promise.resolve(params1.storageWallet) })
    );

    polyTokenMock = ImportMock.mockClass(contractWrappersModule, 'PolyToken');
    polyTokenMock.mock('balanceOf', Promise.resolve(new BigNumber(2)));
    polyTokenMock.mock('address', Promise.resolve(params1.treasuryWallet));
    polyTokenMock.mock('allowance', Promise.resolve(new BigNumber(0)));
    wrappersMock.set('polyToken', polyTokenMock.getMockInstance());
    wrappersMock.mock('isTestnet', Promise.resolve(false));

    getAttachedModulesFactoryAddressStub = wrappersMock.mock(
      'getModuleFactoryAddress',
      Promise.resolve(params1.treasuryWallet)
    );

    // Instantiate LaunchUsdTieredSto
    target = new LaunchUsdTieredSto(params1, contextMock.getMockInstance());
  });
  afterEach(() => {
    sinon.restore();
  });

  describe('Types', () => {
    test('should extend procedure and have LaunchUsdTieredSto type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.LaunchUsdTieredSto);
    });
  });

  describe('LaunchUsdTieredSto', () => {
    test('should send the transaction to LaunchUsdTieredSto', async () => {
      const addProcedureSpy = sinon.spy(target, 'addProcedure');
      const addTransactionSpy = sinon.spy(target, 'addTransaction');
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

      expect(resolver.run({} as TransactionReceiptWithDecodedLogs)).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.UnexpectedEventLogs,
          message:
            "The USD Tiered STO was successfully launched but the corresponding event wasn't fired. Please report this issue to the Polymath team.",
        })
      );
    });

    test('should correctly return the resolver', async () => {
      const stoObject = {
        sto: {
          securityTokenId: () => Promise.resolve(params1.symbol),
          stoType: () => Promise.resolve(StoType.UsdTiered),
          address: () => Promise.resolve(params1.storageWallet),
        },
      };
      const fetchStub = usdTieredStoFactoryMock.mock('fetch', stoObject);
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
      expect(resolver.result).toEqual(stoObject);
      expect(fetchStub.callCount).toBe(1);
    });

    test('should throw if there is no supplied valid security token', async () => {
      tokenFactoryMock.set(
        'getSecurityTokenInstanceFromTicker',
        sinon
          .stub()
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
