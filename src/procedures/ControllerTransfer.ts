/**
 * @packageDocumentation
 * @module Procedures
 */

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
 * Procedure that forcefully transfers Security Tokens from one account to another.
 * Can only be executed by the Security Token's Controller
 */
export class ControllerTransfer extends Procedure<ControllerTransferProcedureArgs> {
  public type = ProcedureType.ControllerTransfer;

  /**
   * Forcefully transfer tokens from one address to another
   *
   * Note this procedure will fail if:
   * - Any of the addresses are invalid
   * - The sender's ("from" address) balance is less than the amount being transferred
   * - The current wallet address is not the Security Token controller address
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
