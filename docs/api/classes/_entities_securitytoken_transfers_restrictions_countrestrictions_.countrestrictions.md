# Class: CountRestrictions

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

###  constructor

\+ **new CountRestrictions**(`securityToken`: [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md), `context`: [Context](_context_.context.md)): *[CountRestrictions](_entities_securitytoken_transfers_restrictions_countrestrictions_.countrestrictions.md)*

*Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[constructor](_entities_securitytoken_submodule_.submodule.md#constructor)*

*Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SubModule.ts#L10)*

Create a new SubModule instance

**Parameters:**

Name | Type |
------ | ------ |
`securityToken` | [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[CountRestrictions](_entities_securitytoken_transfers_restrictions_countrestrictions_.countrestrictions.md)*

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

###  getMaxHolderCount

▸ **getMaxHolderCount**(): *Promise‹number›*

*Defined in [src/entities/SecurityToken/Transfers/Restrictions/CountRestrictions.ts:31](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Transfers/Restrictions/CountRestrictions.ts#L31)*

Retrieve the maximum amonut of tokenholders allowed to hold the token at once
Can be modified with `modifyMaxHolderCount`

**Returns:** *Promise‹number›*

___

###  modifyMaxHolderCount

▸ **modifyMaxHolderCount**(`args`: object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ModifyMaxHolderCountProcedureArgs](../interfaces/_types_index_.modifymaxholdercountprocedureargs.md), void››*

*Defined in [src/entities/SecurityToken/Transfers/Restrictions/CountRestrictions.ts:16](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Transfers/Restrictions/CountRestrictions.ts#L16)*

Modify the maximum amount of tokenholders allowed to hold the token at once

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`maxHolderCount` | number |

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ModifyMaxHolderCountProcedureArgs](../interfaces/_types_index_.modifymaxholdercountprocedureargs.md), void››*
