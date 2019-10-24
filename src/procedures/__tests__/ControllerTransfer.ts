import * as sinon from 'sinon';
import { ImportMock, MockManager } from 'ts-mock-imports';
import { SinonStub } from 'sinon';
import BigNumber from 'bignumber.js';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import { Wallet } from '../../Wallet';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryObject';
import { ControllerTransfer } from '../../procedures/ControllerTransfer';
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

const params1 = {
  symbol: 'TEST1',
  name: 'Test Token 1',
  address: '0x1111111111111111111111111111111111111111',
  owner: '0x3333333333333333333333333333333333333333',
  amount: new BigNumber(1),
};

describe('ControllerTransfer', () => {
  let target: ControllerTransfer;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryObject>;
  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;
  let tokenFactoryMockStub: SinonStub<any, any>;

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

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test CreateCheckpoint
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersModule, 'PolymathBase');
    tokenFactoryMock = ImportMock.mockClass(tokenFactoryModule, 'MockedTokenFactoryObject');

    securityTokenMock = ImportMock.mockClass(contractWrappersModule, 'SecurityToken_3_0_0');
    securityTokenMock.mock('balanceOf', Promise.resolve(params1.amount));
    securityTokenMock.mock('controller', Promise.resolve(params1.owner));
    const ownerPromise = new Promise<string>((resolve, reject) => {
      resolve(params1.owner);
    });
    contextMock.set('currentWallet', new Wallet({ address: () => ownerPromise }));
    tokenFactoryMockStub = tokenFactoryMock.mock(
      'getSecurityTokenInstanceFromTicker',
      securityTokenMock.getMockInstance()
    );

    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('tokenFactory', tokenFactoryMock.getMockInstance());

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

    // Instantiate ControllerTransfer
    target = new ControllerTransfer(
      {
        from: params1.address,
        to: params1.owner,
        amount: params1.amount,
        symbol: params1.symbol,
      },
      contextMock.getMockInstance()
    );
  });

  describe('Types', () => {
    test('should extend procedure and have ControllerTransfer type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.ControllerTransfer);
    });
  });

  describe('ControllerTransfer', () => {
    test('should send the transaction to ControllerTransfer', async () => {
      const addTransactionSpy = sinon.spy(target, 'addTransaction');
      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy.withArgs(securityTokenMock.getMockInstance().controllerTransfer).callCount
      ).toBe(1);
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

    test('should throw error if balanceOf is less than amount being transferred', async () => {
      securityTokenMock.mock('balanceOf', Promise.resolve(new BigNumber(0)));
      // Real call
      expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.InsufficientBalance,
          message: `Sender's balance of 0 is less than the requested amount of ${params1.amount.toNumber()}`,
        })
      );
    });

    test('should throw error if current wallet is not controller to perform forced transfers', async () => {
      securityTokenMock.mock('controller', Promise.resolve('Random'));
      // Real call
      expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `You must be the controller of this Security Token to perform forced transfers. Did you remember to call "setController"?`,
        })
      );
    });

    test('should call error on inappropriate params address', async () => {
      // Instantiate ControllerTransfer with incorrect args instead
      target = new ControllerTransfer(
        {
          from: params1.owner,
          to: 'Inappropriate',
          amount: params1.amount,
          symbol: params1.symbol,
        },
        contextMock.getMockInstance()
      );
      // Real call rejects
      expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.InvalidAddress,
          message: `Provided "to" address is invalid: Inappropriate`,
        })
      );
    });
  });
});
