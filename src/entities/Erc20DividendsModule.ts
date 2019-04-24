import {
  DividendsModule,
  Params,
  UniqueIdentifiers,
  isUniqueIdentifiers,
} from './DividendsModule';
import { Polymath } from '~/Polymath';
import { serialize, unserialize } from '~/utils';

export class Erc20DividendsModule extends DividendsModule {
  public static generateId({ securityTokenSymbol }: UniqueIdentifiers) {
    return serialize('erc20DividendsModule', {
      securityTokenSymbol,
    });
  }

  public static unserialize(serialized: string) {
    const unserialized = unserialize(serialized);

    if (!isUniqueIdentifiers(unserialized)) {
      throw new Error('Wrong erc20 dividends module ID format.');
    }

    return unserialized;
  }

  public entityType: string = 'erc20DividendsModule';
  public uid: string;

  constructor(params: Params, polyClient?: Polymath) {
    super(params, polyClient);

    this.uid = Erc20DividendsModule.generateId({
      securityTokenSymbol: params.securityTokenSymbol,
    });
  }
}
