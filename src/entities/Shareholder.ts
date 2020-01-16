import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { Entity } from './Entity';
import { serialize, unserialize } from '../utils';
import { PolymathError } from '../PolymathError';
import { ErrorCode } from '../types';

/**
 * Properties that uniquely identify a Shareholder of a specific Security Token
 */
export interface UniqueIdentifiers {
  securityTokenId: string;
  address: string;
}

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
 * Used to manage a Shareholder
 */
export class Shareholder extends Entity<Params> {
  public static generateId({ securityTokenId, address }: UniqueIdentifiers) {
    return serialize('shareholder', {
      securityTokenId,
      address,
    });
  }

  /**
   * Unserialize a serialized Shareholder entity
   *
   * @param serialized - string with Shareholder entity information
   */
  public static unserialize(serialized: string) {
    const unserialized = unserialize(serialized);

    if (!isUniqueIdentifiers(unserialized)) {
      throw new PolymathError({
        code: ErrorCode.InvalidUuid,
        message: 'Wrong Shareholder ID format',
      });
    }

    return unserialized;
  }

  /**
   * unique generated id for a Shareholder
   */
  public uid: string;

  public securityTokenSymbol: string;

  public securityTokenId: string;

  /**
   * date after which a Shareholder can transfer tokens from their address
   */
  public canSendAfter: Date;

  /**
   * date after which a Shareholder can transfer tokens to their address
   */
  public canReceiveAfter: Date;

  /**
   * date when the Shareholder's KYC will expire
   */
  public kycExpiry: Date;

  /**
   * whether the Shareholder is accredited or not
   */
  public isAccredited: boolean;

  /**
   * whether the Shareholder can purchase from an STO or not
   */
  public canBuyFromSto: boolean;

  /**
   * total Security Token balance of the Shareholder
   */
  public balance: BigNumber;

  /**
   * wallet address
   */
  public address: string;

  /**
   * Create a new Shareholder instance
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
    this.uid = Shareholder.generateId({
      securityTokenId,
      address,
    });
  }

  /**
   * Checks if this Shareholder's KYC has been manually revoked
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
