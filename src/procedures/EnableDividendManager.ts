/**
 * @packageDocumentation
 * @module Procedures
 */

import { ModuleName, SecurityToken, TransactionParams } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  EnableDividendManagerProcedureArgs,
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
} from '../types';
import { PolymathError } from '../PolymathError';

/**
 * Procedure that enables Dividends on a Security Token
 */
export class EnableDividendManager extends Procedure<EnableDividendManagerProcedureArgs> {
  public type = ProcedureType.EnableDividendManager;

  /**
   * Enable Dividends on the Security Token and set a wallet address where reclaimed dividends and withheld tax will be stored
   */
  public async prepareTransactions() {
    const { symbol, storageWalletAddress } = this.args;
    const { contractWrappers } = this.context;

    let securityToken: SecurityToken;

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

    const moduleName = ModuleName.ERC20DividendCheckpoint;
    const moduleFactoryAddress = await contractWrappers.getModuleFactoryAddress({
      tokenAddress,
      moduleName,
    });

    await this.addTransaction<TransactionParams.SecurityToken.AddDividendCheckpoint>(
      securityToken.addModuleWithLabel,
      {
        tag: PolyTransactionTag.EnableDividends,
      }
    )({
      moduleName,
      address: moduleFactoryAddress,
      data: { wallet: storageWalletAddress },
      archived: false,
    });
  }
}
