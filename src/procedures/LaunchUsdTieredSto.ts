import {
  ModuleName,
  BigNumber,
  FundRaiseType,
  SecurityTokenEvents_3_0_0,
} from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
  LaunchUsdTieredStoProcedureArgs,
  StoType,
} from '../types';
import { PolymathError } from '../PolymathError';
import { TransferErc20 } from './TransferErc20';
import { findEvents } from '../utils';
import { SecurityToken, UsdTieredSto } from '../entities';

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

export class LaunchUsdTieredSto extends Procedure<LaunchUsdTieredStoProcedureArgs, UsdTieredSto> {
  public type = ProcedureType.LaunchUsdTieredSto;

  public async prepareTransactions() {
    const { args, context } = this;
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
    } = args;
    const {
      contractWrappers,
      factories: { usdTieredStoFactory },
    } = context;

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
    let usdCost: BigNumber | null = null;
    const [polyCost, isCostInPoly, cost] = await Promise.all([
      moduleFactory.setupCostInPoly(),
      moduleFactory.isCostInPoly(),
      moduleFactory.setupCost(),
    ]);

    if (!isCostInPoly) {
      usdCost = cost;
    }

    await this.addProcedure(TransferErc20)({
      receiver: securityTokenAddress,
      amount: polyCost,
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

    const newSto = await this.addTransaction<AddUSDTieredSTOParams, UsdTieredSto>(
      securityToken.addModuleWithLabel,
      {
        tag: PolyTransactionTag.EnableUsdTieredSto,
        fees: {
          usd: usdCost,
          poly: polyCost,
        },
        resolver: async receipt => {
          const { logs } = receipt;

          const [event] = findEvents({
            eventName: SecurityTokenEvents_3_0_0.ModuleAdded,
            logs,
          });

          if (event) {
            const { args: eventArgs } = event;

            const { _module } = eventArgs;

            return usdTieredStoFactory.fetch(
              UsdTieredSto.generateId({
                securityTokenId: SecurityToken.generateId({ symbol }),
                stoType: StoType.UsdTiered,
                address: _module,
              })
            );
          }
          throw new PolymathError({
            code: ErrorCode.UnexpectedEventLogs,
            message:
              "The USD Tiered STO was successfully launched but the corresponding event wasn't fired. Please report this issue to the Polymath team.",
          });
        },
      }
    )({
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

    return newSto;
  }
}
