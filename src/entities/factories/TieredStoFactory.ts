import {
  ModuleName,
  USDTieredSTOEvents,
  BlockParamLiteral,
  conversionUtils,
  FULL_DECIMALS,
} from '@polymathnetwork/contract-wrappers';
import { zipWith } from 'lodash';
import { Factory } from './Factory';
import { Context } from '../../Context';
import { Currency } from '../../types';
import { SecurityToken } from '../SecurityToken';
import { Investment } from '../Investment';
import { TieredSto, Params, UniqueIdentifiers } from '../TieredSto';

const { weiToValue } = conversionUtils;

export class TieredStoFactory extends Factory<TieredSto, Params, UniqueIdentifiers> {
  protected generateProperties = async (uid: string) => {
    const { securityTokenId, stoType, address } = TieredSto.unserialize(uid);

    const { symbol } = SecurityToken.unserialize(securityTokenId);

    const module = await this.context.contractWrappers.moduleFactory.getModuleInstance({
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
    ] = await Promise.all([module.paused(), module.capReached(), module.getSTODetails()]);

    const stoId = TieredSto.generateId({
      securityTokenId,
      stoType,
      address,
    });

    const investmentEntities = investments.map(({ index, ...investment }) =>
      this.context.factories.investmentFactory.create(
        Investment.generateId({ securityTokenId, stoId, index }),
        { securityTokenSymbol: symbol, ...investment }
      )
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

    return {
      fundraiseTypes,
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
    };
  };

  constructor(context: Context) {
    super(TieredSto, context);
  }
}
