import { chunk } from 'lodash';
import { ModuleName } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  PushDividendPaymentProcedureArgs,
  DividendType,
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
} from '../types';
import { PolymathError } from '../PolymathError';

const CHUNK_SIZE = 100;

export class PushDividendPayment extends Procedure<PushDividendPaymentProcedureArgs> {
  public type = ProcedureType.PushDividendPayment;

  public async prepareTransactions() {
    const { symbol, dividendIndex, shareholderAddresses, dividendType } = this.args;
    const { contractWrappers } = this.context;

    try {
      await contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(symbol);
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    let dividendsModule;

    if (dividendType === DividendType.Erc20) {
      dividendsModule = (await contractWrappers.getAttachedModules(
        {
          moduleName: ModuleName.ERC20DividendCheckpoint,
          symbol,
        },
        { unarchived: true }
      ))[0];
    } else if (dividendType === DividendType.Eth) {
      dividendsModule = (await contractWrappers.getAttachedModules(
        {
          moduleName: ModuleName.EtherDividendCheckpoint,
          symbol,
        },
        { unarchived: true }
      ))[0];
    }

    if (!dividendsModule) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message:
          "Dividends of the specified type haven't been enabled. Did you forget to call dividends.enable() on your Security Token?",
      });
    }

    const dividend = await contractWrappers.getDividend({ dividendIndex, dividendsModule });
    let { shareholders: shareholderStatuses } = dividend;

    if (shareholderAddresses) {
      shareholderStatuses = shareholderStatuses.filter(
        status => !!shareholderAddresses.find(address => address === status.address)
      );
    }

    const unpaidShareholders = shareholderStatuses
      .filter(status => status.paymentReceived)
      .map(status => status.address);

    const shareholderAddressChunks = chunk(unpaidShareholders, CHUNK_SIZE);

    for (const addresses of shareholderAddressChunks) {
      await this.addTransaction(dividendsModule.pushDividendPaymentToAddresses, {
        tag: PolyTransactionTag.PushDividendPayment,
      })({
        dividendIndex,
        payees: addresses,
      });
    }
  }
}
