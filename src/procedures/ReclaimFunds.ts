import { ModuleName } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  ReclaimFundsProcedureArgs,
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
  DividendType,
} from '../types';
import { PolymathError } from '../PolymathError';
import { DividendDistribution, SecurityToken } from '../entities';
import { Factories } from '~/Context';

export const createReclaimFundsResolver = (
  dividendType: DividendType,
  dividendIndex: number,
  factories: Factories,
  symbol: string
) => async () => {
  return factories.dividendDistributionFactory.refresh(
    DividendDistribution.generateId({
      securityTokenId: SecurityToken.generateId({ symbol }),
      dividendType,
      index: dividendIndex,
    })
  );
};

export class ReclaimFunds extends Procedure<ReclaimFundsProcedureArgs> {
  public type = ProcedureType.ReclaimFunds;

  public async prepareTransactions() {
    const { symbol, dividendIndex, dividendType } = this.args;
    const { contractWrappers, factories } = this.context;

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
      case DividendType.Erc20: {
        [dividendModule] = await contractWrappers.getAttachedModules(
          { symbol, moduleName: ModuleName.ERC20DividendCheckpoint },
          { unarchived: true }
        );
        break;
      }
      case DividendType.Eth: {
        [dividendModule] = await contractWrappers.getAttachedModules(
          { symbol, moduleName: ModuleName.EtherDividendCheckpoint },
          { unarchived: true }
        );
        break;
      }
    }

    if (!dividendModule) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: "Dividends of the specified type haven't been enabled",
      });
    }

    await this.addTransaction(dividendModule.reclaimDividend, {
      tag: PolyTransactionTag.ReclaimDividendFunds,
      resolver: createReclaimFundsResolver(dividendType, dividendIndex, factories, symbol),
    })({ dividendIndex });
  }
}
