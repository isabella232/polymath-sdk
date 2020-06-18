/* eslint-disable import/no-duplicates */
import { ImportMock, MockManager } from 'ts-mock-imports';
import { stub } from 'sinon';
import { BigNumber } from '@polymathnetwork/contract-wrappers';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import sinon from 'sinon';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import { Wallet } from '../../Wallet';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import { ControllerTransfer } from '../../procedures/ControllerTransfer';
import * as controllerTransferModule from '../../procedures/ControllerTransfer';
import { Procedure } from '../../procedures/Procedure';
import { PolymathError } from '../../PolymathError';
import {
  ControllerTransferProcedureArgs,
  ErrorCode,
  PolyTransactionTag,
  ProcedureType,
} from '../../types';
import { mockFactories } from '../../testUtils/mockFactories';
import * as tokenholderFactoryModule from '../../entities/factories/TokenholderFactory';
import { Factories } from '../../Context';
import { SecurityToken, Tokenholder } from '../../entities';

const params: ControllerTransferProcedureArgs = {
  symbol: 'TEST1',
  from: '0x2222222222222222222222222222222222222222',
  to: '0x4444444444444444444444444444444444444444',
  amount: new BigNumber(1),
};

const ownerAddress = '0x5555555555555555555555555555555555555555';

describe('ControllerTransfer', () => {
  let target: ControllerTransfer;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;

  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;
  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;
  let tokenholderFactoryMock: MockManager<tokenholderFactoryModule.TokenholderFactory>;
  let factoriesMockedSetup: Factories;

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test ControllerTransfer
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersModule, 'PolymathBase');
    tokenFactoryMock = ImportMock.mockClass(tokenFactoryModule, 'MockedTokenFactoryModule');

    securityTokenMock = ImportMock.mockClass(contractWrappersModule, 'SecurityToken_3_0_0');
    securityTokenMock.mock('balanceOf', Promise.resolve(params.amount));
    securityTokenMock.mock('controller', Promise.resolve(ownerAddress));

    contextMock.set('currentWallet', new Wallet({ address: () => Promise.resolve(ownerAddress) }));
    tokenFactoryMock.mock(
      'getSecurityTokenInstanceFromTicker',
      securityTokenMock.getMockInstance()
    );

    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('tokenFactory', tokenFactoryMock.getMockInstance());
    tokenholderFactoryMock = ImportMock.mockClass(tokenholderFactoryModule, 'TokenholderFactory');
    factoriesMockedSetup = mockFactories();
    factoriesMockedSetup.tokenholderFactory = tokenholderFactoryMock.getMockInstance();
    contextMock.set('factories', factoriesMockedSetup);

    // Instantiate ControllerTransfer
    target = new ControllerTransfer(params, contextMock.getMockInstance());
  });

  describe('Types', () => {
    test('should extend procedure and have ControllerTransfer type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.ControllerTransfer);
    });
  });

  describe('ControllerTransfer', () => {
    test('should add a transaction to the queue to execute a controller transfer', async () => {
      const controllerTransferArgsSpy = sinon.spy();
      const addTransactionStub = stub(target, 'addTransaction');
      securityTokenMock.mock('controllerTransfer', Promise.resolve('ControllerTransfer'));
      const { controllerTransfer } = securityTokenMock.getMockInstance();
      addTransactionStub.withArgs(controllerTransfer).returns(controllerTransferArgsSpy);

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(controllerTransferArgsSpy.getCall(0).args[0]).toEqual({
        from: params.from,
        to: params.to,
        value: params.amount,
        data: '',
        operatorData: '',
      });
      expect(controllerTransferArgsSpy.callCount).toEqual(1);

      expect(
        addTransactionStub
          .getCall(0)
          .calledWith(securityTokenMock.getMockInstance().controllerTransfer)
      ).toEqual(true);
      expect(addTransactionStub.getCall(0).lastArg.tag).toEqual(
        PolyTransactionTag.ControllerTransfer
      );
      expect(addTransactionStub.callCount).toEqual(1);
    });

    test('should throw if there is no valid security token supplied', async () => {
      tokenFactoryMock
        .mock('getSecurityTokenInstanceFromTicker')
        .withArgs(params.symbol)
        .throws();

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `There is no Security Token with symbol ${params.symbol}`,
        })
      );
    });

    test('should throw error if balanceOf is less than amount being transferred', async () => {
      securityTokenMock.mock('balanceOf', Promise.resolve(new BigNumber(0)));
      // Real call
      await expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.InsufficientBalance,
          message: `Sender's balance of 0 is less than the requested amount of ${params.amount.toNumber()}`,
        })
      );
    });

    test('should throw an error if the current wallet is not the Security Token controller', async () => {
      securityTokenMock.mock('controller', Promise.resolve('Random'));
      // Real call
      await expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `You must be the controller of this Security Token to perform forced transfers. Did you remember to call "setController"?`,
        })
      );
    });

    test('should call error on inappropriate params "to" address', async () => {
      // Instantiate ControllerTransfer with incorrect args instead
      target = new ControllerTransfer(
        {
          ...params,
          to: 'Inappropriate',
        },
        contextMock.getMockInstance()
      );
      // Real call rejects
      await expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.InvalidAddress,
          message: `Provided "to" address is invalid: Inappropriate`,
        })
      );
    });

    test('should call error on inappropriate params "from" address', async () => {
      // Instantiate ControllerTransfer with incorrect args instead
      target = new ControllerTransfer(
        {
          ...params,
          from: 'Inappropriate',
        },
        contextMock.getMockInstance()
      );
      // Real call rejects
      await expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.InvalidAddress,
          message: `Provided "from" address is invalid: Inappropriate`,
        })
      );
    });
  });

  test('should successfully resolve controller transfer', async () => {
    const refreshStub = tokenholderFactoryMock.mock('refresh', Promise.resolve());
    const securityTokenId = SecurityToken.generateId({ symbol: params.symbol });
    const resolverValue = await controllerTransferModule.createControllerTransferResolver(
      factoriesMockedSetup,
      params.symbol,
      params.from,
      params.to
    )();
    expect(
      refreshStub.getCall(0).calledWithExactly(
        Tokenholder.generateId({
          securityTokenId,
          address: params.from,
        })
      )
    ).toEqual(true);
    expect(
      refreshStub.getCall(1).calledWithExactly(
        Tokenholder.generateId({
          securityTokenId,
          address: params.to,
        })
      )
    ).toEqual(true);
    expect(resolverValue).toEqual([undefined, undefined]);
    expect(refreshStub.callCount).toEqual(2);
  });
});
