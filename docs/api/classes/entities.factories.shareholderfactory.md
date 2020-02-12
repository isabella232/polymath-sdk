# Class: ShareholderFactory

Factory generates information for a Shareholder entity

## Hierarchy

* [Factory](entities.factories.factory.md)‹[Shareholder](entities.shareholder.md), [Params](../interfaces/entities.params-5.md), [UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-2.md)›

  ↳ **ShareholderFactory**

## Index

### Constructors

* [constructor](entities.factories.shareholderfactory.md#constructor)

### Properties

* [Entity](entities.factories.shareholderfactory.md#entity)
* [cache](entities.factories.shareholderfactory.md#cache)
* [context](entities.factories.shareholderfactory.md#context)

### Methods

* [create](entities.factories.shareholderfactory.md#create)
* [fetch](entities.factories.shareholderfactory.md#fetch)
* [refresh](entities.factories.shareholderfactory.md#refresh)
* [update](entities.factories.shareholderfactory.md#update)

## Constructors

###  constructor

\+ **new ShareholderFactory**(`context`: [Context](_context_.context.md)): *[ShareholderFactory](entities.factories.shareholderfactory.md)*

*Overrides [Factory](entities.factories.factory.md).[constructor](entities.factories.factory.md#constructor)*

*Defined in [src/entities/factories/ShareholderFactory.ts:66](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/factories/ShareholderFactory.ts#L66)*

Create an instance of the Shareholder Factory

**Parameters:**

Name | Type |
------ | ------ |
`context` | [Context](_context_.context.md) |

**Returns:** *[ShareholderFactory](entities.factories.shareholderfactory.md)*

## Properties

###  Entity

• **Entity**: *[EntityClass](../interfaces/entities.factories.entityclass.md)‹[Params](../interfaces/entities.params-5.md), [UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-2.md)›*

*Inherited from [Factory](entities.factories.factory.md).[Entity](entities.factories.factory.md#entity)*

*Defined in [src/entities/factories/Factory.ts:42](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/factories/Factory.ts#L42)*

entity class that this Factory is in charge of generating and caching

___

###  cache

• **cache**: *object*

*Inherited from [Factory](entities.factories.factory.md).[cache](entities.factories.factory.md#cache)*

*Defined in [src/entities/factories/Factory.ts:33](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/factories/Factory.ts#L33)*

#### Type declaration:

* \[ **key**: *string*\]: [Shareholder](entities.shareholder.md) | undefined

___

###  context

• **context**: *[Context](_context_.context.md)*

*Inherited from [Factory](entities.factories.factory.md).[context](entities.factories.factory.md#context)*

*Defined in [src/entities/factories/Factory.ts:37](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/factories/Factory.ts#L37)*

## Methods

###  create

▸ **create**(`uid`: string, `params`: [Params](../interfaces/entities.params-5.md)): *EntityType*

*Inherited from [Factory](entities.factories.factory.md).[create](entities.factories.factory.md#create)*

*Defined in [src/entities/factories/Factory.ts:92](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/factories/Factory.ts#L92)*

Get an entity from the cache. Creates it if it isn't cached, updates it if it is

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`uid` | string | unique identifier for the entity |
`params` | [Params](../interfaces/entities.params-5.md) | constructor data for the entity  |

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

▸ **update**(`uid`: string, `params`: Partial‹[Params](../interfaces/entities.params-5.md)›): *Promise‹void›*

*Inherited from [Factory](entities.factories.factory.md).[update](entities.factories.factory.md#update)*

*Defined in [src/entities/factories/Factory.ts:131](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/factories/Factory.ts#L131)*

Update an entity's properties in place

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`uid` | string | unique identifier for the entity |
`params` | Partial‹[Params](../interfaces/entities.params-5.md)› | properties that should be updated  |

**Returns:** *Promise‹void›*
