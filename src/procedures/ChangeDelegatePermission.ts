import { ModuleName, conversionUtils, Perm } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  ChangeDelegatePermissionProcedureArgs,
  ErrorCode,
  ModuleOperation,
} from '../types';
import { PolymathError } from '../PolymathError';

export class ChangeDelegatePermission extends Procedure<ChangeDelegatePermissionProcedureArgs> {
  public type = ProcedureType.ChangeDelegatePermission;

  public async prepareTransactions() {
    const { symbol, op, isGranted, details = '' } = this.args;
    const delegate = conversionUtils.checksumAddress(this.args.delegate);
    const { contractWrappers } = this.context;
    let moduleAddress: string;
    let perm: Perm;

    try {
      await contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(symbol);
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    // @TODO remon-nashid refactor into a map(op => {module, perm}).
    switch (op) {
      case ModuleOperation.GtmWhitelistUpdate:
        perm = Perm.Admin;
        const attachedModule = (await contractWrappers.getAttachedModules(
          { moduleName: ModuleName.GeneralTransferManager, symbol },
          { unarchived: true }
        ))[0];
        if (!attachedModule) {
          // GTM is supposedly attached to all tokens by default. If we reach this line
          // then something very wrong is happening.
          throw new PolymathError({
            code: ErrorCode.FatalError,
            message: `General Transfer manager module for token "${symbol}" isn't enabled. Please report this issue to the Polymath team`,
          });
        }
        moduleAddress = await attachedModule.address();
        break;
      default:
        throw new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `Unkown operation "${op}"`,
        });
    }

    const permissionModule = (await contractWrappers.getAttachedModules(
      { moduleName: ModuleName.GeneralPermissionManager, symbol },
      { unarchived: true }
    ))[0];
    if (!permissionModule)
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: "Permission module hasn't been enabled",
      });

    const delegates = await permissionModule.getAllDelegates();
    const exists = delegates.filter(element => element === delegate).length > 0;

    // In the following block we attempt to:
    // * Find whether the delegate address is already present. Otherwise add them.
    // * Find whether current delegate permission equals provided one. Otherwise change permissions.
    if (exists) {
      const permittedDelegates: string[] = await permissionModule.getAllDelegatesWithPerm({
        module: moduleAddress,
        perm,
      });

      const permitted = !!permittedDelegates.find(element => element === delegate);
      // Upcoming permission equals existing one.
      if (permitted === isGranted) {
        throw new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `Delegate\'s permission is already set to ${isGranted}.`,
        });
      }
    } else {
      // Delegate not found. Add them here.
      await this.addTransaction(permissionModule.addDelegate, {
        tag: PolyTransactionTag.ChangeDelegatePermission,
      })({ delegate, details });
    }

    // Change delegate permission
    await this.addTransaction(permissionModule.changePermission, {
      tag: PolyTransactionTag.ChangeDelegatePermission,
    })({ delegate, module: moduleAddress, perm, valid: isGranted });
  }
}
