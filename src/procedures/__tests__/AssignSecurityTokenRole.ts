import { ImportMock, MockManager } from 'ts-mock-imports';
import { SinonStub, stub, spy, restore } from 'sinon';
import * as contractWrappersModule from '@polymathnetwork/contract-wrappers';
import { ModuleName, Perm } from '@polymathnetwork/contract-wrappers';
import * as contextModule from '../../Context';
import * as wrappersModule from '../../PolymathBase';
import * as tokenFactoryModule from '../../testUtils/MockedTokenFactoryObject';
import { AssignSecurityTokenRole } from '../../procedures/AssignSecurityTokenRole';
import { Procedure } from '~/procedures/Procedure';
import { PolymathError } from '~/PolymathError';
import { ErrorCode, PolyTransactionTag, SecurityTokenRole } from '~/types';
import * as securityTokenFactoryModule from '~/entities/factories/SecurityTokenFactory';
import { mockFactories } from '~/testUtils/MockFactories';

const params1 = {
  symbol: 'TEST1',
  delegateAddress: '0x5555555555555555555555555555555555555555',
  assign: true,
  role: SecurityTokenRole.PermissionsAdministrator,
};

describe('AssignSecurityTokenRole', () => {
  let target: AssignSecurityTokenRole;
  let contextMock: MockManager<contextModule.Context>;
  let wrappersMock: MockManager<wrappersModule.PolymathBase>;
  let tokenFactoryMock: MockManager<tokenFactoryModule.MockedTokenFactoryObject>;
  let gpmMock: MockManager<contractWrappersModule.GeneralPermissionManager_3_0_0>;

  let securityTokenFactoryMock: MockManager<securityTokenFactoryModule.SecurityTokenFactory>;

  let tokenFactoryMockStub: SinonStub<any, any>;
  let getAttachedModulesMockStub: SinonStub<any, any>;

  beforeEach(() => {
    // Mock the context, wrappers, and tokenFactory to test AssignSecurityRole
    contextMock = ImportMock.mockClass(contextModule, 'Context');
    wrappersMock = ImportMock.mockClass(wrappersModule, 'PolymathBase');
    tokenFactoryMock = ImportMock.mockClass(tokenFactoryModule, 'MockedTokenFactoryObject');
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
        getFeatureFromRole: () => Promise.resolve(true),
      },
    });
    const factoryMockSetup = mockFactories();
    factoryMockSetup.securityTokenFactory = securityTokenFactoryMock.getMockInstance();
    contextMock.set('factories', factoryMockSetup);

    gpmMock.mock('getAllDelegates', Promise.resolve([params1.delegateAddress]));
    gpmMock.mock('getAllDelegatesWithPerm', Promise.resolve([]));

    getAttachedModulesMockStub = wrappersMock.mock(
      'getAttachedModules',
      Promise.resolve([gpmMock.getMockInstance()])
    );
    tokenFactoryMockStub = tokenFactoryMock.mock('getSecurityTokenInstanceFromTicker', {});

    wrappersMock.mock('roleToPermission', {
      moduleName: ModuleName.PercentageTransferManager,
      permission: Perm.Operator,
    });
    wrappersMock.mock('getModuleAddressesByName', [params1.delegateAddress]);

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
    test('should enqueue the addDelegate and changePermission transactions when the delegate is a new address', async () => {
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

    test('should send transaction to assign role without existing delegates', async () => {
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

    test('should throw if there is no valid security token being provided', async () => {
      tokenFactoryMock.set(
        'getSecurityTokenInstanceFromTicker',
        stub()
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
          } delegate.`,
        })
      );
    });

    test('should throw if feature is not enabled', async () => {
      // Setup fetch mock returning empty
      securityTokenFactoryMock.mock('fetch', {
        permissions: {
          isRoleAvailable: () => {},
          getFeatureFromRole: () => {},
        },
      });
      // Real call
      expect(target.prepareTransactions()).rejects.toThrowError(
        new PolymathError({
          code: ErrorCode.FeatureNotEnabled,
          message: `You must enable the undefined feature`,
        })
      );
    });
  });
});
