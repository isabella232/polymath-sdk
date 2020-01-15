import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { Entity } from './Entity';
import { serialize, unserialize } from '../utils';
import { PolymathError } from '../PolymathError';
import { ErrorCode } from '../types';

/**
 * Properties that uniquely identify an Investment
 */
export interface UniqueIdentifiers {
  securityTokenId: string;
  stoId: string;
  index: number;
}

function isUniqueIdentifiers(identifiers: any): identifiers is UniqueIdentifiers {
  const { securityTokenId, stoId, index } = identifiers;

  return (
    typeof securityTokenId === 'string' && typeof stoId === 'string' && typeof index === 'number'
  );
}

/**
 * Constructor parameters
 */
export interface Params {
  securityTokenSymbol: string;
  address: string;
  tokenAmount: BigNumber;
  investedFunds: BigNumber;
}

/**
 * Used to manage an Investment in a Security Token Offering
 */
export class Investment extends Entity<Params> {
  public static generateId({ securityTokenId, stoId, index }: UniqueIdentifiers) {
    return serialize('investment', {
      securityTokenId,
      stoId,
      index,
    });
  }

  /**
   * Unserialize a serialized Investment entity
   *
   * @param serialized - string with Investment entity information
   */
  public static unserialize(serialized: string) {
    const unserialized = unserialize(serialized);

    if (!isUniqueIdentifiers(unserialized)) {
      throw new PolymathError({
        code: ErrorCode.InvalidUuid,
        message: 'Wrong Investment ID format',
      });
    }

    return unserialized;
  }

  /**
   * unique generated identifier for an Investment
   */
  public uid: string;

  public securityTokenId: string;

  /**
   * unique ID for the Investment
   */
  public stoId: string;

  public securityTokenSymbol: string;

  /**
   * wallet address of token holder
   */
  public address: string;

  /**
   * index of the Investment
   */
  public index: number;

  /**
   * total amount of tokens involved in the Investment
   */
  public tokenAmount: BigNumber;

  /**
   * amount of funds used to make Investment
   */
  public investedFunds: BigNumber;

  /**
   * Create an Investment instance
   */
  constructor(params: Params & UniqueIdentifiers) {
    super();

    const {
      securityTokenId,
      securityTokenSymbol,
      stoId,
      address,
      index,
      tokenAmount,
      investedFunds,
    } = params;

    this.securityTokenId = securityTokenId;
    this.securityTokenSymbol = securityTokenSymbol;
    this.stoId = stoId;
    this.address = address;
    this.index = index;
    this.tokenAmount = tokenAmount;
    this.investedFunds = investedFunds;
    this.uid = Investment.generateId({
      securityTokenId,
      stoId,
      index,
    });
  }

  /**
   * Convert entity to a POJO (Plain Old Javascript Object)
   */
  public toPojo() {
    const {
      uid,
      securityTokenId,
      securityTokenSymbol,
      stoId,
      address,
      index,
      tokenAmount,
      investedFunds,
    } = this;

    return {
      uid,
      securityTokenId,
      securityTokenSymbol,
      stoId,
      address,
      index,
      tokenAmount,
      investedFunds,
    };
  }

  /**
   * Hydrate the entity
   */
  public _refresh(params: Partial<Params>) {
    const { securityTokenSymbol, address, investedFunds, tokenAmount } = params;

    if (securityTokenSymbol) {
      this.securityTokenSymbol = securityTokenSymbol;
    }

    if (address) {
      this.address = address;
    }

    if (investedFunds) {
      this.investedFunds = investedFunds;
    }

    if (tokenAmount) {
      this.tokenAmount = tokenAmount;
    }
  }
}
