import { TransactionObject } from 'web3/eth/types';
import { GeneralPermissionManagerAbi } from './abis/GeneralPermissionManagerAbi';
import { Contract } from './Contract';
import { Context } from './LowLevel';
import { isAddress, getOptions } from './utils';

import { GenericContract } from './types';
import { PolymathError } from '~/PolymathError';
import { ErrorCodes } from '~/types';

interface GeneralPermissionManagerContract extends GenericContract {
  methods: {
    addDelegate: (delegate: string, details: string) => TransactionObject<void>;
    changePermission: (
      delegate: string,
      module: string,
      perm: string,
      valid: boolean
    ) => TransactionObject<void>;
  };
}

export class GeneralPermissionManager extends Contract<GeneralPermissionManagerContract> {
  constructor({ address, context }: { address: string; context: Context }) {
    super({
      address,
      abi: GeneralPermissionManagerAbi.abi,
      context,
    });
  }

  public addDelegate = async (delegate: string, details: string) => {
    if (!isAddress(delegate))
      throw new PolymathError({
        code: ErrorCodes.InvalidAddress,
        message: `Delegate address is invalid: $delegate = ${delegate}`,
      });

    const method = this.contract.methods.addDelegate(delegate, details);
    const options = await getOptions(method, { from: this.context.account });
    return () => method.send(options);
  };

  public changePermission = async (
    delegate: string,
    module: string,
    perm: string,
    valid: boolean
  ) => {
    if (!isAddress(delegate))
      throw new PolymathError({
        code: ErrorCodes.InvalidAddress,
        message: `Delegate address is invalid: $delegate = ${delegate}`,
      });

    const method = this.contract.methods.changePermission(delegate, module, perm, valid);
    const options = await getOptions(method, { from: this.context.account });
    return () => method.send(options);
  };
}
