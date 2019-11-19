import { ImportMock, MockManager } from 'ts-mock-imports';
import { spy } from 'sinon';
import { BigNumber } from '@polymathnetwork/contract-wrappers';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import { Wallet } from '../../Wallet';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryObject';
import { ControllerTransfer } from '../../procedures/ControllerTransfer';
import * as controllerTransferModule from '../../procedures/ControllerTransfer';
import { Procedure } from '~/procedures/Procedure';
import { PolymathError } from '~/PolymathError';
import { ErrorCode, ProcedureType } from '~/types';
import { mockFactories } from '~/testUtils/mockFactories';
import * as shareholderFactoryModule from '~/entities/factories/ShareholderFactory';
import { Factories } from '../../Context';
import { SecurityToken, Shareholder } from '~/entities';

const params = {
  symbol: 'TEST1',
  name: 'Test Token 1',
  address: '0x1111111111111111111111111111111111111111',
  from: '0x2222222222222222222222222222222222222222',
  to: '0x4444444444444444444444444444444444444444',
  owner: '0x3333333333333333333333333333333333333333',
  amount: new BigNumber(1),
};

describe('ControllerTransfer', () => {
  let target: ControllerTransfer;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryObject>;
  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;
  let shareholderFactoryMock: MockManager<shareholderFactoryModule.ShareholderFactory>;
  let factoriesMockedSetup: Factories;

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test CreateCheckpoint
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersModule, 'PolymathBase');
    tokenFactoryMock = ImportMock.mockClass(tokenFactoryModule, 'MockedTokenFactoryObject');

    securityTokenMock = ImportMock.mockClass(contractWrappersModule, 'SecurityToken_3_0_0');
    securityTokenMock.mock('balanceOf', Promise.resolve(params.amount));
    securityTokenMock.mock('controller', Promise.resolve(params.owner));

    const ownerPromise = new Promise<string>((resolve, reject) => {
      resolve(params.owner);
    });
    contextMock.set('currentWallet', new Wallet({ address: () => ownerPromise }));
    tokenFactoryMock.mock(
      'getSecurityTokenInstanceFromTicker',
      securityTokenMock.getMockInstance()
    );

    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('tokenFactory', tokenFactoryMock.getMockInstance());
    shareholderFactoryMock = ImportMock.mockClass(shareholderFactoryModule, 'ShareholderFactory');
    factoriesMockedSetup = mockFactories();
    factoriesMockedSetup.shareholderFactory = shareholderFactoryMock.getMockInstance();
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
    const refreshStub = shareholderFactoryMock.mock('refresh', Promise.resolve(undefined));
    const securityTokenId = SecurityToken.generateId({ symbol: params.symbol });
    const resolverValue = await controllerTransferModule.createControllerTransferResolver(
      factoriesMockedSetup,
      params.symbol,
      params.from,
      params.to
    )();
    expect(
      refreshStub.getCall(0).calledWithExactly(
        Shareholder.generateId({
          securityTokenId,
          address: params.from,
        })
      )
    ).toEqual(true);
    expect(
      refreshStub.getCall(1).calledWithExactly(
        Shareholder.generateId({
          securityTokenId,
          address: params.to,
        })
      )
    ).toEqual(true);
    await expect(resolverValue).toEqual([undefined, undefined]);
    expect(refreshStub.callCount).toEqual(2);
  });
});
