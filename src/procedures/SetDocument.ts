/**
 * @packageDocumentation
 * @module Procedures
 */

import { Procedure } from './Procedure';
import { ProcedureType, PolyTransactionTag, SetDocumentProcedureArgs, ErrorCode } from '../types';
import { PolymathError } from '../base/PolymathError';
import { checkStringLength } from '../utils';

/**
 * Procedure that adds a document to a Security Token
 */
export class SetDocument extends Procedure<SetDocumentProcedureArgs> {
  public type = ProcedureType.SetDocument;

  /**
   * Set a document on the Security Token
   *
   * Note that this procedure will fail if:
   * - The current wallet is not the Security Token owner
   * - The name of the document is less than 1 or more than 32 characters long
   * - The document hash is less than 1 or more than 32 characters long
   */
  public async prepareTransactions() {
    const { symbol, name, uri, documentHash } = this.args;
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

    const [owner, account] = await Promise.all([securityToken.owner(), currentWallet.address()]);

    if (account !== owner) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `You must be the owner of this Security Token to set the document`,
      });
    }

    checkStringLength(name, 'name', { minLength: 1, maxLength: 32 });
    checkStringLength(documentHash, 'document hash', { minLength: 1, maxLength: 32 });

    /*
     * Transactions
     */
    await this.addTransaction(securityToken.setDocument, {
      tag: PolyTransactionTag.SetDocument,
    })({ name, uri, documentHash });
  }
}
