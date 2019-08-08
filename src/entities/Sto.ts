import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { Entity } from './Entity';
import { unserialize } from '../utils';
import { StoType, isStoType, Currency, ErrorCode } from '../types';
import { Investment } from './Investment';
import { PolymathError } from '../PolymathError';
import { Context } from '../Context';
import { PauseSto } from '../procedures';

export interface UniqueIdentifiers {
  securityTokenId: string;
  stoType: StoType;
  address: string;
}

function isUniqueIdentifiers(identifiers: any): identifiers is UniqueIdentifiers {
  const { securityTokenId, stoType, address } = identifiers;

  return typeof securityTokenId === 'string' && typeof address === 'string' && isStoType(stoType);
}

export interface Params extends UniqueIdentifiers {
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

export abstract class Sto extends Entity {
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

  constructor(params: Params, context: Context) {
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

  public pause = async () => {
    const { address: stoAddress } = this;

    const procedure = new PauseSto({ stoAddress }, this.context);

    return await procedure.prepare();
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
}
