import { Procedure } from './Procedure';
import { ProcedureType, ErrorCode, SignDisableControllerAckProcedureArgs } from '../types';
import { PolymathError } from '../PolymathError';

/**
 * Procedure to sign an acknowledgement for disabling the controller of a security token
 */
export class SignDisableControllerAck extends Procedure<SignDisableControllerAckProcedureArgs> {
  public type = ProcedureType.SignDisableControllerAck;

  /**
   * - Sign an acknowledgement to disable the controller of the security token
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

    await this.addSignatureRequest(securityToken.signDisableControllerAck)({});
  }
}
