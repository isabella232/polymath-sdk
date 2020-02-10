# Class: SimpleSto

Class used to manage a simple sto

## Hierarchy

  ↳ [Sto](_entities_sto_.sto.md)‹[Params](../interfaces/_entities_simplesto_.params.md)›

  ↳ **SimpleSto**

## Index

### Constructors

* [constructor](_entities_simplesto_.simplesto.md#constructor)

### Properties

* [address](_entities_simplesto_.simplesto.md#address)
* [beneficialInvestmentsAllowed](_entities_simplesto_.simplesto.md#beneficialinvestmentsallowed)
* [cap](_entities_simplesto_.simplesto.md#cap)
* [capReached](_entities_simplesto_.simplesto.md#capreached)
* [context](_entities_simplesto_.simplesto.md#protected-context)
* [endDate](_entities_simplesto_.simplesto.md#enddate)
* [fundraiseCurrencies](_entities_simplesto_.simplesto.md#fundraisecurrencies)
* [investorCount](_entities_simplesto_.simplesto.md#investorcount)
* [isFinalized](_entities_simplesto_.simplesto.md#isfinalized)
* [isPaused](_entities_simplesto_.simplesto.md#ispaused)
* [preIssueAllowed](_entities_simplesto_.simplesto.md#preissueallowed)
* [raisedAmount](_entities_simplesto_.simplesto.md#raisedamount)
* [raisedFundsWallet](_entities_simplesto_.simplesto.md#raisedfundswallet)
* [rate](_entities_simplesto_.simplesto.md#rate)
* [securityTokenId](_entities_simplesto_.simplesto.md#securitytokenid)
* [securityTokenSymbol](_entities_simplesto_.simplesto.md#securitytokensymbol)
* [soldTokensAmount](_entities_simplesto_.simplesto.md#soldtokensamount)
* [startDate](_entities_simplesto_.simplesto.md#startdate)
* [stoType](_entities_simplesto_.simplesto.md#stotype)
* [uid](_entities_simplesto_.simplesto.md#uid)
* [unsoldTokensWallet](_entities_simplesto_.simplesto.md#unsoldtokenswallet)

### Methods

* [_refresh](_entities_simplesto_.simplesto.md#_refresh)
* [allowBeneficialInvestments](_entities_simplesto_.simplesto.md#allowbeneficialinvestments)
* [allowPreIssuing](_entities_simplesto_.simplesto.md#allowpreissuing)
* [assignRole](_entities_simplesto_.simplesto.md#assignrole)
* [disallowBeneficialInvestments](_entities_simplesto_.simplesto.md#disallowbeneficialinvestments)
* [disallowPreIssuing](_entities_simplesto_.simplesto.md#disallowpreissuing)
* [finalize](_entities_simplesto_.simplesto.md#finalize)
* [getInvestments](_entities_simplesto_.simplesto.md#getinvestments)
* [invest](_entities_simplesto_.simplesto.md#invest)
* [pause](_entities_simplesto_.simplesto.md#pause)
* [revokeRole](_entities_simplesto_.simplesto.md#revokerole)
* [toPojo](_entities_simplesto_.simplesto.md#topojo)
* [unpause](_entities_simplesto_.simplesto.md#unpause)
* [generateId](_entities_simplesto_.simplesto.md#static-generateid)
* [unserialize](_entities_simplesto_.simplesto.md#static-unserialize)

## Constructors

###  constructor

\+ **new SimpleSto**(`params`: [Params](../interfaces/_entities_simplesto_.params.md) & [UniqueIdentifiers](../interfaces/_entities_sto_.uniqueidentifiers.md), `context`: [Context](_context_.context.md)): *[SimpleSto](_entities_simplesto_.simplesto.md)*

*Overrides [Sto](_entities_sto_.sto.md).[constructor](_entities_sto_.sto.md#constructor)*

*Defined in [src/entities/SimpleSto.ts:61](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SimpleSto.ts#L61)*

Create a new simple sto instance

**Parameters:**

Name | Type |
------ | ------ |
`params` | [Params](../interfaces/_entities_simplesto_.params.md) & [UniqueIdentifiers](../interfaces/_entities_sto_.uniqueidentifiers.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[SimpleSto](_entities_simplesto_.simplesto.md)*

## Properties

###  address

• **address**: *string*

*Inherited from [Sto](_entities_sto_.sto.md).[address](_entities_sto_.sto.md#address)*

*Defined in [src/entities/Sto.ts:107](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Sto.ts#L107)*

ethereum address for the STO

___

###  beneficialInvestmentsAllowed

• **beneficialInvestmentsAllowed**: *boolean*

*Inherited from [Sto](_entities_sto_.sto.md).[beneficialInvestmentsAllowed](_entities_sto_.sto.md#beneficialinvestmentsallowed)*

*Defined in [src/entities/Sto.ts:175](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Sto.ts#L175)*

whether investments can be made on behalf of a beneficiary or not

___

###  cap

• **cap**: *BigNumber*

*Defined in [src/entities/SimpleSto.ts:56](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SimpleSto.ts#L56)*

cap of total tokens that can be sold in sto

___

###  capReached

• **capReached**: *boolean*

*Inherited from [Sto](_entities_sto_.sto.md).[capReached](_entities_sto_.sto.md#capreached)*

*Defined in [src/entities/Sto.ts:160](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Sto.ts#L160)*

whether the STO cap has been reached or not

___

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from [Sto](_entities_sto_.sto.md).[context](_entities_sto_.sto.md#protected-context)*

*Defined in [src/entities/Sto.ts:177](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Sto.ts#L177)*

___

###  endDate

• **endDate**: *Date*

*Inherited from [Sto](_entities_sto_.sto.md).[endDate](_entities_sto_.sto.md#enddate)*

*Defined in [src/entities/Sto.ts:120](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Sto.ts#L120)*

___

###  fundraiseCurrencies

• **fundraiseCurrencies**: *Currency[]*

*Inherited from [Sto](_entities_sto_.sto.md).[fundraiseCurrencies](_entities_sto_.sto.md#fundraisecurrencies)*

*Defined in [src/entities/Sto.ts:150](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Sto.ts#L150)*

types of currency in which funds can be raised

___

###  investorCount

• **investorCount**: *number*

*Inherited from [Sto](_entities_sto_.sto.md).[investorCount](_entities_sto_.sto.md#investorcount)*

*Defined in [src/entities/Sto.ts:145](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Sto.ts#L145)*

number of investors that have purchased tokens in the STO

___

###  isFinalized

• **isFinalized**: *boolean*

*Inherited from [Sto](_entities_sto_.sto.md).[isFinalized](_entities_sto_.sto.md#isfinalized)*

*Defined in [src/entities/Sto.ts:165](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Sto.ts#L165)*

whether the STO has been finalized or not

___

###  isPaused

• **isPaused**: *boolean*

*Inherited from [Sto](_entities_sto_.sto.md).[isPaused](_entities_sto_.sto.md#ispaused)*

*Defined in [src/entities/Sto.ts:155](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Sto.ts#L155)*

whether the STO is currently paused or not

___

###  preIssueAllowed

• **preIssueAllowed**: *boolean*

*Inherited from [Sto](_entities_sto_.sto.md).[preIssueAllowed](_entities_sto_.sto.md#preissueallowed)*

*Defined in [src/entities/Sto.ts:170](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Sto.ts#L170)*

whether all tokens due to be sold are issued when the STO starts. If false, the appropriate amount of tokens is issued to the buyer whenever a sale is made

___

###  raisedAmount

• **raisedAmount**: *BigNumber*

*Inherited from [Sto](_entities_sto_.sto.md).[raisedAmount](_entities_sto_.sto.md#raisedamount)*

*Defined in [src/entities/Sto.ts:135](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Sto.ts#L135)*

amount of funds that have been raised so far

___

###  raisedFundsWallet

• **raisedFundsWallet**: *string*

*Inherited from [Sto](_entities_sto_.sto.md).[raisedFundsWallet](_entities_sto_.sto.md#raisedfundswallet)*

*Defined in [src/entities/Sto.ts:125](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Sto.ts#L125)*

wallet where raised funds will be forwarded to

___

###  rate

• **rate**: *BigNumber*

*Defined in [src/entities/SimpleSto.ts:61](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SimpleSto.ts#L61)*

rate at which the tokens will be sold in sto

___

###  securityTokenId

• **securityTokenId**: *string*

*Inherited from [Sto](_entities_sto_.sto.md).[securityTokenId](_entities_sto_.sto.md#securitytokenid)*

*Defined in [src/entities/Sto.ts:111](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Sto.ts#L111)*

___

###  securityTokenSymbol

• **securityTokenSymbol**: *string*

*Inherited from [Sto](_entities_sto_.sto.md).[securityTokenSymbol](_entities_sto_.sto.md#securitytokensymbol)*

*Defined in [src/entities/Sto.ts:109](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Sto.ts#L109)*

___

###  soldTokensAmount

• **soldTokensAmount**: *BigNumber*

*Inherited from [Sto](_entities_sto_.sto.md).[soldTokensAmount](_entities_sto_.sto.md#soldtokensamount)*

*Defined in [src/entities/Sto.ts:140](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Sto.ts#L140)*

total number of tokens that have been sold so far

___

###  startDate

• **startDate**: *Date*

*Inherited from [Sto](_entities_sto_.sto.md).[startDate](_entities_sto_.sto.md#startdate)*

*Defined in [src/entities/Sto.ts:118](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Sto.ts#L118)*

___

###  stoType

• **stoType**: *[StoType](../enums/_types_index_.stotype.md)*

*Inherited from [Sto](_entities_sto_.sto.md).[stoType](_entities_sto_.sto.md#stotype)*

*Defined in [src/entities/Sto.ts:116](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Sto.ts#L116)*

type of STO setup

___

###  uid

• **uid**: *string*

*Overrides [Sto](_entities_sto_.sto.md).[uid](_entities_sto_.sto.md#abstract-uid)*

*Defined in [src/entities/SimpleSto.ts:51](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SimpleSto.ts#L51)*

unique generated Tiered STO id

___

###  unsoldTokensWallet

• **unsoldTokensWallet**: *string*

*Inherited from [Sto](_entities_sto_.sto.md).[unsoldTokensWallet](_entities_sto_.sto.md#unsoldtokenswallet)*

*Defined in [src/entities/Sto.ts:130](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Sto.ts#L130)*

wallet where unsold tokens will be returned to

## Methods

###  _refresh

▸ **_refresh**(`params`: Partial‹[Params](../interfaces/_entities_simplesto_.params.md)›): *void*

*Overrides [Sto](_entities_sto_.sto.md).[_refresh](_entities_sto_.sto.md#_refresh)*

*Defined in [src/entities/SimpleSto.ts:151](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SimpleSto.ts#L151)*

Hydrate the entity

**Parameters:**

Name | Type |
------ | ------ |
`params` | Partial‹[Params](../interfaces/_entities_simplesto_.params.md)› |

**Returns:** *void*

___

###  allowBeneficialInvestments

▸ **allowBeneficialInvestments**(): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowBeneficialInvestmentsProcedureArgs](../interfaces/_types_index_.toggleallowbeneficialinvestmentsprocedureargs.md), void››*

*Inherited from [Sto](_entities_sto_.sto.md)*

*Defined in [src/entities/Sto.ts:316](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Sto.ts#L316)*

Enable a party to invest in the STO on behalf of another party

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowBeneficialInvestmentsProcedureArgs](../interfaces/_types_index_.toggleallowbeneficialinvestmentsprocedureargs.md), void››*

___

###  allowPreIssuing

▸ **allowPreIssuing**(): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowPreIssuingProcedureArgs](../interfaces/_types_index_.toggleallowpreissuingprocedureargs.md), void››*

*Inherited from [Sto](_entities_sto_.sto.md)*

*Defined in [src/entities/Sto.ts:287](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Sto.ts#L287)*

Enable all offered tokens to be issued instantly at STO start (default behavior is to issue on purchase)
Can be disabled *BEFORE* the STO starts by calling disallowPreIssuing

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowPreIssuingProcedureArgs](../interfaces/_types_index_.toggleallowpreissuingprocedureargs.md), void››*

___

###  assignRole

▸ **assignRole**(`args`: object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[AssignStoRoleProcedureArgs](../interfaces/_types_index_.assignstoroleprocedureargs.md), void››*

*Inherited from [Sto](_entities_sto_.sto.md)*

*Defined in [src/entities/Sto.ts:348](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Sto.ts#L348)*

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

*Defined in [src/entities/Sto.ts:330](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Sto.ts#L330)*

Disable the possibility for a party to invest in the STO on behalf of another party

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowBeneficialInvestmentsProcedureArgs](../interfaces/_types_index_.toggleallowbeneficialinvestmentsprocedureargs.md), void››*

___

###  disallowPreIssuing

▸ **disallowPreIssuing**(): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowPreIssuingProcedureArgs](../interfaces/_types_index_.toggleallowpreissuingprocedureargs.md), void››*

*Inherited from [Sto](_entities_sto_.sto.md)*

*Defined in [src/entities/Sto.ts:302](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Sto.ts#L302)*

Disable pre-issuing of offered tokens at STO start (goes back to default behavior, which is to issue on purchase)
Can be re-enabled *BEFORE* the STO starts by calling allowPreIssuing

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowPreIssuingProcedureArgs](../interfaces/_types_index_.toggleallowpreissuingprocedureargs.md), void››*

___

###  finalize

▸ **finalize**(): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[FinalizeStoProcedureArgs](../interfaces/_types_index_.finalizestoprocedureargs.md), void››*

*Inherited from [Sto](_entities_sto_.sto.md)*

*Defined in [src/entities/Sto.ts:275](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Sto.ts#L275)*

Finalize the offering. The offering's treasury wallet (or the Security Token's treasury wallet if one was not specified for the offering)
will receive the remaining unsold tokens. Throws an error if there are transfer restrictions which do not permit the wallet to receive that amount of tokens

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[FinalizeStoProcedureArgs](../interfaces/_types_index_.finalizestoprocedureargs.md), void››*

___

###  getInvestments

▸ **getInvestments**(): *Promise‹[Investment](_entities_investment_.investment.md)[]›*

*Defined in [src/entities/SimpleSto.ts:81](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SimpleSto.ts#L81)*

Retrieve all investments that have been made on this STO

**Returns:** *Promise‹[Investment](_entities_investment_.investment.md)[]›*

___

###  invest

▸ **invest**(`args`: object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[InvestInSimpleStoProcedureArgs](../interfaces/_types_index_.investinsimplestoprocedureargs.md), void››*

*Defined in [src/entities/SimpleSto.ts:126](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SimpleSto.ts#L126)*

Invest in the STO

**Parameters:**

▪ **args**: *object*

Name | Type | Description |
------ | ------ | ------ |
`amount` | BigNumber | amount to spend |
`beneficiary?` | undefined &#124; string | address that will receive the purchased tokens (defaults to current wallet, will fail if beneficial investments are not allowed for the STO, only applicable if the STO currency is ETH)  |

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[InvestInSimpleStoProcedureArgs](../interfaces/_types_index_.investinsimplestoprocedureargs.md), void››*

___

###  pause

▸ **pause**(): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[TogglePauseStoProcedureArgs](../interfaces/_types_index_.togglepausestoprocedureargs.md), void››*

*Inherited from [Sto](_entities_sto_.sto.md)*

*Defined in [src/entities/Sto.ts:246](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Sto.ts#L246)*

Pause the offering

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[TogglePauseStoProcedureArgs](../interfaces/_types_index_.togglepausestoprocedureargs.md), void››*

___

###  revokeRole

▸ **revokeRole**(`args`: object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[AssignStoRoleProcedureArgs](../interfaces/_types_index_.assignstoroleprocedureargs.md), void››*

*Inherited from [Sto](_entities_sto_.sto.md)*

*Defined in [src/entities/Sto.ts:374](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Sto.ts#L374)*

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

*Defined in [src/entities/SimpleSto.ts:137](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SimpleSto.ts#L137)*

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** *object*

* **cap**: *BigNumber*

* **rate**: *BigNumber*

___

###  unpause

▸ **unpause**(): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[TogglePauseStoProcedureArgs](../interfaces/_types_index_.togglepausestoprocedureargs.md), void››*

*Inherited from [Sto](_entities_sto_.sto.md)*

*Defined in [src/entities/Sto.ts:260](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Sto.ts#L260)*

Unpause the offering

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[TogglePauseStoProcedureArgs](../interfaces/_types_index_.togglepausestoprocedureargs.md), void››*

___

### `Static` generateId

▸ **generateId**(`__namedParameters`: object): *string*

*Defined in [src/entities/SimpleSto.ts:40](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SimpleSto.ts#L40)*

Generate the Simple STO's UUID from its identifying properties

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

*Defined in [src/entities/Sto.ts:184](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Sto.ts#L184)*

Unserialize string to a Security Token Offering object representation

**Parameters:**

Name | Type |
------ | ------ |
`serialized` | string |

**Returns:** *[UniqueIdentifiers](../interfaces/_entities_sto_.uniqueidentifiers.md)*
