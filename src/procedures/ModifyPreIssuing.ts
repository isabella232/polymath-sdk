import {
  ModuleName,
  isUSDTieredSTO_3_0_0,
  isCappedSTO_3_0_0,
} from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  ModifyPreIssuingProcedureArgs,
  ErrorCode,
  StoType,
} from '../types';
import { PolymathError } from '../PolymathError';
import { isValidAddress } from '../utils';
import { SecurityToken, SimpleSto, TieredSto } from '../entities';

export class ModifyPreIssuing extends Procedure<ModifyPreIssuingProcedureArgs> {
  public type = ProcedureType.ModifyPreIssuing;

  public async prepareTransactions() {
    const { stoAddress, stoType, symbol, allowPreIssuing } = this.args;
    const { contractWrappers, factories } = this.context;

    /**
     * Validation
     */

    if (!isValidAddress(stoAddress)) {
      throw new PolymathError({
        code: ErrorCode.InvalidAddress,
        message: `Invalid STO address ${stoAddress}`,
      });
    }

    let stoModule;
    const wrongVersionError = new PolymathError({
      code: ErrorCode.IncorrectVersion,
      message: 'STO version is 3.0.0. Version 3.1.0 or greater is required for pre-minting',
    });

    switch (stoType) {
      case StoType.Simple: {
        stoModule = await contractWrappers.moduleFactory.getModuleInstance({
          name: ModuleName.CappedSTO,
          address: stoAddress,
        });

        if (isCappedSTO_3_0_0(stoModule)) {
          throw wrongVersionError;
        }

        break;
      }
      case StoType.Tiered: {
        stoModule = await contractWrappers.moduleFactory.getModuleInstance({
          name: ModuleName.UsdTieredSTO,
          address: stoAddress,
        });

        if (isUSDTieredSTO_3_0_0(stoModule)) {
          throw wrongVersionError;
        }

        break;
      }
      default: {
        throw new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: `Invalid STO type ${stoType}`,
        });
      }
    }

    if (!stoModule) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `STO ${stoAddress} is either archived or hasn't been launched`,
      });
    }

    const preMintingAllowed = await stoModule.preMintAllowed();

    if (preMintingAllowed === allowPreIssuing) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `Pre-minting is already ${preMintingAllowed ? '' : 'dis'}allowed`,
      });
    }

    /**
     * Transactions
     */

    await this.addTransaction(
      allowPreIssuing ? stoModule.allowPreMinting : stoModule.revokePreMintFlag,
      {
        tag: allowPreIssuing
          ? PolyTransactionTag.AllowPreMinting
          : PolyTransactionTag.RevokePreMinting,
        resolvers: [
          async () => {
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
            }
          },
        ],
      }
    )({});
  }
}
