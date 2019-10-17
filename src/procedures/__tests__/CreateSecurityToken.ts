import * as sinon from 'sinon';
import { ImportMock, MockManager } from 'ts-mock-imports';
import BigNumber from 'bignumber.js';
import * as contractWrappersObject from '@polymathnetwork/contract-wrappers';
import { SinonStub } from 'sinon';
import * as contextObject from '../../Context';
import * as wrappersObject from '../../PolymathBase';
import * as approvalObject from '../ApproveErc20';
import { CreateSecurityToken } from '../../procedures/CreateSecurityToken';
import { Procedure } from '~/procedures/Procedure';
import { Wallet } from '~/Wallet';
import { PolymathError } from '~/PolymathError';
import { ErrorCode } from '~/types';
import { ApproveErc20 } from '../ApproveErc20';
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
import { TransactionReceiptWithDecodedLogs } from 'ethereum-protocol';
import * as utilsModule from '~/utils';

const params1 = {
  symbol: 'TEST1',
  name: 'Test Token 1',
  address: '0x1111111111111111111111111111111111111111',
  owner: '0x3333333333333333333333333333333333333333',
  amount: new BigNumber(1),
  divisible: false,
};

describe('CreateSecurityToken', () => {
  let target: CreateSecurityToken;
  let contextMock: MockManager<contextObject.Context>;
  let wrappersMock: MockManager<wrappersObject.PolymathBase>;
  let approvalMock: MockManager<approvalObject.ApproveErc20>;
  let prepareApprovalTransactionsStub: SinonStub<any, any>;

  let securityTokenRegistryMock: MockManager<contractWrappersObject.SecurityTokenRegistry>;

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
  let findEventsStub: SinonStub<any, any>;

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test
    contextMock = ImportMock.mockClass(contextObject, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersObject, 'PolymathBase');

    // Import mock for approveErc20
    approvalMock = ImportMock.mockClass(approvalObject, 'ApproveErc20');
    prepareApprovalTransactionsStub = approvalMock.mock('prepareTransactions', Promise.resolve());
    approvalMock.set('transactions' as any, []);
    approvalMock.set('fees' as any, []);

    securityTokenRegistryMock = ImportMock.mockClass(
      contractWrappersObject,
      'SecurityTokenRegistry'
    );

    securityTokenRegistryMock.mock('tickerAvailable', Promise.resolve(false));
    securityTokenRegistryMock.mock('isTickerRegisteredByCurrentIssuer', Promise.resolve(true));
    securityTokenRegistryMock.mock('isTokenLaunched', Promise.resolve(false));
    securityTokenRegistryMock.mock(
      'getFees',
      Promise.resolve([new BigNumber(1), new BigNumber(1)])
    );
    securityTokenRegistryMock.mock('address', Promise.resolve(params1.address));

    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('securityTokenRegistry', securityTokenRegistryMock.getMockInstance());

    const ownerPromise = new Promise<string>((resolve, reject) => {
      resolve(params1.owner);
    });
    contextMock.set('currentWallet', new Wallet({ address: () => ownerPromise }));
    wrappersMock.mock('isTestnet', Promise.resolve(false));

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

    // Instantiate CreateSecurityToken
    target = new CreateSecurityToken(
      {
        name: params1.name,
        symbol: params1.symbol,
        divisible: params1.divisible,
      },
      contextMock.getMockInstance()
    );
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Types', () => {
    test('should extend procedure and have CreateSecurityToken type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe('CreateSecurityToken');
    });
  });

  describe('CreateSecurityToken', () => {
    test('should throw error if token is not reserved ', async () => {
      securityTokenRegistryMock.mock('tickerAvailable', Promise.resolve(true));
      // Real call
      expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `The security token symbol ${
            params1.symbol
          } hasn't been reserved. You need to call "reserveSecurityToken" first.`,
        })
      );
    });

    test('should throw if corresponding event is not fired', async () => {
      findEventsStub = ImportMock.mockFunction(utilsModule, 'findEvents', []);

      // Real call
      const resolver = await target.prepareTransactions();

      expect(resolver.run({} as TransactionReceiptWithDecodedLogs)).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.UnexpectedEventLogs,
          message:
            "The Security Token was successfully created but the corresponding event wasn't fired. Please report this issue to the Polymath team.",
        })
      );
    });

    test('should correctly return the resolver', async () => {
      const creationObject = {
        creation: {
          name: () => Promise.resolve(params1.name),
          owner: () => Promise.resolve(params1.owner),
          address: () => Promise.resolve(params1.address),
        },
      };
      const createStub = securityTokenFactoryMock.mock('create', creationObject);
      findEventsStub = ImportMock.mockFunction(utilsModule, 'findEvents', [
        {
          args: {
            _ticker: params1.symbol,
            _name: params1.name,
            _owner: params1.owner,
            _securityTokenAddress: params1.address,
          },
        },
      ]);

      // Real call
      const resolver = await target.prepareTransactions();
      await resolver.run({} as TransactionReceiptWithDecodedLogs);
      expect(resolver.result).toEqual(creationObject);
      expect(createStub.callCount).toBe(1);
    });

    test('should throw error if token has been reserved by other user', async () => {
      securityTokenRegistryMock.mock('isTickerRegisteredByCurrentIssuer', Promise.resolve(false));
      // Real call
      expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `The security token symbol ${
            params1.symbol
          } has already been reserved by another issuer."`,
        })
      );
    });

    test('should throw error if token has already been launched', async () => {
      securityTokenRegistryMock.mock('isTokenLaunched', Promise.resolve(true));
      // Real call
      expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `The security token symbol ${params1.symbol} has already been launched."`,
        })
      );
    });

    test('should send the transaction to CreateSecurityToken', async () => {
      const spyOnAddProcedure = sinon.spy(target, 'addProcedure');
      const spyOnAddTransaction = sinon.spy(target, 'addTransaction');
      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        spyOnAddTransaction.withArgs(
          securityTokenRegistryMock.getMockInstance().generateNewSecurityToken
        ).callCount
      ).toBe(1);
      expect(spyOnAddProcedure.withArgs(ApproveErc20).callCount).toBe(1);
    });

    test('should send the transaction to CreateSecurityToken with a treasury wallet', async () => {
      target = new CreateSecurityToken(
        {
          name: params1.name,
          symbol: params1.symbol,
          divisible: params1.divisible,
          treasuryWallet: '0x5', // Extra argument of treasuryWallet
        },
        contextMock.getMockInstance()
      );
      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(sinon.spy(target, 'prepare').calledOnce);
      expect(sinon.spy(target, 'prepareTransactions').calledOnce);
      expect(sinon.spy(target, 'addProcedure').calledOnce);
      expect(sinon.spy(target, 'addTransaction').calledOnce);
      expect(prepareApprovalTransactionsStub().calledOnce);
    });
  });
});
