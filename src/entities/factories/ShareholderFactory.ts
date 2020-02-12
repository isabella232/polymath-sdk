/**
 * @packageDocumentation
 * @module Entities.Factories
 */

import { ModuleName } from '@polymathnetwork/contract-wrappers';
import { Factory } from './Factory';
import { Context } from '../../Context';
import { SecurityToken } from '../SecurityToken';
import { PolymathError } from '../../PolymathError';
import { ErrorCode } from '../../types';
import { Shareholder, Params, UniqueIdentifiers } from '../Shareholder';

/**
 * Factory generates information for a Shareholder entity
 */
export class ShareholderFactory extends Factory<Shareholder, Params, UniqueIdentifiers> {
  /**
   * @hidden
   */
  protected generateProperties = async (uid: string) => {
    const {
      context: { contractWrappers },
    } = this;
    const { securityTokenId, address } = Shareholder.unserialize(uid);
    const { symbol } = SecurityToken.unserialize(securityTokenId);

    let securityToken;

    try {
      securityToken = await contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(
        symbol
      );
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.FetcherValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    const generalTransferManager = (await contractWrappers.getAttachedModules(
      { moduleName: ModuleName.GeneralTransferManager, symbol },
      { unarchived: true }
    ))[0];

    const [
      [{ canReceiveAfter, canSendAfter, expiryTime }],
      { isAccredited, canNotBuyFromSTO },
      balance,
    ] = await Promise.all([
      generalTransferManager.getKYCData({ investors: [address] }),
      generalTransferManager.getInvestorFlags({ investor: address }),
      securityToken.balanceOf({ owner: address }),
    ]);

    return {
      balance,
      canSendAfter,
      canReceiveAfter,
      kycExpiry: expiryTime,
      isAccredited,
      canBuyFromSto: !canNotBuyFromSTO,
      securityTokenId,
      securityTokenSymbol: symbol,
    };
  };

  /**
   * Create an instance of the Shareholder Factory
   */
  constructor(context: Context) {
    super(Shareholder, context);
  }
}
