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

export const createRefreshSecurityTokenResolver = (
  factories: Factories,
  symbol: string
) => async () => {
  return factories.securityTokenFactory.refresh(SecurityToken.generateId({ symbol }));
};

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

export class ControllerRedeem extends Procedure<ControllerRedeemProcedureArgs> {
  public type = ProcedureType.ControllerRedeem;

  public async prepareTransactions() {
    const { symbol, amount, from, reason = '', data = '' } = this.args;
    const { contractWrappers, currentWallet, factories } = this.context;

    /**
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

    /**
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
