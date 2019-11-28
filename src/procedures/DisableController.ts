import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  DisableControllerProcedureArgs,
  ErrorCode,
} from '../types';
import { PolymathError } from '../PolymathError';

export class DisableController extends Procedure<DisableControllerProcedureArgs> {
  public type = ProcedureType.DisableController;

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

    const owner = await securityToken.owner();
    const account = await currentWallet.address();

    if (account !== owner) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `You must be the owner of this Security Token to disable the controller`,
      });
    }

    if (!securityToken.isControllable()) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `The security token isControllable method is not currently valid, disable controller method can only be called on controllable security tokens`,
      });
    }

    /**
     * Transactions
     */
    await this.addTransaction(securityToken.disableController, {
      tag: PolyTransactionTag.DisableController,
    })({ signature });
  }
}
