/**
 * @packageDocumentation
 * @module Entities.Factories
 */

import { Factory } from './Factory';
import { Context } from '../../base/Context';
import { Checkpoint, Params, UniqueIdentifiers } from '../Checkpoint';
import { SecurityToken } from '../SecurityToken';
import { PolymathError } from '../../base/PolymathError';
import { ErrorCode } from '../../types';
import { DividendDistribution } from '../DividendDistribution';

/**
 * @hidden
 * Generates Checkpoint entities
 */
export class CheckpointFactory extends Factory<Checkpoint, Params, UniqueIdentifiers> {
  protected generateProperties = async (uid: string) => {
    const { securityTokenId, index } = Checkpoint.unserialize(uid);
    const { symbol } = SecurityToken.unserialize(securityTokenId);

    const {
      context: { contractWrappers, factories },
    } = this;

    let securityToken;

    try {
      securityToken = await contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(
        symbol
      );
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.FetcherValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    const checkpointDividends = await contractWrappers.getAllDividends({
      securityTokenSymbol: symbol,
      checkpointId: index,
    });

    const checkpoint = await contractWrappers.getCheckpoint({
      checkpointId: index,
      securityToken,
    });

    const checkpointId = Checkpoint.generateId({
      securityTokenId,
      index: checkpoint.index,
    });

    const dividendDistributions = checkpointDividends.map(distribution =>
      factories.dividendDistributionFactory.create(
        DividendDistribution.generateId({ securityTokenId, index }),
        {
          ...distribution,
          checkpointId,
          securityTokenSymbol: symbol,
        }
      )
    );

    return {
      dividendDistributions,
      securityTokenSymbol: symbol,
      ...checkpoint,
    };
  };

  // eslint-disable-next-line require-jsdoc
  constructor(context: Context) {
    super(Checkpoint, context);
  }
}
