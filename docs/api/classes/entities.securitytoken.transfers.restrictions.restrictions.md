# Class: Restrictions

Namespace that handles all Transfer Restriction related functionality

## Hierarchy

* [SubModule](entities.securitytoken.submodule.md)

  ↳ **Restrictions**

## Index

### Constructors

* [constructor](entities.securitytoken.transfers.restrictions.restrictions.md#constructor)

### Properties

* [context](entities.securitytoken.transfers.restrictions.restrictions.md#protected-context)
* [count](entities.securitytoken.transfers.restrictions.restrictions.md#count)
* [percentage](entities.securitytoken.transfers.restrictions.restrictions.md#percentage)
* [securityToken](entities.securitytoken.transfers.restrictions.restrictions.md#protected-securitytoken)

## Constructors

###  constructor

\+ **new Restrictions**(`securityToken`: [SecurityToken](entities.securitytoken.securitytoken.md), `context`: [Context](_context_.context.md)): *[Restrictions](entities.securitytoken.transfers.restrictions.restrictions.md)*

*Overrides [SubModule](entities.securitytoken.submodule.md).[constructor](entities.securitytoken.submodule.md#constructor)*

*Defined in [src/entities/SecurityToken/Transfers/Restrictions/Restrictions.ts:18](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SecurityToken/Transfers/Restrictions/Restrictions.ts#L18)*

Create a new Restrictions instance

**Parameters:**

Name | Type |
------ | ------ |
`securityToken` | [SecurityToken](entities.securitytoken.securitytoken.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[Restrictions](entities.securitytoken.transfers.restrictions.restrictions.md)*

## Properties

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from [SubModule](entities.securitytoken.submodule.md).[context](entities.securitytoken.submodule.md#protected-context)*

*Defined in [src/entities/SecurityToken/SubModule.ts:15](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SecurityToken/SubModule.ts#L15)*

___

###  count

• **count**: *[CountRestrictions](entities.securitytoken.transfers.restrictions.countrestrictions.md)*

*Defined in [src/entities/SecurityToken/Transfers/Restrictions/Restrictions.ts:16](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SecurityToken/Transfers/Restrictions/Restrictions.ts#L16)*

___

###  percentage

• **percentage**: *[PercentageRestrictions](entities.securitytoken.transfers.restrictions.percentagerestrictions.md)*

*Defined in [src/entities/SecurityToken/Transfers/Restrictions/Restrictions.ts:18](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SecurityToken/Transfers/Restrictions/Restrictions.ts#L18)*

___

### `Protected` securityToken

• **securityToken**: *[SecurityToken](entities.securitytoken.securitytoken.md)*

*Inherited from [SubModule](entities.securitytoken.submodule.md).[securityToken](entities.securitytoken.submodule.md#protected-securitytoken)*

*Defined in [src/entities/SecurityToken/SubModule.ts:13](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SecurityToken/SubModule.ts#L13)*
