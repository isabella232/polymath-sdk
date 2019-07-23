import { chunk } from 'lodash';
import { ModuleName } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  PushDividendPaymentProcedureArgs,
  DividendModuleType,
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
} from '../types';
import { PolymathError } from '../PolymathError';

const CHUNK_SIZE = 100;

export class PushDividendPayment extends Procedure<PushDividendPaymentProcedureArgs> {
  public type = ProcedureType.PushDividendPayment;

  public async prepareTransactions() {
    const { symbol, dividendIndex, investorAddresses, dividendType } = this.args;
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

    if (dividendType === DividendModuleType.Erc20) {
      dividendsModule = (await contractWrappers.getAttachedModules(
        {
          moduleName: ModuleName.ERC20DividendCheckpoint,
          symbol,
        },
        { unarchived: true }
      ))[0];
    } else if (dividendType === DividendModuleType.Eth) {
      dividendsModule = (await contractWrappers.getAttachedModules(
        {
          moduleName: ModuleName.EtherDividendCheckpoint,
          symbol,
        },
        { unarchived: true }
      ))[0];
    }

    if (!dividendsModule) {
      throw new Error(
        "Dividend modules haven't been enabled. Did you forget to call .enableDividendModules()?"
      );
    }

    const dividend = await contractWrappers.getDividend({ dividendIndex, dividendsModule });
    let { investors: investorStatuses } = dividend;

    if (investorAddresses) {
      investorStatuses = investorStatuses.filter(
        status => !!investorAddresses.find(address => address === status.address)
      );
    }

    const unpaidInvestors = investorStatuses
      .filter(status => status.paymentReceived)
      .map(status => status.address);

    const investorAddressChunks = chunk(unpaidInvestors, CHUNK_SIZE);

    for (const addresses of investorAddressChunks) {
      await this.addTransaction(dividendsModule.pushDividendPaymentToAddresses, {
        tag: PolyTransactionTag.PushDividendPayment,
      })({
        dividendIndex,
        payees: addresses,
      });
    }
  }
}
