import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  TransferReservationOwnershipProcedureArgs,
  ErrorCode,
} from '../types';
import { PolymathError } from '../PolymathError';
import { SecurityTokenReservation } from '../entities';
import { Factories } from '../Context';

/**
 * @hidden
 */
export const createTransferReservationOwnershipResolver = (
  factories: Factories,
  symbol: string
) => async () => {
  return factories.securityTokenReservationFactory.refresh(
    SecurityTokenReservation.generateId({ symbol })
  );
};

/**
 * Procedure that transfers ownership of a Security Token Reservation
 */
export class TransferReservationOwnership extends Procedure<
  TransferReservationOwnershipProcedureArgs
> {
  public type = ProcedureType.TransferReservationOwnership;

  /**
   * Transfer the ownership of a Security Token Reservation to the supplied address
   *
   * Note this procedure will fail if:
   * - A Security Token has already been launched with this symbol
   * - The current wallet address is not the owner of the Reservation
   * - Attempting to transfer ownership to the current owner
   */
  public async prepareTransactions() {
    const { newOwner, symbol } = this.args;
    const {
      contractWrappers: { securityTokenRegistry },
      currentWallet,
      factories,
    } = this.context;

    const { status, owner } = await securityTokenRegistry.getTickerDetails({
      ticker: symbol,
    });

    const account = await currentWallet.address();

    if (status) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `The ${symbol} Security Token has already been launched, ownership cannot be transferred`,
      });
    }

    if (account !== owner) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `Only the reservation owner can transfer ownership to another wallet`,
      });
    }

    if (newOwner === owner) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `New owner must be different from the current one to transfer ownership`,
      });
    }

    await this.addTransaction(securityTokenRegistry.transferTickerOwnership, {
      tag: PolyTransactionTag.TransferReservationOwnership,
      resolvers: [createTransferReservationOwnershipResolver(factories, symbol)],
    })({ newOwner, ticker: symbol });
  }
}
