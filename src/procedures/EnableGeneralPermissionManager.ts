import { ModuleName, TransactionParams } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  EnableGeneralPermissionManagerProcedureArgs,
  ErrorCode,
} from '../types';
import { PolymathError } from '../PolymathError';

/**
 * Procedure to enable a general permission manager module on a security token
 */
export class EnableGeneralPermissionManager extends Procedure<
  EnableGeneralPermissionManagerProcedureArgs
> {
  public type = ProcedureType.EnableGeneralPermissionManager;

  /**
   * - Enable the general permission manager on the security token
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
    const moduleName = ModuleName.GeneralPermissionManager;

    const moduleAddress = await contractWrappers.getModuleFactoryAddress({
      tokenAddress,
      moduleName,
    });

    await this.addTransaction<TransactionParams.SecurityToken.AddNoDataModule>(
      securityToken.addModuleWithLabel,
      {
        tag: PolyTransactionTag.EnableGeneralPermissionManager,
      }
    )({
      moduleName,
      address: moduleAddress,
      archived: false,
    });
  }
}
