import { SubModule } from './SubModule';
import { PolymathError } from '../../PolymathError';
import { ErrorCode } from '../../types';
import { SetDocument } from '../../procedures/SetDocument';
import { RemoveDocument } from '../../procedures/RemoveDocument';

interface Document {
  name: string;
  documentUri: string;
  documentHash: string;
  updatedAt: Date;
}

export class Documents extends SubModule {
  /**
   * Attach a new document to the contract, or update the URI or hash of an existing attached document
   * @param name Name of the document. It should be unique always
   * @param uri Off-chain uri of the document from where it is accessible to investors/advisors to read.
   * @param documentHash hash (of the contents) of the document.
   */
  public async set(args: { name: string; uri: string; documentHash: string }) {
    const { symbol } = this.securityToken;

    const procedure = new SetDocument({ symbol, ...args }, this.context);

    return procedure.prepare();
  }

  /**
   * Remove an existing document from the contract giving the name of the document.
   * @param name Name of the document. It should be unique always
   */
  public async remove(args: { name: string }) {
    const { symbol } = this.securityToken;

    const procedure = new RemoveDocument({ symbol, ...args }, this.context);

    return procedure.prepare();
  }

  /**
   * Retrieve a specific document's data by name
   * @param name Unique name of the document
   */
  public getDocument = async (args: { name: string }): Promise<Document> => {
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
        code: ErrorCode.FetcherValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }
    const documentInfo = await securityTokenInstance.getDocument(args);

    return { name: args.name, updatedAt: documentInfo.documentTime, ...documentInfo };
  };

  /**
   * Retrieve a list of all document names
   */
  public getAllDocuments = async (): Promise<Document[]> => {
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
        code: ErrorCode.FetcherValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }
    const documentList = await securityTokenInstance.getAllDocuments();
    return Promise.all(documentList.map(docname => this.getDocument({ name: docname })));
  };
}
