import { TransactionReceiptWithDecodedLogs } from '@polymathnetwork/contract-wrappers';

export class PostTransactionResolver<Value extends any> {
  public result?: Value;

  private resolver: (
    receipt: TransactionReceiptWithDecodedLogs
  ) => Promise<Value> | Promise<undefined>;

  constructor(resolver?: (receipt: TransactionReceiptWithDecodedLogs) => Promise<Value>) {
    if (!resolver) {
      this.resolver = async () => undefined;
      return;
    }

    this.resolver = resolver;
  }

  public async run(receipt: TransactionReceiptWithDecodedLogs) {
    const result = await this.resolver(receipt);

    this.result = result;
  }
}

export function isPostTransactionResolver<T = any>(val: any): val is PostTransactionResolver<T> {
  return val instanceof PostTransactionResolver;
}
