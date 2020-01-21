import { ModuleName } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  ToggleAllowBeneficialInvestmentsProcedureArgs,
  ErrorCode,
  StoType,
} from '../types';
import { PolymathError } from '../PolymathError';
import { isValidAddress } from '../utils';
import { SecurityToken, SimpleSto, TieredSto } from '../entities';
import { Factories } from '../Context';

/**
 * @hidden
 */
export const createToggleAllowBeneficialInvestmentsResolver = (
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

/**
 * Procedure that toggles whether beneficial investments are allowed or not in an STO
 */
export class ToggleAllowBeneficialInvestments extends Procedure<
  ToggleAllowBeneficialInvestmentsProcedureArgs
> {
  public type = ProcedureType.ToggleAllowBeneficialInvestments;

  /**
   * Toggle to allow or disallow beneficial investments in the STO
   *
   * Note this procedure will fail if:
   * - Trying to allow beneficial investments when they are already allowed
   * - Trying to disallow beneficial investments when they are already disallowed
   * - The specified STO address is invalid
   * - The specified STO type is invalid
   * - The STO has not been launched, or the module has been archived
   */
  public async prepareTransactions() {
    const { stoAddress, stoType, symbol, allowBeneficialInvestments } = this.args;
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

    switch (stoType) {
      case StoType.Simple: {
        stoModule = await contractWrappers.moduleFactory.getModuleInstance({
          name: ModuleName.CappedSTO,
          address: stoAddress,
        });

        break;
      }
      case StoType.Tiered: {
        stoModule = await contractWrappers.moduleFactory.getModuleInstance({
          name: ModuleName.UsdTieredSTO,
          address: stoAddress,
        });

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

    const beneficialInvesmentsAllowed = await stoModule.allowBeneficialInvestments();

    if (beneficialInvesmentsAllowed === allowBeneficialInvestments) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `Beneficial investments are already ${
          beneficialInvesmentsAllowed ? '' : 'dis'
        }allowed`,
      });
    }

    /*
     * Transactions
     */
    await this.addTransaction(stoModule.changeAllowBeneficialInvestments, {
      tag: PolyTransactionTag.ChangeAllowBeneficialInvestments,
      resolvers: [
        createToggleAllowBeneficialInvestmentsResolver(factories, symbol, stoType, stoAddress),
      ],
    })({ allowBeneficialInvestments });
  }
}
