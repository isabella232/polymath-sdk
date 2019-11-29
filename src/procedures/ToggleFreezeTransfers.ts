import { TransferStatusCode } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  ToggleFreezeTransfersProcedureArgs,
  ErrorCode,
  ProcedureType,
  PolyTransactionTag,
} from '../types';
import { PolymathError } from '../PolymathError';
import { SecurityToken } from '../entities';
import { Factories } from '../Context';

/**
 * Procedure to transfer security tokens.
 */
export class ToggleFreezeTransfers extends Procedure<ToggleFreezeTransfersProcedureArgs> {
  public type = ProcedureType.ToggleFreezeTransfers;

  public async prepareTransactions() {
    const { symbol, freeze } = this.args;
    const { contractWrappers, currentWallet, factories } = this.context;

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

    const owner = await securityToken.owner();
    const account = await currentWallet.address();

    if (account !== owner) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `You must be the owner of this Security Token to ${
          freeze ? 'freeze' : 'unfreeze'
        } the transfers`,
      });
    }

    const isFrozen = await securityToken.transfersFrozen();

    if (isFrozen === freeze) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `Security Token Transfers are already ${freeze ? 'frozen' : 'unfrozen'}`,
      });
    }

    await this.addTransaction(
      freeze ? securityToken.freezeTransfers : securityToken.unfreezeTransfers,
      {
        tag: PolyTransactionTag.ToggleFreezeTransfers,
        resolver: createToggleFreezeTransfersResolver(factories, symbol),
      }
    )({});
  }
}

export const createToggleFreezeTransfersResolver = (
  factories: Factories,
  symbol: string
) => async () => {
  await factories.securityTokenFactory.refresh(SecurityToken.generateId({ symbol }));
};
