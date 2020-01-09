import { ModuleName, TransactionParams } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  EnableCountTransferManagerProcedureArgs,
  ErrorCode,
} from '../types';
import { PolymathError } from '../PolymathError';

/**
 * Procedure to enable a count transfer manager module on a security token, including the max token holder count
 */
export class EnableCountTransferManager extends Procedure<EnableCountTransferManagerProcedureArgs> {
  public type = ProcedureType.EnableCountTransferManager;

  /**
   * - Enable the count transfer manager on the security token, instantiating the module with a max token holder count
   */
  public async prepareTransactions() {
    const { symbol, maxHolderCount } = this.args;
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
    const moduleName = ModuleName.CountTransferManager;

    const moduleAddress = await contractWrappers.getModuleFactoryAddress({
      tokenAddress,
      moduleName,
    });

    await this.addTransaction<TransactionParams.SecurityToken.AddCountTransferManager>(
      securityToken.addModuleWithLabel,
      {
        tag: PolyTransactionTag.EnableCountTransferManager,
      }
    )({
      moduleName,
      address: moduleAddress,
      archived: false,
      data: {
        maxHolderCount,
      },
    });
  }
}
