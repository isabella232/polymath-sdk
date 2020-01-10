import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  ControllerTransferProcedureArgs,
  ErrorCode,
} from '../types';
import { PolymathError } from '../PolymathError';
import { isValidAddress } from '../utils';
import { SecurityToken, Shareholder } from '../entities';
import { Factories } from '../Context';

/**
 * @hidden
 */
export const createControllerTransferResolver = (
  factories: Factories,
  symbol: string,
  from: string,
  to: string
) => async () => {
  const refreshingFrom = factories.shareholderFactory.refresh(
    Shareholder.generateId({
      securityTokenId: SecurityToken.generateId({ symbol }),
      address: from,
    })
  );

  const refreshingTo = factories.shareholderFactory.refresh(
    Shareholder.generateId({
      securityTokenId: SecurityToken.generateId({ symbol }),
      address: to,
    })
  );

  return Promise.all([refreshingFrom, refreshingTo]);
};

/**
 * Procedure to perform a forced transfer by a controller wallet
 */
export class ControllerTransfer extends Procedure<ControllerTransferProcedureArgs> {
  public type = ProcedureType.ControllerTransfer;

  /**
   * - Force transfer tokens from one valid address to another
   *
   * - Refresh the Shareholder entity in the SDK cache
   *
   * Note this procedure will fail if any from or to addresses are invalid
   *
   * Note this procedure will fail if the senders (from) balance is less than the amount being transferred
   *
   * Note this procedure will fail if the current wallet address is not the security token controller address
   */
  public async prepareTransactions() {
    const { symbol, amount, from, to, log = '', data = '' } = this.args;
    const { contractWrappers, currentWallet, factories } = this.context;
    const addresses: { [key: string]: string } = { from, to };

    /*
     * Validation
     */
    Object.keys(addresses).forEach(key => {
      if (!isValidAddress(addresses[key])) {
        throw new PolymathError({
          code: ErrorCode.InvalidAddress,
          message: `Provided "${key}" address is invalid: ${addresses[key]}`,
        });
      }
    });

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
        message: `Sender's balance of ${senderBalance} is less than the requested amount of ${amount}`,
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

    /*
     * Transactions
     */
    await this.addTransaction(securityToken.controllerTransfer, {
      tag: PolyTransactionTag.ControllerTransfer,
      resolvers: [createControllerTransferResolver(factories, symbol, from, to)],
    })({ from, to, value: amount, data, operatorData: log });
  }
}
