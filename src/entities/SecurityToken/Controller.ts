/**
 * @packageDocumentation
 * @module Entities.SecurityToken
 */

import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { SubModule } from './SubModule';
import {
  ControllerTransfer,
  SetController,
  ControllerRedeem,
  DisableController,
  SignDisableControllerAck,
} from '../../procedures';

/**
 * Namespace that handles all Controller related functionality
 */
export class Controller extends SubModule {
  /**
   * Set the address of the Security Token's Controller. The controller may perform forced transfers
   *
   * @param args.controller - security token's controller address
   */
  public modifyController = async (args: { controller: string }) => {
    const { controller } = args;
    const { symbol } = this.securityToken;
    const procedure = new SetController({ symbol, controller }, this.context);

    return procedure.prepare();
  };

  /**
   * Permanently disable controller functionality
   *
   * @param args.signature - optional signed data. If not passed, signing will be requested when the transaction queue is run. The data can be generated beforehand by the token owner calling `signDisableAck`
   */
  public disable = async (args?: { signature?: string }) => {
    const { symbol } = this.securityToken;
    const procedure = new DisableController({ ...args, symbol }, this.context);
    return procedure.prepare();
  };

  /**
   * Perform a forced transfer of tokens from one address to another. You must be the
   * Security Token's controller to do this
   *
   * @param args.amount - amount of tokens to be transferred
   * @param args.from - address from which to transfer tokens
   * @param args.to - address that will receive the tokens
   * @param args.reason - optional message to describe why the transfer occurred
   * @param args.data - optional data used to validate the transfer
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
   * @param args.amount - amount of tokens to be redeemed
   * @param args.address - address of the token holder
   * @param args.reason - optional message to describe why the redemption occurred
   * @param args.data - optional data used to validate the transfer
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

  /**
   * Generate a signature string that can be used to permanently disable the Security Token's controller functionality
   *
   * **Note that only the owner's signature is valid for this operation**
   */
  public signDisableAck = async () => {
    const { symbol } = this.securityToken;

    const procedure = new SignDisableControllerAck({ symbol }, this.context);

    return procedure.prepare();
  };
}
