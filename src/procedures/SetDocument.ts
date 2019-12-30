import { Procedure } from './Procedure';
import { ProcedureType, PolyTransactionTag, SetDocumentProcedureArgs, ErrorCode } from '../types';
import { PolymathError } from '../PolymathError';

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

    if (name.length < 1 || name.length > 32) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `You must provide a valid name between 1 and 32 characters long`,
      });
    }

    if (documentHash.length < 1 || documentHash.length > 32) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `You must provide a valid document hash between between 1 and 32 characters long`,
      });
    }

    /*
     * Transactions
     */
    await this.addTransaction(securityToken.setDocument, {
      tag: PolyTransactionTag.SetDocument,
    })({ name, uri, documentHash });
  }
}
