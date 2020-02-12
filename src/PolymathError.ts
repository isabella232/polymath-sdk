import { ErrorCode } from './types';

export const ErrorMessagesPerCode: {
  [errorCode: string]: string;
} = {
  [ErrorCode.IncompatibleBrowser]: 'The browser being used is not compatible with Ethereum',
  [ErrorCode.WalletIsLocked]:
    'The wallet is locked, if Metamask extension is being used, the user needs to unlock it first',
  [ErrorCode.UserDeniedAccess]: 'The user denied access',
  [ErrorCode.TransactionRejectedByUser]: 'The user rejected the transaction',
  [ErrorCode.UnexpectedReturnData]:
    'The data returned by the smart contract has an unexpected format. Please report this issue to the Polymath team',
  [ErrorCode.InvalidAddress]: 'Invalid Address',
  [ErrorCode.NonBrowserEnvironment]:
    'Attempted to call a browser utility in a non-browser environment',
  [ErrorCode.MetamaskNotInstalled]:
    'You must install the Metamask browser extension if attempting to use Polymath SDK from the browser',
};

/**
 * Wraps an error to give more information about it's type
 */
export class PolymathError extends Error {
  public code: ErrorCode;

  // eslint-disable-next-line require-jsdoc
  constructor({ message, code }: { message?: string; code: ErrorCode }) {
    super(message || ErrorMessagesPerCode[code] || `Unknown error, code: ${code}`);
    // eslint:disable-next-line
    // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    // Object.setPrototypeOf(this, PolymathError);

    this.code = code;
  }
}
