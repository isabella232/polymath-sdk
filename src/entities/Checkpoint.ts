import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { Entity } from './Entity';
import { serialize, unserialize } from '../utils';
import { DividendDistribution } from './DividendDistribution';
import { ShareholderBalance, ErrorCode } from '../types';
import { PolymathError } from '../PolymathError';

export interface UniqueIdentifiers {
  securityTokenId: string;
  index: number;
}

function isUniqueIdentifiers(identifiers: any): identifiers is UniqueIdentifiers {
  const { securityTokenSymbol, index } = identifiers;

  return typeof securityTokenSymbol === 'string' && typeof index === 'number';
}

export interface Params {
  dividendDistributions: DividendDistribution[];
  securityTokenSymbol: string;
  shareholderBalances: ShareholderBalance[];
  totalSupply: BigNumber;
  createdAt: Date;
}

export class Checkpoint extends Entity<Params> {
  public static generateId({ securityTokenId, index }: UniqueIdentifiers) {
    return serialize('checkpoint', {
      securityTokenId,
      index,
    });
  }

  public static unserialize(serialized: string) {
    const unserialized = unserialize(serialized);

    if (!isUniqueIdentifiers(unserialized)) {
      throw new PolymathError({
        code: ErrorCode.InvalidUuid,
        message: 'Wrong Checkpoint ID format.',
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
