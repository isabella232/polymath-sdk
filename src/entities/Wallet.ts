import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { Entity } from './Entity';
import { serialize, unserialize } from '../utils';
import { PolymathError } from '../PolymathError';
import { ErrorCode } from '../types';
import { Context } from '../Context';

/**
 * Unique identifier for wallet address
 */
export interface UniqueIdentifiers {
  address: string;
}

function isUniqueIdentifiers(identifier: any): identifier is UniqueIdentifiers {
  const { address } = identifier;

  return typeof address === 'string';
}

/**
 * Properties that uniquely identify wallet
 */
export interface Params extends UniqueIdentifiers {}

/**
 * Used to manage a wallet
 */
export class Wallet extends Entity<Params> {
  public static generateId({ address }: UniqueIdentifiers) {
    return serialize('wallet', {
      address,
    });
  }

  /**
   * Unserialize a serialized entity
   *
   * @param serialized string with entity information
   */
  public static unserialize(serialized: string) {
    const unserialized = unserialize(serialized);

    if (!isUniqueIdentifiers(unserialized)) {
      throw new PolymathError({
        code: ErrorCode.InvalidUuid,
        message: 'Wrong Wallet ID format.',
      });
    }

    return unserialized;
  }

  /**
   * Unique generated wallet id
   */
  public uid: string;

  /**
   * Wallet address
   */
  public address: string;

  protected context: Context;

  /**
   * Create a wallet entity
   */
  constructor(params: Params, context: Context) {
    super();

    const { address } = params;

    this.address = address;
    this.context = context;
    this.uid = Wallet.generateId({
      address,
    });
  }

  /**
   * Convert entity to a POJO (Plain Old Javascript Object)
   */
  public toPojo() {
    const { uid, address } = this;

    return {
      uid,
      address,
    };
  }

  /**
   * Hydrate the entity
   */
  public _refresh(params: Partial<Params>) {
    const { address } = params;

    if (address) {
      this.address = address;
    }
  }

  /**
   * Retrieve the POLY balance of this particular wallet address
   */
  public getPolyBalance = async (): Promise<BigNumber> => {
    const { address, context } = this;
    return context.contractWrappers.polyToken.balanceOf({ owner: address });
  };

  /**
   * Retrieve the ETH balance of this particular wallet address
   */
  public getEthBalance = async (): Promise<BigNumber> => {
    const { address, context } = this;
    return context.contractWrappers.getBalance({ address });
  };

  /**
   * Retrieve the ERC20 balance of this particular wallet address
   *
   * @param args.tokenAddress - address of the ERC20 token contract
   */
  public getErc20Balance = async (args: { tokenAddress: string }): Promise<BigNumber> => {
    const { context, address } = this;
    const { tokenAddress } = args;
    const erc20Wrapper = await context.contractWrappers.getERC20TokenWrapper({
      address: tokenAddress,
    });
    return erc20Wrapper.balanceOf({ owner: address });
  };
}
