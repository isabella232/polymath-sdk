import { SubModule } from './SubModule';
import { PolymathError } from '../../PolymathError';
import { ErrorCode } from '../../types';
import { SetDocument } from '../../procedures/SetDocument';
import { RemoveDocument } from '../../procedures/RemoveDocument';

interface DocumentData {
  documentUri: string;
  documentHash: string;
  documentTime: Date;
}

export class Documents extends SubModule {
  /**
   * Set a document on the security token
   * @param name the name of the document
   * @param uri the uri of the document
   * @param documentHash the document hash for the document
   */
  public async set(args: { name: string; uri: string; documentHash: string }) {
    const { symbol } = this.securityToken;

    const procedure = new SetDocument({ symbol, ...args }, this.context);

    return procedure.prepare();
  }

  /**
   * Remove a document on the security token
   * @param name the name of the document
   */
  public async remove(args: { name: string }) {
    const { symbol } = this.securityToken;

    const procedure = new RemoveDocument({ symbol, ...args }, this.context);

    return procedure.prepare();
  }

  /**
   * Retrieve a specific document's data by name
   */
  public getDocument = async (documentName: { name: string }): Promise<DocumentData> => {
    const {
      context: { contractWrappers },
      securityToken,
    } = this;

    const { symbol } = securityToken;
    let securityTokenInstance;

    try {
      securityTokenInstance = await contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(
        symbol
      );
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }
    return securityTokenInstance.getDocument(documentName);
  };

  /**
   * Retrieve a list of all document names
   */
  public getAllDocuments = async (): Promise<string[]> => {
    const {
      context: { contractWrappers },
      securityToken,
    } = this;

    const { symbol } = securityToken;
    let securityTokenInstance;

    try {
      securityTokenInstance = await contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(
        symbol
      );
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }
    return securityTokenInstance.getAllDocuments();
  };
}
