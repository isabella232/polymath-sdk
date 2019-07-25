import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { Polymath } from '../Polymath';
import { Entity } from './Entity';
import { unserialize } from '../utils';
import { StoModuleType, isStoModuleType, FundraiseType } from '../types';
import { Investment } from './Investment';

export interface UniqueIdentifiers {
  securityTokenId: string;
  stoType: StoModuleType;
  address: string;
}

function isUniqueIdentifiers(identifiers: any): identifiers is UniqueIdentifiers {
  const { securityTokenId, stoType, address } = identifiers;

  return (
    typeof securityTokenId === 'string' && typeof address === 'string' && isStoModuleType(stoType)
  );
}

export interface Params extends UniqueIdentifiers {
  securityTokenSymbol: string;
  startTime: Date;
  endTime: Date;
  fundraiseTypes: FundraiseType[];
  raisedAmount: BigNumber;
  soldTokensAmount: BigNumber;
  investorAmount: number;
  investments: Investment[];
  paused: boolean;
  capReached: boolean;
}

export abstract class StoModule extends Entity {
  public abstract uid: string;

  public address: string;

  public securityTokenSymbol: string;

  public securityTokenId: string;

  public stoType: StoModuleType;

  public startTime: Date;

  public endTime: Date;

  public raisedAmount: BigNumber;

  public soldTokensAmount: BigNumber;

  public investorAmount: number;

  public investments: Investment[];

  public fundraiseTypes: FundraiseType[];

  public paused: boolean;

  public capReached: boolean;

  public static unserialize(serialized: string) {
    const unserialized = unserialize(serialized);

    if (!isUniqueIdentifiers(unserialized)) {
      throw new Error('Wrong STO module ID format.');
    }

    return unserialized;
  }

  constructor(params: Params, polyClient?: Polymath) {
    super(polyClient);

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
  }

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
