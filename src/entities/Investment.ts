import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { Entity } from './Entity';
import { serialize, unserialize } from '../utils';
import { PolymathError } from '../PolymathError';
import { ErrorCode } from '../types';

interface UniqueIdentifiers {
  securityTokenSymbol: string;
  stoId: string;
  index: number;
}

function isUniqueIdentifiers(identifiers: any): identifiers is UniqueIdentifiers {
  const { securityTokenSymbol, stoId, index } = identifiers;

  return (
    typeof securityTokenSymbol === 'string' &&
    typeof stoId === 'string' &&
    typeof index === 'number'
  );
}

interface Params extends UniqueIdentifiers {
  securityTokenId: string;
  address: string;
  tokenAmount: BigNumber;
  investedFunds: BigNumber;
}

export class Investment extends Entity {
  public static generateId({ securityTokenSymbol, stoId, index }: UniqueIdentifiers) {
    return serialize('investment', {
      securityTokenSymbol,
      stoId,
      index,
    });
  }

  public static unserialize(serialized: string) {
    const unserialized = unserialize(serialized);

    if (!isUniqueIdentifiers(unserialized)) {
      throw new PolymathError({
        code: ErrorCode.InvalidUuid,
        message: 'Wrong Investment ID format.',
      });
    }

    return unserialized;
  }

  public uid: string;

  public securityTokenSymbol: string;

  public securityTokenId: string;

  public stoId: string;

  public address: string;

  public index: number;

  public tokenAmount: BigNumber;

  public investedFunds: BigNumber;

  constructor(params: Params) {
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
      securityTokenSymbol,
      stoId,
      index,
    });
  }

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
}
