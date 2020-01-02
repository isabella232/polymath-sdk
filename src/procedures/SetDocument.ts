import { Procedure } from './Procedure';
import { ProcedureType, PolyTransactionTag, SetDocumentProcedureArgs, ErrorCode } from '../types';
import { PolymathError } from '../PolymathError';
import { isNotEmptyValidBytes32CompliantString } from '~/utils';

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

    isNotEmptyValidBytes32CompliantString(name, 'name');
    isNotEmptyValidBytes32CompliantString(documentHash, 'document hash');

    /*
     * Transactions
     */
    await this.addTransaction(securityToken.setDocument, {
      tag: PolyTransactionTag.SetDocument,
    })({ name, uri, documentHash });
  }
}
