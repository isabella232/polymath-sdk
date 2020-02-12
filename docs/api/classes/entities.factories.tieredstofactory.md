# Class: TieredStoFactory

Factory generates information for a tiered sto entity

## Hierarchy

* [Factory](entities.factories.factory.md)‹[TieredSto](entities.tieredsto.md), [Params](../interfaces/entities.params-9.md), [UniqueIdentifiers](../interfaces/entities.uniqueidentifiers.md)›

  ↳ **TieredStoFactory**

## Index

### Constructors

* [constructor](entities.factories.tieredstofactory.md#constructor)

### Properties

* [Entity](entities.factories.tieredstofactory.md#entity)
* [cache](entities.factories.tieredstofactory.md#cache)
* [context](entities.factories.tieredstofactory.md#context)

### Methods

* [create](entities.factories.tieredstofactory.md#create)
* [fetch](entities.factories.tieredstofactory.md#fetch)
* [generateProperties](entities.factories.tieredstofactory.md#protected-generateproperties)
* [refresh](entities.factories.tieredstofactory.md#refresh)
* [update](entities.factories.tieredstofactory.md#update)

## Constructors

###  constructor

\+ **new TieredStoFactory**(`context`: [Context](_context_.context.md)): *[TieredStoFactory](entities.factories.tieredstofactory.md)*

*Overrides [Factory](entities.factories.factory.md).[constructor](entities.factories.factory.md#constructor)*

*Defined in [src/entities/factories/TieredStoFactory.ts:153](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/factories/TieredStoFactory.ts#L153)*

Create an instance of the tiered sto factory

**Parameters:**

Name | Type |
------ | ------ |
`context` | [Context](_context_.context.md) |

**Returns:** *[TieredStoFactory](entities.factories.tieredstofactory.md)*

## Properties

###  Entity

• **Entity**: *[EntityClass](../interfaces/entities.factories.entityclass.md)‹[Params](../interfaces/entities.params-9.md), [UniqueIdentifiers](../interfaces/entities.uniqueidentifiers.md)›*

*Inherited from [Factory](entities.factories.factory.md).[Entity](entities.factories.factory.md#entity)*

*Defined in [src/entities/factories/Factory.ts:42](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/factories/Factory.ts#L42)*

entity class that this Factory is in charge of generating and caching

___

###  cache

• **cache**: *object*

*Inherited from [Factory](entities.factories.factory.md).[cache](entities.factories.factory.md#cache)*

*Defined in [src/entities/factories/Factory.ts:33](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/factories/Factory.ts#L33)*

#### Type declaration:

* \[ **key**: *string*\]: [TieredSto](entities.tieredsto.md) | undefined

___

###  context

• **context**: *[Context](_context_.context.md)*

*Inherited from [Factory](entities.factories.factory.md).[context](entities.factories.factory.md#context)*

*Defined in [src/entities/factories/Factory.ts:37](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/factories/Factory.ts#L37)*

## Methods

###  create

▸ **create**(`uid`: string, `params`: [Params](../interfaces/entities.params-9.md)): *EntityType*

*Inherited from [Factory](entities.factories.factory.md).[create](entities.factories.factory.md#create)*

*Defined in [src/entities/factories/Factory.ts:92](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/factories/Factory.ts#L92)*

Get an entity from the cache. Creates it if it isn't cached, updates it if it is

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`uid` | string | unique identifier for the entity |
`params` | [Params](../interfaces/entities.params-9.md) | constructor data for the entity  |

**Returns:** *EntityType*

___

###  fetch

▸ **fetch**(`uid`: string): *Promise‹EntityType›*

*Inherited from [Factory](entities.factories.factory.md).[fetch](entities.factories.factory.md#fetch)*

*Defined in [src/entities/factories/Factory.ts:62](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/factories/Factory.ts#L62)*

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

*Defined in [src/entities/factories/TieredStoFactory.ts:18](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/factories/TieredStoFactory.ts#L18)*

**Parameters:**

Name | Type |
------ | ------ |
`uid` | string |

**Returns:** *Promise‹object›*

___

###  refresh

▸ **refresh**(`uid`: string): *Promise‹void›*

*Inherited from [Factory](entities.factories.factory.md).[refresh](entities.factories.factory.md#refresh)*

*Defined in [src/entities/factories/Factory.ts:113](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/factories/Factory.ts#L113)*

Fetch the data for an entity and updates its properties

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`uid` | string | unique identifier for the entity  |

**Returns:** *Promise‹void›*

___

###  update

▸ **update**(`uid`: string, `params`: Partial‹[Params](../interfaces/entities.params-9.md)›): *Promise‹void›*

*Inherited from [Factory](entities.factories.factory.md).[update](entities.factories.factory.md#update)*

*Defined in [src/entities/factories/Factory.ts:131](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/factories/Factory.ts#L131)*

Update an entity's properties in place

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`uid` | string | unique identifier for the entity |
`params` | Partial‹[Params](../interfaces/entities.params-9.md)› | properties that should be updated  |

**Returns:** *Promise‹void›*
