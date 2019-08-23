import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { Entity } from './Entity';
import { serialize, unserialize } from '../utils';
import { PolymathError } from '../PolymathError';
import { ErrorCode } from '../types';

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

export interface Params {
  securityTokenSymbol: string;
  address: string;
  tokenAmount: BigNumber;
  investedFunds: BigNumber;
}

export class Investment extends Entity<Params> {
  public static generateId({ securityTokenId, stoId, index }: UniqueIdentifiers) {
    return serialize('investment', {
      securityTokenId,
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

  public securityTokenId: string;

  public stoId: string;

  public securityTokenSymbol: string;

  public address: string;

  public index: number;

  public tokenAmount: BigNumber;

  public investedFunds: BigNumber;

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
