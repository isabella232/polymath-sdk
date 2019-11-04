import { ImportMock, MockManager } from 'ts-mock-imports';
import { stub, spy } from 'sinon';
import { BigNumber } from '@polymathnetwork/contract-wrappers';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import { Wallet } from '../../Wallet';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryObject';
import { ControllerTransfer } from '../../procedures/ControllerTransfer';
import { Procedure } from '~/procedures/Procedure';
import { PolymathError } from '~/PolymathError';
import { ErrorCode, ProcedureType } from '~/types';
import { mockFactories } from '~/testUtils/mockFactories';

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
    tokenFactoryMock.mock(
      'getSecurityTokenInstanceFromTicker',
      securityTokenMock.getMockInstance()
    );

    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('tokenFactory', tokenFactoryMock.getMockInstance());

    contextMock.set('factories', mockFactories());

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
    test('should add a transaction to the queue to execute a controller transfer', async () => {
      const addTransactionSpy = spy(target, 'addTransaction');
      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy
          .getCall(0)
          .calledWith(securityTokenMock.getMockInstance().controllerTransfer)
      ).toEqual(true);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should throw if there is no valid security token supplied', async () => {
      tokenFactoryMock.set(
        'getSecurityTokenInstanceFromTicker',
        stub()
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

    test('should throw an error if the current wallet is not the Security Token controller', async () => {
      securityTokenMock.mock('controller', Promise.resolve('Random'));
      // Real call
      expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `You must be the controller of this Security Token to perform forced transfers. Did you remember to call "setController"?`,
        })
      );
    });

    test("should call error on inappropriate params 'to' address", async () => {
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

    test("should call error on inappropriate params 'from' address", async () => {
      // Instantiate ControllerTransfer with incorrect args instead
      target = new ControllerTransfer(
        {
          from: 'Inappropriate',
          to: params1.owner,
          amount: params1.amount,
          symbol: params1.symbol,
        },
        contextMock.getMockInstance()
      );
      // Real call rejects
      expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.InvalidAddress,
          message: `Provided "from" address is invalid: Inappropriate`,
        })
      );
    });
  });
});
