import { BigNumber } from '@0x/utils';
import { SubModule } from '../SubModule';
import { Restrictions } from './Restrictions';
import { SecurityToken } from '../SecurityToken';
import { Context } from '../../../Context';
import { TransferSecurityTokens } from '../../../procedures/TransferSecurityTokens';
import { TransferStatusCode, ErrorCode } from '../../../types';
import { PolymathError } from '../../../PolymathError';

export class Transfers extends SubModule {
  public restrictions: Restrictions;

  constructor(securityToken: SecurityToken, context: Context) {
    super(securityToken, context);

    this.restrictions = new Restrictions(securityToken, context);
  }

  /**
   * Transfer security token
   */
  public transfer = async (args: { to: string; amount: BigNumber; data: string; from: string }) => {
    const { symbol } = this.securityToken;
    const { to, amount, data, from } = args;

    const procedure = new TransferSecurityTokens({ symbol, to, amount, data, from }, this.context);

    return procedure.prepare();
  };

  /**
   * Validates if wallet can transfer a security token
   */
  public canTransfer = async (args: {
    to: string;
    value: BigNumber;
    data?: string;
    from?: string;
  }) => {
    const { to, from, value, data } = args;
    const { symbol } = this.securityToken;

    const {
      contractWrappers: { tokenFactory },
    } = this.context;

    const securityToken = await tokenFactory.getSecurityTokenInstanceFromTicker(symbol);

    let result;

    if (from) {
      result = await securityToken.canTransferFrom({
        from: from!,
        to,
        value,
        data,
      });
    } else {
      result = await securityToken.canTransfer({
        to,
        value,
        data,
      });
    }

    let status;
    if (result.statusCode === '0x50') {
      status = TransferStatusCode.TransferFailure;
    } else if (result.statusCode === '0x51') {
      status = TransferStatusCode.TransferSuccess;
    } else if (result.statusCode === '0x52') {
      status = TransferStatusCode.InsufficientBalance;
    } else if (result.statusCode === '0x53') {
      status = TransferStatusCode.InsufficientAllowance;
    } else if (result.statusCode === '0x54') {
      status = TransferStatusCode.TransfersHalted;
    } else if (result.statusCode === '0x55') {
      status = TransferStatusCode.FundsLocked;
    } else if (result.statusCode === '0x56') {
      status = TransferStatusCode.InvalidSender;
    } else if (result.statusCode === '0x57') {
      status = TransferStatusCode.InvalidReceiver;
    } else if (result.statusCode === '0x58') {
      status = TransferStatusCode.InvalidOperator;
    } else {
      throw new PolymathError({
        code: ErrorCode.FatalError,
        message: `Status code ${result.statusCode} not supported`,
      });
    }

    return {
      status,
      reason: result.reasonCode,
    };
  };
}
