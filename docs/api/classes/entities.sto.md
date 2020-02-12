# Class: Sto <**P**>

Abstract class used as a base to manage sto functionalities

## Type parameters

▪ **P**

## Hierarchy

* [Entity](entities.entity.md)‹P›

  ↳ **Sto**

  ↳ [SimpleSto](entities.simplesto.md)

  ↳ [TieredSto](entities.tieredsto.md)

## Index

### Constructors

* [constructor](entities.sto.md#constructor)

### Properties

* [address](entities.sto.md#address)
* [beneficialInvestmentsAllowed](entities.sto.md#beneficialinvestmentsallowed)
* [capReached](entities.sto.md#capreached)
* [context](entities.sto.md#protected-context)
* [endDate](entities.sto.md#enddate)
* [fundraiseCurrencies](entities.sto.md#fundraisecurrencies)
* [investorCount](entities.sto.md#investorcount)
* [isFinalized](entities.sto.md#isfinalized)
* [isPaused](entities.sto.md#ispaused)
* [preIssueAllowed](entities.sto.md#preissueallowed)
* [raisedAmount](entities.sto.md#raisedamount)
* [raisedFundsWallet](entities.sto.md#raisedfundswallet)
* [securityTokenId](entities.sto.md#securitytokenid)
* [securityTokenSymbol](entities.sto.md#securitytokensymbol)
* [soldTokensAmount](entities.sto.md#soldtokensamount)
* [startDate](entities.sto.md#startdate)
* [stoType](entities.sto.md#stotype)
* [uid](entities.sto.md#abstract-uid)
* [unsoldTokensWallet](entities.sto.md#unsoldtokenswallet)

### Methods

* [_refresh](entities.sto.md#_refresh)
* [allowBeneficialInvestments](entities.sto.md#allowbeneficialinvestments)
* [allowPreIssuing](entities.sto.md#allowpreissuing)
* [assignRole](entities.sto.md#assignrole)
* [disallowBeneficialInvestments](entities.sto.md#disallowbeneficialinvestments)
* [disallowPreIssuing](entities.sto.md#disallowpreissuing)
* [finalize](entities.sto.md#finalize)
* [pause](entities.sto.md#pause)
* [revokeRole](entities.sto.md#revokerole)
* [toPojo](entities.sto.md#topojo)
* [unpause](entities.sto.md#unpause)
* [unserialize](entities.sto.md#static-unserialize)

## Constructors

###  constructor

\+ **new Sto**(`params`: [Params](../interfaces/entities.params-4.md) & [UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-6.md), `context`: [Context](_context_.context.md)): *[Sto](entities.sto.md)*

*Defined in [src/entities/Sto.ts:200](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Sto.ts#L200)*

Create a new sto instance

**Parameters:**

Name | Type |
------ | ------ |
`params` | [Params](../interfaces/entities.params-4.md) & [UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-6.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[Sto](entities.sto.md)*

## Properties

###  address

• **address**: *string*

*Defined in [src/entities/Sto.ts:112](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Sto.ts#L112)*

ethereum address for the STO

___

###  beneficialInvestmentsAllowed

• **beneficialInvestmentsAllowed**: *boolean*

*Defined in [src/entities/Sto.ts:180](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Sto.ts#L180)*

whether investments can be made on behalf of a beneficiary or not

___

###  capReached

• **capReached**: *boolean*

*Defined in [src/entities/Sto.ts:165](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Sto.ts#L165)*

whether the STO cap has been reached or not

___

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Defined in [src/entities/Sto.ts:182](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Sto.ts#L182)*

___

###  endDate

• **endDate**: *Date*

*Defined in [src/entities/Sto.ts:125](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Sto.ts#L125)*

___

###  fundraiseCurrencies

• **fundraiseCurrencies**: *Currency[]*

*Defined in [src/entities/Sto.ts:155](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Sto.ts#L155)*

types of currency in which funds can be raised

___

###  investorCount

• **investorCount**: *number*

*Defined in [src/entities/Sto.ts:150](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Sto.ts#L150)*

number of investors that have purchased tokens in the STO

___

###  isFinalized

• **isFinalized**: *boolean*

*Defined in [src/entities/Sto.ts:170](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Sto.ts#L170)*

whether the STO has been finalized or not

___

###  isPaused

• **isPaused**: *boolean*

*Defined in [src/entities/Sto.ts:160](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Sto.ts#L160)*

whether the STO is currently paused or not

___

###  preIssueAllowed

• **preIssueAllowed**: *boolean*

*Defined in [src/entities/Sto.ts:175](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Sto.ts#L175)*

whether all tokens due to be sold are issued when the STO starts. If false, the appropriate amount of tokens is issued to the buyer whenever a sale is made

___

###  raisedAmount

• **raisedAmount**: *BigNumber*

*Defined in [src/entities/Sto.ts:140](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Sto.ts#L140)*

amount of funds that have been raised so far

___

###  raisedFundsWallet

• **raisedFundsWallet**: *string*

*Defined in [src/entities/Sto.ts:130](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Sto.ts#L130)*

wallet where raised funds will be forwarded to

___

###  securityTokenId

• **securityTokenId**: *string*

*Defined in [src/entities/Sto.ts:116](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Sto.ts#L116)*

___

###  securityTokenSymbol

• **securityTokenSymbol**: *string*

*Defined in [src/entities/Sto.ts:114](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Sto.ts#L114)*

___

###  soldTokensAmount

• **soldTokensAmount**: *BigNumber*

*Defined in [src/entities/Sto.ts:145](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Sto.ts#L145)*

total number of tokens that have been sold so far

___

###  startDate

• **startDate**: *Date*

*Defined in [src/entities/Sto.ts:123](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Sto.ts#L123)*

___

###  stoType

• **stoType**: *StoType*

*Defined in [src/entities/Sto.ts:121](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Sto.ts#L121)*

type of STO setup

___

### `Abstract` uid

• **uid**: *string*

*Overrides [Entity](entities.entity.md).[uid](entities.entity.md#abstract-uid)*

*Defined in [src/entities/Sto.ts:107](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Sto.ts#L107)*

Uniquely generated id for the STO

___

###  unsoldTokensWallet

• **unsoldTokensWallet**: *string*

*Defined in [src/entities/Sto.ts:135](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Sto.ts#L135)*

wallet where unsold tokens will be returned to

## Methods

###  _refresh

▸ **_refresh**(`params`: Partial‹[Params](../interfaces/entities.params-4.md)›): *void*

*Overrides [Entity](entities.entity.md).[_refresh](entities.entity.md#abstract-_refresh)*

*Defined in [src/entities/Sto.ts:443](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Sto.ts#L443)*

Hydrate the entity

**Parameters:**

Name | Type |
------ | ------ |
`params` | Partial‹[Params](../interfaces/entities.params-4.md)› |

**Returns:** *void*

___

###  allowBeneficialInvestments

▸ **allowBeneficialInvestments**(): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹ToggleAllowBeneficialInvestmentsProcedureArgs, void››*

*Defined in [src/entities/Sto.ts:321](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Sto.ts#L321)*

Enable a party to invest in the STO on behalf of another party

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹ToggleAllowBeneficialInvestmentsProcedureArgs, void››*

___

###  allowPreIssuing

▸ **allowPreIssuing**(): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹ToggleAllowPreIssuingProcedureArgs, void››*

*Defined in [src/entities/Sto.ts:292](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Sto.ts#L292)*

Enable all offered tokens to be issued instantly at STO start (default behavior is to issue on purchase)
Can be disabled *BEFORE* the STO starts by calling disallowPreIssuing

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹ToggleAllowPreIssuingProcedureArgs, void››*

___

###  assignRole

▸ **assignRole**(`args`: object): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹AssignStoRoleProcedureArgs, void››*

*Defined in [src/entities/Sto.ts:353](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Sto.ts#L353)*

Assign a role on the STO to a delegate

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹AssignStoRoleProcedureArgs, void››*

___

###  disallowBeneficialInvestments

▸ **disallowBeneficialInvestments**(): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹ToggleAllowBeneficialInvestmentsProcedureArgs, void››*

*Defined in [src/entities/Sto.ts:335](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Sto.ts#L335)*

Disable the possibility for a party to invest in the STO on behalf of another party

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹ToggleAllowBeneficialInvestmentsProcedureArgs, void››*

___

###  disallowPreIssuing

▸ **disallowPreIssuing**(): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹ToggleAllowPreIssuingProcedureArgs, void››*

*Defined in [src/entities/Sto.ts:307](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Sto.ts#L307)*

Disable pre-issuing of offered tokens at STO start (goes back to default behavior, which is to issue on purchase)
Can be re-enabled *BEFORE* the STO starts by calling allowPreIssuing

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹ToggleAllowPreIssuingProcedureArgs, void››*

___

###  finalize

▸ **finalize**(): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹FinalizeStoProcedureArgs, void››*

*Defined in [src/entities/Sto.ts:280](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Sto.ts#L280)*

Finalize the offering. The offering's treasury wallet (or the Security Token's treasury wallet if one was not specified for the offering)
will receive the remaining unsold tokens. Throws an error if there are transfer restrictions which do not permit the wallet to receive that amount of tokens

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹FinalizeStoProcedureArgs, void››*

___

###  pause

▸ **pause**(): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹TogglePauseStoProcedureArgs, void››*

*Defined in [src/entities/Sto.ts:251](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Sto.ts#L251)*

Pause the offering

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹TogglePauseStoProcedureArgs, void››*

___

###  revokeRole

▸ **revokeRole**(`args`: object): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹AssignStoRoleProcedureArgs, void››*

*Defined in [src/entities/Sto.ts:379](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Sto.ts#L379)*

Remove a role from a delegate

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹AssignStoRoleProcedureArgs, void››*

___

###  toPojo

▸ **toPojo**(): *object*

*Overrides [Entity](entities.entity.md).[toPojo](entities.entity.md#abstract-topojo)*

*Defined in [src/entities/Sto.ts:398](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Sto.ts#L398)*

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** *object*

___

###  unpause

▸ **unpause**(): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹TogglePauseStoProcedureArgs, void››*

*Defined in [src/entities/Sto.ts:265](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Sto.ts#L265)*

Unpause the offering

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹TogglePauseStoProcedureArgs, void››*

___

### `Static` unserialize

▸ **unserialize**(`serialized`: string): *[UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-6.md)*

*Defined in [src/entities/Sto.ts:189](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Sto.ts#L189)*

Unserialize string to a Security Token Offering object representation

**Parameters:**

Name | Type |
------ | ------ |
`serialized` | string |

**Returns:** *[UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-6.md)*
