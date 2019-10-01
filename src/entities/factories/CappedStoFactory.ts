import {
  ModuleName,
  BlockParamLiteral,
  conversionUtils,
  FULL_DECIMALS,
  CappedSTOEvents_3_0_0,
} from '@polymathnetwork/contract-wrappers';
import { Factory } from './Factory';
import { Context } from '../../Context';
import { Currency } from '../../types';
import { CappedSto, Params, UniqueIdentifiers } from '../CappedSto';
import { SecurityToken } from '../SecurityToken';
import { Investment } from '../Investment';

const { weiToValue } = conversionUtils;

export class CappedStoFactory extends Factory<CappedSto, Params, UniqueIdentifiers> {
  protected generateProperties = async (uid: string) => {
    const { securityTokenId, stoType, address } = CappedSto.unserialize(uid);

    const { symbol } = SecurityToken.unserialize(securityTokenId);

    const module = await this.context.contractWrappers.moduleFactory.getModuleInstance({
      name: ModuleName.CappedSTO,
      address,
    });

    const tokenPurchases = await module.getLogsAsync({
      eventName: CappedSTOEvents_3_0_0.TokenPurchase,
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

    const [
      paused,
      capReached,
      { fundsRaised, investorCount, totalTokensSold, isRaisedInPoly, ...details },
    ] = await Promise.all([module.paused(), module.capReached(), module.getSTODetails()]);

    const stoId = CappedSto.generateId({
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

    return {
      fundraiseTypes: isRaisedInPoly ? [Currency.POLY] : [Currency.ETH],
      raisedAmount: fundsRaised,
      soldTokensAmount: totalTokensSold,
      investorAmount: investorCount,
      ...details,
      securityTokenId,
      securityTokenSymbol: symbol,
      investments: investmentEntities,
      stoType,
      address,
      paused,
      capReached,
    };
  };

  constructor(context: Context) {
    super(CappedSto, context);
  }
}
