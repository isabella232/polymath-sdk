import { Procedure } from './Procedure';
import { ProcedureTypes, PolyTransactionTags, EnablePermissionModuleProcedureArgs } from '../types';

export class EnablePermissionModule extends Procedure<EnablePermissionModuleProcedureArgs> {
  public type = ProcedureTypes.EnablePermissionModule;

  public async prepareTransactions() {
    const { symbol } = this.args;
    const { securityTokenRegistry } = this.context;

    const securityToken = await securityTokenRegistry.getSecurityToken({
      ticker: symbol,
    });

    await this.addTransaction(securityToken.addPermissionModule, {
      tag: PolyTransactionTags.EnablePermissionModule,
    })();
  }
}
