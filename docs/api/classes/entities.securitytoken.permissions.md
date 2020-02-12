# Class: Permissions

Namespace that handles all Permissions related functionality

## Hierarchy

* [SubModule](entities.securitytoken.submodule.md)

  ↳ **Permissions**

## Index

### Constructors

* [constructor](entities.securitytoken.permissions.md#constructor)

### Properties

* [context](entities.securitytoken.permissions.md#protected-context)
* [securityToken](entities.securitytoken.permissions.md#protected-securitytoken)

### Methods

* [assignRole](entities.securitytoken.permissions.md#assignrole)
* [getAllDelegates](entities.securitytoken.permissions.md#getalldelegates)
* [getAssignedRoles](entities.securitytoken.permissions.md#getassignedroles)
* [getAvailableRoles](entities.securitytoken.permissions.md#getavailableroles)
* [getDelegatesForRole](entities.securitytoken.permissions.md#getdelegatesforrole)
* [getFeatureFromRole](entities.securitytoken.permissions.md#getfeaturefromrole)
* [isRoleAvailable](entities.securitytoken.permissions.md#isroleavailable)
* [revokeRole](entities.securitytoken.permissions.md#revokerole)

### Object literals

* [rolesPerFeature](entities.securitytoken.permissions.md#rolesperfeature)

## Constructors

###  constructor

\+ **new Permissions**(`securityToken`: [SecurityToken](entities.securitytoken.securitytoken.md), `context`: [Context](_context_.context.md)): *[Permissions](entities.securitytoken.permissions.md)*

*Inherited from [SubModule](entities.securitytoken.submodule.md).[constructor](entities.securitytoken.submodule.md#constructor)*

*Defined in [src/entities/SecurityToken/SubModule.ts:15](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SecurityToken/SubModule.ts#L15)*

Create a new SubModule instance

**Parameters:**

Name | Type |
------ | ------ |
`securityToken` | [SecurityToken](entities.securitytoken.securitytoken.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[Permissions](entities.securitytoken.permissions.md)*

## Properties

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from [SubModule](entities.securitytoken.submodule.md).[context](entities.securitytoken.submodule.md#protected-context)*

*Defined in [src/entities/SecurityToken/SubModule.ts:15](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SecurityToken/SubModule.ts#L15)*

___

### `Protected` securityToken

• **securityToken**: *[SecurityToken](entities.securitytoken.securitytoken.md)*

*Inherited from [SubModule](entities.securitytoken.submodule.md).[securityToken](entities.securitytoken.submodule.md#protected-securitytoken)*

*Defined in [src/entities/SecurityToken/SubModule.ts:13](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SecurityToken/SubModule.ts#L13)*

## Methods

###  assignRole

▸ **assignRole**(`args`: object): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹AssignSecurityTokenRoleProcedureArgs, void››*

*Defined in [src/entities/SecurityToken/Permissions.ts:100](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SecurityToken/Permissions.ts#L100)*

Assign a role on the Security Token to a delegate

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹AssignSecurityTokenRoleProcedureArgs, void››*

___

###  getAllDelegates

▸ **getAllDelegates**(): *Promise‹object[]›*

*Defined in [src/entities/SecurityToken/Permissions.ts:247](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SecurityToken/Permissions.ts#L247)*

Return a list of all delegates with their respective details and roles

**Returns:** *Promise‹object[]›*

___

###  getAssignedRoles

▸ **getAssignedRoles**(`args`: object): *Promise‹SecurityTokenRole[]›*

*Defined in [src/entities/SecurityToken/Permissions.ts:141](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SecurityToken/Permissions.ts#L141)*

Return the list of roles assigned to a delegate address

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *Promise‹SecurityTokenRole[]›*

___

###  getAvailableRoles

▸ **getAvailableRoles**(): *Promise‹SecurityTokenRole[]›*

*Defined in [src/entities/SecurityToken/Permissions.ts:30](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SecurityToken/Permissions.ts#L30)*

Get a list of all available roles.
The returned roles depend on which features are enabled, as per:

| Feature                         | Roles                                           |
|---------------------------------|-------------------------------------------------|
| Permissions                     | Permissions Administrator                       |
| Shareholders                    | Shareholders Administrator                      |
| Dividends                       | Dividends Administrator, Dividends Operator     |
| ShareholderCountRestrictions    | Shareholder Count Restrictions Administrator    |
| PercentageOwnershipRestrictions | Percentage Ownership Restrictions Administrator |

**Returns:** *Promise‹SecurityTokenRole[]›*

___

###  getDelegatesForRole

▸ **getDelegatesForRole**(`args`: object): *Promise‹object[]›*

*Defined in [src/entities/SecurityToken/Permissions.ts:189](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SecurityToken/Permissions.ts#L189)*

Return the list of delegate addresses and details that hold a specific role

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *Promise‹object[]›*

___

###  getFeatureFromRole

▸ **getFeatureFromRole**(`args`: object): *Promise‹Feature›*

*Defined in [src/entities/SecurityToken/Permissions.ts:70](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SecurityToken/Permissions.ts#L70)*

Return which feature is associated with the supplied role

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *Promise‹Feature›*

___

###  isRoleAvailable

▸ **isRoleAvailable**(`args`: object): *Promise‹boolean›*

*Defined in [src/entities/SecurityToken/Permissions.ts:60](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SecurityToken/Permissions.ts#L60)*

Return whether a certain role is available to be assigned to delegates

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *Promise‹boolean›*

___

###  revokeRole

▸ **revokeRole**(`args`: object): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹AssignSecurityTokenRoleProcedureArgs, void››*

*Defined in [src/entities/SecurityToken/Permissions.ts:122](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SecurityToken/Permissions.ts#L122)*

Remove a role from a delegate

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹AssignSecurityTokenRoleProcedureArgs, void››*

## Object literals

###  rolesPerFeature

### ▪ **rolesPerFeature**: *object*

*Defined in [src/entities/SecurityToken/Permissions.ts:284](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SecurityToken/Permissions.ts#L284)*

###  __computed

• **__computed**: *SecurityTokenRole[]* =  [
      SecurityTokenRole.PercentageOwnershipRestrictionsAdministrator,
    ]

*Defined in [src/entities/SecurityToken/Permissions.ts:285](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SecurityToken/Permissions.ts#L285)*

*Defined in [src/entities/SecurityToken/Permissions.ts:286](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SecurityToken/Permissions.ts#L286)*

*Defined in [src/entities/SecurityToken/Permissions.ts:287](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SecurityToken/Permissions.ts#L287)*

*Defined in [src/entities/SecurityToken/Permissions.ts:291](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SecurityToken/Permissions.ts#L291)*

*Defined in [src/entities/SecurityToken/Permissions.ts:294](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SecurityToken/Permissions.ts#L294)*
