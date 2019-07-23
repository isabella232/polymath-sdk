import { ModuleName } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import { ProcedureType, PolyTransactionTag, PauseStoArgs, ErrorCode } from '../types';
import { PolymathError } from '../PolymathError';
import { isValidAddress } from '../utils';

export class PauseSto extends Procedure<PauseStoArgs> {
  public type = ProcedureType.PauseSto;

  public async prepareTransactions() {
    const { stoModuleAddress } = this.args;
    const { contractWrappers } = this.context;

    /**
     * Validation
     */

    if (!isValidAddress(stoModuleAddress)) {
      throw new PolymathError({
        code: ErrorCode.InvalidAddress,
        message: `Invalid module address ${stoModuleAddress}`,
      });
    }

    // here we can use any STO wrapper because they all implement the pause method
    const stoModule = await contractWrappers.moduleFactory.getModuleInstance({
      name: ModuleName.CappedSTO,
      address: stoModuleAddress,
    });

    if (!stoModule) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `module ${stoModuleAddress} is either archived or hasn't been enabled.`,
      });
    }

    /**
     * Transactions
     */

    await this.addTransaction(stoModule.pause, {
      tag: PolyTransactionTag.PauseSto,
    })({});
  }
}
