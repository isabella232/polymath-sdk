import { Entity } from './Entity';
import { serialize, unserialize } from '../utils';
import { Context } from '../Context';
import { CreateSecurityToken, TransferReservationOwnership } from '../procedures';
import { PolymathError } from '../PolymathError';
import { ErrorCode } from '../types';

/**
 * Properties that uniquely identify a Security Token Reservation
 */
export interface UniqueIdentifiers {
  symbol: string;
}

/**
 * Check if the provided value is of type [[UniqueIdentifiers]]
 */
function isUniqueIdentifiers(identifiers: any): identifiers is UniqueIdentifiers {
  const { symbol } = identifiers;

  return typeof symbol === 'string';
}

/**
 * Constructor parameters
 */
export interface Params {
  /**
   * expiry date for the ticker reservation
   */
  expiry: Date;
  reservedAt: Date;
  ownerAddress: string;
  securityTokenAddress?: string;
}

/**
 * Class used to manage all the Security Token Reservation functionality
 */
export class SecurityTokenReservation extends Entity<Params> {
  /**
   * Generate the Security Token Reservation's UUID from its identifying properties
   */
  public static generateId({ symbol }: UniqueIdentifiers) {
    return serialize('securityTokenReservation', {
      symbol,
    });
  }

  /**
   * Unserialize string to a Security Token Reservation object representation
   *
   * @param serialize - security token's serialized representation
   */
  public static unserialize(serialized: string) {
    const unserialized = unserialize(serialized);

    if (!isUniqueIdentifiers(unserialized)) {
      throw new PolymathError({
        code: ErrorCode.InvalidUuid,
        message: 'Wrong Security Token Reservation ID format',
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

  /**
   * Create a new SecurityTokenReservation instance
   */
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

  /**
   * Transfer the ownership of the ticker
   */
  public transferOwnership = async (args: { newOwner: string }) => {
    const { context, symbol } = this;
    const { newOwner } = args;
    const procedure = new TransferReservationOwnership({ symbol, newOwner }, context);

    return procedure.prepare();
  };

  /**
   * Convert entity to a POJO (Plain Old Javascript Object)
   */
  public toPojo() {
    const { uid, symbol, expiry, securityTokenAddress, reservedAt, ownerAddress } = this;

    return { uid, symbol, expiry, securityTokenAddress, reservedAt, ownerAddress };
  }

  /**
   * Hydrate the entity
   */
  public _refresh(params: Partial<Params>) {
    const { expiry, securityTokenAddress, reservedAt, ownerAddress } = params;

    if (expiry) {
      this.expiry = expiry;
    }

    if (securityTokenAddress) {
      this.securityTokenAddress = securityTokenAddress;
    }

    if (reservedAt) {
      this.reservedAt = reservedAt;
    }

    if (ownerAddress) {
      this.ownerAddress = ownerAddress;
    }
  }
}
