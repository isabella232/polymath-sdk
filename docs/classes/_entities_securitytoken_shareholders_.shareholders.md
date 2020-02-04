[@polymathnetwork/sdk - v2.0.1-beta.120](../README.md) › [Globals](../globals.md) › ["entities/SecurityToken/Shareholders"](../modules/_entities_securitytoken_shareholders_.md) › [Shareholders](_entities_securitytoken_shareholders_.shareholders.md)

# Class: Shareholders

Namespace that handles all Shareholder related functionality

## Hierarchy

- [SubModule](_entities_securitytoken_submodule_.submodule.md)

  ↳ **Shareholders**

## Index

### Constructors

- [constructor](_entities_securitytoken_shareholders_.shareholders.md#constructor)

### Properties

- [context](_entities_securitytoken_shareholders_.shareholders.md#protected-context)
- [securityToken](_entities_securitytoken_shareholders_.shareholders.md#protected-securitytoken)

### Methods

- [allTimeInvestorCount](_entities_securitytoken_shareholders_.shareholders.md#alltimeinvestorcount)
- [createCheckpoint](_entities_securitytoken_shareholders_.shareholders.md#createcheckpoint)
- [getCheckpoint](_entities_securitytoken_shareholders_.shareholders.md#getcheckpoint)
- [getCheckpoints](_entities_securitytoken_shareholders_.shareholders.md#getcheckpoints)
- [getShareholders](_entities_securitytoken_shareholders_.shareholders.md#getshareholders)
- [holderCount](_entities_securitytoken_shareholders_.shareholders.md#holdercount)
- [modifyData](_entities_securitytoken_shareholders_.shareholders.md#modifydata)
- [revokeKyc](_entities_securitytoken_shareholders_.shareholders.md#revokekyc)

## Constructors

### constructor

\+ **new Shareholders**(`securityToken`: [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md), `context`: [Context](_context_.context.md)): _[Shareholders](_entities_securitytoken_shareholders_.shareholders.md)_

_Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[constructor](_entities_securitytoken_submodule_.submodule.md#constructor)_

_Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SubModule.ts#L10)_

Create a new SubModule instance

**Parameters:**

| Name            | Type                                                                     |
| --------------- | ------------------------------------------------------------------------ |
| `securityToken` | [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md) |
| `context`       | [Context](_context_.context.md)                                          |

**Returns:** _[Shareholders](_entities_securitytoken_shareholders_.shareholders.md)_

## Properties

### `Protected` context

• **context**: _[Context](_context_.context.md)_

_Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[context](_entities_securitytoken_submodule_.submodule.md#protected-context)_

_Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SubModule.ts#L10)_

---

### `Protected` securityToken

• **securityToken**: _[SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)_

_Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[securityToken](_entities_securitytoken_submodule_.submodule.md#protected-securitytoken)_

_Defined in [src/entities/SecurityToken/SubModule.ts:8](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SubModule.ts#L8)_

## Methods

### allTimeInvestorCount

▸ **allTimeInvestorCount**(): _Promise‹number›_

_Defined in [src/entities/SecurityToken/Shareholders.ts:221](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/Shareholders.ts#L221)_

Retrieve the amount of wallets that ever held tokens or have any KYC data

**Returns:** _Promise‹number›_

---

### createCheckpoint

▸ **createCheckpoint**(): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[CreateCheckpointProcedureArgs](../interfaces/_types_index_.createcheckpointprocedureargs.md), [Checkpoint](_entities_checkpoint_.checkpoint.md)››_

_Defined in [src/entities/SecurityToken/Shareholders.ts:59](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/Shareholders.ts#L59)_

Create a snapshot of the balances of every shareholder at the current date

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[CreateCheckpointProcedureArgs](../interfaces/_types_index_.createcheckpointprocedureargs.md), [Checkpoint](_entities_checkpoint_.checkpoint.md)››_

---

### getCheckpoint

▸ **getCheckpoint**(`args`: [GetCheckpointParams](../interfaces/_entities_securitytoken_shareholders_.getcheckpointparams.md) | string): _Promise‹[Checkpoint](_entities_checkpoint_.checkpoint.md)›_

_Defined in [src/entities/SecurityToken/Shareholders.ts:133](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/Shareholders.ts#L133)_

Retrieve a checkpoint from the security token by index or UUID

**Parameters:**

| Name   | Type                                                                                                            | Description                                    |
| ------ | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `args` | [GetCheckpointParams](../interfaces/_entities_securitytoken_shareholders_.getcheckpointparams.md) &#124; string | checkpoint uuid or object containing its index |

**Returns:** _Promise‹[Checkpoint](_entities_checkpoint_.checkpoint.md)›_

---

### getCheckpoints

▸ **getCheckpoints**(): _Promise‹[Checkpoint](_entities_checkpoint_.checkpoint.md)[]›_

_Defined in [src/entities/SecurityToken/Shareholders.ts:74](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/Shareholders.ts#L74)_

Retrieve list of checkpoints and their corresponding dividend distributions of every type

**Returns:** _Promise‹[Checkpoint](_entities_checkpoint_.checkpoint.md)[]›_

---

### getShareholders

▸ **getShareholders**(): _Promise‹[Shareholder](_entities_shareholder_.shareholder.md)[]›_

_Defined in [src/entities/SecurityToken/Shareholders.ts:155](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/Shareholders.ts#L155)_

Get data for all shareholders associated to the Security Token

**Returns:** _Promise‹[Shareholder](_entities_shareholder_.shareholder.md)[]›_

---

### holderCount

▸ **holderCount**(): _Promise‹number›_

_Defined in [src/entities/SecurityToken/Shareholders.ts:247](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/Shareholders.ts#L247)_

Retrieve the amount of wallets that currently hold tokens

**Returns:** _Promise‹number›_

---

### modifyData

▸ **modifyData**(`args`: object): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ModifyShareholderDataProcedureArgs](../interfaces/_types_index_.modifyshareholderdataprocedureargs.md), [Shareholder](_entities_shareholder_.shareholder.md)[]››_

_Defined in [src/entities/SecurityToken/Shareholders.ts:31](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/Shareholders.ts#L31)_

Add/modify investor data. For an investor to be able to hold, sell or purchase tokens, his address (and other KYC data)
must be added/modified via this method

**Parameters:**

▪ **args**: _object_

| Name              | Type                                                                          |
| ----------------- | ----------------------------------------------------------------------------- |
| `shareholderData` | [ShareholderDataEntry](../interfaces/_types_index_.shareholderdataentry.md)[] |

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ModifyShareholderDataProcedureArgs](../interfaces/_types_index_.modifyshareholderdataprocedureargs.md), [Shareholder](_entities_shareholder_.shareholder.md)[]››_

---

### revokeKyc

▸ **revokeKyc**(`args`: object): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[RevokeKycProcedureArgs](../interfaces/_types_index_.revokekycprocedureargs.md), [Shareholder](_entities_shareholder_.shareholder.md)[]››_

_Defined in [src/entities/SecurityToken/Shareholders.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/Shareholders.ts#L45)_

Revoke KYC for a group of shareholder addresses. Supplied addresses must have valid KYC

**Parameters:**

▪ **args**: _object_

| Name                   | Type     |
| ---------------------- | -------- |
| `shareholderAddresses` | string[] |

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[RevokeKycProcedureArgs](../interfaces/_types_index_.revokekycprocedureargs.md), [Shareholder](_entities_shareholder_.shareholder.md)[]››_
