# TieredSto

Used to manage a tiered sto

## Hierarchy

↳ [Sto](../classes/_entities_sto_.sto.md)‹[Params](../interfaces/_entities_tieredsto_.params.md)›

↳ **TieredSto**

## Index

### Constructors

* [constructor](../classes/_entities_tieredsto_.tieredsto.md#constructor)

### Properties

* [address](../classes/_entities_tieredsto_.tieredsto.md#address)
* [beneficialInvestmentsAllowed](../classes/_entities_tieredsto_.tieredsto.md#beneficialinvestmentsallowed)
* [capReached](../classes/_entities_tieredsto_.tieredsto.md#capreached)
* [context](../classes/_entities_tieredsto_.tieredsto.md#protected-context)
* [currentTier](../classes/_entities_tieredsto_.tieredsto.md#currenttier)
* [endDate](../classes/_entities_tieredsto_.tieredsto.md#enddate)
* [fundraiseCurrencies](../classes/_entities_tieredsto_.tieredsto.md#fundraisecurrencies)
* [investorCount](../classes/_entities_tieredsto_.tieredsto.md#investorcount)
* [isFinalized](../classes/_entities_tieredsto_.tieredsto.md#isfinalized)
* [isPaused](../classes/_entities_tieredsto_.tieredsto.md#ispaused)
* [minimumInvestment](../classes/_entities_tieredsto_.tieredsto.md#minimuminvestment)
* [nonAccreditedInvestmentLimit](../classes/_entities_tieredsto_.tieredsto.md#nonaccreditedinvestmentlimit)
* [preIssueAllowed](../classes/_entities_tieredsto_.tieredsto.md#preissueallowed)
* [raisedAmount](../classes/_entities_tieredsto_.tieredsto.md#raisedamount)
* [raisedFundsWallet](../classes/_entities_tieredsto_.tieredsto.md#raisedfundswallet)
* [securityTokenId](../classes/_entities_tieredsto_.tieredsto.md#securitytokenid)
* [securityTokenSymbol](../classes/_entities_tieredsto_.tieredsto.md#securitytokensymbol)
* [soldTokensAmount](../classes/_entities_tieredsto_.tieredsto.md#soldtokensamount)
* [stableCoinAddresses](../classes/_entities_tieredsto_.tieredsto.md#stablecoinaddresses)
* [startDate](../classes/_entities_tieredsto_.tieredsto.md#startdate)
* [stoType](../classes/_entities_tieredsto_.tieredsto.md#stotype)
* [tiers](../classes/_entities_tieredsto_.tieredsto.md#tiers)
* [uid](../classes/_entities_tieredsto_.tieredsto.md#uid)
* [unsoldTokensWallet](../classes/_entities_tieredsto_.tieredsto.md#unsoldtokenswallet)

### Methods

* [\_refresh](../classes/_entities_tieredsto_.tieredsto.md#_refresh)
* [allowBeneficialInvestments](../classes/_entities_tieredsto_.tieredsto.md#allowbeneficialinvestments)
* [allowPreIssuing](../classes/_entities_tieredsto_.tieredsto.md#allowpreissuing)
* [assignRole](../classes/_entities_tieredsto_.tieredsto.md#assignrole)
* [disallowBeneficialInvestments](../classes/_entities_tieredsto_.tieredsto.md#disallowbeneficialinvestments)
* [disallowPreIssuing](../classes/_entities_tieredsto_.tieredsto.md#disallowpreissuing)
* [finalize](../classes/_entities_tieredsto_.tieredsto.md#finalize)
* [getCurrency](../classes/_entities_tieredsto_.tieredsto.md#getcurrency)
* [getInvestments](../classes/_entities_tieredsto_.tieredsto.md#getinvestments)
* [invest](../classes/_entities_tieredsto_.tieredsto.md#invest)
* [modifyData](../classes/_entities_tieredsto_.tieredsto.md#modifydata)
* [pause](../classes/_entities_tieredsto_.tieredsto.md#pause)
* [revokeRole](../classes/_entities_tieredsto_.tieredsto.md#revokerole)
* [toPojo](../classes/_entities_tieredsto_.tieredsto.md#topojo)
* [unpause](../classes/_entities_tieredsto_.tieredsto.md#unpause)
* [generateId](../classes/_entities_tieredsto_.tieredsto.md#static-generateid)
* [unserialize](../classes/_entities_tieredsto_.tieredsto.md#static-unserialize)

## Constructors

### constructor

+ **new TieredSto**\(`params`: [Params](../interfaces/_entities_tieredsto_.params.md) & [UniqueIdentifiers](../interfaces/_entities_sto_.uniqueidentifiers.md), `context`: [Context](../classes/_context_.context.md)\): [_TieredSto_](../classes/_entities_tieredsto_.tieredsto.md)

_Overrides_ [_Sto_](../classes/_entities_sto_.sto.md)_._[_constructor_](../classes/_entities_sto_.sto.md#constructor)

_Defined in_ [_src/entities/TieredSto.ts:151_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TieredSto.ts#L151)

Create a new tiered sto instance

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | [Params](../interfaces/_entities_tieredsto_.params.md) & [UniqueIdentifiers](../interfaces/_entities_sto_.uniqueidentifiers.md) |
| `context` | [Context](../classes/_context_.context.md) |

**Returns:** [_TieredSto_](../classes/_entities_tieredsto_.tieredsto.md)

## Properties

### address

• **address**: _string_

_Inherited from_ [_Sto_](../classes/_entities_sto_.sto.md)_._[_address_](../classes/_entities_sto_.sto.md#address)

_Defined in_ [_src/entities/Sto.ts:107_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L107)

ethereum address for the STO

### beneficialInvestmentsAllowed

• **beneficialInvestmentsAllowed**: _boolean_

_Inherited from_ [_Sto_](../classes/_entities_sto_.sto.md)_._[_beneficialInvestmentsAllowed_](../classes/_entities_sto_.sto.md#beneficialinvestmentsallowed)

_Defined in_ [_src/entities/Sto.ts:175_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L175)

whether investments can be made on behalf of a beneficiary or not

### capReached

• **capReached**: _boolean_

_Inherited from_ [_Sto_](../classes/_entities_sto_.sto.md)_._[_capReached_](../classes/_entities_sto_.sto.md#capreached)

_Defined in_ [_src/entities/Sto.ts:160_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L160)

whether the STO cap has been reached or not

### `Protected` context

• **context**: [_Context_](../classes/_context_.context.md)

_Inherited from_ [_Sto_](../classes/_entities_sto_.sto.md)_._[_context_](../classes/_entities_sto_.sto.md#protected-context)

_Defined in_ [_src/entities/Sto.ts:177_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L177)

### currentTier

• **currentTier**: _number_

_Defined in_ [_src/entities/TieredSto.ts:134_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TieredSto.ts#L134)

index of the current active tier

### endDate

• **endDate**: _Date_

_Inherited from_ [_Sto_](../classes/_entities_sto_.sto.md)_._[_endDate_](../classes/_entities_sto_.sto.md#enddate)

_Defined in_ [_src/entities/Sto.ts:120_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L120)

### fundraiseCurrencies

• **fundraiseCurrencies**: _Currency\[\]_

_Inherited from_ [_Sto_](../classes/_entities_sto_.sto.md)_._[_fundraiseCurrencies_](../classes/_entities_sto_.sto.md#fundraisecurrencies)

_Defined in_ [_src/entities/Sto.ts:150_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L150)

types of currency in which funds can be raised

### investorCount

• **investorCount**: _number_

_Inherited from_ [_Sto_](../classes/_entities_sto_.sto.md)_._[_investorCount_](../classes/_entities_sto_.sto.md#investorcount)

_Defined in_ [_src/entities/Sto.ts:145_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L145)

number of investors that have purchased tokens in the STO

### isFinalized

• **isFinalized**: _boolean_

_Inherited from_ [_Sto_](../classes/_entities_sto_.sto.md)_._[_isFinalized_](../classes/_entities_sto_.sto.md#isfinalized)

_Defined in_ [_src/entities/Sto.ts:165_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L165)

whether the STO has been finalized or not

### isPaused

• **isPaused**: _boolean_

_Inherited from_ [_Sto_](../classes/_entities_sto_.sto.md)_._[_isPaused_](../classes/_entities_sto_.sto.md#ispaused)

_Defined in_ [_src/entities/Sto.ts:155_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L155)

whether the STO is currently paused or not

### minimumInvestment

• **minimumInvestment**: _BigNumber_

_Defined in_ [_src/entities/TieredSto.ts:141_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TieredSto.ts#L141)

### nonAccreditedInvestmentLimit

• **nonAccreditedInvestmentLimit**: _BigNumber_

_Defined in_ [_src/entities/TieredSto.ts:139_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TieredSto.ts#L139)

maximum investment allowed for non-accredited investors

### preIssueAllowed

• **preIssueAllowed**: _boolean_

_Inherited from_ [_Sto_](../classes/_entities_sto_.sto.md)_._[_preIssueAllowed_](../classes/_entities_sto_.sto.md#preissueallowed)

_Defined in_ [_src/entities/Sto.ts:170_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L170)

whether all tokens due to be sold are issued when the STO starts. If false, the appropriate amount of tokens is issued to the buyer whenever a sale is made

### raisedAmount

• **raisedAmount**: _BigNumber_

_Inherited from_ [_Sto_](../classes/_entities_sto_.sto.md)_._[_raisedAmount_](../classes/_entities_sto_.sto.md#raisedamount)

_Defined in_ [_src/entities/Sto.ts:135_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L135)

amount of funds that have been raised so far

### raisedFundsWallet

• **raisedFundsWallet**: _string_

_Inherited from_ [_Sto_](../classes/_entities_sto_.sto.md)_._[_raisedFundsWallet_](../classes/_entities_sto_.sto.md#raisedfundswallet)

_Defined in_ [_src/entities/Sto.ts:125_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L125)

wallet where raised funds will be forwarded to

### securityTokenId

• **securityTokenId**: _string_

_Inherited from_ [_Sto_](../classes/_entities_sto_.sto.md)_._[_securityTokenId_](../classes/_entities_sto_.sto.md#securitytokenid)

_Defined in_ [_src/entities/Sto.ts:111_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L111)

### securityTokenSymbol

• **securityTokenSymbol**: _string_

_Inherited from_ [_Sto_](../classes/_entities_sto_.sto.md)_._[_securityTokenSymbol_](../classes/_entities_sto_.sto.md#securitytokensymbol)

_Defined in_ [_src/entities/Sto.ts:109_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L109)

### soldTokensAmount

• **soldTokensAmount**: _BigNumber_

_Inherited from_ [_Sto_](../classes/_entities_sto_.sto.md)_._[_soldTokensAmount_](../classes/_entities_sto_.sto.md#soldtokensamount)

_Defined in_ [_src/entities/Sto.ts:140_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L140)

total number of tokens that have been sold so far

### stableCoinAddresses

• **stableCoinAddresses**: _string\[\]_

_Defined in_ [_src/entities/TieredSto.ts:146_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TieredSto.ts#L146)

array of Stable Coin ERC20 tokens that can be used to purchase tokens in this Offering

### startDate

• **startDate**: _Date_

_Inherited from_ [_Sto_](../classes/_entities_sto_.sto.md)_._[_startDate_](../classes/_entities_sto_.sto.md#startdate)

_Defined in_ [_src/entities/Sto.ts:118_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L118)

### stoType

• **stoType**: [_StoType_](../enums/_types_index_.stotype.md)

_Inherited from_ [_Sto_](../classes/_entities_sto_.sto.md)_._[_stoType_](../classes/_entities_sto_.sto.md#stotype)

_Defined in_ [_src/entities/Sto.ts:116_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L116)

type of STO setup

### tiers

• **tiers**: [_Tier_](../interfaces/_entities_tieredsto_.tier.md)_\[\]_

_Defined in_ [_src/entities/TieredSto.ts:151_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TieredSto.ts#L151)

array of tier information

### uid

• **uid**: _string_

_Overrides_ [_Sto_](../classes/_entities_sto_.sto.md)_._[_uid_](../classes/_entities_sto_.sto.md#abstract-uid)

_Defined in_ [_src/entities/TieredSto.ts:129_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TieredSto.ts#L129)

unique generated Tiered STO id

### unsoldTokensWallet

• **unsoldTokensWallet**: _string_

_Inherited from_ [_Sto_](../classes/_entities_sto_.sto.md)_._[_unsoldTokensWallet_](../classes/_entities_sto_.sto.md#unsoldtokenswallet)

_Defined in_ [_src/entities/Sto.ts:130_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L130)

wallet where unsold tokens will be returned to

## Methods

### \_refresh

▸ **\_refresh**\(`params`: Partial‹[Params](../interfaces/_entities_tieredsto_.params.md)›\): _void_

_Overrides_ [_Sto_](../classes/_entities_sto_.sto.md)_._[_\_refresh_](../classes/_entities_sto_.sto.md#_refresh)

_Defined in_ [_src/entities/TieredSto.ts:349_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TieredSto.ts#L349)

Hydrate the entity

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | Partial‹[Params](../interfaces/_entities_tieredsto_.params.md)› |

**Returns:** _void_

### allowBeneficialInvestments

▸ **allowBeneficialInvestments**\(\): _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹_[_ToggleAllowBeneficialInvestmentsProcedureArgs_](../interfaces/_types_index_.toggleallowbeneficialinvestmentsprocedureargs.md)_, void››_

_Inherited from_ [_Sto_](../classes/_entities_sto_.sto.md)

_Defined in_ [_src/entities/Sto.ts:316_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L316)

Enable a party to invest in the STO on behalf of another party

**Returns:** _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹_[_ToggleAllowBeneficialInvestmentsProcedureArgs_](../interfaces/_types_index_.toggleallowbeneficialinvestmentsprocedureargs.md)_, void››_

### allowPreIssuing

▸ **allowPreIssuing**\(\): _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹_[_ToggleAllowPreIssuingProcedureArgs_](../interfaces/_types_index_.toggleallowpreissuingprocedureargs.md)_, void››_

_Inherited from_ [_Sto_](../classes/_entities_sto_.sto.md)

_Defined in_ [_src/entities/Sto.ts:287_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L287)

Enable all offered tokens to be issued instantly at STO start \(default behavior is to issue on purchase\) Can be disabled _BEFORE_ the STO starts by calling disallowPreIssuing

**Returns:** _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹_[_ToggleAllowPreIssuingProcedureArgs_](../interfaces/_types_index_.toggleallowpreissuingprocedureargs.md)_, void››_

### assignRole

▸ **assignRole**\(`args`: object\): _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹_[_AssignStoRoleProcedureArgs_](../interfaces/_types_index_.assignstoroleprocedureargs.md)_, void››_

_Inherited from_ [_Sto_](../classes/_entities_sto_.sto.md)

_Defined in_ [_src/entities/Sto.ts:348_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L348)

Assign a role on the STO to a delegate

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `delegateAddress` | string |
| `description?` | undefined \| string |
| `role` | [StoRole](../enums/_types_index_.storole.md) |

**Returns:** _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹_[_AssignStoRoleProcedureArgs_](../interfaces/_types_index_.assignstoroleprocedureargs.md)_, void››_

### disallowBeneficialInvestments

▸ **disallowBeneficialInvestments**\(\): _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹_[_ToggleAllowBeneficialInvestmentsProcedureArgs_](../interfaces/_types_index_.toggleallowbeneficialinvestmentsprocedureargs.md)_, void››_

_Inherited from_ [_Sto_](../classes/_entities_sto_.sto.md)

_Defined in_ [_src/entities/Sto.ts:330_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L330)

Disable the possibility for a party to invest in the STO on behalf of another party

**Returns:** _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹_[_ToggleAllowBeneficialInvestmentsProcedureArgs_](../interfaces/_types_index_.toggleallowbeneficialinvestmentsprocedureargs.md)_, void››_

### disallowPreIssuing

▸ **disallowPreIssuing**\(\): _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹_[_ToggleAllowPreIssuingProcedureArgs_](../interfaces/_types_index_.toggleallowpreissuingprocedureargs.md)_, void››_

_Inherited from_ [_Sto_](../classes/_entities_sto_.sto.md)

_Defined in_ [_src/entities/Sto.ts:302_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L302)

Disable pre-issuing of offered tokens at STO start \(goes back to default behavior, which is to issue on purchase\) Can be re-enabled _BEFORE_ the STO starts by calling allowPreIssuing

**Returns:** _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹_[_ToggleAllowPreIssuingProcedureArgs_](../interfaces/_types_index_.toggleallowpreissuingprocedureargs.md)_, void››_

### finalize

▸ **finalize**\(\): _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹_[_FinalizeStoProcedureArgs_](../interfaces/_types_index_.finalizestoprocedureargs.md)_, void››_

_Inherited from_ [_Sto_](../classes/_entities_sto_.sto.md)

_Defined in_ [_src/entities/Sto.ts:275_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L275)

Finalize the offering. The offering's treasury wallet \(or the Security Token's treasury wallet if one was not specified for the offering\) will receive the remaining unsold tokens. Throws an error if there are transfer restrictions which do not permit the wallet to receive that amount of tokens

**Returns:** _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹_[_FinalizeStoProcedureArgs_](../interfaces/_types_index_.finalizestoprocedureargs.md)_, void››_

### getCurrency

▸ **getCurrency**\(\): _Promise‹_[_CustomCurrency_](../interfaces/_types_index_.customcurrency.md)_›_

_Defined in_ [_src/entities/TieredSto.ts:225_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TieredSto.ts#L225)

Retrieve the denomination in which the tokens are priced in this STO

**Returns:** _Promise‹_[_CustomCurrency_](../interfaces/_types_index_.customcurrency.md)_›_

### getInvestments

▸ **getInvestments**\(\): _Promise‹_[_Investment_](../classes/_entities_investment_.investment.md)_\[\]›_

_Defined in_ [_src/entities/TieredSto.ts:181_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TieredSto.ts#L181)

Retrieve all investments that have been made on this STO

**Returns:** _Promise‹_[_Investment_](../classes/_entities_investment_.investment.md)_\[\]›_

### invest

▸ **invest**\(`params`: InvestInStableCoinParams\): _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹_[_InvestInTieredStoProcedureArgs_](_types_index_.md#investintieredstoprocedureargs)_››_

_Defined in_ [_src/entities/TieredSto.ts:296_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TieredSto.ts#L296)

Invest in the STO

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | InvestInStableCoinParams |

**Returns:** _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹_[_InvestInTieredStoProcedureArgs_](_types_index_.md#investintieredstoprocedureargs)_››_

▸ **invest**\(`params`: InvestInOtherParams\): _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹_[_InvestInTieredStoProcedureArgs_](_types_index_.md#investintieredstoprocedureargs)_››_

_Defined in_ [_src/entities/TieredSto.ts:301_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TieredSto.ts#L301)

Invest in the STO

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | InvestInOtherParams |

**Returns:** _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹_[_InvestInTieredStoProcedureArgs_](_types_index_.md#investintieredstoprocedureargs)_››_

### modifyData

▸ **modifyData**\(`args`: object\): _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹_[_ModifyTieredStoDataProcedureArgs_](../interfaces/_types_index_.modifytieredstodataprocedureargs.md)_, void››_

_Defined in_ [_src/entities/TieredSto.ts:277_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TieredSto.ts#L277)

Modify STO parameters. Must be done before the STO starts

**Parameters:**

▪ **args**: _object_

| Name | Type | Description |
| :--- | :--- | :--- |
| `customCurrency?` | Partial‹[CustomCurrency](../interfaces/_types_index_.customcurrency.md)› | custom currency data. Allows the STO to raise funds pegged to a different currency. Optional, defaults to USD |
| `endDate?` | Date | date when the STO should end |
| `fundariseCurrencies?` | Currency\[\] | - |
| `minimumInvestment?` | BigNumber | minimum investment amount |
| `nonAccreditedInvestmentLimit?` | BigNumber | maximum investment for non-accredited investors |
| `raisedFundsWallet?` | undefined \| string | wallet address that will receive the funds that are being raised |
| `stableCoinAddresses?` | string\[\] | addresses of supported stablecoins |
| `startDate?` | Date | date when the STO should start |
| `tiers?` | [StoTier](../interfaces/_types_index_.stotier.md)\[\] | tier information |
| `unsoldTokensWallet?` | undefined \| string | wallet address that will receive unsold tokens when the end date is reached |

**Returns:** _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹_[_ModifyTieredStoDataProcedureArgs_](../interfaces/_types_index_.modifytieredstodataprocedureargs.md)_, void››_

### pause

▸ **pause**\(\): _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹_[_TogglePauseStoProcedureArgs_](../interfaces/_types_index_.togglepausestoprocedureargs.md)_, void››_

_Inherited from_ [_Sto_](../classes/_entities_sto_.sto.md)

_Defined in_ [_src/entities/Sto.ts:246_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L246)

Pause the offering

**Returns:** _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹_[_TogglePauseStoProcedureArgs_](../interfaces/_types_index_.togglepausestoprocedureargs.md)_, void››_

### revokeRole

▸ **revokeRole**\(`args`: object\): _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹_[_AssignStoRoleProcedureArgs_](../interfaces/_types_index_.assignstoroleprocedureargs.md)_, void››_

_Inherited from_ [_Sto_](../classes/_entities_sto_.sto.md)

_Defined in_ [_src/entities/Sto.ts:374_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L374)

Remove a role from a delegate

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `delegateAddress` | string |
| `role` | [StoRole](../enums/_types_index_.storole.md) |

**Returns:** _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹_[_AssignStoRoleProcedureArgs_](../interfaces/_types_index_.assignstoroleprocedureargs.md)_, void››_

### toPojo

▸ **toPojo**\(\): _object_

_Overrides_ [_Sto_](../classes/_entities_sto_.sto.md)_._[_toPojo_](../classes/_entities_sto_.sto.md#topojo)

_Defined in_ [_src/entities/TieredSto.ts:335_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TieredSto.ts#L335)

Convert entity to a POJO \(Plain Old Javascript Object\)

**Returns:** _object_

* **currentTier**: _number_
* **tiers**: [_Tier_](../interfaces/_entities_tieredsto_.tier.md)_\[\]_

### unpause

▸ **unpause**\(\): _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹_[_TogglePauseStoProcedureArgs_](../interfaces/_types_index_.togglepausestoprocedureargs.md)_, void››_

_Inherited from_ [_Sto_](../classes/_entities_sto_.sto.md)

_Defined in_ [_src/entities/Sto.ts:260_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L260)

Unpause the offering

**Returns:** _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹_[_TogglePauseStoProcedureArgs_](../interfaces/_types_index_.togglepausestoprocedureargs.md)_, void››_

### `Static` generateId

▸ **generateId**\(`__namedParameters`: object\): _string_

_Defined in_ [_src/entities/TieredSto.ts:118_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TieredSto.ts#L118)

Generate the Tiered STO's UUID from its identifying properties

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type |
| :--- | :--- |
| `address` | string |
| `securityTokenId` | string |
| `stoType` | [StoType](../enums/_types_index_.stotype.md) |

**Returns:** _string_

### `Static` unserialize

▸ **unserialize**\(`serialized`: string\): [_UniqueIdentifiers_](../interfaces/_entities_sto_.uniqueidentifiers.md)

_Inherited from_ [_Sto_](../classes/_entities_sto_.sto.md)_._[_unserialize_](../classes/_entities_sto_.sto.md#static-unserialize)

_Defined in_ [_src/entities/Sto.ts:184_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L184)

Unserialize string to a Security Token Offering object representation

**Parameters:**

| Name | Type |
| :--- | :--- |
| `serialized` | string |

**Returns:** [_UniqueIdentifiers_](../interfaces/_entities_sto_.uniqueidentifiers.md)

