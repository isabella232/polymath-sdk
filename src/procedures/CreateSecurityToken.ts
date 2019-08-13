import { SecurityTokenRegistryEvents } from '@polymathnetwork/abi-wrappers';
import { Procedure } from './Procedure';
import { ApproveErc20 } from './ApproveErc20';
import {
  CreateSecurityTokenProcedureArgs,
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
} from '../types';
import { PolymathError } from '../PolymathError';
import { SecurityToken } from '../entities';
import { findEvent } from '../utils';

export class CreateSecurityToken extends Procedure<
  CreateSecurityTokenProcedureArgs,
  void,
  SecurityToken
> {
  public type = ProcedureType.CreateSecurityToken;

  public async prepareTransactions() {
    const { args, context } = this;
    const { name, symbol, detailsUrl = '', divisible, treasuryWallet } = args;
    const {
      contractWrappers: { securityTokenRegistry },
      currentWallet,
    } = context;

    let wallet: string;

    if (treasuryWallet) {
      wallet = treasuryWallet;
    } else {
      wallet = await currentWallet.address();
    }

    const [isAvailable, isRegisteredByCurrentIssuer, isLaunched] = await Promise.all([
      securityTokenRegistry.tickerAvailable({ ticker: symbol }),
      securityTokenRegistry.isTickerRegisteredByCurrentIssuer({
        ticker: symbol,
      }),
      securityTokenRegistry.isTokenLaunched({ ticker: symbol }),
    ]);

    if (isAvailable) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `The security token symbol ${symbol} hasn't been reserved. You need to call "reserveSecurityToken" first.`,
      });
    }

    if (!isRegisteredByCurrentIssuer) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `The security token symbol ${symbol} has already been reserved by another issuer."`,
      });
    }

    if (isLaunched) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `The security token symbol ${symbol} has already been launched."`,
      });
    }

    const fee = await securityTokenRegistry.getSecurityTokenLaunchFee();

    await this.addProcedure(ApproveErc20)({
      amount: fee,
      spender: await securityTokenRegistry.address(),
    });

    const newToken = await this.addTransaction(securityTokenRegistry.generateNewSecurityToken, {
      tag: PolyTransactionTag.CreateSecurityToken,
      fee,
      resolver: async receipt => {
        const { logs } = receipt;

        const event = findEvent({
          eventName: SecurityTokenRegistryEvents.NewSecurityToken,
          logs,
        });

        if (event) {
          const { args: eventArgs } = event;

          const { _ticker, _securityTokenAddress, _name, _owner } = eventArgs;

          return new SecurityToken(
            {
              symbol: _ticker,
              address: _securityTokenAddress,
              name: _name,
              owner: _owner,
            },
            context
          );
        }
        throw new PolymathError({
          code: ErrorCode.UnexpectedEventLogs,
          message:
            "The Security Token was successfully created but the corresponding event wasn't fired. Please repot this issue to the Polymath team.",
        });
      },
    })({
      name,
      ticker: symbol,
      tokenDetails: detailsUrl,
      divisible,
      protocolVersion: '0',
      treasuryWallet: wallet,
    });

    return newToken;
  }
}
