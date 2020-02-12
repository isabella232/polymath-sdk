# Class: Shareholders

Namespace that handles all Shareholder related functionality

## Hierarchy

* [SubModule](entities.securitytoken.submodule.md)

  ↳ **Shareholders**

## Index

### Constructors

* [constructor](entities.securitytoken.shareholders.md#constructor)

### Properties

* [context](entities.securitytoken.shareholders.md#protected-context)
* [securityToken](entities.securitytoken.shareholders.md#protected-securitytoken)

### Methods

* [allTimeInvestorCount](entities.securitytoken.shareholders.md#alltimeinvestorcount)
* [createCheckpoint](entities.securitytoken.shareholders.md#createcheckpoint)
* [getCheckpoint](entities.securitytoken.shareholders.md#getcheckpoint)
* [getCheckpoints](entities.securitytoken.shareholders.md#getcheckpoints)
* [getShareholders](entities.securitytoken.shareholders.md#getshareholders)
* [holderCount](entities.securitytoken.shareholders.md#holdercount)
* [modifyData](entities.securitytoken.shareholders.md#modifydata)
* [revokeKyc](entities.securitytoken.shareholders.md#revokekyc)

## Constructors

###  constructor

\+ **new Shareholders**(`securityToken`: [SecurityToken](entities.securitytoken.securitytoken.md), `context`: [Context](_context_.context.md)): *[Shareholders](entities.securitytoken.shareholders.md)*

*Inherited from [SubModule](entities.securitytoken.submodule.md).[constructor](entities.securitytoken.submodule.md#constructor)*

*Defined in [src/entities/SecurityToken/SubModule.ts:15](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/SubModule.ts#L15)*

Create a new SubModule instance

**Parameters:**

Name | Type |
------ | ------ |
`securityToken` | [SecurityToken](entities.securitytoken.securitytoken.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[Shareholders](entities.securitytoken.shareholders.md)*

## Properties

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from [SubModule](entities.securitytoken.submodule.md).[context](entities.securitytoken.submodule.md#protected-context)*

*Defined in [src/entities/SecurityToken/SubModule.ts:15](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/SubModule.ts#L15)*

___

### `Protected` securityToken

• **securityToken**: *[SecurityToken](entities.securitytoken.securitytoken.md)*

*Inherited from [SubModule](entities.securitytoken.submodule.md).[securityToken](entities.securitytoken.submodule.md#protected-securitytoken)*

*Defined in [src/entities/SecurityToken/SubModule.ts:13](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/SubModule.ts#L13)*

## Methods

###  allTimeInvestorCount

▸ **allTimeInvestorCount**(): *Promise‹number›*

*Defined in [src/entities/SecurityToken/Shareholders.ts:226](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/Shareholders.ts#L226)*

Retrieve the amount of wallets that ever held tokens or have any KYC data

**Returns:** *Promise‹number›*

___

###  createCheckpoint

▸ **createCheckpoint**(): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹CreateCheckpointProcedureArgs, [Checkpoint](entities.checkpoint.md)››*

*Defined in [src/entities/SecurityToken/Shareholders.ts:64](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/Shareholders.ts#L64)*

Create a snapshot of the balances of every shareholder at the current date

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹CreateCheckpointProcedureArgs, [Checkpoint](entities.checkpoint.md)››*

___

###  getCheckpoint

▸ **getCheckpoint**(`args`: [GetCheckpointParams](../interfaces/entities.securitytoken.getcheckpointparams.md) | string): *Promise‹[Checkpoint](entities.checkpoint.md)›*

*Defined in [src/entities/SecurityToken/Shareholders.ts:138](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/Shareholders.ts#L138)*

Retrieve a checkpoint from the security token by index or UUID

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`args` | [GetCheckpointParams](../interfaces/entities.securitytoken.getcheckpointparams.md) &#124; string | checkpoint uuid or object containing its index  |

**Returns:** *Promise‹[Checkpoint](entities.checkpoint.md)›*

___

###  getCheckpoints

▸ **getCheckpoints**(): *Promise‹[Checkpoint](entities.checkpoint.md)[]›*

*Defined in [src/entities/SecurityToken/Shareholders.ts:79](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/Shareholders.ts#L79)*

Retrieve list of checkpoints and their corresponding dividend distributions of every type

**Returns:** *Promise‹[Checkpoint](entities.checkpoint.md)[]›*

___

###  getShareholders

▸ **getShareholders**(): *Promise‹[Shareholder](entities.shareholder.md)[]›*

*Defined in [src/entities/SecurityToken/Shareholders.ts:160](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/Shareholders.ts#L160)*

Get data for all shareholders associated to the Security Token

**Returns:** *Promise‹[Shareholder](entities.shareholder.md)[]›*

___

###  holderCount

▸ **holderCount**(): *Promise‹number›*

*Defined in [src/entities/SecurityToken/Shareholders.ts:252](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/Shareholders.ts#L252)*

Retrieve the amount of wallets that currently hold tokens

**Returns:** *Promise‹number›*

___

###  modifyData

▸ **modifyData**(`args`: object): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹ModifyShareholderDataProcedureArgs, [Shareholder](entities.shareholder.md)[]››*

*Defined in [src/entities/SecurityToken/Shareholders.ts:36](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/Shareholders.ts#L36)*

Add/modify investor data. For an investor to be able to hold, sell or purchase tokens, his address (and other KYC data)
must be added/modified via this method

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹ModifyShareholderDataProcedureArgs, [Shareholder](entities.shareholder.md)[]››*

___

###  revokeKyc

▸ **revokeKyc**(`args`: object): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹RevokeKycProcedureArgs, [Shareholder](entities.shareholder.md)[]››*

*Defined in [src/entities/SecurityToken/Shareholders.ts:50](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/Shareholders.ts#L50)*

Revoke KYC for a group of shareholder addresses. Supplied addresses must have valid KYC

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹RevokeKycProcedureArgs, [Shareholder](entities.shareholder.md)[]››*
