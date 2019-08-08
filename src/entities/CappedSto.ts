import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { serialize } from '../utils';
import { Sto, UniqueIdentifiers, Params as StoParams } from './Sto';
import { Context } from '../Context';

interface Params extends StoParams {
  cap: BigNumber;
  rate: BigNumber;
}

export class CappedSto extends Sto {
  public static generateId({ securityTokenId, stoType, address }: UniqueIdentifiers) {
    return serialize('cappedSto', {
      securityTokenId,
      stoType,
      address,
    });
  }

  public uid: string;

  public cap: BigNumber;

  public rate: BigNumber;

  constructor(params: Params, context: Context) {
    const { cap, rate, ...rest } = params;

    super(rest, context);

    const { securityTokenId, address, stoType } = rest;

    this.cap = cap;
    this.rate = rate;
    this.uid = CappedSto.generateId({ address, stoType, securityTokenId });
  }

  public toPojo() {
    const stoPojo = super.toPojo();
    const { cap, rate } = this;

    return {
      ...stoPojo,
      cap,
      rate,
    };
  }
}
