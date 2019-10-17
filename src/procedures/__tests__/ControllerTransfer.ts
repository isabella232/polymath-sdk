import * as sinon from 'sinon';
import { ImportMock, MockManager } from 'ts-mock-imports';
import { SinonStub } from 'sinon';
import BigNumber from 'bignumber.js';
import * as contractWrappersObject from '@polymathnetwork/contract-wrappers';
import { TransactionReceiptWithDecodedLogs } from 'ethereum-protocol';
import * as contextObject from '../../Context';
import * as wrappersObject from '../../PolymathBase';
import { Wallet } from '../../Wallet';
import * as tokenFactoryObject from '../../testUtils/MockedTokenFactoryObject';
import { ControllerTransfer } from '../../procedures/ControllerTransfer';
import { Procedure } from '~/procedures/Procedure';
import { PolymathError } from '~/PolymathError';
import { ErrorCode } from '~/types';
import * as securityTokenFactoryObject from '~/entities/factories/SecurityTokenFactory';
import * as cappedStoFactoryObject from '~/entities/factories/CappedStoFactory';
import * as checkpointFactoryObject from '~/entities/factories/CheckpointFactory';
import * as dividendDistributionSecurityTokenFactoryObject from '~/entities/factories/DividendDistributionFactory';
import * as erc20DividendsManagerFactoryObject from '~/entities/factories/Erc20DividendsManagerFactory';
import * as erc20TokenBalanceFactoryObject from '~/entities/factories/Erc20TokenBalanceFactory';
import * as ethDividendsManagerFactoryObject from '~/entities/factories/EthDividendsManagerFactory';
import * as investmentFactoryObject from '~/entities/factories/InvestmentFactory';
import * as securityTokenReservationObject from '~/entities/factories/SecurityTokenReservationFactory';
import * as shareholderFactoryObject from '~/entities/factories/ShareholderFactory';
import * as usdTieredStoFactoryObject from '~/entities/factories/UsdTieredStoFactory';
import * as taxWithholdingFactoryObject from '~/entities/factories/TaxWithholdingFactory';
import * as utilsModule from '~/utils';

const params1 = {
  symbol: 'TEST1',
  name: 'Test Token 1',
  address: '0x1111111111111111111111111111111111111111',
  owner: '0x3333333333333333333333333333333333333333',
  amount: new BigNumber(1),
};

describe('ControllerTransfer', () => {
  let target: ControllerTransfer;
  let contextMock: MockManager<contextObject.Context>;
  let wrappersMock: MockManager<wrappersObject.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryObject.MockedTokenFactoryObject>;
  let securityTokenMock: MockManager<contractWrappersObject.SecurityToken_3_0_0>;
  let tokenFactoryMockStub: SinonStub<any, any>;

  // Mock factories
  let securityTokenFactoryMock: MockManager<securityTokenFactoryObject.SecurityTokenFactory>;
  let cappedStoFactoryMock: MockManager<cappedStoFactoryObject.CappedStoFactory>;
  let checkpointFactoryMock: MockManager<checkpointFactoryObject.CheckpointFactory>;
  let dividendDistributionFactoryMock: MockManager<
    dividendDistributionSecurityTokenFactoryObject.DividendDistributionFactory
  >;
  let erc20DividendsManagerFactoryMock: MockManager<
    erc20DividendsManagerFactoryObject.Erc20DividendsManagerFactory
  >;
  let erc20TokenBalanceFactoryMock: MockManager<
    erc20TokenBalanceFactoryObject.Erc20TokenBalanceFactory
  >;
  let ethDividendsManagerFactoryMock: MockManager<
    ethDividendsManagerFactoryObject.EthDividendsManagerFactory
  >;
  let investmentFactoryMock: MockManager<investmentFactoryObject.InvestmentFactory>;
  let securityTokenReservationFactoryMock: MockManager<
    securityTokenReservationObject.SecurityTokenReservationFactory
  >;
  let shareholderFactoryMock: MockManager<shareholderFactoryObject.ShareholderFactory>;
  let usdTieredStoFactoryMock: MockManager<usdTieredStoFactoryObject.UsdTieredStoFactory>;
  let taxWithholdingFactoryMock: MockManager<taxWithholdingFactoryObject.TaxWithholdingFactory>;

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test CreateCheckpoint
    contextMock = ImportMock.mockClass(contextObject, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersObject, 'PolymathBase');
    tokenFactoryMock = ImportMock.mockClass(tokenFactoryObject, 'MockedTokenFactoryObject');

    securityTokenMock = ImportMock.mockClass(contractWrappersObject, 'SecurityToken_3_0_0');
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
      securityTokenFactoryObject,
      'SecurityTokenFactory'
    );
    cappedStoFactoryMock = ImportMock.mockClass(cappedStoFactoryObject, 'CappedStoFactory');
    checkpointFactoryMock = ImportMock.mockClass(checkpointFactoryObject, 'CheckpointFactory');
    dividendDistributionFactoryMock = ImportMock.mockClass(
      dividendDistributionSecurityTokenFactoryObject,
      'DividendDistributionFactory'
    );
    erc20DividendsManagerFactoryMock = ImportMock.mockClass(
      erc20DividendsManagerFactoryObject,
      'Erc20DividendsManagerFactory'
    );
    erc20TokenBalanceFactoryMock = ImportMock.mockClass(
      erc20TokenBalanceFactoryObject,
      'Erc20TokenBalanceFactory'
    );
    ethDividendsManagerFactoryMock = ImportMock.mockClass(
      ethDividendsManagerFactoryObject,
      'EthDividendsManagerFactory'
    );
    investmentFactoryMock = ImportMock.mockClass(investmentFactoryObject, 'InvestmentFactory');
    securityTokenReservationFactoryMock = ImportMock.mockClass(
      securityTokenReservationObject,
      'SecurityTokenReservationFactory'
    );
    shareholderFactoryMock = ImportMock.mockClass(shareholderFactoryObject, 'ShareholderFactory');
    usdTieredStoFactoryMock = ImportMock.mockClass(
      usdTieredStoFactoryObject,
      'UsdTieredStoFactory'
    );
    taxWithholdingFactoryMock = ImportMock.mockClass(
      taxWithholdingFactoryObject,
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
      expect(target.type).toBe('ControllerTransfer');
    });
  });

  describe('ControllerTransfer', () => {
    test('should send the transaction to ControllerTransfer', async () => {
      const spyOnAddTransaction = sinon.spy(target, 'addTransaction');
      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        spyOnAddTransaction.withArgs(securityTokenMock.getMockInstance().controllerTransfer)
          .callCount
      ).toBe(1);
    });

    test('should correctly return the resolver', async () => {
      const createStub = securityTokenFactoryMock.mock('create', {
        permissions: {
          securityTokenId: () => Promise.resolve(params1.symbol),
          index: () => Promise.resolve(1),
        },
      });

      // Real call
      const resolver = await target.prepareTransactions();
      await resolver.run({} as TransactionReceiptWithDecodedLogs);
      expect(createStub.callCount).toBe(1);
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

    test('should throw error if balanceOf is less than amount', async () => {
      securityTokenMock.mock('balanceOf', Promise.resolve(new BigNumber(0)));
      // Real call
      expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.InsufficientBalance,
          message: `Sender's balance of 0 is less than the requested amount of ${params1.amount.toNumber()}`,
        })
      );
    });

    test('should throw error if current wallet is not controller', async () => {
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
