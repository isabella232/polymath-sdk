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
import { Factories } from '~/Context';

/**
 * Procedure to transfer security tokens.
 */
export class TransferSecurityTokens extends Procedure<TransferSecurityTokensProcedureArgs> {
  public type = ProcedureType.TransferSecurityTokens;

  private checkTransferStatus(
    statusCode: TransferStatusCode,
    fromAddress: string,
    symbol: string,
    to: string,
    reasonCode: string
  ) {
    if (statusCode !== TransferStatusCode.TransferSuccess) {
      throw new PolymathError({
        code: ErrorCode.TransferError,
        message: `[${statusCode}] ${fromAddress} is not allowed to transfer ${symbol} to ${to}. Possible reason: ${reasonCode}`,
      });
    }
  }

  public async prepareTransactions() {
    const { symbol, to, amount, data = '', from } = this.args;
    const { contractWrappers, currentWallet, factories } = this.context;

    let fromAddress = await currentWallet.address();

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

    if (from && from !== fromAddress) {
      fromAddress = from;
      const { statusCode, reasonCode } = await securityToken.canTransferFrom({
        to,
        value: amount,
        from,
      });
      this.checkTransferStatus(statusCode, from, symbol, to, reasonCode);
    } else {
      const { statusCode, reasonCode } = await securityToken.canTransfer({ to, value: amount });
      this.checkTransferStatus(statusCode, fromAddress, symbol, to, reasonCode);
    }

    await this.addTransaction(securityToken.transferFromWithData, {
      tag: PolyTransactionTag.TransferSecurityTokens,
      resolver: createTransferSecurityTokensResolver(factories, symbol, from || fromAddress, to),
    })({ from: from || fromAddress, to, value: amount, data });
  }
}

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
