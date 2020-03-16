# Class: Sto <**P**>

Abstract class used as a base to manage sto functionalities

## Type parameters

▪ **P**

## Hierarchy

* [Entity](_entities_entity_.entity.md)‹P›

  ↳ **Sto**

  ↳ [SimpleSto](_entities_simplesto_.simplesto.md)

  ↳ [TieredSto](_entities_tieredsto_.tieredsto.md)

## Index

### Constructors

* [constructor](_entities_sto_.sto.md#constructor)

### Properties

* [address](_entities_sto_.sto.md#address)
* [beneficialInvestmentsAllowed](_entities_sto_.sto.md#beneficialinvestmentsallowed)
* [capReached](_entities_sto_.sto.md#capreached)
* [context](_entities_sto_.sto.md#protected-context)
* [endDate](_entities_sto_.sto.md#enddate)
* [fundraiseCurrencies](_entities_sto_.sto.md#fundraisecurrencies)
* [investorCount](_entities_sto_.sto.md#investorcount)
* [isFinalized](_entities_sto_.sto.md#isfinalized)
* [isPaused](_entities_sto_.sto.md#ispaused)
* [preIssueAllowed](_entities_sto_.sto.md#preissueallowed)
* [raisedAmount](_entities_sto_.sto.md#raisedamount)
* [raisedFundsWallet](_entities_sto_.sto.md#raisedfundswallet)
* [securityTokenId](_entities_sto_.sto.md#securitytokenid)
* [securityTokenSymbol](_entities_sto_.sto.md#securitytokensymbol)
* [soldTokensAmount](_entities_sto_.sto.md#soldtokensamount)
* [startDate](_entities_sto_.sto.md#startdate)
* [stoType](_entities_sto_.sto.md#stotype)
* [uid](_entities_sto_.sto.md#abstract-uid)
* [unsoldTokensWallet](_entities_sto_.sto.md#unsoldtokenswallet)

### Methods

* [_refresh](_entities_sto_.sto.md#_refresh)
* [allowBeneficialInvestments](_entities_sto_.sto.md#allowbeneficialinvestments)
* [allowPreIssuing](_entities_sto_.sto.md#allowpreissuing)
* [assignRole](_entities_sto_.sto.md#assignrole)
* [disallowBeneficialInvestments](_entities_sto_.sto.md#disallowbeneficialinvestments)
* [disallowPreIssuing](_entities_sto_.sto.md#disallowpreissuing)
* [finalize](_entities_sto_.sto.md#finalize)
* [pause](_entities_sto_.sto.md#pause)
* [revokeRole](_entities_sto_.sto.md#revokerole)
* [toPojo](_entities_sto_.sto.md#topojo)
* [unpause](_entities_sto_.sto.md#unpause)
* [unserialize](_entities_sto_.sto.md#static-unserialize)

## Constructors

###  constructor

\+ **new Sto**(`params`: [Params](../interfaces/_entities_sto_.params.md) & [UniqueIdentifiers](../interfaces/_entities_sto_.uniqueidentifiers.md), `context`: [Context](_context_.context.md)): *[Sto](_entities_sto_.sto.md)*

*Defined in [src/entities/Sto.ts:195](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L195)*

Create a new sto instance

**Parameters:**

Name | Type |
------ | ------ |
`params` | [Params](../interfaces/_entities_sto_.params.md) & [UniqueIdentifiers](../interfaces/_entities_sto_.uniqueidentifiers.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[Sto](_entities_sto_.sto.md)*

## Properties

###  address

• **address**: *string*

*Defined in [src/entities/Sto.ts:107](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L107)*

ethereum address for the STO

___

###  beneficialInvestmentsAllowed

• **beneficialInvestmentsAllowed**: *boolean*

*Defined in [src/entities/Sto.ts:175](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L175)*

whether investments can be made on behalf of a beneficiary or not

___

###  capReached

• **capReached**: *boolean*

*Defined in [src/entities/Sto.ts:160](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L160)*

whether the STO cap has been reached or not

___

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Defined in [src/entities/Sto.ts:177](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L177)*

___

###  endDate

• **endDate**: *Date*

*Defined in [src/entities/Sto.ts:120](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L120)*

___

###  fundraiseCurrencies

• **fundraiseCurrencies**: *Currency[]*

*Defined in [src/entities/Sto.ts:150](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L150)*

types of currency in which funds can be raised

___

###  investorCount

• **investorCount**: *number*

*Defined in [src/entities/Sto.ts:145](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L145)*

number of investors that have purchased tokens in the STO

___

###  isFinalized

• **isFinalized**: *boolean*

*Defined in [src/entities/Sto.ts:165](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L165)*

whether the STO has been finalized or not

___

###  isPaused

• **isPaused**: *boolean*

*Defined in [src/entities/Sto.ts:155](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L155)*

whether the STO is currently paused or not

___

###  preIssueAllowed

• **preIssueAllowed**: *boolean*

*Defined in [src/entities/Sto.ts:170](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L170)*

whether all tokens due to be sold are issued when the STO starts. If false, the appropriate amount of tokens is issued to the buyer whenever a sale is made

___

###  raisedAmount

• **raisedAmount**: *BigNumber*

*Defined in [src/entities/Sto.ts:135](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L135)*

amount of funds that have been raised so far

___

###  raisedFundsWallet

• **raisedFundsWallet**: *string*

*Defined in [src/entities/Sto.ts:125](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L125)*

wallet where raised funds will be forwarded to

___

###  securityTokenId

• **securityTokenId**: *string*

*Defined in [src/entities/Sto.ts:111](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L111)*

___

###  securityTokenSymbol

• **securityTokenSymbol**: *string*

*Defined in [src/entities/Sto.ts:109](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L109)*

___

###  soldTokensAmount

• **soldTokensAmount**: *BigNumber*

*Defined in [src/entities/Sto.ts:140](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L140)*

total number of tokens that have been sold so far

___

###  startDate

• **startDate**: *Date*

*Defined in [src/entities/Sto.ts:118](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L118)*

___

###  stoType

• **stoType**: *[StoType](../enums/_types_index_.stotype.md)*

*Defined in [src/entities/Sto.ts:116](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L116)*

type of STO setup

___

### `Abstract` uid

• **uid**: *string*

*Overrides [Entity](_entities_entity_.entity.md).[uid](_entities_entity_.entity.md#abstract-uid)*

*Defined in [src/entities/Sto.ts:102](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L102)*

Uniquely generated id for the STO

___

###  unsoldTokensWallet

• **unsoldTokensWallet**: *string*

*Defined in [src/entities/Sto.ts:130](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L130)*

wallet where unsold tokens will be returned to

## Methods

###  _refresh

▸ **_refresh**(`params`: Partial‹[Params](../interfaces/_entities_sto_.params.md)›): *void*

*Overrides [Entity](_entities_entity_.entity.md).[_refresh](_entities_entity_.entity.md#abstract-_refresh)*

*Defined in [src/entities/Sto.ts:438](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L438)*

Hydrate the entity

**Parameters:**

Name | Type |
------ | ------ |
`params` | Partial‹[Params](../interfaces/_entities_sto_.params.md)› |

**Returns:** *void*

___

###  allowBeneficialInvestments

▸ **allowBeneficialInvestments**(): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowBeneficialInvestmentsProcedureArgs](../interfaces/_types_index_.toggleallowbeneficialinvestmentsprocedureargs.md), void››*

*Defined in [src/entities/Sto.ts:316](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L316)*

Enable a party to invest in the STO on behalf of another party

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowBeneficialInvestmentsProcedureArgs](../interfaces/_types_index_.toggleallowbeneficialinvestmentsprocedureargs.md), void››*

___

###  allowPreIssuing

▸ **allowPreIssuing**(): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowPreIssuingProcedureArgs](../interfaces/_types_index_.toggleallowpreissuingprocedureargs.md), void››*

*Defined in [src/entities/Sto.ts:287](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L287)*

Enable all offered tokens to be issued instantly at STO start (default behavior is to issue on purchase)
Can be disabled *BEFORE* the STO starts by calling disallowPreIssuing

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowPreIssuingProcedureArgs](../interfaces/_types_index_.toggleallowpreissuingprocedureargs.md), void››*

___

###  assignRole

▸ **assignRole**(`args`: object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[AssignStoRoleProcedureArgs](../interfaces/_types_index_.assignstoroleprocedureargs.md), void››*

*Defined in [src/entities/Sto.ts:348](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L348)*

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

*Defined in [src/entities/Sto.ts:330](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L330)*

Disable the possibility for a party to invest in the STO on behalf of another party

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowBeneficialInvestmentsProcedureArgs](../interfaces/_types_index_.toggleallowbeneficialinvestmentsprocedureargs.md), void››*

___

###  disallowPreIssuing

▸ **disallowPreIssuing**(): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowPreIssuingProcedureArgs](../interfaces/_types_index_.toggleallowpreissuingprocedureargs.md), void››*

*Defined in [src/entities/Sto.ts:302](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L302)*

Disable pre-issuing of offered tokens at STO start (goes back to default behavior, which is to issue on purchase)
Can be re-enabled *BEFORE* the STO starts by calling allowPreIssuing

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowPreIssuingProcedureArgs](../interfaces/_types_index_.toggleallowpreissuingprocedureargs.md), void››*

___

###  finalize

▸ **finalize**(): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[FinalizeStoProcedureArgs](../interfaces/_types_index_.finalizestoprocedureargs.md), void››*

*Defined in [src/entities/Sto.ts:275](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L275)*

Finalize the offering. The offering's treasury wallet (or the Security Token's treasury wallet if one was not specified for the offering)
will receive the remaining unsold tokens. Throws an error if there are transfer restrictions which do not permit the wallet to receive that amount of tokens

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[FinalizeStoProcedureArgs](../interfaces/_types_index_.finalizestoprocedureargs.md), void››*

___

###  pause

▸ **pause**(): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[TogglePauseStoProcedureArgs](../interfaces/_types_index_.togglepausestoprocedureargs.md), void››*

*Defined in [src/entities/Sto.ts:246](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L246)*

Pause the offering

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[TogglePauseStoProcedureArgs](../interfaces/_types_index_.togglepausestoprocedureargs.md), void››*

___

###  revokeRole

▸ **revokeRole**(`args`: object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[AssignStoRoleProcedureArgs](../interfaces/_types_index_.assignstoroleprocedureargs.md), void››*

*Defined in [src/entities/Sto.ts:374](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L374)*

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

*Overrides [Entity](_entities_entity_.entity.md).[toPojo](_entities_entity_.entity.md#abstract-topojo)*

*Defined in [src/entities/Sto.ts:393](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L393)*

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** *object*

* **address**: *string*

* **beneficialInvestmentsAllowed**: *boolean*

* **capReached**: *boolean*

* **endDate**: *Date*

* **fundraiseCurrencies**: *FundRaiseType[]*

* **investorCount**: *number*

* **isFinalized**: *boolean*

* **isPaused**: *boolean*

* **preIssueAllowed**: *boolean*

* **raisedAmount**: *BigNumber*

* **raisedFundsWallet**: *string*

* **securityTokenId**: *string*

* **securityTokenSymbol**: *string*

* **soldTokensAmount**: *BigNumber*

* **startDate**: *Date*

* **uid**: *string*

* **unsoldTokensWallet**: *string*

___

###  unpause

▸ **unpause**(): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[TogglePauseStoProcedureArgs](../interfaces/_types_index_.togglepausestoprocedureargs.md), void››*

*Defined in [src/entities/Sto.ts:260](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L260)*

Unpause the offering

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[TogglePauseStoProcedureArgs](../interfaces/_types_index_.togglepausestoprocedureargs.md), void››*

___

### `Static` unserialize

▸ **unserialize**(`serialized`: string): *[UniqueIdentifiers](../interfaces/_entities_sto_.uniqueidentifiers.md)*

*Defined in [src/entities/Sto.ts:184](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L184)*

Unserialize string to a Security Token Offering object representation

**Parameters:**

Name | Type |
------ | ------ |
`serialized` | string |

**Returns:** *[UniqueIdentifiers](../interfaces/_entities_sto_.uniqueidentifiers.md)*
