import {
  ModuleName,
  BigNumber,
  PercentageTransferManagerEvents,
} from '@polymathnetwork/contract-wrappers';
import { keys } from 'lodash';
import {
  ErrorCode,
  PercentageWhitelistEntry,
  ModifyPercentageExemptionsProcedureArgs,
} from '../../types';
import {
  ModifyMaxHolderCount,
  ModifyMaxHolderPercentage,
  ModifyPercentageExemptions,
} from '../../procedures';
import { SubModule } from './SubModule';
import { PolymathError } from '../../PolymathError';
import { TransactionQueue } from '../TransactionQueue';

interface WhitelistParams {
  whitelistEntries: PercentageWhitelistEntry[];
}

interface IssuanceParams {
  allowPrimaryIssuance: boolean;
}

interface ModifyPercentageExemptionsMethod {
  (params: WhitelistParams): Promise<TransactionQueue<ModifyPercentageExemptionsProcedureArgs>>;
  (params: IssuanceParams): Promise<TransactionQueue<ModifyPercentageExemptionsProcedureArgs>>;
}

export class Restrictions extends SubModule {
  /**
   * Modify the conditions for exemption from percentage ownership restrictions
   *
   * @param whitelistEntries list of addresses to add/remove from the whitelist
   * @param whitelistEntries.address address to modify
   * @param whitelistEntries.whitelisted whether the address should be exempt or not
   * @param allowPrimaryIssuance if set to true, minting tokens to an address is allowed even if it would leave said address over the percentage ownership limit
   */
  public modifyPercentageExemptions: ModifyPercentageExemptionsMethod = async (args: {
    whitelistEntries?: PercentageWhitelistEntry[];
    allowPrimaryIssuance?: boolean;
  }) => {
    const procedure = new ModifyPercentageExemptions(
      {
        symbol: this.securityToken.symbol,
        ...args,
      },
      this.context
    );
    return procedure.prepare();
  };

  /**
   * Retrieve whether primary issuance is allowed. If true, minting tokens can bypass percentage ownership restrictions.
   * Can be modified with `modifyPercentageExemptions`
   */
  public isPrimaryIssuanceAllowed = async () => {
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

    return percentageTransferManagerModule.allowPrimaryIssuance();
  };

  /**
   * Retrieve the list of shareholder addresses that are exempt from percentage ownership restrictions.
   * Can be modified with `modifyPercentageExemptions`
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
