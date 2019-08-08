import { ModuleName } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import { ProcedureType, PolyTransactionTag, PauseStoProcedureArgs, ErrorCode } from '../types';
import { PolymathError } from '../PolymathError';
import { isValidAddress } from '../utils';

export class PauseSto extends Procedure<PauseStoProcedureArgs> {
  public type = ProcedureType.PauseSto;

  public async prepareTransactions() {
    const { stoAddress } = this.args;
    const { contractWrappers } = this.context;

    /**
     * Validation
     */

    if (!isValidAddress(stoAddress)) {
      throw new PolymathError({
        code: ErrorCode.InvalidAddress,
        message: `Invalid STO address ${stoAddress}`,
      });
    }

    // here we can use any STO wrapper because they all implement the pause method
    const stoModule = await contractWrappers.moduleFactory.getModuleInstance({
      name: ModuleName.CappedSTO,
      address: stoAddress,
    });

    if (!stoModule) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `STO ${stoAddress} is either archived or hasn't been launched.`,
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
