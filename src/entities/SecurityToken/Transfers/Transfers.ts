import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { SubModule } from '../SubModule';
import { ControllerTransfer, SetController } from '../../../procedures';
import { Restrictions } from './Restrictions';
import { SecurityToken } from '../SecurityToken';
import { Context } from '../../../Context';

export class Transfers extends SubModule {
  public restrictions: Restrictions;

  constructor(securityToken: SecurityToken, context: Context) {
    super(securityToken, context);

    this.restrictions = new Restrictions(securityToken, context);
  }

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
}
