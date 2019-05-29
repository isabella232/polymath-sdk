import { TransactionObject } from 'web3/eth/types';
import { GenericContract } from '../types';
import { Context } from '../LowLevel';
import { Contract } from '../Contract';

interface SecurityTokenContract extends GenericContract {
  methods: {
    getVersion(): TransactionObject<number[]>;
  };
}

export default class SecurityToken extends Contract<SecurityTokenContract> {
  constructor({ address, abi, context }: { address: string; abi: any; context: Context }) {
    super({ address, abi, context });
  }

  public getVersion = () => {
    return this.contract.methods.getVersion().call();
  };
}
