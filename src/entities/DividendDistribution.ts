import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { Entity } from './Entity';
import { serialize, unserialize } from '../utils';
import { DividendTokenholderStatus, ErrorCode } from '../types';
import { PushDividendPayment, WithdrawTaxes, PullDividendPayment } from '../procedures';
import { Context } from '../Context';
import { PolymathError } from '../PolymathError';

/**
 * Properties that uniquely identify a Dividend Distribution
 */
export interface UniqueIdentifiers {
  /**
   * security token UUID
   */
  securityTokenId: string;
  /**
   * ordered index of the distribution
   */
  index: number;
}

/**
 * Check if the provided value is of type [[UniqueIdentifiers]]
 */
function isUniqueIdentifiers(identifiers: any): identifiers is UniqueIdentifiers {
  const { securityTokenId, checkpointId, index } = identifiers;

  return (
    typeof securityTokenId === 'string' &&
    typeof checkpointId === 'string' &&
    typeof index === 'number'
  );
}

/**
 * Dividend Distribution constructor parameters
 */
export interface Params {
  securityTokenSymbol: string;
  checkpointId: string;
  /**
   * date at which the dividend was created
   */
  created: Date;
  /**
   * date after which dividend can be claimed
   */
  maturity: Date;
  /**
   * date until which dividend can be claimed
   */
  expiry: Date;
  /**
   * dividend amount
   */
  amount: BigNumber;
  /**
   * amount of dividend claimed so far
   */
  claimedAmount: BigNumber;
  /**
   * total supply at the associated checkpoint
   */
  totalSupply: BigNumber;
  /**
   * true if expiry has passed and issuer has reclaimed remaining dividend
   */
  reclaimed: boolean;
  totalWithheld: BigNumber;
  totalWithheldWithdrawn: BigNumber;
  tokenholders: DividendTokenholderStatus[];
  name: string;
  /**
   * symbol of the currency in which this dividend distribution is being paid
   */
  currency: string | null;
}

/**
 * Class used to manage the dividend distribution functionality
 */
export class DividendDistribution extends Entity<Params> {
  /**
   * Generate the Dividend Distribution's UUID from its identifying properties
   */
  public static generateId({ securityTokenId, index }: UniqueIdentifiers) {
    return serialize('dividend', {
      securityTokenId,
      index,
    });
  }

  /**
   * Unserialize string to a Dividend Distribution object representation
   *
   * @param serialize - Dividend Distribution's serialized representation
   */
  public static unserialize(serialized: string) {
    const unserialized = unserialize(serialized);

    if (!isUniqueIdentifiers(unserialized)) {
      throw new PolymathError({
        code: ErrorCode.InvalidUuid,
        message: 'Wrong Dividend Distribution ID format',
      });
    }

    return unserialized;
  }

  public uid: string;

  public index: number;

  public checkpointId: string;

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

  public tokenholders: DividendTokenholderStatus[];

  public name: string;

  public currency: string | null;

  protected context: Context;

  /**
   * Create a new Dividend Distribution instance
   */
  constructor(params: Params & UniqueIdentifiers, context: Context) {
    super();

    const {
      index,
      checkpointId,
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
      tokenholders,
      name,
      currency,
    } = params;

    this.index = index;
    this.checkpointId = checkpointId;
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
    this.tokenholders = tokenholders;
    this.currency = currency;
    this.context = context;

    this.uid = DividendDistribution.generateId({
      securityTokenId,
      index,
    });
  }

  /**
   * Push payment for this dividend distribution
   */
  public pushPayment = async () => {
    const { securityTokenSymbol: symbol, index: dividendIndex } = this;
    const procedure = new PushDividendPayment(
      {
        symbol,
        dividendIndex,
      },
      this.context
    );
    return procedure.prepare();
  };

  /**
   * Pull payment from this dividend distribution to the current address
   */
  public pullPayment = async () => {
    const { securityTokenSymbol: symbol, index: dividendIndex } = this;
    const procedure = new PullDividendPayment(
      {
        symbol,
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
    const { securityTokenSymbol: symbol, index: dividendIndex } = this;
    const procedure = new WithdrawTaxes(
      {
        symbol,
        dividendIndex,
      },
      this.context
    );
    return procedure.prepare();
  };

  /**
   * Convert entity to POJO (Plain Old Javascript Object)
   */
  public toPojo() {
    const {
      uid,
      index,
      checkpointId,
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
      tokenholders,
      name,
      currency,
    } = this;

    return {
      uid,
      index,
      checkpointId,
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
      tokenholders,
      name,
      currency,
    };
  }

  /**
   * Hydrate the Dividend Distribution entity
   */
  public _refresh(params: Partial<Params>) {
    const {
      securityTokenSymbol,
      checkpointId,
      created,
      maturity,
      expiry,
      amount,
      claimedAmount,
      totalSupply,
      reclaimed,
      totalWithheld,
      totalWithheldWithdrawn,
      tokenholders,
      name,
      currency,
    } = params;

    if (securityTokenSymbol) {
      this.securityTokenSymbol = securityTokenSymbol;
    }

    if (checkpointId) {
      this.checkpointId = checkpointId;
    }

    if (created) {
      this.created = created;
    }

    if (maturity) {
      this.maturity = maturity;
    }

    if (expiry) {
      this.expiry = expiry;
    }

    if (amount) {
      this.amount = amount;
    }

    if (claimedAmount) {
      this.claimedAmount = claimedAmount;
    }

    if (totalSupply) {
      this.totalSupply = totalSupply;
    }

    if (reclaimed !== undefined) {
      this.reclaimed = reclaimed;
    }

    if (totalWithheld) {
      this.totalWithheld = totalWithheld;
    }

    if (totalWithheldWithdrawn) {
      this.totalWithheldWithdrawn = totalWithheldWithdrawn;
    }

    if (tokenholders) {
      this.tokenholders = tokenholders;
    }

    if (name) {
      this.name = name;
    }

    if (currency) {
      this.currency = currency;
    }
  }
}
