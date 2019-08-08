import { Entity } from './Entity';
import { serialize, unserialize } from '../utils';
import { DividendType, isDividendType, ErrorCode } from '../types';
import { PolymathError } from '../PolymathError';

interface UniqueIdentifiers {
  securityTokenId: string;
  dividendType: DividendType;
  investorAddress: string;
}

function isUniqueIdentifiers(identifiers: any): identifiers is UniqueIdentifiers {
  const { securityTokenId, dividendType, investorAddress, checkpointIndex } = identifiers;

  return (
    typeof securityTokenId === 'string' &&
    isDividendType(dividendType) &&
    typeof investorAddress === 'string' &&
    typeof checkpointIndex === 'number'
  );
}

interface Params extends UniqueIdentifiers {
  securityTokenSymbol: string;
  percentage: number;
}

export class TaxWithholding extends Entity {
  public static generateId({ securityTokenId, dividendType, investorAddress }: UniqueIdentifiers) {
    return serialize('taxWithholding', {
      securityTokenId,
      dividendType,
      investorAddress,
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

  public investorAddress: string;

  public percentage: number;

  constructor(params: Params) {
    super();

    const {
      securityTokenId,
      securityTokenSymbol,
      dividendType,
      investorAddress,
      percentage,
    } = params;

    this.securityTokenId = securityTokenId;
    this.securityTokenSymbol = securityTokenSymbol;
    this.dividendType = dividendType;
    this.investorAddress = investorAddress;
    this.percentage = percentage;
    this.uid = TaxWithholding.generateId({
      securityTokenId,
      investorAddress,
      dividendType,
    });
  }

  public toPojo() {
    const {
      uid,
      securityTokenId,
      securityTokenSymbol,
      dividendType,
      investorAddress,
      percentage,
    } = this;

    return {
      uid,
      securityTokenId,
      securityTokenSymbol,
      dividendType,
      investorAddress,
      percentage,
    };
  }
}
