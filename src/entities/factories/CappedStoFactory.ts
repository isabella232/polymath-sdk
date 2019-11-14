import {
  ModuleName,
  BlockParamLiteral,
  conversionUtils,
  FULL_DECIMALS,
  CappedSTOEvents,
  isCappedSTO_3_1_0,
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
    const {
      context: { contractWrappers, factories },
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

    const [
      isPaused,
      capReached,
      beneficialInvestmentsAllowed,
      raisedFundsWallet,
      unsoldTokensWallet,
      {
        fundsRaised,
        investorCount,
        totalTokensSold,
        isRaisedInPoly,
        startTime,
        endTime,
        ...details
      },
    ] = await Promise.all([
      module.paused(),
      module.capReached(),
      module.allowBeneficialInvestments(),
      module.wallet(),
      contractWrappers.getTreasuryWallet({ module }),
      module.getSTODetails(),
    ]);

    let preMintAllowed = false;
    let isFinalized = capReached || endTime <= new Date();

    if (isCappedSTO_3_1_0(module)) {
      [preMintAllowed, isFinalized] = await Promise.all([
        module.preMintAllowed(),
        module.isFinalized(),
      ]);
    }

    const stoId = CappedSto.generateId({
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

    return {
      currencies: isRaisedInPoly ? [Currency.POLY] : [Currency.ETH],
      raisedFundsWallet,
      unsoldTokensWallet,
      raisedAmount: fundsRaised,
      soldTokensAmount: totalTokensSold,
      investorAmount: investorCount,
      startDate: startTime,
      endDate: endTime,
      ...details,
      securityTokenId,
      securityTokenSymbol: symbol,
      investments: investmentEntities,
      stoType,
      address,
      isPaused,
      capReached,
      isFinalized,
      preMintAllowed,
      beneficialInvestmentsAllowed,
    };
  };

  constructor(context: Context) {
    super(CappedSto, context);
  }
}
