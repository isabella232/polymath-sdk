import { ModuleName } from '@polymathnetwork/contract-wrappers';
import { Factory } from './Factory';
import { Context } from '../../Context';
import { Erc20DividendsManager, Params, UniqueIdentifiers } from '../Erc20DividendsManager';
import { SecurityToken } from '../SecurityToken';
import { PolymathError } from '~/PolymathError';
import { ErrorCode } from '../../types';

export class Erc20DividendsManagerFactory extends Factory<
  Erc20DividendsManager,
  Params,
  UniqueIdentifiers
> {
  protected generateProperties = async (uid: string) => {
    const { securityTokenId } = Erc20DividendsManager.unserialize(uid);
    const { symbol } = SecurityToken.unserialize(securityTokenId);

    const [dividendsModule] = await this.context.contractWrappers.getAttachedModules(
      { symbol, moduleName: ModuleName.ERC20DividendCheckpoint },
      { unarchived: true }
    );

    if (!dividendsModule) {
      throw new PolymathError({
        code: ErrorCode.FetcherValidationError,
        message:
          "Dividends of the specified type haven't been enabled. Did you forget to call dividends.enable() on your Security Token?",
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
    super(Erc20DividendsManager, context);
  }
}
