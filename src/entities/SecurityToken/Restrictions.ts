import {
  ModuleName,
  BigNumber,
  PercentageTransferManagerEvents,
} from '@polymathnetwork/contract-wrappers';
import { keys } from 'lodash';
import { ErrorCode, PercentageWhitelistEntry } from '../../types';
import {
  ModifyMaxHolderCount,
  ModifyMaxHolderPercentage,
  ModifyPercentageWhitelist,
} from '../../procedures';
import { SubModule } from './SubModule';
import { PolymathError } from '../../PolymathError';

export class Restrictions extends SubModule {
  /**
   * Modify the list of addresses which are exempt from percentage restrictions
   *
   * @param entries.address address to modify
   * @param entries.whitelisted whether the address should be exempt or not
   */
  public modifyPercentageWhitelist = async (args: { entries: PercentageWhitelistEntry[] }) => {
    const procedure = new ModifyPercentageWhitelist(
      {
        symbol: this.securityToken.symbol,
        ...args,
      },
      this.context
    );
    return procedure.prepare();
  };

  /**
   * Retrieve the list of shareholder addresses that are exempt from percentage ownership restrictions
   */
  public getPercentageWhitelist = async () => {
    const {
      context: { contractWrappers },
      securityToken,
    } = this;

    const { symbol } = securityToken;

    const [percentageTransferManagerModule] = await contractWrappers.getAttachedModules(
      { moduleName: ModuleName.PercentageTransferManager, symbol },
      { unarchived: true }
    );

    if (!percentageTransferManagerModule) {
      throw new PolymathError({
        code: ErrorCode.FeatureNotEnabled,
        message: 'You must enable the PercentageOwnershipRestrictions Feature',
      });
    }

    const logs = await percentageTransferManagerModule.getLogsAsync({
      eventName: PercentageTransferManagerEvents.ModifyWhitelist,
    });
    const whitelist: {
      [address: string]: {
        whitelisted: boolean;
        blockNumber: number;
      };
    } = {};

    logs.forEach(({ args: { _investor, _valid }, blockNumber }) => {
      const entry = whitelist[_investor];

      if (!entry || !blockNumber || blockNumber >= entry.blockNumber) {
        whitelist[_investor] = {
          whitelisted: _valid,
          blockNumber: blockNumber || -1,
        };
      }
    });

    const addresses = keys(whitelist);

    return addresses.filter(address => whitelist[address].whitelisted);
  };

  /**
   * Modify the maximum percentage of the total supply that a single shareholder can own at a given time
   *
   * @param maxHolderPercentage limit to the percentage a shareholder can own (i.e. `new BigNumber(55.75)` for 55.75%)
   */
  public modifyMaxHolderPercentage = async (args: { maxHolderPercentage: BigNumber }) => {
    const procedure = new ModifyMaxHolderPercentage(
      {
        symbol: this.securityToken.symbol,
        ...args,
      },
      this.context
    );
    return procedure.prepare();
  };

  /**
   * Retrieve the maximum percentage of the total supply that a single shareholder can own.
   * Can be modified with `modifyMaxHolderPercentage`
   */
  public getMaxHolderPercentage = async () => {
    const {
      context: { contractWrappers },
      securityToken,
    } = this;

    const { symbol } = securityToken;

    const percentageTransferManagerModule = (await contractWrappers.getAttachedModules(
      { moduleName: ModuleName.PercentageTransferManager, symbol },
      { unarchived: true }
    ))[0];

    if (!percentageTransferManagerModule) {
      throw new PolymathError({
        code: ErrorCode.FeatureNotEnabled,
        message: 'You must enable the PercentageOwnershipRestrictions Feature',
      });
    }

    return percentageTransferManagerModule.maxHolderPercentage();
  };

  /**
   * Modify the maximum amount of shareholders allowed to hold the token at once
   *
   * @param maxHolderCount limit to the amount of concurrent shareholders
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
   * Retrieve the maximum amonut of shareholders allowed to hold the token at once.
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
        message: 'You must enable the ShareholderCountRestrictions Feature',
      });
    }

    return countTransferManagerModule.maxHolderCount();
  };
}
