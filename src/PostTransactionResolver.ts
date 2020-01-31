import { TransactionReceiptWithDecodedLogs } from '@polymathnetwork/contract-wrappers';

/**
 * @hidden
 * Represents a value that doesn't exist at the moment, but will exist once a certain transaction
 * has been run
 */
export class PostTransactionResolver<
  Value extends any,
  Receipt extends any = TransactionReceiptWithDecodedLogs
> {
  public result?: Value;

  private resolver: (receipt: Receipt) => Promise<Value> | Promise<undefined>;

  // eslint-disable-next-line require-jsdoc
  constructor(resolver?: (receipt: Receipt) => Promise<Value>) {
    if (!resolver) {
      this.resolver = async () => undefined;
      return;
    }

    this.resolver = resolver;
  }

  /**
   * Run the resolver function and assign its result to this object
   */
  public async run(receipt: Receipt) {
    const result = await this.resolver(receipt);

    this.result = result;
  }
}

/**
 * @hidden
 * Check if a value is of type [[PostTransactionResolver]]
 */
export function isPostTransactionResolver<T = any, R = TransactionReceiptWithDecodedLogs>(
  val: any
): val is PostTransactionResolver<T, R> {
  return val instanceof PostTransactionResolver;
}
