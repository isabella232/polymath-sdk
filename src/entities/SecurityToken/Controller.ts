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
  public controllerTransfer = async (args: {
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
   * This function allows (only) a controller to redeem tokens for any token holder.
   * The redemption must still respect the balances of the token holder (so the redemption must be for at most
   * `balanceOf(tokenHolder)` tokens) and potentially also need to respect other transfer restrictions.
   *
   * @param amount The amount of tokens need to be redeemed.
   * @param from The account whose tokens will be redeemed.
   * @param reason Optional message to describe why the redemption occurred
   * @param data Optional data used to validate the transfer
   */
  public controllerRedeem = async (args: {
    amount: BigNumber;
    from: string;
    reason?: string;
    data?: string;
  }) => {
    const { amount, from, reason = '', data = '' } = args;
    const { symbol } = this.securityToken;

    const procedure = new ControllerRedeem(
      { symbol, amount, from, log: reason, data },
      this.context
    );

    return procedure.prepare();
  };
}
