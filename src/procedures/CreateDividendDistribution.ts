/**
 * @packageDocumentation
 * @module Procedures
 */

import {
  ModuleName,
  ERC20DividendCheckpointEvents,
  BigNumber,
  TransactionParams,
} from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  CreateDividendDistributionProcedureArgs,
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
} from '../types';
import { ApproveErc20 } from './ApproveErc20';
import { PolymathError } from '../base/PolymathError';
import { findEvents } from '../utils';
import { SecurityToken, DividendDistribution } from '../entities';

/**
 * Procedure to create a Dividend Distribution on a Security Token.
 * The funds to be distributed as dividends will come from the current user's wallet
 */
export class CreateDividendDistribution extends Procedure<
  CreateDividendDistributionProcedureArgs,
  DividendDistribution
> {
  public type = ProcedureType.CreateDividendDistribution;

  /**
   * - Approve spend of the amount that will be distributed
   * - Create a Dividend Distribution for said amount
   * - Set tax withholding percentages (if supplied)
   * - Return the newly created Dividend Distribution
   *
   * Note that this procedure will fail if the ERC20 Dividends Feature has not been enabled
   */
  public async prepareTransactions() {
    const { args, context } = this;
    const {
      symbol,
      maturityDate,
      expiryDate,
      erc20Address,
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

    const erc20Module = (await contractWrappers.getAttachedModules(
      {
        moduleName: ModuleName.ERC20DividendCheckpoint,
        symbol,
      },
      { unarchived: true }
    ))[0];

    if (!erc20Module) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: "The ERC20 Dividends Manager hasn't been enabled",
      });
    }

    await this.addProcedure(ApproveErc20)({
      amount,
      spender: await erc20Module.address(),
      tokenAddress: erc20Address,
    });

    const [distribution] = await this.addTransaction<
      TransactionParams.ERC20DividendCheckpoint.CreateDividendWithCheckpointAndExclusions,
      [DividendDistribution]
    >(erc20Module.createDividendWithCheckpointAndExclusions, {
      tag: PolyTransactionTag.CreateErc20DividendDistribution,
      resolvers: [
        async receipt => {
          const { logs } = receipt;

          const [event] = findEvents({
            eventName: ERC20DividendCheckpointEvents.ERC20DividendDeposited,
            logs,
          });

          if (event) {
            const { args: eventArgs } = event;

            const { _dividendIndex } = eventArgs;

            return factories.dividendDistributionFactory.fetch(
              DividendDistribution.generateId({
                securityTokenId: SecurityToken.generateId({ symbol }),
                index: _dividendIndex.toNumber(),
              })
            );
          }
          throw new PolymathError({
            code: ErrorCode.UnexpectedEventLogs,
            message:
              "The ERC20 Dividend Distribution was successfully created but the corresponding event wasn't fired. Please report this issue to the Polymath team.",
          });
        },
      ],
    })({
      maturity: maturityDate,
      expiry: expiryDate,
      token: erc20Address,
      amount,
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

      await this.addTransaction(erc20Module.setWithholding, {
        tag: PolyTransactionTag.SetErc20TaxWithholding,
      })({ investors, withholding: percentages });
    }

    return distribution;
  }
}
