# Class: Offerings

Namespace that handles all Offering related functionality

## Hierarchy

* [SubModule](_entities_securitytoken_submodule_.submodule.md)

  ↳ **Offerings**

## Index

### Constructors

* [constructor](_entities_securitytoken_issuance_offerings_.offerings.md#constructor)

### Properties

* [context](_entities_securitytoken_issuance_offerings_.offerings.md#protected-context)
* [securityToken](_entities_securitytoken_issuance_offerings_.offerings.md#protected-securitytoken)

### Methods

* [getSto](_entities_securitytoken_issuance_offerings_.offerings.md#getsto)
* [getStos](_entities_securitytoken_issuance_offerings_.offerings.md#getstos)
* [launchSimpleSto](_entities_securitytoken_issuance_offerings_.offerings.md#launchsimplesto)
* [launchTieredSto](_entities_securitytoken_issuance_offerings_.offerings.md#launchtieredsto)

## Constructors

###  constructor

\+ **new Offerings**(`securityToken`: [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md), `context`: [Context](_context_.context.md)): *[Offerings](_entities_securitytoken_issuance_offerings_.offerings.md)*

*Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[constructor](_entities_securitytoken_submodule_.submodule.md#constructor)*

*Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/SubModule.ts#L10)*

Create a new SubModule instance

**Parameters:**

Name | Type |
------ | ------ |
`securityToken` | [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[Offerings](_entities_securitytoken_issuance_offerings_.offerings.md)*

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

###  getSto

▸ **getSto**(`args`: [GetStoParams](../interfaces/_entities_securitytoken_issuance_offerings_.getstoparams.md) | string): *Promise‹any›*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:223](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Issuance/Offerings.ts#L223)*

Retrieve an STO by type and address or UUID

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`args` | [GetStoParams](../interfaces/_entities_securitytoken_issuance_offerings_.getstoparams.md) &#124; string | STO uuid or object containing its type and address  |

**Returns:** *Promise‹any›*

___

###  getStos

▸ **getStos**(`opts`: object): *Promise‹[SimpleSto](_entities_simplesto_.simplesto.md) | [TieredSto](_entities_tieredsto_.tieredsto.md)[]›*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:260](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Issuance/Offerings.ts#L260)*

Retrieve all STOs attached to a security token

**Parameters:**

▪`Default value`  **opts**: *object*=  {
      stoTypes: [StoType.Simple, StoType.Tiered],
    }

Name | Type |
------ | ------ |
`stoTypes` | [StoType](../enums/_types_index_.stotype.md)[] |

**Returns:** *Promise‹[SimpleSto](_entities_simplesto_.simplesto.md) | [TieredSto](_entities_tieredsto_.tieredsto.md)[]›*

___

###  launchSimpleSto

▸ **launchSimpleSto**(`args`: object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[LaunchSimpleStoProcedureArgs](../interfaces/_types_index_.launchsimplestoprocedureargs.md), [SimpleSto](_entities_simplesto_.simplesto.md)››*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:168](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Issuance/Offerings.ts#L168)*

Launch a Simple STO

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`allowPreIssuance?` | undefined &#124; false &#124; true |
`currency` | Currency.ETH &#124; Currency.POLY |
`endDate` | Date |
`raisedFundsWallet` | string |
`rate` | BigNumber |
`startDate` | Date |
`tokensOnSale` | BigNumber |
`unsoldTokensWallet` | string |

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[LaunchSimpleStoProcedureArgs](../interfaces/_types_index_.launchsimplestoprocedureargs.md), [SimpleSto](_entities_simplesto_.simplesto.md)››*

___

###  launchTieredSto

▸ **launchTieredSto**(`args`: [LaunchTieredStoParams](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md)): *Promise‹any›*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:203](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Issuance/Offerings.ts#L203)*

Launch a Tiered STO

**Parameters:**

Name | Type |
------ | ------ |
`args` | [LaunchTieredStoParams](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md) |

**Returns:** *Promise‹any›*
