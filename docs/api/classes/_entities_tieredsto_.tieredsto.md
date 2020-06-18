# Class: TieredSto

Used to manage a tiered sto

## Hierarchy

  ↳ [Sto](_entities_sto_.sto.md)‹[Params](../interfaces/_entities_tieredsto_.params.md)›

  ↳ **TieredSto**

## Index

### Constructors

* [constructor](_entities_tieredsto_.tieredsto.md#constructor)

### Properties

* [address](_entities_tieredsto_.tieredsto.md#address)
* [beneficialInvestmentsAllowed](_entities_tieredsto_.tieredsto.md#beneficialinvestmentsallowed)
* [capReached](_entities_tieredsto_.tieredsto.md#capreached)
* [context](_entities_tieredsto_.tieredsto.md#protected-context)
* [currentTier](_entities_tieredsto_.tieredsto.md#currenttier)
* [endDate](_entities_tieredsto_.tieredsto.md#enddate)
* [fundraiseCurrencies](_entities_tieredsto_.tieredsto.md#fundraisecurrencies)
* [investorCount](_entities_tieredsto_.tieredsto.md#investorcount)
* [isFinalized](_entities_tieredsto_.tieredsto.md#isfinalized)
* [isPaused](_entities_tieredsto_.tieredsto.md#ispaused)
* [minimumInvestment](_entities_tieredsto_.tieredsto.md#minimuminvestment)
* [nonAccreditedInvestmentLimit](_entities_tieredsto_.tieredsto.md#nonaccreditedinvestmentlimit)
* [preIssueAllowed](_entities_tieredsto_.tieredsto.md#preissueallowed)
* [raisedAmount](_entities_tieredsto_.tieredsto.md#raisedamount)
* [raisedFundsWallet](_entities_tieredsto_.tieredsto.md#raisedfundswallet)
* [securityTokenId](_entities_tieredsto_.tieredsto.md#securitytokenid)
* [securityTokenSymbol](_entities_tieredsto_.tieredsto.md#securitytokensymbol)
* [soldTokensAmount](_entities_tieredsto_.tieredsto.md#soldtokensamount)
* [stableCoinAddresses](_entities_tieredsto_.tieredsto.md#stablecoinaddresses)
* [startDate](_entities_tieredsto_.tieredsto.md#startdate)
* [stoType](_entities_tieredsto_.tieredsto.md#stotype)
* [tiers](_entities_tieredsto_.tieredsto.md#tiers)
* [uid](_entities_tieredsto_.tieredsto.md#uid)
* [unsoldTokensWallet](_entities_tieredsto_.tieredsto.md#unsoldtokenswallet)

### Methods

* [_refresh](_entities_tieredsto_.tieredsto.md#_refresh)
* [allowBeneficialInvestments](_entities_tieredsto_.tieredsto.md#allowbeneficialinvestments)
* [allowPreIssuing](_entities_tieredsto_.tieredsto.md#allowpreissuing)
* [assignRole](_entities_tieredsto_.tieredsto.md#assignrole)
* [disallowBeneficialInvestments](_entities_tieredsto_.tieredsto.md#disallowbeneficialinvestments)
* [disallowPreIssuing](_entities_tieredsto_.tieredsto.md#disallowpreissuing)
* [finalize](_entities_tieredsto_.tieredsto.md#finalize)
* [getCurrency](_entities_tieredsto_.tieredsto.md#getcurrency)
* [getInvestments](_entities_tieredsto_.tieredsto.md#getinvestments)
* [invest](_entities_tieredsto_.tieredsto.md#invest)
* [modifyData](_entities_tieredsto_.tieredsto.md#modifydata)
* [pause](_entities_tieredsto_.tieredsto.md#pause)
* [revokeRole](_entities_tieredsto_.tieredsto.md#revokerole)
* [toPojo](_entities_tieredsto_.tieredsto.md#topojo)
* [unpause](_entities_tieredsto_.tieredsto.md#unpause)
* [generateId](_entities_tieredsto_.tieredsto.md#static-generateid)
* [unserialize](_entities_tieredsto_.tieredsto.md#static-unserialize)

## Constructors

###  constructor

\+ **new TieredSto**(`params`: [Params](../interfaces/_entities_tieredsto_.params.md) & [UniqueIdentifiers](../interfaces/_entities_sto_.uniqueidentifiers.md), `context`: [Context](_context_.context.md)): *[TieredSto](_entities_tieredsto_.tieredsto.md)*

*Overrides [Sto](_entities_sto_.sto.md).[constructor](_entities_sto_.sto.md#constructor)*

*Defined in [src/entities/TieredSto.ts:151](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/TieredSto.ts#L151)*

Create a new tiered sto instance

**Parameters:**

Name | Type |
------ | ------ |
`params` | [Params](../interfaces/_entities_tieredsto_.params.md) & [UniqueIdentifiers](../interfaces/_entities_sto_.uniqueidentifiers.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[TieredSto](_entities_tieredsto_.tieredsto.md)*

## Properties

###  address

• **address**: *string*

*Inherited from [Sto](_entities_sto_.sto.md).[address](_entities_sto_.sto.md#address)*

*Defined in [src/entities/Sto.ts:107](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/Sto.ts#L107)*

ethereum address for the STO

___

###  beneficialInvestmentsAllowed

• **beneficialInvestmentsAllowed**: *boolean*

*Inherited from [Sto](_entities_sto_.sto.md).[beneficialInvestmentsAllowed](_entities_sto_.sto.md#beneficialinvestmentsallowed)*

*Defined in [src/entities/Sto.ts:175](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/Sto.ts#L175)*

whether investments can be made on behalf of a beneficiary or not

___

###  capReached

• **capReached**: *boolean*

*Inherited from [Sto](_entities_sto_.sto.md).[capReached](_entities_sto_.sto.md#capreached)*

*Defined in [src/entities/Sto.ts:160](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/Sto.ts#L160)*

whether the STO cap has been reached or not

___

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from [Sto](_entities_sto_.sto.md).[context](_entities_sto_.sto.md#protected-context)*

*Defined in [src/entities/Sto.ts:177](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/Sto.ts#L177)*

___

###  currentTier

• **currentTier**: *number*

*Defined in [src/entities/TieredSto.ts:134](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/TieredSto.ts#L134)*

index of the current active tier

___

###  endDate

• **endDate**: *Date*

*Inherited from [Sto](_entities_sto_.sto.md).[endDate](_entities_sto_.sto.md#enddate)*

*Defined in [src/entities/Sto.ts:120](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/Sto.ts#L120)*

___

###  fundraiseCurrencies

• **fundraiseCurrencies**: *Currency[]*

*Inherited from [Sto](_entities_sto_.sto.md).[fundraiseCurrencies](_entities_sto_.sto.md#fundraisecurrencies)*

*Defined in [src/entities/Sto.ts:150](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/Sto.ts#L150)*

types of currency in which funds can be raised

___

###  investorCount

• **investorCount**: *number*

*Inherited from [Sto](_entities_sto_.sto.md).[investorCount](_entities_sto_.sto.md#investorcount)*

*Defined in [src/entities/Sto.ts:145](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/Sto.ts#L145)*

number of investors that have purchased tokens in the STO

___

###  isFinalized

• **isFinalized**: *boolean*

*Inherited from [Sto](_entities_sto_.sto.md).[isFinalized](_entities_sto_.sto.md#isfinalized)*

*Defined in [src/entities/Sto.ts:165](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/Sto.ts#L165)*

whether the STO has been finalized or not

___

###  isPaused

• **isPaused**: *boolean*

*Inherited from [Sto](_entities_sto_.sto.md).[isPaused](_entities_sto_.sto.md#ispaused)*

*Defined in [src/entities/Sto.ts:155](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/Sto.ts#L155)*

whether the STO is currently paused or not

___

###  minimumInvestment

• **minimumInvestment**: *BigNumber*

*Defined in [src/entities/TieredSto.ts:141](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/TieredSto.ts#L141)*

___

###  nonAccreditedInvestmentLimit

• **nonAccreditedInvestmentLimit**: *BigNumber*

*Defined in [src/entities/TieredSto.ts:139](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/TieredSto.ts#L139)*

maximum investment allowed for non-accredited investors

___

###  preIssueAllowed

• **preIssueAllowed**: *boolean*

*Inherited from [Sto](_entities_sto_.sto.md).[preIssueAllowed](_entities_sto_.sto.md#preissueallowed)*

*Defined in [src/entities/Sto.ts:170](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/Sto.ts#L170)*

whether all tokens due to be sold are issued when the STO starts. If false, the appropriate amount of tokens is issued to the buyer whenever a sale is made

___

###  raisedAmount

• **raisedAmount**: *BigNumber*

*Inherited from [Sto](_entities_sto_.sto.md).[raisedAmount](_entities_sto_.sto.md#raisedamount)*

*Defined in [src/entities/Sto.ts:135](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/Sto.ts#L135)*

amount of funds that have been raised so far

___

###  raisedFundsWallet

• **raisedFundsWallet**: *string*

*Inherited from [Sto](_entities_sto_.sto.md).[raisedFundsWallet](_entities_sto_.sto.md#raisedfundswallet)*

*Defined in [src/entities/Sto.ts:125](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/Sto.ts#L125)*

wallet where raised funds will be forwarded to

___

###  securityTokenId

• **securityTokenId**: *string*

*Inherited from [Sto](_entities_sto_.sto.md).[securityTokenId](_entities_sto_.sto.md#securitytokenid)*

*Defined in [src/entities/Sto.ts:111](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/Sto.ts#L111)*

___

###  securityTokenSymbol

• **securityTokenSymbol**: *string*

*Inherited from [Sto](_entities_sto_.sto.md).[securityTokenSymbol](_entities_sto_.sto.md#securitytokensymbol)*

*Defined in [src/entities/Sto.ts:109](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/Sto.ts#L109)*

___

###  soldTokensAmount

• **soldTokensAmount**: *BigNumber*

*Inherited from [Sto](_entities_sto_.sto.md).[soldTokensAmount](_entities_sto_.sto.md#soldtokensamount)*

*Defined in [src/entities/Sto.ts:140](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/Sto.ts#L140)*

total number of tokens that have been sold so far

___

###  stableCoinAddresses

• **stableCoinAddresses**: *string[]*

*Defined in [src/entities/TieredSto.ts:146](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/TieredSto.ts#L146)*

array of Stable Coin ERC20 tokens that can be used to purchase tokens in this Offering

___

###  startDate

• **startDate**: *Date*

*Inherited from [Sto](_entities_sto_.sto.md).[startDate](_entities_sto_.sto.md#startdate)*

*Defined in [src/entities/Sto.ts:118](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/Sto.ts#L118)*

___

###  stoType

• **stoType**: *[StoType](../enums/_types_index_.stotype.md)*

*Inherited from [Sto](_entities_sto_.sto.md).[stoType](_entities_sto_.sto.md#stotype)*

*Defined in [src/entities/Sto.ts:116](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/Sto.ts#L116)*

type of STO setup

___

###  tiers

• **tiers**: *[Tier](../interfaces/_entities_tieredsto_.tier.md)[]*

*Defined in [src/entities/TieredSto.ts:151](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/TieredSto.ts#L151)*

array of tier information

___

###  uid

• **uid**: *string*

*Overrides [Sto](_entities_sto_.sto.md).[uid](_entities_sto_.sto.md#abstract-uid)*

*Defined in [src/entities/TieredSto.ts:129](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/TieredSto.ts#L129)*

unique generated Tiered STO id

___

###  unsoldTokensWallet

• **unsoldTokensWallet**: *string*

*Inherited from [Sto](_entities_sto_.sto.md).[unsoldTokensWallet](_entities_sto_.sto.md#unsoldtokenswallet)*

*Defined in [src/entities/Sto.ts:130](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/Sto.ts#L130)*

wallet where unsold tokens will be returned to

## Methods

###  _refresh

▸ **_refresh**(`params`: Partial‹[Params](../interfaces/_entities_tieredsto_.params.md)›): *void*

*Overrides [Sto](_entities_sto_.sto.md).[_refresh](_entities_sto_.sto.md#_refresh)*

*Defined in [src/entities/TieredSto.ts:349](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/TieredSto.ts#L349)*

Hydrate the entity

**Parameters:**

Name | Type |
------ | ------ |
`params` | Partial‹[Params](../interfaces/_entities_tieredsto_.params.md)› |

**Returns:** *void*

___

###  allowBeneficialInvestments

▸ **allowBeneficialInvestments**(): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowBeneficialInvestmentsProcedureArgs](../interfaces/_types_index_.toggleallowbeneficialinvestmentsprocedureargs.md), void››*

*Inherited from [Sto](_entities_sto_.sto.md)*

*Defined in [src/entities/Sto.ts:316](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/Sto.ts#L316)*

Enable a party to invest in the STO on behalf of another party

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowBeneficialInvestmentsProcedureArgs](../interfaces/_types_index_.toggleallowbeneficialinvestmentsprocedureargs.md), void››*

___

###  allowPreIssuing

▸ **allowPreIssuing**(): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowPreIssuingProcedureArgs](../interfaces/_types_index_.toggleallowpreissuingprocedureargs.md), void››*

*Inherited from [Sto](_entities_sto_.sto.md)*

*Defined in [src/entities/Sto.ts:287](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/Sto.ts#L287)*

Enable all offered tokens to be issued instantly at STO start (default behavior is to issue on purchase)
Can be disabled *BEFORE* the STO starts by calling disallowPreIssuing

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowPreIssuingProcedureArgs](../interfaces/_types_index_.toggleallowpreissuingprocedureargs.md), void››*

___

###  assignRole

▸ **assignRole**(`args`: object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[AssignStoRoleProcedureArgs](../interfaces/_types_index_.assignstoroleprocedureargs.md), void››*

*Inherited from [Sto](_entities_sto_.sto.md)*

*Defined in [src/entities/Sto.ts:348](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/Sto.ts#L348)*

Assign a role on the STO to a delegate

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`delegateAddress` | string |
`description?` | undefined &#124; string |
`role` | [StoRole](../enums/_types_index_.storole.md) |

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[AssignStoRoleProcedureArgs](../interfaces/_types_index_.assignstoroleprocedureargs.md), void››*

___

###  disallowBeneficialInvestments

▸ **disallowBeneficialInvestments**(): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowBeneficialInvestmentsProcedureArgs](../interfaces/_types_index_.toggleallowbeneficialinvestmentsprocedureargs.md), void››*

*Inherited from [Sto](_entities_sto_.sto.md)*

*Defined in [src/entities/Sto.ts:330](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/Sto.ts#L330)*

Disable the possibility for a party to invest in the STO on behalf of another party

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowBeneficialInvestmentsProcedureArgs](../interfaces/_types_index_.toggleallowbeneficialinvestmentsprocedureargs.md), void››*

___

###  disallowPreIssuing

▸ **disallowPreIssuing**(): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowPreIssuingProcedureArgs](../interfaces/_types_index_.toggleallowpreissuingprocedureargs.md), void››*

*Inherited from [Sto](_entities_sto_.sto.md)*

*Defined in [src/entities/Sto.ts:302](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/Sto.ts#L302)*

Disable pre-issuing of offered tokens at STO start (goes back to default behavior, which is to issue on purchase)
Can be re-enabled *BEFORE* the STO starts by calling allowPreIssuing

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowPreIssuingProcedureArgs](../interfaces/_types_index_.toggleallowpreissuingprocedureargs.md), void››*

___

###  finalize

▸ **finalize**(): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[FinalizeStoProcedureArgs](../interfaces/_types_index_.finalizestoprocedureargs.md), void››*

*Inherited from [Sto](_entities_sto_.sto.md)*

*Defined in [src/entities/Sto.ts:275](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/Sto.ts#L275)*

Finalize the offering. The offering's treasury wallet (or the Security Token's treasury wallet if one was not specified for the offering)
will receive the remaining unsold tokens. Throws an error if there are transfer restrictions which do not permit the wallet to receive that amount of tokens

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[FinalizeStoProcedureArgs](../interfaces/_types_index_.finalizestoprocedureargs.md), void››*

___

###  getCurrency

▸ **getCurrency**(): *Promise‹[CustomCurrency](../interfaces/_types_index_.customcurrency.md)›*

*Defined in [src/entities/TieredSto.ts:225](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/TieredSto.ts#L225)*

Retrieve the denomination in which the tokens are priced in this STO

**Returns:** *Promise‹[CustomCurrency](../interfaces/_types_index_.customcurrency.md)›*

___

###  getInvestments

▸ **getInvestments**(): *Promise‹[Investment](_entities_investment_.investment.md)[]›*

*Defined in [src/entities/TieredSto.ts:181](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/TieredSto.ts#L181)*

Retrieve all investments that have been made on this STO

**Returns:** *Promise‹[Investment](_entities_investment_.investment.md)[]›*

___

###  invest

▸ **invest**(`params`: InvestInStableCoinParams): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[InvestInTieredStoProcedureArgs](../modules/_types_index_.md#investintieredstoprocedureargs)››*

*Defined in [src/entities/TieredSto.ts:296](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/TieredSto.ts#L296)*

Invest in the STO

**Parameters:**

Name | Type |
------ | ------ |
`params` | InvestInStableCoinParams |

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[InvestInTieredStoProcedureArgs](../modules/_types_index_.md#investintieredstoprocedureargs)››*

▸ **invest**(`params`: InvestInOtherParams): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[InvestInTieredStoProcedureArgs](../modules/_types_index_.md#investintieredstoprocedureargs)››*

*Defined in [src/entities/TieredSto.ts:301](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/TieredSto.ts#L301)*

Invest in the STO

**Parameters:**

Name | Type |
------ | ------ |
`params` | InvestInOtherParams |

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[InvestInTieredStoProcedureArgs](../modules/_types_index_.md#investintieredstoprocedureargs)››*

___

###  modifyData

▸ **modifyData**(`args`: object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ModifyTieredStoDataProcedureArgs](../interfaces/_types_index_.modifytieredstodataprocedureargs.md), void››*

*Defined in [src/entities/TieredSto.ts:277](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/TieredSto.ts#L277)*

Modify STO parameters. Must be done before the STO starts

**Parameters:**

▪ **args**: *object*

Name | Type | Description |
------ | ------ | ------ |
`customCurrency?` | Partial‹[CustomCurrency](../interfaces/_types_index_.customcurrency.md)› | custom currency data. Allows the STO to raise funds pegged to a different currency. Optional, defaults to USD  |
`endDate?` | Date | date when the STO should end |
`fundariseCurrencies?` | Currency[] | - |
`minimumInvestment?` | BigNumber | minimum investment amount |
`nonAccreditedInvestmentLimit?` | BigNumber | maximum investment for non-accredited investors |
`raisedFundsWallet?` | undefined &#124; string | wallet address that will receive the funds that are being raised |
`stableCoinAddresses?` | string[] | addresses of supported stablecoins |
`startDate?` | Date | date when the STO should start |
`tiers?` | [StoTier](../interfaces/_types_index_.stotier.md)[] | tier information |
`unsoldTokensWallet?` | undefined &#124; string | wallet address that will receive unsold tokens when the end date is reached |

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ModifyTieredStoDataProcedureArgs](../interfaces/_types_index_.modifytieredstodataprocedureargs.md), void››*

___

###  pause

▸ **pause**(): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[TogglePauseStoProcedureArgs](../interfaces/_types_index_.togglepausestoprocedureargs.md), void››*

*Inherited from [Sto](_entities_sto_.sto.md)*

*Defined in [src/entities/Sto.ts:246](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/Sto.ts#L246)*

Pause the offering

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[TogglePauseStoProcedureArgs](../interfaces/_types_index_.togglepausestoprocedureargs.md), void››*

___

###  revokeRole

▸ **revokeRole**(`args`: object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[AssignStoRoleProcedureArgs](../interfaces/_types_index_.assignstoroleprocedureargs.md), void››*

*Inherited from [Sto](_entities_sto_.sto.md)*

*Defined in [src/entities/Sto.ts:374](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/Sto.ts#L374)*

Remove a role from a delegate

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`delegateAddress` | string |
`role` | [StoRole](../enums/_types_index_.storole.md) |

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[AssignStoRoleProcedureArgs](../interfaces/_types_index_.assignstoroleprocedureargs.md), void››*

___

###  toPojo

▸ **toPojo**(): *object*

*Overrides [Sto](_entities_sto_.sto.md).[toPojo](_entities_sto_.sto.md#topojo)*

*Defined in [src/entities/TieredSto.ts:335](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/TieredSto.ts#L335)*

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** *object*

* **currentTier**: *number*

* **tiers**: *[Tier](../interfaces/_entities_tieredsto_.tier.md)[]*

___

###  unpause

▸ **unpause**(): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[TogglePauseStoProcedureArgs](../interfaces/_types_index_.togglepausestoprocedureargs.md), void››*

*Inherited from [Sto](_entities_sto_.sto.md)*

*Defined in [src/entities/Sto.ts:260](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/Sto.ts#L260)*

Unpause the offering

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[TogglePauseStoProcedureArgs](../interfaces/_types_index_.togglepausestoprocedureargs.md), void››*

___

### `Static` generateId

▸ **generateId**(`__namedParameters`: object): *string*

*Defined in [src/entities/TieredSto.ts:118](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/TieredSto.ts#L118)*

Generate the Tiered STO's UUID from its identifying properties

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`address` | string |
`securityTokenId` | string |
`stoType` | [StoType](../enums/_types_index_.stotype.md) |

**Returns:** *string*

___

### `Static` unserialize

▸ **unserialize**(`serialized`: string): *[UniqueIdentifiers](../interfaces/_entities_sto_.uniqueidentifiers.md)*

*Inherited from [Sto](_entities_sto_.sto.md).[unserialize](_entities_sto_.sto.md#static-unserialize)*

*Defined in [src/entities/Sto.ts:184](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/Sto.ts#L184)*

Unserialize string to a Security Token Offering object representation

**Parameters:**

Name | Type |
------ | ------ |
`serialized` | string |

**Returns:** *[UniqueIdentifiers](../interfaces/_entities_sto_.uniqueidentifiers.md)*
