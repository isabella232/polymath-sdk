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
  EtherDividendCheckpoint,
  SecurityToken,
  ModuleType,
  BigNumber,
  Provider,
} from '@polymathnetwork/contract-wrappers';
import { range, flatten } from 'lodash';
import semver from 'semver';
import { PolymathError } from './PolymathError';
import { ErrorCode, DividendModuleType } from './types';

interface GetAttachedModulesParams {
  symbol: string;
  moduleName: ModuleName;
}

interface GetAttachedModulesOpts {
  unarchived: boolean;
}

interface GetAttachedGeneralPermissionManagersParams extends GetAttachedModulesParams {
  moduleName: ModuleName.GeneralPermissionManager;
}

interface GetAttachedCountTransferManagersParams extends GetAttachedModulesParams {
  moduleName: ModuleName.CountTransferManager;
}

interface GetAttachedGeneralTransferManagersParams extends GetAttachedModulesParams {
  moduleName: ModuleName.GeneralTransferManager;
}

interface GetAttachedManualApprovalTransferManagersParams extends GetAttachedModulesParams {
  moduleName: ModuleName.ManualApprovalTransferManager;
}

interface GetAttachedPercentageTransferManagersParams extends GetAttachedModulesParams {
  moduleName: ModuleName.PercentageTransferManager;
}

interface GetAttachedVolumeRestrictionTransferManagersParams extends GetAttachedModulesParams {
  moduleName: ModuleName.VolumeRestrictionTM;
}

interface GetAttachedCappedStosParams extends GetAttachedModulesParams {
  moduleName: ModuleName.CappedSTO;
}

interface GetAttachedUSDTieredStosParams extends GetAttachedModulesParams {
  moduleName: ModuleName.UsdTieredSTO;
}

interface GetAttachedErc20DividendCheckpointsParams extends GetAttachedModulesParams {
  moduleName: ModuleName.ERC20DividendCheckpoint;
}

interface GetAttachedEtherDividendCheckpointsParams extends GetAttachedModulesParams {
  moduleName: ModuleName.EtherDividendCheckpoint;
}

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
  (params: GetAttachedCappedStosParams, opts?: GetAttachedModulesOpts): Promise<CappedSTO[]>;
  (params: GetAttachedUSDTieredStosParams, opts?: GetAttachedModulesOpts): Promise<USDTieredSTO[]>;
  (params: GetAttachedErc20DividendCheckpointsParams, opts?: GetAttachedModulesOpts): Promise<
    ERC20DividendCheckpoint[]
  >;
  (params: GetAttachedEtherDividendCheckpointsParams, opts?: GetAttachedModulesOpts): Promise<
    EtherDividendCheckpoint[]
  >;
}

interface GetModuleFactoryAddressArgs {
  moduleName: ModuleName;
  tokenAddress: string;
}

export interface InvestorBalance {
  balance: BigNumber;
  address: string;
}

export interface BaseCheckpoint {
  index: number;
  totalSupply: BigNumber;
  investorBalances: InvestorBalance[];
  createdAt: Date;
}

export interface DividendInvestorStatus {
  address: string;
  paymentReceived: boolean;
  excluded: boolean;
  withheldTax: BigNumber;
  amountReceived: BigNumber;
  balance: BigNumber;
}

export interface BaseDividend {
  index: number;
  checkpointId: number;
  dividendType: DividendModuleType;
  created: Date;
  maturity: Date;
  expiry: Date;
  amount: BigNumber;
  claimedAmount: BigNumber;
  totalSupply: BigNumber;
  reclaimed: boolean;
  totalWithheld: BigNumber;
  totalWithheldWithdrawn: BigNumber;
  name: string;
  currency: string | null;
  investors: DividendInvestorStatus[];
}

export class PolymathBase extends PolymathAPI {
  constructor(params: {
    provider: Provider;
    polymathRegistryAddress?: string;
    defaultGasPrice?: BigNumber;
  }) {
    super(params);
  }

  public getModuleFactoryAddress = async ({
    moduleName,
    tokenAddress,
  }: GetModuleFactoryAddressArgs) => {
    const moduleTypes = {
      [ModuleName.CappedSTO]: ModuleType.STO,
      [ModuleName.UsdTieredSTO]: ModuleType.STO,
      [ModuleName.GeneralTransferManager]: ModuleType.TransferManager,
      [ModuleName.CountTransferManager]: ModuleType.TransferManager,
      [ModuleName.PercentageTransferManager]: ModuleType.TransferManager,
      [ModuleName.ManualApprovalTransferManager]: ModuleType.TransferManager,
      [ModuleName.VolumeRestrictionTM]: ModuleType.TransferManager,
      [ModuleName.ERC20DividendCheckpoint]: ModuleType.Dividends,
      [ModuleName.EtherDividendCheckpoint]: ModuleType.Dividends,
      [ModuleName.GeneralPermissionManager]: ModuleType.PermissionManager,
    };

    const availableModules = await this.moduleRegistry.getModulesByTypeAndToken({
      securityToken: tokenAddress,
      moduleType: moduleTypes[moduleName],
    });

    let address: string | null = null;
    let latestVersion: string = '0.0.0';

    // Get latest version of the module factory
    for (const moduleAddress of availableModules) {
      const moduleFactory = await this.moduleFactory.getModuleFactory(moduleAddress);
      const name = await moduleFactory.name();

      if (moduleName.localeCompare(name) === 0) {
        const version = await moduleFactory.version();
        if (semver.gte(version, latestVersion)) {
          latestVersion = version;
          address = moduleAddress;
        }
      }
    }

    if (address !== null) {
      return address;
    }

    throw new Error(`Module factory for "${moduleName}" was not found.`);
  };

  public getAttachedModules: GetAttachedModules = async (
    { symbol, moduleName }: GetAttachedModulesParams,
    opts?: GetAttachedModulesOpts
  ): Promise<any[]> => {
    const securityToken = await this.tokenFactory.getSecurityTokenInstanceFromTicker(symbol);

    const moduleAddresses = await securityToken.getModulesByName({ moduleName });

    let filteredModuleAddresses: string[] = [];

    if (opts && opts.unarchived) {
      // only return unarchived modules
      for (const moduleAddress of moduleAddresses) {
        const { archived } = await securityToken.getModule({ moduleAddress });

        if (!archived) {
          filteredModuleAddresses.push(moduleAddress);
        }
      }
    } else {
      filteredModuleAddresses = moduleAddresses;
    }

    // This has to be done this way because of typescript limitations
    const wrappedModules = [];
    switch (moduleName) {
      case ModuleName.GeneralPermissionManager: {
        for (const moduleAddress of filteredModuleAddresses) {
          const wrappedModule = await this.moduleFactory.getModuleInstance({
            address: moduleAddress,
            name: moduleName,
          });
          wrappedModules.push(wrappedModule);
        }
        return wrappedModules;
      }
      case ModuleName.CountTransferManager: {
        for (const moduleAddress of filteredModuleAddresses) {
          const wrappedModule = await this.moduleFactory.getModuleInstance({
            address: moduleAddress,
            name: moduleName,
          });
          wrappedModules.push(wrappedModule);
        }
        return wrappedModules;
      }
      case ModuleName.GeneralTransferManager: {
        for (const moduleAddress of filteredModuleAddresses) {
          const wrappedModule = await this.moduleFactory.getModuleInstance({
            address: moduleAddress,
            name: moduleName,
          });
          wrappedModules.push(wrappedModule);
        }
        return wrappedModules;
      }
      case ModuleName.ManualApprovalTransferManager: {
        for (const moduleAddress of filteredModuleAddresses) {
          const wrappedModule = await this.moduleFactory.getModuleInstance({
            address: moduleAddress,
            name: moduleName,
          });
          wrappedModules.push(wrappedModule);
        }
        return wrappedModules;
      }
      case ModuleName.PercentageTransferManager: {
        for (const moduleAddress of filteredModuleAddresses) {
          const wrappedModule = await this.moduleFactory.getModuleInstance({
            address: moduleAddress,
            name: moduleName,
          });
          wrappedModules.push(wrappedModule);
        }
        return wrappedModules;
      }
      case ModuleName.VolumeRestrictionTM: {
        for (const moduleAddress of filteredModuleAddresses) {
          const wrappedModule = await this.moduleFactory.getModuleInstance({
            address: moduleAddress,
            name: moduleName,
          });
          wrappedModules.push(wrappedModule);
        }
        return wrappedModules;
      }
      case ModuleName.CappedSTO: {
        for (const moduleAddress of filteredModuleAddresses) {
          const wrappedModule = await this.moduleFactory.getModuleInstance({
            address: moduleAddress,
            name: moduleName,
          });
          wrappedModules.push(wrappedModule);
        }
        return wrappedModules;
      }
      case ModuleName.UsdTieredSTO: {
        for (const moduleAddress of filteredModuleAddresses) {
          const wrappedModule = await this.moduleFactory.getModuleInstance({
            address: moduleAddress,
            name: moduleName,
          });
          wrappedModules.push(wrappedModule);
        }
        return wrappedModules;
      }
      case ModuleName.ERC20DividendCheckpoint: {
        for (const moduleAddress of filteredModuleAddresses) {
          const wrappedModule = await this.moduleFactory.getModuleInstance({
            address: moduleAddress,
            name: moduleName,
          });
          wrappedModules.push(wrappedModule);
        }
        return wrappedModules;
      }
      case ModuleName.EtherDividendCheckpoint: {
        for (const moduleAddress of filteredModuleAddresses) {
          const wrappedModule = await this.moduleFactory.getModuleInstance({
            address: moduleAddress,
            name: moduleName,
          });
          wrappedModules.push(wrappedModule);
        }
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

  public getCheckpoint = async ({
    checkpointId,
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

  public getCheckpoints = async ({ securityToken }: { securityToken: SecurityToken }) => {
    const checkpointTimes = await securityToken.getCheckpointTimes();

    const checkpoints = await Promise.all(
      checkpointTimes.map((time, index) =>
        this.getCheckpointData({
          checkpointId: index + 1,
          time,
          securityToken,
        })
      )
    );

    return checkpoints.sort((a, b) => {
      return a.index - b.index;
    });
  };

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
    const investorAddresses = await securityToken.getInvestorsAt({ checkpointId });

    const investorBalances = await Promise.all(
      investorAddresses.map(async investorAddress => {
        const balance = await securityToken.balanceOfAt({
          checkpointId,
          investor: investorAddress,
        });

        return {
          balance,
          address: investorAddress,
        };
      })
    );

    return {
      index: checkpointId,
      totalSupply,
      investorBalances,
      createdAt: time,
    };
  };

  public getDividend = async ({
    dividendIndex,
    dividendsModule,
  }: {
    dividendIndex: number;
    dividendsModule: ERC20DividendCheckpoint | EtherDividendCheckpoint;
  }): Promise<BaseDividend> => {
    let symbol: string;
    let dividendType: DividendModuleType;

    if (dividendsModule instanceof ERC20DividendCheckpoint) {
      const tokenAddress = await dividendsModule.dividendTokens({ dividendIndex });

      const token = await this.tokenFactory.getERC20TokenInstanceFromAddress(tokenAddress);

      symbol = await token.symbol();
      dividendType = DividendModuleType.Erc20;
    } else {
      symbol = 'ETH';
      dividendType = DividendModuleType.Eth;
    }

    const dividend = await dividendsModule.dividends({ dividendIndex });

    const dividendProgressList = await dividendsModule.getDividendProgress({ dividendIndex });

    const investors = dividendProgressList.map(
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
      dividendType,
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
      investors,
    };
  };

  public getDividendsByCheckpoint = async ({
    checkpointId,
    dividendsModule,
  }: {
    checkpointId: number;
    dividendsModule: ERC20DividendCheckpoint | EtherDividendCheckpoint;
  }) => {
    const dividendIndexes = await dividendsModule.getDividendIndex({ checkpointId });

    const dividends = await Promise.all(
      dividendIndexes.map(dividendIndex =>
        this.getDividend({ dividendIndex: dividendIndex.toNumber(), dividendsModule })
      )
    );

    return dividends.sort((a, b) => a.index - b.index);
  };

  public getDividends = async ({
    dividendsModule,
  }: {
    dividendsModule: ERC20DividendCheckpoint | EtherDividendCheckpoint;
  }) => {
    const stAddress = await dividendsModule.securityToken();
    const securityToken = await this.tokenFactory.getSecurityTokenInstanceFromAddress(stAddress);

    const currentCheckpointIndex = await securityToken.currentCheckpointId();
    const checkpointIndexes = range(1, currentCheckpointIndex.toNumber() + 1);
    const dividends = await Promise.all(
      checkpointIndexes.map(checkpointId =>
        this.getDividendsByCheckpoint({ checkpointId, dividendsModule })
      )
    );

    return flatten(dividends).sort((a, b) => a.index - b.index);
  };
}
