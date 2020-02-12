/**
 * @packageDocumentation
 * @module Procedures
 */

import { Procedure } from './Procedure';
import { ProcedureType, ErrorCode, SignDisableControllerAckProcedureArgs } from '../types';
import { PolymathError } from '../PolymathError';

/**
 * Procedure that signs an acknowledgement to permanently disable a Security Token's Controller functionality
 */
export class SignDisableControllerAck extends Procedure<SignDisableControllerAckProcedureArgs> {
  public type = ProcedureType.SignDisableControllerAck;

  /**
   * Sign data to confirm the intent of permanently disabling the Security Token's Controller functionality
   */
  public async prepareTransactions() {
    const { symbol } = this.args;
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

    await this.addSignatureRequest(securityToken.signDisableControllerAck)({});
  }
}
