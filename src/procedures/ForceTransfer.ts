import { Procedure } from './Procedure';
import { ProcedureTypes, PolyTransactionTags, ForceTransferArgs, ErrorCodes } from '../types';
import { PolymathError } from '../PolymathError';
import { isValidAddress } from '../utils';

export class ForceTransfer extends Procedure<ForceTransferArgs> {
  public type = ProcedureTypes.ForceTransfer;

  public async prepareTransactions() {
    const { symbol, value, from, to, log, data } = this.args;
    const { securityTokenRegistry } = this.context;
    const addresses: { [key: string]: string } = { from, to };

    /**
     * Validation
     */

    Object.keys(addresses).forEach(key => {
      if (!isValidAddress(addresses[key])) {
        throw new PolymathError({
          code: ErrorCodes.InvalidAddress,
          message: `Provided "${key}" address is invalid: ${addresses[key]}`,
        });
      }
    });

    const securityToken = await securityTokenRegistry.getSecurityToken({
      ticker: symbol,
    });

    if (!securityToken) {
      throw new PolymathError({
        code: ErrorCodes.FetcherValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    const senderBalance = await securityToken.balanceOf({ address: from });
    if (senderBalance.lt(value)) {
      throw new PolymathError({
        code: ErrorCodes.InsufficientBalance,
        message: `Sender's balance "${senderBalance}" is less than the requested amount "${value}."`,
      });
    }

    /**
     * Transactions
     */

    await this.addTransaction(securityToken.forceTransfer, {
      tag: PolyTransactionTags.ForceTransfer,
    })({ from, to, value, data, log });
  }
}
