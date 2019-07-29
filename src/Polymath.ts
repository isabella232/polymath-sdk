import { includes, zipWith } from 'lodash';
import {
  ModuleName,
  conversionUtils,
  Provider,
  BlockParamLiteral,
  CappedSTOEvents,
  USDTieredSTOEvents,
  BigNumber,
} from '@polymathnetwork/contract-wrappers';
import {
  Web3ProviderEngine,
  PrivateKeyWalletSubprovider,
  RedundantSubprovider,
  RPCSubprovider,
} from '@0x/subproviders';
import { Context } from './Context';
import { getInjectedProvider } from './browserUtils';
import {
  TaxWithholdingEntry,
  PolymathNetworkParams,
  ErrorCode,
  ModuleOperation,
  DividendModuleType,
  FundraiseType,
  StoModuleType,
  CappedStoFundraiseType,
} from './types';
import {
  Dividend as DividendEntity,
  Checkpoint as CheckpointEntity,
  TaxWithholding as TaxWithholdingEntity,
  SecurityToken as SecurityTokenEntity,
  Erc20DividendsModule as Erc20DividendsModuleEntity,
  EthDividendsModule as EthDividendsModuleEntity,
  Erc20TokenBalance as Erc20TokenBalanceEntity,
  SecurityTokenReservation as SecurityTokenReservationEntity,
  CappedStoModule as CappedStoModuleEntity,
  UsdTieredStoModule as UsdTieredStoModuleEntity,
  Investment as InvestmentEntity,
  StoModule as StoModuleEntity,
} from './entities';

import {
  ReserveSecurityToken,
  EnableDividendModules,
  CreateCheckpoint,
  CreateErc20DividendDistribution,
  CreateEtherDividendDistribution,
  UpdateDividendsTaxWithholdingList,
  PushDividendPayment,
  WithdrawTaxes,
  CreateSecurityToken,
  SetDividendsWallet,
  ChangeDelegatePermission,
  EnableGeneralPermissionManager,
  ControllerTransfer,
  PauseSto,
  SetController,
  LaunchCappedSto,
} from './procedures';
import { Entity } from './entities/Entity';
import { DividendsModule } from './entities/DividendsModule';
import { PolymathError } from './PolymathError';
import { PolymathBase, BaseCheckpoint, BaseDividend } from './PolymathBase';

const { weiToValue } = conversionUtils;
const fullDecimals = new BigNumber(18);

// TODO @RafaelVidaurre: Type this correctly. It should return a contextualized
// version of T
const createContextualizedEntity = <T extends typeof Entity>(
  ClassToContextualize: T,
  polyClient: Polymath
): T => {
  class ContextualizedEntity extends (ClassToContextualize as any) {
    constructor(params: { [key: string]: any }) {
      super(params, polyClient);
    }
  }

  return (ContextualizedEntity as any) as T;
};

interface ContextualizedEntities {
  SecurityToken: typeof SecurityTokenEntity;
  Dividend: typeof DividendEntity;
  Checkpoint: typeof CheckpointEntity;
  Erc20DividendsModule: typeof Erc20DividendsModuleEntity;
  EthDividendsModule: typeof EthDividendsModuleEntity;
  TaxWithholding: typeof TaxWithholdingEntity;
  Erc20TokenBalance: typeof Erc20TokenBalanceEntity;
  SecurityTokenReservation: typeof SecurityTokenReservationEntity;
  CappedStoModule: typeof CappedStoModuleEntity;
  UsdTieredStoModule: typeof UsdTieredStoModuleEntity;
  Investment: typeof InvestmentEntity;
  StoModule: typeof StoModuleEntity;
}

export class Polymath {
  public networkId: number = -1;

  public isUnsupported: boolean = false;

  public isConnected: boolean = false;

  public polymathRegistryAddress: string = '';

  private contractWrappers: PolymathBase = {} as PolymathBase;

  private context: Context = {} as Context;

  private entities: ContextualizedEntities;

  constructor() {
    // TODO @RafaelVidaurre: type this correctly
    this.entities = {
      SecurityToken: createContextualizedEntity(SecurityTokenEntity as any, this),
      Erc20DividendsModule: createContextualizedEntity(Erc20DividendsModuleEntity as any, this),
      EthDividendsModule: createContextualizedEntity(EthDividendsModuleEntity as any, this),
      Dividend: createContextualizedEntity(DividendEntity as any, this),
      Checkpoint: createContextualizedEntity(CheckpointEntity as any, this),
      TaxWithholding: createContextualizedEntity(TaxWithholdingEntity as any, this),
      Erc20TokenBalance: createContextualizedEntity(Erc20TokenBalanceEntity as any, this),
      SecurityTokenReservation: createContextualizedEntity(
        SecurityTokenReservationEntity as any,
        this
      ),
      CappedStoModule: createContextualizedEntity(CappedStoModuleEntity as any, this),
      UsdTieredStoModule: createContextualizedEntity(UsdTieredStoModuleEntity as any, this),
      Investment: createContextualizedEntity(InvestmentEntity as any, this),
      StoModule: createContextualizedEntity(StoModuleEntity as any, this),
    };
  }

  public connect = async ({
    polymathRegistryAddress,
    providerUrl,
    privateKey,
  }: PolymathNetworkParams) => {
    let contractWrappers: PolymathBase;
    let provider: Provider;
    const providerEngine = new Web3ProviderEngine();
    const injectedProvider = await getInjectedProvider();

    if (providerUrl && privateKey) {
      providerEngine.addProvider(new PrivateKeyWalletSubprovider(privateKey));
      providerEngine.addProvider(new RedundantSubprovider([new RPCSubprovider(providerUrl)]));
      provider = providerEngine;
    } else if (injectedProvider) {
      provider = injectedProvider;
    } else {
      throw new PolymathError({
        code: ErrorCode.FatalError,
        message:
          "You must supply a provider URL and private key to the connect method if you're not using Polymath SDK in a browser environment",
      });
    }

    contractWrappers = new PolymathBase({ provider, polymathRegistryAddress });

    this.contractWrappers = contractWrappers;

    const account = await contractWrappers.getAccount();

    this.context = new Context({
      contractWrappers,
      accountAddress: account,
    });

    this.isConnected = true;

    return this;
  };

  public createSecurityToken = async (args: {
    securityTokenReservationId: string;
    name: string;
    detailsUrl?: string;
    divisible: boolean;
  }) => {
    const { securityTokenReservationId, ...rest } = args;
    const { symbol } = this.SecurityTokenReservation.unserialize(securityTokenReservationId);
    const procedure = new CreateSecurityToken(
      {
        symbol,
        ...rest,
      },
      this.context
    );
    return await procedure.prepare();
  };

  /**
   * Reserve a Security Token
   */
  public reserveSecurityToken = async (args: { symbol: string; name: string }) => {
    const procedure = new ReserveSecurityToken(args, this.context);
    const transactionQueue = await procedure.prepare();
    return transactionQueue;
  };

  /**
   * Launch a Capped STO
   *
   * @param securityTokenId token uuid
   * @param startTime date when the STO should start
   * @param endTime date when the STO should end
   * @param cap amount to be raised
   * @param rate amount of tokens an investor can purchase per unit of currency spent
   * @param fundRaiseType currency in which the funds will be raised (ETH, POLY)
   * @param fundsReceiver wallet address that will receive the funds that are being raised
   *
   */
  public launchCappedSto = async (args: {
    securityTokenId: string;
    startTime: Date;
    endTime: Date;
    cap: BigNumber;
    rate: BigNumber;
    fundRaiseType: CappedStoFundraiseType;
    fundsReceiver: string;
  }) => {
    const { securityTokenId, ...rest } = args;
    const { symbol } = this.SecurityToken.unserialize(securityTokenId);
    const procedure = new LaunchCappedSto(
      {
        symbol,
        ...rest,
      },
      this.context
    );
    return await procedure.prepare();
  };

  /**
   * Enable dividend modules (ERC20, ETH or both)
   *
   * @param securityTokenId token uuid
   * @param storageWalletAddress wallet that will receive reclaimed dividends and withheld taxes
   * @param types array containing the types of dividend modules to enable (will enable all if not present)
   */
  public enableDividendModules = async (args: {
    securityTokenId: string;
    storageWalletAddress: string;
    types?: DividendModuleType[];
  }) => {
    const { securityTokenId, ...rest } = args;
    const { symbol } = this.SecurityToken.unserialize(securityTokenId);
    const procedure = new EnableDividendModules(
      {
        symbol,
        ...rest,
      },
      this.context
    );
    return await procedure.prepare();
  };

  /**
   * Enable General Permission Manager module
   *
   * @param securityTokenId token uuid
   */
  public enablePermissionsModule = async (args: { securityTokenId: string }) => {
    const { symbol } = this.SecurityToken.unserialize(args.securityTokenId);
    const procedure = new EnableGeneralPermissionManager(
      {
        symbol,
      },
      this.context
    );
    return await procedure.prepare();
  };

  /**
   * Create investor supply checkpoint at the current date
   */
  public createCheckpoint = async (args: { securityTokenId: string }) => {
    const { securityTokenId, ...rest } = args;
    const { symbol } = this.SecurityToken.unserialize(securityTokenId);
    const procedure = new CreateCheckpoint(
      {
        symbol,
        ...rest,
      },
      this.context
    );
    return await procedure.prepare();
  };

  /**
   * Distribute dividends in POLY
   */
  public createPolyDividendDistribution = async (args: {
    securityTokenId: string;
    checkpointId: string;
    maturityDate: Date;
    expiryDate: Date;
    amount: BigNumber;
    name: string;
    excludedAddresses?: string[];
    taxWithholdings?: TaxWithholdingEntry[];
  }) => {
    const polyAddress = await this.context.contractWrappers.polyToken.address();
    const { securityTokenId, checkpointId, ...rest } = args;
    const { symbol } = this.SecurityToken.unserialize(securityTokenId);
    const { index: checkpointIndex } = this.Checkpoint.unserialize(checkpointId);
    const procedure = new CreateErc20DividendDistribution(
      {
        erc20Address: polyAddress,
        symbol,
        checkpointIndex,
        ...rest,
      },
      this.context
    );

    return await procedure.prepare();
  };

  /**
   * Distribute dividends in a specified ERC20 token
   */
  public createErc20DividendDistribution = async (args: {
    securityTokenId: string;
    checkpointId: string;
    maturityDate: Date;
    expiryDate: Date;
    erc20Address: string;
    amount: BigNumber;
    name: string;
    excludedAddresses?: string[];
    taxWithholdings?: TaxWithholdingEntry[];
  }) => {
    const { securityTokenId, checkpointId, ...rest } = args;
    const { symbol } = this.SecurityToken.unserialize(securityTokenId);
    const { index: checkpointIndex } = this.Checkpoint.unserialize(checkpointId);
    const procedure = new CreateErc20DividendDistribution(
      {
        symbol,
        checkpointIndex,
        ...rest,
      },
      this.context
    );
    return await procedure.prepare();
  };

  /**
   * Distribute dividends in ETH
   */
  public createEthDividendDistribution = async (args: {
    securityTokenId: string;
    checkpointId: string;
    maturityDate: Date;
    expiryDate: Date;
    erc20Address: string;
    amount: BigNumber;
    name: string;
    excludedAddresses?: string[];
    taxWithholdings?: TaxWithholdingEntry[];
  }) => {
    const { securityTokenId, checkpointId, ...rest } = args;
    const { symbol } = this.SecurityToken.unserialize(securityTokenId);
    const { index: checkpointIndex } = this.Checkpoint.unserialize(checkpointId);
    const procedure = new CreateEtherDividendDistribution(
      {
        symbol,
        checkpointIndex,
        ...rest,
      },
      this.context
    );
    return await procedure.prepare();
  };

  /**
   * Set tax withtholding list for a type of dividends
   */
  public updateDividendsTaxWithholdingList = async (args: {
    securityTokenId: string;
    dividendType: DividendModuleType;
    investorAddresses: string[];
    percentages: number[];
  }) => {
    const { securityTokenId, ...rest } = args;
    const { symbol } = this.SecurityToken.unserialize(securityTokenId);
    const procedure = new UpdateDividendsTaxWithholdingList(
      {
        symbol,
        ...rest,
      },
      this.context
    );
    return await procedure.prepare();
  };

  /**
   * Push dividends payments for a dividend distribution
   */
  public pushDividendPayment = async (args: {
    securityTokenId: string;
    dividendType: DividendModuleType;
    dividendIndex: number;
  }) => {
    const { securityTokenId, ...rest } = args;
    const { symbol } = this.SecurityToken.unserialize(securityTokenId);
    const procedure = new PushDividendPayment(
      {
        symbol,
        ...rest,
      },
      this.context
    );
    return await procedure.prepare();
  };

  /**
   * Change dividends module reclaiming wallet address
   */
  public setDividendsWallet = async (args: {
    securityTokenId: string;
    dividendType: DividendModuleType;
    address: string;
  }) => {
    const { securityTokenId, ...rest } = args;
    const { symbol } = this.SecurityToken.unserialize(securityTokenId);
    const procedure = new SetDividendsWallet(
      {
        symbol,
        ...rest,
      },
      this.context
    );
    return await procedure.prepare();
  };

  /**
   * Withdraw taxes from a dividend distribution
   */
  public withdrawTaxes = async (args: {
    securityTokenId: string;
    dividendType: DividendModuleType;
    dividendIndex: number;
  }) => {
    const { securityTokenId, ...rest } = args;
    const { symbol } = this.SecurityToken.unserialize(securityTokenId);
    const procedure = new WithdrawTaxes(
      {
        symbol,
        ...rest,
      },
      this.context
    );
    return await procedure.prepare();
  };

  /**
   * Grant or revoke permission to a delegate address
   */
  public changeDelegatePermission = async (args: {
    securityTokenId: string;
    delegate: string;
    op: ModuleOperation;
    isGranted: boolean;
    details?: string;
  }) => {
    const { securityTokenId, delegate, op, isGranted, details } = args;
    const { symbol } = this.SecurityToken.unserialize(securityTokenId);

    const procedure = new ChangeDelegatePermission(
      { symbol, delegate, op, isGranted, details },
      this.context
    );

    return await procedure.prepare();
  };

  public controllerTransfer = async (args: {
    securityTokenId: string;
    value: BigNumber;
    from: string;
    to: string;
    reason?: string;
    data?: string;
  }) => {
    const { securityTokenId, value, from, to, reason: reason = '', data: data = '' } = args;
    const { symbol } = this.SecurityToken.unserialize(securityTokenId);

    const procedure = new ControllerTransfer(
      { symbol, value, from, to, log: reason, data },
      this.context
    );

    return await procedure.prepare();
  };

  public setTokenController = async (args: { securityTokenId: string; controller: string }) => {
    const { securityTokenId, controller } = args;
    const { symbol } = this.SecurityToken.unserialize(securityTokenId);
    const procedure = new SetController({ symbol, controller }, this.context);

    return await procedure.prepare();
  };

  public pauseSto = async (args: { stoModuleId: string }) => {
    const { stoModuleId } = args;
    const { address } = this.StoModule.unserialize(stoModuleId);

    const procedure = new PauseSto({ stoModuleAddress: address }, this.context);

    return await procedure.prepare();
  };

  /**
   * Retrieve a security token
   */
  public getSecurityToken = async (
    args:
      | {
          symbol: string;
        }
      | string
  ) => {
    let symbol: string;

    // fetch by UUID
    if (typeof args === 'string') {
      ({ symbol } = this.SecurityToken.unserialize(args));
    } else {
      ({ symbol } = args);
    }

    let securityToken;

    try {
      securityToken = await this.contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(
        symbol
      );
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.FetcherValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    const name = await securityToken.name();
    const owner = await securityToken.owner();
    const address = await securityToken.address();

    return new this.SecurityToken({
      name,
      address,
      symbol,
      owner,
    });
  };

  /**
   * Retrieve a list of investor addresses and their corresponding tax withholding
   * percentages
   */
  public getDividendsTaxWithholdingList = async (
    args:
      | {
          securityTokenId: string;
          checkpointId: string;
          dividendType: DividendModuleType;
        }
      | string
  ) => {
    const {
      contractWrappers: { tokenFactory, getAttachedModules },
    } = this;

    let securityTokenId: string;
    let checkpointId: string;
    let dividendType: DividendModuleType;

    // fetch by UUID
    if (typeof args === 'string') {
      ({ securityTokenId, dividendType, checkpointId } = this.TaxWithholding.unserialize(args));
    } else {
      ({ securityTokenId, dividendType, checkpointId } = args);
    }

    const { symbol } = this.SecurityToken.unserialize(securityTokenId);

    try {
      await tokenFactory.getSecurityTokenInstanceFromTicker(symbol);
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.FetcherValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    let dividendsModule;
    if (dividendType === DividendModuleType.Erc20) {
      dividendsModule = (await getAttachedModules(
        { symbol, moduleName: ModuleName.ERC20DividendCheckpoint },
        { unarchived: true }
      ))[0];
    } else if (dividendType === DividendModuleType.Eth) {
      dividendsModule = (await getAttachedModules(
        { symbol, moduleName: ModuleName.EtherDividendCheckpoint },
        { unarchived: true }
      ))[0];
    }

    if (!dividendsModule) {
      throw new Error('There is no attached dividends module of the specified type');
    }

    const { index: checkpointIndex } = this.Checkpoint.unserialize(checkpointId);

    const checkpointData = await dividendsModule.getCheckpointData({
      checkpointId: checkpointIndex,
    });

    return checkpointData.map(
      ({ investor, withheld }) =>
        new this.TaxWithholding({
          investorAddress: investor,
          percentage: withheld.toNumber(),
          securityTokenSymbol: symbol,
          checkpointId,
          securityTokenId,
          dividendType,
          checkpointIndex,
        })
    );
  };

  /**
   * Retrieve list of checkpoints and their corresponding dividends
   *
   * @param dividendTypes array of dividend types that should be returned. Default value is both
   */
  public getCheckpoints = async (
    args: {
      securityTokenId: string;
    },
    opts?: { dividendTypes?: DividendModuleType[] }
  ): Promise<CheckpointEntity[]> => {
    const { contractWrappers } = this;
    const { securityTokenId } = args;

    const { symbol } = this.SecurityToken.unserialize(securityTokenId);

    let securityToken;

    try {
      securityToken = await this.contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(
        symbol
      );
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.FetcherValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    let dividendTypes: DividendModuleType[] | undefined;

    if (opts) {
      ({ dividendTypes } = opts);
    }

    const allDividends = await this.getAllDividends({
      securityTokenSymbol: symbol,
      dividendTypes,
    });

    const checkpoints: BaseCheckpoint[] = await contractWrappers.getCheckpoints({ securityToken });

    return checkpoints.map(checkpoint => {
      const checkpointDividends = allDividends.filter(
        dividend => dividend.checkpointId === checkpoint.index
      );

      return this.assembleCheckpoint({
        securityTokenId,
        securityTokenSymbol: symbol,
        checkpoint,
        checkpointDividends,
      });
    });
  };

  /**
   * Retrieve a checkpoint from a security token
   */
  public getCheckpoint = async (
    args:
      | {
          securityTokenId: string;
          checkpointIndex: number;
        }
      | string,
    opts?: { dividendTypes?: DividendModuleType[] }
  ) => {
    let securityTokenId: string;
    let checkpointIndex: number;

    // fetch by UUID
    if (typeof args === 'string') {
      ({ securityTokenId, index: checkpointIndex } = this.Checkpoint.unserialize(args));
    } else {
      ({ securityTokenId, checkpointIndex } = args);
    }

    let dividendTypes: DividendModuleType[] | undefined;

    if (opts) {
      ({ dividendTypes } = opts);
    }

    const { symbol: securityTokenSymbol } = this.SecurityToken.unserialize(securityTokenId);

    let securityToken;

    try {
      securityToken = await this.contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(
        securityTokenSymbol
      );
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.FetcherValidationError,
        message: `There is no Security Token with symbol ${securityTokenSymbol}`,
      });
    }

    const checkpointDividends = await this.getAllDividends({
      securityTokenSymbol,
      checkpointIndex,
      dividendTypes,
    });

    const checkpoint = await this.contractWrappers.getCheckpoint({
      checkpointId: checkpointIndex,
      securityToken,
    });

    return this.assembleCheckpoint({
      securityTokenId,
      securityTokenSymbol,
      checkpoint,
      checkpointDividends,
    });
  };

  /**
   * Retrieve all dividend distributions at a certain checkpoint
   */
  public getDividends = async (
    args: {
      securityTokenId: string;
      checkpointId: string;
    },
    opts?: { dividendTypes?: DividendModuleType[] }
  ) => {
    const { securityTokenId, checkpointId } = args;

    const { symbol } = this.SecurityToken.unserialize(securityTokenId);

    try {
      await this.contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(symbol);
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.FetcherValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    const { index: checkpointIndex } = this.Checkpoint.unserialize(checkpointId);

    let dividendTypes: DividendModuleType[] | undefined;

    if (opts) {
      ({ dividendTypes } = opts);
    }

    const checkpointDividends = await this.getAllDividends({
      securityTokenSymbol: symbol,
      checkpointIndex,
      dividendTypes,
    });

    const dividends = checkpointDividends.map(
      dividend =>
        new this.Dividend({
          ...dividend,
          checkpointId,
          securityTokenSymbol: symbol,
          securityTokenId,
        })
    );

    return dividends;
  };

  /**
   * Retrieve a particular dividend distribution at a certain checkpoint
   */
  public getDividend = async (
    args:
      | {
          securityTokenId: string;
          dividendType: DividendModuleType;
          dividendIndex: number;
        }
      | string
  ) => {
    let securityTokenId: string;
    let dividendType: DividendModuleType;
    let dividendIndex: number;

    // fetch by UUID
    if (typeof args === 'string') {
      ({ securityTokenId, index: dividendIndex, dividendType } = this.Dividend.unserialize(args));
    } else {
      ({ securityTokenId, dividendType, dividendIndex } = args);
    }

    const checkpoints = await this.getCheckpoints(
      {
        securityTokenId,
      },
      {
        dividendTypes: [dividendType],
      }
    );

    for (const checkpoint of checkpoints) {
      const { dividends } = checkpoint;

      const result = dividends.find(dividend => dividend.index === dividendIndex);

      if (result) {
        return result;
      }
    }

    throw new Error('There is no dividend of the specified type with that index.');
  };

  /**
   * Retrieve all STO modules attached to a security token
   */
  public getStoModules = async (
    args: {
      securityTokenId: string;
    },
    opts: {
      stoModuleTypes: StoModuleType[];
    } = {
      stoModuleTypes: [StoModuleType.Capped, StoModuleType.UsdTiered],
    }
  ) => {
    const { contractWrappers } = this;

    const { securityTokenId } = args;

    const { symbol: securityTokenSymbol } = this.SecurityToken.unserialize(securityTokenId);

    try {
      await this.contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(
        securityTokenSymbol
      );
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.FetcherValidationError,
        message: `There is no Security Token with symbol ${securityTokenSymbol}`,
      });
    }

    const constructorData = {
      securityTokenSymbol,
      securityTokenId,
    };

    const { stoModuleTypes } = opts;

    const stoModules = [];

    for (const stoType of stoModuleTypes) {
      let fetchedModules;
      if (stoType === StoModuleType.Capped) {
        fetchedModules = await contractWrappers.getAttachedModules(
          { symbol: securityTokenSymbol, moduleName: ModuleName.CappedSTO },
          { unarchived: true }
        );

        for (const module of fetchedModules) {
          const {
            fundsRaised,
            investorCount,
            totalTokensSold,
            isRaisedInPoly,
            ...details
          } = await module.getSTODetails();
          const tokenPurchases = await module.getLogsAsync({
            eventName: CappedSTOEvents.TokenPurchase,
            blockRange: {
              fromBlock: BlockParamLiteral.Earliest,
              toBlock: BlockParamLiteral.Latest,
            },
            indexFilterValues: {},
          });
          const investments = tokenPurchases.map(
            ({ args: { beneficiary, amount, value } }, index) => ({
              address: beneficiary,
              tokenAmount: weiToValue(amount, fullDecimals),
              investedFunds: weiToValue(value, fullDecimals),
              index,
            })
          );
          const address = await module.address();
          const paused = await module.paused();
          const capReached = await module.capReached();
          const stoModuleId = this.CappedStoModule.generateId({
            securityTokenId,
            stoType,
            address,
          });
          const investmentEntities = investments.map(
            investment => new this.Investment({ ...investment, ...constructorData, stoModuleId })
          );

          stoModules.push(
            new this.CappedStoModule({
              fundraiseTypes: isRaisedInPoly ? [FundraiseType.POLY] : [FundraiseType.ETH],
              raisedAmount: fundsRaised,
              soldTokensAmount: totalTokensSold,
              investorAmount: investorCount,
              ...details,
              ...constructorData,
              investments: investmentEntities,
              stoType,
              address,
              paused,
              capReached,
            })
          );
        }
      } else if (stoType === StoModuleType.UsdTiered) {
        fetchedModules = await contractWrappers.getAttachedModules(
          { symbol: securityTokenSymbol, moduleName: ModuleName.UsdTieredSTO },
          { unarchived: true }
        );

        for (const module of fetchedModules) {
          const {
            tokensSold,
            capPerTier,
            ratePerTier,
            fundsRaised,
            investorCount,
            isRaisedInETH,
            isRaisedInPOLY,
            isRaisedInSC,
            ...details
          } = await module.getSTODetails();
          const tokenPurchases = await module.getLogsAsync({
            eventName: USDTieredSTOEvents.TokenPurchase,
            blockRange: {
              fromBlock: BlockParamLiteral.Earliest,
              toBlock: BlockParamLiteral.Latest,
            },
            indexFilterValues: {},
          });
          const investments = tokenPurchases.map(
            ({ args: { _usdAmount, _beneficiary, _tokens } }, index) => ({
              address: _beneficiary,
              tokenAmount: weiToValue(_tokens, fullDecimals),
              investedFunds: weiToValue(_usdAmount, fullDecimals),
              index,
            })
          );
          const address = await module.address();
          const paused = await module.paused();
          const capReached = await module.capReached();
          const stoModuleId = this.UsdTieredStoModule.generateId({
            securityTokenId,
            stoType,
            address,
          });
          const investmentEntities = investments.map(
            investment => new this.Investment({ ...investment, ...constructorData, stoModuleId })
          );

          const tiers = zipWith(capPerTier, ratePerTier, (cap, rate) => ({ cap, rate }));

          const fundraiseTypes = [];

          if (isRaisedInETH) {
            fundraiseTypes.push(FundraiseType.ETH);
          }

          if (isRaisedInPOLY) {
            fundraiseTypes.push(FundraiseType.POLY);
          }

          if (isRaisedInSC) {
            fundraiseTypes.push(FundraiseType.StableCoin);
          }

          stoModules.push(
            new this.UsdTieredStoModule({
              fundraiseTypes,
              raisedAmount: fundsRaised,
              investorAmount: investorCount,
              soldTokensAmount: tokensSold,
              ...details,
              ...constructorData,
              tiers,
              investments: investmentEntities,
              stoType,
              address,
              paused,
              capReached,
            })
          );
        }
      } else {
        throw new PolymathError({
          message: `Invalid STO module type ${stoType} requested.`,
          code: ErrorCode.FetcherValidationError,
        });
      }
    }

    return stoModules;
  };

  /**
   * Retrieve a dividends module attached to a security token
   */
  public getDividendsModule = async (
    args:
      | {
          securityTokenId: string;
          dividendType: DividendModuleType;
        }
      | string
  ) => {
    const { contractWrappers } = this;

    let securityTokenId: string;
    let dividendType: DividendModuleType;

    // fetch by UUID
    if (typeof args === 'string') {
      ({ securityTokenId, dividendType } = DividendsModule.unserialize(args));
    } else {
      ({ securityTokenId, dividendType } = args);
    }

    const { symbol } = this.SecurityToken.unserialize(securityTokenId);

    try {
      await this.contractWrappers.tokenFactory.getSecurityTokenInstanceFromTicker(symbol);
    } catch (err) {
      throw new PolymathError({
        code: ErrorCode.FetcherValidationError,
        message: `There is no Security Token with symbol ${symbol}`,
      });
    }

    const constructorData = {
      securityTokenSymbol: symbol,
      securityTokenId,
    };

    let dividendsModule;

    switch (dividendType) {
      case DividendModuleType.Erc20: {
        dividendsModule = (await contractWrappers.getAttachedModules(
          { symbol, moduleName: ModuleName.ERC20DividendCheckpoint },
          { unarchived: true }
        ))[0];

        if (dividendsModule) {
          const storageWalletAddress = await dividendsModule.wallet();
          return new this.Erc20DividendsModule({
            address: await dividendsModule.address(),
            storageWalletAddress,
            ...constructorData,
          });
        }

        break;
      }
      case DividendModuleType.Erc20: {
        dividendsModule = (await contractWrappers.getAttachedModules(
          { symbol, moduleName: ModuleName.EtherDividendCheckpoint },
          { unarchived: true }
        ))[0];

        if (dividendsModule) {
          const storageWalletAddress = await dividendsModule.wallet();
          return new this.EthDividendsModule({
            address: await dividendsModule.address(),
            storageWalletAddress,
            ...constructorData,
          });
        }

        break;
      }
      default: {
        throw new Error('Invalid dividend module type. Must be "Erc20" or "Eth".');
      }
    }

    return null;
  };

  /**
   * Retrieve the ERC20 dividends module attached to a security token
   */
  public getErc20DividendsModule = async (args: { securityTokenId: string } | string) => {
    // fetch by UUID
    if (typeof args === 'string') {
      return this.getDividendsModule(args);
    }

    return this.getDividendsModule({
      securityTokenId: args.securityTokenId,
      dividendType: DividendModuleType.Erc20,
    });
  };

  /**
   * Retrieve the ETH dividends module attached to a security token
   */
  public getEthDividendsModule = async (args: { securityTokenId: string } | string) => {
    // fetch by UUID
    if (typeof args === 'string') {
      return this.getDividendsModule(args);
    }

    return this.getDividendsModule({
      securityTokenId: args.securityTokenId,
      dividendType: DividendModuleType.Eth,
    });
  };

  /**
   * Check if a token follows the ERC20 standard
   */
  public isValidErc20 = async (args: { address: string }) => {
    const { address } = args;
    const erc20Token = await this.contractWrappers.tokenFactory.getERC20TokenInstanceFromAddress(
      address
    );
    return await erc20Token.isValidContract();
  };

  public getErc20TokenBalance = async (
    args:
      | {
          tokenAddress: string;
          walletAddress: string;
        }
      | string
  ) => {
    let tokenAddress: string;
    let walletAddress: string;

    // fetch by UUID
    if (typeof args === 'string') {
      ({ tokenAddress, walletAddress } = this.Erc20TokenBalance.unserialize(args));
    } else {
      ({ tokenAddress, walletAddress } = args);
    }

    const token = await this.contractWrappers.tokenFactory.getERC20TokenInstanceFromAddress(
      tokenAddress
    );
    const [symbol, balance] = await Promise.all([
      token.symbol(),
      token.balanceOf({ owner: walletAddress }),
    ]);

    return new this.Erc20TokenBalance({
      tokenSymbol: symbol,
      tokenAddress,
      balance,
      walletAddress,
    });
  };

  public getLatestProtocolVersion = async () => {
    return await this.contractWrappers.securityTokenRegistry.getLatestProtocolVersion();
  };

  get SecurityToken() {
    return this.entities.SecurityToken;
  }

  get Checkpoint() {
    return this.entities.Checkpoint;
  }

  get Dividend() {
    return this.entities.Dividend;
  }

  get Erc20DividendsModule() {
    return this.entities.Erc20DividendsModule;
  }

  get EthDividendsModule() {
    return this.entities.EthDividendsModule;
  }

  get TaxWithholding() {
    return this.entities.TaxWithholding;
  }

  get Erc20TokenBalance() {
    return this.entities.Erc20TokenBalance;
  }

  get SecurityTokenReservation() {
    return this.entities.SecurityTokenReservation;
  }

  get CappedStoModule() {
    return this.entities.CappedStoModule;
  }

  get UsdTieredStoModule() {
    return this.entities.UsdTieredStoModule;
  }

  get Investment() {
    return this.entities.Investment;
  }

  get StoModule() {
    return this.entities.StoModule;
  }

  /**
   * Auxiliary function to create a checkpoint entity
   */
  private assembleCheckpoint = ({
    securityTokenId,
    securityTokenSymbol,
    checkpoint,
    checkpointDividends,
  }: {
    securityTokenId: string;
    securityTokenSymbol: string;
    checkpoint: BaseCheckpoint;
    checkpointDividends: BaseDividend[];
  }) => {
    const checkpointId = this.Checkpoint.generateId({
      securityTokenId,
      index: checkpoint.index,
    });

    const dividends = checkpointDividends.map(
      dividend =>
        new this.Dividend({
          ...dividend,
          checkpointId,
          securityTokenSymbol,
          securityTokenId,
        })
    );

    const checkpointEntity = new this.Checkpoint({
      ...checkpoint,
      securityTokenId,
      securityTokenSymbol,
      dividends,
    });

    return checkpointEntity;
  };

  /**
   * Auxiliary function to fetch all dividend distributions
   */
  private getAllDividends = async ({
    securityTokenSymbol,
    checkpointIndex,
    dividendTypes = [DividendModuleType.Erc20, DividendModuleType.Eth],
  }: {
    securityTokenSymbol: string;
    checkpointIndex?: number;
    dividendTypes?: DividendModuleType[];
  }) => {
    const dividends = [];

    const { contractWrappers } = this;

    if (includes(dividendTypes, DividendModuleType.Erc20)) {
      const erc20Module = (await contractWrappers.getAttachedModules(
        {
          moduleName: ModuleName.ERC20DividendCheckpoint,
          symbol: securityTokenSymbol,
        },
        { unarchived: true }
      ))[0];

      if (erc20Module) {
        const erc20Dividends = await (checkpointIndex !== undefined
          ? contractWrappers.getDividendsByCheckpoint({
              checkpointId: checkpointIndex,
              dividendsModule: erc20Module,
            })
          : contractWrappers.getDividends({ dividendsModule: erc20Module }));
        dividends.push(...erc20Dividends);
      }
    }

    if (includes(dividendTypes, DividendModuleType.Eth)) {
      const etherModule = (await contractWrappers.getAttachedModules(
        {
          moduleName: ModuleName.EtherDividendCheckpoint,
          symbol: securityTokenSymbol,
        },
        { unarchived: true }
      ))[0];

      if (etherModule) {
        const etherDividends = await (checkpointIndex !== undefined
          ? contractWrappers.getDividendsByCheckpoint({
              checkpointId: checkpointIndex,
              dividendsModule: etherModule,
            })
          : contractWrappers.getDividends({ dividendsModule: etherModule }));
        dividends.push(...etherDividends);
      }
    }

    return dividends;
  };
}
