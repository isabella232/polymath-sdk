import { Procedure } from './Procedure';
import { ProcedureType, PolyTransactionTag, SetControllerProcedureArgs, ErrorCode } from '../types';
import { PolymathError } from '../PolymathError';
import { isValidAddress } from '../utils';

/**
 * Procedure to set the controller of a security token by the owner
 */
export class SetController extends Procedure<SetControllerProcedureArgs> {
  public type = ProcedureType.SetController;

  /**
   * - Set the controller address of the security token
   *
   * Note this procedure will fail if:
   * - The inputted controller address is invalid
   * - The current wallet address is not the security token owner
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
