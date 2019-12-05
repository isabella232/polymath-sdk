import { TransactionReceiptWithDecodedLogs } from '@polymathnetwork/contract-wrappers';

export class PostTransactionResolver<
  Value extends any,
  Receipt extends any = TransactionReceiptWithDecodedLogs
> {
  public result?: Value;

  private resolver: (receipt: Receipt) => Promise<Value> | Promise<undefined>;

  constructor(resolver?: (receipt: Receipt) => Promise<Value>) {
    if (!resolver) {
      this.resolver = async () => undefined;
      return;
    }

    this.resolver = resolver;
  }

  public async run(receipt: Receipt) {
    const result = await this.resolver(receipt);

    this.result = result;
  }
}

export function isPostTransactionResolver<T = any, R = TransactionReceiptWithDecodedLogs>(
  val: any
): val is PostTransactionResolver<T, R> {
  return val instanceof PostTransactionResolver;
}
