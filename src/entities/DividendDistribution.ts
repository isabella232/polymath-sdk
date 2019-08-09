import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { Entity } from './Entity';
import { serialize, unserialize } from '../utils';
import { DividendType, DividendShareholderStatus, isDividendType, ErrorCode } from '../types';
import { PushDividendPayment, WithdrawTaxes } from '../procedures';
import { Context } from '../Context';
import { PolymathError } from '../PolymathError';

interface UniqueIdentifiers {
  securityTokenId: string;
  checkpointId: string;
  dividendType: DividendType;
  index: number;
}

function isUniqueIdentifiers(identifiers: any): identifiers is UniqueIdentifiers {
  const { securityTokenId, checkpointId, dividendType, index } = identifiers;

  return (
    typeof securityTokenId === 'string' &&
    typeof checkpointId === 'string' &&
    typeof index === 'number' &&
    isDividendType(dividendType)
  );
}

interface Params extends UniqueIdentifiers {
  securityTokenSymbol: string;
  created: Date;
  maturity: Date;
  expiry: Date;
  amount: BigNumber;
  claimedAmount: BigNumber;
  totalSupply: BigNumber;
  reclaimed: boolean;
  totalWithheld: BigNumber;
  totalWithheldWithdrawn: BigNumber;
  shareholders: DividendShareholderStatus[];
  name: string;
  currency: string | null;
}

export class DividendDistribution extends Entity {
  public static generateId({
    securityTokenId,
    checkpointId,
    dividendType,
    index,
  }: UniqueIdentifiers) {
    return serialize('dividend', {
      securityTokenId,
      checkpointId,
      dividendType,
      index,
    });
  }

  public static unserialize(serialized: string) {
    const unserialized = unserialize(serialized);

    if (!isUniqueIdentifiers(unserialized)) {
      throw new PolymathError({
        code: ErrorCode.InvalidUuid,
        message: 'Wrong Dividend Distribution ID format.',
      });
    }

    return unserialized;
  }

  public uid: string;

  public index: number;

  public checkpointId: string;

  public dividendType: DividendType;

  public securityTokenSymbol: string;

  public securityTokenId: string;

  public created: Date;

  public maturity: Date;

  public expiry: Date;

  public amount: BigNumber;

  public claimedAmount: BigNumber;

  public totalSupply: BigNumber;

  public reclaimed: boolean;

  public totalWithheld: BigNumber;

  public totalWithheldWithdrawn: BigNumber;

  public shareholders: DividendShareholderStatus[];

  public name: string;

  public currency: string | null;

  protected context: Context;

  constructor(params: Params, context: Context) {
    super();

    const {
      index,
      checkpointId,
      dividendType,
      securityTokenSymbol,
      securityTokenId,
      created,
      maturity,
      expiry,
      amount,
      claimedAmount,
      totalSupply,
      reclaimed,
      totalWithheld,
      totalWithheldWithdrawn,
      shareholders,
      name,
      currency,
    } = params;

    this.index = index;
    this.checkpointId = checkpointId;
    this.dividendType = dividendType;
    this.securityTokenSymbol = securityTokenSymbol;
    this.securityTokenId = securityTokenId;
    this.created = created;
    this.maturity = maturity;
    this.expiry = expiry;
    this.amount = amount;
    this.claimedAmount = claimedAmount;
    this.totalSupply = totalSupply;
    this.reclaimed = reclaimed;
    this.totalWithheld = totalWithheld;
    this.totalWithheldWithdrawn = totalWithheldWithdrawn;
    this.name = name;
    this.shareholders = shareholders;
    this.currency = currency;
    this.context = context;

    this.uid = DividendDistribution.generateId({
      securityTokenId,
      checkpointId,
      dividendType,
      index,
    });
  }

  /**
   * Push payment for this dividend distribution
   */
  public pushPayment = async () => {
    const { securityTokenSymbol: symbol, dividendType, index: dividendIndex } = this;
    const procedure = new PushDividendPayment(
      {
        symbol,
        dividendType,
        dividendIndex,
      },
      this.context
    );
    return procedure.prepare();
  };

  /**
   * Withdraw collected taxes from this dividend distribution
   */
  public withdrawTaxes = async () => {
    const { securityTokenSymbol: symbol, dividendType, index: dividendIndex } = this;
    const procedure = new WithdrawTaxes(
      {
        symbol,
        dividendType,
        dividendIndex,
      },
      this.context
    );
    return procedure.prepare();
  };

  public toPojo() {
    const {
      uid,
      index,
      checkpointId,
      dividendType,
      securityTokenSymbol,
      securityTokenId,
      created,
      maturity,
      expiry,
      amount,
      claimedAmount,
      totalSupply,
      reclaimed,
      totalWithheld,
      totalWithheldWithdrawn,
      shareholders,
      name,
      currency,
    } = this;

    return {
      uid,
      index,
      checkpointId,
      dividendType,
      securityTokenSymbol,
      securityTokenId,
      created,
      maturity,
      expiry,
      amount,
      claimedAmount,
      totalSupply,
      reclaimed,
      totalWithheld,
      totalWithheldWithdrawn,
      shareholders,
      name,
      currency,
    };
  }
}
