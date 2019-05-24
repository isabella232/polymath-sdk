import { Procedure } from './Procedure';
import { ProcedureTypes, PolyTransactionTags, CancelSTOArgs, ErrorCodes } from '../types';
import { PolymathError } from '../PolymathError';
import { isValidAddress } from '../utils';

export class CancelSTO extends Procedure<CancelSTOArgs> {
  public type = ProcedureTypes.CancelSTO;

  public async prepareTransactions() {
    const { symbol, stoType, stoModuleAddress, custodianAddress, value } = this.args;
    const { securityTokenRegistry } = this.context;

    /**
     * Validation
     */

    const securityToken = await securityTokenRegistry.getSecurityToken({
      ticker: symbol,
    });

    if (!securityToken) {
      throw new PolymathError({
        code: ErrorCodes.FetcherValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    if (!isValidAddress(stoModuleAddress)) {
      throw new PolymathError({
        code: ErrorCodes.InvalidAddress,
        message: `Invalid module address ${stoModuleAddress}`,
      });
    }

    if (!isValidAddress(custodianAddress)) {
      throw new PolymathError({
        code: ErrorCodes.InvalidAddress,
        message: `Invalid sender (e.g custodian) address ${custodianAddress}`,
      });
    }

    const custodiansBalance = await securityToken.balanceOf({ address: custodianAddress });
    if (custodiansBalance.lt(value)) {
      throw new PolymathError({
        code: ErrorCodes.InsufficientBalance,
        message: `Custodian's balance "${custodiansBalance}" is less than the requested amount "${value}."`,
      });
    }

    const stoModule = await securityToken.getSTOModule({ address: stoModuleAddress, stoType });
    if (!stoModule) {
      throw new PolymathError({
        code: ErrorCodes.ProcedureValidationError,
        message: `${stoType} module is either archived or hasn't been enabled.`,
      });
    }

    /**
     * Transactions
     */

    const tokenOwner = await securityToken.owner();
    const logMessage = 'cancelling the STO';

    await this.addTransaction(stoModule.pause, {
      tag: PolyTransactionTags.CancelSTO,
    })();

    await this.addTransaction(securityToken.forceTransfer, {
      tag: PolyTransactionTags.CancelSTO,
    })({ from: custodianAddress, to: tokenOwner, value, data: '', log: logMessage });
  }
}
