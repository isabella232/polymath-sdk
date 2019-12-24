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
import { Context } from '../Context';
import { StoTier, Currency, InvestInTieredStoProcedureArgs, CustomCurrency } from '../types';
import { ModifyTieredStoData, InvestInTieredSto } from '../procedures';
import { TransactionQueue } from './TransactionQueue';
import { Investment } from './Investment';
import { ZERO_ADDRESS } from '../utils/constants';

const { weiToValue } = conversionUtils;

export { UniqueIdentifiers };

export interface Tier {
  tokensOnSale: BigNumber;
  tokensSold: BigNumber;
  price: BigNumber;
  tokensWithDiscount: BigNumber;
  tokensSoldAtDiscount: BigNumber;
  discountedPrice: BigNumber;
}

export interface Params extends StoParams {
  currentTier: number;
  tiers: Tier[];
  investmentLimit: BigNumber;
  minInvestment: BigNumber;
  usdTokens: string[];
}

interface BaseParams {
  minTokens: BigNumber;
  amount: BigNumber;
  currency: Currency;
  beneficiary?: string;
}

interface InvestInStableCoinParams extends BaseParams {
  currency: Currency.StableCoin;
  stableCoinAddress: string;
}

interface InvestInOtherParams extends BaseParams {
  currency: Currency.ETH | Currency.POLY;
  stableCoinAddress?: undefined;
}

export class TieredSto extends Sto<Params> {
  public static generateId({ securityTokenId, stoType, address }: UniqueIdentifiers) {
    return serialize('tieredSto', {
      securityTokenId,
      stoType,
      address,
    });
  }

  public uid: string;

  public currentTier: number;

  public investmentLimit: BigNumber;

  public minInvestment: BigNumber;

  public usdTokens: string[];

  public tiers: Tier[];

  constructor(params: Params & UniqueIdentifiers, context: Context) {
    const { currentTier, tiers, investmentLimit, minInvestment, usdTokens, ...rest } = params;

    super(rest, context);

    const { securityTokenId, address, stoType } = rest;

    this.investmentLimit = investmentLimit;
    this.minInvestment = minInvestment;
    this.usdTokens = usdTokens;
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
   * @param startDate date when the STO should start
   * @param endDate date when the STO should end
   * @param tiers tier information
   * @param tiers[].tokensOnSale amount of tokens to be sold on that tier
   * @param tiers[].price price of each token on that tier
   * @param tiers[].tokensWithDiscount amount of tokens to be sold on that tier at a discount if paid in POLY (must be less than tokensOnSale, defaults to 0)
   * @param tiers[].discountedPrice price of discounted tokens on that tier (defaults to 0)
   * @param nonAccreditedInvestmentLimit maximum investment for non-accredited investors
   * @param minimumInvestment minimum investment amount
   * @param fundraiseCurrencies array of currencies in which the funds will be raised (ETH, POLY, StableCoin)
   * @param raisedFundsWallet wallet address that will receive the funds that are being raised
   * @param unsoldTokensWallet wallet address that will receive unsold tokens when the end date is reached
   * @param stableCoinAddresses addresses of supported stablecoins
   * @param customCurrency custom currency data. Allows the STO to raise funds pegged to a different currency. Optional, defaults to USD
   * @param customCurrency.currencySymbol symbol of the custom currency (USD, CAD, EUR, etc. Default is USD)
   * @param customCurrency.ethOracleAddress address of the oracle that states the price of ETH in the custom currency. Only required if raising funds in ETH
   * @param customCurrency.polyOracleAddress address of the oracle that states the price of POLY in the custom currency. Only required if raising funds in POLY
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

  public invest(
    params: InvestInOtherParams
  ): Promise<TransactionQueue<InvestInTieredStoProcedureArgs>>;

  /**
   * Invest in the STO
   *
   * @param minTokens sets a minimum amount of tokens to buy. If the amount sent yields less tokens at the current price, the transaction will revert
   * @param amount amount to spend
   * @param currency currency in which to buy the tokens
   * @param stableCoinAddress address of the stable coin in which to pay (only applicable if currency is StableCoin)
   * @param beneficiary address that will receive the purchased tokens (defaults to current wallet, will fail if beneficial investments are not allowed for the STO)
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

  public toPojo() {
    const stoPojo = super.toPojo();
    const { currentTier, tiers } = this;

    return {
      ...stoPojo,
      currentTier,
      tiers,
    };
  }

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
