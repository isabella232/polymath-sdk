import { ModuleName } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  SetDividendsWalletProcedureArgs,
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
} from '../types';
import { PolymathError } from '../PolymathError';

/**
 * Procedure that updates the wallet address witch receive reclaimed dividends and tax
 */
export class SetDividendsWallet extends Procedure<SetDividendsWalletProcedureArgs> {
  public type = ProcedureType.SetDividendsWallet;

  /**
   * - Change dividends wallet address
   *
   * Note that this procedure will fail if the security token symbol doesn't exist
   * Note that this procedure will fail if the dividend feature hasn't been enabled
   */
  public async prepareTransactions() {
    const { symbol, address } = this.args;
    const { contractWrappers } = this.context;

    try {
      await contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(symbol);
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    const [dividendModule] = await contractWrappers.getAttachedModules(
      { symbol, moduleName: ModuleName.ERC20DividendCheckpoint },
      { unarchived: true }
    );

    if (!dividendModule) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: "The Dividends Feature hasn't been enabled",
      });
    }

    await this.addTransaction(dividendModule.changeWallet, {
      tag: PolyTransactionTag.SetDividendsWallet,
    })({ wallet: address });
  }
}
