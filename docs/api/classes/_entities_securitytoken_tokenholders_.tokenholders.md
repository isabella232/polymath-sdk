# Class: Tokenholders

Namespace that handles all Tokenholder related functionality

## Hierarchy

* [SubModule](_entities_securitytoken_submodule_.submodule.md)

  ↳ **Tokenholders**

## Index

### Constructors

* [constructor](_entities_securitytoken_tokenholders_.tokenholders.md#constructor)

### Properties

* [context](_entities_securitytoken_tokenholders_.tokenholders.md#protected-context)
* [securityToken](_entities_securitytoken_tokenholders_.tokenholders.md#protected-securitytoken)

### Methods

* [allTimeInvestorCount](_entities_securitytoken_tokenholders_.tokenholders.md#alltimeinvestorcount)
* [createCheckpoint](_entities_securitytoken_tokenholders_.tokenholders.md#createcheckpoint)
* [getCheckpoint](_entities_securitytoken_tokenholders_.tokenholders.md#getcheckpoint)
* [getCheckpoints](_entities_securitytoken_tokenholders_.tokenholders.md#getcheckpoints)
* [getTokenholders](_entities_securitytoken_tokenholders_.tokenholders.md#gettokenholders)
* [holderCount](_entities_securitytoken_tokenholders_.tokenholders.md#holdercount)
* [modifyData](_entities_securitytoken_tokenholders_.tokenholders.md#modifydata)
* [revokeKyc](_entities_securitytoken_tokenholders_.tokenholders.md#revokekyc)

## Constructors

###  constructor

\+ **new Tokenholders**(`securityToken`: [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md), `context`: [Context](_context_.context.md)): *[Tokenholders](_entities_securitytoken_tokenholders_.tokenholders.md)*

*Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[constructor](_entities_securitytoken_submodule_.submodule.md#constructor)*

*Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SubModule.ts#L10)*

Create a new SubModule instance

**Parameters:**

Name | Type |
------ | ------ |
`securityToken` | [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[Tokenholders](_entities_securitytoken_tokenholders_.tokenholders.md)*

## Properties

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[context](_entities_securitytoken_submodule_.submodule.md#protected-context)*

*Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SubModule.ts#L10)*

___

### `Protected` securityToken

• **securityToken**: *[SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)*

*Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[securityToken](_entities_securitytoken_submodule_.submodule.md#protected-securitytoken)*

*Defined in [src/entities/SecurityToken/SubModule.ts:8](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SubModule.ts#L8)*

## Methods

###  allTimeInvestorCount

▸ **allTimeInvestorCount**(): *Promise‹number›*

*Defined in [src/entities/SecurityToken/Tokenholders.ts:221](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Tokenholders.ts#L221)*

Retrieve the amount of wallets that ever held tokens or have any KYC data

**Returns:** *Promise‹number›*

___

###  createCheckpoint

▸ **createCheckpoint**(): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[CreateCheckpointProcedureArgs](../interfaces/_types_index_.createcheckpointprocedureargs.md), [Checkpoint](_entities_checkpoint_.checkpoint.md)››*

*Defined in [src/entities/SecurityToken/Tokenholders.ts:59](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Tokenholders.ts#L59)*

Create a snapshot of the balances of every tokenholder at the current date

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[CreateCheckpointProcedureArgs](../interfaces/_types_index_.createcheckpointprocedureargs.md), [Checkpoint](_entities_checkpoint_.checkpoint.md)››*

___

###  getCheckpoint

▸ **getCheckpoint**(`args`: [GetCheckpointParams](../interfaces/_entities_securitytoken_tokenholders_.getcheckpointparams.md) | string): *Promise‹[Checkpoint](_entities_checkpoint_.checkpoint.md)›*

*Defined in [src/entities/SecurityToken/Tokenholders.ts:133](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Tokenholders.ts#L133)*

Retrieve a checkpoint from the security token by index or UUID

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`args` | [GetCheckpointParams](../interfaces/_entities_securitytoken_tokenholders_.getcheckpointparams.md) &#124; string | checkpoint uuid or object containing its index  |

**Returns:** *Promise‹[Checkpoint](_entities_checkpoint_.checkpoint.md)›*

___

###  getCheckpoints

▸ **getCheckpoints**(): *Promise‹[Checkpoint](_entities_checkpoint_.checkpoint.md)[]›*

*Defined in [src/entities/SecurityToken/Tokenholders.ts:74](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Tokenholders.ts#L74)*

Retrieve list of checkpoints and their corresponding dividend distributions of every type

**Returns:** *Promise‹[Checkpoint](_entities_checkpoint_.checkpoint.md)[]›*

___

###  getTokenholders

▸ **getTokenholders**(): *Promise‹[Tokenholder](_entities_tokenholder_.tokenholder.md)[]›*

*Defined in [src/entities/SecurityToken/Tokenholders.ts:155](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Tokenholders.ts#L155)*

Get data for all tokenholders associated to the Security Token

**Returns:** *Promise‹[Tokenholder](_entities_tokenholder_.tokenholder.md)[]›*

___

###  holderCount

▸ **holderCount**(): *Promise‹number›*

*Defined in [src/entities/SecurityToken/Tokenholders.ts:247](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Tokenholders.ts#L247)*

Retrieve the amount of wallets that currently hold tokens

**Returns:** *Promise‹number›*

___

###  modifyData

▸ **modifyData**(`args`: object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ModifyTokenholderDataProcedureArgs](../interfaces/_types_index_.modifytokenholderdataprocedureargs.md), [Tokenholder](_entities_tokenholder_.tokenholder.md)[]››*

*Defined in [src/entities/SecurityToken/Tokenholders.ts:31](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Tokenholders.ts#L31)*

Add/modify investor data. For an investor to be able to hold, sell or purchase tokens, his address (and other KYC data)
must be added/modified via this method

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`tokenholderData` | [TokenholderDataEntry](../interfaces/_types_index_.tokenholderdataentry.md)[] |

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ModifyTokenholderDataProcedureArgs](../interfaces/_types_index_.modifytokenholderdataprocedureargs.md), [Tokenholder](_entities_tokenholder_.tokenholder.md)[]››*

___

###  revokeKyc

▸ **revokeKyc**(`args`: object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[RevokeKycProcedureArgs](../interfaces/_types_index_.revokekycprocedureargs.md), [Tokenholder](_entities_tokenholder_.tokenholder.md)[]››*

*Defined in [src/entities/SecurityToken/Tokenholders.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Tokenholders.ts#L45)*

Revoke KYC for a group of tokenholder addresses. Supplied addresses must have valid KYC

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`tokenholderAddresses` | string[] |

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[RevokeKycProcedureArgs](../interfaces/_types_index_.revokekycprocedureargs.md), [Tokenholder](_entities_tokenholder_.tokenholder.md)[]››*
