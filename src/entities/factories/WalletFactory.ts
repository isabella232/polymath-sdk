/**
 * @packageDocumentation
 * @module Entities.Factories
 */

import { Factory } from './Factory';
import { Context } from '../../Context';
import { Wallet, Params, UniqueIdentifiers } from '../Wallet';

/**
 * Factory to generate properties for a wallet entity
 */
export class WalletFactory extends Factory<Wallet, Params, UniqueIdentifiers> {
  protected generateProperties = async (uid: string) => {
    const { address } = Wallet.unserialize(uid);

    return {
      address,
    };
  };

  /**
   * Create a wallet factory
   */
  constructor(context: Context) {
    super(Wallet, context);
  }
}
