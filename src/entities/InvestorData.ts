import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { Polymath } from '../Polymath';
import { Entity } from './Entity';
import { serialize, unserialize } from '../utils';

interface UniqueIdentifiers {
  securityTokenId: string;
  address: string;
}

function isUniqueIdentifiers(identifiers: any): identifiers is UniqueIdentifiers {
  const { securityTokenId, address } = identifiers;

  return typeof securityTokenId === 'string' && typeof address === 'string';
}

interface Params extends UniqueIdentifiers {
  securityTokenSymbol: string;
  canSendAfter: Date;
  canReceiveAfter: Date;
  kycExpiry: Date;
  isAccredited: boolean;
  canBuyFromSto: boolean;
  balance: BigNumber;
}

export class InvestorData extends Entity {
  public static generateId({ securityTokenId, address }: UniqueIdentifiers) {
    return serialize('investorData', {
      securityTokenId,
      address,
    });
  }

  public static unserialize(serialized: string) {
    const unserialized = unserialize(serialized);

    if (!isUniqueIdentifiers(unserialized)) {
      throw new Error('Wrong investor data ID format.');
    }

    return unserialized;
  }

  public uid: string;

  public securityTokenSymbol: string;

  public securityTokenId: string;

  public canSendAfter: Date;

  public canReceiveAfter: Date;

  public kycExpiry: Date;

  public isAccredited: boolean;

  public canBuyFromSto: boolean;

  public balance: BigNumber;

  public address: string;

  constructor(params: Params, polyClient?: Polymath) {
    super(polyClient);

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
    this.uid = InvestorData.generateId({
      securityTokenId,
      address,
    });
  }

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
}
