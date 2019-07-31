import {
  ModuleName,
  ERC20DividendCheckpointEvents,
  BigNumber,
} from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  CreateErc20DividendDistributionProcedureArgs,
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
} from '../types';
import { ApproveErc20 } from './ApproveErc20';
import { PolymathError } from '../PolymathError';
import { findEvent } from '../utils';

export class CreateErc20DividendDistribution extends Procedure<
  CreateErc20DividendDistributionProcedureArgs,
  number
> {
  public type = ProcedureType.CreateErc20DividendDistribution;

  public async prepareTransactions() {
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
        message:
          "The ERC20 Dividend module hasn't been enabled. Did you forget to call .enableDividendModules()?",
      });
    }

    await this.addProcedure(ApproveErc20)({
      amount,
      spender: await erc20Module.address(),
      tokenAddress: erc20Address,
    });

    const dividendIndex = await this.addTransaction(
      erc20Module.createDividendWithCheckpointAndExclusions,
      {
        tag: PolyTransactionTag.CreateErc20DividendDistribution,
        resolver: async receipt => {
          const { logs } = receipt;

          const event = findEvent({
            eventName: ERC20DividendCheckpointEvents.ERC20DividendDeposited,
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

    return dividendIndex;
  }
}
