# Tokenholders

Namespace that handles all Tokenholder related functionality

## Hierarchy

* [SubModule](../classes/_entities_securitytoken_submodule_.submodule.md)

  ↳ **Tokenholders**

## Index

### Constructors

* [constructor](../classes/_entities_securitytoken_tokenholders_.tokenholders.md#constructor)

### Properties

* [context](../classes/_entities_securitytoken_tokenholders_.tokenholders.md#protected-context)
* [securityToken](../classes/_entities_securitytoken_tokenholders_.tokenholders.md#protected-securitytoken)

### Methods

* [allTimeInvestorCount](../classes/_entities_securitytoken_tokenholders_.tokenholders.md#alltimeinvestorcount)
* [createCheckpoint](../classes/_entities_securitytoken_tokenholders_.tokenholders.md#createcheckpoint)
* [getCheckpoint](../classes/_entities_securitytoken_tokenholders_.tokenholders.md#getcheckpoint)
* [getCheckpoints](../classes/_entities_securitytoken_tokenholders_.tokenholders.md#getcheckpoints)
* [getTokenholders](../classes/_entities_securitytoken_tokenholders_.tokenholders.md#gettokenholders)
* [holderCount](../classes/_entities_securitytoken_tokenholders_.tokenholders.md#holdercount)
* [modifyData](../classes/_entities_securitytoken_tokenholders_.tokenholders.md#modifydata)
* [revokeKyc](../classes/_entities_securitytoken_tokenholders_.tokenholders.md#revokekyc)

## Constructors

### constructor

+ **new Tokenholders**\(`securityToken`: [SecurityToken](../classes/_entities_securitytoken_securitytoken_.securitytoken.md), `context`: [Context](../classes/_context_.context.md)\): [_Tokenholders_](../classes/_entities_securitytoken_tokenholders_.tokenholders.md)

_Inherited from_ [_SubModule_](../classes/_entities_securitytoken_submodule_.submodule.md)_._[_constructor_](../classes/_entities_securitytoken_submodule_.submodule.md#constructor)

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:10_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SubModule.ts#L10)

Create a new SubModule instance

**Parameters:**

| Name | Type |
| :--- | :--- |
| `securityToken` | [SecurityToken](../classes/_entities_securitytoken_securitytoken_.securitytoken.md) |
| `context` | [Context](../classes/_context_.context.md) |

**Returns:** [_Tokenholders_](../classes/_entities_securitytoken_tokenholders_.tokenholders.md)

## Properties

### `Protected` context

• **context**: [_Context_](../classes/_context_.context.md)

_Inherited from_ [_SubModule_](../classes/_entities_securitytoken_submodule_.submodule.md)_._[_context_](../classes/_entities_securitytoken_submodule_.submodule.md#protected-context)

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:10_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SubModule.ts#L10)

### `Protected` securityToken

• **securityToken**: [_SecurityToken_](../classes/_entities_securitytoken_securitytoken_.securitytoken.md)

_Inherited from_ [_SubModule_](../classes/_entities_securitytoken_submodule_.submodule.md)_._[_securityToken_](../classes/_entities_securitytoken_submodule_.submodule.md#protected-securitytoken)

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:8_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SubModule.ts#L8)

## Methods

### allTimeInvestorCount

▸ **allTimeInvestorCount**\(\): _Promise‹number›_

_Defined in_ [_src/entities/SecurityToken/Tokenholders.ts:221_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Tokenholders.ts#L221)

Retrieve the amount of wallets that ever held tokens or have any KYC data

**Returns:** _Promise‹number›_

### createCheckpoint

▸ **createCheckpoint**\(\): _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹_[_CreateCheckpointProcedureArgs_](../interfaces/_types_index_.createcheckpointprocedureargs.md)_,_ [_Checkpoint_](../classes/_entities_checkpoint_.checkpoint.md)_››_

_Defined in_ [_src/entities/SecurityToken/Tokenholders.ts:59_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Tokenholders.ts#L59)

Create a snapshot of the balances of every tokenholder at the current date

**Returns:** _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹_[_CreateCheckpointProcedureArgs_](../interfaces/_types_index_.createcheckpointprocedureargs.md)_,_ [_Checkpoint_](../classes/_entities_checkpoint_.checkpoint.md)_››_

### getCheckpoint

▸ **getCheckpoint**\(`args`: [GetCheckpointParams](../interfaces/_entities_securitytoken_tokenholders_.getcheckpointparams.md) \| string\): _Promise‹_[_Checkpoint_](../classes/_entities_checkpoint_.checkpoint.md)_›_

_Defined in_ [_src/entities/SecurityToken/Tokenholders.ts:133_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Tokenholders.ts#L133)

Retrieve a checkpoint from the security token by index or UUID

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `args` | [GetCheckpointParams](../interfaces/_entities_securitytoken_tokenholders_.getcheckpointparams.md) \| string | checkpoint uuid or object containing its index |

**Returns:** _Promise‹_[_Checkpoint_](../classes/_entities_checkpoint_.checkpoint.md)_›_

### getCheckpoints

▸ **getCheckpoints**\(\): _Promise‹_[_Checkpoint_](../classes/_entities_checkpoint_.checkpoint.md)_\[\]›_

_Defined in_ [_src/entities/SecurityToken/Tokenholders.ts:74_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Tokenholders.ts#L74)

Retrieve list of checkpoints and their corresponding dividend distributions of every type

**Returns:** _Promise‹_[_Checkpoint_](../classes/_entities_checkpoint_.checkpoint.md)_\[\]›_

### getTokenholders

▸ **getTokenholders**\(\): _Promise‹_[_Tokenholder_](../classes/_entities_tokenholder_.tokenholder.md)_\[\]›_

_Defined in_ [_src/entities/SecurityToken/Tokenholders.ts:155_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Tokenholders.ts#L155)

Get data for all tokenholders associated to the Security Token

**Returns:** _Promise‹_[_Tokenholder_](../classes/_entities_tokenholder_.tokenholder.md)_\[\]›_

### holderCount

▸ **holderCount**\(\): _Promise‹number›_

_Defined in_ [_src/entities/SecurityToken/Tokenholders.ts:247_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Tokenholders.ts#L247)

Retrieve the amount of wallets that currently hold tokens

**Returns:** _Promise‹number›_

### modifyData

▸ **modifyData**\(`args`: object\): _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹_[_ModifyTokenholderDataProcedureArgs_](../interfaces/_types_index_.modifytokenholderdataprocedureargs.md)_,_ [_Tokenholder_](../classes/_entities_tokenholder_.tokenholder.md)_\[\]››_

_Defined in_ [_src/entities/SecurityToken/Tokenholders.ts:31_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Tokenholders.ts#L31)

Add/modify investor data. For an investor to be able to hold, sell or purchase tokens, his address \(and other KYC data\) must be added/modified via this method

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `tokenholderData` | [TokenholderDataEntry](../interfaces/_types_index_.tokenholderdataentry.md)\[\] |

**Returns:** _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹_[_ModifyTokenholderDataProcedureArgs_](../interfaces/_types_index_.modifytokenholderdataprocedureargs.md)_,_ [_Tokenholder_](../classes/_entities_tokenholder_.tokenholder.md)_\[\]››_

### revokeKyc

▸ **revokeKyc**\(`args`: object\): _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹_[_RevokeKycProcedureArgs_](../interfaces/_types_index_.revokekycprocedureargs.md)_,_ [_Tokenholder_](../classes/_entities_tokenholder_.tokenholder.md)_\[\]››_

_Defined in_ [_src/entities/SecurityToken/Tokenholders.ts:45_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Tokenholders.ts#L45)

Revoke KYC for a group of tokenholder addresses. Supplied addresses must have valid KYC

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `tokenholderAddresses` | string\[\] |

**Returns:** _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹_[_RevokeKycProcedureArgs_](../interfaces/_types_index_.revokekycprocedureargs.md)_,_ [_Tokenholder_](../classes/_entities_tokenholder_.tokenholder.md)_\[\]››_

