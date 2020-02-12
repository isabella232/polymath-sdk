# Class: TieredSto

Used to manage a tiered sto

## Hierarchy

  ↳ [Sto](entities.sto.md)‹[Params](../interfaces/entities.params-9.md)›

  ↳ **TieredSto**

## Index

### Constructors

* [constructor](entities.tieredsto.md#constructor)

### Properties

* [address](entities.tieredsto.md#address)
* [beneficialInvestmentsAllowed](entities.tieredsto.md#beneficialinvestmentsallowed)
* [capReached](entities.tieredsto.md#capreached)
* [context](entities.tieredsto.md#protected-context)
* [currentTier](entities.tieredsto.md#currenttier)
* [endDate](entities.tieredsto.md#enddate)
* [fundraiseCurrencies](entities.tieredsto.md#fundraisecurrencies)
* [investorCount](entities.tieredsto.md#investorcount)
* [isFinalized](entities.tieredsto.md#isfinalized)
* [isPaused](entities.tieredsto.md#ispaused)
* [minimumInvestment](entities.tieredsto.md#minimuminvestment)
* [nonAccreditedInvestmentLimit](entities.tieredsto.md#nonaccreditedinvestmentlimit)
* [preIssueAllowed](entities.tieredsto.md#preissueallowed)
* [raisedAmount](entities.tieredsto.md#raisedamount)
* [raisedFundsWallet](entities.tieredsto.md#raisedfundswallet)
* [securityTokenId](entities.tieredsto.md#securitytokenid)
* [securityTokenSymbol](entities.tieredsto.md#securitytokensymbol)
* [soldTokensAmount](entities.tieredsto.md#soldtokensamount)
* [stableCoinAddresses](entities.tieredsto.md#stablecoinaddresses)
* [startDate](entities.tieredsto.md#startdate)
* [stoType](entities.tieredsto.md#stotype)
* [tiers](entities.tieredsto.md#tiers)
* [uid](entities.tieredsto.md#uid)
* [unsoldTokensWallet](entities.tieredsto.md#unsoldtokenswallet)

### Methods

* [_refresh](entities.tieredsto.md#_refresh)
* [allowBeneficialInvestments](entities.tieredsto.md#allowbeneficialinvestments)
* [allowPreIssuing](entities.tieredsto.md#allowpreissuing)
* [assignRole](entities.tieredsto.md#assignrole)
* [disallowBeneficialInvestments](entities.tieredsto.md#disallowbeneficialinvestments)
* [disallowPreIssuing](entities.tieredsto.md#disallowpreissuing)
* [finalize](entities.tieredsto.md#finalize)
* [getCurrency](entities.tieredsto.md#getcurrency)
* [getInvestments](entities.tieredsto.md#getinvestments)
* [invest](entities.tieredsto.md#invest)
* [modifyData](entities.tieredsto.md#modifydata)
* [pause](entities.tieredsto.md#pause)
* [revokeRole](entities.tieredsto.md#revokerole)
* [toPojo](entities.tieredsto.md#topojo)
* [unpause](entities.tieredsto.md#unpause)
* [generateId](entities.tieredsto.md#static-generateid)
* [unserialize](entities.tieredsto.md#static-unserialize)

## Constructors

###  constructor

\+ **new TieredSto**(`params`: [Params](../interfaces/entities.params-9.md) & [UniqueIdentifiers](../interfaces/entities.uniqueidentifiers.md), `context`: [Context](_context_.context.md)): *[TieredSto](entities.tieredsto.md)*

*Overrides [Sto](entities.sto.md).[constructor](entities.sto.md#constructor)*

*Defined in [src/entities/TieredSto.ts:156](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/TieredSto.ts#L156)*

Create a new tiered sto instance

**Parameters:**

Name | Type |
------ | ------ |
`params` | [Params](../interfaces/entities.params-9.md) & [UniqueIdentifiers](../interfaces/entities.uniqueidentifiers.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[TieredSto](entities.tieredsto.md)*

## Properties

###  address

• **address**: *string*

*Inherited from [Sto](entities.sto.md).[address](entities.sto.md#address)*

*Defined in [src/entities/Sto.ts:112](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Sto.ts#L112)*

ethereum address for the STO

___

###  beneficialInvestmentsAllowed

• **beneficialInvestmentsAllowed**: *boolean*

*Inherited from [Sto](entities.sto.md).[beneficialInvestmentsAllowed](entities.sto.md#beneficialinvestmentsallowed)*

*Defined in [src/entities/Sto.ts:180](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Sto.ts#L180)*

whether investments can be made on behalf of a beneficiary or not

___

###  capReached

• **capReached**: *boolean*

*Inherited from [Sto](entities.sto.md).[capReached](entities.sto.md#capreached)*

*Defined in [src/entities/Sto.ts:165](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Sto.ts#L165)*

whether the STO cap has been reached or not

___

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from [Sto](entities.sto.md).[context](entities.sto.md#protected-context)*

*Defined in [src/entities/Sto.ts:182](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Sto.ts#L182)*

___

###  currentTier

• **currentTier**: *number*

*Defined in [src/entities/TieredSto.ts:139](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/TieredSto.ts#L139)*

index of the current active tier

___

###  endDate

• **endDate**: *Date*

*Inherited from [Sto](entities.sto.md).[endDate](entities.sto.md#enddate)*

*Defined in [src/entities/Sto.ts:125](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Sto.ts#L125)*

___

###  fundraiseCurrencies

• **fundraiseCurrencies**: *Currency[]*

*Inherited from [Sto](entities.sto.md).[fundraiseCurrencies](entities.sto.md#fundraisecurrencies)*

*Defined in [src/entities/Sto.ts:155](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Sto.ts#L155)*

types of currency in which funds can be raised

___

###  investorCount

• **investorCount**: *number*

*Inherited from [Sto](entities.sto.md).[investorCount](entities.sto.md#investorcount)*

*Defined in [src/entities/Sto.ts:150](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Sto.ts#L150)*

number of investors that have purchased tokens in the STO

___

###  isFinalized

• **isFinalized**: *boolean*

*Inherited from [Sto](entities.sto.md).[isFinalized](entities.sto.md#isfinalized)*

*Defined in [src/entities/Sto.ts:170](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Sto.ts#L170)*

whether the STO has been finalized or not

___

###  isPaused

• **isPaused**: *boolean*

*Inherited from [Sto](entities.sto.md).[isPaused](entities.sto.md#ispaused)*

*Defined in [src/entities/Sto.ts:160](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Sto.ts#L160)*

whether the STO is currently paused or not

___

###  minimumInvestment

• **minimumInvestment**: *BigNumber*

*Defined in [src/entities/TieredSto.ts:146](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/TieredSto.ts#L146)*

___

###  nonAccreditedInvestmentLimit

• **nonAccreditedInvestmentLimit**: *BigNumber*

*Defined in [src/entities/TieredSto.ts:144](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/TieredSto.ts#L144)*

maximum investment allowed for non-accredited investors

___

###  preIssueAllowed

• **preIssueAllowed**: *boolean*

*Inherited from [Sto](entities.sto.md).[preIssueAllowed](entities.sto.md#preissueallowed)*

*Defined in [src/entities/Sto.ts:175](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Sto.ts#L175)*

whether all tokens due to be sold are issued when the STO starts. If false, the appropriate amount of tokens is issued to the buyer whenever a sale is made

___

###  raisedAmount

• **raisedAmount**: *BigNumber*

*Inherited from [Sto](entities.sto.md).[raisedAmount](entities.sto.md#raisedamount)*

*Defined in [src/entities/Sto.ts:140](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Sto.ts#L140)*

amount of funds that have been raised so far

___

###  raisedFundsWallet

• **raisedFundsWallet**: *string*

*Inherited from [Sto](entities.sto.md).[raisedFundsWallet](entities.sto.md#raisedfundswallet)*

*Defined in [src/entities/Sto.ts:130](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Sto.ts#L130)*

wallet where raised funds will be forwarded to

___

###  securityTokenId

• **securityTokenId**: *string*

*Inherited from [Sto](entities.sto.md).[securityTokenId](entities.sto.md#securitytokenid)*

*Defined in [src/entities/Sto.ts:116](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Sto.ts#L116)*

___

###  securityTokenSymbol

• **securityTokenSymbol**: *string*

*Inherited from [Sto](entities.sto.md).[securityTokenSymbol](entities.sto.md#securitytokensymbol)*

*Defined in [src/entities/Sto.ts:114](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Sto.ts#L114)*

___

###  soldTokensAmount

• **soldTokensAmount**: *BigNumber*

*Inherited from [Sto](entities.sto.md).[soldTokensAmount](entities.sto.md#soldtokensamount)*

*Defined in [src/entities/Sto.ts:145](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Sto.ts#L145)*

total number of tokens that have been sold so far

___

###  stableCoinAddresses

• **stableCoinAddresses**: *string[]*

*Defined in [src/entities/TieredSto.ts:151](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/TieredSto.ts#L151)*

array of Stable Coin ERC20 tokens that can be used to purchase tokens in this Offering

___

###  startDate

• **startDate**: *Date*

*Inherited from [Sto](entities.sto.md).[startDate](entities.sto.md#startdate)*

*Defined in [src/entities/Sto.ts:123](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Sto.ts#L123)*

___

###  stoType

• **stoType**: *[StoType](../enums/_types_index_.stotype.md)*

*Inherited from [Sto](entities.sto.md).[stoType](entities.sto.md#stotype)*

*Defined in [src/entities/Sto.ts:121](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Sto.ts#L121)*

type of STO setup

___

###  tiers

• **tiers**: *[Tier](../interfaces/entities.tier.md)[]*

*Defined in [src/entities/TieredSto.ts:156](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/TieredSto.ts#L156)*

array of tier information

___

###  uid

• **uid**: *string*

*Overrides [Sto](entities.sto.md).[uid](entities.sto.md#abstract-uid)*

*Defined in [src/entities/TieredSto.ts:134](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/TieredSto.ts#L134)*

unique generated Tiered STO id

___

###  unsoldTokensWallet

• **unsoldTokensWallet**: *string*

*Inherited from [Sto](entities.sto.md).[unsoldTokensWallet](entities.sto.md#unsoldtokenswallet)*

*Defined in [src/entities/Sto.ts:135](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Sto.ts#L135)*

wallet where unsold tokens will be returned to

## Methods

###  _refresh

▸ **_refresh**(`params`: Partial‹[Params](../interfaces/entities.params-9.md)›): *void*

*Overrides [Sto](entities.sto.md).[_refresh](entities.sto.md#_refresh)*

*Defined in [src/entities/TieredSto.ts:354](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/TieredSto.ts#L354)*

Hydrate the entity

**Parameters:**

Name | Type |
------ | ------ |
`params` | Partial‹[Params](../interfaces/entities.params-9.md)› |

**Returns:** *void*

___

###  allowBeneficialInvestments

▸ **allowBeneficialInvestments**(): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹[ToggleAllowBeneficialInvestmentsProcedureArgs](../interfaces/_types_index_.toggleallowbeneficialinvestmentsprocedureargs.md), void››*

*Inherited from [Sto](entities.sto.md)*

*Defined in [src/entities/Sto.ts:321](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Sto.ts#L321)*

Enable a party to invest in the STO on behalf of another party

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹[ToggleAllowBeneficialInvestmentsProcedureArgs](../interfaces/_types_index_.toggleallowbeneficialinvestmentsprocedureargs.md), void››*

___

###  allowPreIssuing

▸ **allowPreIssuing**(): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹[ToggleAllowPreIssuingProcedureArgs](../interfaces/_types_index_.toggleallowpreissuingprocedureargs.md), void››*

*Inherited from [Sto](entities.sto.md)*

*Defined in [src/entities/Sto.ts:292](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Sto.ts#L292)*

Enable all offered tokens to be issued instantly at STO start (default behavior is to issue on purchase)
Can be disabled *BEFORE* the STO starts by calling disallowPreIssuing

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹[ToggleAllowPreIssuingProcedureArgs](../interfaces/_types_index_.toggleallowpreissuingprocedureargs.md), void››*

___

###  assignRole

▸ **assignRole**(`args`: object): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹[AssignStoRoleProcedureArgs](../interfaces/_types_index_.assignstoroleprocedureargs.md), void››*

*Inherited from [Sto](entities.sto.md)*

*Defined in [src/entities/Sto.ts:353](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Sto.ts#L353)*

Assign a role on the STO to a delegate

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`delegateAddress` | string |
`description?` | undefined &#124; string |
`role` | [StoRole](../enums/_types_index_.storole.md) |

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹[AssignStoRoleProcedureArgs](../interfaces/_types_index_.assignstoroleprocedureargs.md), void››*

___

###  disallowBeneficialInvestments

▸ **disallowBeneficialInvestments**(): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹[ToggleAllowBeneficialInvestmentsProcedureArgs](../interfaces/_types_index_.toggleallowbeneficialinvestmentsprocedureargs.md), void››*

*Inherited from [Sto](entities.sto.md)*

*Defined in [src/entities/Sto.ts:335](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Sto.ts#L335)*

Disable the possibility for a party to invest in the STO on behalf of another party

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹[ToggleAllowBeneficialInvestmentsProcedureArgs](../interfaces/_types_index_.toggleallowbeneficialinvestmentsprocedureargs.md), void››*

___

###  disallowPreIssuing

▸ **disallowPreIssuing**(): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹[ToggleAllowPreIssuingProcedureArgs](../interfaces/_types_index_.toggleallowpreissuingprocedureargs.md), void››*

*Inherited from [Sto](entities.sto.md)*

*Defined in [src/entities/Sto.ts:307](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Sto.ts#L307)*

Disable pre-issuing of offered tokens at STO start (goes back to default behavior, which is to issue on purchase)
Can be re-enabled *BEFORE* the STO starts by calling allowPreIssuing

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹[ToggleAllowPreIssuingProcedureArgs](../interfaces/_types_index_.toggleallowpreissuingprocedureargs.md), void››*

___

###  finalize

▸ **finalize**(): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹[FinalizeStoProcedureArgs](../interfaces/_types_index_.finalizestoprocedureargs.md), void››*

*Inherited from [Sto](entities.sto.md)*

*Defined in [src/entities/Sto.ts:280](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Sto.ts#L280)*

Finalize the offering. The offering's treasury wallet (or the Security Token's treasury wallet if one was not specified for the offering)
will receive the remaining unsold tokens. Throws an error if there are transfer restrictions which do not permit the wallet to receive that amount of tokens

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹[FinalizeStoProcedureArgs](../interfaces/_types_index_.finalizestoprocedureargs.md), void››*

___

###  getCurrency

▸ **getCurrency**(): *Promise‹[CustomCurrency](../interfaces/_types_index_.customcurrency.md)›*

*Defined in [src/entities/TieredSto.ts:230](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/TieredSto.ts#L230)*

Retrieve the denomination in which the tokens are priced in this STO

**Returns:** *Promise‹[CustomCurrency](../interfaces/_types_index_.customcurrency.md)›*

___

###  getInvestments

▸ **getInvestments**(): *Promise‹[Investment](entities.investment.md)[]›*

*Defined in [src/entities/TieredSto.ts:186](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/TieredSto.ts#L186)*

Retrieve all investments that have been made on this STO

**Returns:** *Promise‹[Investment](entities.investment.md)[]›*

___

###  invest

▸ **invest**(`params`: InvestInStableCoinParams): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹[InvestInTieredStoProcedureArgs](../modules/_types_index_.md#investintieredstoprocedureargs)››*

*Defined in [src/entities/TieredSto.ts:301](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/TieredSto.ts#L301)*

Invest in the STO

**Parameters:**

Name | Type |
------ | ------ |
`params` | InvestInStableCoinParams |

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹[InvestInTieredStoProcedureArgs](../modules/_types_index_.md#investintieredstoprocedureargs)››*

▸ **invest**(`params`: InvestInOtherParams): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹[InvestInTieredStoProcedureArgs](../modules/_types_index_.md#investintieredstoprocedureargs)››*

*Defined in [src/entities/TieredSto.ts:306](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/TieredSto.ts#L306)*

Invest in the STO

**Parameters:**

Name | Type |
------ | ------ |
`params` | InvestInOtherParams |

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹[InvestInTieredStoProcedureArgs](../modules/_types_index_.md#investintieredstoprocedureargs)››*

___

###  modifyData

▸ **modifyData**(`args`: object): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹[ModifyTieredStoDataProcedureArgs](../interfaces/_types_index_.modifytieredstodataprocedureargs.md), void››*

*Defined in [src/entities/TieredSto.ts:282](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/TieredSto.ts#L282)*

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

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹[ModifyTieredStoDataProcedureArgs](../interfaces/_types_index_.modifytieredstodataprocedureargs.md), void››*

___

###  pause

▸ **pause**(): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹[TogglePauseStoProcedureArgs](../interfaces/_types_index_.togglepausestoprocedureargs.md), void››*

*Inherited from [Sto](entities.sto.md)*

*Defined in [src/entities/Sto.ts:251](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Sto.ts#L251)*

Pause the offering

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹[TogglePauseStoProcedureArgs](../interfaces/_types_index_.togglepausestoprocedureargs.md), void››*

___

###  revokeRole

▸ **revokeRole**(`args`: object): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹[AssignStoRoleProcedureArgs](../interfaces/_types_index_.assignstoroleprocedureargs.md), void››*

*Inherited from [Sto](entities.sto.md)*

*Defined in [src/entities/Sto.ts:379](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Sto.ts#L379)*

Remove a role from a delegate

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`delegateAddress` | string |
`role` | [StoRole](../enums/_types_index_.storole.md) |

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹[AssignStoRoleProcedureArgs](../interfaces/_types_index_.assignstoroleprocedureargs.md), void››*

___

###  toPojo

▸ **toPojo**(): *object*

*Overrides [Sto](entities.sto.md).[toPojo](entities.sto.md#topojo)*

*Defined in [src/entities/TieredSto.ts:340](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/TieredSto.ts#L340)*

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** *object*

* **currentTier**: *number*

* **tiers**: *[Tier](../interfaces/entities.tier.md)[]*

___

###  unpause

▸ **unpause**(): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹[TogglePauseStoProcedureArgs](../interfaces/_types_index_.togglepausestoprocedureargs.md), void››*

*Inherited from [Sto](entities.sto.md)*

*Defined in [src/entities/Sto.ts:265](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Sto.ts#L265)*

Unpause the offering

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹[TogglePauseStoProcedureArgs](../interfaces/_types_index_.togglepausestoprocedureargs.md), void››*

___

### `Static` generateId

▸ **generateId**(`__namedParameters`: object): *string*

*Defined in [src/entities/TieredSto.ts:123](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/TieredSto.ts#L123)*

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

▸ **unserialize**(`serialized`: string): *[UniqueIdentifiers](../interfaces/entities.uniqueidentifiers.md)*

*Inherited from [Sto](entities.sto.md).[unserialize](entities.sto.md#static-unserialize)*

*Defined in [src/entities/Sto.ts:189](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Sto.ts#L189)*

Unserialize string to a Security Token Offering object representation

**Parameters:**

Name | Type |
------ | ------ |
`serialized` | string |

**Returns:** *[UniqueIdentifiers](../interfaces/entities.uniqueidentifiers.md)*
