import { ModuleName, isUSDTieredSTO_3_1_0 } from '@polymathnetwork/contract-wrappers';
import { range } from 'lodash';
import { Factory } from './Factory';
import { Context } from '../../Context';
import { Currency } from '../../types';
import { SecurityToken } from '../SecurityToken';
import { TieredSto, Params, UniqueIdentifiers, Tier } from '../TieredSto';

/**
 * Factory generates information for a tiered sto entity
 */
export class TieredStoFactory extends Factory<TieredSto, Params, UniqueIdentifiers> {
  protected generateProperties = async (uid: string) => {
    const { securityTokenId, stoType, address } = TieredSto.unserialize(uid);

    const { symbol } = SecurityToken.unserialize(securityTokenId);
    const {
      context: { contractWrappers },
    } = this;

    const module = await contractWrappers.moduleFactory.getModuleInstance({
      name: ModuleName.UsdTieredSTO,
      address,
    });

    const [
      isPaused,
      capReached,
      isFinalized,
      beneficialInvestmentsAllowed,
      raisedFundsWallet,
      unsoldTokensWallet,
      numberOfTiers,
      {
        tokensSold,
        capPerTier,
        ratePerTier,
        fundsRaised,
        investorCount,
        isRaisedInETH,
        isRaisedInPOLY,
        isRaisedInSC,
        startTime: startDate,
        endTime: endDate,
        ...details
      },
    ] = await Promise.all([
      module.paused(),
      module.capReached(),
      module.isFinalized(),
      module.allowBeneficialInvestments(),
      module.wallet(),
      contractWrappers.getTreasuryWallet({ module }),
      module.getNumberOfTiers(),
      module.getSTODetails(),
    ]);

    let preIssueAllowed = false;
    let tiers: Tier[];
    let rawTiers;

    if (isUSDTieredSTO_3_1_0(module)) {
      [preIssueAllowed, rawTiers] = await Promise.all([
        module.preMintAllowed(),
        Promise.all(range(numberOfTiers).map(tier => module.tiers({ tier }))),
      ]);
      tiers = rawTiers.map(
        ({
          tokenTotal,
          totalTokensSoldInTier,
          rate,
          soldDiscountPoly,
          tokensDiscountPoly,
          rateDiscountPoly,
        }) => ({
          tokensOnSale: tokenTotal,
          tokensSold: totalTokensSoldInTier,
          price: rate,
          tokensWithDiscount: tokensDiscountPoly,
          tokensSoldAtDiscount: soldDiscountPoly,
          discountedPrice: rateDiscountPoly,
        })
      );
    } else {
      rawTiers = await Promise.all(range(numberOfTiers).map(tier => module.tiers({ tier })));
      tiers = rawTiers.map(
        ({
          tokenTotal,
          mintedTotal,
          rate,
          tokensDiscountPoly,
          mintedDiscountPoly,
          rateDiscountPoly,
        }) => ({
          tokensOnSale: tokenTotal,
          tokensSold: mintedTotal,
          price: rate,
          tokensWithDiscount: tokensDiscountPoly,
          tokensSoldAtDiscount: mintedDiscountPoly,
          discountedPrice: rateDiscountPoly,
        })
      );
    }

    const fundraiseCurrencies = [];

    if (isRaisedInETH) {
      fundraiseCurrencies.push(Currency.ETH);
    }

    if (isRaisedInPOLY) {
      fundraiseCurrencies.push(Currency.POLY);
    }

    if (isRaisedInSC) {
      fundraiseCurrencies.push(Currency.StableCoin);
    }

    return {
      fundraiseCurrencies,
      raisedFundsWallet,
      unsoldTokensWallet,
      raisedAmount: fundsRaised,
      investorCount,
      soldTokensAmount: tokensSold,
      startDate,
      endDate,
      ...details,
      securityTokenId,
      securityTokenSymbol: symbol,
      tiers,
      stoType,
      address,
      isPaused,
      capReached,
      isFinalized,
      preIssueAllowed,
      beneficialInvestmentsAllowed,
    };
  };

  /**
   * Creates an instance of the tiered sto factory
   *
   * @param context the context in which sdk will be used
   */
  constructor(context: Context) {
    super(TieredSto, context);
  }
}
