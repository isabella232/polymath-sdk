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
import { Factories } from '../Context';
import { SecurityToken, Erc20DividendsManager, EthDividendsManager } from '../entities';

export const createSetDividendsWalletResolver = (
  dividendType: DividendType,
  factories: Factories,
  symbol: string
) => async () => {
  let refresh;
  // eslint-disable-next-line default-case
  switch (dividendType) {
    case DividendType.Erc20: {
      refresh = factories.erc20DividendsManagerFactory.refresh(
        Erc20DividendsManager.generateId({
          securityTokenId: SecurityToken.generateId({ symbol }),
          dividendType,
        })
      );
      break;
    }
    case DividendType.Eth: {
      refresh = factories.ethDividendsManagerFactory.refresh(
        EthDividendsManager.generateId({
          securityTokenId: SecurityToken.generateId({ symbol }),
          dividendType,
        })
      );
    }
  }
  return refresh;
};

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
      default: {
        break;
      }
    }

    if (!dividendModule) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: "Dividends of the specified type haven't been enabled",
      });
    }

    await this.addTransaction(dividendModule.changeWallet, {
      tag: PolyTransactionTag.SetDividendsWallet,
      resolvers: [createSetDividendsWalletResolver(dividendType, factories, symbol)],
    })({ wallet: address });
  }
}
