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
import { InvestInSimpleSto } from '../procedures';
import { Investment } from './Investment';

const { weiToValue } = conversionUtils;

/**
 * Properties that uniquely identify a simple sto
 */
export interface Params extends StoParams {
  /**
   * cap for how many tokens can be sold
   */
  cap: BigNumber;
  /**
   * rate at which tokens will be sold
   */
  rate: BigNumber;
}

export { UniqueIdentifiers };

/**
 * Class used to manage a simple sto
 */
export class SimpleSto extends Sto<Params> {
  /**
   * Generate the Simple STO's UUID from its identifying properties
   */
  public static generateId({ securityTokenId, stoType, address }: UniqueIdentifiers) {
    return serialize('simpleSto', {
      securityTokenId,
      stoType,
      address,
    });
  }

  /**
   * unique generated Tiered STO id
   */
  public uid: string;

  /**
   * cap of total tokens that can be sold in sto
   */
  public cap: BigNumber;

  /**
   * rate at which the tokens will be sold in sto
   */
  public rate: BigNumber;

  /**
   * Create a new simple sto instance
   */
  constructor(params: Params & UniqueIdentifiers, context: Context) {
    const { cap, rate, ...rest } = params;

    super(rest, context);

    const { securityTokenId, address, stoType } = rest;

    this.cap = cap;
    this.rate = rate;
    this.uid = SimpleSto.generateId({ address, stoType, securityTokenId });
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
   * Invest in the STO
   *
   * @param args.amount - amount to spend
   * @param args.beneficiary - address that will receive the purchased tokens (defaults to current wallet, will fail if beneficial investments are not allowed for the STO, only applicable if the STO currency is ETH)
   */
  public async invest(args: { amount: BigNumber; beneficiary?: string }) {
    const { address: stoAddress, securityTokenSymbol: symbol } = this;

    const procedure = new InvestInSimpleSto({ stoAddress, symbol, ...args }, this.context);

    return procedure.prepare();
  }

  /**
   * Convert entity to a POJO (Plain Old Javascript Object)
   */
  public toPojo() {
    const stoPojo = super.toPojo();
    const { cap, rate } = this;

    return {
      ...stoPojo,
      cap,
      rate,
    };
  }

  /**
   * Hydrate the entity
   */
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
