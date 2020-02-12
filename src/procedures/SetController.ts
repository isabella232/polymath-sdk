/**
 * @packageDocumentation
 * @module Procedures
 */

import { Procedure } from './Procedure';
import { ProcedureType, PolyTransactionTag, SetControllerProcedureArgs, ErrorCode } from '../types';
import { PolymathError } from '../base/PolymathError';
import { isValidAddress } from '../utils';

/**
 * Procedure that sets the Controller of a Security Token.
 * A Security Token's Controller can perform special functions reserved solely for them, such as forced transfers and redeeming (burning) tokens
 */
export class SetController extends Procedure<SetControllerProcedureArgs> {
  public type = ProcedureType.SetController;

  /**
   * Set the Controller address of the Security Token
   *
   * Note this procedure will fail if:
   * - The supplied address is invalid
   * - The current wallet address is not the owner of the Security Token
   */
  public async prepareTransactions() {
    const { symbol, controller } = this.args;
    const { contractWrappers, currentWallet } = this.context;

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

    if (!isValidAddress(controller)) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `Controller address "${controller}" is invalid.`,
      });
    }

    const owner = await securityToken.owner();
    const account = await currentWallet.address();

    if (account !== owner) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `You must be the owner of this Security Token to set the controller`,
      });
    }

    /*
     * Transactions
     */
    await this.addTransaction(securityToken.setController, {
      tag: PolyTransactionTag.SetController,
    })({ controller });
  }
}
