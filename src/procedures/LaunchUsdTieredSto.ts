import { ModuleName, BigNumber, FundRaiseType } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
  LaunchUsdTieredStoProcedureArgs,
} from '../types';
import { PolymathError } from '../PolymathError';
import { TransferErc20 } from './TransferErc20';

interface AddUSDTieredSTOParams {
  moduleName: ModuleName.UsdTieredSTO;
  address: string;
  data: {
    startTime: Date;
    endTime: Date;
    ratePerTier: BigNumber[];
    ratePerTierDiscountPoly: BigNumber[];
    tokensPerTierTotal: BigNumber[];
    tokensPerTierDiscountPoly: BigNumber[];
    nonAccreditedLimitUSD: BigNumber;
    minimumInvestmentUSD: BigNumber;
    fundRaiseTypes: FundRaiseType[];
    wallet: string;
    treasuryWallet: string;
    usdTokens: string[];
  };
  archived: boolean;
  label?: string;
}

export class LaunchUsdTieredSto extends Procedure<LaunchUsdTieredStoProcedureArgs> {
  public type = ProcedureType.LaunchUsdTieredSto;

  public async prepareTransactions() {
    const {
      symbol,
      startDate,
      endDate,
      tiers,
      nonAccreditedInvestmentLimit,
      minimumInvestment,
      currencies,
      storageWallet,
      treasuryWallet,
      usdTokenAddresses,
    } = this.args;
    const { contractWrappers } = this.context;

    let securityToken;

    try {
      securityToken = await contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(
        symbol
      );
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    const securityTokenAddress = await securityToken.address();
    const moduleName = ModuleName.UsdTieredSTO;

    const factoryAddress = await contractWrappers.getModuleFactoryAddress({
      tokenAddress: securityTokenAddress,
      moduleName,
    });

    const moduleFactory = await contractWrappers.moduleFactory.getModuleFactory(factoryAddress);
    const cost = await moduleFactory.setupCostInPoly();

    await this.addProcedure(TransferErc20)({
      receiver: securityTokenAddress,
      amount: cost,
    });

    const ratePerTier: BigNumber[] = [];
    const ratePerTierDiscountPoly: BigNumber[] = [];
    const tokensPerTierTotal: BigNumber[] = [];
    const tokensPerTierDiscountPoly: BigNumber[] = [];

    tiers.forEach(
      ({
        tokensOnSale,
        price,
        tokensWithDiscount = new BigNumber(0),
        discountedPrice = new BigNumber(0),
      }) => {
        ratePerTier.push(price);
        ratePerTierDiscountPoly.push(discountedPrice);
        tokensPerTierTotal.push(tokensOnSale);
        tokensPerTierDiscountPoly.push(tokensWithDiscount);
      }
    );

    await this.addTransaction<AddUSDTieredSTOParams>(securityToken.addModuleWithLabel, {
      tag: PolyTransactionTag.EnableCappedSto,
    })({
      moduleName,
      address: factoryAddress,
      data: {
        startTime: startDate,
        endTime: endDate,
        ratePerTier,
        ratePerTierDiscountPoly,
        tokensPerTierTotal,
        tokensPerTierDiscountPoly,
        nonAccreditedLimitUSD: nonAccreditedInvestmentLimit,
        minimumInvestmentUSD: minimumInvestment,
        fundRaiseTypes: currencies,
        wallet: storageWallet,
        treasuryWallet,
        usdTokens: usdTokenAddresses,
      },
      archived: false,
    });
  }
}
