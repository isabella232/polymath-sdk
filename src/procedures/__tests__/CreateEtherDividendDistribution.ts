import * as sinon from 'sinon';
import { ImportMock, MockManager } from 'ts-mock-imports';
import { SinonStub } from 'sinon';
import BigNumber from 'bignumber.js';
import { TransactionReceiptWithDecodedLogs } from 'ethereum-protocol';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { CreateEtherDividendDistribution } from '../../procedures/CreateEtherDividendDistribution';
import { Procedure } from '~/procedures/Procedure';
import { PolymathError } from '~/PolymathError';
import { ErrorCode, ProcedureType } from '~/types';
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
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryObject';

const params1 = {
  symbol: 'TEST1',
  name: 'Test Token 1',
  amount: new BigNumber(1),
  checkpointIndex: 1,
  maturityDate: new Date(2030, 1),
  expiryDate: new Date(2031, 1),
};

describe('CreateEtherDividendDistribution', () => {
  let target: CreateEtherDividendDistribution;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryObject>;
  let gpmMock: MockManager<contractWrappersModule.GeneralPermissionManager_3_0_0>;
  let etherDividendsMock: MockManager<contractWrappersModule.EtherDividendCheckpoint_3_0_0>;
  let tokenFactoryMockStub: SinonStub<any, any>;
  let getAttachedModulesMockStub: SinonStub<any, any>;

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
  let findEventsStub: SinonStub<any, any>;

  beforeAll(() => {
    // Mock the context, wrappers, and tokenFactory to test CreateEtherDividendDistribution
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersModule, 'PolymathBase');
    tokenFactoryMock = ImportMock.mockClass(tokenFactoryModule, 'MockedTokenFactoryObject');
    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('tokenFactory', tokenFactoryMock.getMockInstance());

    gpmMock = ImportMock.mockClass(contractWrappersModule, 'GeneralPermissionManager_3_0_0');
    etherDividendsMock = ImportMock.mockClass(
      contractWrappersModule,
      'EtherDividendCheckpoint_3_0_0'
    );
    getAttachedModulesMockStub = wrappersMock.mock(
      'getAttachedModules',
      Promise.resolve([etherDividendsMock])
    );
    tokenFactoryMockStub = tokenFactoryMock.mock('getSecurityTokenInstanceFromTicker', {});

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

    // Instantiate CreateEtherDividendDistribution
    target = new CreateEtherDividendDistribution(
      {
        symbol: params1.symbol,
        maturityDate: params1.maturityDate,
        expiryDate: params1.expiryDate,
        amount: params1.amount,
        checkpointIndex: params1.checkpointIndex,
        name: params1.name,
      },
      contextMock.getMockInstance()
    );
  });
  afterEach(() => {
    sinon.restore();
  });

  describe('Types', () => {
    test('should extend procedure and have CreateEtherDividendDistribution type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.CreateEtherDividendDistribution);
    });
  });

  describe('CreateEtherDividendDistribution', () => {
    test('should send the transaction to CreateEtherDividendDistribution', async () => {
      const addTransactionSpy = sinon.spy(target, 'addTransaction');
      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy.withArgs(etherDividendsMock.getMockInstance().setWithholding).callCount
      ).toBe(1);
      expect(
        addTransactionSpy.withArgs(
          etherDividendsMock.getMockInstance().createDividendWithCheckpointAndExclusions
        ).callCount
      ).toBe(1);
    });

    test('should send the transaction to CreateEtherDividendDistribution with taxwithholdings', async () => {
      target = new CreateEtherDividendDistribution(
        {
          symbol: params1.symbol,
          maturityDate: params1.maturityDate,
          expiryDate: params1.expiryDate,
          amount: params1.amount,
          checkpointIndex: params1.checkpointIndex,
          name: params1.name,
          taxWithholdings: [
            {
              address: '0x5555555555555555555555555555555555555555',
              percentage: 50,
            },
          ],
        },
        contextMock.getMockInstance()
      );

      const addTransactionSpy = sinon.spy(target, 'addTransaction');
      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy.withArgs(etherDividendsMock.getMockInstance().setWithholding).callCount
      ).toBe(2);
      expect(
        addTransactionSpy.withArgs(
          etherDividendsMock.getMockInstance().createDividendWithCheckpointAndExclusions
        ).callCount
      ).toBe(2);
    });

    test('should throw if corresponding event is not fired', async () => {
      findEventsStub = ImportMock.mockFunction(utilsModule, 'findEvents', []);

      // Real call
      const resolver = await target.prepareTransactions();

      expect(resolver.run({} as TransactionReceiptWithDecodedLogs)).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.UnexpectedEventLogs,
          message:
            "The ETH Dividend Distribution was successfully created but the corresponding event wasn't fired. Please report this issue to the Polymath team.",
        })
      );
    });

    test('should correctly return the resolver', async () => {
      const dividendObject = {
        permissions: {
          securityTokenId: () => Promise.resolve(params1.symbol),
          index: () => Promise.resolve(1),
        },
      };
      const fetchStub = dividendDistributionFactoryMock.mock('fetch', dividendObject);
      findEventsStub = ImportMock.mockFunction(utilsModule, 'findEvents', [
        {
          args: {
            _dividendIndex: new BigNumber(1),
          },
        },
      ]);

      // Real call
      const resolver = await target.prepareTransactions();
      await resolver.run({} as TransactionReceiptWithDecodedLogs);
      expect(resolver.result).toEqual(dividendObject);
      expect(fetchStub.callCount).toBe(1);
    });

    test('should throw if eth dividends manager has not been enabled', async () => {
      getAttachedModulesMockStub = wrappersMock.mock('getAttachedModules', Promise.resolve([]));
      // Real call
      expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: "The ETH Dividends Manager hasn't been enabled",
        })
      );
    });

    test('should throw if there is no valid security token supplied', async () => {
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
