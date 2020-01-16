import { Procedure } from './Procedure';
import { ProcedureType, PolyTransactionTag, SetDocumentProcedureArgs, ErrorCode } from '../types';
import { PolymathError } from '../PolymathError';
import { checkStringLength } from '../utils';

export class SetDocument extends Procedure<SetDocumentProcedureArgs> {
  public type = ProcedureType.SetDocument;

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
