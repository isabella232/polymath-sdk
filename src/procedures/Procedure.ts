import { TransactionReceiptWithDecodedLogs, BigNumber } from '@polymathnetwork/contract-wrappers';
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
import { Entity } from '../entities';
import { Polymath } from '../Polymath';

export interface ProcedureClass<
  Args = any,
  Caller extends Entity | Polymath | void = void,
  ReturnType extends any = any
> {
  new (args: Args, context: Context, caller: Caller): Procedure<Args, Caller, ReturnType>;
}

// NOTE @RafaelVidaurre: We could add a preparation state cache to avoid repeated transactions and bad validations
// TODO @monitz87 remove all caller related code once entities can build themselves
export abstract class Procedure<
  Args,
  Caller extends Entity | Polymath | void = void,
  ReturnType = void
> {
  public type: ProcedureType = ProcedureType.UnnamedProcedure;

  protected args: Args;

  protected context: Context;

  protected caller: Caller;

  private transactions: TransactionSpec[] = [];

  private fees: Array<BigNumber> = [];

  constructor(args: Args, context: Context, caller: Caller) {
    this.args = args;
    this.context = context;
    this.caller = caller;
  }

  /**
   * Mandatory method that builds a list of transactions that will be
   * run
   */
  public prepare = async () => {
    const returnValue = await this.prepareTransactions();
    const totalFees = this.fees.reduce((total, fee) => total.plus(fee), new BigNumber(0));

    const transactionQueue = new TransactionQueue<Args, ReturnType>(
      this.transactions,
      totalFees,
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
   *
   * @returns whichever value is returned by the Procedure
   */
  public addProcedure = <A, R extends any = any>(Proc: ProcedureClass<A, void, R>) => {
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
   * @param option.tag An optional tag for SDK users to identify this transaction, this
   * can be used for doing things such as mapping descriptions to tags in the UI
   * @param option.fee Value in POLY of the transaction (defaults to 0)
   * @param options.resolver An asynchronous callback used to provide runtime data after
   * the added transaction has finished successfully
   *
   * @returns a PostTransactionResolver that resolves to the value returned by the resolver function, or undefined if no resolver function was passed
   */
  public addTransaction = <A, R extends any = any>(
    method: LowLevelMethod<A>,
    {
      tag,
      fee,
      resolver = (() => {}) as () => Promise<R>,
    }: {
      tag?: PolyTransactionTag;
      fee?: BigNumber;
      resolver?: (receipt: TransactionReceiptWithDecodedLogs) => Promise<R>;
    } = {}
  ) => {
    return async (args: MapMaybeResolver<A>) => {
      const postTransactionResolver = new PostTransactionResolver(resolver);

      if (fee) {
        this.fees.push(fee);
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

  protected abstract prepareTransactions(): Promise<
    MaybeResolver<ReturnType | undefined> | undefined
  >;
}
