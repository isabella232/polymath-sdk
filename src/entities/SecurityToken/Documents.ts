/**
 * @packageDocumentation
 * @module Entities.SecurityToken
 */

import { SubModule } from './SubModule';
import { PolymathError } from '../../base/PolymathError';
import { ErrorCode } from '../../types';
import { SetDocument } from '../../procedures/SetDocument';
import { RemoveDocument } from '../../procedures/RemoveDocument';

/**
 * Represents a single Document attached to a Security Token
 */
interface Document {
  /**
   * name of the document. It should always be unique
   */
  name: string;
  /**
   * off-chain uri of the document from where it is accessible to investors/advisors to read
   */
  documentUri: string;
  /**
   * hash of the document's contents
   */
  documentHash: string;
  updatedAt: Date;
}

/**
 * Namespace that handles all document Related functionality
 */
export class Documents extends SubModule {
  /**
   * Attach a new document to the contract, or update the URI or hash of an existing attached document
   *
   * @param args.name - should always be unique
   * @param args.uri - off-chain uri of the document from where it is accessible to investors/advisors to read
   * @param args.documentHash - hash of the document's contents
   */
  public async set(args: { name: string; uri: string; documentHash: string }) {
    const { symbol } = this.securityToken;

    const procedure = new SetDocument({ symbol, ...args }, this.context);

    return procedure.prepare();
  }

  /**
   * Remove an existing document from the Security Token
   *
   * @param args.name - should always be unique
   */
  public async remove(args: { name: string }) {
    const { symbol } = this.securityToken;

    const procedure = new RemoveDocument({ symbol, ...args }, this.context);

    return procedure.prepare();
  }

  /**
   * Retrieve a specific document's data by name
   */
  public getDocument = async (args: { name: string }): Promise<Document> => {
    const {
      context: { contractWrappers },
      securityToken,
    } = this;

    const { symbol } = securityToken;
    let securityTokenInstance;

    try {
      // prettier-ignore
      securityTokenInstance =
        await contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(
          symbol
        );
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.FetcherValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    const { documentTime: updatedAt, ...info } = await securityTokenInstance.getDocument(args);
    return { updatedAt, ...args, ...info };
  };

  /**
   * Retrieve an array of all the documents attached to the security token
   */
  public getAllDocuments = async (): Promise<Document[]> => {
    const {
      context: { contractWrappers },
      securityToken,
    } = this;

    const { symbol } = securityToken;
    let securityTokenInstance;

    try {
      // prettier-ignore
      securityTokenInstance =
        await contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(
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
