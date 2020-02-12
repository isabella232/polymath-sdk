# Class: SimpleStoFactory

Factory generates information for a simple sto entity

## Hierarchy

* [Factory](entities.factories.factory.md)‹[SimpleSto](entities.simplesto.md), [Params](../interfaces/entities.params-9.md), [UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-6.md)›

  ↳ **SimpleStoFactory**

## Index

### Constructors

* [constructor](entities.factories.simplestofactory.md#constructor)

### Properties

* [Entity](entities.factories.simplestofactory.md#entity)
* [cache](entities.factories.simplestofactory.md#cache)
* [context](entities.factories.simplestofactory.md#context)

### Methods

* [create](entities.factories.simplestofactory.md#create)
* [fetch](entities.factories.simplestofactory.md#fetch)
* [generateProperties](entities.factories.simplestofactory.md#protected-generateproperties)
* [refresh](entities.factories.simplestofactory.md#refresh)
* [update](entities.factories.simplestofactory.md#update)

## Constructors

###  constructor

\+ **new SimpleStoFactory**(`context`: [Context](_context_.context.md)): *[SimpleStoFactory](entities.factories.simplestofactory.md)*

*Overrides [Factory](entities.factories.factory.md).[constructor](entities.factories.factory.md#constructor)*

*Defined in [src/entities/factories/SimpleStoFactory.ts:84](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/factories/SimpleStoFactory.ts#L84)*

Create an instance of the simple sto factory

**Parameters:**

Name | Type |
------ | ------ |
`context` | [Context](_context_.context.md) |

**Returns:** *[SimpleStoFactory](entities.factories.simplestofactory.md)*

## Properties

###  Entity

• **Entity**: *[EntityClass](../interfaces/entities.factories.entityclass.md)‹[Params](../interfaces/entities.params-9.md), [UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-6.md)›*

*Inherited from [Factory](entities.factories.factory.md).[Entity](entities.factories.factory.md#entity)*

*Defined in [src/entities/factories/Factory.ts:42](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/factories/Factory.ts#L42)*

entity class that this Factory is in charge of generating and caching

___

###  cache

• **cache**: *object*

*Inherited from [Factory](entities.factories.factory.md).[cache](entities.factories.factory.md#cache)*

*Defined in [src/entities/factories/Factory.ts:33](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/factories/Factory.ts#L33)*

#### Type declaration:

* \[ **key**: *string*\]: [SimpleSto](entities.simplesto.md) | undefined

___

###  context

• **context**: *[Context](_context_.context.md)*

*Inherited from [Factory](entities.factories.factory.md).[context](entities.factories.factory.md#context)*

*Defined in [src/entities/factories/Factory.ts:37](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/factories/Factory.ts#L37)*

## Methods

###  create

▸ **create**(`uid`: string, `params`: [Params](../interfaces/entities.params-9.md)): *EntityType*

*Inherited from [Factory](entities.factories.factory.md).[create](entities.factories.factory.md#create)*

*Defined in [src/entities/factories/Factory.ts:92](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/factories/Factory.ts#L92)*

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

*Defined in [src/entities/factories/Factory.ts:62](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/factories/Factory.ts#L62)*

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

*Defined in [src/entities/factories/SimpleStoFactory.ts:17](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/factories/SimpleStoFactory.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`uid` | string |

**Returns:** *Promise‹object›*

___

###  refresh

▸ **refresh**(`uid`: string): *Promise‹void›*

*Inherited from [Factory](entities.factories.factory.md).[refresh](entities.factories.factory.md#refresh)*

*Defined in [src/entities/factories/Factory.ts:113](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/factories/Factory.ts#L113)*

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

*Defined in [src/entities/factories/Factory.ts:131](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/factories/Factory.ts#L131)*

Update an entity's properties in place

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`uid` | string | unique identifier for the entity |
`params` | Partial‹[Params](../interfaces/entities.params-9.md)› | properties that should be updated  |

**Returns:** *Promise‹void›*
