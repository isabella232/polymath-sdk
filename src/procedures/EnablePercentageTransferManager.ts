import { ModuleName, TransactionParams } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  EnablePercentageTransferManagerProcedureArgs,
  ErrorCode,
} from '../types';
import { PolymathError } from '../PolymathError';

export class EnablePercentageTransferManager extends Procedure<
  EnablePercentageTransferManagerProcedureArgs
> {
  public type = ProcedureType.EnablePercentageTransferManager;

  public async prepareTransactions() {
    const { symbol, maxHolderPercentage, allowPrimaryIssuance = false } = this.args;
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
    const moduleName = ModuleName.PercentageTransferManager;

    const moduleAddress = await contractWrappers.getModuleFactoryAddress({
      tokenAddress,
      moduleName,
    });

    await this.addTransaction<TransactionParams.SecurityToken.AddPercentageTransferManager>(
      securityToken.addModuleWithLabel,
      {
        tag: PolyTransactionTag.EnablePercentageTransferManager,
      }
    )({
      moduleName,
      address: moduleAddress,
      archived: false,
      data: {
        maxHolderPercentage,
        allowPrimaryIssuance,
      },
    });
  }
}
