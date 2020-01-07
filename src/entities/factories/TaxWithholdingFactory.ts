import { ModuleName } from '@polymathnetwork/contract-wrappers';
import { Factory } from './Factory';
import { Context } from '../../Context';
import { SecurityToken } from '../SecurityToken';
import { PolymathError } from '../../PolymathError';
import { ErrorCode } from '../../types';
import { TaxWithholding, Params, UniqueIdentifiers } from '../TaxWithholding';
/**
 * Factory generates information for a tax withholding entity
 */
export class TaxWithholdingFactory extends Factory<TaxWithholding, Params, UniqueIdentifiers> {
  protected generateProperties = async (uid: string) => {
    const {
      context: {
        contractWrappers: { tokenFactory, getAttachedModules },
      },
    } = this;
    const { securityTokenId, shareholderAddress } = TaxWithholding.unserialize(uid);
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

    const [dividendsModule] = await getAttachedModules(
      { symbol, moduleName: ModuleName.ERC20DividendCheckpoint },
      { unarchived: true }
    );

    if (!dividendsModule) {
      throw new PolymathError({
        code: ErrorCode.FetcherValidationError,
        message: "The Dividends Feature hasn't been enabled",
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
    };
  };

  /**
   * Creates an instance of the tax withholding factory
   *
   * @param context the context in which sdk will be used
   */
  constructor(context: Context) {
    super(TaxWithholding, context);
  }
}
