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
import { checkTransferStatus } from '../utils';

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
 * Procedure to transfer security tokens.
 */
export class TransferSecurityTokens extends Procedure<TransferSecurityTokensProcedureArgs> {
  public type = ProcedureType.TransferSecurityTokens;

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
      checkTransferStatus(statusCode, from, symbol, to, reasonCode);
    } else {
      const { statusCode, reasonCode } = await securityToken.canTransfer({ to, value: amount });
      checkTransferStatus(statusCode, fromAddress, symbol, to, reasonCode);
    }

    await this.addTransaction(securityToken.transferFromWithData, {
      tag: PolyTransactionTag.TransferSecurityTokens,
      resolvers: [createTransferSecurityTokensResolver(factories, symbol, from || fromAddress, to)],
    })({ from: from || fromAddress, to, value: amount, data });
  }
}
