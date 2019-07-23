import { Procedure } from './Procedure';
import { Approve } from './Approve';
import {
  ReserveSecurityTokenProcedureArgs,
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
} from '../types';
import { PolymathError } from '../PolymathError';

export class ReserveSecurityToken extends Procedure<ReserveSecurityTokenProcedureArgs> {
  public type = ProcedureType.ReserveSecurityToken;

  public async prepareTransactions() {
    const { symbol, name, owner } = this.args;
    const {
      contractWrappers: { securityTokenRegistry },
      currentWallet,
    } = this.context;

    let ownerAddress: string;

    if (owner) {
      ownerAddress = owner;
    } else if (currentWallet) {
      ({ address: ownerAddress } = currentWallet);
    } else {
      throw new PolymathError({
        message: "No default account set. You must pass the owner's address as a parameter",
        code: ErrorCode.ProcedureValidationError,
      });
    }

    const isAvailable = await securityTokenRegistry.isTickerAvailable({
      ticker: symbol,
    });
    if (!isAvailable) {
      throw new PolymathError({
        message: `Ticker ${symbol} has already been registered`,
        code: ErrorCode.ProcedureValidationError,
      });
    }

    const fee = await securityTokenRegistry.getTickerRegistrationFee();
    await this.addProcedure(Approve)({
      amount: fee,
      spender: await securityTokenRegistry.address(),
      owner: ownerAddress,
    });

    await this.addTransaction(securityTokenRegistry.registerTicker, {
      tag: PolyTransactionTag.ReserveSecurityToken,
    })({ owner: ownerAddress, ticker: symbol, tokenName: name });
  }
}
