import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { Entity } from './Entity';
import { serialize, unserialize } from '../utils';
import { PolymathError } from '../PolymathError';
import { ErrorCode } from '../types';

/**
 * Properties unique to a shareholder for a specific STO investment
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
 * Represents information for a specific security token offering investment
 */
export interface Params {
  securityTokenSymbol: string;
  address: string;
  tokenAmount: BigNumber;
  investedFunds: BigNumber;
}

/**
 * Used to manage an investment in a security token
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
   * Unserialize a serialized investment entity
   *
   * @param serialized string with investment entity information
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
   * Unique generated identifier for an investment
   */
  public uid: string;

  public securityTokenId: string;

  /**
   * Unique ID for the investment STO
   */
  public stoId: string;

  public securityTokenSymbol: string;

  /**
   * Wallet address of token holder
   */
  public address: string;

  /**
   * Index of the investment
   */
  public index: number;

  /**
   * Total amount of tokens involved in the investment
   */
  public tokenAmount: BigNumber;

  /**
   * Amount of funds used to make investment
   */
  public investedFunds: BigNumber;

  /**
   * Create an investment instance
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
