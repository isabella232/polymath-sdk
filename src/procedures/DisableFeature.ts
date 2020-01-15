import { SecurityToken, TransactionParams } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  DisableFeatureProcedureArgs,
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
} from '../types';
import { PolymathError } from '../PolymathError';

/**
 * Procedure to disable a Feature on a Security Token
 */
export class DisableFeature extends Procedure<DisableFeatureProcedureArgs> {
  public type = ProcedureType.DisableFeature;

  /**
   * Disable the Feature by archiving the attached module that corresponds to that Feature
   */
  public async prepareTransactions() {
    const { symbol, moduleName } = this.args;
    const { contractWrappers } = this.context;

    let securityToken: SecurityToken;

    try {
      securityToken = await contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(
        symbol
      );
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    const moduleAddress = (await contractWrappers.getModuleAddressesByName(
      {
        symbol,
        moduleName,
      },
      { unarchived: true }
    ))[0];

    await this.addTransaction<TransactionParams.SecurityToken.ArchiveModule>(
      securityToken.archiveModule,
      {
        tag: PolyTransactionTag.DisableFeature,
      }
    )({
      moduleAddress,
    });
  }
}
