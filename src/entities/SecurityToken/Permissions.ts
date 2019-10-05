import { forEach } from 'lodash';
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
