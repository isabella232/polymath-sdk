import { Factory } from './Factory';
import { Context } from '../../Context';
import { Erc20TokenBalance, Params, UniqueIdentifiers } from '../Erc20TokenBalance';

export class Erc20TokenBalanceFactory extends Factory<
  Erc20TokenBalance,
  Params,
  UniqueIdentifiers
> {
  protected generateProperties = async (uid: string) => {
    const { tokenAddress, walletAddress } = Erc20TokenBalance.unserialize(uid);

    const token = await this.context.contractWrappers.tokenFactory.getERC20TokenInstanceFromAddress(
      tokenAddress
    );
    const [symbol, balance] = await Promise.all([
      token.symbol(),
      token.balanceOf({ owner: walletAddress }),
    ]);

    return { tokenSymbol: symbol, balance };
  };

  constructor(context: Context) {
    super(Erc20TokenBalance, context);
  }
}
