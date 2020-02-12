/**
 * @packageDocumentation
 * @module Procedures
 */

import { SecurityTokenEvents } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  CreateCheckpointProcedureArgs,
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
} from '../types';
import { PolymathError } from '../PolymathError';
import { findEvents } from '../utils';
import { SecurityToken, Checkpoint } from '../entities';
import { Factories } from '../Context';

/**
 * @hidden
 */
export const createRefreshSecurityTokenFactoryResolver = (
  factories: Factories,
  securityTokenId: string
) => async () => {
  return factories.securityTokenFactory.refresh(securityTokenId);
};
/**
 * Procedure to create a Checkpoint on a Security Token
 */
export class CreateCheckpoint extends Procedure<CreateCheckpointProcedureArgs, Checkpoint> {
  public type = ProcedureType.CreateCheckpoint;

  /**
   * Create a Checkpoint on the Security Token and return it
   */
  public async prepareTransactions() {
    const { args, context } = this;
    const { symbol } = args;
    const { contractWrappers, factories } = context;

    let securityToken;

    try {
      securityToken = await contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(
        symbol
      );
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    const securityTokenId = SecurityToken.generateId({ symbol });
    const [checkpoint] = await this.addTransaction<{}, [Checkpoint, void]>(
      securityToken.createCheckpoint,
      {
        tag: PolyTransactionTag.CreateCheckpoint,
        resolvers: [
          async receipt => {
            const { logs } = receipt;

            const [event] = findEvents({
              logs,
              eventName: SecurityTokenEvents.CheckpointCreated,
            });
            if (event) {
              const { args: eventArgs } = event;

              const { _checkpointId } = eventArgs;
              return factories.checkpointFactory.fetch(
                Checkpoint.generateId({
                  securityTokenId: SecurityToken.generateId({ symbol }),
                  index: _checkpointId.toNumber(),
                })
              );
            }
            throw new PolymathError({
              code: ErrorCode.UnexpectedEventLogs,
              message:
                "The Checkpoint was successfully created but the corresponding event wasn't fired. Please report this issue to the Polymath team.",
            });
          },
          createRefreshSecurityTokenFactoryResolver(factories, securityTokenId),
        ],
      }
    )({});

    return checkpoint;
  }
}
