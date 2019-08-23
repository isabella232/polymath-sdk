import { Entity } from './Entity';
import { serialize, unserialize } from '../utils';
import { DividendType, isDividendType, ErrorCode } from '../types';
import { PolymathError } from '../PolymathError';

export interface UniqueIdentifiers {
  securityTokenId: string;
  dividendType: DividendType;
  shareholderAddress: string;
}

function isUniqueIdentifiers(identifiers: any): identifiers is UniqueIdentifiers {
  const { securityTokenId, dividendType, shareholderAddress, checkpointIndex } = identifiers;

  return (
    typeof securityTokenId === 'string' &&
    isDividendType(dividendType) &&
    typeof shareholderAddress === 'string' &&
    typeof checkpointIndex === 'number'
  );
}

export interface Params {
  securityTokenSymbol: string;
  percentage: number;
}

export class TaxWithholding extends Entity<Params> {
  public static generateId({
    securityTokenId,
    dividendType,
    shareholderAddress,
  }: UniqueIdentifiers) {
    return serialize('taxWithholding', {
      securityTokenId,
      dividendType,
      shareholderAddress,
    });
  }

  public static unserialize(serialized: string) {
    const unserialized = unserialize(serialized);

    if (!isUniqueIdentifiers(unserialized)) {
      throw new PolymathError({
        code: ErrorCode.InvalidUuid,
        message: 'Wrong Tax Withholding ID format.',
      });
    }

    return unserialized;
  }

  public uid: string;

  public securityTokenSymbol: string;

  public securityTokenId: string;

  public dividendType: DividendType;

  public shareholderAddress: string;

  public percentage: number;

  constructor(params: Params & UniqueIdentifiers) {
    super();

    const {
      securityTokenId,
      securityTokenSymbol,
      dividendType,
      shareholderAddress,
      percentage,
    } = params;

    this.securityTokenId = securityTokenId;
    this.securityTokenSymbol = securityTokenSymbol;
    this.dividendType = dividendType;
    this.shareholderAddress = shareholderAddress;
    this.percentage = percentage;
    this.uid = TaxWithholding.generateId({
      securityTokenId,
      shareholderAddress,
      dividendType,
    });
  }

  public toPojo() {
    const {
      uid,
      securityTokenId,
      securityTokenSymbol,
      dividendType,
      shareholderAddress,
      percentage,
    } = this;

    return {
      uid,
      securityTokenId,
      securityTokenSymbol,
      dividendType,
      shareholderAddress,
      percentage,
    };
  }

  public _refresh(params: Partial<Params>) {
    const { securityTokenSymbol, percentage } = params;

    if (securityTokenSymbol) {
      this.securityTokenSymbol = securityTokenSymbol;
    }

    if (percentage) {
      this.percentage = percentage;
    }
  }
}
