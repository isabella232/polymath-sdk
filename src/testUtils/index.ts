import { PolyResponse } from '@polymathnetwork/contract-wrappers';
import { PostTransactionResolver } from '../PostTransactionResolver';

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

class MockPolyResponse extends PolyResponse {
  public resolve: () => void;

  public reject: (err: any) => void;

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

export class MockedContract {
  public autoResolve: boolean;

  public errorMsg?: string;

  public fakeTxOnePolyResponse: MockPolyResponse;

  public fakeTxTwoPolyResponse: MockPolyResponse;

  public failureTxPolyResponse: MockPolyResponse;

  public fakeTxOne = jest.fn(async () => {
    if (this.autoResolve) {
      this.fakeTxOnePolyResponse.resolve();
    }

    return this.fakeTxOnePolyResponse;
  });

  public fakeTxTwo = jest.fn(async () => {
    if (this.autoResolve) {
      this.fakeTxTwoPolyResponse.resolve();
    }

    return this.fakeTxTwoPolyResponse;
  });

  public failureTx = jest.fn(async () => {
    if (this.autoResolve) {
      this.failureTxPolyResponse.reject(new Error(this.errorMsg || 'Test Error'));
    }

    return this.failureTxPolyResponse;
  });

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

export const getMockTransactionSpec = (
  method: (args: any) => Promise<any>,
  args: any,
  resolver = async () => {}
) => ({
  method,
  args,
  postTransactionResolver: new PostTransactionResolver(resolver),
});

export function getMockedPolyResponse(): PolyResponse {
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

export class MockedCallMethod {
  public callAsync(...args: any): Promise<any> {
    // eslint-disable-line
    return Promise.resolve();
  }

  public getABIEncodedTransactionData(): string {
    return '';
  }
}

export class MockedSendMethod extends MockedCallMethod {
  public sendTransactionAsync(...args: any): Promise<any> {
    // eslint-disable-line
    return Promise.resolve();
  }

  public estimateGasAsync(...args: any): Promise<any> {
    // eslint-disable-line
    return Promise.resolve();
  }

  public getABIEncodedTransactionData(): string {
    return '';
  }
}
