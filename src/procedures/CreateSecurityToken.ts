import { Procedure } from './Procedure';
import { Approve } from '../procedures/Approve';
import { CreateSecurityTokenProcedureArgs, ProcedureType, PolyTransactionTag } from '../types';

export class CreateSecurityToken extends Procedure<CreateSecurityTokenProcedureArgs> {
  public type = ProcedureType.CreateSecurityToken;

  public async prepareTransactions() {
    const { name, symbol, detailsUrl = '', divisible } = this.args;
    const {
      contractWrappers: { securityTokenRegistry },
    } = this.context;
    const fee = await securityTokenRegistry.getSecurityTokenLaunchFee();

    await this.addProcedure(Approve)({
      amount: fee,
      spender: await securityTokenRegistry.address(),
    });

    await this.addTransaction(securityTokenRegistry.generateSecurityToken, {
      tag: PolyTransactionTag.CreateSecurityToken,
    })({
      name,
      ticker: symbol,
      details: detailsUrl,
      divisible,
    });
  }
}
