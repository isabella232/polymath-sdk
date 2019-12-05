import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { Entity } from './Entity';
import { serialize, unserialize } from '../utils';
import { PolymathError } from '../PolymathError';
import { ErrorCode } from '../types';

export interface UniqueIdentifiers {
  tokenAddress: string;
  walletAddress: string;
}

function isUniqueIdentifiers(identifiers: any): identifiers is UniqueIdentifiers {
  const { tokenAddress, walletAddress } = identifiers;

  return typeof tokenAddress === 'string' && typeof walletAddress === 'string';
}

export interface Params {
  tokenSymbol: string | null;
  balance: BigNumber;
}

export class Erc20TokenBalance extends Entity<Params> {
  public static generateId({ tokenAddress, walletAddress }: UniqueIdentifiers) {
    return serialize('erc20TokenBalance', {
      tokenAddress,
      walletAddress,
    });
  }

  public static unserialize(serialized: any) {
    const unserialized = unserialize(serialized);

    if (!isUniqueIdentifiers(unserialized)) {
      throw new PolymathError({
        code: ErrorCode.InvalidUuid,
        message: 'Wrong ERC20 Token Balance ID format',
      });
    }

    return unserialized;
  }

  public uid: string;

  public tokenSymbol: string | null;

  public tokenAddress: string;

  public walletAddress: string;

  public balance: BigNumber;

  constructor(params: Params & UniqueIdentifiers) {
    super();

    const { tokenSymbol, tokenAddress, balance, walletAddress } = params;

    this.tokenSymbol = tokenSymbol;
    this.tokenAddress = tokenAddress;
    this.balance = balance;
    this.walletAddress = walletAddress;
    this.uid = Erc20TokenBalance.generateId({
      tokenAddress,
      walletAddress,
    });
  }

  public toPojo() {
    const { uid, tokenSymbol, tokenAddress, balance, walletAddress } = this;

    return {
      uid,
      tokenSymbol,
      tokenAddress,
      balance,
      walletAddress,
    };
  }

  public _refresh(params: Partial<Params>) {
    const { tokenSymbol, balance } = params;

    if (tokenSymbol !== undefined) {
      this.tokenSymbol = tokenSymbol;
    }

    if (balance) {
      this.balance = balance;
    }
  }
}
