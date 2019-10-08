import { forEach } from 'lodash';
import { ModuleName } from '@polymathnetwork/contract-wrappers';
import P from 'bluebird';
import { SubModule } from './SubModule';
import { ChangeDelegatePermission } from '../../procedures';
import { SecurityTokenRole, Feature, ErrorCode } from '../../types';
import { PolymathError } from '../../PolymathError';

export class Permissions extends SubModule {
  /**
   * Get a list of all available roles.
   * The returned roles depend on which features are enabled, as per:
   *
   * Feature           Roles
   * -------------------------
   * Permissions       Permissions Administrator
   * Shareholders      Shareholders Administrator
   * Erc20 Dividends   Erc20 Dividends Administrator, Erc20 Dividends Operator
   * Ether Dividends   Ether Dividends Administrator, Ether Dividends Operator
   */
  public getAvailableRoles = async () => {
    const {
      securityToken: {
        features: { getStatus, list },
      },
    } = this;

    const status = await getStatus();

    if (!status[Feature.Permissions]) {
      throw new PolymathError({
        code: ErrorCode.FeatureNotEnabled,
        message: 'You must enable the Permissions feature',
      });
    }

    let availableRoles: SecurityTokenRole[] = [];

    list.forEach(feature => {
      if (status[feature]) {
        availableRoles = [...this.rolesPerFeature[feature], ...availableRoles];
      }
    });

    return availableRoles;
  };

  /**
   * Returns whether a certain role is available to be assigned to delegates
   *
   * @param role role for which to check availability
   */
  public isRoleAvailable = async (args: { role: SecurityTokenRole }) => {
    const { role } = args;
    const availableRoles = await this.getAvailableRoles();

    return availableRoles.includes(role);
  };

  /**
   * Returns which feature is associated with the supplied role
   *
   * @param role
   */
  public getFeatureFromRole = async (args: { role: SecurityTokenRole }) => {
    const {
      securityToken: {
        features: { getStatus },
      },
    } = this;

    const status = await getStatus();

    if (!status[Feature.Permissions]) {
      throw new PolymathError({
        code: ErrorCode.FeatureNotEnabled,
        message: 'You must enable the Permissions feature',
      });
    }

    const { role } = args;
    let result: Feature;

    forEach(this.rolesPerFeature, (roles, feature) => {
      if (roles.includes(role)) {
        result = feature as Feature;
      }
    });

    return result!;
  };

  /**
   * Assigns a role to a delegate
   *
   * @param delegateAddress wallet address of the delegate
   * @param role role to assign
   * @param description description of the delegate (defaults to empty string, is ignored if the delegate already exists)
   */
  public assignRole = async (args: {
    delegateAddress: string;
    role: SecurityTokenRole;
    description?: string;
  }) => {
    const { symbol } = this.securityToken;

    const procedure = new ChangeDelegatePermission(
      {
        symbol,
        assign: true,
        ...args,
      },
      this.context
    );

    return procedure.prepare();
  };

  /**
   * Removes a role from a delegate
   *
   * @param delegateAddress wallet address of the delegate
   * @param role role to revoke
   */
  public revokeRole = async (args: { delegateAddress: string; role: SecurityTokenRole }) => {
    const { symbol } = this.securityToken;

    const procedure = new ChangeDelegatePermission(
      {
        symbol,
        assign: false,
        ...args,
      },
      this.context
    );

    return procedure.prepare();
  };

  /**
   * Returns the list of roles assigned to a delegate address
   *
   * @param delegateAddress address for which to return assigned roles
   */
  public getAssignedRoles = async (args: { delegateAddress: string }) => {
    const { delegateAddress: delegate } = args;
    const {
      context: { contractWrappers },
      securityToken: { symbol, features },
    } = this;

    const isPermissionsEnabled = await features.isEnabled({ feature: Feature.Permissions });
    if (!isPermissionsEnabled) {
      throw new PolymathError({
        code: ErrorCode.FeatureNotEnabled,
        message: 'You must enable the Permissions feature',
      });
    }

    const generalPermissionManager = (await contractWrappers.getAttachedModules(
      { moduleName: ModuleName.GeneralPermissionManager, symbol },
      { unarchived: true }
    ))[0];

    const availableRoles = await this.getAvailableRoles();

    const rolesStatus = await P.map(availableRoles, async role => {
      const { moduleName, permission } = await contractWrappers.roleToPermission({ role });

      const moduleAddress = (await contractWrappers.getModuleAddressesByName(
        { symbol, moduleName },
        { unarchived: true }
      ))[0];

      const status = generalPermissionManager.checkPermission({
        permission,
        module: moduleAddress,
        delegate,
      });

      return {
        role,
        status,
      };
    });

    return rolesStatus.filter(({ status }) => status).map(({ role }) => role);
  };

  /**
   * Returns the list of delegate addresses that hold a specific role
   *
   * @param role role for which delegates must be fetched
   */
  public getDelegatesForRole = async (args: { role: SecurityTokenRole }) => {
    const { role } = args;
    const {
      context: { contractWrappers },
      securityToken: { symbol, features },
    } = this;

    const isPermissionsEnabled = await features.isEnabled({ feature: Feature.Permissions });
    if (!isPermissionsEnabled) {
      throw new PolymathError({
        code: ErrorCode.FeatureNotEnabled,
        message: 'You must enable the Permissions feature',
      });
    }

    const generalPermissionManager = (await contractWrappers.getAttachedModules(
      { moduleName: ModuleName.GeneralPermissionManager, symbol },
      { unarchived: true }
    ))[0];

    const { moduleName, permission } = await contractWrappers.roleToPermission({ role });

    const moduleAddress = (await contractWrappers.getModuleAddressesByName(
      { symbol, moduleName },
      { unarchived: true }
    ))[0];

    return generalPermissionManager.getAllDelegatesWithPerm({
      module: moduleAddress,
      perm: permission,
    });
  };

  /**
   * Returns a list of all delegates with their respective roles
   */
  public getAllDelegates = async () => {
    const {
      context: { contractWrappers },
      securityToken: { symbol, features },
    } = this;

    const isPermissionsEnabled = await features.isEnabled({ feature: Feature.Permissions });
    if (!isPermissionsEnabled) {
      throw new PolymathError({
        code: ErrorCode.FeatureNotEnabled,
        message: 'You must enable the Permissions feature',
      });
    }

    const generalPermissionManager = (await contractWrappers.getAttachedModules(
      { moduleName: ModuleName.GeneralPermissionManager, symbol },
      { unarchived: true }
    ))[0];

    const delegates = await generalPermissionManager.getAllDelegates();

    return P.map(delegates, async delegateAddress => {
      const roles = await this.getAssignedRoles({ delegateAddress });

      return {
        delegateAddress,
        roles,
      };
    });
  };

  private rolesPerFeature = {
    [Feature.Permissions]: [SecurityTokenRole.PermissionsAdministrator],
    [Feature.Shareholders]: [SecurityTokenRole.ShareholdersAdministrator],
    [Feature.Erc20Dividends]: [
      SecurityTokenRole.Erc20DividendsAdministrator,
      SecurityTokenRole.Erc20DividendsOperator,
    ],
    [Feature.EtherDividends]: [
      SecurityTokenRole.EtherDividendsAdministrator,
      SecurityTokenRole.EtherDividendsOperator,
    ],
  };
}
