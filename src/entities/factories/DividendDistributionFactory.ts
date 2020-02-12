/**
 * @packageDocumentation
 * @module Entities.Factories
 */

import { ModuleName } from '@polymathnetwork/contract-wrappers';
import { Factory } from './Factory';
import { Context } from '../../Context';
import { DividendDistribution, Params, UniqueIdentifiers } from '../DividendDistribution';
import { ErrorCode } from '../../types';
import { SecurityToken } from '../SecurityToken';
import { PolymathError } from '../../PolymathError';
import { Checkpoint } from '../Checkpoint';

/**
 * @hidden
 * Generates Dividend Distribution entities
 */
export class DividendDistributionFactory extends Factory<
  DividendDistribution,
  Params,
  UniqueIdentifiers
> {
  protected generateProperties = async (uid: string) => {
    const { index, securityTokenId } = DividendDistribution.unserialize(uid);
    const { symbol } = SecurityToken.unserialize(securityTokenId);
    const { contractWrappers } = this.context;

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

  // eslint-disable-next-line require-jsdoc
  constructor(context: Context) {
    super(DividendDistribution, context);
  }
}
