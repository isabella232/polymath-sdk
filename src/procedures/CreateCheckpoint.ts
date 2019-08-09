import { SecurityTokenEvents } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  CreateCheckpointProcedureArgs,
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
} from '../types';
import { PolymathError } from '../PolymathError';
import { findEvent } from '../utils';
import { SecurityToken, Checkpoint } from '../entities';

export class CreateCheckpoint extends Procedure<
  CreateCheckpointProcedureArgs,
  SecurityToken,
  Checkpoint
> {
  public type = ProcedureType.CreateCheckpoint;

  public async prepareTransactions() {
    const { args, context, caller } = this;
    const { symbol } = args;
    const { contractWrappers } = context;

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

    const checkpoint = await this.addTransaction(securityToken.createCheckpoint, {
      tag: PolyTransactionTag.CreateCheckpoint,
      resolver: async receipt => {
        const { logs } = receipt;

        const event = findEvent({ logs, eventName: SecurityTokenEvents.CheckpointCreated });
        if (event) {
          const { args: eventArgs } = event;

          const { _checkpointId } = eventArgs;

          return caller.shareholders.getCheckpoint({ checkpointIndex: _checkpointId.toNumber() });
        }
        throw new PolymathError({
          code: ErrorCode.UnexpectedEventLogs,
          message:
            "The Checkpoint was successfully created but the corresponding event wasn't fired. Please repot this issue to the Polymath team.",
        });
      },
    })({});

    return checkpoint;
  }
}
