import { Factory } from './Factory';
import { Context } from '../../Context';
import { Wallet, Params, UniqueIdentifier } from '../Wallet';

export class WalletFactory extends Factory<Wallet, Params, UniqueIdentifier> {
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
