/**
 * @packageDocumentation
 * @module Entities.SecurityToken.Issuance
 */

import { SubModule } from '../SubModule';
import { FreezeIssuance, IssueTokens, SignFreezeIssuanceAck } from '../../../procedures';
import { ErrorCode, IssuanceDataEntry } from '../../../types';
import { Offerings } from './Offerings';
import { SecurityToken } from '../SecurityToken';
import { Context } from '../../../base/Context';

import { PolymathError } from '../../../base/PolymathError';

/**
 * Namespace that handles all Issuance related functionality
 */
export class Issuance extends SubModule {
  public offerings: Offerings;

  /**
   * Create a new Issuance instance
   */
  constructor(securityToken: SecurityToken, context: Context) {
    super(securityToken, context);

    this.offerings = new Offerings(securityToken, context);
  }

  /**
   * Issue a certain amount of tokens to an address. The address must already have been added via `modifyData`. Otherwise,
   * the corresponding shareholder data for that address must be supplied to this method
   * **NOTE: If shareholder data is supplied, client-side validations to verify if the transfer is possible won't be performed**
   *
   * @param args.issuanceData - array that specifies who to issue tokens to and which amounts. Can also contain KYC data
   */
  public issue = async (args: { issuanceData: IssuanceDataEntry[] }) => {
    const procedure = new IssueTokens(
      {
        symbol: this.securityToken.symbol,
        ...args,
      },
      this.context
    );
    return procedure.prepare();
  };

  /**
   * Permanently freeze issuance of the security token
   *
   * @param args.signature - optional signed data. If not passed, signing will be requested when the transaction queue is run. The data can be generated beforehand by the token owner calling `signFreezeAck`
   */
  public freeze = async (args?: { signature?: string }) => {
    const { symbol } = this.securityToken;

    const procedure = new FreezeIssuance({ ...args, symbol }, this.context);

    return procedure.prepare();
  };

  /**
   * Generate a signature string that can be used to permanently freeze issuance of the Security Token
   *
   * **Note that only the owner's signature is valid for this operation**
   */
  public signFreezeAck = async () => {
    const { symbol } = this.securityToken;

    const procedure = new SignFreezeIssuanceAck({ symbol }, this.context);

    return procedure.prepare();
  };

  /**
   * Retrieve whether the issuance of tokens is allowed or not
   * Can be permanently frozen with `freeze`
   */
  public allowed = async (): Promise<Boolean> => {
    const {
      context: { contractWrappers },
      securityToken: { symbol },
    } = this;

    let tokenInstance;

    try {
      tokenInstance = await contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(
        symbol
      );
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }
    return tokenInstance.isIssuable();
  };
}
