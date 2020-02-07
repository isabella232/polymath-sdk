# Class: Permissions

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

###  constructor

\+ **new Permissions**(`securityToken`: [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md), `context`: [Context](_context_.context.md)): *[Permissions](_entities_securitytoken_permissions_.permissions.md)*

*Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[constructor](_entities_securitytoken_submodule_.submodule.md#constructor)*

*Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/SubModule.ts#L10)*

Create a new SubModule instance

**Parameters:**

Name | Type |
------ | ------ |
`securityToken` | [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[Permissions](_entities_securitytoken_permissions_.permissions.md)*

## Properties

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[context](_entities_securitytoken_submodule_.submodule.md#protected-context)*

*Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/SubModule.ts#L10)*

___

### `Protected` securityToken

• **securityToken**: *[SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)*

*Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[securityToken](_entities_securitytoken_submodule_.submodule.md#protected-securitytoken)*

*Defined in [src/entities/SecurityToken/SubModule.ts:8](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/SubModule.ts#L8)*

## Methods

###  assignRole

▸ **assignRole**(`args`: object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[AssignSecurityTokenRoleProcedureArgs](../interfaces/_types_index_.assignsecuritytokenroleprocedureargs.md), void››*

*Defined in [src/entities/SecurityToken/Permissions.ts:95](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Permissions.ts#L95)*

Assign a role on the Security Token to a delegate

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`delegateAddress` | string |
`description` | string |
`role` | [SecurityTokenRole](../enums/_types_index_.securitytokenrole.md) |

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[AssignSecurityTokenRoleProcedureArgs](../interfaces/_types_index_.assignsecuritytokenroleprocedureargs.md), void››*

___

###  getAllDelegates

▸ **getAllDelegates**(): *Promise‹object[]›*

*Defined in [src/entities/SecurityToken/Permissions.ts:242](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Permissions.ts#L242)*

Return a list of all delegates with their respective details and roles

**Returns:** *Promise‹object[]›*

___

###  getAssignedRoles

▸ **getAssignedRoles**(`args`: object): *Promise‹[SecurityTokenRole](../enums/_types_index_.securitytokenrole.md)[]›*

*Defined in [src/entities/SecurityToken/Permissions.ts:136](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Permissions.ts#L136)*

Return the list of roles assigned to a delegate address

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`delegateAddress` | string |

**Returns:** *Promise‹[SecurityTokenRole](../enums/_types_index_.securitytokenrole.md)[]›*

___

###  getAvailableRoles

▸ **getAvailableRoles**(): *Promise‹[SecurityTokenRole](../enums/_types_index_.securitytokenrole.md)[]›*

*Defined in [src/entities/SecurityToken/Permissions.ts:25](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Permissions.ts#L25)*

Get a list of all available roles.
The returned roles depend on which features are enabled, as per:

| Feature                         | Roles                                           |
|---------------------------------|-------------------------------------------------|
| Permissions                     | Permissions Administrator                       |
| Shareholders                    | Shareholders Administrator                      |
| Dividends                       | Dividends Administrator, Dividends Operator     |
| ShareholderCountRestrictions    | Shareholder Count Restrictions Administrator    |
| PercentageOwnershipRestrictions | Percentage Ownership Restrictions Administrator |

**Returns:** *Promise‹[SecurityTokenRole](../enums/_types_index_.securitytokenrole.md)[]›*

___

###  getDelegatesForRole

▸ **getDelegatesForRole**(`args`: object): *Promise‹object[]›*

*Defined in [src/entities/SecurityToken/Permissions.ts:184](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Permissions.ts#L184)*

Return the list of delegate addresses and details that hold a specific role

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`role` | [SecurityTokenRole](../enums/_types_index_.securitytokenrole.md) |

**Returns:** *Promise‹object[]›*

___

###  getFeatureFromRole

▸ **getFeatureFromRole**(`args`: object): *Promise‹[Feature](../enums/_types_index_.feature.md)›*

*Defined in [src/entities/SecurityToken/Permissions.ts:65](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Permissions.ts#L65)*

Return which feature is associated with the supplied role

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`role` | [SecurityTokenRole](../enums/_types_index_.securitytokenrole.md) |

**Returns:** *Promise‹[Feature](../enums/_types_index_.feature.md)›*

___

###  isRoleAvailable

▸ **isRoleAvailable**(`args`: object): *Promise‹boolean›*

*Defined in [src/entities/SecurityToken/Permissions.ts:55](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Permissions.ts#L55)*

Return whether a certain role is available to be assigned to delegates

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`role` | [SecurityTokenRole](../enums/_types_index_.securitytokenrole.md) |

**Returns:** *Promise‹boolean›*

___

###  revokeRole

▸ **revokeRole**(`args`: object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[AssignSecurityTokenRoleProcedureArgs](../interfaces/_types_index_.assignsecuritytokenroleprocedureargs.md), void››*

*Defined in [src/entities/SecurityToken/Permissions.ts:117](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Permissions.ts#L117)*

Remove a role from a delegate

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`delegateAddress` | string |
`role` | [SecurityTokenRole](../enums/_types_index_.securitytokenrole.md) |

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[AssignSecurityTokenRoleProcedureArgs](../interfaces/_types_index_.assignsecuritytokenroleprocedureargs.md), void››*

## Object literals

###  rolesPerFeature

### ▪ **rolesPerFeature**: *object*

*Defined in [src/entities/SecurityToken/Permissions.ts:279](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Permissions.ts#L279)*

###  __computed

• **__computed**: *[SecurityTokenRole](../enums/_types_index_.securitytokenrole.md)[]* =  [
      SecurityTokenRole.PercentageOwnershipRestrictionsAdministrator,
    ]

*Defined in [src/entities/SecurityToken/Permissions.ts:280](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Permissions.ts#L280)*

*Defined in [src/entities/SecurityToken/Permissions.ts:281](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Permissions.ts#L281)*

*Defined in [src/entities/SecurityToken/Permissions.ts:282](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Permissions.ts#L282)*

*Defined in [src/entities/SecurityToken/Permissions.ts:286](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Permissions.ts#L286)*

*Defined in [src/entities/SecurityToken/Permissions.ts:289](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Permissions.ts#L289)*
