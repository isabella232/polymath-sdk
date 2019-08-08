import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { Entity } from './Entity';
import { serialize, unserialize } from '../utils';
import { DividendDistribution } from './DividendDistribution';
import { ShareholderBalance, ErrorCode } from '../types';
import { Context } from '../Context';
import { PolymathError } from '../PolymathError';

interface UniqueIdentifiers {
  securityTokenId: string;
  index: number;
}

function isUniqueIdentifiers(identifiers: any): identifiers is UniqueIdentifiers {
  const { securityTokenSymbol, index } = identifiers;

  return typeof securityTokenSymbol === 'string' && typeof index === 'number';
}

interface Params extends UniqueIdentifiers {
  dividends: DividendDistribution[];
  securityTokenSymbol: string;
  shareholderBalances: ShareholderBalance[];
  totalSupply: BigNumber;
  createdAt: Date;
}

export class Checkpoint extends Entity {
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

  public dividends: DividendDistribution[];

  public securityTokenSymbol: string;

  public securityTokenId: string;

  public index: number;

  public shareholderBalances: ShareholderBalance[];

  public totalSupply: BigNumber;

  public createdAt: Date;

  constructor(params: Params) {
    super();

    const {
      dividends,
      securityTokenSymbol,
      securityTokenId,
      index,
      shareholderBalances,
      totalSupply,
      createdAt,
    } = params;

    this.dividends = dividends;
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
      dividends,
      securityTokenSymbol,
      securityTokenId,
      index,
      shareholderBalances,
      totalSupply,
      createdAt,
    } = this;

    return {
      uid,
      dividends: dividends.map(dividend => dividend.toPojo()),
      securityTokenSymbol,
      securityTokenId,
      index,
      shareholderBalances,
      totalSupply,
      createdAt,
    };
  }
}
