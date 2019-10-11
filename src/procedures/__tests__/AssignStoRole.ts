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
import { ErrorCode, StoRole } from '~/types';

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

  beforeAll(() => {
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
      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(sinon.spy(target, 'prepare').calledOnce);
      expect(sinon.spy(target, 'prepareTransactions').calledOnce);
      expect(sinon.spy(target, 'addProcedure').calledOnce);
      expect(sinon.spy(target, 'addTransaction').calledOnce);
      expect(tokenFactoryMockStub().calledOnce);
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
  });
});
