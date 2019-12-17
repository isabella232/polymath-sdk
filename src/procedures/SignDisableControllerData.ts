import { Procedure } from './Procedure';
import { ProcedureType, ErrorCode, SignDisableControllerDataProcedureArgs } from '../types';
import { PolymathError } from '../PolymathError';

export class SignDisableControllerData extends Procedure<SignDisableControllerDataProcedureArgs> {
  public type = ProcedureType.SignDisableControllerData;

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
