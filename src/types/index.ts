import {
  BigNumber,
  FundRaiseType as Currency,
  ContractVersion as Version,
  ModuleName,
  PolyResponse,
  TransactionReceiptWithDecodedLogs,
} from '@polymathnetwork/contract-wrappers';
import { isPlainObject } from 'lodash';
import { PostTransactionResolver } from '../PostTransactionResolver';

/*
 * External Types
 */

export { Currency };
export { Version };

export interface DividendShareholderStatus {
  address: string;
  paymentReceived: boolean;
  excluded: boolean;
  withheldTax: BigNumber;
  amountReceived: BigNumber;
  balance: BigNumber;
}

export enum StoType {
  Simple = 'Simple',
  Tiered = 'Tiered',
}

export function isStoType(type: any): type is StoType {
  return typeof type === 'string' && (type === StoType.Tiered || type === StoType.Simple);
}

export interface TaxWithholdingEntry {
  address: string;
  percentage: number;
}

export interface IssuanceDataEntry {
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
  IncorrectVersion = 'IncorrecVersion',
}

export interface ShareholderBalance {
  address: string;
  balance: BigNumber;
}

export enum ProcedureType {
  UnnamedProcedure = 'UnnamedProcedure',
  ApproveErc20 = 'ApproveErc20',
  TransferErc20 = 'TransferErc20',
  CreateCheckpoint = 'CreateCheckpoint',
  EnableDividendManager = 'EnableDividendManager',
  EnableGeneralPermissionManager = 'EnableGeneralPermissionManager',
  EnableGeneralTransferManager = 'EnableGeneralTransferManager',
  EnableCountTransferManager = 'EnableCountTransferManager',
  EnablePercentageTransferManager = 'EnablePercentageTransferManager',
  LaunchSimpleSto = 'LaunchSimpleSto',
  LaunchTieredSto = 'LaunchTieredSto',
  CreateDividendDistribution = 'CreateDividendDistribution',
  CreateSecurityToken = 'CreateSecurityToken',
  DisableFeature = 'DisableFeature',
  FreezeIssuance = 'FreezeIssuance',
  ReclaimFunds = 'ReclaimFunds',
  ReserveSecurityToken = 'ReserveSecurityToken',
  WithdrawTaxes = 'WithdrawTaxes',
  UpdateDividendsTaxWithholdingList = 'UpdateDividendsTaxWithholdingList',
  SetDividendsWallet = 'SetDividendsWallet',
  PushDividendPayment = 'PushDividendPayment',
  PullDividendPayment = 'PullDividendPayment',
  ModifyDividendsDefaultExclusionList = 'ModifyDividendsDefaultExclusionList',
  AssignSecurityTokenRole = 'AssignSecurityTokenRole',
  AssignStoRole = 'AssignStoRole',
  ControllerTransfer = 'ControllerTransfer',
  ControllerRedeem = 'ControllerRedeem',
  TogglePauseSto = 'PauseSto',
  FinalizeSto = 'FinalizeSto',
  SetController = 'SetController',
  SetDocument = 'SetDocument',
  RemoveDocument = 'RemoveDocument',
  DisableController = 'DisableController',
  ModifyShareholderData = 'ModifyShareholderData',
  RevokeKyc = 'RevokeKyc',
  IssueTokens = 'IssueTokens',
  ToggleAllowPreIssuing = 'ToggleAllowPreIssuing',
  ToggleAllowBeneficialInvestments = 'ToggleAllowBeneficialInvestments',
  ModifyTieredStoData = 'ModifyTieredStoData',
  InvestInTieredSto = 'InvestInTieredSto',
  InvestInSimpleSto = 'InvestInSimpleSto',
  ModifyMaxHolderCount = 'ModifyMaxHolderCount',
  ModifyMaxHolderPercentage = 'ModifyMaxHolderPercentage',
  ModifyPercentageExemptions = 'ModifyPercentageExemptions',
  TransferSecurityTokens = 'TransferSecurityTokens',
  ToggleFreezeTransfers = 'ToggleFreezeTransfers',
  SignTransferData = 'SignTransferData',
  SignDisableControllerAck = 'SignDisableControllerAck',
  SignFreezeIssuanceAck = 'SignFreezeIssuanceAck',
  TransferReservationOwnership = 'TransferReservationOwnership',
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
  SetErc20TaxWithholding = 'SetErc20TaxWithholding',
  SetEtherTaxWithholding = 'SetEtherTaxWithholding',
  SetDefaultExcluded = 'SetDefaultExcluded',
  EnableDividends = 'EnableDividends',
  EnableCappedSto = 'EnableCappedSto',
  EnableTieredSto = 'EnableTieredSto',
  EnableGeneralPermissionManager = 'EnableGeneralPermissionManager',
  EnableGeneralTransferManager = 'EnableGeneralTransferManager',
  EnableCountTransferManager = 'EnableCountTransferManager',
  EnablePercentageTransferManager = 'EnablePercentageTransferManager',
  DisableController = 'DisableController',
  FreezeIssuance = 'FreezeIssuance',
  DisableFeature = 'DisableFeature',
  ReclaimDividendFunds = 'ReclaimDividendFunds',
  WithdrawTaxWithholdings = 'WithdrawTaxWithholdings',
  PushDividendPayment = 'PushDividendPayment',
  PullDividendPayment = 'PullDividendPayment',
  SetDividendsWallet = 'SetDividendsWallet',
  AddDelegate = 'AddDelegate',
  ChangePermission = 'ChangePermission',
  ControllerTransfer = 'ControllerTransfer',
  ControllerRedeem = 'ControllerRedeem',
  PauseSto = 'PauseSto',
  UnpauseSto = 'UnpauseSto',
  FinalizeSto = 'FinalizeSto',
  SetController = 'SetController',
  SetDocument = 'SetDocument',
  RemoveDocument = 'RemoveDocument',
  ModifyKycDataMulti = 'ModifyKycDataMulti',
  ModifyInvestorFlagMulti = 'ModifyInvestorFlagMulti',
  IssueMulti = 'IssueMulti',
  AllowPreMinting = 'AllowPreMinting',
  RevokePreMinting = 'RevokePreMinting',
  ChangeAllowBeneficialInvestments = 'ChangeAllowBeneficialInvestments',
  ModifyTimes = 'ModifyTimes',
  ModifyFunding = 'ModifyFunding',
  ModifyAddresses = 'ModifyAddresses',
  ModifyTiers = 'ModifiyTiers',
  ModifyLimits = 'ModifyLimits',
  ModifyOracles = 'ModifyOracles',
  BuyWithScRateLimited = 'BuyWithScRateLimited',
  BuyWithPolyRateLimited = 'BuyWithPolyRateLimited',
  BuyWithEthRateLimited = 'BuyWithEthRateLimited',
  BuyTokens = 'BuyTokens',
  BuyTokensWithPoly = 'BuyTokensWithPoly',
  ChangeHolderCount = 'ChangeHolderCount',
  ChangeHolderPercentage = 'ChangeHolderPercentage',
  ModifyWhitelistMulti = 'ModifyWhitelistMulti',
  SetAllowPrimaryIssuance = 'SetAllowPrimaryIssuance',
  TransferSecurityTokens = 'TransferSecurityTokens',
  UnfreezeTransfers = 'UnfreezeTransfers',
  FreezeTransfers = 'FreezeTransfers',
  Signature = 'Signature',
  TransferReservationOwnership = 'TransferReservationOwnership',
}

// TODO @monitz87: remake this interface when contract-wrappers exports the tx arguments
// export interface TransactionArguments {
//   [PolyTransactionTag.Any]: {};
//   [PolyTransactionTag.SetErc20TaxWithholding]: Partial<SetWithholdingArgs>;
//   [PolyTransactionTag.SetEtherTaxWithholding]: Partial<SetWithholdingArgs>;
//   [PolyTransactionTag.ReclaimDividendFunds]: Partial<ReclaimDividendArgs>;
//   [PolyTransactionTag.WithdrawTaxWithholdings]: Partial<WithdrawWithholdingArgs>;
//   [PolyTransactionTag.CreateErc20DividendDistribution]: Partial<CreateErc20DividendArgs>;
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

export interface CreateDividendDistributionProcedureArgs {
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

export interface PushDividendPaymentProcedureArgs {
  symbol: string;
  dividendIndex: number;
  shareholderAddresses?: string[];
}

export interface PullDividendPaymentProcedureArgs {
  symbol: string;
  dividendIndex: number;
}

export interface CreateSecurityTokenProcedureArgs {
  name: string;
  symbol: string;
  detailsUrl?: string;
  divisible: boolean;
  treasuryWallet?: string;
}

export interface EnableDividendManagerProcedureArgs {
  symbol: string;
  storageWalletAddress: string;
}

export interface EnableGeneralPermissionManagerProcedureArgs {
  symbol: string;
}

export interface EnableGeneralTransferManagerProcedureArgs {
  symbol: string;
}

export interface EnableCountTransferManagerProcedureArgs {
  symbol: string;
  maxHolderCount: number;
}

export interface EnablePercentageTransferManagerProcedureArgs {
  symbol: string;
  maxHolderPercentage: BigNumber;
  allowPrimaryIssuance?: boolean;
}

export interface DisableFeatureProcedureArgs {
  symbol: string;
  moduleName: ModuleName;
}

export interface LaunchSimpleStoProcedureArgs {
  symbol: string;
  startDate: Date;
  endDate: Date;
  tokensOnSale: BigNumber;
  rate: BigNumber;
  currency: Currency.ETH | Currency.POLY;
  raisedFundsWallet: string;
  unsoldTokensWallet: string;
  allowPreIssuing?: boolean;
}

export interface IssueTokensProcedureArgs {
  symbol: string;
  issuanceData: IssuanceDataEntry[];
}

export interface ToggleAllowPreIssuingProcedureArgs {
  symbol: string;
  stoAddress: string;
  stoType: StoType;
  allowPreIssuing: boolean;
}

export interface ToggleAllowBeneficialInvestmentsProcedureArgs {
  symbol: string;
  stoAddress: string;
  stoType: StoType;
  allowBeneficialInvestments: boolean;
}

export interface ModifyTieredStoDataProcedureArgs
  extends Partial<Omit<LaunchTieredStoProcedureArgs, 'allowPreIssuing'>> {
  stoAddress: string;
  symbol: string;
}

interface InvestInTieredStoBaseProcedureArgs {
  symbol: string;
  stoAddress: string;
  amount: BigNumber;
  currency: Currency;
  minTokens?: BigNumber;
  beneficiary?: string;
}

export interface InvestWithStableCoinArgs extends InvestInTieredStoBaseProcedureArgs {
  currency: Currency.StableCoin;
  stableCoinAddress: string;
}

export type InvestInTieredStoProcedureArgs =
  | InvestInTieredStoBaseProcedureArgs & {
      currency: Currency.POLY | Currency.ETH;
      stableCoinAddress?: undefined; // this is done this way on purpose for type safety
    }
  | InvestWithStableCoinArgs;

export interface InvestInSimpleStoProcedureArgs {
  symbol: string;
  stoAddress: string;
  amount: BigNumber;
  beneficiary?: string;
}

export function isInvestWithStableCoinArgs(args: any): args is InvestWithStableCoinArgs {
  const { currency, stableCoinAddress } = args;

  return currency === Currency.StableCoin && typeof stableCoinAddress === 'string';
}

export interface StoTier {
  /**
   * Amount of tokens to sell in this tier
   */
  tokensOnSale: BigNumber;
  /**
   * Price of each token in this tier
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

export interface CustomCurrency {
  currencySymbol: string;
  ethOracleAddress: string;
  polyOracleAddress: string;
}

export interface LaunchTieredStoProcedureArgs {
  symbol: string;
  startDate: Date;
  endDate: Date;
  tiers: StoTier[];
  nonAccreditedInvestmentLimit: BigNumber;
  minimumInvestment: BigNumber;
  currencies: Currency[];
  raisedFundsWallet: string;
  unsoldTokensWallet: string;
  stableCoinAddresses: string[];
  customCurrency?: Partial<CustomCurrency>;
  allowPreIssuing?: boolean;
}

export interface ReclaimFundsProcedureArgs {
  symbol: string;
  dividendIndex: number;
}

export interface ReserveSecurityTokenProcedureArgs {
  symbol: string;
  owner?: string;
}

export interface WithdrawTaxesProcedureArgs {
  symbol: string;
  dividendIndex: number;
}

export interface UpdateDividendsTaxWithholdingListProcedureArgs {
  symbol: string;
  shareholderAddresses: string[];
  percentages: number[];
}

export interface SetDividendsWalletProcedureArgs {
  symbol: string;
  address: string;
}

export interface ModifyDividendsDefaultExclusionListProcedureArgs {
  symbol: string;
  shareholderAddresses: string[];
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

export interface ControllerRedeemProcedureArgs {
  from: string;
  symbol: string;
  amount: BigNumber;
  data?: string;
  reason?: string;
}

export interface TogglePauseStoProcedureArgs {
  symbol: string;
  stoAddress: string;
  stoType: StoType;
  pause: boolean;
}

export interface FinalizeStoProcedureArgs {
  symbol: string;
  stoAddress: string;
  stoType: StoType;
}

export interface SetControllerProcedureArgs {
  symbol: string;
  controller: string;
}

export interface SetDocumentProcedureArgs {
  symbol: string;
  name: string;
  uri: string;
  documentHash: string;
}

export interface RemoveDocumentProcedureArgs {
  symbol: string;
  name: string;
}

export interface FreezeIssuanceProcedureArgs {
  symbol: string;
  signature?: string;
}

export interface DisableControllerProcedureArgs {
  symbol: string;
  signature?: string;
}

export interface TransferReservationOwnershipProcedureArgs {
  symbol: string;
  newOwner: string;
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

export interface ModifyMaxHolderCountProcedureArgs {
  symbol: string;
  maxHolderCount: number;
}

export interface ModifyMaxHolderPercentageProcedureArgs {
  symbol: string;
  maxHolderPercentage: BigNumber;
}

export interface PercentageWhitelistEntry {
  address: string;
  whitelisted: boolean;
}

export interface ModifyPercentageExemptionsProcedureArgs {
  symbol: string;
  whitelistEntries?: PercentageWhitelistEntry[];
  allowPrimaryIssuance?: boolean;
}

export interface TransferSecurityTokensProcedureArgs {
  symbol: string;
  to: string;
  amount: BigNumber;
  data?: string;
  from?: string;
}

export interface ToggleFreezeTransfersProcedureArgs {
  symbol: string;
  freeze: boolean;
}

export interface SignTransferDataProcedureArgs {
  symbol: string;
  kycData: Omit<Omit<ShareholderDataEntry, 'isAccredited'>, 'canBuyFromSto'>[];
  validFrom: Date;
  validTo: Date;
}

export interface SignDisableControllerAckProcedureArgs {
  symbol: string;
}

export interface SignFreezeIssuanceAckProcedureArgs {
  symbol: string;
}

export interface ProcedureArguments {
  [ProcedureType.ApproveErc20]: ApproveErc20ProcedureArgs;
  [ProcedureType.TransferErc20]: TransferErc20ProcedureArgs;
  [ProcedureType.CreateCheckpoint]: CreateCheckpointProcedureArgs;
  [ProcedureType.CreateDividendDistribution]: CreateDividendDistributionProcedureArgs;
  [ProcedureType.CreateSecurityToken]: CreateSecurityTokenProcedureArgs;
  [ProcedureType.EnableDividendManager]: EnableDividendManagerProcedureArgs;
  [ProcedureType.EnableGeneralPermissionManager]: EnableGeneralPermissionManagerProcedureArgs;
  [ProcedureType.EnableGeneralTransferManager]: EnableGeneralTransferManagerProcedureArgs;
  [ProcedureType.EnableCountTransferManager]: EnableCountTransferManagerProcedureArgs;
  [ProcedureType.EnablePercentageTransferManager]: EnablePercentageTransferManagerProcedureArgs;
  [ProcedureType.ReclaimFunds]: ReclaimFundsProcedureArgs;
  [ProcedureType.ReserveSecurityToken]: ReserveSecurityTokenProcedureArgs;
  [ProcedureType.WithdrawTaxes]: WithdrawTaxesProcedureArgs;
  [ProcedureType.UpdateDividendsTaxWithholdingList]: UpdateDividendsTaxWithholdingListProcedureArgs;
  [ProcedureType.PushDividendPayment]: PushDividendPaymentProcedureArgs;
  [ProcedureType.PullDividendPayment]: PullDividendPaymentProcedureArgs;
  [ProcedureType.SetDividendsWallet]: SetDividendsWalletProcedureArgs;
  // prettier-ignore
  [ProcedureType.ModifyDividendsDefaultExclusionList]: 
    ModifyDividendsDefaultExclusionListProcedureArgs;
  [ProcedureType.LaunchSimpleSto]: LaunchSimpleStoProcedureArgs;
  [ProcedureType.LaunchTieredSto]: LaunchTieredStoProcedureArgs;
  [ProcedureType.TogglePauseSto]: TogglePauseStoProcedureArgs;
  [ProcedureType.ControllerTransfer]: ControllerTransferProcedureArgs;
  [ProcedureType.SetController]: SetControllerProcedureArgs;
  [ProcedureType.AssignSecurityTokenRole]: AssignSecurityTokenRoleProcedureArgs;
  [ProcedureType.AssignStoRole]: AssignStoRoleProcedureArgs;
  [ProcedureType.ModifyShareholderData]: ModifyShareholderDataProcedureArgs;
  [ProcedureType.RevokeKyc]: RevokeKycProcedureArgs;
  [ProcedureType.IssueTokens]: IssueTokensProcedureArgs;
  [ProcedureType.ToggleAllowPreIssuing]: ToggleAllowPreIssuingProcedureArgs;
  [ProcedureType.DisableFeature]: DisableFeatureProcedureArgs;
  [ProcedureType.FinalizeSto]: FinalizeStoProcedureArgs;
  [ProcedureType.ToggleAllowBeneficialInvestments]: ToggleAllowBeneficialInvestmentsProcedureArgs;
  [ProcedureType.ModifyTieredStoData]: ModifyTieredStoDataProcedureArgs;
  [ProcedureType.InvestInTieredSto]: InvestInTieredStoProcedureArgs;
  [ProcedureType.InvestInSimpleSto]: InvestInSimpleStoProcedureArgs;
  [ProcedureType.EnableGeneralPermissionManager]: EnableGeneralPermissionManagerProcedureArgs;
  [ProcedureType.EnableGeneralTransferManager]: EnableGeneralTransferManagerProcedureArgs;
  [ProcedureType.ModifyMaxHolderCount]: ModifyMaxHolderCountProcedureArgs;
  [ProcedureType.ModifyMaxHolderPercentage]: ModifyMaxHolderPercentageProcedureArgs;
  [ProcedureType.ModifyPercentageExemptions]: ModifyPercentageExemptionsProcedureArgs;
  [ProcedureType.TransferSecurityTokens]: TransferSecurityTokensProcedureArgs;
  [ProcedureType.ToggleFreezeTransfers]: ToggleFreezeTransfersProcedureArgs;
  [ProcedureType.SignTransferData]: SignTransferDataProcedureArgs;
  [ProcedureType.SignDisableControllerAck]: SignDisableControllerAckProcedureArgs;
  [ProcedureType.SignFreezeIssuanceAck]: SignFreezeIssuanceAckProcedureArgs;
  [ProcedureType.TransferReservationOwnership]: TransferReservationOwnershipProcedureArgs;
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

export enum TransactionSpeed {
  Slow = 'Slow',
  Medium = 'Medium',
  Fast = 'Fast',
  Fastest = 'Fastest',
}

export enum Feature {
  Permissions = 'Permissions',
  Shareholders = 'Shareholders',
  Dividends = 'Dividends',
  ShareholderCountRestrictions = 'ShareholderCountRestrictions',
  PercentageOwnershipRestrictions = 'PercentageOwnershipRestrictions',
}

export enum SecurityTokenRole {
  PermissionsAdministrator = 'PermissionsAdministrator',
  DividendsOperator = 'DividendsOperator',
  DividendsAdministrator = 'DividendsAdministrator',
  ShareholdersAdministrator = 'ShareholdersAdministrator',
  ShareholderCountRestrictionsAdministrator = 'ShareholderCountRestrictionsAdministrator',
  PercentageOwnershipRestrictionsAdministrator = 'PercentageOwnershipRestrictionsAdministrator',
}

export enum StoRole {
  StoOperator = 'StoOperator',
  StoAdministrator = 'StoAdministrator',
}

export enum TransferStatusCode {
  TransferFailure = 'TransferFailure',
  TransferSuccess = 'TransferSuccess',
  InsufficientBalance = 'InsufficientBalance',
  InsufficientAllowance = 'InsufficientAllowance',
  TransfersHalted = 'TransfersHalted',
  FundsLocked = 'FundsLocked',
  InvalidSender = 'InvalidSender',
  InvalidReceiver = 'InvalidReceiver',
  InvalidOperator = 'InvalidOperator',
}

/*
 * Internal Types
 */

/**
 * Return the type that results from excluding a property from another type
 *
 * @param T - type to exclude from
 * @param K - name of the property that will be excluded
 */
export type Omit<T, K> = { [key in Exclude<keyof T, K>]: T[key] };

/**
 * Transaction method from the contract-wrappers package
 *
 * @param A - type of the arguments object that the method receives when being called
 */
export type LowLevelMethod<A> = (args: A) => Promise<PolyResponse>;

/**
 * Signature request method from the contract-wrappers package
 *
 * @param A - type of the arguments object that the method receives when being called
 */
export type SignatureRequest<A> = (args: A) => Promise<string>;

/**
 * Represents a contract method that doesn't exist yet but will exist
 * once a certain post transaction resolver is resolved
 *
 * @param T - type of the value that will be resolved by the post transaction resolver
 * @param U - type of the arguments object that the future method will accept
 */
export interface FutureLowLevelMethod<T, U> {
  /**
   * function that returns a low level method
   */
  futureMethod: (resolvedValue: T) => Promise<LowLevelMethod<U>>;
  /**
   * post transaction resolver that resolves into the value that is passed to the future method
   */
  futureValue: PostTransactionResolver<T>;
}

/**
 * Transforms a tuple of types into an array of resolver functions. For each type in the tuple, the corresponding resolver function returns that type wrapped in a promise
 */
export type ResolverArray<R extends any[]> = {
  [P in keyof R]: (receipt: TransactionReceiptWithDecodedLogs) => Promise<R[P]>
};

/**
 * Transforms a tuple of types into an array of Post Transaction Resolvers. For each type in the tuple, the corresponding Post Transaction Resolver resolves to that type
 *
 * @param Receipt - type of the receipt that the Post Transaction Resolver's resolver function will receive
 */
export type PostTransactionResolverArray<Value extends any[], Receipt extends any> = {
  [P in keyof Value]: PostTransactionResolver<Value[P], Receipt>
};

/**
 * Either a specific type or a Post Transaction Resolver that resolves to that type
 */
export type MaybeResolver<T> = PostTransactionResolver<T, any> | T;

/**
 * Apply the MaybeResolver type to a tuple of types
 */
export type MapMaybeResolver<T> = { [K in keyof T]: MaybeResolver<T[K]> };

/**
 * Schema of a specific transaction
 */
export interface TransactionSpec<
  Args = any,
  Value extends any[] = any[],
  Receipt extends any = any,
  FutureValue extends any = any
> {
  method: LowLevelMethod<Args> | SignatureRequest<Args> | FutureLowLevelMethod<FutureValue, Args>;
  args: MapMaybeResolver<Args>;
  postTransactionResolvers?: PostTransactionResolverArray<Value, Receipt>;
  tag?: PolyTransactionTag;
}
