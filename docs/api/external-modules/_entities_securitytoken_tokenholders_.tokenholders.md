# Tokenholders

Namespace that handles all Tokenholder related functionality

## Hierarchy

* [SubModule]()

  ↳ **Tokenholders**

## Index

### Constructors

* [constructor]()

### Properties

* [context]()
* [securityToken]()

### Methods

* [allTimeInvestorCount]()
* [createCheckpoint]()
* [getCheckpoint]()
* [getCheckpoints]()
* [getTokenholders]()
* [holderCount]()
* [modifyData]()
* [revokeKyc]()

## Constructors

### constructor

+ **new Tokenholders**\(`securityToken`: [SecurityToken](), `context`: [Context]()\): [_Tokenholders_]()

_Inherited from_ [_SubModule_]()_._[_constructor_]()

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:10_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SubModule.ts#L10)

Create a new SubModule instance

**Parameters:**

| Name | Type |
| :--- | :--- |
| `securityToken` | [SecurityToken]() |
| `context` | [Context]() |

**Returns:** [_Tokenholders_]()

## Properties

### `Protected` context

• **context**: [_Context_]()

_Inherited from_ [_SubModule_]()_._[_context_]()

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:10_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SubModule.ts#L10)

### `Protected` securityToken

• **securityToken**: [_SecurityToken_]()

_Inherited from_ [_SubModule_]()_._[_securityToken_]()

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:8_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SubModule.ts#L8)

## Methods

### allTimeInvestorCount

▸ **allTimeInvestorCount**\(\): _Promise‹number›_

Defined in src/entities/SecurityToken/Tokenholders.ts:221

Retrieve the amount of wallets that ever held tokens or have any KYC data

**Returns:** _Promise‹number›_

### createCheckpoint

▸ **createCheckpoint**\(\): _Promise‹_[_TransactionQueue_]()_‹_[_CreateCheckpointProcedureArgs_]()_,_ [_Checkpoint_]()_››_

Defined in src/entities/SecurityToken/Tokenholders.ts:59

Create a snapshot of the balances of every tokenholder at the current date

**Returns:** _Promise‹_[_TransactionQueue_]()_‹_[_CreateCheckpointProcedureArgs_]()_,_ [_Checkpoint_]()_››_

### getCheckpoint

▸ **getCheckpoint**\(`args`: [GetCheckpointParams]() \| string\): _Promise‹_[_Checkpoint_]()_›_

Defined in src/entities/SecurityToken/Tokenholders.ts:133

Retrieve a checkpoint from the security token by index or UUID

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `args` | [GetCheckpointParams]() \| string | checkpoint uuid or object containing its index |

**Returns:** _Promise‹_[_Checkpoint_]()_›_

### getCheckpoints

▸ **getCheckpoints**\(\): _Promise‹_[_Checkpoint_]()_\[\]›_

Defined in src/entities/SecurityToken/Tokenholders.ts:74

Retrieve list of checkpoints and their corresponding dividend distributions of every type

**Returns:** _Promise‹_[_Checkpoint_]()_\[\]›_

### getTokenholders

▸ **getTokenholders**\(\): _Promise‹_[_Tokenholder_]()_\[\]›_

Defined in src/entities/SecurityToken/Tokenholders.ts:155

Get data for all tokenholders associated to the Security Token

**Returns:** _Promise‹_[_Tokenholder_]()_\[\]›_

### holderCount

▸ **holderCount**\(\): _Promise‹number›_

Defined in src/entities/SecurityToken/Tokenholders.ts:247

Retrieve the amount of wallets that currently hold tokens

**Returns:** _Promise‹number›_

### modifyData

▸ **modifyData**\(`args`: object\): _Promise‹_[_TransactionQueue_]()_‹_[_ModifyTokenholderDataProcedureArgs_]()_,_ [_Tokenholder_]()_\[\]››_

Defined in src/entities/SecurityToken/Tokenholders.ts:31

Add/modify investor data. For an investor to be able to hold, sell or purchase tokens, his address \(and other KYC data\) must be added/modified via this method

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `tokenholderData` | [TokenholderDataEntry]()\[\] |

**Returns:** _Promise‹_[_TransactionQueue_]()_‹_[_ModifyTokenholderDataProcedureArgs_]()_,_ [_Tokenholder_]()_\[\]››_

### revokeKyc

▸ **revokeKyc**\(`args`: object\): _Promise‹_[_TransactionQueue_]()_‹_[_RevokeKycProcedureArgs_]()_,_ [_Tokenholder_]()_\[\]››_

Defined in src/entities/SecurityToken/Tokenholders.ts:45

Revoke KYC for a group of tokenholder addresses. Supplied addresses must have valid KYC

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `tokenholderAddresses` | string\[\] |

**Returns:** _Promise‹_[_TransactionQueue_]()_‹_[_RevokeKycProcedureArgs_]()_,_ [_Tokenholder_]()_\[\]››_

