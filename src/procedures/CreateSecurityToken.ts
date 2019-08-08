import { Procedure } from './Procedure';
import { ApproveErc20 } from './ApproveErc20';
import {
  CreateSecurityTokenProcedureArgs,
  ProcedureType,
  PolyTransactionTag,
  ErrorCode,
} from '../types';
import { PolymathError } from '../PolymathError';

export class CreateSecurityToken extends Procedure<CreateSecurityTokenProcedureArgs> {
  public type = ProcedureType.CreateSecurityToken;

  public async prepareTransactions() {
    const { name, symbol, detailsUrl = '', divisible, treasuryWallet } = this.args;
    const {
      contractWrappers: { securityTokenRegistry },
      currentWallet,
    } = this.context;

    let wallet: string;
    const { address: currentAddress } = currentWallet;

    if (treasuryWallet) {
      wallet = treasuryWallet;
    } else {
      wallet = currentAddress;
    }

    const [isAvailable, isRegisteredByCurrentIssuer, isLaunched] = await Promise.all([
      securityTokenRegistry.isTickerAvailable({ ticker: symbol }),
      securityTokenRegistry.isTickerRegisteredByCurrentIssuer({ ticker: symbol }),
      securityTokenRegistry.isTokenLaunched({ ticker: symbol }),
    ]);

    if (isAvailable) {
      throw new PolymathError({
        code: ErrorCode.ProcedureValidationError,
        message: `The security token symbol ${symbol} hasn\'t been reserved. You need to call "reserveSecurityToken" first.`,
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

    await this.addTransaction(securityTokenRegistry.generateNewSecurityToken, {
      tag: PolyTransactionTag.CreateSecurityToken,
    })({
      name,
      ticker: symbol,
      tokenDetails: detailsUrl,
      divisible,
      protocolVersion: '0',
      treasuryWallet: wallet,
    });
  }
}
