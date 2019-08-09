import { SecurityTokenRegistryEvents, conversionUtils } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import { ApproveErc20 } from './ApproveErc20';
import {
  ReserveSecurityTokenProcedureArgs,
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
} from '../types';
import { PolymathError } from '../PolymathError';
import { SecurityTokenReservation } from '../entities';
import { findEvent } from '../utils';
import { Polymath } from '../Polymath';

export class ReserveSecurityToken extends Procedure<
  ReserveSecurityTokenProcedureArgs,
  Polymath,
  SecurityTokenReservation
> {
  public type = ProcedureType.ReserveSecurityToken;

  public async prepareTransactions() {
    const { args, context, addProcedure, addTransaction } = this;
    const { symbol, owner } = args;
    const {
      contractWrappers: { securityTokenRegistry },
      currentWallet,
    } = context;

    let ownerAddress: string;

    if (owner) {
      ownerAddress = owner;
    } else {
      ({ address: ownerAddress } = currentWallet);
    }

    const isAvailable = await securityTokenRegistry.isTickerAvailable({
      ticker: symbol,
    });
    if (!isAvailable) {
      throw new PolymathError({
        message: `Ticker ${symbol} has already been registered`,
        code: ErrorCode.ProcedureValidationError,
      });
    }

    const fee = await securityTokenRegistry.getTickerRegistrationFee();
    await addProcedure(ApproveErc20)({
      amount: fee,
      spender: await securityTokenRegistry.address(),
    });

    const reservation = await addTransaction(securityTokenRegistry.registerTicker, {
      tag: PolyTransactionTag.ReserveSecurityToken,
      resolver: async receipt => {
        const { logs } = receipt;

        const event = findEvent({
          logs,
          eventName: SecurityTokenRegistryEvents.RegisterTicker,
        });

        if (event) {
          const { args: eventArgs } = event;

          const { _ticker, _expiryDate } = eventArgs;

          return new SecurityTokenReservation(
            { symbol: _ticker, expiry: conversionUtils.bigNumberToDate(_expiryDate) },
            context
          );
        }
        throw new PolymathError({
          code: ErrorCode.UnexpectedEventLogs,
          message:
            "The Security Token was successfully reserved but the corresponding event wasn't fired. Please repot this issue to the Polymath team.",
        });
      },
    })({ owner: ownerAddress, ticker: symbol, tokenName: '' });

    return reservation;
  }
}
