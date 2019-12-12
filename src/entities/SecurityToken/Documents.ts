import { SubModule } from './SubModule';
import { PolymathError } from '../../PolymathError';
import { ErrorCode } from '../../types';

interface DocumentData {
  documentUri: string;
  documentHash: string;
  documentTime: Date;
}

export class Documents extends SubModule {
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
