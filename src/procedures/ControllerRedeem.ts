import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
  ControllerRedeemProcedureArgs,
} from '../types';
import { PolymathError } from '../PolymathError';
import { isValidAddress } from '../utils';
import { SecurityToken, Shareholder } from '../entities';
import { Factories } from '../Context';

/**
 * @hidden
 */
export const createRefreshSecurityTokenResolver = (
  factories: Factories,
  symbol: string
) => async () => {
  return factories.securityTokenFactory.refresh(SecurityToken.generateId({ symbol }));
};

/**
 * @hidden
 */
export const createRefreshShareholdersResolver = (
  factories: Factories,
  symbol: string,
  from: string
) => async () => {
  return factories.shareholderFactory.refresh(
    Shareholder.generateId({
      securityTokenId: SecurityToken.generateId({ symbol }),
      address: from,
    })
  );
};

/**
 * Procedure to redeem tokens by a controller wallet
 */
export class ControllerRedeem extends Procedure<ControllerRedeemProcedureArgs> {
  public type = ProcedureType.ControllerRedeem;

  /**
   * - Redeem tokens from a specific address, optionally providing a reason or extra data for the action
   *
   * - Refresh the Shareholder entity in the SDK cache
   *
   * Note this procedure will fail if:
   * - Any (from) addresses are invalid
   * - The senders (from) balance is less than the amount being transferred
   * - The current wallet address is not the security token controller address
   */
  public async prepareTransactions() {
    const { symbol, amount, from, reason = '', data = '' } = this.args;
    const { contractWrappers, currentWallet, factories } = this.context;

    /*
     * Validation
     */
    if (!isValidAddress(from)) {
      throw new PolymathError({
        code: ErrorCode.InvalidAddress,
        message: `Provided "from" address is invalid: ${from}`,
      });
    }

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

    const [senderBalance, controller, account] = await Promise.all([
      securityToken.balanceOf({
        owner: from,
      }),
      securityToken.controller(),
      currentWallet.address(),
    ]);
    if (senderBalance.lt(amount)) {
      throw new PolymathError({
        code: ErrorCode.InsufficientBalance,
        message: `Balance of ${senderBalance} is less than the requested amount of ${amount} being redeemed`,
      });
    }

    if (account !== controller) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `You must be the controller of this Security Token to redeem tokens. Did you remember to call "setController"?`,
      });
    }

    /*
     * Transactions
     */
    await this.addTransaction(securityToken.controllerRedeem, {
      tag: PolyTransactionTag.ControllerRedeem,
      resolvers: [
        createRefreshShareholdersResolver(factories, symbol, from),
        createRefreshSecurityTokenResolver(factories, symbol),
      ],
    })({ from, value: amount, data, operatorData: reason });
  }
}
