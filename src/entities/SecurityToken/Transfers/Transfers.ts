import {
  BigNumber,
  TransferStatusCode as RawTransferStatusCode,
} from '@polymathnetwork/contract-wrappers';
import { SubModule } from '../SubModule';
import { Restrictions } from './Restrictions';
import { SecurityToken } from '../SecurityToken';
import { Context } from '../../../Context';
import { TransferSecurityTokens } from '../../../procedures/TransferSecurityTokens';
import { TransferStatusCode, ErrorCode } from '../../../types';
import { ToggleFreezeTransfers } from '../../../procedures/ToggleFreezeTransfers';
import { PolymathError } from '../../../PolymathError';

export class Transfers extends SubModule {
  public restrictions: Restrictions;

  constructor(securityToken: SecurityToken, context: Context) {
    super(securityToken, context);

    this.restrictions = new Restrictions(securityToken, context);
  }

  /**
   * Transfer an amount of Security Tokens to a specified address
   *
   * @param to address that will receive the tokens
   * @param amount amount of tokens to be transferred
   * @param data optional data to be submitted alongside the transfer
   * @param from optional address from which to transfer tokens. Defaults to the current wallet
   */
  public transfer = async (args: {
    to: string;
    amount: BigNumber;
    data?: string;
    from?: string;
  }) => {
    const { symbol } = this.securityToken;
    const { to, amount, data, from } = args;

    const procedure = new TransferSecurityTokens({ symbol, to, amount, data, from }, this.context);
    return procedure.prepare();
  };

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
    let tokenInstance;

    try {
      tokenInstance = await contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(
        symbol
      );
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }
    return tokenInstance.transfersFrozen();
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
   * Validate if a transfer of Security Tokens can be performed. This takes all present transfer restrictions into account
   *
   * @param to address that will receive the tokens
   * @param value amount of tokens to be transferred
   * @param data optional data to be submitted alongside the transfer
   * @param from optional address from which to transfer tokens. Defaults to the current wallet
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
        from,
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

    return {
      status: this.getStatusCode(result.statusCode),
      reason: result.reasonCode,
    };
  };

  private getStatusCode = (statusCode: RawTransferStatusCode) => {
    let status;
    if (statusCode === RawTransferStatusCode.TransferFailure) {
      status = TransferStatusCode.TransferFailure;
    } else if (statusCode === RawTransferStatusCode.TransferSuccess) {
      status = TransferStatusCode.TransferSuccess;
    } else if (statusCode === RawTransferStatusCode.InsufficientBalance) {
      status = TransferStatusCode.InsufficientBalance;
    } else if (statusCode === RawTransferStatusCode.InsufficientAllowance) {
      status = TransferStatusCode.InsufficientAllowance;
    } else if (statusCode === RawTransferStatusCode.TransfersHalted) {
      status = TransferStatusCode.TransfersHalted;
    } else if (statusCode === RawTransferStatusCode.FundsLocked) {
      status = TransferStatusCode.FundsLocked;
    } else if (statusCode === RawTransferStatusCode.InvalidSender) {
      status = TransferStatusCode.InvalidSender;
    } else if (statusCode === RawTransferStatusCode.InvalidReceiver) {
      status = TransferStatusCode.InvalidReceiver;
    } else if (statusCode === RawTransferStatusCode.InvalidOperator) {
      status = TransferStatusCode.InvalidOperator;
    } else {
      throw new PolymathError({
        code: ErrorCode.FatalError,
        message: `Status code ${statusCode} not supported`,
      });
    }

    return status;
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
