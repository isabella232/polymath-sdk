import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { Entity } from './Entity';
import { serialize, unserialize } from '../utils';
import { PolymathError } from '../PolymathError';
import { ErrorCode } from '../types';

/**
 * Properties that uniquely identify a Tokenholder of a specific Security Token
 */
export interface UniqueIdentifiers {
  securityTokenId: string;
  address: string;
}

/**
 * @hidden
 * Check if a value is of type [[UniqueIdentifiers]]
 */
function isUniqueIdentifiers(identifiers: any): identifiers is UniqueIdentifiers {
  const { securityTokenId, address } = identifiers;

  return typeof securityTokenId === 'string' && typeof address === 'string';
}

/**
 * Constructor parameters
 */
export interface Params {
  securityTokenSymbol: string;
  canSendAfter: Date;
  canReceiveAfter: Date;
  kycExpiry: Date;
  isAccredited: boolean;
  canBuyFromSto: boolean;
  balance: BigNumber;
}

/**
 * Used to manage a Tokenholder
 */
export class Tokenholder extends Entity<Params> {
  /**
   * Generate the Tokenholder's UUID from its identifying properties
   */
  public static generateId({ securityTokenId, address }: UniqueIdentifiers) {
    return serialize('tokenholder', {
      securityTokenId,
      address,
    });
  }

  /**
   * Unserialize a serialized Tokenholder entity
   *
   * @param serialized - string with Tokenholder entity information
   */
  public static unserialize(serialized: string) {
    const unserialized = unserialize(serialized);

    if (!isUniqueIdentifiers(unserialized)) {
      throw new PolymathError({
        code: ErrorCode.InvalidUuid,
        message: 'Wrong Tokenholder ID format',
      });
    }

    return unserialized;
  }

  /**
   * unique generated id for a Tokenholder
   */
  public uid: string;

  public securityTokenSymbol: string;

  public securityTokenId: string;

  /**
   * date after which a Tokenholder can transfer tokens from their address
   */
  public canSendAfter: Date;

  /**
   * date after which a Tokenholder can transfer tokens to their address
   */
  public canReceiveAfter: Date;

  /**
   * date when the Tokenholder's KYC will expire
   */
  public kycExpiry: Date;

  /**
   * whether the Tokenholder is accredited or not
   */
  public isAccredited: boolean;

  /**
   * whether the Tokenholder can purchase from an STO or not
   */
  public canBuyFromSto: boolean;

  /**
   * total Security Token balance of the Tokenholder
   */
  public balance: BigNumber;

  /**
   * wallet address
   */
  public address: string;

  /**
   * Create a new Tokenholder instance
   */
  constructor(params: Params & UniqueIdentifiers) {
    super();

    const {
      securityTokenId,
      securityTokenSymbol,
      address,
      canSendAfter,
      canReceiveAfter,
      kycExpiry,
      isAccredited,
      canBuyFromSto,
      balance,
    } = params;

    this.securityTokenId = securityTokenId;
    this.securityTokenSymbol = securityTokenSymbol;
    this.address = address;
    this.canSendAfter = canSendAfter;
    this.canReceiveAfter = canReceiveAfter;
    this.kycExpiry = kycExpiry;
    this.isAccredited = isAccredited;
    this.canBuyFromSto = canBuyFromSto;
    this.balance = balance;
    this.uid = Tokenholder.generateId({
      securityTokenId,
      address,
    });
  }

  /**
   * Checks if this Tokenholder's KYC has been manually revoked
   */
  public isRevoked() {
    const { canReceiveAfter, canSendAfter, kycExpiry } = this;

    const datesAreZero = [canReceiveAfter, canSendAfter, kycExpiry].every(
      date => date.getTime() === 0
    );

    //
    return datesAreZero;
  }

  /**
   * Convert entity to a POJO (Plain Old Javascript Object)
   */
  public toPojo() {
    const {
      uid,
      securityTokenId,
      securityTokenSymbol,
      address,
      canSendAfter,
      canReceiveAfter,
      kycExpiry,
      isAccredited,
      canBuyFromSto,
      balance,
    } = this;

    return {
      uid,
      securityTokenId,
      securityTokenSymbol,
      address,
      canSendAfter,
      canReceiveAfter,
      kycExpiry,
      isAccredited,
      canBuyFromSto,
      balance,
    };
  }

  /**
   * Hydrate the entity
   */
  public _refresh(params: Partial<Params>) {
    const {
      securityTokenSymbol,
      canSendAfter,
      canReceiveAfter,
      kycExpiry,
      isAccredited,
      canBuyFromSto,
      balance,
    } = params;

    if (securityTokenSymbol) {
      this.securityTokenSymbol = securityTokenSymbol;
    }

    if (canSendAfter) {
      this.canSendAfter = canSendAfter;
    }

    if (canReceiveAfter) {
      this.canReceiveAfter = canReceiveAfter;
    }

    if (kycExpiry) {
      this.kycExpiry = kycExpiry;
    }

    if (isAccredited !== undefined) {
      this.isAccredited = isAccredited;
    }

    if (canBuyFromSto !== undefined) {
      this.canBuyFromSto = canBuyFromSto;
    }

    if (balance) {
      this.balance = balance;
    }
  }
}
