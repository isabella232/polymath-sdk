import { SubModule } from '../SubModule';
import { Restrictions } from './Restrictions';
import { SecurityToken } from '../SecurityToken';
import { Context } from '../../../Context';
import { PolymathError } from '../../../PolymathError';
import { ErrorCode } from '../../../types';
import { ToggleFreezeTransfers } from '../../../procedures/ToggleFreezeTransfers';

export class Transfers extends SubModule {
  public restrictions: Restrictions;

  constructor(securityToken: SecurityToken, context: Context) {
    super(securityToken, context);

    this.restrictions = new Restrictions(securityToken, context);
  }

  /**
   * Retrieve whether the transfer of tokens is frozen or not
   * Can be modified with `freeze` and `unfreeze`
   */
  public frozen = async (): Promise<boolean> => {
    const {
      context: { contractWrappers },
      securityToken,
    } = this;

    const { symbol } = securityToken;
    let securityTokenInstance;

    try {
      securityTokenInstance = await contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(
        symbol
      );
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }
    return securityTokenInstance.transfersFrozen();
  };

  /**
   * Freeze transfers of the security token
   */
  public freeze = async () => {
    const { symbol } = this.securityToken;

    const procedure = new ToggleFreezeTransfers({ symbol, freeze: true }, this.context);

    return procedure.prepare();
  };

  /**
   * Unfreeze transfers of the security token
   */
  public unfreeze = async () => {
    const { symbol } = this.securityToken;

    const procedure = new ToggleFreezeTransfers({ symbol, freeze: false }, this.context);

    return procedure.prepare();
  };
}
