import {
  PolyResponse,
  TransactionReceiptWithDecodedLogs,
} from '@polymathnetwork/contract-wrappers';
import { PostTransactionResolver } from '../base/PostTransactionResolver';
import { TransactionSpec } from '../types';

const originalWindow = {
  ...window,
};

interface WindowWithEthereum extends Window {
  ethereum: {
    networkVersion: string;
    _metamask?: {
      isApproved: () => Promise<boolean>;
    };
    enable(): Promise<any>;
  };
}

interface WindowWithWeb3 extends Window {
  web3: {
    version: string;
  };
}

interface MockEthereumBrowserArgs {
  support?: 'legacy' | 'modern';
  options?: {
    networkId: number;
    loaded: boolean;
  };
}

/* eslint-disable no-global-assign */
/**
 * @hidden
 */
export function mockEthereumBrowser({
  support = 'modern',
  options = {
    networkId: 1,
    loaded: true,
  },
}: MockEthereumBrowserArgs) {
  const { networkId, loaded } = options;

  if (support === 'modern') {
    window = (Object.assign(window, {
      ethereum: {
        networkVersion: loaded ? `${networkId}` : undefined,
      },
    }) as any) as WindowWithEthereum;
  }
  if (support === 'legacy') {
    window = Object.assign(window, {
      web3: {
        version: networkId,
      },
    } as any) as WindowWithWeb3;
  }

  return {
    restore: () => {
      window = originalWindow;
    },
    load: () => {
      if (support === 'modern') {
        (window as WindowWithEthereum).ethereum.networkVersion = `${networkId}`;
      }
      if (support === 'legacy') {
        (window as WindowWithWeb3).web3.version = `${networkId}`;
      }
    },
  };
}
/* eslint-enable no-global-assign */

/**
 * @hidden
 */
class MockPolyResponse extends PolyResponse {
  public resolve: () => void;

  public reject: (err: any) => void;

  // eslint-disable-next-line require-jsdoc
  constructor(args: { txHash: string }) {
    const { txHash } = args;
    const values = {
      from: 'from',
      to: 'to',
      status: '0',
      cumulativeGasUsed: 0,
      gasUsed: 0,
      contractAddress: 'contractAddress',
      logs: [],
      logIndex: null,
      transactionIndex: 1,
      transactionHash: txHash,
      blockHash: 'blockHash',
      blockNumber: 1,
      address: 'address',
      data: 'data',
      topics: ['topic1'],
    };

    super(txHash, Promise.resolve(values));

    this.resolve = () => {};
    this.reject = () => {};

    const promise = new Promise<typeof values>((resolve, reject) => {
      this.resolve = () => resolve(values);
      this.reject = err => reject(err);
    });

    this.receiptAsync = promise;
  }
}

/**
 * @hidden
 */
export class MockedContract {
  public autoResolve: boolean;

  public errorMsg?: string;

  public fakeTxOnePolyResponse: MockPolyResponse;

  public fakeTxTwoPolyResponse: MockPolyResponse;

  public failureTxPolyResponse: MockPolyResponse;

  /* eslint-disable @typescript-eslint/no-unused-vars */
  public fakeTxOneSpy = jest.fn(async (_args: any) => {
    if (this.autoResolve) {
      this.fakeTxOnePolyResponse.resolve();
    }

    return this.fakeTxOnePolyResponse;
  });

  public fakeTxTwoSpy = jest.fn(async (_args: any) => {
    if (this.autoResolve) {
      this.fakeTxTwoPolyResponse.resolve();
    }

    return this.fakeTxTwoPolyResponse;
  });
  /* eslint-enable @typescript-eslint/no-unused-vars */

  public fakeTxOne = (args: any) => this.fakeTxOneSpy(args);

  public fakeTxTwo = (args: any) => this.fakeTxTwoSpy(args);

  public failureTx = jest.fn(async () => {
    if (this.autoResolve) {
      this.failureTxPolyResponse.reject(new Error(this.errorMsg || 'Test Error'));
    }

    return this.failureTxPolyResponse;
  });

  // eslint-disable-next-line require-jsdoc
  constructor({
    autoResolve = true,
    errorMsg,
    txHashes = [],
  }: {
    autoResolve?: boolean;
    errorMsg?: string;
    txHashes?: [] | [string] | [string, string] | [string, string, string];
  } = {}) {
    this.autoResolve = autoResolve;
    this.errorMsg = errorMsg;

    this.fakeTxOnePolyResponse = new MockPolyResponse({
      txHash: txHashes[0] || '0x1',
    });
    this.fakeTxTwoPolyResponse = new MockPolyResponse({
      txHash: txHashes[1] || '0x2',
    });
    this.failureTxPolyResponse = new MockPolyResponse({
      txHash: txHashes[2] || '0x3',
    });
  }
}

/**
 * @hidden
 */
export const getMockTransactionSpec = (
  method: (args: any) => Promise<any>,
  args: any,
  resolvers = []
): TransactionSpec<any, any[], string | TransactionReceiptWithDecodedLogs> => ({
  method,
  args,
  postTransactionResolvers: resolvers.map(resolver => new PostTransactionResolver(resolver)),
});

/**
 * @hidden
 */
export async function getMockedPolyResponse(): Promise<PolyResponse> {
  return new PolyResponse(
    'TxHash',
    Promise.resolve({
      from: 'from',
      to: 'to',
      status: '0',
      cumulativeGasUsed: 0,
      gasUsed: 0,
      contractAddress: 'contractAddress',
      logs: [],
      logIndex: null,
      transactionIndex: 1,
      transactionHash: 'transactionHash',
      blockHash: 'blockHash',
      blockNumber: 1,
      address: 'address',
      data: 'data',
      topics: ['topic1'],
    })
  );
}

/**
 * @hidden
 */
export class MockedCallMethod {
  // eslint-disable-next-line require-jsdoc
  public callAsync(): Promise<any> {
    // eslint-disable-line
    return Promise.resolve();
  }

  // eslint-disable-next-line require-jsdoc
  public getABIEncodedTransactionData(): string {
    return '';
  }
}

/**
 * @hidden
 */
export class MockedSendMethod extends MockedCallMethod {
  // eslint-disable-next-line require-jsdoc
  public sendTransactionAsync(): Promise<any> {
    // eslint-disable-line
    return Promise.resolve();
  }

  // eslint-disable-next-line require-jsdoc
  public estimateGasAsync(): Promise<any> {
    // eslint-disable-line
    return Promise.resolve();
  }

  // eslint-disable-next-line require-jsdoc
  public getABIEncodedTransactionData(): string {
    return '';
  }
}
