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

export class ControllerRedeem extends Procedure<ControllerRedeemProcedureArgs> {
  public type = ProcedureType.ControllerRedeem;

  public async prepareTransactions() {
    const { symbol, amount, from, log = '', data = '' } = this.args;
    const { contractWrappers, currentWallet, factories } = this.context;

    /**
     * Validation
     */

    if (!isValidAddress(from)) {
      throw new PolymathError({
        code: ErrorCode.InvalidAddress,
        message: `Provided from address is invalid: ${from}`,
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

    const senderBalance = await securityToken.balanceOf({
      owner: from,
    });
    if (senderBalance.lt(amount)) {
      throw new PolymathError({
        code: ErrorCode.InsufficientBalance,
        message: `Balance of ${senderBalance} is less than the requested amount of ${amount} being redeemed`,
      });
    }

    const controller = await securityToken.controller();

    const account = await currentWallet.address();

    if (account !== controller) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `You must be the controller of this Security Token to perform forced transfers. Did you remember to call "setController"?`,
      });
    }

    /**
     * Transactions
     */
    await this.addTransaction(securityToken.controllerRedeem, {
      tag: PolyTransactionTag.ControllerRedeem,
      resolver: createControllerRedeemResolver(factories, symbol, from),
    })({ from, value: amount, data, operatorData: log });
  }
}
export const createControllerRedeemResolver = (
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
