import {
  PolymathAPI,
  ModuleName,
  GeneralPermissionManager,
  CountTransferManager,
  GeneralTransferManager,
  ManualApprovalTransferManager,
  PercentageTransferManager,
  VolumeRestrictionTransferManager,
  CappedSTO,
  USDTieredSTO,
  ERC20DividendCheckpoint,
  SecurityToken,
  ModuleType,
  BigNumber,
  BlacklistTransferManager,
  LockUpTransferManager,
  VestingEscrowWallet,
  RestrictedPartialSaleTransferManager,
  Perm,
  isCappedSTO,
  isCappedSTO_3_0_0,
  isUSDTieredSTO,
  isUSDTieredSTO_3_0_0,
  isGeneralPermissionManager,
  isGeneralTransferManager,
  isBlacklistTransferManager,
  isLockUpTransferManager,
  isCountTransferManager,
  isManualApprovalTransferManager,
  isPercentageTransferManager,
  isVolumeRestrictionTransferManager,
  isRestrictedPartialSaleTransferManager,
  EtherDividendCheckpoint,
} from '@polymathnetwork/contract-wrappers';
import { range, flatten } from 'lodash';
import P from 'bluebird';
import semver from 'semver';
import { PolymathError } from './PolymathError';
import {
  ErrorCode,
  SecurityTokenRole,
  ShareholderBalance,
  DividendShareholderStatus,
} from '../types';
import { ZERO_ADDRESS } from '../utils/constants';

/**
 * Arguments for [[getModuleAddressesByName]]
 */
interface GetModuleAddressesByNameParams {
  /**
   * Security Token symbol
   */
  symbol: string;
  /**
   * the name of the Security Token module
   */
  moduleName: ModuleName;
}

/**
 * Options for [[getModuleAddressesByName]]
 */
interface GetModuleAddressesByNameOpts {
  /**
   * whether to include unarchived modules in the search
   */
  unarchived: boolean;
}

/**
 * Arguments for [[getAttachedModules]]
 */
interface GetAttachedModulesParams {
  /**
   * Security Token symbol
   */
  symbol: string;
  /**
   * name of the module
   */
  moduleName: ModuleName;
}

/**
 * Options for [[getAttachedModules]]
 */
interface GetAttachedModulesOpts {
  /**
   * whether to include unarchived modules in the search
   */
  unarchived: boolean;
}

/**
 * @hidden
 */
interface GetAttachedGeneralPermissionManagersParams extends GetAttachedModulesParams {
  moduleName: ModuleName.GeneralPermissionManager;
}

/**
 * @hidden
 */
interface GetAttachedCountTransferManagersParams extends GetAttachedModulesParams {
  moduleName: ModuleName.CountTransferManager;
}

/**
 * @hidden
 */
interface GetAttachedGeneralTransferManagersParams extends GetAttachedModulesParams {
  moduleName: ModuleName.GeneralTransferManager;
}

/**
 * @hidden
 */
interface GetAttachedManualApprovalTransferManagersParams extends GetAttachedModulesParams {
  moduleName: ModuleName.ManualApprovalTransferManager;
}

/**
 * @hidden
 */
interface GetAttachedPercentageTransferManagersParams extends GetAttachedModulesParams {
  moduleName: ModuleName.PercentageTransferManager;
}

/**
 * @hidden
 */
interface GetAttachedVolumeRestrictionTransferManagersParams extends GetAttachedModulesParams {
  moduleName: ModuleName.VolumeRestrictionTM;
}

/**
 * @hidden
 */
interface GetAttachedBlacklistTransferManagersParams extends GetAttachedModulesParams {
  moduleName: ModuleName.BlacklistTransferManager;
}

/**
 * @hidden
 */
interface GetAttachedLockUpTransferManagersParams extends GetAttachedModulesParams {
  moduleName: ModuleName.LockUpTransferManager;
}

/**
 * @hidden
 */
interface GetAttachedRestrictedPartialSaleTransferManagersParams extends GetAttachedModulesParams {
  moduleName: ModuleName.RestrictedPartialSaleTM;
}

/**
 * @hidden
 */
interface GetAttachedCappedStosParams extends GetAttachedModulesParams {
  moduleName: ModuleName.CappedSTO;
}

/**
 * @hidden
 */
interface GetAttachedUSDTieredStosParams extends GetAttachedModulesParams {
  moduleName: ModuleName.UsdTieredSTO;
}

/**
 * @hidden
 */
interface GetAttachedErc20DividendCheckpointsParams extends GetAttachedModulesParams {
  moduleName: ModuleName.ERC20DividendCheckpoint;
}

/**
 * @hidden
 */
interface GetAttachedEtherDividendCheckpointsParams extends GetAttachedModulesParams {
  moduleName: ModuleName.EtherDividendCheckpoint;
}

/**
 * @hidden
 */
interface GetAttachedVestingEscrowWalletsParams extends GetAttachedModulesParams {
  moduleName: ModuleName.VestingEscrowWallet;
}

/**
 * @hidden
 */
interface GetAttachedModules {
  (params: GetAttachedGeneralPermissionManagersParams, opts?: GetAttachedModulesOpts): Promise<
    GeneralPermissionManager[]
  >;
  (params: GetAttachedCountTransferManagersParams, opts?: GetAttachedModulesOpts): Promise<
    CountTransferManager[]
  >;
  (params: GetAttachedGeneralTransferManagersParams, opts?: GetAttachedModulesOpts): Promise<
    GeneralTransferManager[]
  >;
  (params: GetAttachedManualApprovalTransferManagersParams, opts?: GetAttachedModulesOpts): Promise<
    ManualApprovalTransferManager[]
  >;
  (params: GetAttachedPercentageTransferManagersParams, opts?: GetAttachedModulesOpts): Promise<
    PercentageTransferManager[]
  >;
  (
    params: GetAttachedVolumeRestrictionTransferManagersParams,
    opts?: GetAttachedModulesOpts
  ): Promise<VolumeRestrictionTransferManager[]>;
  (params: GetAttachedBlacklistTransferManagersParams, opts?: GetAttachedModulesOpts): Promise<
    BlacklistTransferManager[]
  >;
  (params: GetAttachedLockUpTransferManagersParams, opts?: GetAttachedModulesOpts): Promise<
    LockUpTransferManager[]
  >;
  (
    params: GetAttachedRestrictedPartialSaleTransferManagersParams,
    opts?: GetAttachedModulesOpts
  ): Promise<RestrictedPartialSaleTransferManager[]>;
  (params: GetAttachedCappedStosParams, opts?: GetAttachedModulesOpts): Promise<CappedSTO[]>;
  (params: GetAttachedUSDTieredStosParams, opts?: GetAttachedModulesOpts): Promise<USDTieredSTO[]>;
  (params: GetAttachedErc20DividendCheckpointsParams, opts?: GetAttachedModulesOpts): Promise<
    ERC20DividendCheckpoint[]
  >;
  (params: GetAttachedVestingEscrowWalletsParams, opts?: GetAttachedModulesOpts): Promise<
    VestingEscrowWallet[]
  >;
  (params: GetAttachedModulesParams, opts?: GetAttachedModulesOpts): Promise<Module[]>;
}

/**
 * Arguments for [[getModuleFactoryAddress]]
 */
interface GetModuleFactoryAddressArgs {
  /**
   * name of Security Token module
   */
  moduleName: ModuleName;
  /**
   * ethereum address of Module Factory
   */
  tokenAddress: string;
}

/**
 * Internal representation of a Checkpoint
 */
export interface BaseCheckpoint {
  /**
   * index of the Checkpoint
   */
  index: number;
  /**
   * total supply of the Security Token at the Checkpoint
   */
  totalSupply: BigNumber;
  /**
   * shareholder balances at the Checkpoint
   */
  shareholderBalances: ShareholderBalance[];
  /**
   * date at which the Checkpoint was created
   */
  createdAt: Date;
}

/**
 * Internal representation of a Dividend Distribution
 */
export interface BaseDividend {
  /**
   * index of the dividend
   */
  index: number;
  /**
   * checkpoint UUID to which this Dividend Distribution is associated
   */
  checkpointId: number;
  /**
   * date at which the Dividend was created
   */
  created: Date;
  /**
   * date from which payments can be distributed
   */
  maturity: Date;
  /**
   * date at which the Dividend will expire
   */
  expiry: Date;
  /**
   * amount of tokens provided in the Dividend
   */
  amount: BigNumber;
  /**
   * amount of tokens paid so far
   */
  claimedAmount: BigNumber;
  /**
   * total supply of the Security Token
   */
  totalSupply: BigNumber;
  /**
   * whether expired payments have been reclaimed
   */
  reclaimed: boolean;
  /**
   * total amount of tokens withheld as tax so far
   */
  totalWithheld: BigNumber;
  /**
   * total amount of withheld taxes already withdrawn from the storage wallet
   */
  totalWithheldWithdrawn: BigNumber;
  /**
   * name of the Dividend
   */
  name: string;
  /**
   * symbol of the currency in which Dividends are being distributed
   */
  currency: string | null;
  /**
   * dividend Shareholders
   */
  shareholders: DividendShareholderStatus[];
}

/**
 * @hidden
 */
export type Module =
  | GeneralPermissionManager
  | GeneralTransferManager
  | BlacklistTransferManager
  | LockUpTransferManager
  | CountTransferManager
  | ManualApprovalTransferManager
  | PercentageTransferManager
  | VolumeRestrictionTransferManager
  | RestrictedPartialSaleTransferManager
  | CappedSTO
  | USDTieredSTO
  | ERC20DividendCheckpoint
  | EtherDividendCheckpoint
  | VestingEscrowWallet;

/**
 * Class that wraps the polymathnetwork/contract-wrappers library to add utility functions
 */
export class PolymathBase extends PolymathAPI {
  /**
   * Fetch the address of a specified Module Factory
   */
  public getModuleFactoryAddress = async ({
    /**
     * name of the Module corresponding to the Module Factory
     */
    moduleName,
    /**
     * address of the Security Token
     */
    tokenAddress,
  }: GetModuleFactoryAddressArgs) => {
    const moduleTypes = {
      [ModuleName.CappedSTO]: ModuleType.STO,
      [ModuleName.UsdTieredSTO]: ModuleType.STO,
      [ModuleName.GeneralTransferManager]: ModuleType.TransferManager,
      [ModuleName.CountTransferManager]: ModuleType.TransferManager,
      [ModuleName.PercentageTransferManager]: ModuleType.TransferManager,
      [ModuleName.ManualApprovalTransferManager]: ModuleType.TransferManager,
      [ModuleName.BlacklistTransferManager]: ModuleType.TransferManager,
      [ModuleName.LockUpTransferManager]: ModuleType.TransferManager,
      [ModuleName.VolumeRestrictionTM]: ModuleType.TransferManager,
      [ModuleName.RestrictedPartialSaleTM]: ModuleType.TransferManager,
      [ModuleName.ERC20DividendCheckpoint]: ModuleType.Dividends,
      [ModuleName.EtherDividendCheckpoint]: ModuleType.Dividends,
      [ModuleName.GeneralPermissionManager]: ModuleType.PermissionManager,
      [ModuleName.VestingEscrowWallet]: ModuleType.Wallet,
      [ModuleName.AdvancedPLCRVotingCheckpoint]: ModuleType.Dividends,
    };

    const availableModules = await this.moduleRegistry.getModulesByTypeAndToken({
      securityToken: tokenAddress,
      moduleType: moduleTypes[moduleName],
    });

    let address: string | null = null;
    let latestVersion = '0.0.0';

    // Get latest version of the module factory
    await P.each(availableModules, async moduleAddress => {
      const moduleFactory = await this.moduleFactory.getModuleFactory(moduleAddress);
      const name = await moduleFactory.name();

      if (moduleName.localeCompare(name) === 0) {
        const version = await moduleFactory.version();
        if (semver.gte(version, latestVersion)) {
          latestVersion = version;
          address = moduleAddress;
        }
      }
    });

    if (address !== null) {
      return address as string;
    }

    throw new PolymathError({
      code: ErrorCode.InexistentModule,
      message: `Module factory for "${moduleName}" was not found.`,
    });
  };

  /**
   * Fetch a Module's Treasury Wallet
   */
  public getTreasuryWallet = async ({ module }: { module: Module }) => {
    const stAddress = await module.securityToken();
    const token = await this.tokenFactory.getSecurityTokenInstanceFromAddress(stAddress);
    const defaultWallet = await token.getTreasuryWallet();

    if (isCappedSTO(module)) {
      if (isCappedSTO_3_0_0(module)) {
        return defaultWallet;
      }
    }

    if (isUSDTieredSTO(module)) {
      if (isUSDTieredSTO_3_0_0(module)) {
        const wallet = await module.treasuryWallet();
        return wallet === ZERO_ADDRESS ? defaultWallet : wallet;
      }
    }

    if (isGeneralPermissionManager(module)) {
      return defaultWallet;
    }

    if (isGeneralTransferManager(module)) {
      return defaultWallet;
    }

    if (isBlacklistTransferManager(module)) {
      return defaultWallet;
    }

    if (isLockUpTransferManager(module)) {
      return defaultWallet;
    }

    if (isCountTransferManager(module)) {
      return defaultWallet;
    }

    if (isManualApprovalTransferManager(module)) {
      return defaultWallet;
    }

    if (isPercentageTransferManager(module)) {
      return defaultWallet;
    }

    if (isVolumeRestrictionTransferManager(module)) {
      return defaultWallet;
    }

    if (isRestrictedPartialSaleTransferManager(module)) {
      return defaultWallet;
    }

    return module.getTreasuryWallet();
  };

  /**
   * Fetch addresses of all Modules of a certain type attached to a Security Token
   */
  public getModuleAddressesByName = async (
    {
      /**
       * symbol of the Security Token
       */
      symbol,
      /**
       * name of the Module
       */
      moduleName,
    }: GetModuleAddressesByNameParams,
    opts?: GetModuleAddressesByNameOpts
  ) => {
    const { tokenFactory } = this;

    const securityToken = await tokenFactory.getSecurityTokenInstanceFromTicker(symbol);

    const moduleAddresses = await securityToken.getModulesByName({ moduleName });

    let filteredModuleAddresses: string[];

    if (opts && opts.unarchived) {
      // only return unarchived modules
      filteredModuleAddresses = await P.filter(moduleAddresses, async moduleAddress => {
        const { archived } = await securityToken.getModule({ moduleAddress });

        return !archived;
      });
    } else {
      filteredModuleAddresses = moduleAddresses;
    }

    return filteredModuleAddresses;
  };

  /**
   * Fetch all Modules of a certain type attached to a Security Token
   */
  public getAttachedModules: GetAttachedModules = async (
    {
      /**
       * symbol of the Security Token
       */
      symbol,
      /**
       * name of the Module
       */
      moduleName,
    }: GetAttachedModulesParams,
    opts?: GetAttachedModulesOpts
  ): Promise<any[]> => {
    const { moduleFactory } = this;

    const moduleAddresses = await this.getModuleAddressesByName({ moduleName, symbol }, opts);

    const { getModuleInstance } = moduleFactory;

    // This has to be done this way because of typescript limitations
    let wrappedModules;
    switch (moduleName) {
      case ModuleName.GeneralPermissionManager: {
        wrappedModules = await P.map(moduleAddresses, moduleAddress =>
          getModuleInstance({
            address: moduleAddress,
            name: moduleName,
          })
        );

        return wrappedModules;
      }
      case ModuleName.CountTransferManager: {
        wrappedModules = await P.map(moduleAddresses, moduleAddress =>
          getModuleInstance({
            address: moduleAddress,
            name: moduleName,
          })
        );

        return wrappedModules;
      }
      case ModuleName.GeneralTransferManager: {
        wrappedModules = await P.map(moduleAddresses, moduleAddress =>
          getModuleInstance({
            address: moduleAddress,
            name: moduleName,
          })
        );

        return wrappedModules;
      }
      case ModuleName.ManualApprovalTransferManager: {
        wrappedModules = await P.map(moduleAddresses, moduleAddress =>
          getModuleInstance({
            address: moduleAddress,
            name: moduleName,
          })
        );

        return wrappedModules;
      }
      case ModuleName.PercentageTransferManager: {
        wrappedModules = await P.map(moduleAddresses, moduleAddress =>
          getModuleInstance({
            address: moduleAddress,
            name: moduleName,
          })
        );

        return wrappedModules;
      }
      case ModuleName.VolumeRestrictionTM: {
        wrappedModules = await P.map(moduleAddresses, moduleAddress =>
          getModuleInstance({
            address: moduleAddress,
            name: moduleName,
          })
        );

        return wrappedModules;
      }
      case ModuleName.BlacklistTransferManager: {
        wrappedModules = await P.map(moduleAddresses, moduleAddress =>
          getModuleInstance({
            address: moduleAddress,
            name: moduleName,
          })
        );

        return wrappedModules;
      }
      case ModuleName.LockUpTransferManager: {
        wrappedModules = await P.map(moduleAddresses, moduleAddress =>
          getModuleInstance({
            address: moduleAddress,
            name: moduleName,
          })
        );

        return wrappedModules;
      }
      case ModuleName.RestrictedPartialSaleTM: {
        wrappedModules = await P.map(moduleAddresses, moduleAddress =>
          getModuleInstance({
            address: moduleAddress,
            name: moduleName,
          })
        );

        return wrappedModules;
      }
      case ModuleName.CappedSTO: {
        wrappedModules = await P.map(moduleAddresses, moduleAddress =>
          getModuleInstance({
            address: moduleAddress,
            name: moduleName,
          })
        );

        return wrappedModules;
      }
      case ModuleName.UsdTieredSTO: {
        wrappedModules = await P.map(moduleAddresses, moduleAddress =>
          getModuleInstance({
            address: moduleAddress,
            name: moduleName,
          })
        );

        return wrappedModules;
      }
      case ModuleName.ERC20DividendCheckpoint: {
        wrappedModules = await P.map(moduleAddresses, moduleAddress =>
          getModuleInstance({
            address: moduleAddress,
            name: moduleName,
          })
        );

        return wrappedModules;
      }
      case ModuleName.EtherDividendCheckpoint: {
        wrappedModules = await P.map(moduleAddresses, moduleAddress =>
          getModuleInstance({
            address: moduleAddress,
            name: moduleName,
          })
        );

        return wrappedModules;
      }
      case ModuleName.VestingEscrowWallet: {
        wrappedModules = await P.map(moduleAddresses, moduleAddress =>
          getModuleInstance({
            address: moduleAddress,
            name: moduleName,
          })
        );

        return wrappedModules;
      }
      default: {
        throw new PolymathError({
          code: ErrorCode.InexistentModule,
          message: `There is no module with name ${moduleName}`,
        });
      }
    }
  };

  /**
   * Get data associated to a Checkpoint
   */
  public getCheckpoint = async ({
    /**
     * checkpoint UUID
     */
    checkpointId,
    /**
     * instance of the Security Token
     */
    securityToken,
  }: {
    checkpointId: number;
    securityToken: SecurityToken;
  }) => {
    const checkpointTimes = await securityToken.getCheckpointTimes();

    return this.getCheckpointData({
      checkpointId,
      time: checkpointTimes[checkpointId - 1],
      securityToken,
    });
  };

  /**
   * Get all Checkpoints of a Security Token
   */
  public getCheckpoints = async ({
    /**
     * instance of the Security Token
     */
    securityToken,
  }: {
    securityToken: SecurityToken;
  }) => {
    const checkpointTimes = await securityToken.getCheckpointTimes();

    const checkpoints = await P.map(checkpointTimes, (time, index) =>
      this.getCheckpointData({
        checkpointId: index + 1,
        time,
        securityToken,
      })
    );

    return checkpoints.sort((a, b) => {
      return a.index - b.index;
    });
  };

  /**
   * @hidden
   */
  private getCheckpointData = async ({
    checkpointId,
    time,
    securityToken,
  }: {
    checkpointId: number;
    time: Date;
    securityToken: SecurityToken;
  }): Promise<BaseCheckpoint> => {
    const totalSupply = await securityToken.totalSupplyAt({ checkpointId });
    const shareholderAddresses = await securityToken.getInvestorsAt({ checkpointId });

    const shareholderBalances = await P.map(shareholderAddresses, async shareholderAddress => {
      const balance = await securityToken.balanceOfAt({
        checkpointId,
        investor: shareholderAddress,
      });

      return {
        balance,
        address: shareholderAddress,
      };
    });

    return {
      index: checkpointId,
      totalSupply,
      shareholderBalances,
      createdAt: time,
    };
  };

  /**
   * Get data associated to a specific Dividend Distribution
   */
  public getDividend = async ({
    /**
     * index of the Dividend
     */
    dividendIndex,
    dividendsModule,
  }: {
    dividendIndex: number;
    dividendsModule: ERC20DividendCheckpoint;
  }): Promise<BaseDividend> => {
    const tokenAddress = await dividendsModule.dividendTokens({ dividendIndex });

    const token = await this.tokenFactory.getERC20TokenInstanceFromAddress(tokenAddress);

    const symbol = await token.symbol();

    const dividend = await dividendsModule.dividends({ dividendIndex });

    const dividendProgressList = await dividendsModule.getDividendProgress({ dividendIndex });

    const shareholders = dividendProgressList.map(
      ({ investor, claimed, excluded, withheld, amount, balance }) => ({
        address: investor,
        paymentReceived: claimed,
        excluded,
        withheldTax: withheld,
        amountReceived: amount,
        balance,
      })
    );

    const {
      checkpointId,
      created,
      maturity,
      expiry,
      amount,
      claimedAmount,
      totalSupply,
      reclaimed,
      totalWithheld,
      totalWithheldWithdrawn,
      name,
    } = dividend;

    return {
      index: dividendIndex,
      checkpointId,
      created,
      maturity,
      expiry,
      amount,
      claimedAmount,
      totalSupply,
      reclaimed,
      totalWithheld,
      totalWithheldWithdrawn,
      name,
      currency: symbol,
      shareholders,
    };
  };

  /**
   * Fetch list of all Dividends at a certain Checkpoint
   */
  public getDividendsByCheckpoint = async ({
    /**
     * checkpoint UUID
     */
    checkpointId,
    dividendsModule,
  }: {
    checkpointId: number;
    dividendsModule: ERC20DividendCheckpoint;
  }) => {
    const dividendIndexes = await dividendsModule.getDividendIndex({ checkpointId });

    const dividends = await P.map(dividendIndexes, dividendIndex =>
      this.getDividend({ dividendIndex, dividendsModule })
    );

    return dividends.sort((a, b) => a.index - b.index);
  };

  public getDividends = async ({
    dividendsModule,
  }: {
    dividendsModule: ERC20DividendCheckpoint;
  }) => {
    const stAddress = await dividendsModule.securityToken();
    const securityToken = await this.tokenFactory.getSecurityTokenInstanceFromAddress(stAddress);

    const currentCheckpointIndex = await securityToken.currentCheckpointId();
    const checkpointIndexes = range(1, currentCheckpointIndex.toNumber() + 1);
    const dividends = await P.map(checkpointIndexes, checkpointId =>
      this.getDividendsByCheckpoint({ checkpointId, dividendsModule })
    );

    return flatten(dividends).sort((a, b) => a.index - b.index);
  };

  /**
   * Auxiliary function to fetch all dividend distributions
   */
  public getAllDividends = async ({
    /**
     * symbol of the Security Token
     */
    securityTokenSymbol,
    /**
     * checkpoint UUID
     */
    checkpointId,
  }: {
    securityTokenSymbol: string;
    checkpointId?: number;
  }) => {
    const erc20Module = (await this.getAttachedModules(
      {
        moduleName: ModuleName.ERC20DividendCheckpoint,
        symbol: securityTokenSymbol,
      },
      { unarchived: true }
    ))[0];

    if (!erc20Module) {
      return [];
    }

    const dividends = await (checkpointId !== undefined
      ? this.getDividendsByCheckpoint({
          checkpointId,
          dividendsModule: erc20Module,
        })
      : this.getDividends({ dividendsModule: erc20Module }));

    return dividends;
  };

  public roleToPermission = async ({ role }: { role: SecurityTokenRole }) => {
    let moduleName: ModuleName;
    let permission: Perm;

    if (role === SecurityTokenRole.ShareholdersAdministrator) {
      moduleName = ModuleName.GeneralTransferManager;
      permission = Perm.Admin;
    } else if (role === SecurityTokenRole.PermissionsAdministrator) {
      moduleName = ModuleName.GeneralPermissionManager;
      permission = Perm.Admin;
    } else if (role === SecurityTokenRole.ShareholderCountRestrictionsAdministrator) {
      moduleName = ModuleName.CountTransferManager;
      permission = Perm.Admin;
    } else if (role === SecurityTokenRole.PercentageOwnershipRestrictionsAdministrator) {
      moduleName = ModuleName.PercentageTransferManager;
      permission = Perm.Admin;
    } else if (
      [SecurityTokenRole.DividendsAdministrator, SecurityTokenRole.DividendsOperator].includes(role)
    ) {
      moduleName = ModuleName.ERC20DividendCheckpoint;
      permission = role === SecurityTokenRole.DividendsAdministrator ? Perm.Admin : Perm.Operator;
    } else {
      throw new PolymathError({
        code: ErrorCode.FatalError,
        message: `Role ${role} not supported`,
      });
    }

    return {
      permission,
      moduleName,
    };
  };
}
