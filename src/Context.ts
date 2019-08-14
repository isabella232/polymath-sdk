import { Wallet } from './Wallet';
import { PolymathBase } from './PolymathBase';

interface ConstructorParams {
  contractWrappers: PolymathBase;
}

/**
 * Context in which the SDK is being used
 *
 * - Holds the current instance of the contract wrappers
 * - Holds the current wallet
 */
export class Context {
  public contractWrappers: PolymathBase;

  public currentWallet: Wallet;

  constructor(params: ConstructorParams) {
    const { contractWrappers } = params;

    this.contractWrappers = contractWrappers;

    this.currentWallet = new Wallet({ address: () => contractWrappers.getAccount() });
  }
}
