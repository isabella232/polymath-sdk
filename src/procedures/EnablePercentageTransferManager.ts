/**
 * @packageDocumentation
 * @module Procedures
 */

import { ModuleName, TransactionParams } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  EnablePercentageTransferManagerProcedureArgs,
  ErrorCode,
} from '../types';
import { PolymathError } from '../PolymathError';

/**
 * Procedure that enables Percentage Ownership Restictions on a Security Token. This allows setting a maximum percentage of the total supply that a single shareholder can own. Any token transfer that would result in a single shareholder owning more than the allowed percentage will fail
 */
export class EnablePercentageTransferManager extends Procedure<
  EnablePercentageTransferManagerProcedureArgs
> {
  public type = ProcedureType.EnablePercentageTransferManager;

  /**
   * Enable Percentage Ownership restrictions and set the max ownership percentage and whether primary issuance is exempted from said restrictions
   *
   * Note: Primary issuance exemption is disallowed by default unless otherwise specified
   */
  public async prepareTransactions() {
    const { symbol, maxHolderPercentage, allowPrimaryIssuance = false } = this.args;
    const { contractWrappers } = this.context;

    let securityToken;

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

    const tokenAddress = await securityToken.address();
    const moduleName = ModuleName.PercentageTransferManager;

    const moduleAddress = await contractWrappers.getModuleFactoryAddress({
      tokenAddress,
      moduleName,
    });

    await this.addTransaction<TransactionParams.SecurityToken.AddPercentageTransferManager>(
      securityToken.addModuleWithLabel,
      {
        tag: PolyTransactionTag.EnablePercentageTransferManager,
      }
    )({
      moduleName,
      address: moduleAddress,
      archived: false,
      data: {
        maxHolderPercentage,
        allowPrimaryIssuance,
      },
    });
  }
}
