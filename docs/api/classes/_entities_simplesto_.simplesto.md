# Class: SimpleSto

Class used to manage a simple sto

## Hierarchy

↳ [Sto](_entities_sto_.sto.md)‹[Params](../interfaces/_entities_simplesto_.params.md)›

↳ **SimpleSto**

## Index

### Constructors

- [constructor](_entities_simplesto_.simplesto.md#constructor)

### Properties

- [address](_entities_simplesto_.simplesto.md#address)
- [beneficialInvestmentsAllowed](_entities_simplesto_.simplesto.md#beneficialinvestmentsallowed)
- [cap](_entities_simplesto_.simplesto.md#cap)
- [capReached](_entities_simplesto_.simplesto.md#capreached)
- [context](_entities_simplesto_.simplesto.md#protected-context)
- [endDate](_entities_simplesto_.simplesto.md#enddate)
- [fundraiseCurrencies](_entities_simplesto_.simplesto.md#fundraisecurrencies)
- [investorCount](_entities_simplesto_.simplesto.md#investorcount)
- [isFinalized](_entities_simplesto_.simplesto.md#isfinalized)
- [isPaused](_entities_simplesto_.simplesto.md#ispaused)
- [preIssueAllowed](_entities_simplesto_.simplesto.md#preissueallowed)
- [raisedAmount](_entities_simplesto_.simplesto.md#raisedamount)
- [raisedFundsWallet](_entities_simplesto_.simplesto.md#raisedfundswallet)
- [rate](_entities_simplesto_.simplesto.md#rate)
- [securityTokenId](_entities_simplesto_.simplesto.md#securitytokenid)
- [securityTokenSymbol](_entities_simplesto_.simplesto.md#securitytokensymbol)
- [soldTokensAmount](_entities_simplesto_.simplesto.md#soldtokensamount)
- [startDate](_entities_simplesto_.simplesto.md#startdate)
- [stoType](_entities_simplesto_.simplesto.md#stotype)
- [uid](_entities_simplesto_.simplesto.md#uid)
- [unsoldTokensWallet](_entities_simplesto_.simplesto.md#unsoldtokenswallet)

### Methods

- [\_refresh](_entities_simplesto_.simplesto.md#_refresh)
- [allowBeneficialInvestments](_entities_simplesto_.simplesto.md#allowbeneficialinvestments)
- [allowPreIssuing](_entities_simplesto_.simplesto.md#allowpreissuing)
- [assignRole](_entities_simplesto_.simplesto.md#assignrole)
- [disallowBeneficialInvestments](_entities_simplesto_.simplesto.md#disallowbeneficialinvestments)
- [disallowPreIssuing](_entities_simplesto_.simplesto.md#disallowpreissuing)
- [finalize](_entities_simplesto_.simplesto.md#finalize)
- [getInvestments](_entities_simplesto_.simplesto.md#getinvestments)
- [invest](_entities_simplesto_.simplesto.md#invest)
- [pause](_entities_simplesto_.simplesto.md#pause)
- [revokeRole](_entities_simplesto_.simplesto.md#revokerole)
- [toPojo](_entities_simplesto_.simplesto.md#topojo)
- [unpause](_entities_simplesto_.simplesto.md#unpause)
- [generateId](_entities_simplesto_.simplesto.md#static-generateid)
- [unserialize](_entities_simplesto_.simplesto.md#static-unserialize)

## Constructors

### constructor

\+ **new SimpleSto**(`params`: [Params](../interfaces/_entities_simplesto_.params.md) & [UniqueIdentifiers](../interfaces/_entities_sto_.uniqueidentifiers.md), `context`: [Context](_context_.context.md)): _[SimpleSto](_entities_simplesto_.simplesto.md)_

_Overrides [Sto](_entities_sto_.sto.md).[constructor](_entities_sto_.sto.md#constructor)_

_Defined in [src/entities/SimpleSto.ts:61](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/SimpleSto.ts#L61)_

Create a new simple sto instance

**Parameters:**

| Name      | Type                                                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `params`  | [Params](../interfaces/_entities_simplesto_.params.md) & [UniqueIdentifiers](../interfaces/_entities_sto_.uniqueidentifiers.md) |
| `context` | [Context](_context_.context.md)                                                                                                 |

**Returns:** _[SimpleSto](_entities_simplesto_.simplesto.md)_

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

### cap

• **cap**: _BigNumber_

_Defined in [src/entities/SimpleSto.ts:56](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/SimpleSto.ts#L56)_

cap of total tokens that can be sold in sto

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

### rate

• **rate**: _BigNumber_

_Defined in [src/entities/SimpleSto.ts:61](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/SimpleSto.ts#L61)_

rate at which the tokens will be sold in sto

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

### uid

• **uid**: _string_

_Overrides [Sto](_entities_sto_.sto.md).[uid](_entities_sto_.sto.md#abstract-uid)_

_Defined in [src/entities/SimpleSto.ts:51](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/SimpleSto.ts#L51)_

unique generated Tiered STO id

---

### unsoldTokensWallet

• **unsoldTokensWallet**: _string_

_Inherited from [Sto](_entities_sto_.sto.md).[unsoldTokensWallet](_entities_sto_.sto.md#unsoldtokenswallet)_

_Defined in [src/entities/Sto.ts:130](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L130)_

wallet where unsold tokens will be returned to

## Methods

### \_refresh

▸ **\_refresh**(`params`: Partial‹[Params](../interfaces/_entities_simplesto_.params.md)›): _void_

_Overrides [Sto](_entities_sto_.sto.md).[\_refresh](_entities_sto_.sto.md#_refresh)_

_Defined in [src/entities/SimpleSto.ts:151](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/SimpleSto.ts#L151)_

Hydrate the entity

**Parameters:**

| Name     | Type                                                            |
| -------- | --------------------------------------------------------------- |
| `params` | Partial‹[Params](../interfaces/_entities_simplesto_.params.md)› |

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

### getInvestments

▸ **getInvestments**(): _Promise‹[Investment](_entities_investment_.investment.md)[]›_

_Defined in [src/entities/SimpleSto.ts:81](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/SimpleSto.ts#L81)_

Retrieve all investments that have been made on this STO

**Returns:** _Promise‹[Investment](_entities_investment_.investment.md)[]›_

---

### invest

▸ **invest**(`args`: object): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[InvestInSimpleStoProcedureArgs](../interfaces/_types_index_.investinsimplestoprocedureargs.md), void››_

_Defined in [src/entities/SimpleSto.ts:126](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/SimpleSto.ts#L126)_

Invest in the STO

**Parameters:**

▪ **args**: _object_

| Name           | Type                    | Description                                                                                                                                                                              |
| -------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `amount`       | BigNumber               | amount to spend                                                                                                                                                                          |
| `beneficiary?` | undefined &#124; string | address that will receive the purchased tokens (defaults to current wallet, will fail if beneficial investments are not allowed for the STO, only applicable if the STO currency is ETH) |

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[InvestInSimpleStoProcedureArgs](../interfaces/_types_index_.investinsimplestoprocedureargs.md), void››_

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

_Defined in [src/entities/SimpleSto.ts:137](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/SimpleSto.ts#L137)_

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** _object_

- **cap**: _BigNumber_

- **rate**: _BigNumber_

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

_Defined in [src/entities/SimpleSto.ts:40](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/SimpleSto.ts#L40)_

Generate the Simple STO's UUID from its identifying properties

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
