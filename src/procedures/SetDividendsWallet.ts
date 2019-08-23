import {
  ModuleName,
  ERC20DividendCheckpoint,
  EtherDividendCheckpoint,
} from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  SetDividendsWalletProcedureArgs,
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
  DividendType,
} from '../types';
import { PolymathError } from '../PolymathError';
import { SecurityToken, Erc20DividendsManager, EthDividendsManager } from '../entities';

export class SetDividendsWallet extends Procedure<SetDividendsWalletProcedureArgs> {
  public type = ProcedureType.SetDividendsWallet;

  public async prepareTransactions() {
    const { symbol, dividendType, address } = this.args;
    const { contractWrappers, factories } = this.context;

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
        message:
          "Dividends of the specified type haven't been enabled. Did you forget to call dividends.enable() on your Security Token?",
      });
    }

    await this.addTransaction(dividendModule.changeWallet, {
      tag: PolyTransactionTag.SetDividendsWallet,
      resolver: async () => {
        switch (dividendType) {
          case DividendType.Erc20: {
            return factories.erc20DividendsManagerFactory.refresh(
              Erc20DividendsManager.generateId({
                securityTokenId: SecurityToken.generateId({ symbol }),
                dividendType,
              })
            );
          }
          case DividendType.Eth: {
            return factories.ethDividendsManagerFactory.refresh(
              EthDividendsManager.generateId({
                securityTokenId: SecurityToken.generateId({ symbol }),
                dividendType,
              })
            );
          }
        }
      },
    })({ wallet: address });
  }
}
