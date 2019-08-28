import { EventEmitter } from 'events';
import v4 from 'uuid/v4';
import {
  TransactionSpec,
  MaybeResolver,
  ProcedureType,
  TransactionQueueStatus,
  Fees,
} from '../types';
import { Entity } from './Entity';
import { PolyTransaction } from './PolyTransaction';
import { isPostTransactionResolver } from '../PostTransactionResolver';
import { serialize } from '../utils';

enum Events {
  StatusChange = 'StatusChange',
  TransactionStatusChange = 'TransactionStatusChange',
}

export class TransactionQueue<Args extends any = any, ReturnType extends any = void> extends Entity<
  void
> {
  public static generateId() {
    return serialize('transaction', {
      random: v4(),
    });
  }

  public readonly entityType: string = 'transactionQueue';

  public procedureType: ProcedureType;

  public uid: string;

  public transactions: PolyTransaction[];

  public status: TransactionQueueStatus = TransactionQueueStatus.Idle;

  public args: Args;

  public error?: Error;

  public fees: Fees;

  private promise: Promise<ReturnType>;

  private queue: PolyTransaction[] = [];

  private returnValue: MaybeResolver<ReturnType>;

  private emitter: EventEmitter;

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

  public onStatusChange(listener: (transactionQueue: this) => void) {
    this.emitter.on(Events.StatusChange, listener);

    return () => {
      this.emitter.removeListener(Events.StatusChange, listener);
    };
  }

  public onTransactionStatusChange(
    listener: (transaction: PolyTransaction, transactionQueue: this) => void
  ) {
    this.emitter.on(Events.TransactionStatusChange, listener);

    return () => {
      this.emitter.removeListener(Events.TransactionStatusChange, listener);
    };
  }

  protected resolve: (val?: ReturnType) => void = () => {};

  protected reject: (reason?: any) => void = () => {};

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
      }
    }
  };

  private async executeTransactionQueue() {
    const nextTransaction = this.queue.shift();

    if (!nextTransaction) {
      return;
    }

    await nextTransaction.run();

    await this.executeTransactionQueue();
  }

  public _refresh(_params: Partial<void>) {}
}
