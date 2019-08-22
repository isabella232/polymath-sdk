import {
  ERC20DividendCheckpoint,
  EtherDividendCheckpoint,
  ModuleName,
} from '@polymathnetwork/contract-wrappers';
import { Factory } from './Factory';
import { Context } from '../../Context';
import { DividendDistribution, Params, UniqueIdentifiers } from '../DividendDistribution';
import { DividendType, ErrorCode } from '../../types';
import { SecurityToken } from '../SecurityToken';
import { PolymathError } from '../../PolymathError';
import { Checkpoint } from '../Checkpoint';

export class DividendDistributionFactory extends Factory<
  DividendDistribution,
  Params,
  UniqueIdentifiers
> {
  protected generateProperties = async (uid: string) => {
    const { index, dividendType, securityTokenId } = DividendDistribution.unserialize(uid);
    const { symbol } = SecurityToken.unserialize(securityTokenId);
    const { contractWrappers } = this.context;

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
        message:
          "Dividends of the specified type haven't been enabled. Did you forget to call dividends.enable() on your Security Token?",
      });
    }

    const { checkpointId: checkpointIndex, ...dividend } = await contractWrappers.getDividend({
      dividendIndex: index,
      dividendsModule,
    });

    const checkpointId = Checkpoint.generateId({ securityTokenId, index: checkpointIndex });

    return {
      ...dividend,
      checkpointId,
      securityTokenId,
      securityTokenSymbol: symbol,
    };
  };

  constructor(context: Context) {
    super(DividendDistribution, context);
  }
}
