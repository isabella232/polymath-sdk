# Class: WalletFactory

Factory to generate properties for a wallet entity

## Hierarchy

* [Factory](_entities_factories_factory_.factory.md)‹[Wallet](_entities_wallet_.wallet.md), [Params](../interfaces/_entities_wallet_.params.md), [UniqueIdentifiers](../interfaces/_entities_wallet_.uniqueidentifiers.md)›

  ↳ **WalletFactory**

## Index

### Constructors

* [constructor](_entities_factories_walletfactory_.walletfactory.md#constructor)

### Properties

* [Entity](_entities_factories_walletfactory_.walletfactory.md#entity)
* [cache](_entities_factories_walletfactory_.walletfactory.md#cache)
* [context](_entities_factories_walletfactory_.walletfactory.md#context)

### Methods

* [create](_entities_factories_walletfactory_.walletfactory.md#create)
* [fetch](_entities_factories_walletfactory_.walletfactory.md#fetch)
* [generateProperties](_entities_factories_walletfactory_.walletfactory.md#protected-generateproperties)
* [refresh](_entities_factories_walletfactory_.walletfactory.md#refresh)
* [update](_entities_factories_walletfactory_.walletfactory.md#update)

## Constructors

###  constructor

\+ **new WalletFactory**(`context`: [Context](_context_.context.md)): *[WalletFactory](_entities_factories_walletfactory_.walletfactory.md)*

*Overrides [Factory](_entities_factories_factory_.factory.md).[constructor](_entities_factories_factory_.factory.md#constructor)*

*Defined in [src/entities/factories/WalletFactory.ts:15](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/factories/WalletFactory.ts#L15)*

Create a wallet factory

**Parameters:**

Name | Type |
------ | ------ |
`context` | [Context](_context_.context.md) |

**Returns:** *[WalletFactory](_entities_factories_walletfactory_.walletfactory.md)*

## Properties

###  Entity

• **Entity**: *[EntityClass](../interfaces/_entities_factories_factory_.entityclass.md)‹[Params](../interfaces/_entities_wallet_.params.md), [UniqueIdentifiers](../interfaces/_entities_wallet_.uniqueidentifiers.md)›*

*Inherited from [Factory](_entities_factories_factory_.factory.md).[Entity](_entities_factories_factory_.factory.md#entity)*

*Defined in [src/entities/factories/Factory.ts:37](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/factories/Factory.ts#L37)*

entity class that this Factory is in charge of generating and caching

___

###  cache

• **cache**: *object*

*Inherited from [Factory](_entities_factories_factory_.factory.md).[cache](_entities_factories_factory_.factory.md#cache)*

*Defined in [src/entities/factories/Factory.ts:28](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/factories/Factory.ts#L28)*

#### Type declaration:

* \[ **key**: *string*\]: [Wallet](_entities_wallet_.wallet.md) | undefined

___

###  context

• **context**: *[Context](_context_.context.md)*

*Inherited from [Factory](_entities_factories_factory_.factory.md).[context](_entities_factories_factory_.factory.md#context)*

*Defined in [src/entities/factories/Factory.ts:32](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/factories/Factory.ts#L32)*

## Methods

###  create

▸ **create**(`uid`: string, `params`: [Params](../interfaces/_entities_wallet_.params.md)): *EntityType*

*Inherited from [Factory](_entities_factories_factory_.factory.md).[create](_entities_factories_factory_.factory.md#create)*

*Defined in [src/entities/factories/Factory.ts:87](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/factories/Factory.ts#L87)*

Get an entity from the cache. Creates it if it isn't cached, updates it if it is

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`uid` | string | unique identifier for the entity |
`params` | [Params](../interfaces/_entities_wallet_.params.md) | constructor data for the entity  |

**Returns:** *EntityType*

___

###  fetch

▸ **fetch**(`uid`: string): *Promise‹EntityType›*

*Inherited from [Factory](_entities_factories_factory_.factory.md).[fetch](_entities_factories_factory_.factory.md#fetch)*

*Defined in [src/entities/factories/Factory.ts:57](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/factories/Factory.ts#L57)*

Get an entity from the cache. Fetches the necessary data to create it if it isn't cached, refreshes it if it is

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`uid` | string | unique identifier for the entity  |

**Returns:** *Promise‹EntityType›*

___

### `Protected` generateProperties

▸ **generateProperties**(`uid`: string): *Promise‹object›*

*Overrides void*

*Defined in [src/entities/factories/WalletFactory.ts:9](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/factories/WalletFactory.ts#L9)*

**Parameters:**

Name | Type |
------ | ------ |
`uid` | string |

**Returns:** *Promise‹object›*

___

###  refresh

▸ **refresh**(`uid`: string): *Promise‹void›*

*Inherited from [Factory](_entities_factories_factory_.factory.md).[refresh](_entities_factories_factory_.factory.md#refresh)*

*Defined in [src/entities/factories/Factory.ts:108](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/factories/Factory.ts#L108)*

Fetch the data for an entity and updates its properties

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`uid` | string | unique identifier for the entity  |

**Returns:** *Promise‹void›*

___

###  update

▸ **update**(`uid`: string, `params`: Partial‹[Params](../interfaces/_entities_wallet_.params.md)›): *Promise‹void›*

*Inherited from [Factory](_entities_factories_factory_.factory.md).[update](_entities_factories_factory_.factory.md#update)*

*Defined in [src/entities/factories/Factory.ts:126](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/factories/Factory.ts#L126)*

Update an entity's properties in place

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`uid` | string | unique identifier for the entity |
`params` | Partial‹[Params](../interfaces/_entities_wallet_.params.md)› | properties that should be updated  |

**Returns:** *Promise‹void›*
