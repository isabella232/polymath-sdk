/**
 * @packageDocumentation
 * @module Entities
 */

import { EventEmitter } from 'events';
import v4 from 'uuid/v4';
import {
  TransactionSpec,
  MaybeResolver,
  ProcedureType,
  TransactionQueueStatus,
  Fees,
  ErrorCode,
} from '../types';
import { Entity } from './Entity';
import { PolyTransaction } from './PolyTransaction';
import { isPostTransactionResolver } from '../PostTransactionResolver';
import { serialize } from '../utils';
import { PolymathError } from '../PolymathError';

enum Events {
  StatusChange = 'StatusChange',
  TransactionStatusChange = 'TransactionStatusChange',
}

/**
 * Class to manage procedural transaction queues
 */
export class TransactionQueue<Args extends any = any, ReturnType extends any = void> extends Entity<
  void
> {
  /**
   * Generate UUID for this Transaction Queue
   */
  public static generateId() {
    return serialize('transactionQueue', {
      random: v4(),
    });
  }

  /**
   * type of entity
   */
  public readonly entityType: string = 'transactionQueue';

  /**
   * type of procedure being run
   */
  public procedureType: ProcedureType;

  /**
   * generated transaction queue unique identifier
   */
  public uid: string;

  /**
   * array of poly transactions
   */
  public transactions: PolyTransaction[];

  /**
   * status of the transaction queue
   */
  public status: TransactionQueueStatus = TransactionQueueStatus.Idle;

  /**
   * arguments provided to the transaction queue
   */
  public args: Args;

  /**
   * optional error information
   */
  public error?: Error;

  /**
   * total cost of running the transactions in the queue. This does not include gas
   */
  public fees: Fees;

  /**
   * @hidden
   */
  private promise: Promise<ReturnType>;

  /**
   * @hidden
   */
  private queue: PolyTransaction[] = [];

  /**
   * @hidden
   */
  private returnValue: MaybeResolver<ReturnType>;

  /**
   * @hidden
   */
  private emitter: EventEmitter;

  /**
   * Create a transaction queue
   *
   * @param transactions - list of transactions to be run in this queue
   * @param returnValue - value that will be returned by the queue after it is run. It can be a Post Transaction Resolver
   * @param args - arguments with which the Procedure that generated this queue was instanced
   */
  constructor(
    transactions: TransactionSpec[],
    fees: Fees,
    returnValue: MaybeResolver<ReturnType>,
    args: Args,
    procedureType: ProcedureType = ProcedureType.UnnamedProcedure
  ) {
    super();

    this.emitter = new EventEmitter();
    this.procedureType = procedureType;
    this.promise = new Promise((res, rej) => {
      this.resolve = res;
      this.reject = rej;
    });
    this.args = args;
    this.fees = fees;
    this.returnValue = returnValue;

    this.transactions = transactions.map(transaction => {
      const txn = new PolyTransaction<typeof transaction.args>(transaction, this);

      txn.onStatusChange(updatedTransaction => {
        this.emitter.emit(Events.TransactionStatusChange, updatedTransaction, this);
      });

      return txn;
    });

    this.uid = TransactionQueue.generateId();
  }

  /**
   * Convert entity to a POJO (Plain Old Javascript Object)
   */
  public toPojo() {
    const { uid, transactions, status, procedureType, args, fees } = this;

    return {
      uid,
      transactions: transactions.map(transaction => transaction.toPojo()),
      status,
      fees,
      procedureType,
      args,
    };
  }

  /**
   * Run the transactions in the queue
   */
  public run = async () => {
    this.queue = [...this.transactions];
    this.updateStatus(TransactionQueueStatus.Running);

    try {
      await this.executeTransactionQueue();
      this.updateStatus(TransactionQueueStatus.Succeeded);
      const { returnValue } = this;
      let res;

      if (isPostTransactionResolver(returnValue)) {
        res = returnValue.result;
      } else {
        res = returnValue;
      }

      this.resolve(res);
    } catch (err) {
      this.error = err;
      this.updateStatus(TransactionQueueStatus.Failed);
      this.reject(err);
    }

    return this.promise;
  };

  /**
   * Subscribe to status changes on the Transaction Queue
   *
   * @param listener - callback function that will be called whenever the Transaction Queue's status changes
   *
   * @returns unsubscribe function
   */
  public onStatusChange(listener: (transactionQueue: this) => void) {
    this.emitter.on(Events.StatusChange, listener);

    return () => {
      this.emitter.removeListener(Events.StatusChange, listener);
    };
  }

  /**
   * Subscribe to status changes on individual transactions
   *
   * @param listener - callback function that will be called whenever the individual transaction's status changes
   *
   * @returns unsubscribe function
   */
  public onTransactionStatusChange(
    listener: (transaction: PolyTransaction, transactionQueue: this) => void
  ) {
    this.emitter.on(Events.TransactionStatusChange, listener);

    return () => {
      this.emitter.removeListener(Events.TransactionStatusChange, listener);
    };
  }

  /**
   * @hidden
   */
  protected resolve: (val?: ReturnType) => void = () => {};

  /**
   * @hidden
   */
  protected reject: (reason?: any) => void = () => {};

  /**
   * @hidden
   */
  private updateStatus = (status: TransactionQueueStatus) => {
    this.status = status;

    switch (status) {
      case TransactionQueueStatus.Running: {
        this.emitter.emit(Events.StatusChange, this);
        return;
      }
      case TransactionQueueStatus.Succeeded: {
        this.emitter.emit(Events.StatusChange, this);
        return;
      }
      case TransactionQueueStatus.Failed: {
        this.emitter.emit(Events.StatusChange, this, this.error);
        return;
      }
      default: {
        throw new PolymathError({
          code: ErrorCode.FatalError,
          message: `Unknown Transaction Queue status: ${status}`,
        });
      }
    }
  };

  /**
   * @hidden
   */
  private async executeTransactionQueue() {
    const nextTransaction = this.queue.shift();

    if (!nextTransaction) {
      return;
    }

    await nextTransaction.run();

    await this.executeTransactionQueue();
  }

  /**
   * Hydrate the entity
   */
  public _refresh() {}
}
