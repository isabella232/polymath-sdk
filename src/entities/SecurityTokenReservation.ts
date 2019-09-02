import { Entity } from './Entity';
import { serialize, unserialize } from '../utils';
import { Context } from '../Context';
import { CreateSecurityToken } from '../procedures';
import { PolymathError } from '../PolymathError';
import { ErrorCode } from '../types';

export interface UniqueIdentifiers {
  symbol: string;
}

function isUniqueIdentifiers(identifiers: any): identifiers is UniqueIdentifiers {
  const { symbol } = identifiers;

  return typeof symbol === 'string';
}

export interface Params {
  expiry: Date;
  reservedAt: Date;
  ownerAddress: string;
  securityTokenAddress?: string;
}

export class SecurityTokenReservation extends Entity<Params> {
  public static generateId({ symbol }: UniqueIdentifiers) {
    return serialize('securityTokenReservation', {
      symbol,
    });
  }

  public static unserialize(serialized: string) {
    const unserialized = unserialize(serialized);

    if (!isUniqueIdentifiers(unserialized)) {
      throw new PolymathError({
        code: ErrorCode.InvalidUuid,
        message: 'Wrong Security Token Reservation ID format.',
      });
    }

    return unserialized;
  }

  public uid: string;

  public symbol: string;

  /**
   * Date at which this reservation expires
   */
  public expiry: Date;

  /**
   * Date when the Security Token was reserved
   */
  public reservedAt: Date;

  /**
   * Address of the owner of the reservation
   */
  public ownerAddress: string;

  /**
   * Address of the Security Token if it has already been launched, undefined if not
   */
  public securityTokenAddress?: string;

  protected context: Context;

  constructor(params: Params & UniqueIdentifiers, context: Context) {
    super();

    const { symbol, expiry, reservedAt, securityTokenAddress, ownerAddress } = params;

    this.symbol = symbol;
    this.context = context;
    this.expiry = expiry;
    this.reservedAt = reservedAt;
    this.ownerAddress = ownerAddress;
    this.securityTokenAddress = securityTokenAddress;
    this.uid = SecurityTokenReservation.generateId({ symbol });
  }

  /**
   * Creates a security token with the reserved symbol
   *
   * @param name name of the security token
   * @param detailsUrl URL containing information about the security
   * @param divisible whether the token should be divisible or not
   * @param treasuryWallet address of a wallet to be used to store tokens for some operations (defaults to)
   */
  public createSecurityToken = async (args: {
    name: string;
    detailsUrl?: string;
    divisible: boolean;
    treasuryWallet?: string;
  }) => {
    const procedure = new CreateSecurityToken(
      {
        symbol: this.symbol,
        ...args,
      },
      this.context
    );
    return procedure.prepare();
  };

  /**
   * Returns true if the Security Token associated to this reservation has already been launched
   */
  public isLaunched = async () => {
    const { context, symbol } = this;

    return context.contractWrappers.securityTokenRegistry.isTokenLaunched({ ticker: symbol });
  };

  public toPojo() {
    const { uid, symbol, expiry, securityTokenAddress } = this;

    return { uid, symbol, expiry, securityTokenAddress };
  }

  public _refresh(params: Partial<Params>) {
    const { expiry, securityTokenAddress } = params;

    if (expiry) {
      this.expiry = expiry;
    }

    if (securityTokenAddress) {
      this.securityTokenAddress = securityTokenAddress;
    }
  }
}
