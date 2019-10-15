import * as sinon from 'sinon';
import { ImportMock, MockManager } from 'ts-mock-imports';
import { SinonStub } from 'sinon';
import BigNumber from 'bignumber.js';
import * as contractWrappersObject from '@polymathnetwork/contract-wrappers';
import * as contextObject from '../../Context';
import * as wrappersObject from '../../PolymathBase';
import { Wallet } from '../../Wallet';
import * as tokenFactoryObject from '../../testUtils/MockedTokenFactoryObject';
import { ControllerTransfer } from '../../procedures/ControllerTransfer';
import { Procedure } from '~/procedures/Procedure';
import { PolymathError } from '~/PolymathError';
import { ErrorCode } from '~/types';

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
      const spyOnPrepareTransactions = sinon.spy(target, 'prepareTransactions');
      const spyOnAddTransaction = sinon.spy(target, 'addTransaction');
      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(spyOnPrepareTransactions.callCount).toBe(1);
      expect(spyOnAddTransaction.callCount).toBe(1);
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
