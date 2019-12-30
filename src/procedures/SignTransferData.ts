import { Procedure } from './Procedure';
import { ProcedureType, ErrorCode, SignTransferDataProcedureArgs } from '../types';
import { PolymathError } from '../PolymathError';

export class SignTransferData extends Procedure<SignTransferDataProcedureArgs> {
  public type = ProcedureType.SignTransferData;

  public async prepareTransactions() {
    const { kycData, validFrom, validTo, symbol } = this.args;
    const { contractWrappers } = this.context;

    let securityToken;

    try {
      securityToken = await contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(
        symbol
      );
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    if (validFrom >= validTo) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: 'Signature validity lower bound must be at an earlier date than the upper bound',
      });
    }

    if (validTo < new Date()) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: "Signature validity upper bound can't be in the past",
      });
    }

    const investorsData = kycData.map(({ kycExpiry, address, ...rest }) => ({
      expiryTime: kycExpiry,
      investorAddress: address,
      ...rest,
    }));

    await this.addSignatureRequest(securityToken.signTransferData)({
      validFrom,
      validTo,
      investorsData,
    });
  }
}
