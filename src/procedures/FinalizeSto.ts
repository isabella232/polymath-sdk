import { ModuleName, isCappedSTO_3_0_0, BigNumber } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  FinalizeStoProcedureArgs,
  ErrorCode,
  StoType,
} from '../types';
import { PolymathError } from '../PolymathError';
import { isValidAddress } from '../utils';
import { SecurityToken, SimpleSto, TieredSto } from '../entities';
import { Factories } from '../Context';

export const createRefreshStoFactoryResolver = (
  factories: Factories,
  symbol: string,
  stoType: StoType,
  stoAddress: string
) => async () => {
  const securityTokenId = SecurityToken.generateId({ symbol });

  switch (stoType) {
    case StoType.Simple: {
      return factories.simpleStoFactory.refresh(
        SimpleSto.generateId({
          securityTokenId,
          stoType,
          address: stoAddress,
        })
      );
    }
    case StoType.Tiered: {
      return factories.tieredStoFactory.refresh(
        TieredSto.generateId({
          securityTokenId,
          stoType,
          address: stoAddress,
        })
      );
    }
    default: {
      return undefined;
    }
  }
};

export class FinalizeSto extends Procedure<FinalizeStoProcedureArgs> {
  public type = ProcedureType.FinalizeSto;

  public async prepareTransactions() {
    const { stoAddress, stoType, symbol } = this.args;
    const { contractWrappers, factories } = this.context;

    /*
     * Validation
     */
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

    if (!isValidAddress(stoAddress)) {
      throw new PolymathError({
        code: ErrorCode.InvalidAddress,
        message: `Invalid STO address ${stoAddress}`,
      });
    }

    function throwStoModuleError() {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `STO ${stoAddress} is either archived or hasn't been launched`,
      });
    }

    let stoModule;
    let remainingTokens: BigNumber;

    switch (stoType) {
      case StoType.Simple: {
        stoModule = await contractWrappers.moduleFactory.getModuleInstance({
          name: ModuleName.CappedSTO,
          address: stoAddress,
        });

        if (!stoModule) {
          throwStoModuleError();
        }

        if (isCappedSTO_3_0_0(stoModule)) {
          throw new PolymathError({
            code: ErrorCode.IncorrectVersion,
            message:
              'Capped STO version is 3.0.0. Version 3.1.0 or greater is required for forced finalization',
          });
        }

        const { totalTokensSold, cap } = await stoModule.getSTODetails();
        remainingTokens = cap.minus(totalTokensSold);

        break;
      }
      case StoType.Tiered: {
        stoModule = await contractWrappers.moduleFactory.getModuleInstance({
          name: ModuleName.UsdTieredSTO,
          address: stoAddress,
        });

        if (!stoModule) {
          throwStoModuleError();
        }

        const { tokensSold, capPerTier } = await stoModule.getSTODetails();
        const totalCap = capPerTier.reduce((prev, next) => prev.plus(next), new BigNumber(0));
        remainingTokens = totalCap.minus(tokensSold);

        break;
      }
      default: {
        throw new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `Invalid STO type ${stoType}`,
        });
      }
    }

    const [isFinalized, treasuryWallet] = await Promise.all([
      stoModule.isFinalized(),
      contractWrappers.getTreasuryWallet({ module: stoModule }),
    ]);

    if (isFinalized) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `STO ${stoAddress} has already been finalized`,
      });
    }

    const canTransfer = await securityToken.canTransfer({
      to: treasuryWallet,
      value: remainingTokens,
    });

    if (!canTransfer) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `Treasury wallet "${treasuryWallet}" is not cleared to receive the remaining ${remainingTokens} "${symbol}" tokens. Please review transfer restrictions regarding this wallet address before attempting to finalize the STO`,
      });
    }

    /*
     * Transactions
     */
    await this.addTransaction(stoModule.finalize, {
      tag: PolyTransactionTag.FinalizeSto,
      resolvers: [createRefreshStoFactoryResolver(factories, symbol, stoType, stoAddress)],
    })({});
  }
}
