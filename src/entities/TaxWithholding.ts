import { Entity } from './Entity';
import { serialize, unserialize } from '../utils';
import { ErrorCode } from '../types';
import { PolymathError } from '../PolymathError';

export interface UniqueIdentifiers {
  securityTokenId: string;
  shareholderAddress: string;
}

function isUniqueIdentifiers(identifiers: any): identifiers is UniqueIdentifiers {
  const { securityTokenId, shareholderAddress, checkpointIndex } = identifiers;

  return (
    typeof securityTokenId === 'string' &&
    typeof shareholderAddress === 'string' &&
    typeof checkpointIndex === 'number'
  );
}

export interface Params {
  securityTokenSymbol: string;
  percentage: number;
}

export class TaxWithholding extends Entity<Params> {
  public static generateId({ securityTokenId, shareholderAddress }: UniqueIdentifiers) {
    return serialize('taxWithholding', {
      securityTokenId,
      shareholderAddress,
    });
  }

  public static unserialize(serialized: string) {
    const unserialized = unserialize(serialized);

    if (!isUniqueIdentifiers(unserialized)) {
      throw new PolymathError({
        code: ErrorCode.InvalidUuid,
        message: 'Wrong Tax Withholding ID format',
      });
    }

    return unserialized;
  }

  public uid: string;

  public securityTokenSymbol: string;

  public securityTokenId: string;

  public shareholderAddress: string;

  public percentage: number;

  constructor(params: Params & UniqueIdentifiers) {
    super();

    const { securityTokenId, securityTokenSymbol, shareholderAddress, percentage } = params;

    this.securityTokenId = securityTokenId;
    this.securityTokenSymbol = securityTokenSymbol;
    this.shareholderAddress = shareholderAddress;
    this.percentage = percentage;
    this.uid = TaxWithholding.generateId({
      securityTokenId,
      shareholderAddress,
    });
  }

  public toPojo() {
    const { uid, securityTokenId, securityTokenSymbol, shareholderAddress, percentage } = this;

    return {
      uid,
      securityTokenId,
      securityTokenSymbol,
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
