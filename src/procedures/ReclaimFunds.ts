import {
  ERC20DividendCheckpoint,
  EtherDividendCheckpoint,
  ModuleName,
} from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  ReclaimFundsProcedureArgs,
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
  DividendModuleType,
} from '../types';
import { PolymathError } from '../PolymathError';

export class ReclaimFunds extends Procedure<ReclaimFundsProcedureArgs> {
  public type = ProcedureType.ReclaimFunds;

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

    let dividendModule: ERC20DividendCheckpoint | EtherDividendCheckpoint | null = null;

    switch (dividendType) {
      case DividendModuleType.Erc20: {
        dividendModule = (await contractWrappers.getAttachedModules(
          { symbol, moduleName: ModuleName.ERC20DividendCheckpoint },
          { unarchived: true }
        ))[0];
        break;
      }
      case DividendModuleType.Eth: {
        dividendModule = (await contractWrappers.getAttachedModules(
          { symbol, moduleName: ModuleName.ERC20DividendCheckpoint },
          { unarchived: true }
        ))[0];
        break;
      }
    }

    if (!dividendModule) {
      throw new Error('There is no attached dividend module of the specified type');
    }

    await this.addTransaction(dividendModule.reclaimDividend, {
      tag: PolyTransactionTag.ReclaimDividendFunds,
    })({ dividendIndex });
  }
}
