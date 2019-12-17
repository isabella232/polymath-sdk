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

export class TransferReservationOwnership extends Procedure<
  TransferReservationOwnershipProcedureArgs
> {
  public type = ProcedureType.TransferReservationOwnership;

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
        message: `You can not transfer a Security Token already launched`,
      });
    }

    if (account === owner) {
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

export const createTransferReservationOwnershipResolver = (
  factories: Factories,
  symbol: string
) => async () => {
  return factories.securityTokenReservationFactory.refresh(
    SecurityTokenReservation.generateId({ symbol })
  );
};
