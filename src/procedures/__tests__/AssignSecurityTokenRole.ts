import { ImportMock, MockManager } from 'ts-mock-imports';
import { spy, restore } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { ModuleName, Perm } from '@polymathnetwork/contract-wrappers';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryModule';
import { AssignSecurityTokenRole } from '../../procedures/AssignSecurityTokenRole';
import { Procedure } from '../Procedure';
import { PolymathError } from '../../PolymathError';
import { ErrorCode, Feature, PolyTransactionTag, SecurityTokenRole } from '../../types';
import * as securityTokenFactoryModule from '../../entities/factories/SecurityTokenFactory';
import { mockFactories } from '../../testUtils/mockFactories';

const params = {
  symbol: 'TEST1',
  delegateAddress: '0x5555555555555555555555555555555555555555',
  assign: true,
  role: SecurityTokenRole.PermissionsAdministrator,
  description: 'Description',
};

const moduleAddress = '0x9999999999999999999999999999999999999999';

describe('AssignSecurityTokenRole', () => {
  let target: AssignSecurityTokenRole;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryModule>;
  let gpmMock: MockManager<contractWrappersModule.GeneralPermissionManager_3_0_0>;

  let securityTokenFactoryMock: MockManager<securityTokenFactoryModule.SecurityTokenFactory>;

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test AssignSecurityTokenRole
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersModule, 'PolymathBase');

    tokenFactoryMock = ImportMock.mockClass(tokenFactoryModule, 'MockedTokenFactoryModule');

    contextMock.set('contractWrappers', wrappersMock.getMockInstance());
    wrappersMock.set('tokenFactory', tokenFactoryMock.getMockInstance());

    gpmMock = ImportMock.mockClass(contractWrappersModule, 'GeneralPermissionManager_3_0_0');

    // Setup factories and security token mock
    securityTokenFactoryMock = ImportMock.mockClass(
      securityTokenFactoryModule,
      'SecurityTokenFactory'
    );
    securityTokenFactoryMock.mock('fetch', {
      permissions: {
        isRoleAvailable: () => Promise.resolve(true),
        getFeatureFromRole: () => Promise.resolve(Feature.Permissions),
      },
    });
    const factoryMockSetup = mockFactories();
    factoryMockSetup.securityTokenFactory = securityTokenFactoryMock.getMockInstance();
    contextMock.set('factories', factoryMockSetup);

    gpmMock.mock('getAllDelegates', Promise.resolve([params.delegateAddress]));
    gpmMock.mock('getAllDelegatesWithPerm', Promise.resolve([]));

    wrappersMock.mock('getAttachedModules', Promise.resolve([gpmMock.getMockInstance()]));
    tokenFactoryMock.mock('getSecurityTokenInstanceFromTicker', {});

    wrappersMock.mock('roleToPermission', {
      moduleName: ModuleName.PercentageTransferManager,
      permission: Perm.Operator,
    });
    wrappersMock.mock('getModuleAddressesByName', [moduleAddress]);

    // Instantiate AssignSecurityTokenRole
    target = new AssignSecurityTokenRole(params, contextMock.getMockInstance());
  });
  afterEach(() => {
    restore();
  });
  describe('Types', () => {
    test('should extend procedure and have AssignSecurityTokenRole type', async () => {
      expect(target instanceof Procedure).toBe(true);
      expect(target.type).toBe('AssignSecurityTokenRole');
    });
  });

  describe('AssignSecurityTokenRole', () => {
    test('should add a change permission transaction to the queue with an existing delegate address', async () => {
      const addTransactionSpy = spy(target, 'addTransaction');
      gpmMock.mock('changePermission', Promise.resolve('ChangePermission'));

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

    test('should add transactions to the queue for add delegate and change permissions with a new delegate address', async () => {
      gpmMock.mock('getAllDelegates', Promise.resolve([]));
      const addTransactionSpy = spy(target, 'addTransaction');
      gpmMock.mock('addDelegate', Promise.resolve('AddDelegate'));
      gpmMock.mock('changePermission', Promise.resolve('ChangePermission'));

      // Real call
      await target.prepareTransactions();

      // Verifications
      expect(
        addTransactionSpy.getCall(0).calledWithExactly(gpmMock.getMockInstance().addDelegate, {
          tag: PolyTransactionTag.AddDelegate,
        })
      ).toEqual(true);
      expect(
        addTransactionSpy.getCall(1).calledWithExactly(gpmMock.getMockInstance().changePermission, {
          tag: PolyTransactionTag.ChangePermission,
        })
      ).toEqual(true);
      expect(addTransactionSpy.callCount).toEqual(2);
    });

    test('should throw if there is no valid security token being provided', async () => {
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
          message: `Role ${params.role} has already been assigned to delegate.`,
        })
      );
    });

    test('should throw if role has already been revoked from delegate', async () => {
      target = new AssignSecurityTokenRole(
        { ...params, assign: false },
        contextMock.getMockInstance()
      );
      // Real call
      await expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `Role ${params.role} has already been revoked from delegate.`,
        })
      );
    });

    test('should throw if the feature related to the role being assigned is not enabled', async () => {
      // Setup fetch mock returning empty
      securityTokenFactoryMock.mock('fetch', {
        permissions: {
          isRoleAvailable: () => Promise.resolve(false),
          getFeatureFromRole: () => Promise.resolve(Feature.Permissions),
        },
      });
      // Real call
      await expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.FeatureNotEnabled,
          message: `You must enable the Permissions feature`,
        })
      );
    });
  });
});
