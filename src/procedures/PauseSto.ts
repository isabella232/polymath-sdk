import { ModuleName } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  PauseStoProcedureArgs,
  ErrorCode,
  StoType,
} from '../types';
import { PolymathError } from '../PolymathError';
import { isValidAddress } from '../utils';
import { SecurityToken, CappedSto, UsdTieredSto } from '../entities';

export class PauseSto extends Procedure<PauseStoProcedureArgs> {
  public type = ProcedureType.PauseSto;

  public async prepareTransactions() {
    const { stoAddress, stoType, symbol } = this.args;
    const { contractWrappers, factories } = this.context;

    /**
     * Validation
     */

    if (!isValidAddress(stoAddress)) {
      throw new PolymathError({
        code: ErrorCode.InvalidAddress,
        message: `Invalid STO address ${stoAddress}`,
      });
    }

    let stoModule;

    switch (stoType) {
      case StoType.Capped: {
        stoModule = await contractWrappers.moduleFactory.getModuleInstance({
          name: ModuleName.CappedSTO,
          address: stoAddress,
        });
        break;
      }
      case StoType.UsdTiered: {
        stoModule = await contractWrappers.moduleFactory.getModuleInstance({
          name: ModuleName.UsdTieredSTO,
          address: stoAddress,
        });
        break;
      }
      default: {
        throw new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `Invalid STO type ${stoType}`,
        });
      }
    }

    if (!stoModule) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `STO ${stoAddress} is either archived or hasn't been launched.`,
      });
    }

    /**
     * Transactions
     */

    await this.addTransaction(stoModule.pause, {
      tag: PolyTransactionTag.PauseSto,
      resolver: async () => {
        const securityTokenId = SecurityToken.generateId({ symbol });

        switch (stoType) {
          case StoType.Capped: {
            return factories.cappedStoFactory.refresh(
              CappedSto.generateId({
                securityTokenId,
                stoType: StoType.Capped,
                address: stoAddress,
              })
            );
          }
          case StoType.UsdTiered: {
            return factories.usdTieredStoFactory.refresh(
              UsdTieredSto.generateId({
                securityTokenId,
                stoType: StoType.UsdTiered,
                address: stoAddress,
              })
            );
          }
        }
      },
    })({});
  }
}
