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

interface BaseParams {
  amount: BigNumber;
  currency: Currency;
}

interface InvestInEthParams extends BaseParams {
  currency: Currency.ETH;
  beneficiary?: string;
}

interface InvestInPolyParams extends BaseParams {
  currency: Currency.POLY;
  beneficiary?: undefined;
}

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

  public invest(
    params: InvestInEthParams
  ): Promise<TransactionQueue<InvestInCappedStoProcedureArgs>>;

  public invest(
    params: InvestInPolyParams
  ): Promise<TransactionQueue<InvestInCappedStoProcedureArgs>>;

  /**
   * Invests in the STO
   *
   * @param amount amount to spend
   * @param currency currency in which to buy the tokens (ETH or POLY)
   * @param beneficiary address that will receive the purchased tokens (defaults to current wallet, will fail if beneficial investments are not allowed for the STO, only applicable if currency is ETH)
   */
  public async invest(args: {
    amount: BigNumber;
    currency: Currency.ETH | Currency.POLY;
    beneficiary?: string;
  }): Promise<any> {
    const { address: stoAddress, securityTokenSymbol: symbol } = this;

    const procedure = new InvestInCappedSto(
      { stoAddress, symbol, ...(args as InvestInCappedStoProcedureArgs) },
      this.context
    );

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
