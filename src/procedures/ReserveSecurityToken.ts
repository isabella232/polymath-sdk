import { Procedure } from './Procedure';
import { Approve } from './Approve';
import {
  ReserveSecurityTokenProcedureArgs,
  ProcedureTypes,
  PolyTransactionTags,
} from '../types';

export class ReserveSecurityToken extends Procedure<
  ReserveSecurityTokenProcedureArgs
> {
  public type = ProcedureTypes.ReserveSecurityToken;
  public async prepareTransactions() {
    const { symbol, name } = this.args;
    const { securityTokenRegistry, currentWallet } = this.context;

    // TODO @RafaelVidaurre: See if ticker is not already registered

    const fee = await securityTokenRegistry.getTickerRegistrationFee();

    await this.addTransaction(Approve)({
      amount: fee,
      spender: securityTokenRegistry.address,
    });

    await this.addTransaction(securityTokenRegistry.registerTicker, {
      tag: PolyTransactionTags.ReserveSecurityToken,
    })({ owner: currentWallet.address, ticker: symbol, tokenName: name });
  }
}
