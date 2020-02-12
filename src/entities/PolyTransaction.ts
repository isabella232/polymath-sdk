/**
 * @packageDocumentation
 * @module Entities
 */

import { mapValues, isPlainObject, pickBy } from 'lodash';
import { EventEmitter } from 'events';
import v4 from 'uuid/v4';
import { TransactionReceiptWithDecodedLogs } from '@polymathnetwork/contract-wrappers';
import { PostTransactionResolver, isPostTransactionResolver } from '../PostTransactionResolver';
import {
  TransactionSpec,
  ErrorCode,
  TransactionStatus,
  PolyTransactionTag,
  PostTransactionResolverArray,
} from '../types';
import { PolymathError } from '../PolymathError';
import { Entity } from './Entity';
import { TransactionQueue } from './TransactionQueue';
import { serialize } from '../utils';

enum Event {
  StatusChange = 'StatusChange',
}

// TODO @RafaelVidaurre: Cleanup code
/**
 * @hidden
 */
const mapValuesDeep = (
  obj: { [key: string]: any },
  fn: (...args: any[]) => any
): { [key: string]: any } =>
  mapValues(obj, (val, key) => (isPlainObject(val) ? mapValuesDeep(val, fn) : fn(val, key, obj)));

// TODO @monitz87: Make properties private where appliccable
/**
 * Wrapper class for a Polymath Transaction
 */
export class PolyTransaction<Args = any, Values extends any[] = any[]> extends Entity<void> {
  /**
   * Generate the Poly Transaction's UUID from its identifying properties
   */
  public static generateId() {
    return serialize('transaction', {
      random: v4(),
    });
  }

  /**
   * unique generated identifier of the poly transaction
   */
  public uid: string;

  /**
   * current status of the transaction
   */
  public status: TransactionStatus = TransactionStatus.Idle;

  /**
   * transaction queue to which this transaction belongs
   */
  public transactionQueue: TransactionQueue;

  /**
   * internal promise that resolves when the transaction has finished running
   */
  public promise: Promise<any>;

  /**
   * stores errors thrown while running the transaction (if any)
   */
  public error?: PolymathError;

  /**
   * stores the transaction receipt (if successful)
   */
  public receipt?: TransactionReceiptWithDecodedLogs | string;

  /**
   * type of transaction represented by this instance for display purposes
   */
  public tag: PolyTransactionTag;

  /**
   * transaction hash (available after running)
   */
  public txHash?: string;

  /**
   * arguments with which the transaction will be called
   */
  public args: TransactionSpec<Args, Values, TransactionReceiptWithDecodedLogs | string>['args'];

  /**
   * @hidden
   */
  protected method: TransactionSpec<
    Args,
    Values,
    TransactionReceiptWithDecodedLogs | string
  >['method'];

  /**
   * @hidden
   */
  private postResolvers: PostTransactionResolverArray<
    Values,
    TransactionReceiptWithDecodedLogs | string
  > = ([] as unknown) as PostTransactionResolverArray<
    Values,
    TransactionReceiptWithDecodedLogs | string
  >;

  /**
   * @hidden
   */
  private emitter: EventEmitter;

  /**
   * Creates a poly transaction
   */
  constructor(
    transaction: TransactionSpec<Args, Values, TransactionReceiptWithDecodedLogs | string>,
    transactionQueue: TransactionQueue<any, any>
  ) {
    super();

    if (transaction.postTransactionResolvers) {
      this.postResolvers = transaction.postTransactionResolvers;
    }

    this.emitter = new EventEmitter();
    this.tag = transaction.tag || PolyTransactionTag.Any;
    this.method = transaction.method;
    this.args = transaction.args;
    this.transactionQueue = transactionQueue;
    this.promise = new Promise((res, rej) => {
      this.resolve = res;
      this.reject = rej;
    });
    this.uid = PolyTransaction.generateId();
  }

  /**
   * Convert entity to a POJO (Plain Old Javascript Object)
   */
  public toPojo() {
    const { uid, status, tag, receipt, error, txHash, transactionQueue, args } = this;
    const transactionQueueUid = transactionQueue.uid;

    // do not expose arguments that haven't been resolved
    // TODO @monitz87: type this correctly
    const filteredArgs = pickBy(args, arg => !isPostTransactionResolver(arg));

    return {
      uid,
      transactionQueueUid,
      status,
      tag,
      txHash,
      receipt,
      error,
      /*
       * NOTE @monitz87: we intentionally expose the args as any for the end user
       * until we figure out how to type this properly
       */
      args: filteredArgs as any,
    };
  }

  /**
   * Run the poly transaction and update the transaction status
   */
  public async run() {
    try {
      const receipt = await this.internalRun();
      this.receipt = receipt;

      this.updateStatus(TransactionStatus.Succeeded);
      this.resolve(receipt);
    } catch (err) {
      let error: PolymathError = err;

      if (!(err instanceof PolymathError)) {
        error = new PolymathError({ code: ErrorCode.TransactionReverted, message: err.message });
      }

      if (err.code === ErrorCode.TransactionRejectedByUser) {
        this.updateStatus(TransactionStatus.Rejected);
      } else {
        this.updateStatus(TransactionStatus.Failed);
      }
      this.reject(error);
    }

    await this.promise;
  }

  /**
   * Subscribe to status changes
   *
   * @param listener - callback function that will be called whenever the status changes
   *
   * @returns unsubscribe function
   */
  public onStatusChange = (listener: (transaction: this) => void) => {
    this.emitter.on(Event.StatusChange, listener);

    return () => {
      this.emitter.removeListener(Event.StatusChange, listener);
    };
  };

  /**
   * @hidden
   */
  protected resolve: (val?: any) => void = () => {};

  /**
   * @hidden
   */
  protected reject: (reason?: any) => void = () => {};

  /**
   * @hidden
   */
  private async internalRun() {
    this.updateStatus(TransactionStatus.Unapproved);

    const unwrappedArgs = this.unwrapArgs(this.args);

    const { method } = this;

    let response;

    if (method instanceof Function) {
      response = await method(unwrappedArgs);
    } else {
      const returnedMethod = await method.futureMethod(method.futureValue.result);
      response = await returnedMethod(unwrappedArgs);
    }

    // Set the Transaction as Running once it is approved by the user
    this.updateStatus(TransactionStatus.Running);

    let result: TransactionReceiptWithDecodedLogs | string;

    try {
      if (typeof response !== 'string') {
        this.txHash = response.txHash;
        result = await response.receiptAsync;
      } else {
        result = response;
      }
    } catch (err) {
      // Wrap with PolymathError
      if (err.message.indexOf('MetaMask Tx Signature') > -1) {
        this.error = new PolymathError({
          code: ErrorCode.TransactionRejectedByUser,
        });
      } else {
        this.error = new PolymathError({
          code: ErrorCode.FatalError,
          message: err.message,
        });
      }

      throw this.error;
    }

    await Promise.all(this.postResolvers.map(resolver => resolver.run(result)));

    return result;
  }

  /**
   * @hidden
   */
  private updateStatus = (status: TransactionStatus) => {
    this.status = status;

    /* eslint-disable default-case */
    switch (status) {
      case TransactionStatus.Unapproved: {
        this.emitter.emit(Event.StatusChange, this);
        return;
      }
      case TransactionStatus.Running: {
        this.emitter.emit(Event.StatusChange, this);
        return;
      }
      case TransactionStatus.Succeeded: {
        this.emitter.emit(Event.StatusChange, this);
        return;
      }
      case TransactionStatus.Failed: {
        this.emitter.emit(Event.StatusChange, this, this.error);
        return;
      }
      case TransactionStatus.Rejected: {
        this.emitter.emit(Event.StatusChange, this);
      }
    }
    /* eslint-enable default-case */
  };

  /**
   * @hidden
   */
  private unwrapArg<T>(arg: PostTransactionResolver<T> | T) {
    if (isPostTransactionResolver<T>(arg)) {
      return arg.result;
    }
    return arg;
  }

  /**
   * @hidden
   */
  private unwrapArgs<T>(args: TransactionSpec<T>['args']) {
    return mapValues(args, (arg: any) => {
      return isPlainObject(arg)
        ? mapValuesDeep(arg as { [key: string]: any }, (val: any) => {
            return this.unwrapArg(val);
          })
        : this.unwrapArg(arg);
    }) as T;
  }

  /**
   * Hydrate the entity
   */
  public _refresh() {}
}
