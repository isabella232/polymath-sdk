import {
  BigNumber,
  ModuleName,
  CappedSTOEvents,
  BlockParamLiteral,
  conversionUtils,
  FULL_DECIMALS,
  USDTieredSTOEvents,
} from '@polymathnetwork/contract-wrappers';
import { zipWith } from 'lodash';
import { SubModule } from './SubModule';
import { CappedStoCurrency, StoTier, Currency, StoType, ErrorCode } from '../../types';
import { LaunchCappedSto, LaunchUsdTieredSto } from '../../procedures';
import { PolymathError } from '../../PolymathError';
import { CappedSto } from '../CappedSto';
import { Investment } from '../Investment';
import { UsdTieredSto } from '../UsdTieredSto';

const { weiToValue } = conversionUtils;

export class Offerings extends SubModule {
  /**
   * Launch a Capped STO
   *
   * @param startDate date when the STO should start
   * @param endDate date when the STO should end
   * @param tokensOnSale amount of tokens to be sold
   * @param rate amount of tokens an investor can purchase per unit of currency spent
   * @param currency currency in which the funds will be raised (ETH or POLY)
   * @param storageWallet wallet address that will receive the funds that are being raised
   *
   */
  public launchCappedSto = async (args: {
    startDate: Date;
    endDate: Date;
    tokensOnSale: BigNumber;
    rate: BigNumber;
    currency: CappedStoCurrency;
    storageWallet: string;
  }) => {
    const { symbol } = this.securityToken;
    const procedure = new LaunchCappedSto(
      {
        symbol,
        ...args,
      },
      this.context
    );
    return await procedure.prepare();
  };

  /**
   * Launch a USD Tiered STO
   *
   * @param startDate date when the STO should start
   * @param endDate date when the STO should end
   * @param tiers tier information
   * @param tiers[].tokensOnSale amount of tokens to be sold on that tier
   * @param tiers[].price price of each token on that tier in USD
   * @param tiers[].tokensWithDiscount amount of tokens to be sold on that tier at a discount if paid in POLY (must be less than tokensOnSale, defaults to 0)
   * @param tiers[].discountedPrice price of discounted tokens on that tier (defaults to 0)
   * @param nonAccreditedInvestmentLimit maximum investment for non-accredited investors
   * @param minimumInvestment minimum investment amount
   * @param currencies array of currencies in which the funds will be raised (ETH, POLY, StableCoin)
   * @param storageWallet wallet address that will receive the funds that are being raised
   * @param treasuryWallet wallet address that will receive unsold tokens when the end date is reached
   * @param usdTokenAddresses array of USD stable coins that the offering supports
   *
   */
  public launchUsdTieredSto = async (args: {
    startDate: Date;
    endDate: Date;
    tiers: StoTier[];
    nonAccreditedInvestmentLimit: BigNumber;
    minimumInvestment: BigNumber;
    currencies: Currency[];
    storageWallet: string;
    treasuryWallet: string;
    usdTokenAddresses: string[];
  }) => {
    const { symbol } = this.securityToken;
    const procedure = new LaunchUsdTieredSto(
      {
        symbol,
        ...args,
      },
      this.context
    );
    return await procedure.prepare();
  };

  /**
   * Retrieve all STOs attached to a security token
   *
   * @param stoTypes array of types of STOs to fetch (optional, defaults to both)
   */
  public getStos = async (
    opts: {
      stoTypes: StoType[];
    } = {
      stoTypes: [StoType.Capped, StoType.UsdTiered],
    }
  ) => {
    const { contractWrappers } = this.context;

    const { symbol: securityTokenSymbol, uid: securityTokenId } = this.securityToken;

    const constructorData = {
      securityTokenSymbol,
      securityTokenId,
    };

    const { stoTypes } = opts;

    const stos = [];

    for (const stoType of stoTypes) {
      let fetchedModules;
      if (stoType === StoType.Capped) {
        fetchedModules = await contractWrappers.getAttachedModules(
          { symbol: securityTokenSymbol, moduleName: ModuleName.CappedSTO },
          { unarchived: true }
        );

        for (const module of fetchedModules) {
          const {
            fundsRaised,
            investorCount,
            totalTokensSold,
            isRaisedInPoly,
            ...details
          } = await module.getSTODetails();
          const tokenPurchases = await module.getLogsAsync({
            eventName: CappedSTOEvents.TokenPurchase,
            blockRange: {
              fromBlock: BlockParamLiteral.Earliest,
              toBlock: BlockParamLiteral.Latest,
            },
            indexFilterValues: {},
          });
          const investments = tokenPurchases.map(
            ({ args: { beneficiary, amount, value } }, index) => ({
              address: beneficiary,
              tokenAmount: weiToValue(amount, FULL_DECIMALS),
              investedFunds: weiToValue(value, FULL_DECIMALS),
              index,
            })
          );
          const address = await module.address();
          const paused = await module.paused();
          const capReached = await module.capReached();
          const stoId = CappedSto.generateId({
            securityTokenId,
            stoType,
            address,
          });
          const investmentEntities = investments.map(
            investment => new Investment({ ...investment, ...constructorData, stoId })
          );

          stos.push(
            new CappedSto(
              {
                fundraiseTypes: isRaisedInPoly ? [Currency.POLY] : [Currency.ETH],
                raisedAmount: fundsRaised,
                soldTokensAmount: totalTokensSold,
                investorAmount: investorCount,
                ...details,
                ...constructorData,
                investments: investmentEntities,
                stoType,
                address,
                paused,
                capReached,
              },
              this.context
            )
          );
        }
      } else if (stoType === StoType.UsdTiered) {
        fetchedModules = await contractWrappers.getAttachedModules(
          { symbol: securityTokenSymbol, moduleName: ModuleName.UsdTieredSTO },
          { unarchived: true }
        );

        for (const module of fetchedModules) {
          const {
            tokensSold,
            capPerTier,
            ratePerTier,
            fundsRaised,
            investorCount,
            isRaisedInETH,
            isRaisedInPOLY,
            isRaisedInSC,
            ...details
          } = await module.getSTODetails();
          const tokenPurchases = await module.getLogsAsync({
            eventName: USDTieredSTOEvents.TokenPurchase,
            blockRange: {
              fromBlock: BlockParamLiteral.Earliest,
              toBlock: BlockParamLiteral.Latest,
            },
            indexFilterValues: {},
          });
          const investments = tokenPurchases.map(
            ({ args: { _usdAmount, _beneficiary, _tokens } }, index) => ({
              address: _beneficiary,
              tokenAmount: weiToValue(_tokens, FULL_DECIMALS),
              investedFunds: weiToValue(_usdAmount, FULL_DECIMALS),
              index,
            })
          );
          const address = await module.address();
          const paused = await module.paused();
          const capReached = await module.capReached();
          const stoId = UsdTieredSto.generateId({
            securityTokenId,
            stoType,
            address,
          });
          const investmentEntities = investments.map(
            investment => new Investment({ ...investment, ...constructorData, stoId })
          );

          const tiers = zipWith(capPerTier, ratePerTier, (cap, rate) => ({ cap, rate }));

          const fundraiseTypes = [];

          if (isRaisedInETH) {
            fundraiseTypes.push(Currency.ETH);
          }

          if (isRaisedInPOLY) {
            fundraiseTypes.push(Currency.POLY);
          }

          if (isRaisedInSC) {
            fundraiseTypes.push(Currency.StableCoin);
          }

          stos.push(
            new UsdTieredSto(
              {
                fundraiseTypes,
                raisedAmount: fundsRaised,
                investorAmount: investorCount,
                soldTokensAmount: tokensSold,
                ...details,
                ...constructorData,
                tiers,
                investments: investmentEntities,
                stoType,
                address,
                paused,
                capReached,
              },
              this.context
            )
          );
        }
      } else {
        throw new PolymathError({
          message: `Invalid STO type ${stoType} requested.`,
          code: ErrorCode.FetcherValidationError,
        });
      }
    }

    return stos;
  };
}
