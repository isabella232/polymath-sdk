import { BigNumber } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import { TransferErc20ProcedureArgs, ErrorCode, ProcedureType, PolyTransactionTag } from '../types';
import { PolymathError } from '../PolymathError';

/**
 * Procedure to transfer funds of an ERC20 token. If no token address is specified, it defaults to POLY
 */
export class TransferErc20 extends Procedure<TransferErc20ProcedureArgs> {
  public type = ProcedureType.TransferErc20;

  public async prepareTransactions() {
    const { amount, receiver, tokenAddress, owner } = this.args;
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
      if (isTestnet && address.toUpperCase() === polyTokenAddress.toUpperCase()) {
        await this.addTransaction(contractWrappers.getPolyTokens, {
          tag: PolyTransactionTag.GetTokens,
        })({
          amount: amount.minus(balance).decimalPlaces(0, BigNumber.ROUND_HALF_UP),
          address: ownerAddress,
        });
      } else {
        throw new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: 'Not enough funds',
        });
      }
    }

    await this.addTransaction(token.transfer, {
      tag: PolyTransactionTag.TransferErc20,
    })({ to: receiver, value: amount });
  }
}
