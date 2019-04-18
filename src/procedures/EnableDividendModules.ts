import { Procedure } from './Procedure';
import { DividendModuleTypes } from '../LowLevel/types';
import {
  EnableDividendModulesProcedureArgs,
  ProcedureTypes,
  PolyTransactionTags,
} from '../types';

export class EnableDividendModules extends Procedure<
  EnableDividendModulesProcedureArgs
> {
  public type = ProcedureTypes.EnableDividendModules;
  public async prepareTransactions() {
    const {
      symbol,
      storageWalletAddress,
      types = [DividendModuleTypes.Erc20, DividendModuleTypes.Eth],
    } = this.args;
    const { securityTokenRegistry } = this.context;

    const securityToken = await securityTokenRegistry.getSecurityToken({
      ticker: symbol,
    });

    for (const type of types) {
      await this.addTransaction(securityToken.addDividendsModule, {
        tag: PolyTransactionTags.EnableDividends,
      })({ type, wallet: storageWalletAddress });
    }
  }
}
