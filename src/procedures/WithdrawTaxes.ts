/**
 * @packageDocumentation
 * @module Procedures
 */

import { ModuleName, TransactionParams } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import { WithdrawTaxesProcedureArgs, ProcedureType, PolyTransactionTag, ErrorCode } from '../types';
import { PolymathError } from '../PolymathError';
import { DividendDistribution, SecurityToken } from '../entities';
import { Factories } from '../Context';

/**
 * @hidden
 */
export const createWithdrawTaxesResolver = (
  dividendIndex: number,
  factories: Factories,
  symbol: string
) => async () => {
  return factories.dividendDistributionFactory.refresh(
    DividendDistribution.generateId({
      securityTokenId: SecurityToken.generateId({ symbol }),
      index: dividendIndex,
    })
  );
};

/**
 * Procedure that allows an issuer to withdraw withheld tax from a Dividend Distribution
 */
export class WithdrawTaxes extends Procedure<WithdrawTaxesProcedureArgs> {
  public type = ProcedureType.WithdrawTaxes;

  /**
   * Withdraw Tax Withholdings
   *
   * Note that this procedure will fail if:
   * - The security token doesn't exist
   * - The Dividends Feature hasn't been enabled
   */
  public async prepareTransactions() {
    const { symbol, dividendIndex } = this.args;
    const { contractWrappers, factories } = this.context;

    try {
      await contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(symbol);
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    const [dividendModule] = await contractWrappers.getAttachedModules(
      { moduleName: ModuleName.ERC20DividendCheckpoint, symbol },
      { unarchived: true }
    );

    if (!dividendModule) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: "The Dividends Feature hasn't been enabled",
      });
    }

    await this.addTransaction<TransactionParams.DividendCheckpoint.WithdrawWithholding>(
      dividendModule.withdrawWithholding,
      {
        tag: PolyTransactionTag.WithdrawTaxWithholdings,
        resolvers: [createWithdrawTaxesResolver(dividendIndex, factories, symbol)],
      }
    )({ dividendIndex });
  }
}
