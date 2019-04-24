import { Polymath } from '~/Polymath';
import { serialize, unserialize } from '~/utils';
import { DividendsModule } from './DividendsModule';

interface UniqueIdentifiers {
  securityTokenSymbol: string;
}

function isUniqueIdentifiers(
  identifiers: any
): identifiers is UniqueIdentifiers {
  const { securityTokenSymbol } = identifiers;

  return typeof securityTokenSymbol === 'string';
}

interface Params extends UniqueIdentifiers {
  address: string;
  securityTokenId: string;
  storageWalletAddress: string;
}

export class EthDividendsModule extends DividendsModule {
  public static generateId({
    securityTokenSymbol,
  }: {
    securityTokenSymbol: string;
  }) {
    return serialize('ethDividendsModule', {
      securityTokenSymbol,
    });
  }

  public static unserialize(serialized: string) {
    const unserialized = unserialize(serialized);

    if (!isUniqueIdentifiers(unserialized)) {
      throw new Error('Wrong eth dividends module ID format.');
    }

    return unserialized;
  }

  public uid: string;

  constructor(params: Params, polyClient?: Polymath) {
    super(params, polyClient);

    this.uid = EthDividendsModule.generateId({
      securityTokenSymbol: params.securityTokenSymbol,
    });
  }
}
