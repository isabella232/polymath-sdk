/**
 * @packageDocumentation
 * @module Procedures
 */

import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
  TransferOwnershipProcedureArgs,
} from '../types';
import { PolymathError } from '../base/PolymathError';
import { SecurityToken } from '../entities';
import { Factories } from '../base/Context';
import { isValidAddress } from '../utils';

/**
 * @hidden
 */
export const createTransferOwnershipResolver = (
  factories: Factories,
  symbol: string
) => async () => {
  return factories.securityTokenFactory.refresh(SecurityToken.generateId({ symbol }));
};

/**
 * Procedure that will transfer the ownership of a Security Token to a different wallet
 */
export class TransferOwnership extends Procedure<TransferOwnershipProcedureArgs> {
  public type = ProcedureType.TransferOwnership;

  /**
   * Transfer ownership of a Security Token to another wallet
   *
   * Note this procedure will fail if:
   * - Trying to call the procedure from a wallet that is not the current owner of the Security Token
   * - Transferring the ownership to the current owner, as there is no change
   */
  public async prepareTransactions() {
    const { newOwner, symbol } = this.args;
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

    const [owner, currentWalletAddress] = await Promise.all([
      securityToken.owner(),
      currentWallet.address(),
    ]);

    if (currentWalletAddress !== owner) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `You must be the owner of this Security Token to transfer ownership`,
      });
    }

    if (!isValidAddress(newOwner)) {
      throw new PolymathError({
        code: ErrorCode.InvalidAddress,
        message: `New owner address is invalid`,
      });
    }

    if (newOwner === owner) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `New owner must be different from the current one to transfer ownership`,
      });
    }

    await this.addTransaction(securityToken.transferOwnership, {
      tag: PolyTransactionTag.TransferOwnership,
      resolvers: [createTransferOwnershipResolver(factories, symbol)],
    })({ newOwner });
  }
}
