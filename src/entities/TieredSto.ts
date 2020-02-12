/**
 * @packageDocumentation
 * @module Entities
 */

import {
  BigNumber,
  ModuleName,
  USDTieredSTOEvents,
  BlockParamLiteral,
  FULL_DECIMALS,
  conversionUtils,
  FundRaiseType,
  isUSDTieredSTO_3_1_0,
} from '@polymathnetwork/contract-wrappers';
import { serialize } from '../utils';
import { Sto, UniqueIdentifiers, Params as StoParams } from './Sto';
import { Context } from '../base/Context';
import { StoTier, Currency, InvestInTieredStoProcedureArgs, CustomCurrency } from '../types';
import { ModifyTieredStoData, InvestInTieredSto } from '../procedures';
import { TransactionQueue } from './TransactionQueue';
import { Investment } from './Investment';

const { weiToValue } = conversionUtils;

export { UniqueIdentifiers };

export interface Tier {
  /**
   * total number of tokens that are available in the tier
   */
  tokensOnSale: BigNumber;
  /**
   * total number of tokens that have been sold
   */
  tokensSold: BigNumber;
  /**
   * price at which tokens will be sold within the tier
   */
  price: BigNumber;
  /**
   * total number of tokens that are available to be sold at a discount when paid in POLY
   */
  tokensWithDiscount: BigNumber;
  /**
   * total number of tokens that have been sold at a discount
   */
  tokensSoldAtDiscount: BigNumber;
  /**
   * discounted price at which tokens will be sold
   */
  discountedPrice: BigNumber;
}

/**
 * Represents a Tiered STO
 */
export interface Params extends StoParams {
  /**
   * numerical identifier for the current tier index
   */
  currentTier: number;
  /**
   * array of tier information
   */
  tiers: Tier[];
  nonAccreditedInvestmentLimit: BigNumber;
  minimumInvestment: BigNumber;
  stableCoinAddresses: string[];
}

/**
 * @hidden
 */
interface BaseInvestParams {
  /**
   * minimum amount of tokens that will be sold in the sto
   */
  minTokens: BigNumber;
  /**
   * amount of tokens that will be sold in the sto
   */
  amount: BigNumber;
  /**
   * currency type that will be used to raise funds in the sto
   */
  currency: Currency;
  /**
   * optional beneficiary address to send beneficial investments to
   */
  beneficiary?: string;
}

/**
 * @hidden
 */
interface InvestInStableCoinParams extends BaseInvestParams {
  /**
   * currency to raise in stable coin
   */
  currency: Currency.StableCoin;
  /**
   * ethereum address for the stable coin in which funds will be raised
   */
  stableCoinAddress: string;
}

/**
 * @hidden
 */
interface InvestInOtherParams extends BaseInvestParams {
  currency: Currency.ETH | Currency.POLY;
  stableCoinAddress?: undefined;
}

/**
 * Used to manage a tiered sto
 */
export class TieredSto extends Sto<Params> {
  /**
   * Generate the Tiered STO's UUID from its identifying properties
   */
  public static generateId({ securityTokenId, stoType, address }: UniqueIdentifiers) {
    return serialize('tieredSto', {
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
   * index of the current active tier
   */
  public currentTier: number;

  /**
   * maximum investment allowed for non-accredited investors
   */
  public nonAccreditedInvestmentLimit: BigNumber;

  public minimumInvestment: BigNumber;

  /**
   * array of Stable Coin ERC20 tokens that can be used to purchase tokens in this Offering
   */
  public stableCoinAddresses: string[];

  /**
   * array of tier information
   */
  public tiers: Tier[];

  /**
   * Create a new tiered sto instance
   */
  constructor(params: Params & UniqueIdentifiers, context: Context) {
    const {
      currentTier,
      tiers,
      nonAccreditedInvestmentLimit,
      minimumInvestment,
      stableCoinAddresses,
      ...rest
    } = params;

    super(rest, context);

    const { securityTokenId, address, stoType } = rest;

    this.nonAccreditedInvestmentLimit = nonAccreditedInvestmentLimit;
    this.minimumInvestment = minimumInvestment;
    this.stableCoinAddresses = stableCoinAddresses;
    this.currentTier = currentTier;
    this.tiers = tiers;
    this.uid = TieredSto.generateId({ address, stoType, securityTokenId });
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
      name: ModuleName.UsdTieredSTO,
      address,
    });

    const tokenPurchases = await module.getLogsAsync({
      eventName: USDTieredSTOEvents.TokenPurchase,
      blockRange: {
        fromBlock: BlockParamLiteral.Earliest,
        toBlock: BlockParamLiteral.Latest,
      },
      indexFilterValues: {},
    });
    const investments = tokenPurchases.map(
      ({ args: { _beneficiary, _usdAmount, _tokens } }, index) => ({
        address: _beneficiary,
        tokenAmount: weiToValue(_tokens, FULL_DECIMALS),
        investedFunds: weiToValue(_usdAmount, FULL_DECIMALS),
        index,
      })
    );

    const investmentEntities = investments.map(({ index, ...investment }) =>
      factories.investmentFactory.create(Investment.generateId({ securityTokenId, stoId, index }), {
        securityTokenSymbol: symbol,
        ...investment,
      })
    );

    return investmentEntities;
  }

  /**
   * Retrieve the denomination in which the tokens are priced in this STO
   */
  public async getCurrency(): Promise<CustomCurrency> {
    const {
      context: {
        contractWrappers: { moduleFactory, polymathRegistry },
      },
      address,
    } = this;

    const module = await moduleFactory.getModuleInstance({
      name: ModuleName.UsdTieredSTO,
      address,
    });

    let ethOracleAddress: string;
    let polyOracleAddress: string;
    let currencySymbol: string;
    if (isUSDTieredSTO_3_1_0(module)) {
      [ethOracleAddress, polyOracleAddress, currencySymbol] = await Promise.all([
        module.getCustomOracleAddress({ fundRaiseType: FundRaiseType.ETH }),
        module.getCustomOracleAddress({ fundRaiseType: FundRaiseType.POLY }),
        module.denominatedCurrency(),
      ]);
    } else {
      // this has to be done this way because the 3.0.0 USDTieredSTO does not expose a getter for the oracles
      [ethOracleAddress, polyOracleAddress] = await Promise.all([
        polymathRegistry.getEthUsdOracleAddress(),
        polymathRegistry.getPolyUsdOracleAddress(),
      ]);
      currencySymbol = 'USD';
    }

    return {
      ethOracleAddress,
      polyOracleAddress,
      currencySymbol,
    };
  }

  /**
   * Modify STO parameters. Must be done before the STO starts
   *
   * @param args.startDate - date when the STO should start
   * @param args.endDate - date when the STO should end
   * @param args.tiers - tier information
   * @param args.nonAccreditedInvestmentLimit - maximum investment for non-accredited investors
   * @param args.minimumInvestment - minimum investment amount
   * @param args.fundraiseCurrencies - array of currencies in which the funds will be raised (ETH, POLY, StableCoin)
   * @param args.raisedFundsWallet - wallet address that will receive the funds that are being raised
   * @param args.unsoldTokensWallet - wallet address that will receive unsold tokens when the end date is reached
   * @param args.stableCoinAddresses - addresses of supported stablecoins
   * @param args.customCurrency - custom currency data. Allows the STO to raise funds pegged to a different currency. Optional, defaults to USD
   */
  public async modifyData(args: {
    startDate?: Date;
    endDate?: Date;
    tiers?: StoTier[];
    nonAccreditedInvestmentLimit?: BigNumber;
    minimumInvestment?: BigNumber;
    fundariseCurrencies?: Currency[];
    raisedFundsWallet?: string;
    unsoldTokensWallet?: string;
    stableCoinAddresses?: string[];
    customCurrency?: Partial<CustomCurrency>;
  }) {
    const { address: stoAddress, securityTokenSymbol: symbol } = this;

    const procedure = new ModifyTieredStoData({ stoAddress, symbol, ...args }, this.context);

    return procedure.prepare();
  }

  public invest(
    params: InvestInStableCoinParams
  ): Promise<TransactionQueue<InvestInTieredStoProcedureArgs>>;

  /* eslint-disable no-dupe-class-members */
  public invest(
    params: InvestInOtherParams
  ): Promise<TransactionQueue<InvestInTieredStoProcedureArgs>>;

  /**
   * Invest in the STO
   *
   * @param args.minTokens - sets a minimum amount of tokens to buy. If the amount sent yields less tokens at the current price, the transaction will revert
   * @param args.amount - amount to spend
   * @param args.currency - currency in which to buy the tokens
   * @param args.stableCoinAddress - address of the stable coin in which to pay (only applicable if currency is StableCoin)
   * @param args.beneficiary - address that will receive the purchased tokens (defaults to current wallet, will fail if beneficial investments are not allowed for the STO)
   */
  public async invest(args: {
    minTokens: BigNumber;
    amount: BigNumber;
    currency: Currency;
    stableCoinAddress?: string;
    beneficiary?: string;
  }): Promise<any> {
    const { address: stoAddress, securityTokenSymbol: symbol } = this;

    const procedure = new InvestInTieredSto(
      { stoAddress, symbol, ...(args as InvestInTieredStoProcedureArgs) },
      this.context
    );

    return procedure.prepare();
  }
  /* eslint-enable no-dupe-class-members */

  /**
   * Convert entity to a POJO (Plain Old Javascript Object)
   */
  public toPojo() {
    const stoPojo = super.toPojo();
    const { currentTier, tiers } = this;

    return {
      ...stoPojo,
      currentTier,
      tiers,
    };
  }

  /**
   * Hydrate the entity
   */
  public _refresh(params: Partial<Params>) {
    const { currentTier, tiers, ...rest } = params;

    if (currentTier) {
      this.currentTier = currentTier;
    }

    if (tiers) {
      this.tiers = tiers;
    }

    super._refresh(rest);
  }
}
