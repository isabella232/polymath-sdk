import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { Context } from '../../Context';
import { Entity } from '../Entity';
import { serialize, unserialize as unserializeUtil } from '../../utils';
import { Features } from './Features';
import { Shareholders } from './Shareholders';
import { Dividends } from './Dividends';
import { Issuance } from './Issuance';
import { Permissions } from './Permissions';
import { Transfers } from './Transfers';
import { Documents } from './Documents';
import { Controller } from './Controller';
import { PolymathError } from '../../PolymathError';
import { ErrorCode, Version } from '../../types';

/**
 * Represents a unique security token representation
 */
export interface UniqueIdentifiers {
  /**
   * symbol of the security token
   */
  symbol: string;
}

function isUniqueIdentifiers(identifiers: any): identifiers is UniqueIdentifiers {
  const { symbol } = identifiers;

  return typeof symbol === 'string';
}

/**
 * Represents a single Security Token
 */
export interface Params {
  /**
   * name of the Security token
   */
  name: string;
  /**
   * address of the Security token
   */
  address: string;
  /**
   * the owner of the Security Token
   */
  owner: string;
  /**
   * the off-chain data associated with the Security Token
   */
  tokenDetails: string;
  /**
   * module version of the security token
   */
  version: Version;
  /**
   * granularity level of the token
   */
  granularity: number;
  /**
   * total number of market cap to be created
   */
  totalSupply: BigNumber;
  /**
   * checkpoint id used to query historical balances
   */
  currentCheckpoint: number;
  /**
   * ethereum address which will holds the STs
   */
  treasuryWallet: string;
}

export const unserialize = (serialized: string) => {
  const unserialized = unserializeUtil(serialized);

  if (!isUniqueIdentifiers(unserialized)) {
    throw new PolymathError({
      code: ErrorCode.InvalidUuid,
      message: 'Wrong Security Token ID format',
    });
  }

  return unserialized;
};

/**
 * Class used to manage all the Security Token functionality
 */
export class SecurityToken extends Entity<Params> {
  public static generateId({ symbol }: UniqueIdentifiers) {
    return serialize('securityToken', {
      symbol,
    });
  }

  public static unserialize = unserialize;

  public uid: string;

  public symbol: string;

  public name: string;

  public owner: string;

  public address: string;

  public tokenDetails: string;

  public version: Version;

  public granularity: number;

  public totalSupply: BigNumber;

  public currentCheckpoint: number;

  public treasuryWallet: string;

  public features: Features;

  public shareholders: Shareholders;

  public dividends: Dividends;

  public issuance: Issuance;

  public permissions: Permissions;

  public controller: Controller;

  public transfers: Transfers;

  public documents: Documents;

  constructor(params: Params & UniqueIdentifiers, context: Context) {
    super();

    const {
      symbol,
      name,
      address,
      owner,
      tokenDetails,
      version,
      granularity,
      currentCheckpoint,
      totalSupply,
      treasuryWallet,
    } = params;

    this.symbol = symbol;
    this.name = name;
    this.owner = owner;
    this.address = address;
    this.tokenDetails = tokenDetails;
    this.version = version;
    this.granularity = granularity;
    this.totalSupply = totalSupply;
    this.currentCheckpoint = currentCheckpoint;
    this.treasuryWallet = treasuryWallet;
    this.uid = SecurityToken.generateId({ symbol });
    this.features = new Features(this, context);
    this.shareholders = new Shareholders(this, context);
    this.dividends = new Dividends(this, context);
    this.issuance = new Issuance(this, context);
    this.permissions = new Permissions(this, context);
    this.transfers = new Transfers(this, context);
    this.documents = new Documents(this, context);
    this.controller = new Controller(this, context);
  }

  public toPojo() {
    const {
      uid,
      symbol,
      name,
      address,
      owner,
      tokenDetails,
      version,
      granularity,
      currentCheckpoint,
      totalSupply,
      treasuryWallet,
    } = this;

    return {
      uid,
      symbol,
      name,
      address,
      owner,
      tokenDetails,
      version,
      granularity,
      currentCheckpoint,
      totalSupply,
      treasuryWallet,
    };
  }

  public _refresh(params: Partial<Params>) {
    const {
      name,
      address,
      owner,
      tokenDetails,
      version,
      granularity,
      currentCheckpoint,
      totalSupply,
      treasuryWallet,
    } = params;

    if (name) {
      this.name = name;
    }
    if (address) {
      this.address = address;
    }
    if (owner) {
      this.owner = owner;
    }
    if (tokenDetails) {
      this.tokenDetails = tokenDetails;
    }
    if (version) {
      this.version = version;
    }
    if (granularity) {
      this.granularity = granularity;
    }
    if (currentCheckpoint) {
      this.currentCheckpoint = currentCheckpoint;
    }
    if (totalSupply) {
      this.totalSupply = totalSupply;
    }
    if (treasuryWallet) {
      this.treasuryWallet = treasuryWallet;
    }
  }
}
