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
  DividendType,
} from '../types';
import { PolymathError } from '../PolymathError';
import { findEvent } from '../utils';
import { SecurityToken, DividendDistribution } from '../entities';

export class CreateEtherDividendDistribution extends Procedure<
  CreateEtherDividendDistributionProcedureArgs,
  DividendDistribution
> {
  public type = ProcedureType.CreateEtherDividendDistribution;

  public async prepareTransactions() {
    const { args, context } = this;
    const {
      symbol,
      maturityDate,
      expiryDate,
      amount,
      checkpointIndex,
      name,
      excludedAddresses = [],
      taxWithholdings = [],
    } = args;
    const { contractWrappers, factories } = context;

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
          "The ETH Dividends Manager hasn't been enabled. Did you forget to call dividends.enable() on the Security Token?",
      });
    }

    const distribution = await this.addTransaction(
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
            const { args: eventArgs } = event;

            const { _dividendIndex } = eventArgs;

            return factories.dividendDistributionFactory.fetch(
              DividendDistribution.generateId({
                securityTokenId: SecurityToken.generateId({ symbol }),
                dividendType: DividendType.Eth,
                index: _dividendIndex.toNumber(),
              })
            );
          }
          throw new PolymathError({
            code: ErrorCode.UnexpectedEventLogs,
            message:
              "The ETH Dividend Distribution was successfully created but the corresponding event wasn't fired. Please repot this issue to the Polymath team.",
          });
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

    return distribution;
  }
}
