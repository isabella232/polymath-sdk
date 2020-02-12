/**
 * @packageDocumentation
 * @module Entities.SecurityToken
 */

import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { Context } from '../../base/Context';
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
import { PolymathError } from '../../base/PolymathError';
import { ErrorCode, Version } from '../../types';
import { TransferOwnership } from '../../procedures';

/**
 * Properties that uniquely identify a Security Token
 */
export interface UniqueIdentifiers {
  /**
   * symbol of the security token
   */
  symbol: string;
}

/**
 * Check if the provided value is of type [[UniqueIdentifiers]]
 */
function isUniqueIdentifiers(identifiers: any): identifiers is UniqueIdentifiers {
  const { symbol } = identifiers;

  return typeof symbol === 'string';
}

/**
 * Security Token constructor parameters
 */
export interface Params {
  name: string;
  /**
   * address of the Security Token contract
   */
  address: string;
  /**
   * address that owns the Security Token
   */
  owner: string;
  /**
   * URL pointing to off-chain data associated with the Security Token
   */
  tokenDetails: string;
  version: Version;
  granularity: number;
  totalSupply: BigNumber;
  /**
   * index of the current checkpoint
   */
  currentCheckpoint: number;
  /**
   * default treasury wallet used by some features.
   * ***For example, if an STO reaches its end date (or is finalized before that), remaining unsold tokens get transferred to this wallet unless otherwise specified by the STO itself***
   */
  treasuryWallet: string;
}

/**
 * Unserialize string to a Security Token object representation
 *
 * @param serialized - Security Token's serialized representation
 */
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
  /**
   * Generate the Security Token's UUID from its identifying properties
   */
  public static generateId({ symbol }: UniqueIdentifiers) {
    return serialize('securityToken', {
      symbol,
    });
  }

  public static unserialize = unserialize;

  public uid: string;

  public symbol: string;

  public name: string;

  /**
   * address of the Security Token contract
   */
  public owner: string;

  /**
   * address that owns the Security Token
   */
  public address: string;

  /**
   * URL pointing to off-chain data associated with the Security Token
   */
  public tokenDetails: string;

  public version: Version;

  public granularity: number;

  public totalSupply: BigNumber;

  /**
   * index of the current checkpoint
   */
  public currentCheckpoint: number;

  /**
   * treasury wallet used by some features
   */
  public treasuryWallet: string;

  public features: Features;

  public shareholders: Shareholders;

  public dividends: Dividends;

  public issuance: Issuance;

  public permissions: Permissions;

  public controller: Controller;

  public transfers: Transfers;

  public documents: Documents;

  public context: Context;

  /**
   * Create a new SecurityToken instance
   */
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

    this.context = context;
  }

  /**
   * Transfers ownership of the Security Token to a different wallet address
   *
   * @param args.newOwner - new owner address for the Security Token
   */
  public transferOwnership = async (args: { newOwner: string }) => {
    const procedure = new TransferOwnership(
      {
        symbol: this.symbol,
        ...args,
      },
      this.context
    );
    return procedure.prepare();
  };

  /**
   * Convert entity to a POJO (Plain Old Javascript Object)
   */
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

  /**
   * Hydrate the entity
   */
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
