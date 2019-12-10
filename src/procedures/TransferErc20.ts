import { BigNumber, TransactionParams } from '@polymathnetwork/contract-wrappers';
import { Procedure } from './Procedure';
import { TransferErc20ProcedureArgs, ErrorCode, ProcedureType, PolyTransactionTag } from '../types';
import { PolymathError } from '../PolymathError';
import { Erc20TokenBalance } from '../entities';
import { Factories } from '~/Context';

/**
 * Procedure to transfer funds of an ERC20 token. If no token address is specified, it defaults to POLY
 */
export class TransferErc20 extends Procedure<TransferErc20ProcedureArgs> {
  public type = ProcedureType.TransferErc20;

  public async prepareTransactions() {
    const { amount, receiver, tokenAddress } = this.args;
    const { contractWrappers, currentWallet, factories } = this.context;

    const ownerAddress = await currentWallet.address();

    const { polyToken, securityTokenRegistry } = contractWrappers;

    let token;

    if (tokenAddress) {
      const isSecurityToken = await securityTokenRegistry.isSecurityToken({
        securityTokenAddress: tokenAddress,
      });

      if (isSecurityToken) {
        throw new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message:
            "This address belongs to a Security Token. To transfer Security Tokens, use the functions in the Security Token's transfers or controller namespace",
        });
      }

      try {
        token = await contractWrappers.getERC20TokenWrapper({
          address: tokenAddress,
        });
      } catch (err) {
        throw new PolymathError({
          code: ErrorCode.ProcedureValidationError,
          message: 'The supplied address does not correspond to an ERC20 token',
        });
      }
    } else {
      token = polyToken;
    }
    const [balance, address, polyTokenAddress, isTestnet] = await Promise.all([
      token.balanceOf({ owner: ownerAddress }),
      token.address(),
      polyToken.address(),
      contractWrappers.isTestnet(),
    ]);

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

    await this.addTransaction<TransactionParams.ERC20.Transfer>(token.transfer, {
      tag: PolyTransactionTag.TransferErc20,
      resolvers: [createTransferErc20Resolver(factories, address, receiver)],
    })({ to: receiver, value: amount });
  }
}

export const createTransferErc20Resolver = (
  factories: Factories,
  tokenAddress: string,
  receiver: string
) => async () => {
  return factories.erc20TokenBalanceFactory.refresh(
    Erc20TokenBalance.generateId({
      tokenAddress,
      walletAddress: receiver,
    })
  );
};
