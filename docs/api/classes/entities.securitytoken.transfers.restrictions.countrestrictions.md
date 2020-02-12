# Class: CountRestrictions

Namespace that handles all Count Restriction related functionality

## Hierarchy

* [SubModule](entities.securitytoken.submodule.md)

  ↳ **CountRestrictions**

## Index

### Constructors

* [constructor](entities.securitytoken.transfers.restrictions.countrestrictions.md#constructor)

### Properties

* [context](entities.securitytoken.transfers.restrictions.countrestrictions.md#protected-context)
* [securityToken](entities.securitytoken.transfers.restrictions.countrestrictions.md#protected-securitytoken)

### Methods

* [getMaxHolderCount](entities.securitytoken.transfers.restrictions.countrestrictions.md#getmaxholdercount)
* [modifyMaxHolderCount](entities.securitytoken.transfers.restrictions.countrestrictions.md#modifymaxholdercount)

## Constructors

###  constructor

\+ **new CountRestrictions**(`securityToken`: [SecurityToken](entities.securitytoken.securitytoken.md), `context`: [Context](_context_.context.md)): *[CountRestrictions](entities.securitytoken.transfers.restrictions.countrestrictions.md)*

*Inherited from [SubModule](entities.securitytoken.submodule.md).[constructor](entities.securitytoken.submodule.md#constructor)*

*Defined in [src/entities/SecurityToken/SubModule.ts:15](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/SubModule.ts#L15)*

Create a new SubModule instance

**Parameters:**

Name | Type |
------ | ------ |
`securityToken` | [SecurityToken](entities.securitytoken.securitytoken.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[CountRestrictions](entities.securitytoken.transfers.restrictions.countrestrictions.md)*

## Properties

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from [SubModule](entities.securitytoken.submodule.md).[context](entities.securitytoken.submodule.md#protected-context)*

*Defined in [src/entities/SecurityToken/SubModule.ts:15](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/SubModule.ts#L15)*

___

### `Protected` securityToken

• **securityToken**: *[SecurityToken](entities.securitytoken.securitytoken.md)*

*Inherited from [SubModule](entities.securitytoken.submodule.md).[securityToken](entities.securitytoken.submodule.md#protected-securitytoken)*

*Defined in [src/entities/SecurityToken/SubModule.ts:13](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/SubModule.ts#L13)*

## Methods

###  getMaxHolderCount

▸ **getMaxHolderCount**(): *Promise‹number›*

*Defined in [src/entities/SecurityToken/Transfers/Restrictions/CountRestrictions.ts:36](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/Transfers/Restrictions/CountRestrictions.ts#L36)*

Retrieve the maximum amonut of shareholders allowed to hold the token at once
Can be modified with `modifyMaxHolderCount`

**Returns:** *Promise‹number›*

___

###  modifyMaxHolderCount

▸ **modifyMaxHolderCount**(`args`: object): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹[ModifyMaxHolderCountProcedureArgs](../interfaces/_types_index_.modifymaxholdercountprocedureargs.md), void››*

*Defined in [src/entities/SecurityToken/Transfers/Restrictions/CountRestrictions.ts:21](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/Transfers/Restrictions/CountRestrictions.ts#L21)*

Modify the maximum amount of shareholders allowed to hold the token at once

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`maxHolderCount` | number |

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹[ModifyMaxHolderCountProcedureArgs](../interfaces/_types_index_.modifymaxholdercountprocedureargs.md), void››*
