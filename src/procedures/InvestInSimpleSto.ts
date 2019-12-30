import { ModuleName } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  InvestInSimpleStoProcedureArgs,
  ErrorCode,
  StoType,
  Currency,
} from '../types';
import { PolymathError } from '../PolymathError';
import { isValidAddress } from '../utils';
import { SecurityToken, SimpleSto } from '../entities';
import { ApproveErc20 } from './ApproveErc20';
import { Factories } from '../Context';

export const createRefreshSecurityTokenFactoryResolver = (
  factories: Factories,
  securityTokenId: string
) => async () => {
  return factories.securityTokenFactory.refresh(securityTokenId);
};

export class InvestInSimpleSto extends Procedure<InvestInSimpleStoProcedureArgs> {
  public type = ProcedureType.InvestInSimpleSto;

  public async prepareTransactions() {
    const { args, context } = this;
    const { stoAddress, symbol, amount } = args;
    let { beneficiary } = args;

    const { contractWrappers, factories } = context;

    /*
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
      name: ModuleName.CappedSTO,
      address: stoAddress,
    });

    if (!stoModule) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `STO ${stoAddress} is either archived or hasn't been launched`,
      });
    }

    const securityTokenId = SecurityToken.generateId({ symbol });
    const simpleStoId = SimpleSto.generateId({
      securityTokenId,
      stoType: StoType.Simple,
      address: stoAddress,
    });

    const sto = await factories.simpleStoFactory.fetch(simpleStoId);

    const {
      isFinalized,
      isPaused,
      startDate,
      beneficialInvestmentsAllowed,
      fundraiseCurrencies: [currency],
    } = sto;

    const currentAddress = await context.currentWallet.address();

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

    const resolvers = [
      async () => {
        return factories.simpleStoFactory.refresh(simpleStoId);
      },
      createRefreshSecurityTokenFactoryResolver(factories, securityTokenId),
    ];

    if (currency === Currency.ETH) {
      beneficiary = beneficiary || currentAddress;

      await this.addTransaction(stoModule.buyTokens, {
        tag: PolyTransactionTag.BuyTokens,
        resolvers,
      })({
        beneficiary,
        value: amount,
      });
    } else {
      if (beneficiary) {
        throw new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: 'This STO does not support investing in POLY on behalf of someone else',
        });
      }

      await this.addProcedure(ApproveErc20)({
        amount,
        spender: stoAddress,
      });

      await this.addTransaction(stoModule.buyTokensWithPoly, {
        tag: PolyTransactionTag.BuyTokensWithPoly,
        resolvers,
      })({
        investedPOLY: amount,
      });
    }
  }
}
