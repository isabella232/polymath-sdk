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

    if (registrationDate.getTime() === 0 || expiryDate > new Date()) {
      // reservation never created or expired
      throw new PolymathError({
        code: ErrorCode.FetcherValidationError,
        message: `There is no reservation for token symbol ${symbol} or it has expired`,
      });
    }

    let securityTokenAddress;
    if (status) {
      // token has been launched
      const securityToken = await tokenFactory.getSecurityTokenInstanceFromTicker(symbol);
      securityTokenAddress = await securityToken.address();
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
