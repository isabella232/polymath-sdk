import { ModuleName, TransactionParams } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  EnableGeneralTransferManagerProcedureArgs,
  ErrorCode,
} from '../types';
import { PolymathError } from '../PolymathError';

/**
 * Procedure that enables Shareholders (specifically the KYC whitelist) on a Security Token. This comes enabled by default
 */
export class EnableGeneralTransferManager extends Procedure<
  EnableGeneralTransferManagerProcedureArgs
> {
  public type = ProcedureType.EnableGeneralTransferManager;

  /**
   * Enable Shareholders on the Security Token
   */
  public async prepareTransactions() {
    const { symbol } = this.args;
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

    const tokenAddress = await securityToken.address();
    const moduleName = ModuleName.GeneralTransferManager;

    const moduleAddress = await contractWrappers.getModuleFactoryAddress({
      tokenAddress,
      moduleName,
    });

    await this.addTransaction<TransactionParams.SecurityToken.AddNoDataModule>(
      securityToken.addModuleWithLabel,
      {
        tag: PolyTransactionTag.EnableGeneralTransferManager,
      }
    )({
      moduleName,
      address: moduleAddress,
      archived: false,
    });
  }
}
