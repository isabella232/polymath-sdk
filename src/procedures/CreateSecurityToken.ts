import { FeeType, TransactionParams } from '@polymathnetwork/contract-wrappers';
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

/**
 * Procedure that creates a new Security Token on the Polymath ecosystem
 */
export class CreateSecurityToken extends Procedure<
  CreateSecurityTokenProcedureArgs,
  SecurityToken
> {
  public type = ProcedureType.CreateSecurityToken;

  /**
   * - Approve the ERC20 token transfer
   * - Create the new Security Token
   *
   * Note that this procedure will fail if the security token symbol hasn't been reserved
   * Note that this procedure will fail if the security token symbol has already been reserved by another issuer
   * Note that this procedure will fail if the security token symbol has already been launched
   */
  public async prepareTransactions() {
    const { args, context } = this;
    const { name, symbol, detailsUrl = '', divisible, treasuryWallet } = args;
    const {
      contractWrappers: { securityTokenRegistry },
      currentWallet,
      factories,
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
        message: `The security token symbol ${symbol} has already been reserved by another issuer.`,
      });
    }

    if (isLaunched) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `The security token symbol ${symbol} has already been launched`,
      });
    }

    const [usdFee, polyFee] = await securityTokenRegistry.getFees({
      feeType: FeeType.StLaunchFee,
    });

    await this.addProcedure(ApproveErc20)({
      amount: polyFee,
      spender: await securityTokenRegistry.address(),
    });

    const [newToken] = await this.addTransaction<
      TransactionParams.SecurityTokenRegistry.NewSecurityToken,
      [SecurityToken]
    >(securityTokenRegistry.generateNewSecurityToken, {
      tag: PolyTransactionTag.CreateSecurityToken,
      fees: {
        usd: usdFee,
        poly: polyFee,
      },
      resolvers: [
        async () => {
          return factories.securityTokenFactory.fetch(SecurityToken.generateId({ symbol }));
        },
      ],
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
