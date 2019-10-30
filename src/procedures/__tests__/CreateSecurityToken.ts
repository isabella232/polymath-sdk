import { ImportMock, MockManager } from 'ts-mock-imports';
import { BigNumber } from '@polymathnetwork/contract-wrappers';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { SinonStub, spy, restore } from 'sinon';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as approvalModule from '../ApproveErc20';
import { CreateSecurityToken } from '../../procedures/CreateSecurityToken';
import { Procedure } from '~/procedures/Procedure';
import { Wallet } from '~/Wallet';
import { PolymathError } from '~/PolymathError';
import { ErrorCode, ProcedureType } from '~/types';
import { ApproveErc20 } from '../ApproveErc20';
import * as securityTokenFactoryModule from '~/entities/factories/SecurityTokenFactory';
import { TransactionReceiptWithDecodedLogs } from 'ethereum-protocol';
import * as utilsModule from '~/utils';
import { mockFactories } from '~/testUtils/MockFactories';

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
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let approvalMock: MockManager<approvalModule.ApproveErc20>;
  let prepareApprovalTransactionsStub: SinonStub<any, any>;

  let securityTokenRegistryMock: MockManager<contractWrappersModule.SecurityTokenRegistry>;

  let securityTokenFactoryMock: MockManager<securityTokenFactoryModule.SecurityTokenFactory>;

  let findEventsStub: SinonStub<any, any>;

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersModule, 'PolymathBase');

    // Import mock for approveErc20
    approvalMock = ImportMock.mockClass(approvalModule, 'ApproveErc20');
    prepareApprovalTransactionsStub = approvalMock.mock('prepareTransactions', Promise.resolve());
    approvalMock.set('transactions' as any, []);
    approvalMock.set('fees' as any, []);

    securityTokenRegistryMock = ImportMock.mockClass(
      contractWrappersModule,
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
      securityTokenFactoryModule,
      'SecurityTokenFactory'
    );
    const factoryMockSetup = mockFactories();
    factoryMockSetup.securityTokenFactory = securityTokenFactoryMock.getMockInstance();
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
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have CreateSecurityToken type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.CreateSecurityToken);
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

    test('should throw if corresponding create security token event is not fired', async () => {
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

    test('should throw error if the token has already been launched', async () => {
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
      const addProcedureSpy = spy(target, 'addProcedure');
      const addTransactionSpy = spy(target, 'addTransaction');
      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(securityTokenRegistryMock.getMockInstance().generateNewSecurityToken)
      ).toEqual(true);

      expect(addTransactionSpy.callCount).toEqual(1);
      expect(addProcedureSpy.getCall(0).calledWith(ApproveErc20)).toEqual(true);
      expect(addProcedureSpy.callCount).toEqual(1);
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
    });
  });
});
