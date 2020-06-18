/* eslint-disable import/no-duplicates */
import { ImportMock, MockManager } from 'ts-mock-imports';
import sinon, { restore, stub } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { ToggleFreezeTransfers } from '../../procedures/ToggleFreezeTransfers';
import { Procedure } from '../../procedures/Procedure';
import * as toggleFreezeTransferModule from '../../procedures/ToggleFreezeTransfers';
import { PolymathError } from '../../PolymathError';
import {
  ErrorCode,
  ToggleFreezeTransfersProcedureArgs,
  PolyTransactionTag,
  ProcedureType,
} from '../../types';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import * as securityTokenFactoryModule from '../../entities/factories/SecurityTokenFactory';
import { mockFactories } from '../../testUtils/mockFactories';
import { SecurityToken } from '../../entities/SecurityToken/SecurityToken';
import { Wallet } from '../../Wallet';
import { Factories } from '../../Context';

const params: ToggleFreezeTransfersProcedureArgs = {
  symbol: 'TEST',
  freeze: true,
};

describe('ToggleFreezeTransfers', () => {
  let target: ToggleFreezeTransfers;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;
  let securityTokenMock: MockManager<contractWrappersModule.SecurityToken_3_0_0>;
  let factoriesMockedSetup: Factories;
  let securityTokenFactoryMock: MockManager<securityTokenFactoryModule.SecurityTokenFactory>;

  beforeEach(() => {
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersModule, 'PolymathBase');
    tokenFactoryMock = ImportMock.mockClass(tokenFactoryModule, 'MockedTokenFactoryModule');

    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    contextMock.set(
      'currentWallet',
      new Wallet({ address: () => Promise.resolve('0x0e6b236a504fce78527497e46dc90c0a6fdc9495') })
    );

    wrappersMock.set('tokenFactory', tokenFactoryMock.getMockInstance());

    securityTokenMock = ImportMock.mockClass(contractWrappersModule, 'SecurityToken_3_0_0');
    securityTokenMock.mock('owner', Promise.resolve('0x0e6b236a504fce78527497e46dc90c0a6fdc9495'));
    securityTokenMock.mock('transfersFrozen', Promise.resolve(false));
    tokenFactoryMock.mock(
      'getSecurityTokenInstanceFromTicker',
      securityTokenMock.getMockInstance()
    );

    securityTokenFactoryMock = ImportMock.mockClass(
      securityTokenFactoryModule,
      'SecurityTokenFactory'
    );
    factoriesMockedSetup = mockFactories();
    factoriesMockedSetup.securityTokenFactory = securityTokenFactoryMock.getMockInstance();
    contextMock.set('factories', factoriesMockedSetup);

    // Instantiate ToggleFreezeTransfers
    target = new ToggleFreezeTransfers(params, contextMock.getMockInstance());
  });

  afterEach(() => {
    restore();
  });

  describe('Types', () => {
    test('should extend procedure and have ToggleFreezeTransfers type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe(ProcedureType.ToggleFreezeTransfers);
    });
  });

  describe('ToggleFreezeTransfers', () => {
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

    test('should throw if current wallet is not the security token owner and wants set freeze mode to true', async () => {
      securityTokenMock.mock(
        'owner',
        Promise.resolve('0x7428a3fa68124b4EF1dc0579ea8c3E932b37BF96')
      );

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `You must be the owner of this Security Token to freeze the transfers`,
        })
      );
    });

    test('should throw if current wallet is not the security token owner and wants set freeze mode to false', async () => {
      target = new ToggleFreezeTransfers(
        { ...params, freeze: false },
        contextMock.getMockInstance()
      );
      securityTokenMock.mock(
        'owner',
        Promise.resolve('0x7428a3fa68124b4EF1dc0579ea8c3E932b37BF96')
      );

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `You must be the owner of this Security Token to unfreeze the transfers`,
        })
      );
    });

    test('should throw if frozen status is already settled on true', async () => {
      securityTokenMock.mock('transfersFrozen', Promise.resolve(true));

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `Security Token Transfers are already frozen`,
        })
      );
    });

    test('should throw if frozen status is already settled on false', async () => {
      target = new ToggleFreezeTransfers(
        { ...params, freeze: false },
        contextMock.getMockInstance()
      );
      securityTokenMock.mock('transfersFrozen', Promise.resolve(false));

      await expect(target.prepareTransactions()).rejects.toThrow(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `Security Token Transfers are already unfrozen`,
        })
      );
    });

    test('should add a transaction to the queue to freeze transfers', async () => {
      const freezeTransfersArgsSpy = sinon.spy();
      const addTransactionStub = stub(target, 'addTransaction');
      securityTokenMock.mock('freezeTransfers', Promise.resolve('FreezeTransfers'));
      const { freezeTransfers } = securityTokenMock.getMockInstance();
      addTransactionStub.withArgs(freezeTransfers).returns(freezeTransfersArgsSpy);

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(freezeTransfersArgsSpy.getCall(0).args[0]).toEqual({});
      expect(freezeTransfersArgsSpy.callCount).toEqual(1);

      expect(
        addTransactionStub
          .getCall(0)
          .calledWith(securityTokenMock.getMockInstance().freezeTransfers)
      ).toEqual(true);
      expect(addTransactionStub.getCall(0).lastArg.tag).toEqual(PolyTransactionTag.FreezeTransfers);
      expect(addTransactionStub.callCount).toEqual(1);
    });

    test('should add a transaction to the queue to unfreeze transfers', async () => {
      target = new ToggleFreezeTransfers(
        { ...params, freeze: false },
        contextMock.getMockInstance()
      );

      securityTokenMock.mock('transfersFrozen', Promise.resolve(true));
      const unfreezeTransfersArgsSpy = sinon.spy();
      const addTransactionStub = stub(target, 'addTransaction');
      securityTokenMock.mock('unfreezeTransfers', Promise.resolve('UnfreezeTransfers'));
      const { unfreezeTransfers } = securityTokenMock.getMockInstance();
      addTransactionStub.withArgs(unfreezeTransfers).returns(unfreezeTransfersArgsSpy);

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(unfreezeTransfersArgsSpy.getCall(0).args[0]).toEqual({});
      expect(unfreezeTransfersArgsSpy.callCount).toEqual(1);

      expect(
        addTransactionStub
          .getCall(0)
          .calledWith(securityTokenMock.getMockInstance().unfreezeTransfers)
      ).toEqual(true);
      expect(addTransactionStub.getCall(0).lastArg.tag).toEqual(
        PolyTransactionTag.UnfreezeTransfers
      );
      expect(addTransactionStub.callCount).toEqual(1);
    });

    test('should successfully resolve toggle freeze transfers', async () => {
      const refreshStub = securityTokenFactoryMock.mock('refresh', Promise.resolve());
      const securityTokenId = SecurityToken.generateId({ symbol: params.symbol });
      const resolverValue = await toggleFreezeTransferModule.createToggleFreezeTransfersResolver(
        factoriesMockedSetup,
        params.symbol
      )();
      expect(refreshStub.getCall(0).calledWithExactly(securityTokenId)).toEqual(true);
      expect(resolverValue).toEqual(undefined);
      expect(refreshStub.callCount).toEqual(1);
    });
  });
});
