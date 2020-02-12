# Class: Offerings

Namespace that handles all Offering related functionality

## Hierarchy

* [SubModule](entities.securitytoken.submodule.md)

  ↳ **Offerings**

## Index

### Constructors

* [constructor](entities.securitytoken.issuance.offerings.md#constructor)

### Properties

* [context](entities.securitytoken.issuance.offerings.md#protected-context)
* [securityToken](entities.securitytoken.issuance.offerings.md#protected-securitytoken)

### Methods

* [getSto](entities.securitytoken.issuance.offerings.md#getsto)
* [getStos](entities.securitytoken.issuance.offerings.md#getstos)
* [launchSimpleSto](entities.securitytoken.issuance.offerings.md#launchsimplesto)
* [launchTieredSto](entities.securitytoken.issuance.offerings.md#launchtieredsto)

## Constructors

###  constructor

\+ **new Offerings**(`securityToken`: [SecurityToken](entities.securitytoken.securitytoken.md), `context`: [Context](_context_.context.md)): *[Offerings](entities.securitytoken.issuance.offerings.md)*

*Inherited from [SubModule](entities.securitytoken.submodule.md).[constructor](entities.securitytoken.submodule.md#constructor)*

*Defined in [src/entities/SecurityToken/SubModule.ts:15](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityToken/SubModule.ts#L15)*

Create a new SubModule instance

**Parameters:**

Name | Type |
------ | ------ |
`securityToken` | [SecurityToken](entities.securitytoken.securitytoken.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[Offerings](entities.securitytoken.issuance.offerings.md)*

## Properties

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from [SubModule](entities.securitytoken.submodule.md).[context](entities.securitytoken.submodule.md#protected-context)*

*Defined in [src/entities/SecurityToken/SubModule.ts:15](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityToken/SubModule.ts#L15)*

___

### `Protected` securityToken

• **securityToken**: *[SecurityToken](entities.securitytoken.securitytoken.md)*

*Inherited from [SubModule](entities.securitytoken.submodule.md).[securityToken](entities.securitytoken.submodule.md#protected-securitytoken)*

*Defined in [src/entities/SecurityToken/SubModule.ts:13](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityToken/SubModule.ts#L13)*

## Methods

###  getSto

▸ **getSto**(`args`: [GetStoParams](../interfaces/entities.securitytoken.issuance.getstoparams.md) | string): *Promise‹any›*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:228](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityToken/Issuance/Offerings.ts#L228)*

Retrieve an STO by type and address or UUID

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`args` | [GetStoParams](../interfaces/entities.securitytoken.issuance.getstoparams.md) &#124; string | STO uuid or object containing its type and address  |

**Returns:** *Promise‹any›*

___

###  getStos

▸ **getStos**(`opts`: object): *Promise‹[SimpleSto](entities.simplesto.md) | [TieredSto](entities.tieredsto.md)[]›*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:265](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityToken/Issuance/Offerings.ts#L265)*

Retrieve all STOs attached to a security token

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`opts` | object |  {
      stoTypes: [StoType.Simple, StoType.Tiered],
    } |

**Returns:** *Promise‹[SimpleSto](entities.simplesto.md) | [TieredSto](entities.tieredsto.md)[]›*

___

###  launchSimpleSto

▸ **launchSimpleSto**(`args`: object): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹LaunchSimpleStoProcedureArgs, [SimpleSto](entities.simplesto.md)››*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:173](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityToken/Issuance/Offerings.ts#L173)*

Launch a Simple STO

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹LaunchSimpleStoProcedureArgs, [SimpleSto](entities.simplesto.md)››*

___

###  launchTieredSto

▸ **launchTieredSto**(`args`: LaunchTieredStoParams): *Promise‹any›*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:208](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityToken/Issuance/Offerings.ts#L208)*

Launch a Tiered STO

**Parameters:**

Name | Type |
------ | ------ |
`args` | LaunchTieredStoParams |

**Returns:** *Promise‹any›*
