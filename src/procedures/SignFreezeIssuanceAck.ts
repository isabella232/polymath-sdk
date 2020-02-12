/**
 * @packageDocumentation
 * @module Procedures
 */

import { Procedure } from './Procedure';
import { ProcedureType, ErrorCode, SignFreezeIssuanceAckProcedureArgs } from '../types';
import { PolymathError } from '../PolymathError';

/**
 * Procedure that signs an acknowledgement to permanently freeze issuance of a Security Token
 */
export class SignFreezeIssuanceAck extends Procedure<SignFreezeIssuanceAckProcedureArgs> {
  public type = ProcedureType.SignFreezeIssuanceAck;

  /**
   * Sign data to confirm the intent of permanently disabling issuance of the Security Token
   */
  public async prepareTransactions() {
    const { symbol } = this.args;
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

    await this.addSignatureRequest(securityToken.signFreezeIssuanceAck)({});
  }
}
