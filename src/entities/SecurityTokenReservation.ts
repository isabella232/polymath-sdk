import { Entity } from './Entity';
import { serialize, unserialize } from '../utils';
import { Context } from '../Context';
import { CreateSecurityToken } from '../procedures';
import { PolymathError } from '../PolymathError';
import { ErrorCode } from '../types';

interface UniqueIdentifiers {
  symbol: string;
}

function isUniqueIdentifiers(identifiers: any): identifiers is UniqueIdentifiers {
  const { symbol } = identifiers;

  return typeof symbol === 'string';
}

interface Params extends UniqueIdentifiers {}

export class SecurityTokenReservation extends Entity {
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

  protected context: Context;

  constructor(params: Params, context: Context) {
    super();

    const { symbol } = params;

    this.symbol = symbol;
    this.context = context;
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
    return await procedure.prepare();
  };

  public toPojo() {
    const { uid, symbol } = this;

    return { uid, symbol };
  }
}
