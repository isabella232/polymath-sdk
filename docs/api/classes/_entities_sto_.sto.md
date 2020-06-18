# Sto

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

* [\_refresh](_entities_sto_.sto.md#_refresh)
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

### constructor

+ **new Sto**\(`params`: [Params](../interfaces/_entities_sto_.params.md) & [UniqueIdentifiers](../interfaces/_entities_sto_.uniqueidentifiers.md), `context`: [Context](_context_.context.md)\): [_Sto_](_entities_sto_.sto.md)

_Defined in_ [_src/entities/Sto.ts:195_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L195)

Create a new sto instance

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | [Params](../interfaces/_entities_sto_.params.md) & [UniqueIdentifiers](../interfaces/_entities_sto_.uniqueidentifiers.md) |
| `context` | [Context](_context_.context.md) |

**Returns:** [_Sto_](_entities_sto_.sto.md)

## Properties

### address

• **address**: _string_

_Defined in_ [_src/entities/Sto.ts:107_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L107)

ethereum address for the STO

### beneficialInvestmentsAllowed

• **beneficialInvestmentsAllowed**: _boolean_

_Defined in_ [_src/entities/Sto.ts:175_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L175)

whether investments can be made on behalf of a beneficiary or not

### capReached

• **capReached**: _boolean_

_Defined in_ [_src/entities/Sto.ts:160_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L160)

whether the STO cap has been reached or not

### `Protected` context

• **context**: [_Context_](_context_.context.md)

_Defined in_ [_src/entities/Sto.ts:177_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L177)

### endDate

• **endDate**: _Date_

_Defined in_ [_src/entities/Sto.ts:120_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L120)

### fundraiseCurrencies

• **fundraiseCurrencies**: _Currency\[\]_

_Defined in_ [_src/entities/Sto.ts:150_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L150)

types of currency in which funds can be raised

### investorCount

• **investorCount**: _number_

_Defined in_ [_src/entities/Sto.ts:145_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L145)

number of investors that have purchased tokens in the STO

### isFinalized

• **isFinalized**: _boolean_

_Defined in_ [_src/entities/Sto.ts:165_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L165)

whether the STO has been finalized or not

### isPaused

• **isPaused**: _boolean_

_Defined in_ [_src/entities/Sto.ts:155_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L155)

whether the STO is currently paused or not

### preIssueAllowed

• **preIssueAllowed**: _boolean_

_Defined in_ [_src/entities/Sto.ts:170_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L170)

whether all tokens due to be sold are issued when the STO starts. If false, the appropriate amount of tokens is issued to the buyer whenever a sale is made

### raisedAmount

• **raisedAmount**: _BigNumber_

_Defined in_ [_src/entities/Sto.ts:135_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L135)

amount of funds that have been raised so far

### raisedFundsWallet

• **raisedFundsWallet**: _string_

_Defined in_ [_src/entities/Sto.ts:125_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L125)

wallet where raised funds will be forwarded to

### securityTokenId

• **securityTokenId**: _string_

_Defined in_ [_src/entities/Sto.ts:111_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L111)

### securityTokenSymbol

• **securityTokenSymbol**: _string_

_Defined in_ [_src/entities/Sto.ts:109_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L109)

### soldTokensAmount

• **soldTokensAmount**: _BigNumber_

_Defined in_ [_src/entities/Sto.ts:140_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L140)

total number of tokens that have been sold so far

### startDate

• **startDate**: _Date_

_Defined in_ [_src/entities/Sto.ts:118_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L118)

### stoType

• **stoType**: [_StoType_](../enums/_types_index_.stotype.md)

_Defined in_ [_src/entities/Sto.ts:116_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L116)

type of STO setup

### `Abstract` uid

• **uid**: _string_

_Overrides_ [_Entity_](_entities_entity_.entity.md)_._[_uid_](_entities_entity_.entity.md#abstract-uid)

_Defined in_ [_src/entities/Sto.ts:102_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L102)

Uniquely generated id for the STO

### unsoldTokensWallet

• **unsoldTokensWallet**: _string_

_Defined in_ [_src/entities/Sto.ts:130_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L130)

wallet where unsold tokens will be returned to

## Methods

### \_refresh

▸ **\_refresh**\(`params`: Partial‹[Params](../interfaces/_entities_sto_.params.md)›\): _void_

_Overrides_ [_Entity_](_entities_entity_.entity.md)_._[_\_refresh_](_entities_entity_.entity.md#abstract-_refresh)

_Defined in_ [_src/entities/Sto.ts:438_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L438)

Hydrate the entity

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | Partial‹[Params](../interfaces/_entities_sto_.params.md)› |

**Returns:** _void_

### allowBeneficialInvestments

▸ **allowBeneficialInvestments**\(\): _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_ToggleAllowBeneficialInvestmentsProcedureArgs_](../interfaces/_types_index_.toggleallowbeneficialinvestmentsprocedureargs.md)_, void››_

_Defined in_ [_src/entities/Sto.ts:316_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L316)

Enable a party to invest in the STO on behalf of another party

**Returns:** _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_ToggleAllowBeneficialInvestmentsProcedureArgs_](../interfaces/_types_index_.toggleallowbeneficialinvestmentsprocedureargs.md)_, void››_

### allowPreIssuing

▸ **allowPreIssuing**\(\): _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_ToggleAllowPreIssuingProcedureArgs_](../interfaces/_types_index_.toggleallowpreissuingprocedureargs.md)_, void››_

_Defined in_ [_src/entities/Sto.ts:287_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L287)

Enable all offered tokens to be issued instantly at STO start \(default behavior is to issue on purchase\) Can be disabled _BEFORE_ the STO starts by calling disallowPreIssuing

**Returns:** _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_ToggleAllowPreIssuingProcedureArgs_](../interfaces/_types_index_.toggleallowpreissuingprocedureargs.md)_, void››_

### assignRole

▸ **assignRole**\(`args`: object\): _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_AssignStoRoleProcedureArgs_](../interfaces/_types_index_.assignstoroleprocedureargs.md)_, void››_

_Defined in_ [_src/entities/Sto.ts:348_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L348)

Assign a role on the STO to a delegate

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `delegateAddress` | string |
| `description?` | undefined \| string |
| `role` | [StoRole](../enums/_types_index_.storole.md) |

**Returns:** _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_AssignStoRoleProcedureArgs_](../interfaces/_types_index_.assignstoroleprocedureargs.md)_, void››_

### disallowBeneficialInvestments

▸ **disallowBeneficialInvestments**\(\): _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_ToggleAllowBeneficialInvestmentsProcedureArgs_](../interfaces/_types_index_.toggleallowbeneficialinvestmentsprocedureargs.md)_, void››_

_Defined in_ [_src/entities/Sto.ts:330_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L330)

Disable the possibility for a party to invest in the STO on behalf of another party

**Returns:** _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_ToggleAllowBeneficialInvestmentsProcedureArgs_](../interfaces/_types_index_.toggleallowbeneficialinvestmentsprocedureargs.md)_, void››_

### disallowPreIssuing

▸ **disallowPreIssuing**\(\): _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_ToggleAllowPreIssuingProcedureArgs_](../interfaces/_types_index_.toggleallowpreissuingprocedureargs.md)_, void››_

_Defined in_ [_src/entities/Sto.ts:302_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L302)

Disable pre-issuing of offered tokens at STO start \(goes back to default behavior, which is to issue on purchase\) Can be re-enabled _BEFORE_ the STO starts by calling allowPreIssuing

**Returns:** _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_ToggleAllowPreIssuingProcedureArgs_](../interfaces/_types_index_.toggleallowpreissuingprocedureargs.md)_, void››_

### finalize

▸ **finalize**\(\): _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_FinalizeStoProcedureArgs_](../interfaces/_types_index_.finalizestoprocedureargs.md)_, void››_

_Defined in_ [_src/entities/Sto.ts:275_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L275)

Finalize the offering. The offering's treasury wallet \(or the Security Token's treasury wallet if one was not specified for the offering\) will receive the remaining unsold tokens. Throws an error if there are transfer restrictions which do not permit the wallet to receive that amount of tokens

**Returns:** _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_FinalizeStoProcedureArgs_](../interfaces/_types_index_.finalizestoprocedureargs.md)_, void››_

### pause

▸ **pause**\(\): _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_TogglePauseStoProcedureArgs_](../interfaces/_types_index_.togglepausestoprocedureargs.md)_, void››_

_Defined in_ [_src/entities/Sto.ts:246_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L246)

Pause the offering

**Returns:** _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_TogglePauseStoProcedureArgs_](../interfaces/_types_index_.togglepausestoprocedureargs.md)_, void››_

### revokeRole

▸ **revokeRole**\(`args`: object\): _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_AssignStoRoleProcedureArgs_](../interfaces/_types_index_.assignstoroleprocedureargs.md)_, void››_

_Defined in_ [_src/entities/Sto.ts:374_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L374)

Remove a role from a delegate

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `delegateAddress` | string |
| `role` | [StoRole](../enums/_types_index_.storole.md) |

**Returns:** _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_AssignStoRoleProcedureArgs_](../interfaces/_types_index_.assignstoroleprocedureargs.md)_, void››_

### toPojo

▸ **toPojo**\(\): _object_

_Overrides_ [_Entity_](_entities_entity_.entity.md)_._[_toPojo_](_entities_entity_.entity.md#abstract-topojo)

_Defined in_ [_src/entities/Sto.ts:393_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L393)

Convert entity to a POJO \(Plain Old Javascript Object\)

**Returns:** _object_

* **address**: _string_
* **beneficialInvestmentsAllowed**: _boolean_
* **capReached**: _boolean_
* **endDate**: _Date_
* **fundraiseCurrencies**: _FundRaiseType\[\]_
* **investorCount**: _number_
* **isFinalized**: _boolean_
* **isPaused**: _boolean_
* **preIssueAllowed**: _boolean_
* **raisedAmount**: _BigNumber_
* **raisedFundsWallet**: _string_
* **securityTokenId**: _string_
* **securityTokenSymbol**: _string_
* **soldTokensAmount**: _BigNumber_
* **startDate**: _Date_
* **uid**: _string_
* **unsoldTokensWallet**: _string_

### unpause

▸ **unpause**\(\): _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_TogglePauseStoProcedureArgs_](../interfaces/_types_index_.togglepausestoprocedureargs.md)_, void››_

_Defined in_ [_src/entities/Sto.ts:260_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L260)

Unpause the offering

**Returns:** _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_TogglePauseStoProcedureArgs_](../interfaces/_types_index_.togglepausestoprocedureargs.md)_, void››_

### `Static` unserialize

▸ **unserialize**\(`serialized`: string\): [_UniqueIdentifiers_](../interfaces/_entities_sto_.uniqueidentifiers.md)

_Defined in_ [_src/entities/Sto.ts:184_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L184)

Unserialize string to a Security Token Offering object representation

**Parameters:**

| Name | Type |
| :--- | :--- |
| `serialized` | string |

**Returns:** [_UniqueIdentifiers_](../interfaces/_entities_sto_.uniqueidentifiers.md)

