# Class: SimpleSto

Class used to manage a simple sto

## Hierarchy

  ↳ [Sto](entities.sto.md)‹[Params](../interfaces/entities.params-9.md)›

  ↳ **SimpleSto**

## Index

### Constructors

* [constructor](entities.simplesto.md#constructor)

### Properties

* [address](entities.simplesto.md#address)
* [beneficialInvestmentsAllowed](entities.simplesto.md#beneficialinvestmentsallowed)
* [cap](entities.simplesto.md#cap)
* [capReached](entities.simplesto.md#capreached)
* [context](entities.simplesto.md#protected-context)
* [endDate](entities.simplesto.md#enddate)
* [fundraiseCurrencies](entities.simplesto.md#fundraisecurrencies)
* [investorCount](entities.simplesto.md#investorcount)
* [isFinalized](entities.simplesto.md#isfinalized)
* [isPaused](entities.simplesto.md#ispaused)
* [preIssueAllowed](entities.simplesto.md#preissueallowed)
* [raisedAmount](entities.simplesto.md#raisedamount)
* [raisedFundsWallet](entities.simplesto.md#raisedfundswallet)
* [rate](entities.simplesto.md#rate)
* [securityTokenId](entities.simplesto.md#securitytokenid)
* [securityTokenSymbol](entities.simplesto.md#securitytokensymbol)
* [soldTokensAmount](entities.simplesto.md#soldtokensamount)
* [startDate](entities.simplesto.md#startdate)
* [stoType](entities.simplesto.md#stotype)
* [uid](entities.simplesto.md#uid)
* [unsoldTokensWallet](entities.simplesto.md#unsoldtokenswallet)

### Methods

* [_refresh](entities.simplesto.md#_refresh)
* [allowBeneficialInvestments](entities.simplesto.md#allowbeneficialinvestments)
* [allowPreIssuing](entities.simplesto.md#allowpreissuing)
* [assignRole](entities.simplesto.md#assignrole)
* [disallowBeneficialInvestments](entities.simplesto.md#disallowbeneficialinvestments)
* [disallowPreIssuing](entities.simplesto.md#disallowpreissuing)
* [finalize](entities.simplesto.md#finalize)
* [getInvestments](entities.simplesto.md#getinvestments)
* [invest](entities.simplesto.md#invest)
* [pause](entities.simplesto.md#pause)
* [revokeRole](entities.simplesto.md#revokerole)
* [toPojo](entities.simplesto.md#topojo)
* [unpause](entities.simplesto.md#unpause)
* [generateId](entities.simplesto.md#static-generateid)
* [unserialize](entities.simplesto.md#static-unserialize)

## Constructors

###  constructor

\+ **new SimpleSto**(`params`: [Params](../interfaces/entities.params-9.md) & [UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-6.md), `context`: [Context](_context_.context.md)): *[SimpleSto](entities.simplesto.md)*

*Overrides [Sto](entities.sto.md).[constructor](entities.sto.md#constructor)*

*Defined in [src/entities/SimpleSto.ts:66](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SimpleSto.ts#L66)*

Create a new simple sto instance

**Parameters:**

Name | Type |
------ | ------ |
`params` | [Params](../interfaces/entities.params-9.md) & [UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-6.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[SimpleSto](entities.simplesto.md)*

## Properties

###  address

• **address**: *string*

*Inherited from [Sto](entities.sto.md).[address](entities.sto.md#address)*

*Defined in [src/entities/Sto.ts:112](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L112)*

ethereum address for the STO

___

###  beneficialInvestmentsAllowed

• **beneficialInvestmentsAllowed**: *boolean*

*Inherited from [Sto](entities.sto.md).[beneficialInvestmentsAllowed](entities.sto.md#beneficialinvestmentsallowed)*

*Defined in [src/entities/Sto.ts:180](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L180)*

whether investments can be made on behalf of a beneficiary or not

___

###  cap

• **cap**: *BigNumber*

*Defined in [src/entities/SimpleSto.ts:61](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SimpleSto.ts#L61)*

cap of total tokens that can be sold in sto

___

###  capReached

• **capReached**: *boolean*

*Inherited from [Sto](entities.sto.md).[capReached](entities.sto.md#capreached)*

*Defined in [src/entities/Sto.ts:165](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L165)*

whether the STO cap has been reached or not

___

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from [Sto](entities.sto.md).[context](entities.sto.md#protected-context)*

*Defined in [src/entities/Sto.ts:182](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L182)*

___

###  endDate

• **endDate**: *Date*

*Inherited from [Sto](entities.sto.md).[endDate](entities.sto.md#enddate)*

*Defined in [src/entities/Sto.ts:125](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L125)*

___

###  fundraiseCurrencies

• **fundraiseCurrencies**: *Currency[]*

*Inherited from [Sto](entities.sto.md).[fundraiseCurrencies](entities.sto.md#fundraisecurrencies)*

*Defined in [src/entities/Sto.ts:155](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L155)*

types of currency in which funds can be raised

___

###  investorCount

• **investorCount**: *number*

*Inherited from [Sto](entities.sto.md).[investorCount](entities.sto.md#investorcount)*

*Defined in [src/entities/Sto.ts:150](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L150)*

number of investors that have purchased tokens in the STO

___

###  isFinalized

• **isFinalized**: *boolean*

*Inherited from [Sto](entities.sto.md).[isFinalized](entities.sto.md#isfinalized)*

*Defined in [src/entities/Sto.ts:170](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L170)*

whether the STO has been finalized or not

___

###  isPaused

• **isPaused**: *boolean*

*Inherited from [Sto](entities.sto.md).[isPaused](entities.sto.md#ispaused)*

*Defined in [src/entities/Sto.ts:160](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L160)*

whether the STO is currently paused or not

___

###  preIssueAllowed

• **preIssueAllowed**: *boolean*

*Inherited from [Sto](entities.sto.md).[preIssueAllowed](entities.sto.md#preissueallowed)*

*Defined in [src/entities/Sto.ts:175](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L175)*

whether all tokens due to be sold are issued when the STO starts. If false, the appropriate amount of tokens is issued to the buyer whenever a sale is made

___

###  raisedAmount

• **raisedAmount**: *BigNumber*

*Inherited from [Sto](entities.sto.md).[raisedAmount](entities.sto.md#raisedamount)*

*Defined in [src/entities/Sto.ts:140](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L140)*

amount of funds that have been raised so far

___

###  raisedFundsWallet

• **raisedFundsWallet**: *string*

*Inherited from [Sto](entities.sto.md).[raisedFundsWallet](entities.sto.md#raisedfundswallet)*

*Defined in [src/entities/Sto.ts:130](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L130)*

wallet where raised funds will be forwarded to

___

###  rate

• **rate**: *BigNumber*

*Defined in [src/entities/SimpleSto.ts:66](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SimpleSto.ts#L66)*

rate at which the tokens will be sold in sto

___

###  securityTokenId

• **securityTokenId**: *string*

*Inherited from [Sto](entities.sto.md).[securityTokenId](entities.sto.md#securitytokenid)*

*Defined in [src/entities/Sto.ts:116](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L116)*

___

###  securityTokenSymbol

• **securityTokenSymbol**: *string*

*Inherited from [Sto](entities.sto.md).[securityTokenSymbol](entities.sto.md#securitytokensymbol)*

*Defined in [src/entities/Sto.ts:114](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L114)*

___

###  soldTokensAmount

• **soldTokensAmount**: *BigNumber*

*Inherited from [Sto](entities.sto.md).[soldTokensAmount](entities.sto.md#soldtokensamount)*

*Defined in [src/entities/Sto.ts:145](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L145)*

total number of tokens that have been sold so far

___

###  startDate

• **startDate**: *Date*

*Inherited from [Sto](entities.sto.md).[startDate](entities.sto.md#startdate)*

*Defined in [src/entities/Sto.ts:123](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L123)*

___

###  stoType

• **stoType**: *StoType*

*Inherited from [Sto](entities.sto.md).[stoType](entities.sto.md#stotype)*

*Defined in [src/entities/Sto.ts:121](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L121)*

type of STO setup

___

###  uid

• **uid**: *string*

*Overrides [Sto](entities.sto.md).[uid](entities.sto.md#abstract-uid)*

*Defined in [src/entities/SimpleSto.ts:56](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SimpleSto.ts#L56)*

unique generated Tiered STO id

___

###  unsoldTokensWallet

• **unsoldTokensWallet**: *string*

*Inherited from [Sto](entities.sto.md).[unsoldTokensWallet](entities.sto.md#unsoldtokenswallet)*

*Defined in [src/entities/Sto.ts:135](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L135)*

wallet where unsold tokens will be returned to

## Methods

###  _refresh

▸ **_refresh**(`params`: Partial‹[Params](../interfaces/entities.params-9.md)›): *void*

*Overrides [Sto](entities.sto.md).[_refresh](entities.sto.md#_refresh)*

*Defined in [src/entities/SimpleSto.ts:156](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SimpleSto.ts#L156)*

Hydrate the entity

**Parameters:**

Name | Type |
------ | ------ |
`params` | Partial‹[Params](../interfaces/entities.params-9.md)› |

**Returns:** *void*

___

###  allowBeneficialInvestments

▸ **allowBeneficialInvestments**(): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹ToggleAllowBeneficialInvestmentsProcedureArgs, void››*

*Inherited from [Sto](entities.sto.md)*

*Defined in [src/entities/Sto.ts:321](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L321)*

Enable a party to invest in the STO on behalf of another party

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹ToggleAllowBeneficialInvestmentsProcedureArgs, void››*

___

###  allowPreIssuing

▸ **allowPreIssuing**(): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹ToggleAllowPreIssuingProcedureArgs, void››*

*Inherited from [Sto](entities.sto.md)*

*Defined in [src/entities/Sto.ts:292](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L292)*

Enable all offered tokens to be issued instantly at STO start (default behavior is to issue on purchase)
Can be disabled *BEFORE* the STO starts by calling disallowPreIssuing

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹ToggleAllowPreIssuingProcedureArgs, void››*

___

###  assignRole

▸ **assignRole**(`args`: object): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹AssignStoRoleProcedureArgs, void››*

*Inherited from [Sto](entities.sto.md)*

*Defined in [src/entities/Sto.ts:353](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L353)*

Assign a role on the STO to a delegate

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹AssignStoRoleProcedureArgs, void››*

___

###  disallowBeneficialInvestments

▸ **disallowBeneficialInvestments**(): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹ToggleAllowBeneficialInvestmentsProcedureArgs, void››*

*Inherited from [Sto](entities.sto.md)*

*Defined in [src/entities/Sto.ts:335](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L335)*

Disable the possibility for a party to invest in the STO on behalf of another party

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹ToggleAllowBeneficialInvestmentsProcedureArgs, void››*

___

###  disallowPreIssuing

▸ **disallowPreIssuing**(): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹ToggleAllowPreIssuingProcedureArgs, void››*

*Inherited from [Sto](entities.sto.md)*

*Defined in [src/entities/Sto.ts:307](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L307)*

Disable pre-issuing of offered tokens at STO start (goes back to default behavior, which is to issue on purchase)
Can be re-enabled *BEFORE* the STO starts by calling allowPreIssuing

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹ToggleAllowPreIssuingProcedureArgs, void››*

___

###  finalize

▸ **finalize**(): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹FinalizeStoProcedureArgs, void››*

*Inherited from [Sto](entities.sto.md)*

*Defined in [src/entities/Sto.ts:280](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L280)*

Finalize the offering. The offering's treasury wallet (or the Security Token's treasury wallet if one was not specified for the offering)
will receive the remaining unsold tokens. Throws an error if there are transfer restrictions which do not permit the wallet to receive that amount of tokens

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹FinalizeStoProcedureArgs, void››*

___

###  getInvestments

▸ **getInvestments**(): *Promise‹[Investment](entities.investment.md)[]›*

*Defined in [src/entities/SimpleSto.ts:86](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SimpleSto.ts#L86)*

Retrieve all investments that have been made on this STO

**Returns:** *Promise‹[Investment](entities.investment.md)[]›*

___

###  invest

▸ **invest**(`args`: object): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹InvestInSimpleStoProcedureArgs, void››*

*Defined in [src/entities/SimpleSto.ts:131](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SimpleSto.ts#L131)*

Invest in the STO

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹InvestInSimpleStoProcedureArgs, void››*

___

###  pause

▸ **pause**(): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹TogglePauseStoProcedureArgs, void››*

*Inherited from [Sto](entities.sto.md)*

*Defined in [src/entities/Sto.ts:251](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L251)*

Pause the offering

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹TogglePauseStoProcedureArgs, void››*

___

###  revokeRole

▸ **revokeRole**(`args`: object): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹AssignStoRoleProcedureArgs, void››*

*Inherited from [Sto](entities.sto.md)*

*Defined in [src/entities/Sto.ts:379](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L379)*

Remove a role from a delegate

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹AssignStoRoleProcedureArgs, void››*

___

###  toPojo

▸ **toPojo**(): *object*

*Overrides [Sto](entities.sto.md).[toPojo](entities.sto.md#topojo)*

*Defined in [src/entities/SimpleSto.ts:142](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SimpleSto.ts#L142)*

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** *object*

___

###  unpause

▸ **unpause**(): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹TogglePauseStoProcedureArgs, void››*

*Inherited from [Sto](entities.sto.md)*

*Defined in [src/entities/Sto.ts:265](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L265)*

Unpause the offering

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹TogglePauseStoProcedureArgs, void››*

___

### `Static` generateId

▸ **generateId**(`__namedParameters`: object): *string*

*Defined in [src/entities/SimpleSto.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SimpleSto.ts#L45)*

Generate the Simple STO's UUID from its identifying properties

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | object |

**Returns:** *string*

___

### `Static` unserialize

▸ **unserialize**(`serialized`: string): *[UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-6.md)*

*Inherited from [Sto](entities.sto.md).[unserialize](entities.sto.md#static-unserialize)*

*Defined in [src/entities/Sto.ts:189](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L189)*

Unserialize string to a Security Token Offering object representation

**Parameters:**

Name | Type |
------ | ------ |
`serialized` | string |

**Returns:** *[UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-6.md)*
