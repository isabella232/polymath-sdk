import { BigNumber, ContractWrapper } from '@polymathnetwork/contract-wrappers';
import { Entity } from './Entity';
import { serialize, unserialize } from '../utils';
import { PolymathError } from '../PolymathError';
import { ErrorCode } from '../types';
import { Context } from '../Context';
import { PolymathBase } from '../PolymathBase';

export interface UniqueIdentifier {
  address: string;
}

function isUniqueIdentifier(identifier: any): identifier is UniqueIdentifier {
  const { address } = identifier;

  return typeof address === 'string';
}

export interface Params extends UniqueIdentifier {}

export class Wallet extends Entity<Params> {
  public static generateId({ address }: UniqueIdentifier) {
    return serialize('wallet', {
      address,
    });
  }

  public static unserialize(serialized: string) {
    const unserialized = unserialize(serialized);

    if (!isUniqueIdentifier(unserialized)) {
      throw new PolymathError({
        code: ErrorCode.InvalidUuid,
        message: 'Wrong Wallet ID format.',
      });
    }

    return unserialized;
  }

  public uid: string;

  public address: string;

  private contractWrappers: PolymathBase;

  constructor(params: Params & UniqueIdentifier, context: Context) {
    super();

    const { address } = params;
    const { contractWrappers } = context;

    this.address = address;
    this.contractWrappers = contractWrappers;
    this.uid = Wallet.generateId({
      address,
    });
  }

  public toPojo() {
    const { uid, address } = this;

    return {
      uid,
      address,
    };
  }

  public _refresh(params: Partial<Params>) {
    const { address } = params;

    if (address) {
      this.address = address;
    }
  }

  public getPolyBalance = async (): Promise<BigNumber> => {
    const { address } = this;
    return await this.contractWrappers.getBalance({ address });
  };

  public getEthBalance = async (): Promise<BigNumber> => {
    return await this.contractWrappers.polyToken.balanceOf();
  };

  public getErc20Balance = async (tokenAddress: string): Promise<BigNumber> => {
    const erc20Wrapper = await this.contractWrappers.getERC20TokenWrapper({
      address: tokenAddress,
    });

    const { address } = this;
    return await erc20Wrapper.balanceOf({ owner: address });
  };
}
