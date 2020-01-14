import { Entity } from './Entity';
import { serialize, unserialize } from '../utils';
import { ErrorCode } from '../types';
import { PolymathError } from '../PolymathError';

/**
 * Properties unique to tax withholding properties for a specific security token holder
 */
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

/**
 * Unique properties for tax withholding of a security token
 */
export interface Params {
  securityTokenSymbol: string;
  percentage: number;
}

/**
 * Used to manage tax withholding amounts
 */
export class TaxWithholding extends Entity<Params> {
  public static generateId({ securityTokenId, shareholderAddress }: UniqueIdentifiers) {
    return serialize('taxWithholding', {
      securityTokenId,
      shareholderAddress,
    });
  }

  /**
   * Unserialize a serialized entity of tax withholding information
   *
   * @param serialized - string with tax withholding information
   */
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

  /**
   * unique generated identifer for tax withholding entity
   */
  public uid: string;

  public securityTokenSymbol: string;

  public securityTokenId: string;

  /**
   * shareholder address for tax withholding properties
   */
  public shareholderAddress: string;

  /**
   * percentage of tax to be withheld
   */
  public percentage: number;

  /**
   * Create a new tax withholding information instance
   */
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

  /**
   * Convert entity to a POJO (Plain Old Javascript Object)
   */
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

  /**
   * Hydrate the entity
   */
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
