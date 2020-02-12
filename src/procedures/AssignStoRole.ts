/**
 * @packageDocumentation
 * @module Procedures
 */

import { ModuleName, conversionUtils, Perm } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  AssignStoRoleProcedureArgs,
  ErrorCode,
  StoRole,
} from '../types';
import { PolymathError } from '../base/PolymathError';
import { checkStringLength } from '../utils';

/**
 * Procedure to assign an STO Role to a delegate
 */
export class AssignStoRole extends Procedure<AssignStoRoleProcedureArgs> {
  public type = ProcedureType.AssignStoRole;

  /**
   * - If the delegate does not exist, the delegate address will be added
   * - The specified Role will be assigned/revoked to/from the delegate
   *
   * Note this procedure will fail if:
   * - The Permissions Feature hasn't been enabled on the Security Token
   * - You attempt to assign/revoke a Role that has already been assigned/revoked
   */
  public async prepareTransactions() {
    const { symbol, role, assign, description = '', delegateAddress, stoAddress } = this.args;
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

    const perm = role === StoRole.StoAdministrator ? Perm.Admin : Perm.Operator;

    const delegates = await permissionModule.getAllDelegates();
    const exists = delegates.filter(element => element === delegate).length > 0;

    /*
     * In the following block we attempt to:
     * - Find whether the delegate address is already present. Otherwise add them
     * - Find whether the current delegate permission is equal to the provided one. Otherwise change permissions
     */
    if (exists) {
      const permittedDelegates: string[] = await permissionModule.getAllDelegatesWithPerm({
        module: stoAddress,
        perm,
      });

      const permitted = !!permittedDelegates.find(element => element === delegate);

      // Upcoming permission equals existing one
      if (permitted === assign) {
        throw new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `Role ${role} has already been ${
            assign ? 'assigned to' : 'revoked from'
          } delegate for this STO.`,
        });
      }
    } else {
      checkStringLength(description, 'description');
      // Delegate not found. Add them here
      await this.addTransaction(permissionModule.addDelegate, {
        tag: PolyTransactionTag.ChangePermission,
      })({ delegate, details: description });
    }

    // Change delegate permission
    await this.addTransaction(permissionModule.changePermission, {
      tag: PolyTransactionTag.ChangePermission,
    })({ delegate, module: stoAddress, perm, valid: assign });
  }
}
