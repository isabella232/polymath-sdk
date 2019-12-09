import { chunk } from 'lodash';
import {
  ModuleName,
  ERC20DividendCheckpoint,
  EtherDividendCheckpoint,
} from '@polymathnetwork/contract-wrappers';
import P from 'bluebird';
import { Procedure } from './Procedure';
import {
  ModifyDividendsDefaultExclusionListProcedureArgs,
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
  DividendType,
} from '../types';
import { PolymathError } from '../PolymathError';

const CHUNK_SIZE = 200;

export class ModifyDividendsDefaultExclusionList extends Procedure<
  ModifyDividendsDefaultExclusionListProcedureArgs
> {
  public type = ProcedureType.ModifyDividendsDefaultExclusionList;

  public async prepareTransactions() {
    const { symbol, dividendType, shareholderAddresses: investors } = this.args;
    const { contractWrappers } = this.context;

    try {
      await contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(symbol);
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    let dividendsModule: ERC20DividendCheckpoint | EtherDividendCheckpoint | undefined;

    switch (dividendType) {
      case DividendType.Erc20: {
        [dividendsModule] = await contractWrappers.getAttachedModules(
          { moduleName: ModuleName.ERC20DividendCheckpoint, symbol },
          { unarchived: true }
        );
        break;
      }
      case DividendType.Eth: {
        [dividendsModule] = await contractWrappers.getAttachedModules(
          { moduleName: ModuleName.EtherDividendCheckpoint, symbol },
          { unarchived: true }
        );
        break;
      }
    }

    if (!dividendsModule) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: "Dividends of the specified type haven't been enabled",
      });
    }

    const shareholderAddressChunks = chunk(investors, CHUNK_SIZE);

    await P.each(shareholderAddressChunks, async addresses => {
      await this.addTransaction(dividendsModule!.setDefaultExcluded, {
        tag: PolyTransactionTag.SetDefaultExcluded,
      })({
        excluded: addresses,
      });
    });
  }
}
