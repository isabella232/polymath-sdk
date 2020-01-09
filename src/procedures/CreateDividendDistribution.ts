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
import { PolymathError } from '../PolymathError';
import { findEvents } from '../utils';
import { SecurityToken, DividendDistribution } from '../entities';

/**
 * Procedure to create a dividend distribution on a security token with an enabled ERC20 Dividends Checkpoint module
 * Optionally setting tax with holdings for investors represented with percentage
 */
export class CreateDividendDistribution extends Procedure<
  CreateDividendDistributionProcedureArgs,
  DividendDistribution
> {
  public type = ProcedureType.CreateDividendDistribution;

  /**
   * - Approve the ERC20 Dividends Checkpoint module to spend the amount equal to the dividend amount in the procedure arguments
   *
   * - Create a dividend with checkpoints and exclusions based on the information in the procedure arguments
   *
   * - After a dividend is created the Dividend Distribution entity will fetch dividend distribution information to store in the SDK cache
   *
   * - If there is a non empty array of tax withholding information, the procedure will set erc20 tax withholding list
   *
   * Note this procedure will fail if the ERC20 dividends checkpoint module has not been enabled
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
