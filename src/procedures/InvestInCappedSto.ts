import { ModuleName } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  InvestInCappedStoProcedureArgs,
  ErrorCode,
  StoType,
  Currency,
} from '../types';
import { PolymathError } from '../PolymathError';
import { isValidAddress } from '../utils';
import { SecurityToken, CappedSto } from '../entities';
import { ApproveErc20 } from './ApproveErc20';

export class InvestInCappedSto extends Procedure<InvestInCappedStoProcedureArgs> {
  public type = ProcedureType.InvestInCappedSto;

  public async prepareTransactions() {
    const { args, context } = this;
    const { stoAddress, symbol, amount, currency } = args;
    let { beneficiary } = args;

    const {
      contractWrappers,
      factories: { cappedStoFactory },
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
    const cappedStoId = CappedSto.generateId({
      securityTokenId,
      stoType: StoType.Capped,
      address: stoAddress,
    });

    const sto = await cappedStoFactory.fetch(cappedStoId);

    const { isFinalized, isPaused, startDate, beneficialInvestmentsAllowed } = sto;

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

    beneficiary = beneficiary || currentAddress;

    const resolvers = [
      async () => {
        return cappedStoFactory.refresh(cappedStoId);
      },
    ];

    if (currency === Currency.ETH) {
      await this.addTransaction(stoModule.buyTokens, {
        tag: PolyTransactionTag.BuyTokens,
        resolvers,
      })({
        beneficiary,
        value: amount,
      });
    } else {
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
