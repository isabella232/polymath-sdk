/**
 * @packageDocumentation
 * @module Procedures
 */

import { BigNumber, TransferStatusCode } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  TransferSecurityTokensProcedureArgs,
  ErrorCode,
  ProcedureType,
  PolyTransactionTag,
} from '../types';
import { PolymathError } from '../PolymathError';
import { SecurityToken, Shareholder } from '../entities';
import { Factories } from '../Context';

/**
 * @hidden
 */
export const createTransferSecurityTokensResolver = (
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
 * Procedure that transfer security tokens
 */
export class TransferSecurityTokens extends Procedure<TransferSecurityTokensProcedureArgs> {
  public type = ProcedureType.TransferSecurityTokens;

  /**
   * @hidden
   */
  private checkTransferStatus(
    statusCode: TransferStatusCode,
    fromAddress: string,
    symbol: string,
    to: string,
    reasonCode: string,
    amount: BigNumber
  ) {
    if (statusCode !== TransferStatusCode.TransferSuccess) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `Wallet "${fromAddress}" is not allowed to transfer ${amount} "${symbol}" tokens to "${to}". Possible reason: ${reasonCode}`,
      });
    }
  }

  /**
   * Transfer security tokens from a wallet address to another
   * ***If from argument is not provided, the current SDK user address will be taken as it***
   *
   * Note that this procedure will fail if the security token symbol doesn't exist
   */
  public async prepareTransactions() {
    const { symbol, to, amount, data = '', from } = this.args;
    const { contractWrappers, currentWallet, factories } = this.context;

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

    const fromAddress = await currentWallet.address();

    if (from && from !== fromAddress) {
      const { statusCode, reasonCode } = await securityToken.canTransferFrom({
        to,
        value: amount,
        from,
      });
      this.checkTransferStatus(statusCode, from, symbol, to, reasonCode, amount);
    } else {
      const { statusCode, reasonCode } = await securityToken.canTransfer({ to, value: amount });
      this.checkTransferStatus(statusCode, fromAddress, symbol, to, reasonCode, amount);
    }

    await this.addTransaction(securityToken.transferFromWithData, {
      tag: PolyTransactionTag.TransferSecurityTokens,
      resolvers: [createTransferSecurityTokensResolver(factories, symbol, from || fromAddress, to)],
    })({ from: from || fromAddress, to, value: amount, data });
  }
}
