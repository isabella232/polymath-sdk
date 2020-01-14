import { Procedure } from './Procedure';
import { ProcedureType, ErrorCode, SignTransferDataProcedureArgs } from '../types';
import { PolymathError } from '../PolymathError';

/**
 * Procedure to sign valid transfer data
 */
export class SignTransferData extends Procedure<SignTransferDataProcedureArgs> {
  public type = ProcedureType.SignTransferData;

  /**
   * - Sign transfer data, passing the valid dates and extra kyc data
   *
   * Note this procedure will fail if:
   * - The signature validity lower bound (valid from) is earlier than the upper bound (valid to)
   * - The upper bound (valid to) is in the past
   */
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
