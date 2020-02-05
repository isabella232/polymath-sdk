# Class: CountRestrictions

Namespace that handles all Count Restriction related functionality

## Hierarchy

- [SubModule](_entities_securitytoken_submodule_.submodule.md)

  ↳ **CountRestrictions**

## Index

### Constructors

- [constructor](_entities_securitytoken_transfers_restrictions_countrestrictions_.countrestrictions.md#constructor)

### Properties

- [context](_entities_securitytoken_transfers_restrictions_countrestrictions_.countrestrictions.md#protected-context)
- [securityToken](_entities_securitytoken_transfers_restrictions_countrestrictions_.countrestrictions.md#protected-securitytoken)

### Methods

- [getMaxHolderCount](_entities_securitytoken_transfers_restrictions_countrestrictions_.countrestrictions.md#getmaxholdercount)
- [modifyMaxHolderCount](_entities_securitytoken_transfers_restrictions_countrestrictions_.countrestrictions.md#modifymaxholdercount)

## Constructors

### constructor

\+ **new CountRestrictions**(`securityToken`: [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md), `context`: [Context](_context_.context.md)): _[CountRestrictions](_entities_securitytoken_transfers_restrictions_countrestrictions_.countrestrictions.md)_

_Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[constructor](_entities_securitytoken_submodule_.submodule.md#constructor)_

_Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/SecurityToken/SubModule.ts#L10)_

Create a new SubModule instance

**Parameters:**

| Name            | Type                                                                     |
| --------------- | ------------------------------------------------------------------------ |
| `securityToken` | [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md) |
| `context`       | [Context](_context_.context.md)                                          |

**Returns:** _[CountRestrictions](_entities_securitytoken_transfers_restrictions_countrestrictions_.countrestrictions.md)_

## Properties

### `Protected` context

• **context**: _[Context](_context_.context.md)_

_Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[context](_entities_securitytoken_submodule_.submodule.md#protected-context)_

_Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/SecurityToken/SubModule.ts#L10)_

---

### `Protected` securityToken

• **securityToken**: _[SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)_

_Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[securityToken](_entities_securitytoken_submodule_.submodule.md#protected-securitytoken)_

_Defined in [src/entities/SecurityToken/SubModule.ts:8](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/SecurityToken/SubModule.ts#L8)_

## Methods

### getMaxHolderCount

▸ **getMaxHolderCount**(): _Promise‹number›_

_Defined in [src/entities/SecurityToken/Transfers/Restrictions/CountRestrictions.ts:31](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/SecurityToken/Transfers/Restrictions/CountRestrictions.ts#L31)_

Retrieve the maximum amonut of shareholders allowed to hold the token at once
Can be modified with `modifyMaxHolderCount`

**Returns:** _Promise‹number›_

---

### modifyMaxHolderCount

▸ **modifyMaxHolderCount**(`args`: object): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ModifyMaxHolderCountProcedureArgs](../interfaces/_types_index_.modifymaxholdercountprocedureargs.md), void››_

_Defined in [src/entities/SecurityToken/Transfers/Restrictions/CountRestrictions.ts:16](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/SecurityToken/Transfers/Restrictions/CountRestrictions.ts#L16)_

Modify the maximum amount of shareholders allowed to hold the token at once

**Parameters:**

▪ **args**: _object_

| Name             | Type   |
| ---------------- | ------ |
| `maxHolderCount` | number |

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ModifyMaxHolderCountProcedureArgs](../interfaces/_types_index_.modifymaxholdercountprocedureargs.md), void››_
