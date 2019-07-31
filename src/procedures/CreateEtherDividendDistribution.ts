import {
  ModuleName,
  EtherDividendCheckpointEvents,
  BigNumber,
} from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  CreateEtherDividendDistributionProcedureArgs,
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
} from '../types';
import { PolymathError } from '../PolymathError';
import { findEvent } from '../utils';

export class CreateEtherDividendDistribution extends Procedure<
  CreateEtherDividendDistributionProcedureArgs
> {
  public type = ProcedureType.CreateEtherDividendDistribution;

  public async prepareTransactions() {
    const {
      symbol,
      maturityDate,
      expiryDate,
      amount,
      checkpointIndex,
      name,
      excludedAddresses = [],
      taxWithholdings = [],
    } = this.args;
    const { contractWrappers } = this.context;

    try {
      await contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(symbol);
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    const etherModule = (await contractWrappers.getAttachedModules(
      {
        moduleName: ModuleName.EtherDividendCheckpoint,
        symbol,
      },
      { unarchived: true }
    ))[0];

    if (!etherModule) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message:
          "The ERC20 Dividend module hasn't been enabled. Did you forget to call .enableDividendModules()?",
      });
    }

    const dividendIndex = await this.addTransaction(
      etherModule.createDividendWithCheckpointAndExclusions,
      {
        tag: PolyTransactionTag.CreateEtherDividendDistribution,
        resolver: async receipt => {
          const { logs } = receipt;

          const event = findEvent({
            eventName: EtherDividendCheckpointEvents.EtherDividendDeposited,
            logs,
          });

          if (event) {
            const { args } = event;

            const { _dividendIndex } = args;

            return _dividendIndex.toNumber();
          }
        },
      }
    )({
      maturity: maturityDate,
      expiry: expiryDate,
      value: amount,
      checkpointId: checkpointIndex,
      name,
      excluded: excludedAddresses,
    });

    if (taxWithholdings.length > 0) {
      const investors: string[] = [];
      const percentages: BigNumber[] = [];

      taxWithholdings.forEach(({ address, percentage }) => {
        investors.push(address);
        percentages.push(new BigNumber(percentage));
      });

      await this.addTransaction(etherModule.setWithholding, {
        tag: PolyTransactionTag.SetEtherTaxWithholding,
      })({ investors, withholding: percentages });
    }

    return dividendIndex;
  }
}
