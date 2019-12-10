import { Factory } from './Factory';
import { Context } from '../../Context';
import { Wallet, Params, UniqueIdentifiers } from '../Wallet';

export class WalletFactory extends Factory<Wallet, Params, UniqueIdentifiers> {
  protected generateProperties = async (uid: string) => {
    const { address } = Wallet.unserialize(uid);

    return {
      address,
    };
  };

  constructor(context: Context) {
    super(Wallet, context);
  }
}
