interface Args {
  address: () => Promise<string>;
}

/**
 * @hidden
 * Internal representation of an Ethereum wallet
 */
export class Wallet {
  public address: () => Promise<string>;

  // eslint-disable-next-line require-jsdoc
  constructor({ address }: Args) {
    this.address = address;
  }
}
