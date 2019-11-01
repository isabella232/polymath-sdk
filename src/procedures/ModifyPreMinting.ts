import {
  ModuleName,
  isUSDTieredSTO_3_0_0,
  isCappedSTO_3_0_0,
} from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  ModifyPreMintingProcedureArgs,
  ErrorCode,
  StoType,
} from '../types';
import { PolymathError } from '../PolymathError';
import { isValidAddress } from '../utils';
import { SecurityToken, CappedSto, TieredSto } from '../entities';

export class ModifyPreMinting extends Procedure<ModifyPreMintingProcedureArgs> {
  public type = ProcedureType.PauseSto;

  public async prepareTransactions() {
    const { stoAddress, stoType, symbol, allowPreMinting } = this.args;
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
      case StoType.Capped: {
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
        message: `STO ${stoAddress} is either archived or hasn't been launched.`,
      });
    }

    /**
     * Transactions
     */

    await this.addTransaction(
      allowPreMinting ? stoModule.allowPreMinting : stoModule.revokePreMintFlag,
      {
        tag: allowPreMinting
          ? PolyTransactionTag.AllowPreMinting
          : PolyTransactionTag.RevokePreMinting,
        resolvers: [
          async () => {
            const securityTokenId = SecurityToken.generateId({ symbol });

            switch (stoType) {
              case StoType.Capped: {
                return factories.cappedStoFactory.refresh(
                  CappedSto.generateId({
                    securityTokenId,
                    stoType: StoType.Capped,
                    address: stoAddress,
                  })
                );
              }
              case StoType.Tiered: {
                return factories.tieredStoFactory.refresh(
                  TieredSto.generateId({
                    securityTokenId,
                    stoType: StoType.Tiered,
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
