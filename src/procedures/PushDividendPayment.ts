/**
 * @packageDocumentation
 * @module Procedures
 */

import { chunk } from 'lodash';
import { ModuleName } from '@polymathnetwork/contract-wrappers';
import P from 'bluebird';
import { Procedure } from './Procedure';
import {
  PushDividendPaymentProcedureArgs,
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
} from '../types';
import { Factories } from '../Context';
import { PolymathError } from '../PolymathError';
import { DividendDistribution, SecurityToken } from '../entities';

const CHUNK_SIZE = 100;

/**
 * @hidden
 */
export const createPushDividendPaymentResolver = (
  factories: Factories,
  symbol: string,
  index: number
) => async () => {
  return factories.dividendDistributionFactory.refresh(
    DividendDistribution.generateId({
      securityTokenId: SecurityToken.generateId({ symbol }),
      index,
    })
  );
};

/**
 * Procedure that forwards a Dividend Distribution's payments to shareholders
 */
export class PushDividendPayment extends Procedure<PushDividendPaymentProcedureArgs> {
  public type = ProcedureType.PushDividendPayment;

  /**
   * Push dividends to provided shareholder addresses
   *
   * Note that this procedure will fail if:
   * - The Security Token doesn't exist
   * - The Dividends Feature hasn't been enabled
   */
  public async prepareTransactions() {
    const { symbol, dividendIndex, shareholderAddresses } = this.args;
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
      {
        moduleName: ModuleName.ERC20DividendCheckpoint,
        symbol,
      },
      { unarchived: true }
    );

    if (!dividendsModule) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: "The Dividends Feature hasn't been enabled",
      });
    }

    const dividend = await contractWrappers.getDividend({
      dividendIndex,
      dividendsModule,
    });
    let { shareholders: shareholderStatuses } = dividend;

    if (shareholderAddresses) {
      shareholderStatuses = shareholderStatuses.filter(
        status => !!shareholderAddresses.find(address => address === status.address)
      );
    }

    const unpaidShareholders = shareholderStatuses
      .filter(status => !status.paymentReceived)
      .map(status => status.address);

    const shareholderAddressChunks = chunk(unpaidShareholders, CHUNK_SIZE);

    await P.each(shareholderAddressChunks, async (addresses, index) => {
      await this.addTransaction(dividendsModule!.pushDividendPaymentToAddresses, {
        tag: PolyTransactionTag.PushDividendPayment,
        // Only add resolver to the last transaction
        resolvers:
          index < shareholderAddressChunks.length - 1
            ? undefined
            : [createPushDividendPaymentResolver(factories, symbol, index)],
      })({
        dividendIndex,
        payees: addresses,
      });
    });
  }
}
