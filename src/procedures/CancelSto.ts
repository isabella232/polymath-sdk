import { Procedure } from './Procedure';
import { ProcedureTypes, PolyTransactionTags, CancelStoArgs, ErrorCodes } from '../types';
import { PolymathError } from '../PolymathError';
import { isValidAddress } from '../utils';

export class CancelSto extends Procedure<CancelStoArgs> {
  public type = ProcedureTypes.CancelSto;

  public async prepareTransactions() {
    const { symbol, stoModuleAddress, custodianAddress, value } = this.args;
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

    const stoModule = await securityToken.getStoModule({ address: stoModuleAddress });
    if (!stoModule) {
      throw new PolymathError({
        code: ErrorCodes.ProcedureValidationError,
        message: `module ${stoModuleAddress} is either archived or hasn't been enabled.`,
      });
    }

    /**
     * Transactions
     */

    const tokenOwner = await securityToken.owner();
    const logMessage = 'canceling STO';

    await this.addTransaction(stoModule.pause, {
      tag: PolyTransactionTags.CancelSto,
    })();

    await this.addTransaction(securityToken.forceTransfer, {
      tag: PolyTransactionTags.CancelSto,
    })({ from: custodianAddress, to: tokenOwner, value, data: '', log: logMessage });
  }
}
