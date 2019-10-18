import * as sinon from 'sinon';
import { ImportMock, MockManager } from 'ts-mock-imports';
import { SinonStub } from 'sinon';
import * as contractWrappersObject from '@polymathnetwork/contract-wrappers';
import * as contextObject from '../../Context';
import * as wrappersObject from '../../PolymathBase';
import * as tokenFactoryObject from '../../testUtils/MockedTokenFactoryObject';
import { AssignStoRole } from '../../procedures/AssignStoRole';
import { Procedure } from '~/procedures/Procedure';
import { PolymathError } from '~/PolymathError';
import { ErrorCode, PolyTransactionTag, StoRole } from '~/types';

const params1 = {
  symbol: 'TEST1',
  delegateAddress: '0x5555555555555555555555555555555555555555',
  stoAddress: '0x1234555555555555555555555555555555555555',
  assign: true,
  role: StoRole.StoAdministrator,
};

describe('AssignStoRole', () => {
  let target: AssignStoRole;
  let contextMock: MockManager<contextObject.Context>;
  let wrappersMock: MockManager<wrappersObject.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryObject.MockedTokenFactoryObject>;
  let gpmMock: MockManager<contractWrappersObject.GeneralPermissionManager_3_0_0>;
  let tokenFactoryMockStub: SinonStub<any, any>;
  let getAttachedModulesMockStub: SinonStub<any, any>;

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test AssignSecurityRole
    contextMock = ImportMock.mockClass(contextObject, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersObject, 'PolymathBase');
    tokenFactoryMock = ImportMock.mockClass(tokenFactoryObject, 'MockedTokenFactoryObject');
    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('tokenFactory', tokenFactoryMock.getMockInstance());

    gpmMock = ImportMock.mockClass(contractWrappersObject, 'GeneralPermissionManager_3_0_0');
    gpmMock.mock('getAllDelegates', Promise.resolve([params1.delegateAddress]));
    gpmMock.mock('getAllDelegatesWithPerm', Promise.resolve([]));

    getAttachedModulesMockStub = wrappersMock.mock(
      'getAttachedModules',
      Promise.resolve([gpmMock.getMockInstance()])
    );
    tokenFactoryMockStub = tokenFactoryMock.mock('getSecurityTokenInstanceFromTicker', {});

    // Instantiate AssignStoRole
    target = new AssignStoRole(
      {
        symbol: params1.symbol,
        delegateAddress: params1.delegateAddress,
        role: params1.role,
        assign: params1.assign,
        stoAddress: params1.stoAddress,
      },
      contextMock.getMockInstance()
    );
  });

  describe('Types', () => {
    test('should extend procedure and have AssignStoRole type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe('AssignStoRole');
    });
  });

  describe('AssignStoRole', () => {
    test('should send the transaction to AssignStoRole', async () => {
      const spyOnAddTransaction = sinon.spy(target, 'addTransaction');
      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        spyOnAddTransaction.withArgs(gpmMock.getMockInstance().addDelegate, {
          tag: PolyTransactionTag.ChangePermission,
        }).callCount
      ).toBe(1);
      expect(
        spyOnAddTransaction.withArgs(gpmMock.getMockInstance().changePermission, {
          tag: PolyTransactionTag.ChangePermission,
        }).callCount
      ).toBe(1);
    });

    test('should send the transaction to AssignStoRole without delegate', async () => {
      gpmMock.mock('getAllDelegates', Promise.resolve([]));
      const spyOnAddTransaction = sinon.spy(target, 'addTransaction');
      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        spyOnAddTransaction.withArgs(gpmMock.getMockInstance().addDelegate, {
          tag: PolyTransactionTag.ChangePermission,
        }).callCount
      ).toBe(2);
      expect(
        spyOnAddTransaction.withArgs(gpmMock.getMockInstance().changePermission, {
          tag: PolyTransactionTag.ChangePermission,
        }).callCount
      ).toBe(2);
    });

    test('should use an operator perm', async () => {
      target = new AssignStoRole(
        {
          symbol: params1.symbol,
          delegateAddress: params1.delegateAddress,
          role: StoRole.StoOperator,
          assign: params1.assign,
          stoAddress: params1.stoAddress,
        },
        contextMock.getMockInstance()
      );
      const spyOnAddTransaction = sinon.spy(target, 'addTransaction');
      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        spyOnAddTransaction.withArgs(gpmMock.getMockInstance().addDelegate, {
          tag: PolyTransactionTag.ChangePermission,
        }).callCount
      ).toBe(1);
      expect(
        spyOnAddTransaction.withArgs(gpmMock.getMockInstance().changePermission, {
          tag: PolyTransactionTag.ChangePermission,
        }).callCount
      ).toBe(1);
    });

    test('should throw if there is no supplied valid security token', async () => {
      tokenFactoryMock.set(
        'getSecurityTokenInstanceFromTicker',
        sinon
          .stub()
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

    test('should throw if permission feature is not enabled', async () => {
      getAttachedModulesMockStub = wrappersMock.mock('getAttachedModules', Promise.resolve([]));
      // Real call
      expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: 'You must enable the Permissions feature',
        })
      );
    });

    test('should throw if role has already been assigned to delegate', async () => {
      gpmMock.mock('getAllDelegatesWithPerm', Promise.resolve([params1.delegateAddress]));
      // Real call
      expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `Role ${params1.role} has already been ${
            params1.assign ? 'assigned to' : 'revoked from'
          } delegate for this STO.`,
        })
      );
    });
  });
});
