# Class: Restrictions

Namespace that handles all Transfer Restriction related functionality

## Hierarchy

* [SubModule](_entities_securitytoken_submodule_.submodule.md)

  ↳ **Restrictions**

## Index

### Constructors

* [constructor](_entities_securitytoken_transfers_restrictions_restrictions_.restrictions.md#constructor)

### Properties

* [context](_entities_securitytoken_transfers_restrictions_restrictions_.restrictions.md#protected-context)
* [count](_entities_securitytoken_transfers_restrictions_restrictions_.restrictions.md#count)
* [percentage](_entities_securitytoken_transfers_restrictions_restrictions_.restrictions.md#percentage)
* [securityToken](_entities_securitytoken_transfers_restrictions_restrictions_.restrictions.md#protected-securitytoken)

## Constructors

###  constructor

\+ **new Restrictions**(`securityToken`: [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md), `context`: [Context](_context_.context.md)): *[Restrictions](_entities_securitytoken_transfers_restrictions_restrictions_.restrictions.md)*

*Overrides [SubModule](_entities_securitytoken_submodule_.submodule.md).[constructor](_entities_securitytoken_submodule_.submodule.md#constructor)*

*Defined in [src/entities/SecurityToken/Transfers/Restrictions/Restrictions.ts:13](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Transfers/Restrictions/Restrictions.ts#L13)*

Create a new Restrictions instance

**Parameters:**

Name | Type |
------ | ------ |
`securityToken` | [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[Restrictions](_entities_securitytoken_transfers_restrictions_restrictions_.restrictions.md)*

## Properties

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[context](_entities_securitytoken_submodule_.submodule.md#protected-context)*

*Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/SubModule.ts#L10)*

___

###  count

• **count**: *[CountRestrictions](_entities_securitytoken_transfers_restrictions_countrestrictions_.countrestrictions.md)*

*Defined in [src/entities/SecurityToken/Transfers/Restrictions/Restrictions.ts:11](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Transfers/Restrictions/Restrictions.ts#L11)*

___

###  percentage

• **percentage**: *[PercentageRestrictions](_entities_securitytoken_transfers_restrictions_percentagerestrictions_.percentagerestrictions.md)*

*Defined in [src/entities/SecurityToken/Transfers/Restrictions/Restrictions.ts:13](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Transfers/Restrictions/Restrictions.ts#L13)*

___

### `Protected` securityToken

• **securityToken**: *[SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)*

*Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[securityToken](_entities_securitytoken_submodule_.submodule.md#protected-securitytoken)*

*Defined in [src/entities/SecurityToken/SubModule.ts:8](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/SubModule.ts#L8)*
