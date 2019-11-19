import { ImportMock, MockManager } from 'ts-mock-imports';
import { spy } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import { AssignStoRole } from '../../procedures/AssignStoRole';
import { Procedure } from '../Procedure';
import { PolymathError } from '../../PolymathError';
import { ErrorCode, PolyTransactionTag, StoRole } from '../../types';

const params = {
  symbol: 'TEST1',
  delegateAddress: '0x5555555555555555555555555555555555555555',
  stoAddress: '0x1234555555555555555555555555555555555555',
  assign: true,
  role: StoRole.StoAdministrator,
};

describe('AssignStoRole', () => {
  let target: AssignStoRole;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;
  let gpmMock: MockManager<contractWrappersModule.GeneralPermissionManager_3_0_0>;

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test AssignStoRole
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersModule, 'PolymathBase');
    tokenFactoryMock = ImportMock.mockClass(tokenFactoryModule, 'MockedTokenFactoryModule');
    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('tokenFactory', tokenFactoryMock.getMockInstance());

    gpmMock = ImportMock.mockClass(contractWrappersModule, 'GeneralPermissionManager_3_0_0');
    gpmMock.mock('getAllDelegates', Promise.resolve([params.delegateAddress]));
    gpmMock.mock('getAllDelegatesWithPerm', Promise.resolve([]));

    wrappersMock.mock('getAttachedModules', Promise.resolve([gpmMock.getMockInstance()]));
    tokenFactoryMock.mock('getSecurityTokenInstanceFromTicker', {});

    // Instantiate AssignStoRole
    target = new AssignStoRole(params, contextMock.getMockInstance());
  });

  describe('Types', () => {
    test('should extend procedure and have AssignStoRole type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe('AssignStoRole');
    });
  });

  describe('AssignStoRole', () => {
    test('should add transaction to the queue to change permission for an sto', async () => {
      const addTransactionSpy = spy(target, 'addTransaction');
      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy.getCall(0).calledWithExactly(gpmMock.getMockInstance().changePermission, {
          tag: PolyTransactionTag.ChangePermission,
        })
      ).toEqual(true);
      expect(addTransactionSpy.callCount).toEqual(1);
    });

    test('should add transaction to the queue to add delegate and change permission for a new delegate in an sto', async () => {
      gpmMock.mock('getAllDelegates', Promise.resolve([]));
      const addTransactionSpy = spy(target, 'addTransaction');
      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy.getCall(0).calledWithExactly(gpmMock.getMockInstance().addDelegate, {
          tag: PolyTransactionTag.ChangePermission,
        })
      ).toEqual(true);
      expect(
        addTransactionSpy.getCall(1).calledWithExactly(gpmMock.getMockInstance().changePermission, {
          tag: PolyTransactionTag.ChangePermission,
        })
      ).toEqual(true);
      expect(addTransactionSpy.callCount).toEqual(2);
    });

    test('should add change permission transaction to the queue and use an operator role as param', async () => {
      target = new AssignStoRole(
        { ...params, role: StoRole.StoOperator },
        contextMock.getMockInstance()
      );
      const addTransactionSpy = spy(target, 'addTransaction');
      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy.getCall(0).calledWithExactly(gpmMock.getMockInstance().changePermission, {
          tag: PolyTransactionTag.ChangePermission,
        })
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

    test('should throw if permission feature is not enabled', async () => {
      wrappersMock.mock('getAttachedModules', Promise.resolve([]));
      // Real call
      await expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: 'You must enable the Permissions feature',
        })
      );
    });

    test('should throw if role has already been assigned to delegate', async () => {
      gpmMock.mock('getAllDelegatesWithPerm', Promise.resolve([params.delegateAddress]));
      // Real call
      await expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `Role ${params.role} has already been assigned to delegate for this STO.`,
        })
      );
    });

    test('should throw if role has already been revoked from delegate', async () => {
      target = new AssignStoRole({ ...params, assign: false }, contextMock.getMockInstance());
      // Real call
      await expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `Role ${params.role} has already been revoked from delegate for this STO.`,
        })
      );
    });
  });
});
