import * as sinon from 'sinon';
import { ImportMock, MockManager } from 'ts-mock-imports';
import { SinonStub } from 'sinon';
import * as contractWrappersObject from '@polymathnetwork/contract-wrappers';
import { ModuleName, Perm } from '@polymathnetwork/contract-wrappers';
import * as contextObject from '../../Context';
import * as wrappersObject from '../../PolymathBase';
import * as tokenFactoryObject from '../../testUtils/MockedTokenFactoryObject';
import { AssignSecurityTokenRole } from '../../procedures/AssignSecurityTokenRole';
import * as securityTokenFactoryObject from '../../entities/factories/SecurityTokenFactory';
import * as cappedStoFactoryObject from '../../entities/factories/CappedStoFactory';
import * as checkpointFactoryObject from '../../entities/factories/CheckpointFactory';
import * as dividendDistributionSecurityTokenFactoryObject from '../../entities/factories/DividendDistributionFactory';
import * as erc20DividendsManagerFactoryObject from '../../entities/factories/Erc20DividendsManagerFactory';
import * as erc20TokenBalanceFactoryObject from '../../entities/factories/Erc20TokenBalanceFactory';
import * as ethDividendsManagerFactoryObject from '../../entities/factories/EthDividendsManagerFactory';
import * as investmentFactoryObject from '../../entities/factories/InvestmentFactory';
import * as securityTokenReservationObject from '../../entities/factories/SecurityTokenReservationFactory';
import * as shareholderFactoryObject from '../../entities/factories/ShareholderFactory';
import * as usdTieredStoFactoryObject from '../../entities/factories/UsdTieredStoFactory';
import * as taxWithholdingFactoryObject from '../../entities/factories/TaxWithholdingFactory';
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

  let securityTokenFactoryMock: MockManager<securityTokenFactoryObject.SecurityTokenFactory>;
  let cappedStoFactoryMock: MockManager<cappedStoFactoryObject.CappedStoFactory>;
  let checkpointFactoryMock: MockManager<checkpointFactoryObject.CheckpointFactory>;
  let dividendDistributionFactoryMock: MockManager<
    dividendDistributionSecurityTokenFactoryObject.DividendDistributionFactory
  >;
  let erc20DividendsManagerFactoryMock: MockManager<
    erc20DividendsManagerFactoryObject.Erc20DividendsManagerFactory
  >;
  let erc20TokenBalanceFactoryMock: MockManager<
    erc20TokenBalanceFactoryObject.Erc20TokenBalanceFactory
  >;
  let ethDividendsManagerFactoryMock: MockManager<
    ethDividendsManagerFactoryObject.EthDividendsManagerFactory
  >;
  let investmentFactoryMock: MockManager<investmentFactoryObject.InvestmentFactory>;
  let securityTokenReservationFactoryMock: MockManager<
    securityTokenReservationObject.SecurityTokenReservationFactory
  >;
  let shareholderFactoryMock: MockManager<shareholderFactoryObject.ShareholderFactory>;
  let usdTieredStoFactoryMock: MockManager<usdTieredStoFactoryObject.UsdTieredStoFactory>;
  let taxWithholdingFactoryMock: MockManager<taxWithholdingFactoryObject.TaxWithholdingFactory>;

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

    securityTokenFactoryMock = ImportMock.mockClass(
      securityTokenFactoryObject,
      'SecurityTokenFactory'
    );
    cappedStoFactoryMock = ImportMock.mockClass(cappedStoFactoryObject, 'CappedStoFactory');
    checkpointFactoryMock = ImportMock.mockClass(checkpointFactoryObject, 'CheckpointFactory');
    dividendDistributionFactoryMock = ImportMock.mockClass(
      dividendDistributionSecurityTokenFactoryObject,
      'DividendDistributionFactory'
    );
    erc20DividendsManagerFactoryMock = ImportMock.mockClass(
      erc20DividendsManagerFactoryObject,
      'Erc20DividendsManagerFactory'
    );
    erc20TokenBalanceFactoryMock = ImportMock.mockClass(
      erc20TokenBalanceFactoryObject,
      'Erc20TokenBalanceFactory'
    );
    ethDividendsManagerFactoryMock = ImportMock.mockClass(
      ethDividendsManagerFactoryObject,
      'EthDividendsManagerFactory'
    );
    investmentFactoryMock = ImportMock.mockClass(investmentFactoryObject, 'InvestmentFactory');
    securityTokenReservationFactoryMock = ImportMock.mockClass(
      securityTokenReservationObject,
      'SecurityTokenReservationFactory'
    );
    shareholderFactoryMock = ImportMock.mockClass(shareholderFactoryObject, 'ShareholderFactory');
    usdTieredStoFactoryMock = ImportMock.mockClass(
      usdTieredStoFactoryObject,
      'UsdTieredStoFactory'
    );
    taxWithholdingFactoryMock = ImportMock.mockClass(
      taxWithholdingFactoryObject,
      'TaxWithholdingFactory'
    );

    securityTokenFactoryMock.mock('fetch', {
      permissions: {
        isRoleAvailable: () => Promise.resolve(true),
        getFeatureFromRole: () => Promise.resolve(true),
      },
    });

    gpmMock.mock('getAllDelegates', Promise.resolve([params1.delegateAddress]));
    gpmMock.mock('getAllDelegatesWithPerm', Promise.resolve([]));

    getAttachedModulesMockStub = wrappersMock.mock(
      'getAttachedModules',
      Promise.resolve([gpmMock.getMockInstance()])
    );
    tokenFactoryMockStub = tokenFactoryMock.mock('getSecurityTokenInstanceFromTicker', {});
    const factoryMockSetup = {
      securityTokenFactory: securityTokenFactoryMock.getMockInstance(),
      securityTokenReservationFactory: securityTokenReservationFactoryMock.getMockInstance(),
      erc20TokenBalanceFactory: erc20TokenBalanceFactoryMock.getMockInstance(),
      investmentFactory: investmentFactoryMock.getMockInstance(),
      cappedStoFactory: cappedStoFactoryMock.getMockInstance(),
      usdTieredStoFactory: usdTieredStoFactoryMock.getMockInstance(),
      dividendDistributionFactory: dividendDistributionFactoryMock.getMockInstance(),
      checkpointFactory: checkpointFactoryMock.getMockInstance(),
      erc20DividendsManagerFactory: erc20DividendsManagerFactoryMock.getMockInstance(),
      ethDividendsManagerFactory: ethDividendsManagerFactoryMock.getMockInstance(),
      shareholderFactory: shareholderFactoryMock.getMockInstance(),
      taxWithholdingFactory: taxWithholdingFactoryMock.getMockInstance(),
    };
    contextMock.set('factories', factoryMockSetup);

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
        permissions: { isRoleAvailable: () => {}, getFeatureFromRole: () => {} },
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
