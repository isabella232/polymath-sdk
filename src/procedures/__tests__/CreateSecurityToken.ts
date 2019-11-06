import { ImportMock, MockManager } from 'ts-mock-imports';
import { BigNumber, SecurityTokenRegistryEvents } from '@polymathnetwork/contract-wrappers';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { spy, restore } from 'sinon';
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
import { mockFactories } from '~/testUtils/mockFactories';
import { SecurityToken } from '~/entities';

const params = {
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

  let securityTokenRegistryMock: MockManager<contractWrappersModule.SecurityTokenRegistry>;
  let securityTokenFactoryMock: MockManager<securityTokenFactoryModule.SecurityTokenFactory>;

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersModule, 'PolymathBase');

    // Import mock for approveErc20
    approvalMock = ImportMock.mockClass(approvalModule, 'ApproveErc20');
    approvalMock.mock('prepareTransactions', Promise.resolve());
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
    securityTokenRegistryMock.mock('address', Promise.resolve(params.address));

    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('securityTokenRegistry', securityTokenRegistryMock.getMockInstance());

    const ownerPromise = new Promise<string>((resolve, reject) => {
      resolve(params.owner);
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
    target = new CreateSecurityToken(params, contextMock.getMockInstance());
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
            params.symbol
          } hasn't been reserved. You need to call "reserveSecurityToken" first.`,
        })
      );
    });

    test('should throw if corresponding create security token event is not fired', async () => {
      ImportMock.mockFunction(utilsModule, 'findEvents', []);

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

    test('should return the newly created security token', async () => {
      const creationObject = {
        creation: {
          name: () => params.name,
          owner: () => params.owner,
          address: () => params.address,
        },
      };
      const createStub = securityTokenFactoryMock.mock('create', creationObject);
      const findEventsStub = ImportMock.mockFunction(utilsModule, 'findEvents', [
        {
          args: {
            _ticker: params.symbol,
            _name: params.name,
            _owner: params.owner,
            _securityTokenAddress: params.address,
          },
        },
      ]);

      // Real call
      const resolver = await target.prepareTransactions();
      const receipt = {} as TransactionReceiptWithDecodedLogs;
      await resolver.run(receipt);

      // Verification for resolver result
      expect(resolver.result).toEqual(creationObject);
      // Verification for fetch
      expect(createStub.getCall(0).calledWithMatch(SecurityToken.generateId, {})).toEqual(true);
      expect(
        createStub
          .getCall(0)
          .calledWithExactly(SecurityToken.generateId({ symbol: params.symbol }), {
            name: params.name,
            owner: params.owner,
            address: params.address,
          })
      ).toEqual(true);
      expect(createStub.callCount).toBe(1);
      // Verifications for findEvents
      expect(
        findEventsStub.getCall(0).calledWithMatch({
          eventName: SecurityTokenRegistryEvents.NewSecurityToken,
        })
      ).toEqual(true);
      expect(findEventsStub.callCount).toBe(1);
    });

    test('should throw error if token has been reserved by other user', async () => {
      securityTokenRegistryMock.mock('isTickerRegisteredByCurrentIssuer', Promise.resolve(false));
      // Real call
      expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `The security token symbol ${
            params.symbol
          } has already been reserved by another issuer.`,
        })
      );
    });

    test('should throw error if the token has already been launched', async () => {
      securityTokenRegistryMock.mock('isTokenLaunched', Promise.resolve(true));
      // Real call
      expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `The security token symbol ${params.symbol} has already been launched.`,
        })
      );
    });

    test('should add the transaction to the queue to create the security token and approve erc20 transfer', async () => {
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

    test('should add the transaction to the queue to create the security token with a treasury wallet', async () => {
      target = new CreateSecurityToken(
        {
          ...params,
          treasuryWallet: '0x5', // Extra argument of treasuryWallet
        },
        contextMock.getMockInstance()
      );
      // Real call
      await target.prepareTransactions();
    });
  });
});
