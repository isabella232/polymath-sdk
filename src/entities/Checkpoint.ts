import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { Entity } from './Entity';
import { serialize, unserialize } from '../utils';
import { DividendDistribution } from './DividendDistribution';
import { ShareholderBalance, ErrorCode } from '../types';
import { PolymathError } from '../PolymathError';

/**
 * Represents a checkpoint identifier
 */
export interface UniqueIdentifiers {
  /**
   * st identifier
   */
  securityTokenId: string;
  /**
   * checkpoint id used to query historical balances
   */
  index: number;
}

/**
 * Check if the provided value is of type [[UniqueIdentifiers]]
 *
 * @param identifiers - internal checkpoint representation
 */
function isUniqueIdentifiers(identifiers: any): identifiers is UniqueIdentifiers {
  const { securityTokenSymbol, index } = identifiers;

  return typeof securityTokenSymbol === 'string' && typeof index === 'number';
}

/**
 * Represents a single checkpoint instance
 */
export interface Params {
  /**
   * information for distributing dividends to holders
   */
  dividendDistributions: DividendDistribution[];
  /**
   * symbol of the security token
   */
  securityTokenSymbol: string;
  /**
   * balances for security token holders
   */
  shareholderBalances: ShareholderBalance[];
  /**
   * total number of st market cap
   */
  totalSupply: BigNumber;
  /**
   * date of checkpoint creation
   */
  createdAt: Date;
}

/**
 * Checkpoint implementation used to manage Security Token checkpoint functionality
 */
export class Checkpoint extends Entity<Params> {
  /**
   * Transform checkpoint object to plain string
   */
  public static generateId({ securityTokenId, index }: UniqueIdentifiers) {
    return serialize('checkpoint', {
      securityTokenId,
      index,
    });
  }

  /**
   * Unserialize string to Checkpoint object
   *
   * @param serialize - checkpoint serialized representation
   */
  public static unserialize(serialized: string) {
    const unserialized = unserialize(serialized);

    if (!isUniqueIdentifiers(unserialized)) {
      throw new PolymathError({
        code: ErrorCode.InvalidUuid,
        message: 'Wrong Checkpoint ID format',
      });
    }

    return unserialized;
  }

  public uid: string;

  public dividendDistributions: DividendDistribution[];

  public securityTokenSymbol: string;

  public securityTokenId: string;

  public index: number;

  public shareholderBalances: ShareholderBalance[];

  public totalSupply: BigNumber;

  public createdAt: Date;

  /**
   * Create a new Chekpoint instance
   */
  constructor(params: Params & UniqueIdentifiers) {
    super();

    const {
      dividendDistributions,
      securityTokenSymbol,
      securityTokenId,
      index,
      shareholderBalances,
      totalSupply,
      createdAt,
    } = params;

    this.dividendDistributions = dividendDistributions;
    this.securityTokenSymbol = securityTokenSymbol;
    this.securityTokenId = securityTokenId;
    this.index = index;
    this.shareholderBalances = shareholderBalances;
    this.totalSupply = totalSupply;
    this.createdAt = createdAt;
    this.uid = Checkpoint.generateId({ securityTokenId, index });
  }

  /**
   * Convert entity as a POJO (Plain Old Javascript Object)
   */
  public toPojo() {
    const {
      uid,
      dividendDistributions,
      securityTokenSymbol,
      securityTokenId,
      index,
      shareholderBalances,
      totalSupply,
      createdAt,
    } = this;

    return {
      uid,
      dividendDistributions: dividendDistributions.map(distribution => distribution.toPojo()),
      securityTokenSymbol,
      securityTokenId,
      index,
      shareholderBalances,
      totalSupply,
      createdAt,
    };
  }

  /**
   * Hydrating the entity
   */
  public _refresh(params: Partial<Params>) {
    const {
      dividendDistributions,
      securityTokenSymbol,
      shareholderBalances,
      totalSupply,
      createdAt,
    } = params;

    if (dividendDistributions) {
      this.dividendDistributions = dividendDistributions;
    }

    if (securityTokenSymbol) {
      this.securityTokenSymbol = securityTokenSymbol;
    }

    if (shareholderBalances) {
      this.shareholderBalances = shareholderBalances;
    }

    if (totalSupply) {
      this.totalSupply = totalSupply;
    }

    if (createdAt) {
      this.createdAt = createdAt;
    }
  }
}
