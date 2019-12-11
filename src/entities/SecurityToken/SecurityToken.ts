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
import { PolymathError } from '../../PolymathError';
import { ErrorCode } from '../../types';

export interface UniqueIdentifiers {
  symbol: string;
}

function isUniqueIdentifiers(identifiers: any): identifiers is UniqueIdentifiers {
  const { symbol } = identifiers;

  return typeof symbol === 'string';
}

export interface Params {
  name: string;
  address: string;
  owner: string;
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

  public features: Features;

  public shareholders: Shareholders;

  public dividends: Dividends;

  public issuance: Issuance;

  public permissions: Permissions;

  public transfers: Transfers;

  public documents: Documents;

  constructor(params: Params & UniqueIdentifiers, context: Context) {
    super();

    const { symbol, name, address, owner } = params;

    this.symbol = symbol;
    this.name = name;
    this.owner = owner;
    this.address = address;
    this.uid = SecurityToken.generateId({ symbol });
    this.features = new Features(this, context);
    this.shareholders = new Shareholders(this, context);
    this.dividends = new Dividends(this, context);
    this.issuance = new Issuance(this, context);
    this.permissions = new Permissions(this, context);
    this.transfers = new Transfers(this, context);
    this.documents = new Documents(this, context);
  }

  public toPojo() {
    const { uid, symbol, name, address } = this;

    return { uid, symbol, name, address };
  }

  public _refresh(params: Partial<Params>) {
    const { name, address, owner } = params;

    if (name) {
      this.name = name;
    }
    if (address) {
      this.address = address;
    }
    if (owner) {
      this.owner = owner;
    }
  }
}
