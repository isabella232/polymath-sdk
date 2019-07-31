import { TransactionReceiptWithDecodedLogs } from '@polymathnetwork/contract-wrappers';
import {
  TransactionSpec,
  ErrorCode,
  LowLevelMethod,
  MapMaybeResolver,
  MaybeResolver,
  ProcedureType,
  PolyTransactionTag,
} from '../types';
import { TransactionQueue } from '../entities/TransactionQueue';
import { Context } from '../Context';
import { PostTransactionResolver } from '../PostTransactionResolver';
import { PolymathError } from '../PolymathError';

export interface ProcedureClass<Args = any> {
  new (args: Args, context: Context): Procedure<Args>;
}

// NOTE @RafaelVidaurre: We could add a preparation state cache to avoid repeated transactions and bad validations
export abstract class Procedure<Args, ReturnType = any> {
  public type: ProcedureType = ProcedureType.UnnamedProcedure;

  protected args: Args;

  protected context: Context;

  private transactions: TransactionSpec[] = [];

  constructor(args: Args, context: Context) {
    this.args = args;
    this.context = context;
  }

  /**
   * Mandatory method that builds a list of transactions that will be
   * run.
   */

  public prepare = async () => {
    const returnValue = await this.prepareTransactions();

    const transactionQueue = new TransactionQueue<Args, ReturnType>(
      this.transactions,
      this.type,
      this.args,
      returnValue
    );

    return transactionQueue;
  };

  /**
   * Appends a Procedure into the TransactionQueue's queue. This defines
   * what will be run by the TransactionQueue when it is started.
   *
   * @param Proc A Procedure that will be run in the Procedure's TransactionQueue
   * @param options.resolver An asynchronous callback used to provide runtime data after
   * the added transaction has finished successfully
   */
  public addProcedure<A, R extends any = any>(
    Proc: ProcedureClass<A>,
    {
      resolver = (() => {}) as () => Promise<R>,
    }: {
      resolver?: (receipt: TransactionReceiptWithDecodedLogs) => Promise<R>;
    } = {}
  ) {
    return async (args: A) => {
      const postTransactionResolver = new PostTransactionResolver(resolver);
      const operation = new Proc(args, this.context);

      try {
        await operation.prepareTransactions();
      } catch (err) {
        // Only throw if this is a validation error, otherwise it will have
        // already propagated on the outside
        if (err.code === ErrorCode.ProcedureValidationError) {
          throw err;
        } else if (!err.code) {
          throw new PolymathError({
            code: ErrorCode.FatalError,
            message: err.message,
          });
        }
      }
      const { transactions } = operation;
      this.transactions = [...this.transactions, ...transactions];
      return postTransactionResolver;
    };
  }

  /**
   * Appends a method into the TransactionQueue's queue. This defines
   * what will be run by the TransactionQueue when it is started.
   *
   * @param method A method that will be run in the Procedure's TransactionQueue
   * @param option.tag An optional tag for SDK users to identify this transaction, this
   * can be used for doing things such as mapping descriptions to tags in the UI
   * @param options.resolver An asynchronous callback used to provide runtime data after
   * the added transaction has finished successfully
   */
  public addTransaction<A, R extends any = any>(
    method: LowLevelMethod<A>,
    {
      tag,
      resolver = (() => {}) as () => Promise<R>,
    }: {
      tag?: PolyTransactionTag;
      resolver?: (receipt: TransactionReceiptWithDecodedLogs) => Promise<R>;
    } = {}
  ) {
    return async (args: MapMaybeResolver<A>) => {
      const postTransactionResolver = new PostTransactionResolver(resolver);

      const transaction = {
        method,
        args,
        postTransactionResolver,
        tag,
      };

      this.transactions.push(transaction);

      return postTransactionResolver;
    };
  }

  protected abstract prepareTransactions(): Promise<
    MaybeResolver<ReturnType | undefined> | undefined
  >;
}
