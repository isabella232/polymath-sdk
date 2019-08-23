import { ModuleName } from '@polymathnetwork/contract-wrappers';
import { Factory } from './Factory';
import { Context } from '../../Context';
import { SecurityToken } from '../SecurityToken';
import { PolymathError } from '../../PolymathError';
import { ErrorCode, DividendType } from '../../types';
import { TaxWithholding, Params, UniqueIdentifiers } from '../TaxWithholding';

export class TaxWithholdingFactory extends Factory<TaxWithholding, Params, UniqueIdentifiers> {
  protected generateProperties = async (uid: string) => {
    const {
      context: {
        contractWrappers: { tokenFactory, getAttachedModules },
      },
    } = this;
    const { securityTokenId, dividendType, shareholderAddress } = TaxWithholding.unserialize(uid);
    const { symbol } = SecurityToken.unserialize(securityTokenId);

    let securityToken;

    try {
      securityToken = await tokenFactory.getSecurityTokenInstanceFromTicker(symbol);
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.FetcherValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    let dividendsModule;
    if (dividendType === DividendType.Erc20) {
      [dividendsModule] = await getAttachedModules(
        { symbol, moduleName: ModuleName.ERC20DividendCheckpoint },
        { unarchived: true }
      );
    } else if (dividendType === DividendType.Eth) {
      [dividendsModule] = await getAttachedModules(
        { symbol, moduleName: ModuleName.EtherDividendCheckpoint },
        { unarchived: true }
      );
    }

    if (!dividendsModule) {
      throw new PolymathError({
        code: ErrorCode.FetcherValidationError,
        message:
          "Dividends of the specified type haven't been enabled. Did you forget to call dividends.enable() on your Security Token?",
      });
    }

    const checkpointIndex = await securityToken.currentCheckpointId();

    const checkpointData = await dividendsModule.getCheckpointData({
      checkpointId: checkpointIndex.toNumber(),
    });

    const thisShareholder = checkpointData.find(({ investor }) => investor === shareholderAddress);

    if (!thisShareholder) {
      throw new PolymathError({
        code: ErrorCode.FetcherValidationError,
        message: `There is no shareholder with address ${shareholderAddress}`,
      });
    }

    const { withheld } = thisShareholder;

    return {
      shareholderAddress,
      percentage: withheld.toNumber(),
      securityTokenSymbol: symbol,
      securityTokenId,
      dividendType,
    };
  };

  constructor(context: Context) {
    super(TaxWithholding, context);
  }
}
