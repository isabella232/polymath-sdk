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

/**
 * @hidden
 */
export { Currency };

/**
 * @hidden
 */
export { Version };

/**
 * Properties representing a Dividend Shareholder
 */
export interface DividendShareholderStatus {
  /**
   * wallet address of a Shareholder
   */
  address: string;
  /**
   * whether Shareholder has received payment
   */
  paymentReceived: boolean;
  /**
   * whether Shareholder is excluded from Dividend distribution
   */
  excluded: boolean;
  /**
   * amount of tokens withheld for tax purposes
   */
  withheldTax: BigNumber;
  /**
   * the amount of tokens the Shareholder has received as Dividend payment
   */
  amountReceived: BigNumber;
  /**
   * the balance of the Shareholder
   */
  balance: BigNumber;
}

/**
 * @hidden
 */
export enum StoType {
  Simple = 'Simple',
  Tiered = 'Tiered',
}

/**
 * Check if the type is a valid STO Type
 * @param type - the STO Type
 */
export function isStoType(type: any): type is StoType {
  return typeof type === 'string' && (type === StoType.Tiered || type === StoType.Simple);
}

/**
 * Properties denoting a Shareholder's Tax Withholding Percentage
 */
export interface TaxWithholdingEntry {
  /**
   * wallet address of Shareholder
   */
  address: string;
  /**
   * the Percentage that will be Tax Withheld
   */
  percentage: number;
}

/**
 * Internal properties of a Security Token Issuance
 */
export interface IssuanceDataEntry {
  /**
   * wallet address where Tokens will be received
   */
  address: string;
  /**
   * amount of tokens issued
   */
  amount: BigNumber;
  /**
   * shareholder data, where address is omitted
   */
  shareholderData?: Omit<ShareholderDataEntry, 'address'>;
}

/**
 * @hidden
 */
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

/**
 * Internal properties represeting a Shareholder's balance
 */
export interface ShareholderBalance {
  /**
   * wallet address of the Shareholder
   */
  address: string;
  /**
   * balance of Security Tokens
   */
  balance: BigNumber;
}

/**
 * @hidden
 */
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

/**
 * @hidden
 */
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

/**
 * Internal properties of an ERC20 Approval
 */
export interface ApproveErc20ProcedureArgs {
  /**
   * amount of tokens to be approved
   */
  amount: BigNumber;
  /**
   * the spender of the tokens being approved
   */
  spender: string;
  /**
   * the custom address of the ERC20 token
   */
  tokenAddress?: string;
}

/**
 * Arguments for [[TransferErc20Procedure]]
 */
export interface TransferErc20ProcedureArgs {
  /**
   * amount of tokens to be transferred
   */
  amount: BigNumber;
  /**
   * the receiver of the tokens being transferred
   */
  receiver: string;
  /**
   * the custom address of the ERC20 token
   */
  tokenAddress?: string;
}

/**
 * Arguments for [[CreateCheckpointProcedure]]
 */
export interface CreateCheckpointProcedureArgs {
  /**
   * the Security Token symbol
   */
  symbol: string;
}

/**
 * Arguments for [[CreateDividendDistributionProcedure]]
 */
export interface CreateDividendDistributionProcedureArgs {
  /**
   * symbol of a Security Token
   */
  symbol: string;
  /**
   * date the Dividend will mature
   */
  maturityDate: Date;
  /**
   * date the Dividend with expire
   */
  expiryDate: Date;
  /**
   * the address of the ERC20 token
   */
  erc20Address: string;
  /**
   * amount to be distributed by the Dividend
   */
  amount: BigNumber;
  /**
   * index of the Checkpoint for the Dividend Distribution
   */
  checkpointIndex: number;
  /**
   * name of the Dividend
   */
  name: string;
  /**
   * list of excluded addresses from the Dividend Distribution
   */
  excludedAddresses?: string[];
  /**
   * tax withholding list for the Dividend
   */
  taxWithholdings?: TaxWithholdingEntry[];
}

/**
 * Arguments for [[PushDividendPaymentProcedure]]
 */
export interface PushDividendPaymentProcedureArgs {
  /**
   * symbol for the security token
   */
  symbol: string;
  /**
   * index of the dividend
   */
  dividendIndex: number;
  /**
   * wallet addresses of specific Shareholders
   */
  shareholderAddresses?: string[];
}

/**
 * Arguments for [[PullDividendPaymentProcedure]]
 */
export interface PullDividendPaymentProcedureArgs {
  /**
   * symbol for the security token
   */
  symbol: string;
  /**
   * index of the dividend
   */
  dividendIndex: number;
}

/**
 * Arguments for [[CreateSecurityTokenProcedure]]
 */
export interface CreateSecurityTokenProcedureArgs {
  /**
   * name of the Security Token
   */
  name: string;
  /**
   * symbol of the Security Token
   */
  symbol: string;
  /**
   * url where Security Token details can be found
   */
  detailsUrl?: string;
  /**
   * whether or not the Security Token is divisible
   */
  divisible: boolean;
  /**
   * the Treasury Wallet address
   */
  treasuryWallet?: string;
}

/**
 * Arguments for [[EnableDividendManagerProcedure]]
 */
export interface EnableDividendManagerProcedureArgs {
  /**
   * symbol of the Security Token
   */
  symbol: string;
  /**
   * storage wallet where Dividends funds will be stored
   */
  storageWalletAddress: string;
}

/**
 * Arguments for [[EnableGeneralPermissionManagerProcedure]]
 */
export interface EnableGeneralPermissionManagerProcedureArgs {
  /**
   * symbol of the Security Token
   */
  symbol: string;
}

/**
 * Arguments for [[EnableGeneralTransferManagerProcedure]]
 */
export interface EnableGeneralTransferManagerProcedureArgs {
  /**
   * symbol of the Security Token
   */
  symbol: string;
}

/**
 * Arguments for [[EnableCountTransferManagerProcedure]]
 */
export interface EnableCountTransferManagerProcedureArgs {
  /**
   * symbol of the Security Token
   */
  symbol: string;
  /**
   * maximum number of token holders
   */
  maxHolderCount: number;
}

/**
 * Arguments for [[EnablePercentageTransferManagerProcedure]]
 */
export interface EnablePercentageTransferManagerProcedureArgs {
  /**
   * symbol of the Security Token
   */
  symbol: string;
  maxHolderPercentage: BigNumber;
  allowPrimaryIssuance?: boolean;
}

/**
 * Arguments for [[DisableFeatureProcedure]]
 */
export interface DisableFeatureProcedureArgs {
  /**
   * symbol of the Security Token
   */
  symbol: string;
  /**
   * name of Module you wish to disable
   */
  moduleName: ModuleName;
}

/**
 * Arguments for [[LaunchSimpleStoProcedure]]
 */
export interface LaunchSimpleStoProcedureArgs {
  /**
   * symbol of the Security Token
   */
  symbol: string;
  /**
   * start date of the STO
   */
  startDate: Date;
  /**
   * end date of the STO
   */
  endDate: Date;
  /**
   * number of tokens that will be sold
   */
  tokensOnSale: BigNumber;
  /**
   * rate at which tokens will be sold
   */
  rate: BigNumber;
  /**
   * currency for the Simple STO fund raise
   */
  currency: Currency.ETH | Currency.POLY;
  /**
   * wallet to which raised funds will be sent
   */
  raisedFundsWallet: string;
  /**
   * wallet to which unsold tokens will be sent
   */
  unsoldTokensWallet: string;
  /**
   * whether to allow pre issuing of the STO or not
   */
  allowPreIssuing?: boolean;
}

/**
 * Arguments for [[IssueTokensProcedure]]
 */
export interface IssueTokensProcedureArgs {
  /**
   * symbol of the Security Token
   */
  symbol: string;
  /**
   * issuance data
   */
  issuanceData: IssuanceDataEntry[];
}

/**
 * Arguments for [[ToggleAllowPreIssuingProcedure]]
 */
export interface ToggleAllowPreIssuingProcedureArgs {
  /**
   * symbol of the Security Token
   */
  symbol: string;
  /**
   * address of the STO
   */
  stoAddress: string;
  /**
   * the type of the STO
   */
  stoType: StoType;
  /**
   * whether or not to allow pre-issuing
   */
  allowPreIssuing: boolean;
}

/**
 * Arguments for [[ToggleAllowBeneficialInvestmentsProcedure]]
 */
export interface ToggleAllowBeneficialInvestmentsProcedureArgs {
  /**
   * symbol of the Security Token
   */
  symbol: string;
  /**
   * address of the STO
   */
  stoAddress: string;
  /**
   * type of the STO
   */
  stoType: StoType;
  /**
   * whether the STO allows investing on behalf of a beneficiary
   */
  allowBeneficialInvestments: boolean;
}

/**
 * Arguments for [[ModifyTieredStoDataProcedure]]
 */
export interface ModifyTieredStoDataProcedureArgs
  extends Partial<Omit<LaunchTieredStoProcedureArgs, 'allowPreIssuing'>> {
  /**
   * address of the STO
   */
  stoAddress: string;
  /**
   * symbol of the Security Token
   */
  symbol: string;
}

/**
 * Arguments for [[InvestInTieredStoBaseProcedure]]
 */
interface InvestInTieredStoBaseProcedureArgs {
  /**
   * symbol of the Security Token
   */
  symbol: string;
  /**
   * address of the STO
   */
  stoAddress: string;
  /**
   * amount of tokens in investment
   */
  amount: BigNumber;
  /**
   * currency type in which funds will be raised
   */
  currency: Currency;
  /**
   * minimum token investment
   */
  minTokens?: BigNumber;
  /**
   * beneficiary address to invest on behalf of
   */
  beneficiary?: string;
}

/**
 * Arguments to invest in stable coin for [[InvestInTieredStoProcedure]]
 */
export interface InvestWithStableCoinArgs extends InvestInTieredStoBaseProcedureArgs {
  currency: Currency.StableCoin;
  stableCoinAddress: string;
}

/**
 * Arguments for [[InvestInTieredStoProcedure]]
 */
export type InvestInTieredStoProcedureArgs =
  | InvestInTieredStoBaseProcedureArgs & {
      /**
       * investing currency
       */
      currency: Currency.POLY | Currency.ETH;
      /**
       * stable coin ethereum address
       */
      stableCoinAddress?: undefined; // this is done this way on purpose for type safety
    }
  | InvestWithStableCoinArgs;

/**
 * Arguments for [[InvestInSimpleStoProcedure]]
 */
export interface InvestInSimpleStoProcedureArgs {
  /**
   * symbol of the Security Token
   */
  symbol: string;
  /**
   * address of the STO
   */
  stoAddress: string;
  /**
   * amount of tokens making up investment
   */
  amount: BigNumber;
  /**
   * beneficiary address to invest on behalf of
   */
  beneficiary?: string;
}

/**
 * Confirm that the arguments are valid to invest with stable coin
 */
export function isInvestWithStableCoinArgs(args: any): args is InvestWithStableCoinArgs {
  const { currency, stableCoinAddress } = args;

  return currency === Currency.StableCoin && typeof stableCoinAddress === 'string';
}

/**
 * Internal properties of an STO Tier
 */
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

/**
 * Custom currency in which a Tiered STO can raise funds
 */
export interface CustomCurrency {
  /**
   * symbol of the custom currency (USD, CAD, EUR, etc. Default is USD)
   */
  currencySymbol: string;
  /**
   * address of the oracle that states the price of ETH in the custom currency. Only required if raising funds in ETH
   */
  ethOracleAddress: string;
  /**
   * address of the oracle that states the price of POLY in the custom currency. Only required if raising funds in POLY
   */
  polyOracleAddress: string;
}

/**
 * Arguments for [[LaunchTieredStoProcedure]]
 */
export interface LaunchTieredStoProcedureArgs {
  /**
   * symbol of the Security Token
   */
  symbol: string;
  /**
   * start date of the STO
   */
  startDate: Date;
  /**
   * end date of the STO
   */
  endDate: Date;
  /**
   * array of Tier information
   */
  tiers: StoTier[];
  /**
   * limit for non accredited investments of STO
   */
  nonAccreditedInvestmentLimit: BigNumber;
  /**
   * minimum investment of STO
   */
  minimumInvestment: BigNumber;
  /**
   * array of currencies used to raise funds in the STO
   */
  currencies: Currency[];
  /**
   * wallet where raised funds will be sent
   */
  raisedFundsWallet: string;
  /**
   * wallet where unsold tokens will be sent
   */
  unsoldTokensWallet: string;
  /**
   * array of stable coin addresses
   */
  stableCoinAddresses?: string[];
  /**
   * custom currency used to raise STO funds
   */
  customCurrency?: Partial<CustomCurrency>;
  /**
   * whether pre-issuing is allowed or not
   */
  allowPreIssuing?: boolean;
}

/**
 * Arguments for [[ReclaimFundsProcedure]]
 */
export interface ReclaimFundsProcedureArgs {
  /**
   * symbol of the Security Token
   */
  symbol: string;
  /**
   * the index of the Dividend
   */
  dividendIndex: number;
}

/**
 * Arguments for [[ReserveSecurityTokenProcedure]]
 */
export interface ReserveSecurityTokenProcedureArgs {
  /**
   * the symbol of the Security Token Reservation
   */
  symbol: string;
  /**
   * the owner wallet of the Security Token Reservation
   */
  owner?: string;
}

/**
 * Arguments for [[WithdrawTaxesProcedure]]
 */
export interface WithdrawTaxesProcedureArgs {
  /**
   * the symbol of the Security Token
   */
  symbol: string;
  /**
   * the index of the Dividend
   */
  dividendIndex: number;
}

/**
 * Arguments for [[UpdateDividendsTaxWithholdingListProcedure]]
 */
export interface UpdateDividendsTaxWithholdingListProcedureArgs {
  /**
   * the symbol of the Security Token
   */
  symbol: string;
  /**
   * array of Shareholder addresses
   */
  shareholderAddresses: string[];
  /**
   * array of tax withholding percentages
   */
  percentages: number[];
}

/**
 * Arguments for [[SetDividendsWalletProcedure]]
 */
export interface SetDividendsWalletProcedureArgs {
  /**
   * the symbol of the Security Token
   */
  symbol: string;
  /**
   * wallet address
   */
  address: string;
}

/**
 * Arguments for [[ModifyDividendsDefaultExclusionListProcedure]]
 */
export interface ModifyDividendsDefaultExclusionListProcedureArgs {
  /**
   * the symbol of the Security Token
   */
  symbol: string;
  /**
   * array of Shareholder addresses to be included
   */
  shareholderAddresses: string[];
}

/**
 * Arguments for [[AssignSecurityTokenRoleProcedure]]
 */
export interface AssignSecurityTokenRoleProcedureArgs {
  /**
   * the symbol of the Security Token
   */
  symbol: string;
  /**
   * wallet address of the Delegate
   */
  delegateAddress: string;
  /**
   * the delegate role
   */
  role: SecurityTokenRole;
  /**
   * whether to assign or un-assign a Security Token Role
   */
  assign: boolean;
  /**
   * description of the Security Token Role
   */
  description: string;
}

/**
 * Arguments for [[AssignStoRoleProcedure]]
 */
export interface AssignStoRoleProcedureArgs {
  /**
   * the symbol of the Security Token
   */
  symbol: string;
  /**
   * the wallet address of the Delegate
   */
  delegateAddress: string;
  /**
   * the address of the STO
   */
  stoAddress: string;
  /**
   * the STO Role being assigned
   */
  role: StoRole;
  /**
   * whether to assign or unassign a Security Token Role
   */
  assign: boolean;
  /**
   * description of the Security Token Role
   */
  description?: string;
}

/**
 * Arguments for [[ControllerTransferProcedure]]
 */
export interface ControllerTransferProcedureArgs {
  /**
   * sender's wallet address
   */
  from: string;
  /**
   * receiver's wallet address
   */
  to: string;
  /**
   * the symbol of the Security Token
   */
  symbol: string;
  /**
   * amount of tokens being forcefully transferred
   */
  amount: BigNumber;
  /**
   * extra KYC transfer data
   */
  data?: string;
  /**
   * extra log information
   */
  log?: string;
}

/**
 * Arguments for [[ControllerRedeemProcedure]]
 */
export interface ControllerRedeemProcedureArgs {
  /**
   * wallet address from which tokens will be redeemed (burned)
   */
  from: string;
  /**
   * the symbol of the Security Token
   */
  symbol: string;
  /**
   * amount of tokens being redeemed (burned)
   */
  amount: BigNumber;
  /**
   * extra KYC transfer data
   */
  data?: string;
  /**
   * reason why tokens are being redeemed
   */
  reason?: string;
}

/**
 * Arguments for [[TogglePauseStoProcedure]]
 */
export interface TogglePauseStoProcedureArgs {
  /**
   * the symbol of the Security Token
   */
  symbol: string;
  /**
   * the STO address
   */
  stoAddress: string;
  /**
   * the type of the STO
   */
  stoType: StoType;
  /**
   * whether to pause the STO or un-pause it
   */
  pause: boolean;
}

/**
 * Arguments for [[FinalizeStoProcedure]]
 */
export interface FinalizeStoProcedureArgs {
  /**
   * the symbol of the Security Token
   */
  symbol: string;
  /**
   * the STO address
   */
  stoAddress: string;
  /**
   * the type of the STO
   */
  stoType: StoType;
}

/**
 * Arguments for [[SetControllerProcedure]]
 */
export interface SetControllerProcedureArgs {
  /**
   * the symbol of the Security Token
   */
  symbol: string;
  /**
   * the controller wallet of the Security Token
   */
  controller: string;
}

/**
 * Arguments for [[SetDocumentProcedure]]
 */
export interface SetDocumentProcedureArgs {
  /**
   * the symbol of the Security Token
   */
  symbol: string;
  /**
   * the name of the Document
   */
  name: string;
  /**
   * the uri of the Document
   */
  uri: string;
  /**
   * the document hash representing the Document
   */
  documentHash: string;
}

/**
 * Arguments for [[RemoveDocumentProcedure]]
 */
export interface RemoveDocumentProcedureArgs {
  /**
   * the symbol of the Security Token
   */
  symbol: string;
  /**
   * the name of the Document being removed
   */
  name: string;
}

/**
 * Arguments for [[FreezeIssuanceProcedure]]
 */
export interface FreezeIssuanceProcedureArgs {
  /**
   * the symbol of the Security Token
   */
  symbol: string;
  /**
   * the acknowledgement signature
   */
  signature?: string;
}

/**
 * Arguments for [[DisableControllerProcedure]]
 */
export interface DisableControllerProcedureArgs {
  /**
   * the symbol of the Security Token
   */
  symbol: string;
  /**
   * the acknowledgement signature
   */
  signature?: string;
}

/**
 * Arguments for [[TransferReservationOwnershipProcedure]]
 */
export interface TransferReservationOwnershipProcedureArgs {
  /**
   * the symbol of the Security Token
   */
  symbol: string;
  /**
   * wallet address for the new symbol Reservation owner
   */
  newOwner: string;
}

/**
 * Properties expressing KYC data for a Shareholder
 */
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

/**
 * Arguments for [[ModifyShareholderDataProcedure]]
 */
export interface ModifyShareholderDataProcedureArgs {
  /**
   * the symbol of the Security Token
   */
  symbol: string;
  /**
   * an array of KYC data
   */
  shareholderData: ShareholderDataEntry[];
}

/**
 * Arguments for [[RevokeKycProcedure]]
 */
export interface RevokeKycProcedureArgs {
  /**
   * the symbol of the Security Token
   */
  symbol: string;
  /**
   * an array of Shareholder addresses
   */
  shareholderAddresses: string[];
}

/**
 * Arguments for [[ModifyMaxHolderCountProcedure]]
 */
export interface ModifyMaxHolderCountProcedureArgs {
  /**
   * the symbol of the Security Token
   */
  symbol: string;
  /**
   * the maximum number of token holders
   */
  maxHolderCount: number;
}

/**
 * Arguments for [[ModifyMaxHolderPercentageProcedure]]
 */
export interface ModifyMaxHolderPercentageProcedureArgs {
  /**
   * the symbol of the Security Token
   */
  symbol: string;
  /**
   * the maximum percentage of total tokens a single Shareholder can hold
   */
  maxHolderPercentage: BigNumber;
}

/**
 * Properties of an entry in the Percentage Whitelist
 */
export interface PercentageWhitelistEntry {
  /**
   * address on the whitelist
   */
  address: string;
  /**
   * whether the address is whitelisted or not
   */
  whitelisted: boolean;
}

/**
 * Arguments for [[ModifyPercentageExemptionsProcedure]]
 */
export interface ModifyPercentageExemptionsProcedureArgs {
  /**
   * the symbol of the Security Token
   */
  symbol: string;
  /**
   * array of whitelist percentage entries
   */
  whitelistEntries?: PercentageWhitelistEntry[];
  /**
   * whether primary issuance is allowed or not
   */
  allowPrimaryIssuance?: boolean;
}

/**
 * Arguments for [[TransferSecurityTokensProcedure]]
 */
export interface TransferSecurityTokensProcedureArgs {
  /**
   * the symbol of the Security Token
   */
  symbol: string;
  /**
   * wallet address receiving Security Tokens
   */
  to: string;
  /**
   * amount of tokens being transferred
   */
  amount: BigNumber;
  /**
   * extra KYC data for transfer
   */
  data?: string;
  /**
   * wallet address sending Security Tokens
   */
  from?: string;
}

/**
 * Arguments for [[ToggleFreezeTransfersProcedure]]
 */
export interface ToggleFreezeTransfersProcedureArgs {
  /**
   * the symbol of the Security Token
   */
  symbol: string;
  /**
   * whether to freeze or un-freeze transfers
   */
  freeze: boolean;
}

/**
 * Arguments for [[SignTransferDataProcedure]]
 */
export interface SignTransferDataProcedureArgs {
  /**
   * the symbol of the Security Token
   */
  symbol: string;
  /**
   * kyc data for a transfer
   */
  kycData: Omit<Omit<ShareholderDataEntry, 'isAccredited'>, 'canBuyFromSto'>[];
  /**
   * date from which the transfer is valid
   */
  validFrom: Date;
  /**
   * date until the transfer is valid
   */
  validTo: Date;
}

/**
 * Arguments for [[SignDisableControllerAckProcedure]]
 */
export interface SignDisableControllerAckProcedureArgs {
  /**
   * the symbol of the Security Token
   */
  symbol: string;
}

/**
 * Arguments for [[SignFreezeIssuanceAckProcedure]]
 */
export interface SignFreezeIssuanceAckProcedureArgs {
  /**
   * the symbol of the Security Token
   */
  symbol: string;
}

/**
 * @hidden
 */
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

/**
 * @hidden
 */
export enum TransactionStatus {
  Idle = 'Idle',
  Unapproved = 'Unapproved',
  Running = 'Running',
  Rejected = 'Rejected',
  Succeeded = 'Succeeded',
  Failed = 'Failed',
}

/**
 * @hidden
 */
export enum TransactionQueueStatus {
  Idle = 'Idle',
  Running = 'Running',
  Failed = 'Failed',
  Succeeded = 'Succeeded',
}

/**
 * Fees associated with running a [[TransactionQueue]]
 */
export interface Fees {
  /**
   * fees expressed in USD. Can be null if the Smart Contract doesn't specify one
   */
  usd: BigNumber | null;
  /**
   * fees expressed in POLY
   */
  poly: BigNumber;
}

/**
 * @hidden
 */
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

/**
 * Check to see if an object is a Plain Old Javascript Object (POJO)
 * @param pojo - Javascript object
 */
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

/**
 * @hidden
 */
export enum TransactionSpeed {
  Slow = 'Slow',
  Medium = 'Medium',
  Fast = 'Fast',
  Fastest = 'Fastest',
}

/**
 * @hidden
 */
export enum Feature {
  Permissions = 'Permissions',
  Shareholders = 'Shareholders',
  Dividends = 'Dividends',
  ShareholderCountRestrictions = 'ShareholderCountRestrictions',
  PercentageOwnershipRestrictions = 'PercentageOwnershipRestrictions',
}

/**
 * @hidden
 */
export enum SecurityTokenRole {
  PermissionsAdministrator = 'PermissionsAdministrator',
  DividendsOperator = 'DividendsOperator',
  DividendsAdministrator = 'DividendsAdministrator',
  ShareholdersAdministrator = 'ShareholdersAdministrator',
  ShareholderCountRestrictionsAdministrator = 'ShareholderCountRestrictionsAdministrator',
  PercentageOwnershipRestrictionsAdministrator = 'PercentageOwnershipRestrictionsAdministrator',
}

/**
 * @hidden
 */
export enum StoRole {
  StoOperator = 'StoOperator',
  StoAdministrator = 'StoAdministrator',
}

/**
 * @hidden
 */
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
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

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
