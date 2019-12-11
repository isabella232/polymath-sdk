import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { SubModule } from './SubModule';
import { ControllerTransfer, SetController, ControllerRedeem } from '../../procedures';

export class Controller extends SubModule {
  /**
   * Set the address of the Security Token's Controller. The controller may perform forced transfers
   */
  public modifyController = async (args: { controller: string }) => {
    const { controller } = args;
    const { symbol } = this.securityToken;
    const procedure = new SetController({ symbol, controller }, this.context);

    return procedure.prepare();
  };

  /**
   * Perform a forced transfer of tokens from one address to another. You must be the
   * Security Token's controller to do this
   *
   * @param amount amount of tokens to be transferred
   * @param from address from which to transfer tokens
   * @param to address that will receive the tokens
   * @param reason optional message to describe why the transfer occurred
   * @param data optional data used to validate the transfer
   */
  public transfer = async (args: {
    amount: BigNumber;
    from: string;
    to: string;
    reason?: string;
    data?: string;
  }) => {
    const { amount, from, to, reason = '', data = '' } = args;
    const { symbol } = this.securityToken;

    const procedure = new ControllerTransfer(
      { symbol, amount, from, to, log: reason, data },
      this.context
    );

    return procedure.prepare();
  };

  /**
   * Redeem (burn) an amount of tokens from a token holder. Only the Security Token's controller can call this
   * This operation is subject to transfer restrictions and the amount is limited by the token holder's balance.
   * `balanceOf(tokenHolder)` tokens) and potentially also need to respect other transfer restrictions.
   *
   * @param amount of tokens to be redeemed
   * @param address of the token holder
   * @param reason optional message to describe why the redemption occurred
   * @param data optional data used to validate the transfer
   */
  public redeem = async (args: {
    amount: BigNumber;
    from: string;
    reason?: string;
    data?: string;
  }) => {
    const { symbol } = this.securityToken;

    const procedure = new ControllerRedeem({ symbol, ...args }, this.context);

    return procedure.prepare();
  };
}
