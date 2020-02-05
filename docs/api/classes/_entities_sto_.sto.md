# Class: Sto <**P**>

Abstract class used as a base to manage sto functionalities

## Type parameters

▪ **P**

## Hierarchy

- [Entity](_entities_entity_.entity.md)‹P›

  ↳ **Sto**

  ↳ [SimpleSto](_entities_simplesto_.simplesto.md)

  ↳ [TieredSto](_entities_tieredsto_.tieredsto.md)

## Index

### Constructors

- [constructor](_entities_sto_.sto.md#constructor)

### Properties

- [address](_entities_sto_.sto.md#address)
- [beneficialInvestmentsAllowed](_entities_sto_.sto.md#beneficialinvestmentsallowed)
- [capReached](_entities_sto_.sto.md#capreached)
- [context](_entities_sto_.sto.md#protected-context)
- [endDate](_entities_sto_.sto.md#enddate)
- [fundraiseCurrencies](_entities_sto_.sto.md#fundraisecurrencies)
- [investorCount](_entities_sto_.sto.md#investorcount)
- [isFinalized](_entities_sto_.sto.md#isfinalized)
- [isPaused](_entities_sto_.sto.md#ispaused)
- [preIssueAllowed](_entities_sto_.sto.md#preissueallowed)
- [raisedAmount](_entities_sto_.sto.md#raisedamount)
- [raisedFundsWallet](_entities_sto_.sto.md#raisedfundswallet)
- [securityTokenId](_entities_sto_.sto.md#securitytokenid)
- [securityTokenSymbol](_entities_sto_.sto.md#securitytokensymbol)
- [soldTokensAmount](_entities_sto_.sto.md#soldtokensamount)
- [startDate](_entities_sto_.sto.md#startdate)
- [stoType](_entities_sto_.sto.md#stotype)
- [uid](_entities_sto_.sto.md#abstract-uid)
- [unsoldTokensWallet](_entities_sto_.sto.md#unsoldtokenswallet)

### Methods

- [\_refresh](_entities_sto_.sto.md#_refresh)
- [allowBeneficialInvestments](_entities_sto_.sto.md#allowbeneficialinvestments)
- [allowPreIssuing](_entities_sto_.sto.md#allowpreissuing)
- [assignRole](_entities_sto_.sto.md#assignrole)
- [disallowBeneficialInvestments](_entities_sto_.sto.md#disallowbeneficialinvestments)
- [disallowPreIssuing](_entities_sto_.sto.md#disallowpreissuing)
- [finalize](_entities_sto_.sto.md#finalize)
- [pause](_entities_sto_.sto.md#pause)
- [revokeRole](_entities_sto_.sto.md#revokerole)
- [toPojo](_entities_sto_.sto.md#topojo)
- [unpause](_entities_sto_.sto.md#unpause)
- [unserialize](_entities_sto_.sto.md#static-unserialize)

## Constructors

### constructor

\+ **new Sto**(`params`: [Params](../interfaces/_entities_sto_.params.md) & [UniqueIdentifiers](../interfaces/_entities_sto_.uniqueidentifiers.md), `context`: [Context](_context_.context.md)): _[Sto](_entities_sto_.sto.md)_

_Defined in [src/entities/Sto.ts:195](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L195)_

Create a new sto instance

**Parameters:**

| Name      | Type                                                                                                                      |
| --------- | ------------------------------------------------------------------------------------------------------------------------- |
| `params`  | [Params](../interfaces/_entities_sto_.params.md) & [UniqueIdentifiers](../interfaces/_entities_sto_.uniqueidentifiers.md) |
| `context` | [Context](_context_.context.md)                                                                                           |

**Returns:** _[Sto](_entities_sto_.sto.md)_

## Properties

### address

• **address**: _string_

_Defined in [src/entities/Sto.ts:107](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L107)_

ethereum address for the STO

---

### beneficialInvestmentsAllowed

• **beneficialInvestmentsAllowed**: _boolean_

_Defined in [src/entities/Sto.ts:175](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L175)_

whether investments can be made on behalf of a beneficiary or not

---

### capReached

• **capReached**: _boolean_

_Defined in [src/entities/Sto.ts:160](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L160)_

whether the STO cap has been reached or not

---

### `Protected` context

• **context**: _[Context](_context_.context.md)_

_Defined in [src/entities/Sto.ts:177](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L177)_

---

### endDate

• **endDate**: _Date_

_Defined in [src/entities/Sto.ts:120](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L120)_

---

### fundraiseCurrencies

• **fundraiseCurrencies**: _Currency[]_

_Defined in [src/entities/Sto.ts:150](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L150)_

types of currency in which funds can be raised

---

### investorCount

• **investorCount**: _number_

_Defined in [src/entities/Sto.ts:145](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L145)_

number of investors that have purchased tokens in the STO

---

### isFinalized

• **isFinalized**: _boolean_

_Defined in [src/entities/Sto.ts:165](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L165)_

whether the STO has been finalized or not

---

### isPaused

• **isPaused**: _boolean_

_Defined in [src/entities/Sto.ts:155](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L155)_

whether the STO is currently paused or not

---

### preIssueAllowed

• **preIssueAllowed**: _boolean_

_Defined in [src/entities/Sto.ts:170](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L170)_

whether all tokens due to be sold are issued when the STO starts. If false, the appropriate amount of tokens is issued to the buyer whenever a sale is made

---

### raisedAmount

• **raisedAmount**: _BigNumber_

_Defined in [src/entities/Sto.ts:135](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L135)_

amount of funds that have been raised so far

---

### raisedFundsWallet

• **raisedFundsWallet**: _string_

_Defined in [src/entities/Sto.ts:125](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L125)_

wallet where raised funds will be forwarded to

---

### securityTokenId

• **securityTokenId**: _string_

_Defined in [src/entities/Sto.ts:111](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L111)_

---

### securityTokenSymbol

• **securityTokenSymbol**: _string_

_Defined in [src/entities/Sto.ts:109](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L109)_

---

### soldTokensAmount

• **soldTokensAmount**: _BigNumber_

_Defined in [src/entities/Sto.ts:140](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L140)_

total number of tokens that have been sold so far

---

### startDate

• **startDate**: _Date_

_Defined in [src/entities/Sto.ts:118](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L118)_

---

### stoType

• **stoType**: _[StoType](../enums/_types_index_.stotype.md)_

_Defined in [src/entities/Sto.ts:116](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L116)_

type of STO setup

---

### `Abstract` uid

• **uid**: _string_

_Overrides [Entity](_entities_entity_.entity.md).[uid](_entities_entity_.entity.md#abstract-uid)_

_Defined in [src/entities/Sto.ts:102](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L102)_

Uniquely generated id for the STO

---

### unsoldTokensWallet

• **unsoldTokensWallet**: _string_

_Defined in [src/entities/Sto.ts:130](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L130)_

wallet where unsold tokens will be returned to

## Methods

### \_refresh

▸ **\_refresh**(`params`: Partial‹[Params](../interfaces/_entities_sto_.params.md)›): _void_

_Overrides [Entity](_entities_entity_.entity.md).[\_refresh](_entities_entity_.entity.md#abstract-_refresh)_

_Defined in [src/entities/Sto.ts:438](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L438)_

Hydrate the entity

**Parameters:**

| Name     | Type                                                      |
| -------- | --------------------------------------------------------- |
| `params` | Partial‹[Params](../interfaces/_entities_sto_.params.md)› |

**Returns:** _void_

---

### allowBeneficialInvestments

▸ **allowBeneficialInvestments**(): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowBeneficialInvestmentsProcedureArgs](../interfaces/_types_index_.toggleallowbeneficialinvestmentsprocedureargs.md), void››_

_Defined in [src/entities/Sto.ts:316](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L316)_

Enable a party to invest in the STO on behalf of another party

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowBeneficialInvestmentsProcedureArgs](../interfaces/_types_index_.toggleallowbeneficialinvestmentsprocedureargs.md), void››_

---

### allowPreIssuing

▸ **allowPreIssuing**(): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowPreIssuingProcedureArgs](../interfaces/_types_index_.toggleallowpreissuingprocedureargs.md), void››_

_Defined in [src/entities/Sto.ts:287](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L287)_

Enable all offered tokens to be issued instantly at STO start (default behavior is to issue on purchase)
Can be disabled _BEFORE_ the STO starts by calling disallowPreIssuing

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowPreIssuingProcedureArgs](../interfaces/_types_index_.toggleallowpreissuingprocedureargs.md), void››_

---

### assignRole

▸ **assignRole**(`args`: object): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[AssignStoRoleProcedureArgs](../interfaces/_types_index_.assignstoroleprocedureargs.md), void››_

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

_Defined in [src/entities/Sto.ts:330](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L330)_

Disable the possibility for a party to invest in the STO on behalf of another party

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowBeneficialInvestmentsProcedureArgs](../interfaces/_types_index_.toggleallowbeneficialinvestmentsprocedureargs.md), void››_

---

### disallowPreIssuing

▸ **disallowPreIssuing**(): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowPreIssuingProcedureArgs](../interfaces/_types_index_.toggleallowpreissuingprocedureargs.md), void››_

_Defined in [src/entities/Sto.ts:302](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L302)_

Disable pre-issuing of offered tokens at STO start (goes back to default behavior, which is to issue on purchase)
Can be re-enabled _BEFORE_ the STO starts by calling allowPreIssuing

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleAllowPreIssuingProcedureArgs](../interfaces/_types_index_.toggleallowpreissuingprocedureargs.md), void››_

---

### finalize

▸ **finalize**(): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[FinalizeStoProcedureArgs](../interfaces/_types_index_.finalizestoprocedureargs.md), void››_

_Defined in [src/entities/Sto.ts:275](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L275)_

Finalize the offering. The offering's treasury wallet (or the Security Token's treasury wallet if one was not specified for the offering)
will receive the remaining unsold tokens. Throws an error if there are transfer restrictions which do not permit the wallet to receive that amount of tokens

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[FinalizeStoProcedureArgs](../interfaces/_types_index_.finalizestoprocedureargs.md), void››_

---

### pause

▸ **pause**(): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[TogglePauseStoProcedureArgs](../interfaces/_types_index_.togglepausestoprocedureargs.md), void››_

_Defined in [src/entities/Sto.ts:246](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L246)_

Pause the offering

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[TogglePauseStoProcedureArgs](../interfaces/_types_index_.togglepausestoprocedureargs.md), void››_

---

### revokeRole

▸ **revokeRole**(`args`: object): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[AssignStoRoleProcedureArgs](../interfaces/_types_index_.assignstoroleprocedureargs.md), void››_

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

_Overrides [Entity](_entities_entity_.entity.md).[toPojo](_entities_entity_.entity.md#abstract-topojo)_

_Defined in [src/entities/Sto.ts:393](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L393)_

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** _object_

- **address**: _string_

- **beneficialInvestmentsAllowed**: _boolean_

- **capReached**: _boolean_

- **endDate**: _Date_

- **fundraiseCurrencies**: _FundRaiseType[]_

- **investorCount**: _number_

- **isFinalized**: _boolean_

- **isPaused**: _boolean_

- **preIssueAllowed**: _boolean_

- **raisedAmount**: _BigNumber_

- **raisedFundsWallet**: _string_

- **securityTokenId**: _string_

- **securityTokenSymbol**: _string_

- **soldTokensAmount**: _BigNumber_

- **startDate**: _Date_

- **uid**: _string_

- **unsoldTokensWallet**: _string_

---

### unpause

▸ **unpause**(): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[TogglePauseStoProcedureArgs](../interfaces/_types_index_.togglepausestoprocedureargs.md), void››_

_Defined in [src/entities/Sto.ts:260](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L260)_

Unpause the offering

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[TogglePauseStoProcedureArgs](../interfaces/_types_index_.togglepausestoprocedureargs.md), void››_

---

### `Static` unserialize

▸ **unserialize**(`serialized`: string): _[UniqueIdentifiers](../interfaces/_entities_sto_.uniqueidentifiers.md)_

_Defined in [src/entities/Sto.ts:184](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L184)_

Unserialize string to a Security Token Offering object representation

**Parameters:**

| Name         | Type   |
| ------------ | ------ |
| `serialized` | string |

**Returns:** _[UniqueIdentifiers](../interfaces/_entities_sto_.uniqueidentifiers.md)_
