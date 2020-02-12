/**
 * @packageDocumentation
 * @module Procedures
 */

import { ModuleName } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
  ModifyMaxHolderPercentageProcedureArgs,
} from '../types';
import { PolymathError } from '../PolymathError';

/**
 * Procedure that modifies the maximum percentage that an individual token holder can hold
 */
export class ModifyMaxHolderPercentage extends Procedure<ModifyMaxHolderPercentageProcedureArgs> {
  public type = ProcedureType.ModifyMaxHolderPercentage;

  /**
   * Modify the number of security tokens (expressed in percentage) that an investor can hold as maximum
   *
   * Note that this procedure will fail if:
   * - The security token symbol doesn't exist
   * - The security token has disabled the PercentageOwnershipRestrictions feature
   */
  public async prepareTransactions() {
    const { symbol, maxHolderPercentage } = this.args;
    const { contractWrappers } = this.context;

    try {
      await contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(symbol);
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    const percentageTransferManagerModule = (await contractWrappers.getAttachedModules(
      { moduleName: ModuleName.PercentageTransferManager, symbol },
      { unarchived: true }
    ))[0];

    if (!percentageTransferManagerModule) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: 'You must enable the PercentageOwnershipRestrictions Feature',
      });
    }

    await this.addTransaction(percentageTransferManagerModule.changeHolderPercentage, {
      tag: PolyTransactionTag.ChangeHolderPercentage,
    })({ maxHolderPercentage });
  }
}
