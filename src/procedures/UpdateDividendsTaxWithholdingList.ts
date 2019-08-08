import { chunk } from 'lodash';
import { ModuleName, BigNumber } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  UpdateDividendsTaxWithholdingListProcedureArgs,
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
  DividendType,
} from '../types';
import { PolymathError } from '../PolymathError';

const CHUNK_SIZE = 200;

export class UpdateDividendsTaxWithholdingList extends Procedure<
  UpdateDividendsTaxWithholdingListProcedureArgs
> {
  public type = ProcedureType.UpdateDividendsTaxWithholdingList;

  public async prepareTransactions() {
    const { symbol, dividendType, shareholderAddresses: investors, percentages } = this.args;
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
      case DividendType.Erc20: {
        dividendModule = (await contractWrappers.getAttachedModules(
          { moduleName: ModuleName.ERC20DividendCheckpoint, symbol },
          { unarchived: true }
        ))[0];
        break;
      }
      case DividendType.Eth: {
        dividendModule = (await contractWrappers.getAttachedModules(
          { moduleName: ModuleName.EtherDividendCheckpoint, symbol },
          { unarchived: true }
        ))[0];
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

    const investorAddressChunks = chunk(investors, CHUNK_SIZE);
    const percentageChunks = chunk(percentages, CHUNK_SIZE);

    for (let index = 0; index < investorAddressChunks.length; index += 1) {
      await this.addTransaction(dividendModule.setWithholding, {
        tag: PolyTransactionTag.SetErc20TaxWithholding,
      })({
        investors: investorAddressChunks[index],
        withholding: percentageChunks[index].map(percentage => new BigNumber(percentage)),
      });
    }
  }
}
