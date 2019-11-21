import {
  BigNumber,
  ModuleName,
  CappedSTOEvents,
  BlockParamLiteral,
  conversionUtils,
  FULL_DECIMALS,
} from '@polymathnetwork/contract-wrappers';
import { serialize } from '../utils';
import { Sto, UniqueIdentifiers, Params as StoParams } from './Sto';
import { Context } from '../Context';
import { InvestInCappedStoProcedureArgs, Currency } from '../types';
import { TransactionQueue } from './TransactionQueue';
import { InvestInCappedSto } from '../procedures';
import { Investment } from './Investment';

const { weiToValue } = conversionUtils;

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
   * Retrieve all investments that have been made on this STO
   */
  public async getInvestments(): Promise<Investment[]> {
    const {
      context: { contractWrappers, factories },
      address,
      securityTokenSymbol: symbol,
      securityTokenId,
      uid: stoId,
    } = this;

    const module = await contractWrappers.moduleFactory.getModuleInstance({
      name: ModuleName.CappedSTO,
      address,
    });

    const tokenPurchases = await module.getLogsAsync({
      eventName: CappedSTOEvents.TokenPurchase,
      blockRange: {
        fromBlock: BlockParamLiteral.Earliest,
        toBlock: BlockParamLiteral.Latest,
      },
      indexFilterValues: {},
    });
    const investments = tokenPurchases.map(({ args: { beneficiary, amount, value } }, index) => ({
      address: beneficiary,
      tokenAmount: weiToValue(amount, FULL_DECIMALS),
      investedFunds: weiToValue(value, FULL_DECIMALS),
      index,
    }));

    const investmentEntities = investments.map(({ index, ...investment }) =>
      factories.investmentFactory.create(Investment.generateId({ securityTokenId, stoId, index }), {
        securityTokenSymbol: symbol,
        ...investment,
      })
    );

    return investmentEntities;
  }

  /**
   * Invests in the STO
   *
   * @param amount amount to spend
   * @param beneficiary address that will receive the purchased tokens (defaults to current wallet, will fail if beneficial investments are not allowed for the STO, only applicable if the STO currency is ETH)
   */
  public async invest(args: { amount: BigNumber; beneficiary?: string }) {
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
