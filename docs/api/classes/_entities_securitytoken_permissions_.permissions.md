# Permissions

Namespace that handles all Permissions related functionality

## Hierarchy

* [SubModule](_entities_securitytoken_submodule_.submodule.md)

  ↳ **Permissions**

## Index

### Constructors

* [constructor](_entities_securitytoken_permissions_.permissions.md#constructor)

### Properties

* [context](_entities_securitytoken_permissions_.permissions.md#protected-context)
* [securityToken](_entities_securitytoken_permissions_.permissions.md#protected-securitytoken)

### Methods

* [assignRole](_entities_securitytoken_permissions_.permissions.md#assignrole)
* [getAllDelegates](_entities_securitytoken_permissions_.permissions.md#getalldelegates)
* [getAssignedRoles](_entities_securitytoken_permissions_.permissions.md#getassignedroles)
* [getAvailableRoles](_entities_securitytoken_permissions_.permissions.md#getavailableroles)
* [getDelegatesForRole](_entities_securitytoken_permissions_.permissions.md#getdelegatesforrole)
* [getFeatureFromRole](_entities_securitytoken_permissions_.permissions.md#getfeaturefromrole)
* [isRoleAvailable](_entities_securitytoken_permissions_.permissions.md#isroleavailable)
* [revokeRole](_entities_securitytoken_permissions_.permissions.md#revokerole)

### Object literals

* [rolesPerFeature](_entities_securitytoken_permissions_.permissions.md#rolesperfeature)

## Constructors

### constructor

+ **new Permissions**\(`securityToken`: [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md), `context`: [Context](_context_.context.md)\): [_Permissions_](_entities_securitytoken_permissions_.permissions.md)

_Inherited from_ [_SubModule_](_entities_securitytoken_submodule_.submodule.md)_._[_constructor_](_entities_securitytoken_submodule_.submodule.md#constructor)

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:10_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SubModule.ts#L10)

Create a new SubModule instance

**Parameters:**

| Name | Type |
| :--- | :--- |
| `securityToken` | [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md) |
| `context` | [Context](_context_.context.md) |

**Returns:** [_Permissions_](_entities_securitytoken_permissions_.permissions.md)

## Properties

### `Protected` context

• **context**: [_Context_](_context_.context.md)

_Inherited from_ [_SubModule_](_entities_securitytoken_submodule_.submodule.md)_._[_context_](_entities_securitytoken_submodule_.submodule.md#protected-context)

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:10_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SubModule.ts#L10)

### `Protected` securityToken

• **securityToken**: [_SecurityToken_](_entities_securitytoken_securitytoken_.securitytoken.md)

_Inherited from_ [_SubModule_](_entities_securitytoken_submodule_.submodule.md)_._[_securityToken_](_entities_securitytoken_submodule_.submodule.md#protected-securitytoken)

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:8_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SubModule.ts#L8)

## Methods

### assignRole

▸ **assignRole**\(`args`: object\): _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_AssignSecurityTokenRoleProcedureArgs_](../interfaces/_types_index_.assignsecuritytokenroleprocedureargs.md)_, void››_

_Defined in_ [_src/entities/SecurityToken/Permissions.ts:95_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Permissions.ts#L95)

Assign a role on the Security Token to a delegate

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `delegateAddress` | string |
| `description` | string |
| `role` | [SecurityTokenRole](../enums/_types_index_.securitytokenrole.md) |

**Returns:** _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_AssignSecurityTokenRoleProcedureArgs_](../interfaces/_types_index_.assignsecuritytokenroleprocedureargs.md)_, void››_

### getAllDelegates

▸ **getAllDelegates**\(\): _Promise‹object\[\]›_

_Defined in_ [_src/entities/SecurityToken/Permissions.ts:242_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Permissions.ts#L242)

Return a list of all delegates with their respective details and roles

**Returns:** _Promise‹object\[\]›_

### getAssignedRoles

▸ **getAssignedRoles**\(`args`: object\): _Promise‹_[_SecurityTokenRole_](../enums/_types_index_.securitytokenrole.md)_\[\]›_

_Defined in_ [_src/entities/SecurityToken/Permissions.ts:136_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Permissions.ts#L136)

Return the list of roles assigned to a delegate address

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `delegateAddress` | string |

**Returns:** _Promise‹_[_SecurityTokenRole_](../enums/_types_index_.securitytokenrole.md)_\[\]›_

### getAvailableRoles

▸ **getAvailableRoles**\(\): _Promise‹_[_SecurityTokenRole_](../enums/_types_index_.securitytokenrole.md)_\[\]›_

_Defined in_ [_src/entities/SecurityToken/Permissions.ts:25_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Permissions.ts#L25)

Get a list of all available roles. The returned roles depend on which features are enabled, as per:

| Feature | Roles |
| :--- | :--- |
| Permissions | Permissions Administrator |
| Tokenholders | Tokenholders Administrator |
| Dividends | Dividends Administrator, Dividends Operator |
| TokenholderCountRestrictions | Tokenholder Count Restrictions Administrator |
| PercentageOwnershipRestrictions | Percentage Ownership Restrictions Administrator |

**Returns:** _Promise‹_[_SecurityTokenRole_](../enums/_types_index_.securitytokenrole.md)_\[\]›_

### getDelegatesForRole

▸ **getDelegatesForRole**\(`args`: object\): _Promise‹object\[\]›_

_Defined in_ [_src/entities/SecurityToken/Permissions.ts:184_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Permissions.ts#L184)

Return the list of delegate addresses and details that hold a specific role

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `role` | [SecurityTokenRole](../enums/_types_index_.securitytokenrole.md) |

**Returns:** _Promise‹object\[\]›_

### getFeatureFromRole

▸ **getFeatureFromRole**\(`args`: object\): _Promise‹_[_Feature_](../enums/_types_index_.feature.md)_›_

_Defined in_ [_src/entities/SecurityToken/Permissions.ts:65_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Permissions.ts#L65)

Return which feature is associated with the supplied role

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `role` | [SecurityTokenRole](../enums/_types_index_.securitytokenrole.md) |

**Returns:** _Promise‹_[_Feature_](../enums/_types_index_.feature.md)_›_

### isRoleAvailable

▸ **isRoleAvailable**\(`args`: object\): _Promise‹boolean›_

_Defined in_ [_src/entities/SecurityToken/Permissions.ts:55_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Permissions.ts#L55)

Return whether a certain role is available to be assigned to delegates

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `role` | [SecurityTokenRole](../enums/_types_index_.securitytokenrole.md) |

**Returns:** _Promise‹boolean›_

### revokeRole

▸ **revokeRole**\(`args`: object\): _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_AssignSecurityTokenRoleProcedureArgs_](../interfaces/_types_index_.assignsecuritytokenroleprocedureargs.md)_, void››_

_Defined in_ [_src/entities/SecurityToken/Permissions.ts:117_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Permissions.ts#L117)

Remove a role from a delegate

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `delegateAddress` | string |
| `role` | [SecurityTokenRole](../enums/_types_index_.securitytokenrole.md) |

**Returns:** _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_AssignSecurityTokenRoleProcedureArgs_](../interfaces/_types_index_.assignsecuritytokenroleprocedureargs.md)_, void››_

## Object literals

### rolesPerFeature

### ▪ **rolesPerFeature**: _object_

_Defined in_ [_src/entities/SecurityToken/Permissions.ts:279_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Permissions.ts#L279)

### \_\_computed

• **\_\_computed**: [_SecurityTokenRole_](../enums/_types_index_.securitytokenrole.md)_\[\]_ = \[ SecurityTokenRole.PercentageOwnershipRestrictionsAdministrator, \]

_Defined in_ [_src/entities/SecurityToken/Permissions.ts:280_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Permissions.ts#L280)

_Defined in_ [_src/entities/SecurityToken/Permissions.ts:281_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Permissions.ts#L281)

_Defined in_ [_src/entities/SecurityToken/Permissions.ts:282_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Permissions.ts#L282)

_Defined in_ [_src/entities/SecurityToken/Permissions.ts:286_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Permissions.ts#L286)

_Defined in_ [_src/entities/SecurityToken/Permissions.ts:289_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Permissions.ts#L289)

