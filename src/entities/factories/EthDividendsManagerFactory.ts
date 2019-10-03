import { ModuleName } from '@polymathnetwork/contract-wrappers';
import { Factory } from './Factory';
import { Context } from '../../Context';
import { SecurityToken } from '../SecurityToken';
import { PolymathError } from '../../PolymathError';
import { ErrorCode } from '../../types';
import { EthDividendsManager, Params, UniqueIdentifiers } from '../EthDividendsManager';

export class EthDividendsManagerFactory extends Factory<
  EthDividendsManager,
  Params,
  UniqueIdentifiers
> {
  protected generateProperties = async (uid: string) => {
    const { securityTokenId } = EthDividendsManager.unserialize(uid);
    const { symbol } = SecurityToken.unserialize(securityTokenId);

    const [dividendsModule] = await this.context.contractWrappers.getAttachedModules(
      { symbol, moduleName: ModuleName.EtherDividendCheckpoint },
      { unarchived: true }
    );

    if (!dividendsModule) {
      throw new PolymathError({
        code: ErrorCode.FetcherValidationError,
        message: "Dividends of the specified type haven't been enabled",
      });
    }

    const storageWalletAddress = await dividendsModule.wallet();

    return {
      address: await dividendsModule.address(),
      storageWalletAddress,
      securityTokenId,
      securityTokenSymbol: symbol,
    };
  };

  constructor(context: Context) {
    super(EthDividendsManager, context);
  }
}
