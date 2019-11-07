import {
  ModuleName,
  USDTieredSTOEvents,
  BlockParamLiteral,
  conversionUtils,
  FULL_DECIMALS,
  isUSDTieredSTO_3_1_0,
} from '@polymathnetwork/contract-wrappers';
import { range } from 'lodash';
import { Factory } from './Factory';
import { Context } from '../../Context';
import { Currency } from '../../types';
import { SecurityToken } from '../SecurityToken';
import { Investment } from '../Investment';
import { TieredSto, Params, UniqueIdentifiers, Tier } from '../TieredSto';

const { weiToValue } = conversionUtils;

export class TieredStoFactory extends Factory<TieredSto, Params, UniqueIdentifiers> {
  protected generateProperties = async (uid: string) => {
    const { securityTokenId, stoType, address } = TieredSto.unserialize(uid);

    const { symbol } = SecurityToken.unserialize(securityTokenId);
    const {
      context: { factories, contractWrappers },
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

    const [
      paused,
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

    let preMintAllowed = false;
    let tiers: Tier[];
    let rawTiers;

    if (isUSDTieredSTO_3_1_0(module)) {
      [preMintAllowed, rawTiers] = await Promise.all([
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

    const stoId = TieredSto.generateId({
      securityTokenId,
      stoType,
      address,
    });

    const investmentEntities = investments.map(({ index, ...investment }) =>
      factories.investmentFactory.create(Investment.generateId({ securityTokenId, stoId, index }), {
        securityTokenSymbol: symbol,
        ...investment,
      })
    );

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

    return {
      fundraiseTypes,
      raisedFundsWallet,
      unsoldTokensWallet,
      raisedAmount: fundsRaised,
      investorAmount: investorCount,
      soldTokensAmount: tokensSold,
      ...details,
      securityTokenId,
      securityTokenSymbol: symbol,
      tiers,
      investments: investmentEntities,
      stoType,
      address,
      paused,
      capReached,
      isFinalized,
      preMintAllowed,
      beneficialInvestmentsAllowed,
    };
  };

  constructor(context: Context) {
    super(TieredSto, context);
  }
}
