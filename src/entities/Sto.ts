import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { Entity } from './Entity';
import { unserialize } from '../utils';
import { StoType, isStoType, Currency, ErrorCode, StoRole } from '../types';
import { Investment } from './Investment';
import { PolymathError } from '../PolymathError';
import { Context } from '../Context';
import { PauseSto, AssignStoRole, FinalizeSto, ModifyBeneficialInvestments } from '../procedures';
import { ModifyPreMinting } from '../procedures/ModifyPreMinting';

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
  startDate: Date;
  endDate: Date;
  currencies: Currency[];
  raisedFundsWallet: string;
  unsoldTokensWallet: string;
  raisedAmount: BigNumber;
  soldTokensAmount: BigNumber;
  investorAmount: number;
  investments: Investment[];
  isPaused: boolean;
  capReached: boolean;
  isFinalized: boolean;
  preMintAllowed: boolean;
  beneficialInvestmentsAllowed: boolean;
}

export abstract class Sto<P> extends Entity<P> {
  public abstract uid: string;

  public address: string;

  public securityTokenSymbol: string;

  public securityTokenId: string;

  public stoType: StoType;

  public startDate: Date;

  public endDate: Date;

  public raisedFundsWallet: string;

  public unsoldTokensWallet: string;

  public raisedAmount: BigNumber;

  public soldTokensAmount: BigNumber;

  public investorAmount: number;

  public investments: Investment[];

  public currencies: Currency[];

  public isPaused: boolean;

  public capReached: boolean;

  public isFinalized: boolean;

  public preMintAllowed: boolean;

  public beneficialInvestmentsAllowed: boolean;

  protected context: Context;

  public static unserialize(serialized: string) {
    const unserialized = unserialize(serialized);

    if (!isUniqueIdentifiers(unserialized)) {
      throw new PolymathError({
        code: ErrorCode.InvalidUuid,
        message: 'Wrong STO ID format',
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
      currencies,
      startDate,
      endDate,
      raisedFundsWallet,
      unsoldTokensWallet,
      raisedAmount,
      soldTokensAmount,
      investorAmount,
      investments,
      isPaused,
      capReached,
      isFinalized,
      preMintAllowed,
      beneficialInvestmentsAllowed,
    } = params;

    this.address = address;
    this.securityTokenSymbol = securityTokenSymbol;
    this.securityTokenId = securityTokenId;
    this.stoType = stoType;
    this.startDate = startDate;
    this.endDate = endDate;
    this.raisedFundsWallet = raisedFundsWallet;
    this.unsoldTokensWallet = unsoldTokensWallet;
    this.raisedAmount = raisedAmount;
    this.soldTokensAmount = soldTokensAmount;
    this.investorAmount = investorAmount;
    this.investments = investments;
    this.currencies = currencies;
    this.isPaused = isPaused;
    this.capReached = capReached;
    this.isFinalized = isFinalized;
    this.preMintAllowed = preMintAllowed;
    this.beneficialInvestmentsAllowed = beneficialInvestmentsAllowed;
    this.context = context;
  }

  /**
   * Pauses the offering
   */
  public pause = async () => {
    const { address: stoAddress, stoType, securityTokenSymbol: symbol } = this;

    const procedure = new PauseSto({ stoAddress, stoType, symbol }, this.context);

    return procedure.prepare();
  };

  /**
   * Finalizes the offering. The offering's treasury wallet (or the Security Token's treasury wallet if one was not specified for the offering)
   * will receive the remaining unsold tokens. Throws an error if there are transfer restrictions which do not permit the wallet to receive that amount of tokens
   */
  public finalize = async () => {
    const { address: stoAddress, stoType, securityTokenSymbol: symbol } = this;

    const procedure = new FinalizeSto({ stoAddress, stoType, symbol }, this.context);

    return procedure.prepare();
  };

  /**
   * Enables all offered tokens to be minted instantly at STO start (default behavior is to mint on purchase)
   * Can be disabled *BEFORE* the STO starts by calling disallowPreMinting
   */
  public allowPreMinting = async () => {
    const { address: stoAddress, stoType, securityTokenSymbol: symbol } = this;

    const procedure = new ModifyPreMinting(
      { stoAddress, stoType, symbol, allowPreMinting: true },
      this.context
    );

    return procedure.prepare();
  };

  /**
   * Disables pre-minting of offered tokens at STO start (goes back to default behavior, which is to mint on purchase)
   * Can be re-enabled *BEFORE* the STO starts by calling allowPreMinting
   */
  public disallowPreMinting = async () => {
    const { address: stoAddress, stoType, securityTokenSymbol: symbol } = this;

    const procedure = new ModifyPreMinting(
      { stoAddress, stoType, symbol, allowPreMinting: false },
      this.context
    );

    return procedure.prepare();
  };

  /**
   * Enables a party to invest in the STO on behalf of another party
   */
  public allowBeneficialInvestments = async () => {
    const { address: stoAddress, stoType, securityTokenSymbol: symbol } = this;

    const procedure = new ModifyBeneficialInvestments(
      { stoAddress, stoType, symbol, allowBeneficialInvestments: true },
      this.context
    );

    return procedure.prepare();
  };

  /**
   * Disables the possibility for a party to invest in the STO on behalf of another party
   */
  public disallowBeneficialInvestments = async () => {
    const { address: stoAddress, stoType, securityTokenSymbol: symbol } = this;

    const procedure = new ModifyBeneficialInvestments(
      { stoAddress, stoType, symbol, allowBeneficialInvestments: false },
      this.context
    );

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
    role: StoRole;
    description?: string;
  }) => {
    const { securityTokenSymbol: symbol, address } = this;

    const procedure = new AssignStoRole(
      {
        symbol,
        assign: true,
        stoAddress: address,
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
  public revokeRole = async (args: { delegateAddress: string; role: StoRole }) => {
    const { securityTokenSymbol: symbol, address } = this;

    const procedure = new AssignStoRole(
      {
        symbol,
        assign: false,
        stoAddress: address,
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
      address,
      securityTokenSymbol,
      currencies,
      raisedFundsWallet,
      unsoldTokensWallet,
      raisedAmount,
      soldTokensAmount,
      investorAmount,
      investments,
      startDate,
      endDate,
      capReached,
      isFinalized,
      isPaused,
      preMintAllowed,
      beneficialInvestmentsAllowed,
    } = this;

    return {
      uid,
      securityTokenId,
      address,
      securityTokenSymbol,
      currencies,
      raisedFundsWallet,
      unsoldTokensWallet,
      raisedAmount,
      soldTokensAmount,
      investorAmount,
      startDate,
      endDate,
      capReached,
      isFinalized,
      isPaused,
      preMintAllowed,
      beneficialInvestmentsAllowed,
      investments: investments.map(investment => investment.toPojo()),
    };
  }

  public _refresh(params: Partial<Params>) {
    const {
      securityTokenSymbol,
      startDate,
      endDate,
      currencies,
      raisedFundsWallet,
      unsoldTokensWallet,
      raisedAmount,
      soldTokensAmount,
      investorAmount,
      investments,
      isPaused,
      capReached,
      isFinalized,
      preMintAllowed,
      beneficialInvestmentsAllowed,
    } = params;

    if (securityTokenSymbol) {
      this.securityTokenSymbol = securityTokenSymbol;
    }

    if (startDate) {
      this.startDate = startDate;
    }

    if (endDate) {
      this.endDate = endDate;
    }

    if (currencies) {
      this.currencies = currencies;
    }

    if (raisedFundsWallet) {
      this.raisedFundsWallet = raisedFundsWallet;
    }

    if (unsoldTokensWallet) {
      this.unsoldTokensWallet = unsoldTokensWallet;
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

    if (isPaused !== undefined) {
      this.isPaused = isPaused;
    }

    if (capReached !== undefined) {
      this.capReached = capReached;
    }

    if (isFinalized !== undefined) {
      this.isFinalized = isFinalized;
    }

    if (preMintAllowed !== undefined) {
      this.preMintAllowed = preMintAllowed;
    }

    if (beneficialInvestmentsAllowed !== undefined) {
      this.beneficialInvestmentsAllowed = beneficialInvestmentsAllowed;
    }
  }
}
