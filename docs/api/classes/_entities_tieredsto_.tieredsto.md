# Class: TieredSto

Used to manage a tiered sto

## Hierarchy

↳ [Sto](_entities_sto_.sto.md)‹[Params](../interfaces/_entities_tieredsto_.params.md)›

↳ **TieredSto**

## Index

### Constructors

- [constructor](_entities_tieredsto_.tieredsto.md#constructor)

### Properties

- [address](_entities_tieredsto_.tieredsto.md#address)
- [beneficialInvestmentsAllowed](_entities_tieredsto_.tieredsto.md#beneficialinvestmentsallowed)
- [capReached](_entities_tieredsto_.tieredsto.md#capreached)
- [context](_entities_tieredsto_.tieredsto.md#protected-context)
- [currentTier](_entities_tieredsto_.tieredsto.md#currenttier)
- [endDate](_entities_tieredsto_.tieredsto.md#enddate)
- [fundraiseCurrencies](_entities_tieredsto_.tieredsto.md#fundraisecurrencies)
- [investorCount](_entities_tieredsto_.tieredsto.md#investorcount)
- [isFinalized](_entities_tieredsto_.tieredsto.md#isfinalized)
- [isPaused](_entities_tieredsto_.tieredsto.md#ispaused)
- [minimumInvestment](_entities_tieredsto_.tieredsto.md#minimuminvestment)
- [nonAccreditedInvestmentLimit](_entities_tieredsto_.tieredsto.md#nonaccreditedinvestmentlimit)
- [preIssueAllowed](_entities_tieredsto_.tieredsto.md#preissueallowed)
- [raisedAmount](_entities_tieredsto_.tieredsto.md#raisedamount)
- [raisedFundsWallet](_entities_tieredsto_.tieredsto.md#raisedfundswallet)
- [securityTokenId](_entities_tieredsto_.tieredsto.md#securitytokenid)
- [securityTokenSymbol](_entities_tieredsto_.tieredsto.md#securitytokensymbol)
- [soldTokensAmount](_entities_tieredsto_.tieredsto.md#soldtokensamount)
- [stableCoinAddresses](_entities_tieredsto_.tieredsto.md#stablecoinaddresses)
- [startDate](_entities_tieredsto_.tieredsto.md#startdate)
- [stoType](_entities_tieredsto_.tieredsto.md#stotype)
- [tiers](_entities_tieredsto_.tieredsto.md#tiers)
- [uid](_entities_tieredsto_.tieredsto.md#uid)
- [unsoldTokensWallet](_entities_tieredsto_.tieredsto.md#unsoldtokenswallet)

### Methods

- [\_refresh](_entities_tieredsto_.tieredsto.md#_refresh)
- [allowBeneficialInvestments](_entities_tieredsto_.tieredsto.md#allowbeneficialinvestments)
- [allowPreIssuing](_entities_tieredsto_.tieredsto.md#allowpreissuing)
- [assignRole](_entities_tieredsto_.tieredsto.md#assignrole)
- [disallowBeneficialInvestments](_entities_tieredsto_.tieredsto.md#disallowbeneficialinvestments)
- [disallowPreIssuing](_entities_tieredsto_.tieredsto.md#disallowpreissuing)
- [finalize](_entities_tieredsto_.tieredsto.md#finalize)
- [getCurrency](_entities_tieredsto_.tieredsto.md#getcurrency)
- [getInvestments](_entities_tieredsto_.tieredsto.md#getinvestments)
- [invest](_entities_tieredsto_.tieredsto.md#invest)
- [modifyData](_entities_tieredsto_.tieredsto.md#modifydata)
- [pause](_entities_tieredsto_.tieredsto.md#pause)
- [revokeRole](_entities_tieredsto_.tieredsto.md#revokerole)
- [toPojo](_entities_tieredsto_.tieredsto.md#topojo)
- [unpause](_entities_tieredsto_.tieredsto.md#unpause)
- [generateId](_entities_tieredsto_.tieredsto.md#static-generateid)
- [unserialize](_entities_tieredsto_.tieredsto.md#static-unserialize)

## Constructors

### constructor

\+ **new TieredSto**(`params`: [Params](../interfaces/_entities_tieredsto_.params.md) & [UniqueIdentifiers](../interfaces/_entities_sto_.uniqueidentifiers.md), `context`: [Context](_context_.context.md)): _[TieredSto](_entities_tieredsto_.tieredsto.md)_

_Overrides [Sto](_entities_sto_.sto.md).[constructor](_entities_sto_.sto.md#constructor)_

_Defined in [src/entities/TieredSto.ts:151](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/TieredSto.ts#L151)_

Create a new tiered sto instance

**Parameters:**

| Name      | Type                                                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `params`  | [Params](../interfaces/_entities_tieredsto_.params.md) & [UniqueIdentifiers](../interfaces/_entities_sto_.uniqueidentifiers.md) |
| `context` | [Context](_context_.context.md)                                                                                                 |

**Returns:** _[TieredSto](_entities_tieredsto_.tieredsto.md)_

## Properties

### address

• **address**: _string_

_Inherited from [Sto](_entities_sto_.sto.md).[address](_entities_sto_.sto.md#address)_

_Defined in [src/entities/Sto.ts:107](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L107)_

ethereum address for the STO

---

### beneficialInvestmentsAllowed

• **beneficialInvestmentsAllowed**: _boolean_

_Inherited from [Sto](_entities_sto_.sto.md).[beneficialInvestmentsAllowed](_entities_sto_.sto.md#beneficialinvestmentsallowed)_

_Defined in [src/entities/Sto.ts:175](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L175)_

whether investments can be made on behalf of a beneficiary or not

---

### capReached

• **capReached**: _boolean_

_Inherited from [Sto](_entities_sto_.sto.md).[capReached](_entities_sto_.sto.md#capreached)_

_Defined in [src/entities/Sto.ts:160](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L160)_

whether the STO cap has been reached or not

---

### `Protected` context

• **context**: _[Context](_context_.context.md)_

_Inherited from [Sto](_entities_sto_.sto.md).[context](_entities_sto_.sto.md#protected-context)_

_Defined in [src/entities/Sto.ts:177](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L177)_

---

### currentTier

• **currentTier**: _number_

_Defined in [src/entities/TieredSto.ts:134](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/TieredSto.ts#L134)_

index of the current active tier

---

### endDate

• **endDate**: _Date_

_Inherited from [Sto](_entities_sto_.sto.md).[endDate](_entities_sto_.sto.md#enddate)_

_Defined in [src/entities/Sto.ts:120](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L120)_

---

### fundraiseCurrencies

• **fundraiseCurrencies**: _Currency[]_

_Inherited from [Sto](_entities_sto_.sto.md).[fundraiseCurrencies](_entities_sto_.sto.md#fundraisecurrencies)_

_Defined in [src/entities/Sto.ts:150](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L150)_

types of currency in which funds can be raised

---

### investorCount

• **investorCount**: _number_

_Inherited from [Sto](_entities_sto_.sto.md).[investorCount](_entities_sto_.sto.md#investorcount)_

_Defined in [src/entities/Sto.ts:145](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L145)_

number of investors that have purchased tokens in the STO

---

### isFinalized

• **isFinalized**: _boolean_

_Inherited from [Sto](_entities_sto_.sto.md).[isFinalized](_entities_sto_.sto.md#isfinalized)_

_Defined in [src/entities/Sto.ts:165](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L165)_

whether the STO has been finalized or not

---

### isPaused

• **isPaused**: _boolean_

_Inherited from [Sto](_entities_sto_.sto.md).[isPaused](_entities_sto_.sto.md#ispaused)_

_Defined in [src/entities/Sto.ts:155](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L155)_

whether the STO is currently paused or not

---

### minimumInvestment

• **minimumInvestment**: _BigNumber_

_Defined in [src/entities/TieredSto.ts:141](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/TieredSto.ts#L141)_

---

### nonAccreditedInvestmentLimit

• **nonAccreditedInvestmentLimit**: _BigNumber_

_Defined in [src/entities/TieredSto.ts:139](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/TieredSto.ts#L139)_

maximum investment allowed for non-accredited investors

---

### preIssueAllowed

• **preIssueAllowed**: _boolean_

_Inherited from [Sto](_entities_sto_.sto.md).[preIssueAllowed](_entities_sto_.sto.md#preissueallowed)_

_Defined in [src/entities/Sto.ts:170](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L170)_

whether all tokens due to be sold are issued when the STO starts. If false, the appropriate amount of tokens is issued to the buyer whenever a sale is made

---

### raisedAmount

• **raisedAmount**: _BigNumber_

_Inherited from [Sto](_entities_sto_.sto.md).[raisedAmount](_entities_sto_.sto.md#raisedamount)_

_Defined in [src/entities/Sto.ts:135](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L135)_

amount of funds that have been raised so far

---

### raisedFundsWallet

• **raisedFundsWallet**: _string_

_Inherited from [Sto](_entities_sto_.sto.md).[raisedFundsWallet](_entities_sto_.sto.md#raisedfundswallet)_

_Defined in [src/entities/Sto.ts:125](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L125)_

wallet where raised funds will be forwarded to

---

### securityTokenId

• **securityTokenId**: _string_

_Inherited from [Sto](_entities_sto_.sto.md).[securityTokenId](_entities_sto_.sto.md#securitytokenid)_

_Defined in [src/entities/Sto.ts:111](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L111)_

---

### securityTokenSymbol

• **securityTokenSymbol**: _string_

_Inherited from [Sto](_entities_sto_.sto.md).[securityTokenSymbol](_entities_sto_.sto.md#securitytokensymbol)_

_Defined in [src/entities/Sto.ts:109](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L109)_

---

### soldTokensAmount

• **soldTokensAmount**: _BigNumber_

_Inherited from [Sto](_entities_sto_.sto.md).[soldTokensAmount](_entities_sto_.sto.md#soldtokensamount)_

_Defined in [src/entities/Sto.ts:140](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L140)_

total number of tokens that have been sold so far

---

### stableCoinAddresses

• **stableCoinAddresses**: _string[]_

_Defined in [src/entities/TieredSto.ts:146](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/TieredSto.ts#L146)_

array of Stable Coin ERC20 tokens that can be used to purchase tokens in this Offering

---

### startDate

• **startDate**: _Date_

_Inherited from [Sto](_entities_sto_.sto.md).[startDate](_entities_sto_.sto.md#startdate)_

_Defined in [src/entities/Sto.ts:118](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L118)_

---

### stoType

• **stoType**: _[StoType](../enums/_types_index_.stotype.md)_

_Inherited from [Sto](_entities_sto_.sto.md).[stoType](_entities_sto_.sto.md#stotype)_

_Defined in [src/entities/Sto.ts:116](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L116)_

type of STO setup

---

### tiers

• **tiers**: _[Tier](../interfaces/_entities_tieredsto_.tier.md)[]_

_Defined in [src/entities/TieredSto.ts:151](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/TieredSto.ts#L151)_

array of tier information

---

### uid

• **uid**: _string_

_Overrides [Sto](_entities_sto_.sto.md).[uid](_entities_sto_.sto.md#abstract-uid)_

_Defined in [src/entities/TieredSto.ts:129](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/TieredSto.ts#L129)_

unique generated Tiered STO id

---

### unsoldTokensWallet

• **unsoldTokensWallet**: _string_

_Inherited from [Sto](_entities_sto_.sto.md).[unsoldTokensWallet](_entities_sto_.sto.md#unsoldtokenswallet)_

_Defined in [src/entities/Sto.ts:130](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L130)_

wallet where unsold tokens will be returned to

## Methods

### \_refresh

▸ **\_refresh**(`params`: Partial‹[Params](../interfaces/_entities_tieredsto_.params.md)›): _void_

_Overrides [Sto](_entities_sto_.sto.md).[\_refresh](_entities_sto_.sto.md#_refresh)_

_Defined in [src/entities/TieredSto.ts:349](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/TieredSto.ts#L349)_

Hydrate the entity

**Parameters:**

| Name     | Type                                                            |
| -------- | --------------------------------------------------------------- |
| `params` | Partial‹[Params](../interfaces/_entities_tieredsto_.params.md)› |

**Returns:** _void_

---

### allowBeneficialInvestments

▸ **allowBeneficialInvestments**(): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowBeneficialInvestmentsProcedureArgs](../interfaces/_types_index_.toggleallowbeneficialinvestmentsprocedureargs.md), void››_

_Inherited from [Sto](_entities_sto_.sto.md)_

_Defined in [src/entities/Sto.ts:316](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L316)_

Enable a party to invest in the STO on behalf of another party

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowBeneficialInvestmentsProcedureArgs](../interfaces/_types_index_.toggleallowbeneficialinvestmentsprocedureargs.md), void››_

---

### allowPreIssuing

▸ **allowPreIssuing**(): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowPreIssuingProcedureArgs](../interfaces/_types_index_.toggleallowpreissuingprocedureargs.md), void››_

_Inherited from [Sto](_entities_sto_.sto.md)_

_Defined in [src/entities/Sto.ts:287](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L287)_

Enable all offered tokens to be issued instantly at STO start (default behavior is to issue on purchase)
Can be disabled _BEFORE_ the STO starts by calling disallowPreIssuing

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowPreIssuingProcedureArgs](../interfaces/_types_index_.toggleallowpreissuingprocedureargs.md), void››_

---

### assignRole

▸ **assignRole**(`args`: object): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[AssignStoRoleProcedureArgs](../interfaces/_types_index_.assignstoroleprocedureargs.md), void››_

_Inherited from [Sto](_entities_sto_.sto.md)_

_Defined in [src/entities/Sto.ts:348](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L348)_

Assign a role on the STO to a delegate

**Parameters:**

▪ **args**: _object_

| Name              | Type                                         |
| ----------------- | -------------------------------------------- |
| `delegateAddress` | string                                       |
| `description?`    | undefined &#124; string                      |
| `role`            | [StoRole](../enums/_types_index_.storole.md) |

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[AssignStoRoleProcedureArgs](../interfaces/_types_index_.assignstoroleprocedureargs.md), void››_

---

### disallowBeneficialInvestments

▸ **disallowBeneficialInvestments**(): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowBeneficialInvestmentsProcedureArgs](../interfaces/_types_index_.toggleallowbeneficialinvestmentsprocedureargs.md), void››_

_Inherited from [Sto](_entities_sto_.sto.md)_

_Defined in [src/entities/Sto.ts:330](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L330)_

Disable the possibility for a party to invest in the STO on behalf of another party

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowBeneficialInvestmentsProcedureArgs](../interfaces/_types_index_.toggleallowbeneficialinvestmentsprocedureargs.md), void››_

---

### disallowPreIssuing

▸ **disallowPreIssuing**(): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowPreIssuingProcedureArgs](../interfaces/_types_index_.toggleallowpreissuingprocedureargs.md), void››_

_Inherited from [Sto](_entities_sto_.sto.md)_

_Defined in [src/entities/Sto.ts:302](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L302)_

Disable pre-issuing of offered tokens at STO start (goes back to default behavior, which is to issue on purchase)
Can be re-enabled _BEFORE_ the STO starts by calling allowPreIssuing

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowPreIssuingProcedureArgs](../interfaces/_types_index_.toggleallowpreissuingprocedureargs.md), void››_

---

### finalize

▸ **finalize**(): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[FinalizeStoProcedureArgs](../interfaces/_types_index_.finalizestoprocedureargs.md), void››_

_Inherited from [Sto](_entities_sto_.sto.md)_

_Defined in [src/entities/Sto.ts:275](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L275)_

Finalize the offering. The offering's treasury wallet (or the Security Token's treasury wallet if one was not specified for the offering)
will receive the remaining unsold tokens. Throws an error if there are transfer restrictions which do not permit the wallet to receive that amount of tokens

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[FinalizeStoProcedureArgs](../interfaces/_types_index_.finalizestoprocedureargs.md), void››_

---

### getCurrency

▸ **getCurrency**(): _Promise‹[CustomCurrency](../interfaces/_types_index_.customcurrency.md)›_

_Defined in [src/entities/TieredSto.ts:225](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/TieredSto.ts#L225)_

Retrieve the denomination in which the tokens are priced in this STO

**Returns:** _Promise‹[CustomCurrency](../interfaces/_types_index_.customcurrency.md)›_

---

### getInvestments

▸ **getInvestments**(): _Promise‹[Investment](_entities_investment_.investment.md)[]›_

_Defined in [src/entities/TieredSto.ts:181](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/TieredSto.ts#L181)_

Retrieve all investments that have been made on this STO

**Returns:** _Promise‹[Investment](_entities_investment_.investment.md)[]›_

---

### invest

▸ **invest**(`params`: InvestInStableCoinParams): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[InvestInTieredStoProcedureArgs](../modules/_types_index_.md#investintieredstoprocedureargs)››_

_Defined in [src/entities/TieredSto.ts:296](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/TieredSto.ts#L296)_

Invest in the STO

**Parameters:**

| Name     | Type                     |
| -------- | ------------------------ |
| `params` | InvestInStableCoinParams |

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[InvestInTieredStoProcedureArgs](../modules/_types_index_.md#investintieredstoprocedureargs)››_

▸ **invest**(`params`: InvestInOtherParams): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[InvestInTieredStoProcedureArgs](../modules/_types_index_.md#investintieredstoprocedureargs)››_

_Defined in [src/entities/TieredSto.ts:301](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/TieredSto.ts#L301)_

Invest in the STO

**Parameters:**

| Name     | Type                |
| -------- | ------------------- |
| `params` | InvestInOtherParams |

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[InvestInTieredStoProcedureArgs](../modules/_types_index_.md#investintieredstoprocedureargs)››_

---

### modifyData

▸ **modifyData**(`args`: object): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ModifyTieredStoDataProcedureArgs](../interfaces/_types_index_.modifytieredstodataprocedureargs.md), void››_

_Defined in [src/entities/TieredSto.ts:277](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/TieredSto.ts#L277)_

Modify STO parameters. Must be done before the STO starts

**Parameters:**

▪ **args**: _object_

| Name                            | Type                                                                     | Description                                                                                                   |
| ------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `customCurrency?`               | Partial‹[CustomCurrency](../interfaces/_types_index_.customcurrency.md)› | custom currency data. Allows the STO to raise funds pegged to a different currency. Optional, defaults to USD |
| `endDate?`                      | Date                                                                     | date when the STO should end                                                                                  |
| `fundariseCurrencies?`          | Currency[]                                                               | -                                                                                                             |
| `minimumInvestment?`            | BigNumber                                                                | minimum investment amount                                                                                     |
| `nonAccreditedInvestmentLimit?` | BigNumber                                                                | maximum investment for non-accredited investors                                                               |
| `raisedFundsWallet?`            | undefined &#124; string                                                  | wallet address that will receive the funds that are being raised                                              |
| `stableCoinAddresses?`          | string[]                                                                 | addresses of supported stablecoins                                                                            |
| `startDate?`                    | Date                                                                     | date when the STO should start                                                                                |
| `tiers?`                        | [StoTier](../interfaces/_types_index_.stotier.md)[]                      | tier information                                                                                              |
| `unsoldTokensWallet?`           | undefined &#124; string                                                  | wallet address that will receive unsold tokens when the end date is reached                                   |

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ModifyTieredStoDataProcedureArgs](../interfaces/_types_index_.modifytieredstodataprocedureargs.md), void››_

---

### pause

▸ **pause**(): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[TogglePauseStoProcedureArgs](../interfaces/_types_index_.togglepausestoprocedureargs.md), void››_

_Inherited from [Sto](_entities_sto_.sto.md)_

_Defined in [src/entities/Sto.ts:246](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L246)_

Pause the offering

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[TogglePauseStoProcedureArgs](../interfaces/_types_index_.togglepausestoprocedureargs.md), void››_

---

### revokeRole

▸ **revokeRole**(`args`: object): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[AssignStoRoleProcedureArgs](../interfaces/_types_index_.assignstoroleprocedureargs.md), void››_

_Inherited from [Sto](_entities_sto_.sto.md)_

_Defined in [src/entities/Sto.ts:374](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L374)_

Remove a role from a delegate

**Parameters:**

▪ **args**: _object_

| Name              | Type                                         |
| ----------------- | -------------------------------------------- |
| `delegateAddress` | string                                       |
| `role`            | [StoRole](../enums/_types_index_.storole.md) |

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[AssignStoRoleProcedureArgs](../interfaces/_types_index_.assignstoroleprocedureargs.md), void››_

---

### toPojo

▸ **toPojo**(): _object_

_Overrides [Sto](_entities_sto_.sto.md).[toPojo](_entities_sto_.sto.md#topojo)_

_Defined in [src/entities/TieredSto.ts:335](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/TieredSto.ts#L335)_

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** _object_

- **currentTier**: _number_

- **tiers**: _[Tier](../interfaces/_entities_tieredsto_.tier.md)[]_

---

### unpause

▸ **unpause**(): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[TogglePauseStoProcedureArgs](../interfaces/_types_index_.togglepausestoprocedureargs.md), void››_

_Inherited from [Sto](_entities_sto_.sto.md)_

_Defined in [src/entities/Sto.ts:260](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L260)_

Unpause the offering

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[TogglePauseStoProcedureArgs](../interfaces/_types_index_.togglepausestoprocedureargs.md), void››_

---

### `Static` generateId

▸ **generateId**(`__namedParameters`: object): _string_

_Defined in [src/entities/TieredSto.ts:118](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/TieredSto.ts#L118)_

Generate the Tiered STO's UUID from its identifying properties

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name              | Type                                         |
| ----------------- | -------------------------------------------- |
| `address`         | string                                       |
| `securityTokenId` | string                                       |
| `stoType`         | [StoType](../enums/_types_index_.stotype.md) |

**Returns:** _string_

---

### `Static` unserialize

▸ **unserialize**(`serialized`: string): _[UniqueIdentifiers](../interfaces/_entities_sto_.uniqueidentifiers.md)_

_Inherited from [Sto](_entities_sto_.sto.md).[unserialize](_entities_sto_.sto.md#static-unserialize)_

_Defined in [src/entities/Sto.ts:184](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L184)_

Unserialize string to a Security Token Offering object representation

**Parameters:**

| Name         | Type   |
| ------------ | ------ |
| `serialized` | string |

**Returns:** _[UniqueIdentifiers](../interfaces/_entities_sto_.uniqueidentifiers.md)_
