import {
  SecurityTokenRegistryEvents,
  conversionUtils,
  FeeType,
  TransactionParams,
} from '@polymathnetwork/contract-wrappers';
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
import { findEvents } from '../utils';

const { bigNumberToDate } = conversionUtils;

/**
 * - Procedure that reserve the token ticker to an specific owner
 *
 * ***Note once the token ticker is registered to its owner then no other issuer can claim its ownership***
 * ***Note if the ticker expires and its issuer hasn't used it, then someone else can take it***
 */
export class ReserveSecurityToken extends Procedure<
  ReserveSecurityTokenProcedureArgs,
  SecurityTokenReservation
> {
  public type = ProcedureType.ReserveSecurityToken;

  /**
   * - Reserve a new ticker
   *
   * Note that this procedure will fail if ticker has already been registered
   */
  public async prepareTransactions() {
    const { args, context, addProcedure, addTransaction } = this;
    const { symbol, owner } = args;
    const {
      contractWrappers: { securityTokenRegistry },
      currentWallet,
      factories: { securityTokenReservationFactory },
    } = context;

    let ownerAddress: string;

    if (owner) {
      ownerAddress = owner;
    } else {
      ownerAddress = await currentWallet.address();
    }

    const isAvailable = await securityTokenRegistry.tickerAvailable({
      ticker: symbol,
    });

    if (!isAvailable) {
      throw new PolymathError({
        message: `Ticker ${symbol} has already been registered`,
        code: ErrorCode.ProcedureValidationError,
      });
    }

    const [usdFee, polyFee] = await securityTokenRegistry.getFees({
      feeType: FeeType.TickerRegFee,
    });
    await addProcedure(ApproveErc20)({
      amount: polyFee,
      spender: await securityTokenRegistry.address(),
    });

    const [reservation] = await addTransaction<
      TransactionParams.SecurityTokenRegistry.RegisterNewTicker,
      [SecurityTokenReservation]
    >(securityTokenRegistry.registerNewTicker, {
      tag: PolyTransactionTag.ReserveSecurityToken,
      fees: {
        poly: polyFee,
        usd: usdFee,
      },
      resolvers: [
        async receipt => {
          const { logs } = receipt;

          const [event] = findEvents({
            logs,
            eventName: SecurityTokenRegistryEvents.RegisterTicker,
          });

          if (event) {
            const { args: eventArgs } = event;

            const { _ticker, _expiryDate, _owner, _registrationDate } = eventArgs;

            return securityTokenReservationFactory.create(
              SecurityTokenReservation.generateId({ symbol: _ticker }),
              {
                expiry: bigNumberToDate(_expiryDate),
                reservedAt: bigNumberToDate(_registrationDate),
                ownerAddress: _owner,
              }
            );
          }
          throw new PolymathError({
            code: ErrorCode.UnexpectedEventLogs,
            message:
              "The Security Token was successfully reserved but the corresponding event wasn't fired. Please report this issue to the Polymath team.",
          });
        },
      ],
    })({ owner: ownerAddress, ticker: symbol });

    return reservation;
  }
}
