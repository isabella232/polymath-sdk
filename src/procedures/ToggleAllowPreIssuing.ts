import {
  ModuleName,
  isUSDTieredSTO_3_0_0,
  isCappedSTO_3_0_0,
} from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  ToggleAllowPreIssuingProcedureArgs,
  ErrorCode,
  StoType,
} from '../types';
import { PolymathError } from '../PolymathError';
import { isValidAddress } from '../utils';
import { Factories } from '~/Context';
import { SecurityToken, SimpleSto, TieredSto } from '~/entities';

export const createToggleAllowPreIssuingResolver = (
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

export class ToggleAllowPreIssuing extends Procedure<ToggleAllowPreIssuingProcedureArgs> {
  public type = ProcedureType.ToggleAllowPreIssuing;

  public async prepareTransactions() {
    const { stoAddress, stoType, symbol, allowPreIssuing } = this.args;
    const { contractWrappers, factories } = this.context;

    /*
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

    const stoModuleErrorMsg = `STO ${stoAddress} is either archived or hasn't been launched`;

    switch (stoType) {
      case StoType.Simple: {
        stoModule = await contractWrappers.moduleFactory.getModuleInstance({
          name: ModuleName.CappedSTO,
          address: stoAddress,
        });

        if (!stoModule) {
          throw new PolymathError({
            code: ErrorCode.ProcedureValidationError,
            message: stoModuleErrorMsg,
          });
        }

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

        if (!stoModule) {
          throw new PolymathError({
            code: ErrorCode.ProcedureValidationError,
            message: stoModuleErrorMsg,
          });
        }

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

    const preMintingAllowed = await stoModule.preMintAllowed();
    if (preMintingAllowed === allowPreIssuing) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `Pre-minting is already ${preMintingAllowed ? '' : 'dis'}allowed`,
      });
    }

    /*
     * Transactions
     */
    await this.addTransaction(
      allowPreIssuing ? stoModule.allowPreMinting : stoModule.revokePreMintFlag,
      {
        tag: allowPreIssuing
          ? PolyTransactionTag.AllowPreMinting
          : PolyTransactionTag.RevokePreMinting,
        resolvers: [createToggleAllowPreIssuingResolver(factories, symbol, stoType, stoAddress)],
      }
    )({});
  }
}
