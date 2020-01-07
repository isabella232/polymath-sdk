import { BigNumber, TransactionReceiptWithDecodedLogs } from '@polymathnetwork/contract-wrappers';
import {
  TransactionSpec,
  ErrorCode,
  LowLevelMethod,
  MapMaybeResolver,
  MaybeResolver,
  ProcedureType,
  PolyTransactionTag,
  Fees,
  SignatureRequest,
  FutureLowLevelMethod,
  ResolverArray,
  PostTransactionResolverArray,
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

  /*
   * TODO @monitz87: add an array of PostTransactionResolvers whose resolved values get passed
   * as an optional parameter to the resolver functions (same concept as futureValue but for resolver functions)
   */
  /**
   * Appends a method or future method into the TransactionQueue's queue. This defines
   * what will be run by the TransactionQueue when it is started.
   *
   * @param method A method (or future method) that will be run in the Procedure's TransactionQueue.
   * A future method is a transaction that doesn't exist at prepare time
   * (for example a transaction on a module that hasn't been attached but will be by the time the previous transactions are run)
   * @param options.tag An optional tag for SDK users to identify this transaction, this
   * can be used for doing things such as mapping descriptions to tags in the UI
   * @param options.fee Value in POLY of the transaction (defaults to 0)
   * @param options.resolver An asynchronous callback used to provide runtime data after
   * the added transaction has finished successfully
   *
   * @returns a PostTransactionResolver that resolves to the value returned by the resolver function, or undefined if no resolver function was passed
   */
  public addTransaction = <A = any, R extends any[] = [void], V extends any = any>(
    method: LowLevelMethod<A> | FutureLowLevelMethod<V, A>,
    {
      tag,
      fees,
      resolvers = ([] as unknown) as ResolverArray<R>,
    }: {
      tag?: PolyTransactionTag;
      fees?: Fees;
      resolvers?: ResolverArray<R>;
    } = {}
  ) => {
    return async (args: MapMaybeResolver<A>) => {
      const postTransactionResolvers = resolvers.map(
        resolver => new PostTransactionResolver(resolver)
      ) as PostTransactionResolverArray<R, TransactionReceiptWithDecodedLogs>;

      if (fees) {
        this.fees.push(fees);
      }

      const transaction = {
        method,
        args,
        postTransactionResolvers,
        tag,
      };

      this.transactions.push(transaction);

      return postTransactionResolvers;
    };
  };

  /**
   * Appends a signature request into the TransactionQueue's queue. This defines
   * what will be run by the TransactionQueue when it is started.
   *
   * @param request A signature request that will be run in the Procedure's TransactionQueue
   *
   * @returns a PostTransactionResolver that resolves to the signed data
   */
  public addSignatureRequest = <A>(request: SignatureRequest<A>) => {
    return async (args: MapMaybeResolver<A>) => {
      const postTransactionResolver = new PostTransactionResolver<string, string>(
        async receipt => receipt
      );

      const transaction = {
        method: request,
        args,
        postTransactionResolvers: [postTransactionResolver],
        tag: PolyTransactionTag.Signature,
      };

      this.transactions.push(transaction);

      return postTransactionResolver;
    };
  };

  protected abstract prepareTransactions(): Promise<MaybeResolver<ReturnType>>;
}
