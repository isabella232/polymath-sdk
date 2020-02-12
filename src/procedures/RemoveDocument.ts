/**
 * @packageDocumentation
 * @module Procedures
 */

import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  RemoveDocumentProcedureArgs,
  ErrorCode,
} from '../types';
import { PolymathError } from '../PolymathError';
import { checkStringLength } from '../utils';

/**
 * Procedure that removes a document from a Security Token
 */
export class RemoveDocument extends Procedure<RemoveDocumentProcedureArgs> {
  public type = ProcedureType.RemoveDocument;

  /**
   * Remove a document from the Security Token
   *
   * Note that this procedure will fail if:
   * - The current wallet is not the Security Token owner
   * - The name of the document is less than 1 or more than 32 characters long
   * - The document doesn't exist in the Security Token
   */
  public async prepareTransactions() {
    const { symbol, name } = this.args;
    const { contractWrappers, currentWallet } = this.context;

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

    const [owner, account, allDocumentsList] = await Promise.all([
      securityToken.owner(),
      currentWallet.address(),
      securityToken.getAllDocuments(),
    ]);

    if (account !== owner) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `You must be the owner of this Security Token to remove a document`,
      });
    }

    checkStringLength(name, 'name', { minLength: 1, maxLength: 32 });

    if (!allDocumentsList.includes(name)) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `The document you are trying to remove does not exist on this security token`,
      });
    }

    /*
     * Transactions
     */
    await this.addTransaction(securityToken.removeDocument, {
      tag: PolyTransactionTag.RemoveDocument,
    })({ name });
  }
}
