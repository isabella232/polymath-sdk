import { Factory } from './Factory';
import { Context } from '../../Context';
import { PolymathError } from '../../PolymathError';
import { ErrorCode } from '../../types';
import { SecurityTokenReservation, Params, UniqueIdentifiers } from '../SecurityTokenReservation';

export class SecurityTokenReservationFactory extends Factory<
  SecurityTokenReservation,
  Params,
  UniqueIdentifiers
> {
  protected generateProperties = async (uid: string) => {
    const { symbol } = SecurityTokenReservation.unserialize(uid);

    const {
      contractWrappers: { securityTokenRegistry, tokenFactory },
    } = this.context;

    const {
      status,
      expiryDate,
      owner,
      registrationDate,
    } = await securityTokenRegistry.getTickerDetails({ ticker: symbol });

    if (!status) {
      throw new PolymathError({
        code: ErrorCode.FetcherValidationError,
        message: `There is no reservation for token symbol ${symbol}`,
      });
    }

    let securityTokenAddress;
    try {
      const securityToken = await tokenFactory.getSecurityTokenInstanceFromTicker(symbol);
      securityTokenAddress = await securityToken.address();
    } catch (e) {
      // we reach this point if the token hasn't been launched, so we just ignore it
    }

    return {
      expiry: expiryDate,
      reservedAt: registrationDate,
      ownerAddress: owner,
      securityTokenAddress,
    };
  };

  constructor(context: Context) {
    super(SecurityTokenReservation, context);
  }
}
