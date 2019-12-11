import { chunk } from 'lodash';
import { ModuleName } from '@polymathnetwork/contract-wrappers';
import P from 'bluebird';
import { Procedure } from './Procedure';
import {
  ModifyDividendsDefaultExclusionListProcedureArgs,
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
} from '../types';
import { PolymathError } from '../PolymathError';

const CHUNK_SIZE = 200;

export class ModifyDividendsDefaultExclusionList extends Procedure<
  ModifyDividendsDefaultExclusionListProcedureArgs
> {
  public type = ProcedureType.ModifyDividendsDefaultExclusionList;

  public async prepareTransactions() {
    const { symbol, shareholderAddresses: investors } = this.args;
    const { contractWrappers } = this.context;

    try {
      await contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(symbol);
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    const [dividendsModule] = await contractWrappers.getAttachedModules(
      { moduleName: ModuleName.ERC20DividendCheckpoint, symbol },
      { unarchived: true }
    );

    if (!dividendsModule) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: "The Dividends Feature hasn't been enabled",
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
