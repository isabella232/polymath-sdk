/**
 * @packageDocumentation
 * @module Procedures
 */

import { Procedure } from './Procedure';
import { ProcedureType, ErrorCode, SignTransferDataProcedureArgs } from '../types';
import { PolymathError } from '../PolymathError';

/**
 * Procedure that signs KYC data for transfers.
 * This signature can be used to simulate updates to KYC data when checking if a transfer can be made or to actually modify said data at the moment of performing a transfer without having to do it in a separate transaction.
 * The signature has a period of validity which is specified by the parameters passed to the procedure
 */
export class SignTransferData extends Procedure<SignTransferDataProcedureArgs> {
  public type = ProcedureType.SignTransferData;

  /**
   * Sign KYC data, passing the valid dates and extra kyc data
   *
   * Note this procedure will fail if:
   * - The signature validity period starting date (validFrom) is later than the end date (validTo)
   * - The validity period end date (validTo) is in the past
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
