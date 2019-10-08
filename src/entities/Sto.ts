import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { Entity } from './Entity';
import { unserialize } from '../utils';
import { StoType, isStoType, Currency, ErrorCode, Role, Feature } from '../types';
import { Investment } from './Investment';
import { PolymathError } from '../PolymathError';
import { Context } from '../Context';
import { PauseSto, ChangeDelegatePermission } from '../procedures';

export interface UniqueIdentifiers {
  securityTokenId: string;
  stoType: StoType;
  address: string;
}

function isUniqueIdentifiers(identifiers: any): identifiers is UniqueIdentifiers {
  const { securityTokenId, stoType, address } = identifiers;

  return typeof securityTokenId === 'string' && typeof address === 'string' && isStoType(stoType);
}

export interface Params {
  securityTokenSymbol: string;
  startTime: Date;
  endTime: Date;
  fundraiseTypes: Currency[];
  raisedAmount: BigNumber;
  soldTokensAmount: BigNumber;
  investorAmount: number;
  investments: Investment[];
  paused: boolean;
  capReached: boolean;
}

export abstract class Sto<P> extends Entity<P> {
  public abstract uid: string;

  public address: string;

  public securityTokenSymbol: string;

  public securityTokenId: string;

  public stoType: StoType;

  public startTime: Date;

  public endTime: Date;

  public raisedAmount: BigNumber;

  public soldTokensAmount: BigNumber;

  public investorAmount: number;

  public investments: Investment[];

  public fundraiseTypes: Currency[];

  public paused: boolean;

  public capReached: boolean;

  protected context: Context;

  public static unserialize(serialized: string) {
    const unserialized = unserialize(serialized);

    if (!isUniqueIdentifiers(unserialized)) {
      throw new PolymathError({
        code: ErrorCode.InvalidUuid,
        message: 'Wrong STO ID format.',
      });
    }

    return unserialized;
  }

  constructor(params: Params & UniqueIdentifiers, context: Context) {
    super();

    const {
      address,
      securityTokenSymbol,
      securityTokenId,
      stoType,
      fundraiseTypes,
      startTime,
      endTime,
      raisedAmount,
      soldTokensAmount,
      investorAmount,
      investments,
      paused,
      capReached,
    } = params;

    this.address = address;
    this.securityTokenSymbol = securityTokenSymbol;
    this.securityTokenId = securityTokenId;
    this.stoType = stoType;
    this.startTime = startTime;
    this.endTime = endTime;
    this.raisedAmount = raisedAmount;
    this.soldTokensAmount = soldTokensAmount;
    this.investorAmount = investorAmount;
    this.investments = investments;
    this.fundraiseTypes = fundraiseTypes;
    this.paused = paused;
    this.capReached = capReached;
    this.context = context;
  }

  /**
   * Pause the offering
   */
  public pause = async () => {
    const { address: stoAddress, stoType, securityTokenSymbol: symbol } = this;

    const procedure = new PauseSto({ stoAddress, stoType, symbol }, this.context);

    return procedure.prepare();
  };

  /**
   * Assigns a role on the STO to a delegate
   *
   * @param delegateAddress wallet address of the delegate
   * @param role role to assign
   * @param description description of the delegate (defaults to empty string, is ignored if the delegate already exists)
   */
  public assignRole = async (args: {
    delegateAddress: string;
    role: Role;
    description?: string;
  }) => {
    const { securityTokenSymbol: symbol } = this;

    const procedure = new ChangeDelegatePermission(
      {
        symbol,
        assign: true,
        ...args,
      },
      this.context
    );

    return procedure.prepare();
  };

  /**
   * Removes a role from a delegate
   *
   * @param delegateAddress wallet address of the delegate
   * @param role role to revoke
   */
  public revokeRole = async (args: { delegateAddress: string; role: Role }) => {
    const { securityTokenSymbol: symbol } = this;

    const procedure = new ChangeDelegatePermission(
      {
        symbol,
        assign: false,
        ...args,
      },
      this.context
    );

    return procedure.prepare();
  };

  public toPojo() {
    const {
      uid,
      securityTokenId,
      securityTokenSymbol,
      fundraiseTypes,
      raisedAmount,
      soldTokensAmount,
      investorAmount,
      investments,
      startTime,
      endTime,
    } = this;

    return {
      uid,
      securityTokenId,
      securityTokenSymbol,
      fundraiseTypes,
      raisedAmount,
      soldTokensAmount,
      investorAmount,
      startTime,
      endTime,
      investments: investments.map(investment => investment.toPojo()),
    };
  }

  public _refresh(params: Partial<Params>) {
    const {
      securityTokenSymbol,
      startTime,
      endTime,
      fundraiseTypes,
      raisedAmount,
      soldTokensAmount,
      investorAmount,
      investments,
      paused,
      capReached,
    } = params;

    if (securityTokenSymbol) {
      this.securityTokenSymbol = securityTokenSymbol;
    }

    if (startTime) {
      this.startTime = startTime;
    }

    if (endTime) {
      this.endTime = endTime;
    }

    if (fundraiseTypes) {
      this.fundraiseTypes = fundraiseTypes;
    }

    if (raisedAmount) {
      this.raisedAmount = raisedAmount;
    }

    if (soldTokensAmount) {
      this.soldTokensAmount = soldTokensAmount;
    }

    if (investorAmount) {
      this.investorAmount = investorAmount;
    }

    if (investments) {
      this.investments = investments;
    }

    if (paused !== undefined) {
      this.paused = paused;
    }

    if (capReached !== undefined) {
      this.capReached = capReached;
    }
  }
}
