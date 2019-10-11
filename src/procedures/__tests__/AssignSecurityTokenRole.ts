import * as sinon from 'sinon';
import { ImportMock, MockManager } from 'ts-mock-imports';
import { SinonStub } from 'sinon';
import * as contractWrappersObject from '@polymathnetwork/contract-wrappers';
import * as contextObject from '../../Context';
import * as wrappersObject from '../../PolymathBase';
import * as tokenFactoryObject from '../../testUtils/MockedTokenFactoryObject';
import { AssignSecurityTokenRole } from '../../procedures/AssignSecurityTokenRole';
import { Procedure } from '~/procedures/Procedure';
import { PolymathError } from '~/PolymathError';
import { ErrorCode, SecurityTokenRole } from '~/types';

const params1 = {
  symbol: 'TEST1',
  delegateAddress: '0x5555555555555555555555555555555555555555',
  assign: true,
  role: SecurityTokenRole.PermissionsAdministrator,
};

describe('AssignSecurityTokenRole', () => {
  let target: AssignSecurityTokenRole;
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

    getAttachedModulesMockStub = wrappersMock.mock(
      'getAttachedModules',
      Promise.resolve([gpmMock])
    );
    tokenFactoryMockStub = tokenFactoryMock.mock('getSecurityTokenInstanceFromTicker', {});

    // Instantiate AssignSecurityTokenRole
    target = new AssignSecurityTokenRole(
      {
        symbol: params1.symbol,
        delegateAddress: params1.delegateAddress,
        role: params1.role,
        assign: params1.assign,
      },
      contextMock.getMockInstance()
    );
  });

  describe('Types', () => {
    test('should extend procedure and have AssignSecurityTokenRole type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe('AssignSecurityTokenRole');
    });
  });

  describe('AssignSecurityTokenRole', () => {
    test('should send the transaction to AssignSecurityTokenRole', async () => {
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
