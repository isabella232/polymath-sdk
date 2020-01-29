import { ImportMock, MockManager } from 'ts-mock-imports';
import sinon, { spy, stub } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { Perm } from '@polymathnetwork/contract-wrappers';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import { AssignStoRole } from '../../procedures/AssignStoRole';
import { Procedure } from '../Procedure';
import { PolymathError } from '../../PolymathError';
import { ErrorCode, PolyTransactionTag, ProcedureType, StoRole } from '../../types';


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
      expect(target.type).toBe(ProcedureType.AssignStoRole);
    });
  });

  describe('AssignStoRole', () => {
    test('should add transaction to the queue to change permission for an sto', async () => {
      const changePermissionArgsSpy = sinon.spy();
      const addTransactionStub = stub(target, 'addTransaction');
      gpmMock.mock('changePermission', Promise.resolve('ChangePermission'));
      const { changePermission } = gpmMock.getMockInstance();
      addTransactionStub.withArgs(changePermission).returns(changePermissionArgsSpy);

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(changePermissionArgsSpy.getCall(0).args[0]).toEqual({
        delegate: params.delegateAddress,
        module: params.stoAddress,
        perm: Perm.Admin,
        valid: params.assign,
      });
      expect(changePermissionArgsSpy.callCount).toEqual(1);
      expect(
        addTransactionStub
          .getCall(0)
          .calledWithExactly(gpmMock.getMockInstance().changePermission, {
            tag: PolyTransactionTag.ChangePermission,
          })
      ).toEqual(true);
      expect(addTransactionStub.callCount).toEqual(1);
    });

    test('should add transaction to the queue to add delegate and change permission for a new delegate in an sto', async () => {
      gpmMock.mock('getAllDelegates', Promise.resolve([]));
      const addDelegateArgsSpy = sinon.spy();
      const changePermissionArgsSpy = sinon.spy();
      const addTransactionStub = stub(target, 'addTransaction');
      gpmMock.mock('addDelegate', Promise.resolve('AddDelegate'));
      gpmMock.mock('changePermission', Promise.resolve('ChangePermission'));
      const { addDelegate } = gpmMock.getMockInstance();
      const { changePermission } = gpmMock.getMockInstance();
      addTransactionStub.withArgs(addDelegate).returns(addDelegateArgsSpy);
      addTransactionStub.withArgs(changePermission).returns(changePermissionArgsSpy);

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(addDelegateArgsSpy.getCall(0).args[0]).toEqual({
        delegate: params.delegateAddress,
        details: '',
      });
      expect(addDelegateArgsSpy.callCount).toEqual(1);
      expect(
        addTransactionStub.getCall(0).calledWithExactly(gpmMock.getMockInstance().addDelegate, {
          tag: PolyTransactionTag.AddDelegate,
        })
      ).toEqual(true);

      expect(changePermissionArgsSpy.getCall(0).args[0]).toEqual({
        delegate: params.delegateAddress,
        module: params.stoAddress,
        perm: Perm.Admin,
        valid: params.assign,
      });
      expect(changePermissionArgsSpy.callCount).toEqual(1);
      expect(
        addTransactionStub
          .getCall(1)
          .calledWithExactly(gpmMock.getMockInstance().changePermission, {
            tag: PolyTransactionTag.ChangePermission,
          })
      ).toEqual(true);

      expect(addTransactionStub.callCount).toEqual(2);
    });

    test('should throw error if the description is over 32 characters long', async () => {
      target = new AssignStoRole(
        { ...params, description: '0123456789012345678901234567890123456789' },
        contextMock.getMockInstance()
      );
      gpmMock.mock('getAllDelegates', Promise.resolve([]));

      // Real call rejects
      await expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `You must provide a valid description up to 32 characters long`,
        })
      );
    });

    test('should add change permission transaction to the queue and use an operator role as param', async () => {
      target = new AssignStoRole(
        { ...params, role: StoRole.StoOperator },
        contextMock.getMockInstance()
      );
      const changePermissionArgsSpy = sinon.spy();
      const addTransactionStub = stub(target, 'addTransaction');
      gpmMock.mock('changePermission', Promise.resolve('ChangePermission'));
      const { changePermission } = gpmMock.getMockInstance();
      addTransactionStub.withArgs(changePermission).returns(changePermissionArgsSpy);

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(changePermissionArgsSpy.getCall(0).args[0]).toEqual({
        delegate: params.delegateAddress,
        module: params.stoAddress,
        perm: Perm.Operator,
        valid: params.assign,
      });
      expect(changePermissionArgsSpy.callCount).toEqual(1);
      expect(
        addTransactionStub
          .getCall(0)
          .calledWithExactly(gpmMock.getMockInstance().changePermission, {
            tag: PolyTransactionTag.ChangePermission,
          })
      ).toEqual(true);
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
