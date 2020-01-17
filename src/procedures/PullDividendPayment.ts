import { ModuleName } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  PullDividendPaymentProcedureArgs,
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
} from '../types';
import { Factories } from '../Context';
import { PolymathError } from '../PolymathError';
import { DividendDistribution, SecurityToken } from '../entities';

/**
 * @hidden
 */
export const createPullDividendPaymentResolver = (
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
 * Procedure that allows a shareholder to pull their dividend payments from a Dividend Distribution
 */
export class PullDividendPayment extends Procedure<PullDividendPaymentProcedureArgs> {
  public type = ProcedureType.PullDividendPayment;

  /**
   * Pull dividend payments from the Dividend Distribution
   *
   * Note this procedure will fail if:
   * - The Dividends Feature is not enabled
   * - The current wallet address is not a shareholder
   * - The current wallet address has already received payment for this Dividend Distribution
   * - The current wallet address is on the exclusion list
   */
  public async prepareTransactions() {
    const { symbol, dividendIndex } = this.args;
    const { contractWrappers, factories, currentWallet } = this.context;

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
    const { shareholders: shareholderStatuses } = dividend;

    const thisShareholderAddress = await currentWallet.address();
    const thisShareholder = shareholderStatuses.find(
      ({ address }) => address === thisShareholderAddress
    );

    let reason: string = '';

    if (!thisShareholder) {
      reason = 'not a shareholder';
    } else if (thisShareholder.paymentReceived) {
      reason = 'already received payment';
    } else if (thisShareholder.excluded) {
      reason = 'address belongs to exclusion list';
    }

    if (reason) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `Current wallet ${thisShareholderAddress} cannot receive dividend payments. Reason: ${reason}`,
      });
    }

    await this.addTransaction(dividendsModule!.pullDividendPayment, {
      tag: PolyTransactionTag.PullDividendPayment,
      resolvers: [createPullDividendPaymentResolver(factories, symbol, dividendIndex)],
    })({
      dividendIndex,
    });
  }
}
