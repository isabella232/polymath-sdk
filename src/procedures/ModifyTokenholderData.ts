import {
  ModuleName,
  FlagsType,
  conversionUtils,
  TransactionParams,
} from '@polymathnetwork/contract-wrappers';
import { uniq } from 'lodash';
import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
  ModifyTokenholderDataProcedureArgs,
} from '../types';
import { PolymathError } from '../PolymathError';
import { Tokenholder, SecurityToken } from '../entities';

const { dateToBigNumber } = conversionUtils;

/**
 * Procedure that modifies data for a list of (potential) tokenholders. The data that can be modified is:
 *
 * - KYC data (sale/buy lockup dates and KYC expiry)
 * - Whether the tokenholder is accredited
 * - Whether the tokenholder can buy from an STO
 */
export class ModifyTokenholderData extends Procedure<
  ModifyTokenholderDataProcedureArgs,
  Tokenholder[]
> {
  public type = ProcedureType.ModifyTokenholderData;

  /**
   * Update tokenholder data for a subset of addresses
   *
   * Note that this procedure will fail if:
   * - You're trying to set the dates to 0 (there is a special "RevokeKyc" procedure for that)
   * - The Security Token doesn't exist
   * - There is no difference between the "new" data and the data already present in the contract
   */
  public async prepareTransactions() {
    const { symbol, tokenholderData } = this.args;
    const { contractWrappers, factories } = this.context;

    if (
      tokenholderData.some(({ canReceiveAfter, canSendAfter, kycExpiry }) =>
        [canReceiveAfter, canSendAfter, kycExpiry].some(date => date.getTime() === 0)
      )
    ) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message:
          "Cannot set dates to epoch. If you're trying to revoke a tokenholder's KYC, use .revokeKyc()",
      });
    }

    try {
      await contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(symbol);
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    const securityToken = await factories.securityTokenFactory.fetch(
      SecurityToken.generateId({ symbol })
    );

    const tokenholders = await securityToken.tokenholders.getTokenholders();

    const gtmModule = (await contractWrappers.getAttachedModules(
      {
        moduleName: ModuleName.GeneralTransferManager,
        symbol,
      },
      { unarchived: true }
    ))[0];

    if (!gtmModule) {
      throw new PolymathError({
        code: ErrorCode.FatalError,
        message: `General Transfer Manager for token "${symbol}" isn't enabled. Please report this issue to the Polymath team`,
      });
    }

    const investors: string[] = [];
    const canSendAfter: Date[] = [];
    const canReceiveAfter: Date[] = [];
    const expiryTime: Date[] = [];

    const investorsForFlags: string[] = [];
    const flag: FlagsType[] = [];
    const value: boolean[] = [];

    tokenholderData.forEach(
      ({
        address,
        canSendAfter: sendDate,
        canReceiveAfter: receiveDate,
        kycExpiry,
        isAccredited,
        canBuyFromSto,
      }) => {
        const thisTokenholder = tokenholders.find(
          ({ address: tokenholderAddress }) => tokenholderAddress === address
        );

        if (
          !thisTokenholder ||
          !dateToBigNumber(thisTokenholder.canSendAfter).eq(dateToBigNumber(sendDate)) ||
          !dateToBigNumber(thisTokenholder.canReceiveAfter).eq(dateToBigNumber(receiveDate)) ||
          !dateToBigNumber(thisTokenholder.kycExpiry).eq(dateToBigNumber(kycExpiry))
        ) {
          investors.push(address);
          canSendAfter.push(sendDate);
          canReceiveAfter.push(receiveDate);
          expiryTime.push(kycExpiry);
        }

        // Only update flags that will actually change
        // one tokenholder entry per modified flag
        // we will sometimes have the same tokenholder twice in the array
        if (!thisTokenholder || thisTokenholder.isAccredited !== isAccredited) {
          investorsForFlags.push(address);
          flag.push(FlagsType.IsAccredited);
          value.push(isAccredited);
        }

        if (!thisTokenholder || thisTokenholder.canBuyFromSto !== canBuyFromSto) {
          investorsForFlags.push(address);
          flag.push(FlagsType.CanNotBuyFromSto);
          value.push(!canBuyFromSto); // negated since the contract flag represents the opposite
        }
      }
    );

    const uniqueInvestorsForFlags = uniq(investorsForFlags);

    const allAffectedTokenholders = uniq([...investors, ...uniqueInvestorsForFlags]);

    const securityTokenId = SecurityToken.generateId({ symbol });

    let newTokenholders;

    if (investors.length > 0) {
      [newTokenholders] = await this.addTransaction<
        TransactionParams.GeneralTransferManager.ModifyKYCDataMulti,
        [Tokenholder[]]
      >(gtmModule.modifyKYCDataMulti, {
        tag: PolyTransactionTag.ModifyKycDataMulti,
        resolvers: [
          async () => {
            const refreshingTokenholders = investors.map(investor => {
              return factories.tokenholderFactory.refresh(
                Tokenholder.generateId({
                  securityTokenId,
                  address: investor,
                })
              );
            });

            await Promise.all(refreshingTokenholders);

            if (investorsForFlags.length === 0) {
              const fetchingTokenholders = allAffectedTokenholders.map(tokenholder => {
                return factories.tokenholderFactory.fetch(
                  Tokenholder.generateId({
                    securityTokenId,
                    address: tokenholder,
                  })
                );
              });

              return Promise.all(fetchingTokenholders);
            }

            return [];
          },
        ],
      })({
        investors,
        canSendAfter,
        canReceiveAfter,
        expiryTime,
      });
    }

    if (investorsForFlags.length > 0) {
      [newTokenholders] = await this.addTransaction<
        TransactionParams.GeneralTransferManager.ModifyInvestorFlagMulti,
        [Tokenholder[]]
      >(gtmModule.modifyInvestorFlagMulti, {
        tag: PolyTransactionTag.ModifyInvestorFlagMulti,
        resolvers: [
          async () => {
            // Only consider one occurence of each investor address
            const refreshingTokenholders = uniqueInvestorsForFlags.map(investor => {
              return factories.tokenholderFactory.refresh(
                Tokenholder.generateId({
                  securityTokenId,
                  address: investor,
                })
              );
            });

            await Promise.all(refreshingTokenholders);

            const fetchingTokenholders = allAffectedTokenholders.map(tokenholder => {
              return factories.tokenholderFactory.fetch(
                Tokenholder.generateId({
                  securityTokenId,
                  address: tokenholder,
                })
              );
            });

            return Promise.all(fetchingTokenholders);
          },
        ],
      })({
        investors: investorsForFlags,
        flag,
        value,
      });
    }

    if (!newTokenholders) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: 'Modify tokenholder data failed: Nothing to modify',
      });
    }

    return newTokenholders;
  }
}
