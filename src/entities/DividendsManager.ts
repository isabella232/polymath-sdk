import { Entity } from './Entity';
import { unserialize } from '../utils';
import { DividendType, isDividendType, ErrorCode } from '../types';
import { PolymathError } from '../PolymathError';

export interface UniqueIdentifiers {
  securityTokenId: string;
  dividendType: DividendType;
}

function isUniqueIdentifiers(identifiers: any): identifiers is UniqueIdentifiers {
  const { securityTokenId, dividendType } = identifiers;

  return typeof securityTokenId === 'string' && isDividendType(dividendType);
}

export interface Params {
  address: string;
  securityTokenSymbol: string;
  storageWalletAddress: string;
}

export abstract class DividendsManager<P> extends Entity<P> {
  public abstract uid: string;

  public address: string;

  public securityTokenSymbol: string;

  public securityTokenId: string;

  public storageWalletAddress: string;

  public dividendType: DividendType;

  public static unserialize(serialized: string) {
    const unserialized = unserialize(serialized);

    if (!isUniqueIdentifiers(unserialized)) {
      throw new PolymathError({
        code: ErrorCode.InvalidUuid,
        message: 'Wrong Dividends Manager ID format.',
      });
    }

    return unserialized;
  }

  constructor(params: Params & UniqueIdentifiers) {
    super();

    const {
      address,
      securityTokenSymbol,
      securityTokenId,
      storageWalletAddress,
      dividendType,
    } = params;

    this.address = address;
    this.securityTokenSymbol = securityTokenSymbol;
    this.securityTokenId = securityTokenId;
    this.storageWalletAddress = storageWalletAddress;
    this.dividendType = dividendType;
  }

  public toPojo() {
    const {
      uid,
      address,
      securityTokenSymbol,
      securityTokenId,
      storageWalletAddress,
      dividendType,
    } = this;

    return {
      uid,
      address,
      securityTokenSymbol,
      securityTokenId,
      storageWalletAddress,
      dividendType,
    };
  }

  public _refresh(params: Partial<Params>) {
    const { address, securityTokenSymbol, storageWalletAddress } = params;

    if (address) {
      this.address = address;
    }

    if (securityTokenSymbol) {
      this.securityTokenSymbol = securityTokenSymbol;
    }

    if (storageWalletAddress) {
      this.storageWalletAddress = storageWalletAddress;
    }
  }
}
