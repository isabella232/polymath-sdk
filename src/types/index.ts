import {
  PolyResponse,
  BigNumber,
  FundRaiseType as Currency,
  CappedSTOFundRaiseType as CappedStoCurrency,
  GeneralTransferManager,
  GeneralPermissionManager,
  CountTransferManager,
  ManualApprovalTransferManager,
  PercentageTransferManager,
  VolumeRestrictionTransferManager,
  CappedSTO,
  USDTieredSTO,
  ERC20DividendCheckpoint,
  EtherDividendCheckpoint,
  VestingEscrowWallet,
  BlacklistTransferManager,
  LockUpTransferManager,
  RestrictedPartialSaleTransferManager,
  ModuleName,
} from '@polymathnetwork/contract-wrappers';
import { isPlainObject } from 'lodash';
import { PostTransactionResolver } from '../PostTransactionResolver';

export { CappedStoCurrency, Currency };

export interface DividendShareholderStatus {
  address: string;
  paymentReceived: boolean;
  excluded: boolean;
  withheldTax: BigNumber;
  amountReceived: BigNumber;
  balance: BigNumber;
}

export enum DividendType {
  Erc20 = 'Erc20',
  Eth = 'Eth',
}

export function isDividendType(type: any): type is DividendType {
  return typeof type === 'string' && (type === DividendType.Erc20 || type === DividendType.Eth);
}

export enum StoType {
  Capped = 'Capped',
  UsdTiered = 'UsdTiered',
}

export function isStoType(type: any): type is StoType {
  return typeof type === 'string' && (type === StoType.UsdTiered || type === StoType.Capped);
}

export interface TaxWithholdingEntry {
  address: string;
  percentage: number;
}

export interface MintingDataEntry {
  address: string;
  amount: BigNumber;
  shareholderData?: Omit<ShareholderDataEntry, 'address'>;
}

export enum ErrorCode {
  IncompatibleBrowser = 'IncompatibleBrowser',
  FeatureNotEnabled = 'FeatureNotEnabled',
  NonBrowserEnvironment = 'NonBrowserEnvironment',
  MetamaskNotInstalled = 'MetamaskNotInstalled',
  UserDeniedAccess = 'UserDeniedAccess',
  WalletIsLocked = 'WalletIsLocked',
  ProcedureValidationError = 'ProcedureValidationError',
  FetcherValidationError = 'FetcherValidationError',
  TransactionRejectedByUser = 'TransactionRejectedByUser',
  TransactionReverted = 'TransactionReverted',
  FatalError = 'FatalError',
  UnexpectedReturnData = 'UnexpectedReturnData',
  UnexpectedEventLogs = 'UnexpectedEventLogs',
  InvalidUuid = 'InvalidUuid',
  InvalidAddress = 'InvalidAddress',
  InsufficientBalance = 'InsufficientBalance',
  InexistentModule = 'InexistentModule',
}

export interface ShareholderBalance {
  address: string;
  balance: BigNumber;
}

export type LowLevelMethod<A> = (args: A) => Promise<PolyResponse>;

export interface TransactionSpec<Args = any, R extends any = any> {
  method: LowLevelMethod<Args>;
  args: MapMaybeResolver<Args>;
  postTransactionResolver?: PostTransactionResolver<R>;
  tag?: PolyTransactionTag;
}

export enum ProcedureType {
  UnnamedProcedure = 'UnnamedProcedure',
  ApproveErc20 = 'ApproveErc20',
  TransferErc20 = 'TransferErc20',
  CreateCheckpoint = 'CreateCheckpoint',
  EnableDividendManagers = 'EnableDividendManagers',
  EnableGeneralPermissionManager = 'EnableGeneralPermissionManager',
  EnableGeneralTransferManager = 'EnableGeneralTransferManager',
  LaunchCappedSto = 'LaunchCappedSto',
  LaunchUsdTieredSto = 'LaunchUsdTieredSto',
  CreateErc20DividendDistribution = 'CreateErc20DividendDistribution',
  CreateEtherDividendDistribution = 'CreateEtherDividendDistribution',
  CreateSecurityToken = 'CreateSecurityToken',
  ReclaimFunds = 'ReclaimFunds',
  ReserveSecurityToken = 'ReserveSecurityToken',
  WithdrawTaxes = 'WithdrawTaxes',
  UpdateDividendsTaxWithholdingList = 'UpdateDividendsTaxWithholdingList',
  SetDividendsWallet = 'SetDividendsWallet',
  PushDividendPayment = 'PushDividendPayment',
  AssignSecurityTokenRole = 'AssignSecurityTokenRole',
  AssignStoRole = 'AssignStoRole',
  ControllerTransfer = 'ControllerTransfer',
  PauseSto = 'PauseSto',
  SetController = 'SetController',
  ModifyShareholderData = 'ModifyShareholderData',
  RevokeKyc = 'RevokeKyc',
  MintTokens = 'MintTokens',
}

export enum PolyTransactionTag {
  Any = 'Any',
  GetTokens = 'GetTokens',
  ApproveErc20 = 'ApproveErc20',
  TransferErc20 = 'TransferErc20',
  ReserveSecurityToken = 'ReserveSecurityToken',
  CreateSecurityToken = 'CreateSecurityToken',
  CreateCheckpoint = 'CreateCheckpoint',
  CreateErc20DividendDistribution = 'CreateErc20DividendDistribution',
  CreateEtherDividendDistribution = 'CreateEtherDividendDistribution',
  SetErc20TaxWithholding = 'SetErc20TaxWithholding',
  SetEtherTaxWithholding = 'SetEtherTaxWithholding',
  EnableDividends = 'EnableDividends',
  EnableCappedSto = 'EnableCappedSto',
  EnableUsdTieredSto = 'EnableUsdTieredSto',
  EnableGeneralPermissionManager = 'EnableGeneralPermissionManager',
  EnableGeneralTransferManager = 'EnableGeneralTransferManager',
  DisableFeature = 'DisableFeature',
  ReclaimDividendFunds = 'ReclaimDividendFunds',
  WithdrawTaxWithholdings = 'WithdrawTaxWithholdings',
  PushDividendPayment = 'PushDividendPayment',
  SetDividendsWallet = 'SetDividendsWallet',
  AddDelegate = 'AddDelegate',
  ChangePermission = 'ChangePermission',
  ControllerTransfer = 'ControllerTransfer',
  PauseSto = 'PauseSto',
  SetController = 'SetController',
  ModifyKycDataMulti = 'ModifyKycDataMulti',
  ModifyInvestorFlagMulti = 'ModifyInvestorFlagMulti',
  IssueMulti = 'IssueMulti',
}

export type MaybeResolver<T> = PostTransactionResolver<T> | T;

export type MapMaybeResolver<T> = { [K in keyof T]: MaybeResolver<T[K]> };

// TODO @monitz87: remake this interface when contract-wrappers exports the tx arguments
// export interface TransactionArguments {
//   [PolyTransactionTag.Any]: {};
//   [PolyTransactionTag.SetErc20TaxWithholding]: Partial<SetWithholdingArgs>;
//   [PolyTransactionTag.SetEtherTaxWithholding]: Partial<SetWithholdingArgs>;
//   [PolyTransactionTag.ReclaimDividendFunds]: Partial<ReclaimDividendArgs>;
//   [PolyTransactionTag.WithdrawTaxWithholdings]: Partial<WithdrawWithholdingArgs>;
//   [PolyTransactionTag.CreateErc20DividendDistribution]: Partial<CreateErc20DividendArgs>;
//   [PolyTransactionTag.CreateEtherDividendDistribution]: Partial<CreateEtherDividendArgs>;
//   [PolyTransactionTag.GetTokens]: Partial<GetTokensArgs>;
//   [PolyTransactionTag.ApprovePoly]: Partial<ApproveArgs>;
//   [PolyTransactionTag.EnableDividends]: Partial<AddDividendsModuleArgs>;
//   [PolyTransactionTag.ReserveSecurityToken]: Partial<RegisterTickerArgs>;
//   [PolyTransactionTag.CreateSecurityToken]: Partial<GenerateNewSecurityTokenArgs>;
//   [PolyTransactionTag.PushDividendPayment]: Partial<PushDividendPaymentArgs>;
//   [PolyTransactionTag.SetDividendsWallet]: Partial<SetDividendsWalletArgs>;
//   [PolyTransactionTag.CreateCheckpoint]: {};
// }

// Procedure arguments

export interface ApproveErc20ProcedureArgs {
  amount: BigNumber;
  spender: string;
  tokenAddress?: string;
}

export interface TransferErc20ProcedureArgs {
  amount: BigNumber;
  receiver: string;
  tokenAddress?: string;
}

export interface CreateCheckpointProcedureArgs {
  symbol: string;
}

export interface CreateErc20DividendDistributionProcedureArgs {
  symbol: string;
  maturityDate: Date;
  expiryDate: Date;
  erc20Address: string;
  amount: BigNumber;
  checkpointIndex: number;
  name: string;
  excludedAddresses?: string[];
  taxWithholdings?: TaxWithholdingEntry[];
}

export interface CreateEtherDividendDistributionProcedureArgs {
  symbol: string;
  maturityDate: Date;
  expiryDate: Date;
  amount: BigNumber;
  checkpointIndex: number;
  name: string;
  excludedAddresses?: string[];
  taxWithholdings?: TaxWithholdingEntry[];
}

export interface PushDividendPaymentProcedureArgs {
  symbol: string;
  dividendIndex: number;
  dividendType: DividendType;
  shareholderAddresses?: string[];
}

export interface CreateSecurityTokenProcedureArgs {
  name: string;
  symbol: string;
  detailsUrl?: string;
  divisible: boolean;
  treasuryWallet?: string;
}

export interface EnableDividendManagersProcedureArgs {
  symbol: string;
  storageWalletAddress: string;
  types?: DividendType[];
}

export interface EnableGeneralPermissionManagerProcedureArgs {
  symbol: string;
}

export interface EnableGeneralTransferManagerProcedureArgs {
  symbol: string;
}

export interface DisableFeatureProcedureArgs {
  symbol: string;
  moduleName: ModuleName;
}

export interface LaunchCappedStoProcedureArgs {
  symbol: string;
  startDate: Date;
  endDate: Date;
  tokensOnSale: BigNumber;
  rate: BigNumber;
  currency: CappedStoCurrency;
  storageWallet: string;
  treasuryWallet: string;
}

export interface MintTokensProcedureArgs {
  symbol: string;
  mintingData: MintingDataEntry[];
}

export interface StoTier {
  /**
   * Amount of tokens to sell in this tier
   */
  tokensOnSale: BigNumber;
  /**
   * Price of each token in this tier in USD
   */
  price: BigNumber;
  /**
   * Amount of tokens to sell at a discount if paid in POLY.
   * Must be less than the amount of tokens on sale
   */
  tokensWithDiscount?: BigNumber;
  /**
   * Price of tokens sold at a discount
   */
  discountedPrice?: BigNumber;
}

export interface LaunchUsdTieredStoProcedureArgs {
  symbol: string;
  startDate: Date;
  endDate: Date;
  tiers: StoTier[];
  nonAccreditedInvestmentLimit: BigNumber;
  minimumInvestment: BigNumber;
  currencies: Currency[];
  storageWallet: string;
  treasuryWallet: string;
  usdTokenAddresses: string[];
}

export interface ReclaimFundsProcedureArgs {
  symbol: string;
  dividendIndex: number;
  dividendType: DividendType;
}

export interface ReserveSecurityTokenProcedureArgs {
  symbol: string;
  owner?: string;
}

export interface WithdrawTaxesProcedureArgs {
  symbol: string;
  dividendIndex: number;
  dividendType: DividendType;
}

export interface UpdateDividendsTaxWithholdingListProcedureArgs {
  symbol: string;
  dividendType: DividendType;
  shareholderAddresses: string[];
  percentages: number[];
}

export interface SetDividendsWalletProcedureArgs {
  symbol: string;
  dividendType: DividendType;
  address: string;
}

export interface AssignSecurityTokenRoleProcedureArgs {
  symbol: string;
  delegateAddress: string;
  role: SecurityTokenRole;
  assign: boolean;
  description: string;
}

export interface AssignStoRoleProcedureArgs {
  symbol: string;
  delegateAddress: string;
  stoAddress: string;
  role: StoRole;
  assign: boolean;
  description?: string;
}

export interface ControllerTransferProcedureArgs {
  from: string;
  to: string;
  symbol: string;
  amount: BigNumber;
  data?: string;
  log?: string;
}

export interface PauseStoProcedureArgs {
  symbol: string;
  stoAddress: string;
  stoType: StoType;
}

export interface SetControllerProcedureArgs {
  symbol: string;
  controller: string;
}

export interface ShareholderDataEntry {
  /**
   * shareholder wallet address to whitelist
   */
  address: string;
  /**
   * date from which the shareholder can transfer tokens
   */
  canSendAfter: Date;
  /**
   * date from which the shareholder can receive tokens
   */
  canReceiveAfter: Date;
  /**
   * date at which the shareholder's KYC expires
   */
  kycExpiry: Date;
  /**
   * whether the shareholder is accredited
   */
  isAccredited: boolean;
  /**
   * whether the shareholder is allowed to purchase tokens in an STO
   */
  canBuyFromSto: boolean;
}

export interface ModifyShareholderDataProcedureArgs {
  symbol: string;
  shareholderData: ShareholderDataEntry[];
}

export interface RevokeKycProcedureArgs {
  symbol: string;
  shareholderAddresses: string[];
}

export interface ProcedureArguments {
  [ProcedureType.ApproveErc20]: ApproveErc20ProcedureArgs;
  [ProcedureType.TransferErc20]: TransferErc20ProcedureArgs;
  [ProcedureType.CreateCheckpoint]: CreateCheckpointProcedureArgs;
  [ProcedureType.CreateErc20DividendDistribution]: CreateErc20DividendDistributionProcedureArgs;
  [ProcedureType.CreateEtherDividendDistribution]: CreateEtherDividendDistributionProcedureArgs;
  [ProcedureType.CreateSecurityToken]: CreateSecurityTokenProcedureArgs;
  [ProcedureType.EnableDividendManagers]: EnableDividendManagersProcedureArgs;
  [ProcedureType.ReclaimFunds]: ReclaimFundsProcedureArgs;
  [ProcedureType.ReserveSecurityToken]: ReserveSecurityTokenProcedureArgs;
  [ProcedureType.WithdrawTaxes]: WithdrawTaxesProcedureArgs;
  [ProcedureType.UpdateDividendsTaxWithholdingList]: UpdateDividendsTaxWithholdingListProcedureArgs;
  [ProcedureType.PushDividendPayment]: PushDividendPaymentProcedureArgs;
  [ProcedureType.SetDividendsWallet]: SetDividendsWalletProcedureArgs;
  [ProcedureType.LaunchCappedSto]: LaunchCappedStoProcedureArgs;
  [ProcedureType.LaunchUsdTieredSto]: LaunchUsdTieredStoProcedureArgs;
  [ProcedureType.PauseSto]: PauseStoProcedureArgs;
  [ProcedureType.ControllerTransfer]: ControllerTransferProcedureArgs;
  [ProcedureType.SetController]: SetControllerProcedureArgs;
  [ProcedureType.AssignSecurityTokenRole]: AssignSecurityTokenRoleProcedureArgs;
  [ProcedureType.AssignStoRole]: AssignStoRoleProcedureArgs;
  [ProcedureType.ModifyShareholderData]: ModifyShareholderDataProcedureArgs;
  [ProcedureType.RevokeKyc]: RevokeKycProcedureArgs;
  [ProcedureType.MintTokens]: MintTokensProcedureArgs;
  [ProcedureType.UnnamedProcedure]: {};
}

export enum TransactionStatus {
  Idle = 'Idle',
  Unapproved = 'Unapproved',
  Running = 'Running',
  Rejected = 'Rejected',
  Succeeded = 'Succeeded',
  Failed = 'Failed',
}

export enum TransactionQueueStatus {
  Idle = 'Idle',
  Running = 'Running',
  Failed = 'Failed',
  Succeeded = 'Succeeded',
}

export interface Fees {
  usd: BigNumber | null;
  poly: BigNumber;
}

export interface Pojo {
  [key: string]:
    | string
    | number
    | boolean
    | null
    | Pojo
    | BigNumber
    | Date
    | (string | number | boolean | null | Pojo | BigNumber | Date)[];
}

export function isPojo(pojo: any): pojo is Pojo {
  if (!pojo) {
    return false;
  }

  const props = Object.getOwnPropertyNames(pojo);

  return (
    props.every(prop => {
      return typeof pojo[prop] !== 'function';
    }) && isPlainObject(pojo)
  );
}

export type Omit<T, K> = { [key in Exclude<keyof T, K>]: T[key] };

export enum TransactionSpeed {
  Slow = 'Slow',
  Medium = 'Medium',
  Fast = 'Fast',
  Fastest = 'Fastest',
}

export enum Feature {
  Permissions = 'Permissions',
  Shareholders = 'Shareholders',
  Erc20Dividends = 'Erc20Dividends',
  EtherDividends = 'EtherDividends',
}

export enum SecurityTokenRole {
  PermissionsAdministrator = 'PermissionsAdministrator',
  Erc20DividendsOperator = 'Erc20DividendsOperator',
  Erc20DividendsAdministrator = 'Erc20DividendsAdministrator',
  EtherDividendsOperator = 'EtherDividendsOperator',
  EtherDividendsAdministrator = 'EtherDividendsAdministrator',
  ShareholdersAdministrator = 'ShareholdersAdministrator',
}

export enum StoRole {
  StoOperator = 'StoOperator',
  StoAdministrator = 'StoAdministrator',
}

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
