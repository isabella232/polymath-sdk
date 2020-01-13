import { ModuleName } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
  ModifyMaxHolderCountProcedureArgs,
} from '../types';
import { PolymathError } from '../PolymathError';

/**
 * Procedure that modifies the maximum amount of token holders for an STO
 */
export class ModifyMaxHolderCount extends Procedure<ModifyMaxHolderCountProcedureArgs> {
  public type = ProcedureType.ModifyMaxHolderCount;

  /**
   * - Sets the cap for the amount of token holders there can be
   *
   * Note that this procedure will fail if the security token symbol doesn't exist
   * Note that this procedure will fail if the security token has disabled the ShareholderCountRestrictions feature
   */
  public async prepareTransactions() {
    const { symbol, maxHolderCount } = this.args;
    const { contractWrappers } = this.context;

    try {
      await contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(symbol);
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    const countTransferManagerModule = (await contractWrappers.getAttachedModules(
      { moduleName: ModuleName.CountTransferManager, symbol },
      { unarchived: true }
    ))[0];

    if (!countTransferManagerModule) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: 'You must enable the ShareholderCountRestrictions Feature',
      });
    }

    await this.addTransaction(countTransferManagerModule.changeHolderCount, {
      tag: PolyTransactionTag.ChangeHolderCount,
    })({ maxHolderCount });
  }
}
