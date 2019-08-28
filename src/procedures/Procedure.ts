import { TransactionReceiptWithDecodedLogs, BigNumber } from '@polymathnetwork/contract-wrappers';
import {
  TransactionSpec,
  ErrorCode,
  LowLevelMethod,
  MapMaybeResolver,
  MaybeResolver,
  ProcedureType,
  PolyTransactionTag,
  Fees,
} from '../types';
import { TransactionQueue } from '../entities/TransactionQueue';
import { Context } from '../Context';
import { PostTransactionResolver } from '../PostTransactionResolver';
import { PolymathError } from '../PolymathError';

export interface ProcedureClass<Args = any, ReturnType extends any = any> {
  new (args: Args, context: Context): Procedure<Args, ReturnType>;
}

// NOTE @RafaelVidaurre: We could add a preparation state cache to avoid repeated transactions and bad validations
export abstract class Procedure<Args, ReturnType = void> {
  public type: ProcedureType = ProcedureType.UnnamedProcedure;

  protected args: Args;

  protected context: Context;

  private transactions: TransactionSpec[] = [];

  private fees: Array<Fees> = [];

  constructor(args: Args, context: Context) {
    this.args = args;
    this.context = context;
  }

  /**
   * Mandatory method that builds a list of transactions that will be
   * run
   */
  public prepare = async () => {
    const returnValue = await this.prepareTransactions();
    const totalFees = this.fees.reduce(
      ({ usd, poly }, { usd: newUsd, poly: newPoly }) => {
        const polySum = poly.plus(newPoly);
        let usdSum;
        if (usd === null && newUsd === null) {
          usdSum = null;
        } else {
          usdSum = (usd || new BigNumber(0)).plus(newUsd || new BigNumber(0));
        }

        return {
          usd: usdSum,
          poly: polySum,
        };
      },
      { usd: null, poly: new BigNumber(0) }
    );

    const transactionQueue = new TransactionQueue(
      this.transactions,
      totalFees,
      returnValue,
      this.args,
      this.type
    );

    return transactionQueue;
  };

  /**
   * Appends a Procedure into the TransactionQueue's queue. This defines
   * what will be run by the TransactionQueue when it is started.
   *
   * @param Proc A Procedure that will be run in the Procedure's TransactionQueue
   *
   * @returns whichever value is returned by the Procedure
   */
  public addProcedure = <A, R extends any = any>(Proc: ProcedureClass<A, R>) => {
    return async (args: A) => {
      const operation = new Proc(args, this.context);
      let returnValue: MaybeResolver<R | undefined>;

      try {
        returnValue = await operation.prepareTransactions();
      } catch (err) {
        // Only throw if this is a validation error, otherwise it will have
        // already propagated on the outside
        if (err.code === ErrorCode.ProcedureValidationError) {
          throw err;
        } else if (!(err instanceof PolymathError)) {
          throw new PolymathError({
            code: ErrorCode.FatalError,
            message: err.message,
          });
        }
      }
      const { transactions, fees } = operation;
      this.fees = [...this.fees, ...fees];
      this.transactions = [...this.transactions, ...transactions];

      return returnValue;
    };
  };

  /**
   * Appends a method into the TransactionQueue's queue. This defines
   * what will be run by the TransactionQueue when it is started.
   *
   * @param method A method that will be run in the Procedure's TransactionQueue
   * @param options.tag An optional tag for SDK users to identify this transaction, this
   * can be used for doing things such as mapping descriptions to tags in the UI
   * @param options.fee Value in POLY of the transaction (defaults to 0)
   * @param options.resolver An asynchronous callback used to provide runtime data after
   * the added transaction has finished successfully
   *
   * @returns a PostTransactionResolver that resolves to the value returned by the resolver function, or undefined if no resolver function was passed
   */
  public addTransaction = <A, R extends any = any>(
    method: LowLevelMethod<A>,
    {
      tag,
      fees,
      resolver = (() => {}) as () => Promise<R>,
    }: {
      tag?: PolyTransactionTag;
      fees?: Fees;
      resolver?: (receipt: TransactionReceiptWithDecodedLogs) => Promise<R>;
    } = {}
  ) => {
    return async (args: MapMaybeResolver<A>) => {
      const postTransactionResolver = new PostTransactionResolver(resolver);

      if (fees) {
        this.fees.push(fees);
      }

      const transaction = {
        method,
        args,
        postTransactionResolver,
        tag,
      };

      this.transactions.push(transaction);

      return postTransactionResolver;
    };
  };

  protected abstract prepareTransactions(): Promise<MaybeResolver<ReturnType>>;
}
