import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  RemoveDocumentProcedureArgs,
  ErrorCode,
} from '../types';
import { PolymathError } from '../PolymathError';

export class RemoveDocument extends Procedure<RemoveDocumentProcedureArgs> {
  public type = ProcedureType.RemoveDocument;

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

    if (name.length < 1 || name.length > 32) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `You must provide a valid name between 1 and 32 characters long`,
      });
    }

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
