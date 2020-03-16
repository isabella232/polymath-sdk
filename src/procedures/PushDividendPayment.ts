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
 * Procedure that forwards a Dividend Distribution's payments to tokenholders
 */
export class PushDividendPayment extends Procedure<PushDividendPaymentProcedureArgs> {
  public type = ProcedureType.PushDividendPayment;

  /**
   * Push dividends to provided tokenholder addresses
   *
   * Note that this procedure will fail if:
   * - The Security Token doesn't exist
   * - The Dividends Feature hasn't been enabled
   */
  public async prepareTransactions() {
    const { symbol, dividendIndex, tokenholderAddresses } = this.args;
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
    let { tokenholders: tokenholderStatuses } = dividend;

    if (tokenholderAddresses) {
      tokenholderStatuses = tokenholderStatuses.filter(
        status => !!tokenholderAddresses.find(address => address === status.address)
      );
    }

    const unpaidTokenholders = tokenholderStatuses
      .filter(status => !status.paymentReceived)
      .map(status => status.address);

    const tokenholderAddressChunks = chunk(unpaidTokenholders, CHUNK_SIZE);

    await P.each(tokenholderAddressChunks, async (addresses, index) => {
      await this.addTransaction(dividendsModule!.pushDividendPaymentToAddresses, {
        tag: PolyTransactionTag.PushDividendPayment,
        // Only add resolver to the last transaction
        resolvers:
          index < tokenholderAddressChunks.length - 1
            ? undefined
            : [createPushDividendPaymentResolver(factories, symbol, index)],
      })({
        dividendIndex,
        payees: addresses,
      });
    });
  }
}
