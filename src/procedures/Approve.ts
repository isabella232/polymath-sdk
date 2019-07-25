import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import { ApproveProcedureArgs, ErrorCode, ProcedureType, PolyTransactionTag } from '../types';
import { PolymathError } from '../PolymathError';

export class Approve extends Procedure<ApproveProcedureArgs> {
  public type = ProcedureType.Approve;

  public async prepareTransactions() {
    const { amount, spender, tokenAddress, owner } = this.args;
    const { contractWrappers, currentWallet } = this.context;

    let ownerAddress: string;

    if (owner) {
      ownerAddress = owner;
    } else if (currentWallet) {
      ({ address: ownerAddress } = currentWallet);
    } else {
      throw new PolymathError({
        message: "No default account set. You must pass the owner's address as a parameter",
        code: ErrorCode.ProcedureValidationError,
      });
    }

    const { polyToken } = contractWrappers;

    let token;

    if (tokenAddress) {
      try {
        token = await contractWrappers.getERC20TokenWrapper({ address: tokenAddress });
      } catch (err) {
        throw new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: 'The supplied address does not correspond to an ERC20 token',
        });
      }
    } else {
      token = polyToken;
    }

    const balance = await token.balanceOf({ owner: ownerAddress });

    const address = await token.address();
    const polyTokenAddress = await polyToken.address();

    const isTestnet = await contractWrappers.isTestnet();

    if (balance.lt(amount)) {
      if (isTestnet) {
        if (address.toUpperCase() === polyTokenAddress.toUpperCase()) {
          await this.addTransaction(contractWrappers.getPolyTokens, {
            tag: PolyTransactionTag.GetTokens,
          })({
            amount: amount.minus(balance).decimalPlaces(0, BigNumber.ROUND_HALF_UP),
            address: ownerAddress,
          });
        }
      } else {
        throw new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: 'Not enough funds',
        });
      }
    }

    const allowance = await token.allowance({
      spender,
      owner: ownerAddress,
    });
    const hasEnoughAllowance = allowance.gte(amount);

    if (hasEnoughAllowance) {
      return;
    }

    await this.addTransaction(token.approve, {
      tag: PolyTransactionTag.Approve,
    })({ spender, value: amount });
  }
}
