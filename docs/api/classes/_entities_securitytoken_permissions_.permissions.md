# Class: Permissions

Namespace that handles all Permissions related functionality

## Hierarchy

- [SubModule](_entities_securitytoken_submodule_.submodule.md)

  ↳ **Permissions**

## Index

### Constructors

- [constructor](_entities_securitytoken_permissions_.permissions.md#constructor)

### Properties

- [context](_entities_securitytoken_permissions_.permissions.md#protected-context)
- [securityToken](_entities_securitytoken_permissions_.permissions.md#protected-securitytoken)

### Methods

- [assignRole](_entities_securitytoken_permissions_.permissions.md#assignrole)
- [getAllDelegates](_entities_securitytoken_permissions_.permissions.md#getalldelegates)
- [getAssignedRoles](_entities_securitytoken_permissions_.permissions.md#getassignedroles)
- [getAvailableRoles](_entities_securitytoken_permissions_.permissions.md#getavailableroles)
- [getDelegatesForRole](_entities_securitytoken_permissions_.permissions.md#getdelegatesforrole)
- [getFeatureFromRole](_entities_securitytoken_permissions_.permissions.md#getfeaturefromrole)
- [isRoleAvailable](_entities_securitytoken_permissions_.permissions.md#isroleavailable)
- [revokeRole](_entities_securitytoken_permissions_.permissions.md#revokerole)

### Object literals

- [rolesPerFeature](_entities_securitytoken_permissions_.permissions.md#rolesperfeature)

## Constructors

### constructor

\+ **new Permissions**(`securityToken`: [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md), `context`: [Context](_context_.context.md)): _[Permissions](_entities_securitytoken_permissions_.permissions.md)_

_Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[constructor](_entities_securitytoken_submodule_.submodule.md#constructor)_

_Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/SubModule.ts#L10)_

Create a new SubModule instance

**Parameters:**

| Name            | Type                                                                     |
| --------------- | ------------------------------------------------------------------------ |
| `securityToken` | [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md) |
| `context`       | [Context](_context_.context.md)                                          |

**Returns:** _[Permissions](_entities_securitytoken_permissions_.permissions.md)_

## Properties

### `Protected` context

• **context**: _[Context](_context_.context.md)_

_Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[context](_entities_securitytoken_submodule_.submodule.md#protected-context)_

_Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/SubModule.ts#L10)_

---

### `Protected` securityToken

• **securityToken**: _[SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)_

_Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[securityToken](_entities_securitytoken_submodule_.submodule.md#protected-securitytoken)_

_Defined in [src/entities/SecurityToken/SubModule.ts:8](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/SubModule.ts#L8)_

## Methods

### assignRole

▸ **assignRole**(`args`: object): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[AssignSecurityTokenRoleProcedureArgs](../interfaces/_types_index_.assignsecuritytokenroleprocedureargs.md), void››_

_Defined in [src/entities/SecurityToken/Permissions.ts:95](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Permissions.ts#L95)_

Assign a role on the Security Token to a delegate

**Parameters:**

▪ **args**: _object_

| Name              | Type                                                             |
| ----------------- | ---------------------------------------------------------------- |
| `delegateAddress` | string                                                           |
| `description`     | string                                                           |
| `role`            | [SecurityTokenRole](../enums/_types_index_.securitytokenrole.md) |

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[AssignSecurityTokenRoleProcedureArgs](../interfaces/_types_index_.assignsecuritytokenroleprocedureargs.md), void››_

---

### getAllDelegates

▸ **getAllDelegates**(): _Promise‹object[]›_

_Defined in [src/entities/SecurityToken/Permissions.ts:242](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Permissions.ts#L242)_

Return a list of all delegates with their respective details and roles

**Returns:** _Promise‹object[]›_

---

### getAssignedRoles

▸ **getAssignedRoles**(`args`: object): _Promise‹[SecurityTokenRole](../enums/_types_index_.securitytokenrole.md)[]›_

_Defined in [src/entities/SecurityToken/Permissions.ts:136](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Permissions.ts#L136)_

Return the list of roles assigned to a delegate address

**Parameters:**

▪ **args**: _object_

| Name              | Type   |
| ----------------- | ------ |
| `delegateAddress` | string |

**Returns:** _Promise‹[SecurityTokenRole](../enums/_types_index_.securitytokenrole.md)[]›_

---

### getAvailableRoles

▸ **getAvailableRoles**(): _Promise‹[SecurityTokenRole](../enums/_types_index_.securitytokenrole.md)[]›_

_Defined in [src/entities/SecurityToken/Permissions.ts:25](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Permissions.ts#L25)_

Get a list of all available roles.
The returned roles depend on which features are enabled, as per:

| Feature                         | Roles                                           |
| ------------------------------- | ----------------------------------------------- |
| Permissions                     | Permissions Administrator                       |
| Shareholders                    | Shareholders Administrator                      |
| Dividends                       | Dividends Administrator, Dividends Operator     |
| ShareholderCountRestrictions    | Shareholder Count Restrictions Administrator    |
| PercentageOwnershipRestrictions | Percentage Ownership Restrictions Administrator |

**Returns:** _Promise‹[SecurityTokenRole](../enums/_types_index_.securitytokenrole.md)[]›_

---

### getDelegatesForRole

▸ **getDelegatesForRole**(`args`: object): _Promise‹object[]›_

_Defined in [src/entities/SecurityToken/Permissions.ts:184](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Permissions.ts#L184)_

Return the list of delegate addresses and details that hold a specific role

**Parameters:**

▪ **args**: _object_

| Name   | Type                                                             |
| ------ | ---------------------------------------------------------------- |
| `role` | [SecurityTokenRole](../enums/_types_index_.securitytokenrole.md) |

**Returns:** _Promise‹object[]›_

---

### getFeatureFromRole

▸ **getFeatureFromRole**(`args`: object): _Promise‹[Feature](../enums/_types_index_.feature.md)›_

_Defined in [src/entities/SecurityToken/Permissions.ts:65](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Permissions.ts#L65)_

Return which feature is associated with the supplied role

**Parameters:**

▪ **args**: _object_

| Name   | Type                                                             |
| ------ | ---------------------------------------------------------------- |
| `role` | [SecurityTokenRole](../enums/_types_index_.securitytokenrole.md) |

**Returns:** _Promise‹[Feature](../enums/_types_index_.feature.md)›_

---

### isRoleAvailable

▸ **isRoleAvailable**(`args`: object): _Promise‹boolean›_

_Defined in [src/entities/SecurityToken/Permissions.ts:55](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Permissions.ts#L55)_

Return whether a certain role is available to be assigned to delegates

**Parameters:**

▪ **args**: _object_

| Name   | Type                                                             |
| ------ | ---------------------------------------------------------------- |
| `role` | [SecurityTokenRole](../enums/_types_index_.securitytokenrole.md) |

**Returns:** _Promise‹boolean›_

---

### revokeRole

▸ **revokeRole**(`args`: object): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[AssignSecurityTokenRoleProcedureArgs](../interfaces/_types_index_.assignsecuritytokenroleprocedureargs.md), void››_

_Defined in [src/entities/SecurityToken/Permissions.ts:117](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Permissions.ts#L117)_

Remove a role from a delegate

**Parameters:**

▪ **args**: _object_

| Name              | Type                                                             |
| ----------------- | ---------------------------------------------------------------- |
| `delegateAddress` | string                                                           |
| `role`            | [SecurityTokenRole](../enums/_types_index_.securitytokenrole.md) |

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[AssignSecurityTokenRoleProcedureArgs](../interfaces/_types_index_.assignsecuritytokenroleprocedureargs.md), void››_

## Object literals

### rolesPerFeature

### ▪ **rolesPerFeature**: _object_

_Defined in [src/entities/SecurityToken/Permissions.ts:279](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Permissions.ts#L279)_

### \_\_computed

• **\_\_computed**: _[SecurityTokenRole](../enums/_types_index_.securitytokenrole.md)[]_ = [
SecurityTokenRole.PercentageOwnershipRestrictionsAdministrator,
]

_Defined in [src/entities/SecurityToken/Permissions.ts:280](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Permissions.ts#L280)_

_Defined in [src/entities/SecurityToken/Permissions.ts:281](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Permissions.ts#L281)_

_Defined in [src/entities/SecurityToken/Permissions.ts:282](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Permissions.ts#L282)_

_Defined in [src/entities/SecurityToken/Permissions.ts:286](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Permissions.ts#L286)_

_Defined in [src/entities/SecurityToken/Permissions.ts:289](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Permissions.ts#L289)_
