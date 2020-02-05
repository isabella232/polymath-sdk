# Class: Shareholders

Namespace that handles all Shareholder related functionality

## Hierarchy

* [SubModule](_entities_securitytoken_submodule_.submodule.md)

  ↳ **Shareholders**

## Index

### Constructors

* [constructor](_entities_securitytoken_shareholders_.shareholders.md#constructor)

### Properties

* [context](_entities_securitytoken_shareholders_.shareholders.md#protected-context)
* [securityToken](_entities_securitytoken_shareholders_.shareholders.md#protected-securitytoken)

### Methods

* [allTimeInvestorCount](_entities_securitytoken_shareholders_.shareholders.md#alltimeinvestorcount)
* [createCheckpoint](_entities_securitytoken_shareholders_.shareholders.md#createcheckpoint)
* [getCheckpoint](_entities_securitytoken_shareholders_.shareholders.md#getcheckpoint)
* [getCheckpoints](_entities_securitytoken_shareholders_.shareholders.md#getcheckpoints)
* [getShareholders](_entities_securitytoken_shareholders_.shareholders.md#getshareholders)
* [holderCount](_entities_securitytoken_shareholders_.shareholders.md#holdercount)
* [modifyData](_entities_securitytoken_shareholders_.shareholders.md#modifydata)
* [revokeKyc](_entities_securitytoken_shareholders_.shareholders.md#revokekyc)

## Constructors

###  constructor

\+ **new Shareholders**(`securityToken`: [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md), `context`: [Context](_context_.context.md)): *[Shareholders](_entities_securitytoken_shareholders_.shareholders.md)*

*Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[constructor](_entities_securitytoken_submodule_.submodule.md#constructor)*

*Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/SecurityToken/SubModule.ts#L10)*

Create a new SubModule instance

**Parameters:**

Name | Type |
------ | ------ |
`securityToken` | [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[Shareholders](_entities_securitytoken_shareholders_.shareholders.md)*

## Properties

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[context](_entities_securitytoken_submodule_.submodule.md#protected-context)*

*Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/SecurityToken/SubModule.ts#L10)*

___

### `Protected` securityToken

• **securityToken**: *[SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)*

*Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[securityToken](_entities_securitytoken_submodule_.submodule.md#protected-securitytoken)*

*Defined in [src/entities/SecurityToken/SubModule.ts:8](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/SecurityToken/SubModule.ts#L8)*

## Methods

###  allTimeInvestorCount

▸ **allTimeInvestorCount**(): *Promise‹number›*

*Defined in [src/entities/SecurityToken/Shareholders.ts:221](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/SecurityToken/Shareholders.ts#L221)*

Retrieve the amount of wallets that ever held tokens or have any KYC data

**Returns:** *Promise‹number›*

___

###  createCheckpoint

▸ **createCheckpoint**(): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[CreateCheckpointProcedureArgs](../interfaces/_types_index_.createcheckpointprocedureargs.md), [Checkpoint](_entities_checkpoint_.checkpoint.md)››*

*Defined in [src/entities/SecurityToken/Shareholders.ts:59](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/SecurityToken/Shareholders.ts#L59)*

Create a snapshot of the balances of every shareholder at the current date

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[CreateCheckpointProcedureArgs](../interfaces/_types_index_.createcheckpointprocedureargs.md), [Checkpoint](_entities_checkpoint_.checkpoint.md)››*

___

###  getCheckpoint

▸ **getCheckpoint**(`args`: [GetCheckpointParams](../interfaces/_entities_securitytoken_shareholders_.getcheckpointparams.md) | string): *Promise‹[Checkpoint](_entities_checkpoint_.checkpoint.md)›*

*Defined in [src/entities/SecurityToken/Shareholders.ts:133](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/SecurityToken/Shareholders.ts#L133)*

Retrieve a checkpoint from the security token by index or UUID

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`args` | [GetCheckpointParams](../interfaces/_entities_securitytoken_shareholders_.getcheckpointparams.md) &#124; string | checkpoint uuid or object containing its index  |

**Returns:** *Promise‹[Checkpoint](_entities_checkpoint_.checkpoint.md)›*

___

###  getCheckpoints

▸ **getCheckpoints**(): *Promise‹[Checkpoint](_entities_checkpoint_.checkpoint.md)[]›*

*Defined in [src/entities/SecurityToken/Shareholders.ts:74](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/SecurityToken/Shareholders.ts#L74)*

Retrieve list of checkpoints and their corresponding dividend distributions of every type

**Returns:** *Promise‹[Checkpoint](_entities_checkpoint_.checkpoint.md)[]›*

___

###  getShareholders

▸ **getShareholders**(): *Promise‹[Shareholder](_entities_shareholder_.shareholder.md)[]›*

*Defined in [src/entities/SecurityToken/Shareholders.ts:155](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/SecurityToken/Shareholders.ts#L155)*

Get data for all shareholders associated to the Security Token

**Returns:** *Promise‹[Shareholder](_entities_shareholder_.shareholder.md)[]›*

___

###  holderCount

▸ **holderCount**(): *Promise‹number›*

*Defined in [src/entities/SecurityToken/Shareholders.ts:247](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/SecurityToken/Shareholders.ts#L247)*

Retrieve the amount of wallets that currently hold tokens

**Returns:** *Promise‹number›*

___

###  modifyData

▸ **modifyData**(`args`: object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ModifyShareholderDataProcedureArgs](../interfaces/_types_index_.modifyshareholderdataprocedureargs.md), [Shareholder](_entities_shareholder_.shareholder.md)[]››*

*Defined in [src/entities/SecurityToken/Shareholders.ts:31](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/SecurityToken/Shareholders.ts#L31)*

Add/modify investor data. For an investor to be able to hold, sell or purchase tokens, his address (and other KYC data)
must be added/modified via this method

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`shareholderData` | [ShareholderDataEntry](../interfaces/_types_index_.shareholderdataentry.md)[] |

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ModifyShareholderDataProcedureArgs](../interfaces/_types_index_.modifyshareholderdataprocedureargs.md), [Shareholder](_entities_shareholder_.shareholder.md)[]››*

___

###  revokeKyc

▸ **revokeKyc**(`args`: object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[RevokeKycProcedureArgs](../interfaces/_types_index_.revokekycprocedureargs.md), [Shareholder](_entities_shareholder_.shareholder.md)[]››*

*Defined in [src/entities/SecurityToken/Shareholders.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/SecurityToken/Shareholders.ts#L45)*

Revoke KYC for a group of shareholder addresses. Supplied addresses must have valid KYC

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`shareholderAddresses` | string[] |

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[RevokeKycProcedureArgs](../interfaces/_types_index_.revokekycprocedureargs.md), [Shareholder](_entities_shareholder_.shareholder.md)[]››*
