import { ModuleName, conversionUtils, Perm } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  AssignSecurityTokenRoleProcedureArgs,
  ErrorCode,
} from '../types';
import { PolymathError } from '../PolymathError';
import { SecurityToken } from '../entities';

export class AssignSecurityTokenRole extends Procedure<AssignSecurityTokenRoleProcedureArgs> {
  public type = ProcedureType.AssignSecurityTokenRole;

  public async prepareTransactions() {
    const { symbol, role, assign, description, delegateAddress } = this.args;
    const { contractWrappers } = this.context;
    const delegate = conversionUtils.checksumAddress(delegateAddress);

    try {
      await contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(symbol);
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    const permissionModule = (await contractWrappers.getAttachedModules(
      { moduleName: ModuleName.GeneralPermissionManager, symbol },
      { unarchived: true }
    ))[0];

    if (!permissionModule) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: 'You must enable the Permissions feature',
      });
    }

    const {
      permissions: { isRoleAvailable, getFeatureFromRole },
    } = await this.context.factories.securityTokenFactory.fetch(
      SecurityToken.generateId({ symbol })
    );
    const [isAvailable, requiredFeature] = await Promise.all([
      isRoleAvailable({ role }),
      getFeatureFromRole({ role }),
    ]);

    if (!isAvailable) {
      throw new PolymathError({
        code: ErrorCode.FeatureNotEnabled,
        message: `You must enable the ${requiredFeature} feature`,
      });
    }

    const { moduleName, permission: perm } = await contractWrappers.roleToPermission({ role });

    const moduleAddress = (await contractWrappers.getModuleAddressesByName(
      { moduleName, symbol },
      { unarchived: true }
    ))[0];

    const delegates = await permissionModule.getAllDelegates();
    const exists =
      delegates.filter(element => element.toUpperCase() === delegate.toUpperCase()).length > 0;

    /**
     * In the following block we attempt to:
     * - Find whether the delegate address is already present. Otherwise add them
     * - Find whether the current delegate permission is equal to the provided one. Otherwise change permissions
     */
    if (exists) {
      const permittedDelegates: string[] = await permissionModule.getAllDelegatesWithPerm({
        module: moduleAddress,
        perm,
      });

      const permitted = !!permittedDelegates.find(
        element => element.toUpperCase() === delegate.toUpperCase()
      );

      // Upcoming permission equals existing one
      if (permitted === assign) {
        throw new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `Role ${role} has already been ${
            assign ? 'assigned to' : 'revoked from'
          } delegate.`,
        });
      }
    } else {
      // Delegate not found. Add them here
      await this.addTransaction(permissionModule.addDelegate, {
        tag: PolyTransactionTag.AddDelegate,
      })({ delegate, details: description });
    }

    // Change delegate permission
    await this.addTransaction(permissionModule.changePermission, {
      tag: PolyTransactionTag.ChangePermission,
    })({ delegate, module: moduleAddress, perm, valid: assign });
  }
}
