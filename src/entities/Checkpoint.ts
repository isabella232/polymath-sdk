import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { Entity } from './Entity';
import { serialize, unserialize } from '../utils';
import { DividendDistribution } from './DividendDistribution';
import { TokenholderBalance, ErrorCode } from '../types';
import { PolymathError } from '../PolymathError';

/**
 * Properties that uniquely identify a Checkpoint
 */
export interface UniqueIdentifiers {
  /**
   * security token UUID
   */
  securityTokenId: string;
  /**
   * numerical index of the checkpoint. The higher the index, the more recent the checkpoint
   */
  index: number;
}

/**
 * Check if the provided value is of type [[UniqueIdentifiers]]
 */
function isUniqueIdentifiers(identifiers: any): identifiers is UniqueIdentifiers {
  const { securityTokenSymbol, index } = identifiers;

  return typeof securityTokenSymbol === 'string' && typeof index === 'number';
}

/**
 * Checkpoint constructor parameters
 */
export interface Params {
  /**
   * dividend distributions associated to this checkpoint
   */
  dividendDistributions: DividendDistribution[];
  /**
   * symbol of the security token
   */
  securityTokenSymbol: string;
  /**
   * tokenholder balances at this specific Checkpoint
   */
  tokenholderBalances: TokenholderBalance[];
  totalSupply: BigNumber;
  createdAt: Date;
}

/**
 * Represents a snapshot of the Security Token's supply and Tokenholder balances at a certain point in time
 */
export class Checkpoint extends Entity<Params> {
  /**
   * Generate the Checkpoint's UUID from its identifying properties
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

  /**
   * dividend distributions associated to this snapshot
   */
  public dividendDistributions: DividendDistribution[];

  public securityTokenSymbol: string;

  public securityTokenId: string;

  /**
   * numerical index of the checkpoint associated to this snapshot
   */
  public index: number;

  /**
   * tokenholder balances at this specific checkpoint
   */
  public tokenholderBalances: TokenholderBalance[];

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
      tokenholderBalances,
      totalSupply,
      createdAt,
    } = params;

    this.dividendDistributions = dividendDistributions;
    this.securityTokenSymbol = securityTokenSymbol;
    this.securityTokenId = securityTokenId;
    this.index = index;
    this.tokenholderBalances = tokenholderBalances;
    this.totalSupply = totalSupply;
    this.createdAt = createdAt;
    this.uid = Checkpoint.generateId({ securityTokenId, index });
  }

  /**
   * Convert entity to a POJO (Plain Old Javascript Object)
   */
  public toPojo() {
    const {
      uid,
      dividendDistributions,
      securityTokenSymbol,
      securityTokenId,
      index,
      tokenholderBalances,
      totalSupply,
      createdAt,
    } = this;

    return {
      uid,
      dividendDistributions: dividendDistributions.map(distribution => distribution.toPojo()),
      securityTokenSymbol,
      securityTokenId,
      index,
      tokenholderBalances,
      totalSupply,
      createdAt,
    };
  }

  /**
   * Hydrate the entity
   */
  public _refresh(params: Partial<Params>) {
    const {
      dividendDistributions,
      securityTokenSymbol,
      tokenholderBalances,
      totalSupply,
      createdAt,
    } = params;

    if (dividendDistributions) {
      this.dividendDistributions = dividendDistributions;
    }

    if (securityTokenSymbol) {
      this.securityTokenSymbol = securityTokenSymbol;
    }

    if (tokenholderBalances) {
      this.tokenholderBalances = tokenholderBalances;
    }

    if (totalSupply) {
      this.totalSupply = totalSupply;
    }

    if (createdAt) {
      this.createdAt = createdAt;
    }
  }
}
