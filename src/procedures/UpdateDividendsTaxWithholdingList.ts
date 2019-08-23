import { chunk } from 'lodash';
import {
  ModuleName,
  BigNumber,
  ERC20DividendCheckpoint,
  EtherDividendCheckpoint,
} from '@polymathnetwork/contract-wrappers';
import P from 'bluebird';
import { Procedure } from './Procedure';
import {
  UpdateDividendsTaxWithholdingListProcedureArgs,
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
  DividendType,
} from '../types';
import { PolymathError } from '../PolymathError';
import { TaxWithholding, SecurityToken } from '../entities';

const CHUNK_SIZE = 200;

export class UpdateDividendsTaxWithholdingList extends Procedure<
  UpdateDividendsTaxWithholdingListProcedureArgs
> {
  public type = ProcedureType.UpdateDividendsTaxWithholdingList;

  public async prepareTransactions() {
    const { symbol, dividendType, shareholderAddresses: investors, percentages } = this.args;
    const { contractWrappers, factories } = this.context;

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
        message:
          "Dividends of the specified type haven't been enabled. Did you forget to call dividends.enable() on your Security Token?",
      });
    }

    const shareholderAddressChunks = chunk(investors, CHUNK_SIZE);
    const percentageChunks = chunk(percentages, CHUNK_SIZE);

    await P.each(shareholderAddressChunks, async (addresses, chunkIndex) => {
      const percentageChunk = percentageChunks[chunkIndex];
      await this.addTransaction(dividendsModule!.setWithholding, {
        tag: PolyTransactionTag.SetErc20TaxWithholding,
        // Update all affected tax withholding entities.
        // We do this without fetching the data from the contracts
        // because it would take too many requests and it's only one value that changes
        resolver: async () => {
          addresses.forEach((address, addressIndex) => {
            factories.taxWithholdingFactory.update(
              TaxWithholding.generateId({
                securityTokenId: SecurityToken.generateId({ symbol }),
                dividendType,
                shareholderAddress: address,
              }),
              { percentage: percentageChunk[addressIndex] }
            );
          });
        },
      })({
        investors: addresses,
        withholding: percentageChunk.map(percentage => new BigNumber(percentage)),
      });
    });
  }
}
