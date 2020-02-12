/**
 * @packageDocumentation
 * @module Procedures
 */

import { ModuleName } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  TogglePauseStoProcedureArgs,
  ErrorCode,
  StoType,
} from '../types';
import { PolymathError } from '../base/PolymathError';
import { isValidAddress } from '../utils';
import { SecurityToken, SimpleSto, TieredSto } from '../entities';
import { Factories } from '~/base/Context';

/**
 * @hidden
 */
export const createTogglePauseStoResolver = (
  factories: Factories,
  symbol: string,
  stoType: StoType,
  stoAddress: string
) => async () => {
  const securityTokenId = SecurityToken.generateId({ symbol });

  switch (stoType) {
    case StoType.Simple: {
      return factories.simpleStoFactory.refresh(
        SimpleSto.generateId({
          securityTokenId,
          stoType,
          address: stoAddress,
        })
      );
    }
    case StoType.Tiered: {
      return factories.tieredStoFactory.refresh(
        TieredSto.generateId({
          securityTokenId,
          stoType,
          address: stoAddress,
        })
      );
    }
    default: {
      return undefined;
    }
  }
};

/**
 * Procedure to pause or unpause an STO
 */
export class TogglePauseSto extends Procedure<TogglePauseStoProcedureArgs> {
  public type = ProcedureType.TogglePauseSto;

  /**
   * Pause or unpause the STO
   *
   * Note this procedure will fail if:
   * - The specified STO address is invalid
   * - The specified STO type is invalid
   * - The STO has not been launched, or the module has been archived
   */
  public async prepareTransactions() {
    const { stoAddress, stoType, symbol, pause } = this.args;
    const { contractWrappers, factories } = this.context;

    /*
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
      case StoType.Simple: {
        stoModule = await contractWrappers.moduleFactory.getModuleInstance({
          name: ModuleName.CappedSTO,
          address: stoAddress,
        });
        break;
      }
      case StoType.Tiered: {
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
        message: `STO ${stoAddress} is either archived or hasn't been launched`,
      });
    }

    /*
     * Transactions
     */
    await this.addTransaction(pause ? stoModule.pause : stoModule.unpause, {
      tag: pause ? PolyTransactionTag.PauseSto : PolyTransactionTag.UnpauseSto,
      resolvers: [createTogglePauseStoResolver(factories, symbol, stoType, stoAddress)],
    })({});
  }
}
