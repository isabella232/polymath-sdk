import { ModuleName, BigNumber } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  InvestInTieredStoProcedureArgs,
  ErrorCode,
  StoType,
  Currency,
  isInvestWithStableCoinArgs,
} from '../types';
import { PolymathError } from '../PolymathError';
import { isValidAddress } from '../utils';
import { SecurityToken, TieredSto } from '../entities';
import { ApproveErc20 } from './ApproveErc20';

export class InvestInTieredSto extends Procedure<InvestInTieredStoProcedureArgs> {
  public type = ProcedureType.InvestInTieredSto;

  public async prepareTransactions() {
    const { args, context } = this;
    const { stoAddress, symbol, amount, currency, minTokens = new BigNumber(0) } = args;
    let { beneficiary } = args;

    const {
      contractWrappers,
      factories: { tieredStoFactory },
    } = context;

    /**
     * Validation
     */

    try {
      await contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(symbol);
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    if (!isValidAddress(stoAddress)) {
      throw new PolymathError({
        code: ErrorCode.InvalidAddress,
        message: `Invalid STO address ${stoAddress}`,
      });
    }

    const stoModule = await contractWrappers.moduleFactory.getModuleInstance({
      name: ModuleName.UsdTieredSTO,
      address: stoAddress,
    });

    if (!stoModule) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `STO ${stoAddress} is either archived or hasn't been launched`,
      });
    }

    const [
      isFinalized,
      isPaused,
      currentAddress,
      beneficialInvestmentsAllowed,
      startDate,
      canRaiseInEth,
      canRaiseInPoly,
      canRaiseInStableCoin,
    ] = await Promise.all([
      stoModule.isFinalized(),
      stoModule.paused(),
      context.currentWallet.address(),
      stoModule.allowBeneficialInvestments(),
      stoModule.startTime(),
      stoModule.fundRaiseTypes({ type: Currency.ETH }),
      stoModule.fundRaiseTypes({ type: Currency.POLY }),
      stoModule.fundRaiseTypes({ type: Currency.StableCoin }),
    ]);

    if (startDate > new Date()) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `Cannot invest in STO ${stoAddress} because it hasn't started yet`,
      });
    }

    if (isFinalized) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `STO ${stoAddress} has already been finalized`,
      });
    }

    if (isPaused) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `STO ${stoAddress} is paused`,
      });
    }

    if (beneficiary && beneficiary !== currentAddress && !beneficialInvestmentsAllowed) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `Cannot invest on behalf of ${beneficiary} because this STO doesn't allow beneficial investments`,
      });
    }

    beneficiary = beneficiary || currentAddress;

    const securityTokenId = SecurityToken.generateId({ symbol });
    const tieredStoId = TieredSto.generateId({
      securityTokenId,
      stoType: StoType.Tiered,
      address: stoAddress,
    });
    const resolvers = [
      async () => {
        return tieredStoFactory.refresh(tieredStoId);
      },
    ];

    const unsupportedCurrencyError = new PolymathError({
      code: ErrorCode.ProcedureValidationError,
      message: `STO ${stoAddress} doesn't support investments in the selected currency`,
    });

    if (isInvestWithStableCoinArgs(args)) {
      const { stableCoinAddress } = args;

      if (!canRaiseInStableCoin) {
        throw unsupportedCurrencyError;
      }

      await this.addProcedure(ApproveErc20)({
        tokenAddress: stableCoinAddress,
        amount,
        spender: stoAddress,
      });

      await this.addTransaction(stoModule.buyWithUSDRateLimited, {
        tag: PolyTransactionTag.BuyWithScRateLimited,
        resolvers,
      })({
        minTokens,
        beneficiary,
        usdToken: stableCoinAddress,
        investedSC: amount,
      });
    } else if (currency === Currency.POLY) {
      if (!canRaiseInPoly) {
        throw unsupportedCurrencyError;
      }

      await this.addProcedure(ApproveErc20)({
        amount,
        spender: stoAddress,
      });

      await this.addTransaction(stoModule.buyWithPOLYRateLimited, {
        tag: PolyTransactionTag.BuyWithPolyRateLimited,
        resolvers,
      })({
        minTokens,
        beneficiary,
        investedPOLY: amount,
      });
    } else {
      if (!canRaiseInEth) {
        throw unsupportedCurrencyError;
      }

      await this.addTransaction(stoModule.buyWithETHRateLimited, {
        tag: PolyTransactionTag.BuyWithEthRateLimited,
        resolvers,
      })({
        minTokens,
        beneficiary,
        value: amount,
      });
    }
  }
}
