import { DividendsModule, Params, UniqueIdentifiers } from './DividendsModule';
import { Polymath } from '../Polymath';
import { serialize } from '../utils';
import { DividendModuleType, Omit } from '../types';

export class Erc20DividendsModule extends DividendsModule {
  public static generateId({ securityTokenId, dividendType }: UniqueIdentifiers) {
    return serialize('erc20DividendsModule', {
      securityTokenId,
      dividendType,
    });
  }

  public uid: string;

  constructor(
    {
      securityTokenSymbol,
      securityTokenId,
      address,
      storageWalletAddress,
    }: Omit<Params, 'dividendType'>,
    polyClient?: Polymath
  ) {
    const dividendType = DividendModuleType.Erc20;
    super(
      {
        securityTokenId,
        securityTokenSymbol,
        address,
        storageWalletAddress,
        dividendType,
      },
      polyClient
    );

    this.uid = Erc20DividendsModule.generateId({
      securityTokenId,
      dividendType,
    });
  }
}
