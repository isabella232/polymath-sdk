# DividendDistribution

Class used to manage the dividend distribution functionality

## Hierarchy

* [Entity]()‹[Params]()›

  ↳ **DividendDistribution**

## Index

### Constructors

* [constructor]()

### Properties

* [amount]()
* [checkpointId]()
* [claimedAmount]()
* [context]()
* [created]()
* [currency]()
* [expiry]()
* [index]()
* [maturity]()
* [name]()
* [reclaimed]()
* [securityTokenId]()
* [securityTokenSymbol]()
* [tokenholders]()
* [totalSupply]()
* [totalWithheld]()
* [totalWithheldWithdrawn]()
* [uid]()

### Methods

* [\_refresh]()
* [pullPayment]()
* [pushPayment]()
* [toPojo]()
* [withdrawTaxes]()
* [generateId]()
* [unserialize]()

## Constructors

### constructor

+ **new DividendDistribution**\(`params`: [Params]() & [UniqueIdentifiers](), `context`: [Context]()\): [_DividendDistribution_]()

_Defined in_ [_src/entities/DividendDistribution.ts:146_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/DividendDistribution.ts#L146)

Create a new Dividend Distribution instance

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | [Params]() & [UniqueIdentifiers]() |
| `context` | [Context]() |

**Returns:** [_DividendDistribution_]()

## Properties

### amount

• **amount**: _BigNumber_

_Defined in_ [_src/entities/DividendDistribution.ts:128_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/DividendDistribution.ts#L128)

### checkpointId

• **checkpointId**: _string_

_Defined in_ [_src/entities/DividendDistribution.ts:116_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/DividendDistribution.ts#L116)

### claimedAmount

• **claimedAmount**: _BigNumber_

_Defined in_ [_src/entities/DividendDistribution.ts:130_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/DividendDistribution.ts#L130)

### `Protected` context

• **context**: [_Context_]()

_Defined in_ [_src/entities/DividendDistribution.ts:146_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/DividendDistribution.ts#L146)

### created

• **created**: _Date_

_Defined in_ [_src/entities/DividendDistribution.ts:122_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/DividendDistribution.ts#L122)

### currency

• **currency**: _string \| null_

_Defined in_ [_src/entities/DividendDistribution.ts:144_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/DividendDistribution.ts#L144)

### expiry

• **expiry**: _Date_

_Defined in_ [_src/entities/DividendDistribution.ts:126_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/DividendDistribution.ts#L126)

### index

• **index**: _number_

_Defined in_ [_src/entities/DividendDistribution.ts:114_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/DividendDistribution.ts#L114)

### maturity

• **maturity**: _Date_

_Defined in_ [_src/entities/DividendDistribution.ts:124_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/DividendDistribution.ts#L124)

### name

• **name**: _string_

_Defined in_ [_src/entities/DividendDistribution.ts:142_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/DividendDistribution.ts#L142)

### reclaimed

• **reclaimed**: _boolean_

_Defined in_ [_src/entities/DividendDistribution.ts:134_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/DividendDistribution.ts#L134)

### securityTokenId

• **securityTokenId**: _string_

_Defined in_ [_src/entities/DividendDistribution.ts:120_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/DividendDistribution.ts#L120)

### securityTokenSymbol

• **securityTokenSymbol**: _string_

_Defined in_ [_src/entities/DividendDistribution.ts:118_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/DividendDistribution.ts#L118)

### tokenholders

• **tokenholders**: [_DividendTokenholderStatus_]()_\[\]_

_Defined in_ [_src/entities/DividendDistribution.ts:140_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/DividendDistribution.ts#L140)

### totalSupply

• **totalSupply**: _BigNumber_

_Defined in_ [_src/entities/DividendDistribution.ts:132_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/DividendDistribution.ts#L132)

### totalWithheld

• **totalWithheld**: _BigNumber_

_Defined in_ [_src/entities/DividendDistribution.ts:136_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/DividendDistribution.ts#L136)

### totalWithheldWithdrawn

• **totalWithheldWithdrawn**: _BigNumber_

_Defined in_ [_src/entities/DividendDistribution.ts:138_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/DividendDistribution.ts#L138)

### uid

• **uid**: _string_

_Overrides_ [_Entity_]()_._[_uid_]()

_Defined in_ [_src/entities/DividendDistribution.ts:112_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/DividendDistribution.ts#L112)

## Methods

### \_refresh

▸ **\_refresh**\(`params`: Partial‹[Params]()›\): _void_

_Overrides_ [_Entity_]()_._[_\_refresh_]()

_Defined in_ [_src/entities/DividendDistribution.ts:290_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/DividendDistribution.ts#L290)

Hydrate the Dividend Distribution entity

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | Partial‹[Params]()› |

**Returns:** _void_

### pullPayment

▸ **pullPayment**\(\): _Promise‹_[_TransactionQueue_]()_‹_[_PullDividendPaymentProcedureArgs_]()_, void››_

_Defined in_ [_src/entities/DividendDistribution.ts:215_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/DividendDistribution.ts#L215)

Pull payment from this dividend distribution to the current address

**Returns:** _Promise‹_[_TransactionQueue_]()_‹_[_PullDividendPaymentProcedureArgs_]()_, void››_

### pushPayment

▸ **pushPayment**\(\): _Promise‹_[_TransactionQueue_]()_‹_[_PushDividendPaymentProcedureArgs_]()_, void››_

_Defined in_ [_src/entities/DividendDistribution.ts:200_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/DividendDistribution.ts#L200)

Push payment for this dividend distribution

**Returns:** _Promise‹_[_TransactionQueue_]()_‹_[_PushDividendPaymentProcedureArgs_]()_, void››_

### toPojo

▸ **toPojo**\(\): _object_

_Overrides_ [_Entity_]()_._[_toPojo_]()

_Defined in_ [_src/entities/DividendDistribution.ts:245_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/DividendDistribution.ts#L245)

Convert entity to POJO \(Plain Old Javascript Object\)

**Returns:** _object_

* **amount**: _BigNumber_
* **checkpointId**: _string_
* **claimedAmount**: _BigNumber_
* **created**: _Date_
* **currency**: _null \| string_
* **expiry**: _Date_
* **index**: _number_
* **maturity**: _Date_
* **name**: _string_
* **reclaimed**: _boolean_
* **securityTokenId**: _string_
* **securityTokenSymbol**: _string_
* **tokenholders**: [_DividendTokenholderStatus_]()_\[\]_
* **totalSupply**: _BigNumber_
* **totalWithheld**: _BigNumber_
* **totalWithheldWithdrawn**: _BigNumber_
* **uid**: _string_

### withdrawTaxes

▸ **withdrawTaxes**\(\): _Promise‹_[_TransactionQueue_]()_‹_[_WithdrawTaxesProcedureArgs_]()_, void››_

_Defined in_ [_src/entities/DividendDistribution.ts:230_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/DividendDistribution.ts#L230)

Withdraw collected taxes from this dividend distribution

**Returns:** _Promise‹_[_TransactionQueue_]()_‹_[_WithdrawTaxesProcedureArgs_]()_, void››_

### `Static` generateId

▸ **generateId**\(`__namedParameters`: object\): _string_

_Defined in_ [_src/entities/DividendDistribution.ts:87_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/DividendDistribution.ts#L87)

Generate the Dividend Distribution's UUID from its identifying properties

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type |
| :--- | :--- |
| `index` | number |
| `securityTokenId` | string |

**Returns:** _string_

### `Static` unserialize

▸ **unserialize**\(`serialized`: string\): [_UniqueIdentifiers_]()

_Defined in_ [_src/entities/DividendDistribution.ts:99_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/DividendDistribution.ts#L99)

Unserialize string to a Dividend Distribution object representation

**Parameters:**

| Name | Type |
| :--- | :--- |
| `serialized` | string |

**Returns:** [_UniqueIdentifiers_]()

