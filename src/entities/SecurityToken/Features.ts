import { ModuleName, BigNumber } from '@polymathnetwork/contract-wrappers';
import { SubModule } from './SubModule';
import {
  EnableGeneralPermissionManager,
  EnableDividendManagers,
  EnableGeneralTransferManager,
  DisableFeature,
  EnablePercentageTransferManager,
} from '../../procedures';
import {
  Feature,
  ErrorCode,
  EnableGeneralPermissionManagerProcedureArgs,
  EnableDividendManagersProcedureArgs,
  DividendType,
  DisableFeatureProcedureArgs,
  EnableCountTransferManagerProcedureArgs,
  EnableGeneralTransferManagerProcedureArgs,
} from '../../types';
import { PolymathError } from '../../PolymathError';
import { TransactionQueue } from '../TransactionQueue';
import { EnableCountTransferManager } from '../../procedures/EnableCountTransferManager';

export interface FeatureStatuses {
  [Feature.Permissions]: boolean;
  [Feature.Shareholders]: boolean;
  [Feature.Erc20Dividends]: boolean;
  [Feature.EtherDividends]: boolean;
  [Feature.ShareholderCountRestrictions]: boolean;
  [Feature.PercentageOwnershipRestrictions]: boolean;
}

type EnableOpts =
  | EnableErc20DividendsOpts
  | EnableEtherDividendsOpts
  | EnableShareholderCountRestrictionsOpts
  | EnablePercentageOwnershipRestrictionsOpts;

export interface EnableErc20DividendsOpts {
  storageWalletAddress: string;
}

export interface EnableEtherDividendsOpts {
  storageWalletAddress: string;
}

export interface EnableShareholderCountRestrictionsOpts {
  maxHolderCount: number;
}

export interface EnablePercentageOwnershipRestrictionsOpts {
  maxHolderPercentage: BigNumber;
  allowPrimaryIssuance?: boolean;
}

export interface Enable {
  (args: { feature: Feature.Permissions }): Promise<
    TransactionQueue<EnableGeneralPermissionManagerProcedureArgs>
  >;
  (args: { feature: Feature.Shareholders }): Promise<
    TransactionQueue<EnableGeneralTransferManagerProcedureArgs>
  >;
  (args: { feature: Feature.Erc20Dividends }, opts: EnableErc20DividendsOpts): Promise<
    TransactionQueue<EnableDividendManagersProcedureArgs>
  >;
  (args: { feature: Feature.EtherDividends }, opts: EnableEtherDividendsOpts): Promise<
    TransactionQueue<EnableDividendManagersProcedureArgs>
  >;
  (
    args: { feature: Feature.ShareholderCountRestrictions },
    opts: EnableShareholderCountRestrictionsOpts
  ): Promise<TransactionQueue<EnableCountTransferManagerProcedureArgs>>;
  (
    args: { feature: Feature.PercentageOwnershipRestrictions },
    opts: EnablePercentageOwnershipRestrictionsOpts
  ): Promise<TransactionQueue<EnableDividendManagersProcedureArgs>>;
}

export class Features extends SubModule {
  /**
   * List of all existing features
   */
  public list: Feature[] = [
    Feature.Permissions,
    Feature.Shareholders,
    Feature.Erc20Dividends,
    Feature.EtherDividends,
    Feature.ShareholderCountRestrictions,
    Feature.PercentageOwnershipRestrictions,
  ];

  /**
   * Returns whether a particular feature has been enabled or not
   *
   * @param feature feature for which to query status
   */
  public isEnabled = async (args: { feature: Feature }) => {
    const { feature } = args;
    const {
      context: { contractWrappers },
      securityToken: { symbol },
    } = this;
    const moduleName = this.getModuleNameFromFeature(feature);
    const attachedModule = (await contractWrappers.getAttachedModules(
      { symbol, moduleName },
      { unarchived: true }
    ))[0];

    return !!attachedModule;
  };

  /**
   * Gets the status on all Security Token features (true = enabled, false = not enabled/disabled)
   */
  public getStatus = async () => {
    const { list } = this;

    const [
      permissionsEnabled,
      shareholdersEnabled,
      erc20DividendsEnabled,
      etherDividendsEnabled,
      countTransferManagerEnabled,
      percentageTransferManagerEnabled,
    ] = await Promise.all(list.map(feature => this.isEnabled({ feature })));

    const result: FeatureStatuses = {
      [Feature.Permissions]: permissionsEnabled,
      [Feature.Shareholders]: shareholdersEnabled,
      [Feature.Erc20Dividends]: erc20DividendsEnabled,
      [Feature.EtherDividends]: etherDividendsEnabled,
      [Feature.ShareholderCountRestrictions]: countTransferManagerEnabled,
      [Feature.PercentageOwnershipRestrictions]: percentageTransferManagerEnabled,
    };

    return result;
  };

  /**
   * Enable a feature
   *
   * @param feature feature to enable
   * @param opts feature options
   */
  public enable: Enable = async (
    args: { feature: Feature },
    opts?: EnableOpts
  ): Promise<TransactionQueue> => {
    const { feature } = args;

    const alreadyEnabled = await this.isEnabled({ feature });

    if (alreadyEnabled) {
      throw new PolymathError({
        code: ErrorCode.FatalError,
        message: `Feature '${feature}' already enabled`,
      });
    }

    const { symbol } = this.securityToken;
    let procedure;
    switch (feature) {
      case Feature.Permissions: {
        procedure = new EnableGeneralPermissionManager(
          {
            symbol,
            ...opts,
          },
          this.context
        );
        break;
      }
      case Feature.Shareholders: {
        procedure = new EnableGeneralTransferManager(
          {
            symbol,
            ...opts,
          },
          this.context
        );
        break;
      }
      case Feature.Erc20Dividends: {
        procedure = new EnableDividendManagers(
          { symbol, ...(opts as EnableErc20DividendsOpts), types: [DividendType.Erc20] },
          this.context
        );
        break;
      }
      case Feature.EtherDividends: {
        procedure = new EnableDividendManagers(
          { symbol, ...(opts as EnableEtherDividendsOpts), types: [DividendType.Eth] },
          this.context
        );
        break;
      }
      case Feature.ShareholderCountRestrictions: {
        procedure = new EnableCountTransferManager(
          { symbol, ...(opts as EnableShareholderCountRestrictionsOpts) },
          this.context
        );
        break;
      }
      case Feature.ShareholderCountRestrictions: {
        procedure = new EnablePercentageTransferManager(
          { symbol, ...(opts as EnablePercentageOwnershipRestrictionsOpts) },
          this.context
        );
        break;
      }
      default: {
        throw new PolymathError({
          code: ErrorCode.FetcherValidationError,
          message: `Feature '${feature}' is not supported`,
        });
      }
    }

    return procedure.prepare();
  };

  /**
   * Disable a feature
   *
   * @param feature feature to enable
   */
  public disable = async (args: {
    feature: Feature;
  }): Promise<TransactionQueue<DisableFeatureProcedureArgs>> => {
    const { feature } = args;

    const alreadyDisabled = !(await this.isEnabled({ feature }));

    if (alreadyDisabled) {
      throw new PolymathError({
        code: ErrorCode.FatalError,
        message: `Feature '${feature}' already disabled`,
      });
    }

    const { symbol } = this.securityToken;
    const moduleName = this.getModuleNameFromFeature(feature);
    const procedure = new DisableFeature(
      {
        symbol,
        moduleName,
      },
      this.context
    );

    return procedure.prepare();
  };

  private getModuleNameFromFeature = (feature: Feature): ModuleName => {
    let moduleName: ModuleName;
    switch (feature) {
      case Feature.Permissions:
        moduleName = ModuleName.GeneralPermissionManager;
        break;
      case Feature.Shareholders:
        moduleName = ModuleName.GeneralTransferManager;
        break;
      case Feature.Erc20Dividends:
        moduleName = ModuleName.ERC20DividendCheckpoint;
        break;
      case Feature.EtherDividends:
        moduleName = ModuleName.EtherDividendCheckpoint;
        break;
      case Feature.ShareholderCountRestrictions:
        moduleName = ModuleName.CountTransferManager;
        break;
      case Feature.PercentageOwnershipRestrictions:
        moduleName = ModuleName.PercentageTransferManager;
        break;
      default:
        throw new PolymathError({
          code: ErrorCode.FetcherValidationError,
          message: `Feature '${feature}' is not supported`,
        });
    }

    return moduleName;
  };
}
