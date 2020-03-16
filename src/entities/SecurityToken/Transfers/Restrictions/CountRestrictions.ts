import { ModuleName } from '@polymathnetwork/contract-wrappers';
import { ErrorCode } from '../../../../types';
import { ModifyMaxHolderCount } from '../../../../procedures';
import { SubModule } from '../../SubModule';
import { PolymathError } from '../../../../PolymathError';

/**
 * Namespace that handles all Count Restriction related functionality
 */
export class CountRestrictions extends SubModule {
  /**
   * Modify the maximum amount of tokenholders allowed to hold the token at once
   *
   * @param args.maxHolderCount - limit to the amount of concurrent tokenholders
   */
  public modifyMaxHolderCount = async (args: { maxHolderCount: number }) => {
    const procedure = new ModifyMaxHolderCount(
      {
        symbol: this.securityToken.symbol,
        ...args,
      },
      this.context
    );
    return procedure.prepare();
  };

  /**
   * Retrieve the maximum amonut of tokenholders allowed to hold the token at once
   * Can be modified with `modifyMaxHolderCount`
   */
  public getMaxHolderCount = async () => {
    const {
      context: { contractWrappers },
      securityToken,
    } = this;

    const { symbol } = securityToken;

    const countTransferManagerModule = (await contractWrappers.getAttachedModules(
      { moduleName: ModuleName.CountTransferManager, symbol },
      { unarchived: true }
    ))[0];

    if (!countTransferManagerModule) {
      throw new PolymathError({
        code: ErrorCode.FeatureNotEnabled,
        message: 'You must enable the TokenholderCountRestrictions Feature',
      });
    }

    return countTransferManagerModule.maxHolderCount();
  };
}
