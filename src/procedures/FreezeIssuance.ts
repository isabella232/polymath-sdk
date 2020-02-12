/**
 * @packageDocumentation
 * @module Procedures
 */

import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  FreezeIssuanceProcedureArgs,
  ErrorCode,
} from '../types';
import { PolymathError } from '../base/PolymathError';

/**
 * Procedure that permanently freezes issuance of a Security Token. This requires the Security Token's owner to send signed data in acknowledgement
 */
export class FreezeIssuance extends Procedure<FreezeIssuanceProcedureArgs> {
  public type = ProcedureType.FreezeIssuance;

  /**
   * - If no signature acknowledgement data (optional) is appended to the procedure arguments, the procedure itself will request the user's signature or sign the data in place if the client was instanced with a private key
   * - Freeze the issuance of the Security Token
   *
   * Note this procedure will fail if:
   * - The current user is not the owner of the Security Token
   * - Issuance has already been frozen
   */
  public async prepareTransactions() {
    const { signature, symbol } = this.args;
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

    const [owner, account, isIssuable] = await Promise.all([
      securityToken.owner(),
      currentWallet.address(),
      securityToken.isIssuable(),
    ]);

    if (account !== owner) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `You must be the owner of this Security Token to freeze issuance`,
      });
    }

    if (!isIssuable) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `Issuance has already been frozen permanently`,
      });
    }
    // If there is no hex signature passed in, create a signature request to sign the freeze issuance acknowledgement
    const requestedSignature =
      signature || (await this.addSignatureRequest(securityToken.signFreezeIssuanceAck)({}));

    /*
     * Transactions
     */
    await this.addTransaction(securityToken.freezeIssuance, {
      tag: PolyTransactionTag.FreezeIssuance,
    })({ signature: requestedSignature });
  }
}
