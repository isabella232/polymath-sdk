import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { serialize } from '../utils';
import { Sto, UniqueIdentifiers, Params as StoParams } from './Sto';
import { Context } from '../Context';
import { InvestInCappedStoProcedureArgs, Currency } from '../types';
import { TransactionQueue } from './TransactionQueue';
import { InvestInCappedSto } from '../procedures';

export interface Params extends StoParams {
  cap: BigNumber;
  rate: BigNumber;
}

export { UniqueIdentifiers };

export class CappedSto extends Sto<Params> {
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

  constructor(params: Params & UniqueIdentifiers, context: Context) {
    const { cap, rate, ...rest } = params;

    super(rest, context);

    const { securityTokenId, address, stoType } = rest;

    this.cap = cap;
    this.rate = rate;
    this.uid = CappedSto.generateId({ address, stoType, securityTokenId });
  }

  /**
   * Invests in the STO
   *
   * @param amount amount to spend
   * @param beneficiary address that will receive the purchased tokens (defaults to current wallet, will fail if beneficial investments are not allowed for the STO, only applicable if the STO currency is ETH)
   */
  public async invest(args: { amount: BigNumber; beneficiary?: string }): Promise<any> {
    const { address: stoAddress, securityTokenSymbol: symbol } = this;

    const procedure = new InvestInCappedSto({ stoAddress, symbol, ...args }, this.context);

    return procedure.prepare();
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

  public _refresh(params: Partial<Params>) {
    const { cap, rate, ...rest } = params;

    if (cap) {
      this.cap = cap;
    }

    if (rate) {
      this.rate = rate;
    }

    super._refresh(rest);
  }
}
