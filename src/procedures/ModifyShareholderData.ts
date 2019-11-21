import { ModuleName, FlagsType, conversionUtils } from '@polymathnetwork/contract-wrappers';
import { uniq } from 'lodash';
import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
  ModifyShareholderDataProcedureArgs,
} from '../types';
import { PolymathError } from '../PolymathError';
import { Shareholder, SecurityToken } from '../entities';

const { dateToBigNumber } = conversionUtils;

export class ModifyShareholderData extends Procedure<
  ModifyShareholderDataProcedureArgs,
  Shareholder[]
> {
  public type = ProcedureType.ModifyShareholderData;

  public async prepareTransactions() {
    const { symbol, shareholderData } = this.args;
    const { contractWrappers, factories } = this.context;

    if (
      shareholderData.some(({ canReceiveAfter, canSendAfter, kycExpiry }) =>
        [canReceiveAfter, canSendAfter, kycExpiry].some(date => date.getTime() === 0)
      )
    ) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message:
          "Cannot set dates to epoch. If you're trying to revoke a shareholder's KYC, use .revokeKyc()",
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

    const shareholders = await securityToken.shareholders.getShareholders();

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

    shareholderData.forEach(
      ({
        address,
        canSendAfter: sendDate,
        canReceiveAfter: receiveDate,
        kycExpiry,
        isAccredited,
        canBuyFromSto,
      }) => {
        const thisShareholder = shareholders.find(
          ({ address: shareholderAddress }) => shareholderAddress === address
        );

        if (
          !thisShareholder ||
          !dateToBigNumber(thisShareholder.canSendAfter).eq(dateToBigNumber(sendDate)) ||
          !dateToBigNumber(thisShareholder.canReceiveAfter).eq(dateToBigNumber(receiveDate)) ||
          !dateToBigNumber(thisShareholder.kycExpiry).eq(dateToBigNumber(kycExpiry))
        ) {
          investors.push(address);
          canSendAfter.push(sendDate);
          canReceiveAfter.push(receiveDate);
          expiryTime.push(kycExpiry);
        }

        // Only update flags that will actually change
        // one shareholder entry per modified flag
        // we will sometimes have the same shareholder twice in the array
        if (!thisShareholder || thisShareholder.isAccredited !== isAccredited) {
          investorsForFlags.push(address);
          flag.push(FlagsType.IsAccredited);
          value.push(isAccredited);
        }

        if (!thisShareholder || thisShareholder.canBuyFromSto !== canBuyFromSto) {
          investorsForFlags.push(address);
          flag.push(FlagsType.CanNotBuyFromSto);
          value.push(!canBuyFromSto); // negated since the contract flag represents the opposite
        }
      }
    );

    const uniqueInvestorsForFlags = uniq(investorsForFlags);

    const allAffectedShareholders = uniq([...investors, ...uniqueInvestorsForFlags]);

    const securityTokenId = SecurityToken.generateId({ symbol });

    let newShareholders;

    if (investors.length > 0) {
      newShareholders = await this.addTransaction(gtmModule.modifyKYCDataMulti, {
        tag: PolyTransactionTag.ModifyKycDataMulti,
        resolver: async () => {
          const refreshingShareholders = investors.map(investor => {
            return factories.shareholderFactory.refresh(
              Shareholder.generateId({
                securityTokenId,
                address: investor,
              })
            );
          });

          await Promise.all(refreshingShareholders);

          if (investorsForFlags.length === 0) {
            const fetchingShareholders = allAffectedShareholders.map(shareholder => {
              return factories.shareholderFactory.fetch(
                Shareholder.generateId({
                  securityTokenId,
                  address: shareholder,
                })
              );
            });

            return Promise.all(fetchingShareholders);
          }

          return [];
        },
      })({
        investors,
        canSendAfter,
        canReceiveAfter,
        expiryTime,
      });
    }

    if (investorsForFlags.length > 0) {
      newShareholders = await this.addTransaction(gtmModule.modifyInvestorFlagMulti, {
        tag: PolyTransactionTag.ModifyInvestorFlagMulti,
        resolver: async () => {
          // Only consider one occurence of each investor address
          const refreshingShareholders = uniqueInvestorsForFlags.map(investor => {
            return factories.shareholderFactory.refresh(
              Shareholder.generateId({
                securityTokenId,
                address: investor,
              })
            );
          });

          await Promise.all(refreshingShareholders);

          const fetchingShareholders = allAffectedShareholders.map(shareholder => {
            return factories.shareholderFactory.fetch(
              Shareholder.generateId({
                securityTokenId,
                address: shareholder,
              })
            );
          });

          return Promise.all(fetchingShareholders);
        },
      })({
        investors: investorsForFlags,
        flag,
        value,
      });
    }

    if (!newShareholders) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: 'Modify shareholder data failed: Nothing to modify',
      });
    }

    return newShareholders;
  }
}
