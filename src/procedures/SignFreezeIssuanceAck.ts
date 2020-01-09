import { Procedure } from './Procedure';
import { ProcedureType, ErrorCode, SignFreezeIssuanceAckProcedureArgs } from '../types';
import { PolymathError } from '../PolymathError';

/**
 * Procedure to sign an acknowledgement for freezing the issuance of a security token
 */
export class SignFreezeIssuanceAck extends Procedure<SignFreezeIssuanceAckProcedureArgs> {
  public type = ProcedureType.SignFreezeIssuanceAck;

  /**
   * - Sign an acknowledgement to freeze the issuance of the security token
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
