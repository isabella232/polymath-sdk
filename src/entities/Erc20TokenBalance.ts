import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { Entity } from './Entity';
import { serialize, unserialize } from '../utils';
import { PolymathError } from '../PolymathError';
import { ErrorCode } from '../types';

/**
 * Unique properties to identify an erc20 token holder
 */
export interface UniqueIdentifiers {
  tokenAddress: string;
  walletAddress: string;
}

function isUniqueIdentifiers(identifiers: any): identifiers is UniqueIdentifiers {
  const { tokenAddress, walletAddress } = identifiers;

  return typeof tokenAddress === 'string' && typeof walletAddress === 'string';
}

/**
 * Unique properties including information for an erc20 token holders balance
 */
export interface Params {
  tokenSymbol: string | null;
  balance: BigNumber;
}

/**
 * Used to manage erc20 token holder balances
 */
export class Erc20TokenBalance extends Entity<Params> {
  public static generateId({ tokenAddress, walletAddress }: UniqueIdentifiers) {
    return serialize('erc20TokenBalance', {
      tokenAddress,
      walletAddress,
    });
  }

  /**
   * Unserialize a serialized erc20 token balance
   *
   * @param serialized string with erc20 token balance entity information
   */
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

  /**
   * Unique generated identifier for an ERC20 token balance
   */
  public uid: string;

  public tokenSymbol: string | null;

  /**
   * Address of the security token
   */
  public tokenAddress: string;

  /**
   * Wallet address of the token holder
   */
  public walletAddress: string;

  /**
   * Total number of tokens belonging to token holder
   */
  public balance: BigNumber;

  /**
   * Create an entity instance with erc20 token holder balance
   */
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

  /**
   * Convert entity to a POJO (Plain Old Javascript Object)
   */
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

  /**
   * Hydrate the entity
   */
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
