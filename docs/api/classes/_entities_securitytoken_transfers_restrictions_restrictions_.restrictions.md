# Class: Restrictions

Namespace that handles all Transfer Restriction related functionality

## Hierarchy

- [SubModule](_entities_securitytoken_submodule_.submodule.md)

  ↳ **Restrictions**

## Index

### Constructors

- [constructor](_entities_securitytoken_transfers_restrictions_restrictions_.restrictions.md#constructor)

### Properties

- [context](_entities_securitytoken_transfers_restrictions_restrictions_.restrictions.md#protected-context)
- [count](_entities_securitytoken_transfers_restrictions_restrictions_.restrictions.md#count)
- [percentage](_entities_securitytoken_transfers_restrictions_restrictions_.restrictions.md#percentage)
- [securityToken](_entities_securitytoken_transfers_restrictions_restrictions_.restrictions.md#protected-securitytoken)

## Constructors

### constructor

\+ **new Restrictions**(`securityToken`: [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md), `context`: [Context](_context_.context.md)): _[Restrictions](_entities_securitytoken_transfers_restrictions_restrictions_.restrictions.md)_

_Overrides [SubModule](_entities_securitytoken_submodule_.submodule.md).[constructor](_entities_securitytoken_submodule_.submodule.md#constructor)_

_Defined in [src/entities/SecurityToken/Transfers/Restrictions/Restrictions.ts:13](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityToken/Transfers/Restrictions/Restrictions.ts#L13)_

Create a new Restrictions instance

**Parameters:**

| Name            | Type                                                                     |
| --------------- | ------------------------------------------------------------------------ |
| `securityToken` | [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md) |
| `context`       | [Context](_context_.context.md)                                          |

**Returns:** _[Restrictions](_entities_securitytoken_transfers_restrictions_restrictions_.restrictions.md)_

## Properties

### `Protected` context

• **context**: _[Context](_context_.context.md)_

_Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[context](_entities_securitytoken_submodule_.submodule.md#protected-context)_

_Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityToken/SubModule.ts#L10)_

---

### count

• **count**: _[CountRestrictions](_entities_securitytoken_transfers_restrictions_countrestrictions_.countrestrictions.md)_

_Defined in [src/entities/SecurityToken/Transfers/Restrictions/Restrictions.ts:11](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityToken/Transfers/Restrictions/Restrictions.ts#L11)_

---

### percentage

• **percentage**: _[PercentageRestrictions](_entities_securitytoken_transfers_restrictions_percentagerestrictions_.percentagerestrictions.md)_

_Defined in [src/entities/SecurityToken/Transfers/Restrictions/Restrictions.ts:13](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityToken/Transfers/Restrictions/Restrictions.ts#L13)_

---

### `Protected` securityToken

• **securityToken**: _[SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)_

_Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[securityToken](_entities_securitytoken_submodule_.submodule.md#protected-securitytoken)_

_Defined in [src/entities/SecurityToken/SubModule.ts:8](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityToken/SubModule.ts#L8)_
