import { SubModule } from './SubModule';
import { EnableGeneralPermissionManager, ChangeDelegatePermission } from '../../procedures';
import { PermissibleOperation } from '../../types';

export class Permissions extends SubModule {
  /**
   * Enable permissions features. This allows you to add delegate addresses
   * that can perform certain operations on your security token
   */
  public enable = async () => {
    const { symbol } = this.securityToken;
    const procedure = new EnableGeneralPermissionManager(
      {
        symbol,
      },
      this.context
    );
    return procedure.prepare();
  };

  /**
   * Grant or revoke a permission to a delegate address
   *
   * @param delegate delegate address
   * @param op operation for which to modify permission
   * @param isGranted whether to grant or revoke the permission
   * @param details description of the delegate (defaults to empty string, is ignored if the delegate already exists)
   */
  public changeDelegatePermission = async (args: {
    delegate: string;
    op: PermissibleOperation;
    isGranted: boolean;
    details?: string;
  }) => {
    const { symbol } = this.securityToken;

    const procedure = new ChangeDelegatePermission(
      {
        symbol,
        ...args,
      },
      this.context
    );

    return procedure.prepare();
  };
}
