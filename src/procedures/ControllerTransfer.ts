import { Procedure } from './Procedure';
import { ProcedureType, PolyTransactionTag, ControllerTransferArgs, ErrorCode } from '../types';
import { PolymathError } from '../PolymathError';
import { isValidAddress } from '../utils';

export class ControllerTransfer extends Procedure<ControllerTransferArgs> {
  public type = ProcedureType.ControllerTransfer;

  public async prepareTransactions() {
    const { symbol, value, from, to, log: log = '', data: data = '' } = this.args;
    const { contractWrappers, currentWallet } = this.context;
    const addresses: { [key: string]: string } = { from, to };

    /**
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

    const senderBalance = await securityToken.balanceOf({ owner: from });
    if (senderBalance.lt(value)) {
      throw new PolymathError({
        code: ErrorCode.InsufficientBalance,
        message: `Sender's balance "${senderBalance}" is less than the requested amount "${value}."`,
      });
    }

    const controller = await securityToken.controller();
    let account: string;

    if (currentWallet) {
      ({ address: account } = currentWallet);
    } else {
      throw new PolymathError({
        message:
          "No default account set. You must pass the token owner's private key to Polymath.connect()",
        code: ErrorCode.ProcedureValidationError,
      });
    }

    if (account !== controller) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `You must be the controller of this Security Token to perform forced transfers. Did you remember to call "setController"?`,
      });
    }

    /**
     * Transactions
     */

    await this.addTransaction(securityToken.forceTransfer, {
      tag: PolyTransactionTag.ControllerTransfer,
    })({ from, to, value, data, log });
  }
}
