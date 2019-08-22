import { serialize } from '../utils';
import { DividendsManager, Params, UniqueIdentifiers } from './DividendsManager';
import { DividendType, Omit } from '../types';

export { Params, UniqueIdentifiers };

export class EthDividendsManager extends DividendsManager<Params> {
  public static generateId({ securityTokenId, dividendType }: UniqueIdentifiers) {
    return serialize('ethDividendsManager', {
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
  }: Omit<Params & UniqueIdentifiers, 'dividendType'>) {
    const dividendType = DividendType.Eth;
    super({
      securityTokenId,
      securityTokenSymbol,
      dividendType,
      address,
      storageWalletAddress,
    });

    this.uid = EthDividendsManager.generateId({
      securityTokenId,
      dividendType,
    });
  }
}
