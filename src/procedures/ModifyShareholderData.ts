import { ModuleName, FlagsType } from '@polymathnetwork/contract-wrappers';
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

export class ModifyShareholderData extends Procedure<
  ModifyShareholderDataProcedureArgs,
  Shareholder[]
> {
  public type = ProcedureType.CreateErc20DividendDistribution;

  // TODO @monitz87: consider returning the updated whitelist
  public async prepareTransactions() {
    const { symbol, shareholderData } = this.args;
    const { contractWrappers, factories } = this.context;

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

        // Only update KYC data that will actually change
        if (
          !thisShareholder ||
          thisShareholder.canSendAfter.getTime() !== sendDate.getTime() ||
          thisShareholder.canReceiveAfter.getTime() !== receiveDate.getTime() ||
          thisShareholder.kycExpiry.getTime() !== kycExpiry.getTime()
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

    if (investors.length === 0 && investorsForFlags.length === 0) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: 'Modify shareholder data failed: Nothing to modify',
      });
    }

    if (investors.length > 0) {
      await this.addTransaction(gtmModule.modifyKYCDataMulti, {
        tag: PolyTransactionTag.ModifyKycDataMulti,
        resolver: async () => {
          const refreshingShareholders = investors.map(investor => {
            return factories.shareholderFactory.refresh(
              Shareholder.generateId({
                securityTokenId: SecurityToken.generateId({ symbol }),
                address: investor,
              })
            );
          });

          return Promise.all(refreshingShareholders);
        },
      })({
        investors,
        canSendAfter,
        canReceiveAfter,
        expiryTime,
      });
    }

    if (investorsForFlags.length > 0) {
      await this.addTransaction(gtmModule.modifyInvestorFlagMulti, {
        tag: PolyTransactionTag.ModifyInvestorFlagMulti,
        resolver: async () => {
          // Only consider one occurence of each investor address
          const refreshingShareholders = uniq(investorsForFlags).map(investor => {
            return factories.shareholderFactory.refresh(
              Shareholder.generateId({
                securityTokenId: SecurityToken.generateId({ symbol }),
                address: investor,
              })
            );
          });

          return Promise.all(refreshingShareholders);
        },
      })({
        investors: investorsForFlags,
        flag,
        value,
      });
    }

    return shareholders;
  }
}
