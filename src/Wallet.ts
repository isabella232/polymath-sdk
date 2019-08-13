interface Args {
  address: () => Promise<string>;
}

export class Wallet {
  public address: () => Promise<string>;

  constructor({ address }: Args) {
    this.address = address;
  }
}
