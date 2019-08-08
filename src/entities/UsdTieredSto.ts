import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { serialize } from '../utils';
import { Sto, UniqueIdentifiers, Params as StoParams } from './Sto';
import { Context } from '../Context';

export interface Tier {
  cap: BigNumber;
  rate: BigNumber;
}

interface Params extends StoParams {
  currentTier: number;
  tiers: Tier[];
}

export class UsdTieredSto extends Sto {
  public static generateId({ securityTokenId, stoType, address }: UniqueIdentifiers) {
    return serialize('usdTieredSto', {
      securityTokenId,
      stoType,
      address,
    });
  }

  public uid: string;

  public currentTier: number;

  public tiers: Tier[];

  constructor(params: Params, context: Context) {
    const { currentTier, tiers, ...rest } = params;

    super(rest, context);

    const { securityTokenId, address, stoType } = rest;

    this.currentTier = currentTier;
    this.tiers = tiers;
    this.uid = UsdTieredSto.generateId({ address, stoType, securityTokenId });
  }

  public toPojo() {
    const stoPojo = super.toPojo();
    const { currentTier, tiers } = this;

    return {
      ...stoPojo,
      currentTier,
      tiers,
    };
  }
}
