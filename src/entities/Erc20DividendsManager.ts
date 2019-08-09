import { DividendsManager, Params, UniqueIdentifiers } from './DividendsManager';
import { serialize } from '../utils';
import { DividendType, Omit } from '../types';

export class Erc20DividendsManager extends DividendsManager {
  public static generateId({ securityTokenId, dividendType }: UniqueIdentifiers) {
    return serialize('erc20DividendsManager', {
      securityTokenId,
      dividendType,
    });
  }

  public uid: string;

  constructor({
    securityTokenSymbol,
    securityTokenId,
    address,
    storageWalletAddress,
  }: Omit<Params, 'dividendType'>) {
    const dividendType = DividendType.Erc20;
    super({
      securityTokenId,
      securityTokenSymbol,
      address,
      storageWalletAddress,
      dividendType,
    });

    this.uid = Erc20DividendsManager.generateId({
      securityTokenId,
      dividendType,
    });
  }
}
