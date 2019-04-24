import { Polymath } from '~/Polymath';
import { Entity } from './Entity';
import { serialize, unserialize } from '~/utils';
import { DividendModuleTypes, isDividendModuleTypes } from '~/types';

interface UniqueIdentifiers {
  securityTokenSymbol: string;
  dividendType: DividendModuleTypes;
  investorAddress: string;
}

function isUniqueIdentifiers(
  identifiers: any
): identifiers is UniqueIdentifiers {
  const { securityTokenSymbol, dividendType, investorAddress } = identifiers;

  return (
    typeof securityTokenSymbol === 'string' &&
    isDividendModuleTypes(dividendType) &&
    typeof investorAddress === 'string'
  );
}

interface Params extends UniqueIdentifiers {
  securityTokenId: string;
  percentage: number;
}

export class TaxWithholding extends Entity {
  public static generateId({
    securityTokenSymbol,
    dividendType,
    investorAddress,
  }: UniqueIdentifiers) {
    return serialize('taxWithholding', {
      securityTokenSymbol,
      dividendType,
      investorAddress,
    });
  }

  public static unserialize(serialized: string) {
    const unserialized = unserialize(serialized);

    if (!isUniqueIdentifiers(unserialized)) {
      throw new Error('Wrong tax withholding ID format.');
    }

    return unserialized;
  }

  public uid: string;
  public securityTokenSymbol: string;
  public securityTokenId: string;
  public dividendType: DividendModuleTypes;
  public investorAddress: string;
  public percentage: number;

  constructor(params: Params, polyClient?: Polymath) {
    super(polyClient);

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
      securityTokenSymbol,
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
