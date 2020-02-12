/**
 * @packageDocumentation
 * @module Procedures
 */

import { chunk } from 'lodash';
import { BigNumber, ModuleName } from '@polymathnetwork/contract-wrappers';
import P from 'bluebird';
import { Procedure } from './Procedure';
import {
  ErrorCode,
  PolyTransactionTag,
  ProcedureType,
  UpdateDividendsTaxWithholdingListProcedureArgs,
} from '../types';
import { PolymathError } from '../base/PolymathError';
import { SecurityToken, TaxWithholding } from '../entities';
import { Factories } from '../base/Context';

const CHUNK_SIZE = 200;

/**
 * @hidden
 */
export const updateDividendsTaxWithholdingListResolver = (
  factories: Factories,
  symbol: string,
  percentageChunk: number[],
  addresses: string[]
) => async () => {
  return Promise.all(
    addresses.map((address, addressIndex) => {
      return factories.taxWithholdingFactory.update(
        TaxWithholding.generateId({
          securityTokenId: SecurityToken.generateId({ symbol }),
          shareholderAddress: address,
        }),
        { percentage: percentageChunk[addressIndex] }
      );
    })
  );
};

/**
 * Procedure that modifies dividend tax withholding percentages for holders of the Security Token
 */
export class UpdateDividendsTaxWithholdingList extends Procedure<
  UpdateDividendsTaxWithholdingListProcedureArgs
> {
  public type = ProcedureType.UpdateDividendsTaxWithholdingList;

  /**
   * Modify tax withholding percentage for shareholders
   *
   * Note that this procedure will fail if:
   * - The Security Token doesn't exist
   * - The Dividends Feature hasn't been enabled
   */
  public async prepareTransactions() {
    const { symbol, shareholderAddresses: investors, percentages } = this.args;
    const { contractWrappers, factories } = this.context;

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
    const percentageChunks = chunk(percentages, CHUNK_SIZE);

    await P.each(shareholderAddressChunks, async (addresses, chunkIndex) => {
      const percentageChunk = percentageChunks[chunkIndex];
      await this.addTransaction(dividendsModule!.setWithholding, {
        tag: PolyTransactionTag.SetErc20TaxWithholding,
        // Update all affected tax withholding entities.
        // We do this without fetching the data from the contracts
        // because it would take too many requests and it's only one value that changes
        resolvers: [
          updateDividendsTaxWithholdingListResolver(factories, symbol, percentageChunk, addresses),
        ],
      })({
        investors: addresses,
        withholding: percentageChunk.map(percentage => new BigNumber(percentage)),
      });
    });
  }
}
