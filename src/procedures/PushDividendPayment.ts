import { chunk } from 'lodash';
import {
  ModuleName,
  ERC20DividendCheckpoint,
  EtherDividendCheckpoint,
} from '@polymathnetwork/contract-wrappers';
import P from 'bluebird';
import { Procedure } from './Procedure';
import {
  PushDividendPaymentProcedureArgs,
  DividendType,
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
} from '../types';
import { Factories } from '../Context';
import { PolymathError } from '../PolymathError';
import { DividendDistribution, SecurityToken } from '../entities';

const CHUNK_SIZE = 100;

export const createPushDividendPaymentResolver = (
  factories: Factories,
  symbol: string,
  dividendType: DividendType,
  index: number
) => async () => {
  return factories.dividendDistributionFactory.refresh(
    DividendDistribution.generateId({
      securityTokenId: SecurityToken.generateId({ symbol }),
      dividendType,
      index,
    })
  );
};

export class PushDividendPayment extends Procedure<PushDividendPaymentProcedureArgs> {
  public type = ProcedureType.PushDividendPayment;

  public async prepareTransactions() {
    const { symbol, dividendIndex, shareholderAddresses, dividendType } = this.args;
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

    if (dividendType === DividendType.Erc20) {
      [dividendsModule] = await contractWrappers.getAttachedModules(
        {
          moduleName: ModuleName.ERC20DividendCheckpoint,
          symbol,
        },
        { unarchived: true }
      );
    } else if (dividendType === DividendType.Eth) {
      [dividendsModule] = await contractWrappers.getAttachedModules(
        {
          moduleName: ModuleName.EtherDividendCheckpoint,
          symbol,
        },
        { unarchived: true }
      );
    }

    if (!dividendsModule) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: "Dividends of the specified type haven't been enabled",
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
        resolver:
          index < shareholderAddressChunks.length - 1
            ? undefined
            : createPushDividendPaymentResolver(factories, symbol, dividendType, index),
      })({
        dividendIndex,
        payees: addresses,
      });
    });
  }
}
