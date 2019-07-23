import { ModuleName } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  WithdrawTaxesProcedureArgs,
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
  DividendModuleType,
} from '../types';
import { PolymathError } from '../PolymathError';

export class WithdrawTaxes extends Procedure<WithdrawTaxesProcedureArgs> {
  public type = ProcedureType.WithdrawTaxes;

  public async prepareTransactions() {
    const { symbol, dividendIndex, dividendType } = this.args;
    const { contractWrappers } = this.context;

    try {
      await contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(symbol);
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    let dividendModule;

    switch (dividendType) {
      case DividendModuleType.Erc20: {
        dividendModule = (await contractWrappers.getAttachedModules(
          { moduleName: ModuleName.ERC20DividendCheckpoint, symbol },
          { unarchived: true }
        ))[0];
        break;
      }
      case DividendModuleType.Eth: {
        dividendModule = (await contractWrappers.getAttachedModules({
          moduleName: ModuleName.EtherDividendCheckpoint,
          symbol,
        }))[0];
        break;
      }
    }

    if (!dividendModule) {
      throw new Error('There is no attached dividend module of the specified type');
    }

    await this.addTransaction(dividendModule.withdrawWithholding, {
      tag: PolyTransactionTag.WithdrawTaxWithholdings,
    })({ dividendIndex });
  }
}
