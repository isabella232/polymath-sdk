import { Procedure } from './Procedure';
import { ProcedureType, PolyTransactionTag, SetControllerArgs, ErrorCode } from '../types';
import { PolymathError } from '../PolymathError';
import { isValidAddress } from '../utils';

export class SetController extends Procedure<SetControllerArgs> {
  public type = ProcedureType.SetController;

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
    let account: string;

    if (currentWallet) {
      ({ address: account } = currentWallet);
    } else {
      throw new PolymathError({
        message:
          "No default account set. You must pass token owner's private key to Polymath.connect()",
        code: ErrorCode.ProcedureValidationError,
      });
    }

    if (account !== owner) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `You must be the owner of this Security Token to set the controller`,
      });
    }

    /**
     * Transactions
     */

    await this.addTransaction(securityToken.setController, {
      tag: PolyTransactionTag.SetController,
    })({ controller });
  }
}
