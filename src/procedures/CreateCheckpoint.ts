import { SecurityTokenEvents } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  CreateCheckpointProcedureArgs,
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
} from '../types';
import { PolymathError } from '../PolymathError';
import { findEvent } from '~/utils';

export class CreateCheckpoint extends Procedure<CreateCheckpointProcedureArgs> {
  public type = ProcedureType.CreateCheckpoint;

  public async prepareTransactions() {
    const { symbol } = this.args;
    const { contractWrappers } = this.context;

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

    const checkpointIndex = await this.addTransaction(securityToken.createCheckpoint, {
      tag: PolyTransactionTag.CreateCheckpoint,
      resolver: async receipt => {
        const { logs } = receipt;

        const event = findEvent({ logs, eventName: SecurityTokenEvents.CheckpointCreated });
        if (event) {
          const { args } = event;

          const { _checkpointId } = args;

          return _checkpointId.toNumber();
        }
      },
    })({});

    return checkpointIndex;
  }
}
