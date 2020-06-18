# CountRestrictions

Namespace that handles all Count Restriction related functionality

## Hierarchy

* [SubModule](_entities_securitytoken_submodule_.submodule.md)

  ↳ **CountRestrictions**

## Index

### Constructors

* [constructor](_entities_securitytoken_transfers_restrictions_countrestrictions_.countrestrictions.md#constructor)

### Properties

* [context](_entities_securitytoken_transfers_restrictions_countrestrictions_.countrestrictions.md#protected-context)
* [securityToken](_entities_securitytoken_transfers_restrictions_countrestrictions_.countrestrictions.md#protected-securitytoken)

### Methods

* [getMaxHolderCount](_entities_securitytoken_transfers_restrictions_countrestrictions_.countrestrictions.md#getmaxholdercount)
* [modifyMaxHolderCount](_entities_securitytoken_transfers_restrictions_countrestrictions_.countrestrictions.md#modifymaxholdercount)

## Constructors

### constructor

+ **new CountRestrictions**\(`securityToken`: [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md), `context`: [Context](_context_.context.md)\): [_CountRestrictions_](_entities_securitytoken_transfers_restrictions_countrestrictions_.countrestrictions.md)

_Inherited from_ [_SubModule_](_entities_securitytoken_submodule_.submodule.md)_._[_constructor_](_entities_securitytoken_submodule_.submodule.md#constructor)

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:10_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SubModule.ts#L10)

Create a new SubModule instance

**Parameters:**

| Name | Type |
| :--- | :--- |
| `securityToken` | [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md) |
| `context` | [Context](_context_.context.md) |

**Returns:** [_CountRestrictions_](_entities_securitytoken_transfers_restrictions_countrestrictions_.countrestrictions.md)

## Properties

### `Protected` context

• **context**: [_Context_](_context_.context.md)

_Inherited from_ [_SubModule_](_entities_securitytoken_submodule_.submodule.md)_._[_context_](_entities_securitytoken_submodule_.submodule.md#protected-context)

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:10_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SubModule.ts#L10)

### `Protected` securityToken

• **securityToken**: [_SecurityToken_](_entities_securitytoken_securitytoken_.securitytoken.md)

_Inherited from_ [_SubModule_](_entities_securitytoken_submodule_.submodule.md)_._[_securityToken_](_entities_securitytoken_submodule_.submodule.md#protected-securitytoken)

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:8_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SubModule.ts#L8)

## Methods

### getMaxHolderCount

▸ **getMaxHolderCount**\(\): _Promise‹number›_

_Defined in_ [_src/entities/SecurityToken/Transfers/Restrictions/CountRestrictions.ts:31_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Transfers/Restrictions/CountRestrictions.ts#L31)

Retrieve the maximum amonut of tokenholders allowed to hold the token at once Can be modified with `modifyMaxHolderCount`

**Returns:** _Promise‹number›_

### modifyMaxHolderCount

▸ **modifyMaxHolderCount**\(`args`: object\): _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_ModifyMaxHolderCountProcedureArgs_](../interfaces/_types_index_.modifymaxholdercountprocedureargs.md)_, void››_

_Defined in_ [_src/entities/SecurityToken/Transfers/Restrictions/CountRestrictions.ts:16_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Transfers/Restrictions/CountRestrictions.ts#L16)

Modify the maximum amount of tokenholders allowed to hold the token at once

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `maxHolderCount` | number |

**Returns:** _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_ModifyMaxHolderCountProcedureArgs_](../interfaces/_types_index_.modifymaxholdercountprocedureargs.md)_, void››_

