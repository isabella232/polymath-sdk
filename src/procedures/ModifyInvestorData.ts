import { ModuleName, FlagsType } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import {
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
  ModifyInvestorDataProcedureArgs,
} from '../types';
import { PolymathError } from '../PolymathError';

export class ModifyInvestorData extends Procedure<ModifyInvestorDataProcedureArgs> {
  public type = ProcedureType.CreateErc20DividendDistribution;

  // TODO @monitz87: consider returning the updated whitelist
  public async prepareTransactions() {
    const { symbol, investorData } = this.args;
    const { contractWrappers } = this.context;

    try {
      await contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(symbol);
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

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
        message: `Transfer manager module for token "${symbol}" isn't enabled. Please report this issue to the Polymath team`,
      });
    }

    const investors: string[] = [];
    const canSendAfter: Date[] = [];
    const canReceiveAfter: Date[] = [];
    const expiryTime: Date[] = [];

    const investorsForFlags: string[] = [];
    const flag: FlagsType[] = [];
    const value: boolean[] = [];

    investorData.forEach(
      ({
        address,
        canSendAfter: sendDate,
        canReceiveAfter: receiveDate,
        kycExpiry,
        isAccredited,
        canBuyFromSto,
      }) => {
        investors.push(address);
        canSendAfter.push(sendDate);
        canReceiveAfter.push(receiveDate);
        expiryTime.push(kycExpiry);

        // one investor entry per modified flag
        // we will sometimes have the same investor twice in the array
        if (isAccredited !== undefined) {
          investorsForFlags.push(address);
          flag.push(FlagsType.IsAccredited);
          value.push(isAccredited);
        }

        if (canBuyFromSto !== undefined) {
          investorsForFlags.push(address);
          flag.push(FlagsType.CanNotBuyFromSto);
          value.push(!canBuyFromSto); // negated since the contract flag represents the opposite
        }
      }
    );

    await this.addTransaction(gtmModule.modifyKYCDataMulti, {
      tag: PolyTransactionTag.ModifyKycDataMulti,
    })({
      investors,
      canSendAfter,
      canReceiveAfter,
      expiryTime,
    });

    if (investorsForFlags.length === 0) {
      return;
    }

    await this.addTransaction(gtmModule.modifyInvestorFlagMulti, {
      tag: PolyTransactionTag.ModifyInvestorFlagMulti,
    })({
      investors: investorsForFlags,
      flag,
      value,
    });
  }
}
