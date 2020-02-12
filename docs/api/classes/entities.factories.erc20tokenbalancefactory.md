# Class: Erc20TokenBalanceFactory

Factory generates information for an ERC20 Token Balance

## Hierarchy

* [Factory](entities.factories.factory.md)‹[Erc20TokenBalance](entities.erc20tokenbalance.md), [Params](../interfaces/entities.params-1.md), [UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-7.md)›

  ↳ **Erc20TokenBalanceFactory**

## Index

### Constructors

* [constructor](entities.factories.erc20tokenbalancefactory.md#constructor)

### Properties

* [Entity](entities.factories.erc20tokenbalancefactory.md#entity)
* [cache](entities.factories.erc20tokenbalancefactory.md#cache)
* [context](entities.factories.erc20tokenbalancefactory.md#context)

### Methods

* [create](entities.factories.erc20tokenbalancefactory.md#create)
* [fetch](entities.factories.erc20tokenbalancefactory.md#fetch)
* [refresh](entities.factories.erc20tokenbalancefactory.md#refresh)
* [update](entities.factories.erc20tokenbalancefactory.md#update)

## Constructors

###  constructor

\+ **new Erc20TokenBalanceFactory**(`context`: [Context](_context_.context.md)): *[Erc20TokenBalanceFactory](entities.factories.erc20tokenbalancefactory.md)*

*Overrides [Factory](entities.factories.factory.md).[constructor](entities.factories.factory.md#constructor)*

*Defined in [src/entities/factories/Erc20TokenBalanceFactory.ts:33](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/factories/Erc20TokenBalanceFactory.ts#L33)*

Create an instance of the ERC20 Token Balance Factory

**Parameters:**

Name | Type |
------ | ------ |
`context` | [Context](_context_.context.md) |

**Returns:** *[Erc20TokenBalanceFactory](entities.factories.erc20tokenbalancefactory.md)*

## Properties

###  Entity

• **Entity**: *[EntityClass](../interfaces/entities.factories.entityclass.md)‹[Params](../interfaces/entities.params-1.md), [UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-7.md)›*

*Inherited from [Factory](entities.factories.factory.md).[Entity](entities.factories.factory.md#entity)*

*Defined in [src/entities/factories/Factory.ts:42](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/factories/Factory.ts#L42)*

entity class that this Factory is in charge of generating and caching

___

###  cache

• **cache**: *object*

*Inherited from [Factory](entities.factories.factory.md).[cache](entities.factories.factory.md#cache)*

*Defined in [src/entities/factories/Factory.ts:33](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/factories/Factory.ts#L33)*

#### Type declaration:

* \[ **key**: *string*\]: [Erc20TokenBalance](entities.erc20tokenbalance.md) | undefined

___

###  context

• **context**: *[Context](_context_.context.md)*

*Inherited from [Factory](entities.factories.factory.md).[context](entities.factories.factory.md#context)*

*Defined in [src/entities/factories/Factory.ts:37](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/factories/Factory.ts#L37)*

## Methods

###  create

▸ **create**(`uid`: string, `params`: [Params](../interfaces/entities.params-1.md)): *EntityType*

*Inherited from [Factory](entities.factories.factory.md).[create](entities.factories.factory.md#create)*

*Defined in [src/entities/factories/Factory.ts:92](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/factories/Factory.ts#L92)*

Get an entity from the cache. Creates it if it isn't cached, updates it if it is

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`uid` | string | unique identifier for the entity |
`params` | [Params](../interfaces/entities.params-1.md) | constructor data for the entity  |

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

▸ **update**(`uid`: string, `params`: Partial‹[Params](../interfaces/entities.params-1.md)›): *Promise‹void›*

*Inherited from [Factory](entities.factories.factory.md).[update](entities.factories.factory.md#update)*

*Defined in [src/entities/factories/Factory.ts:131](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/factories/Factory.ts#L131)*

Update an entity's properties in place

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`uid` | string | unique identifier for the entity |
`params` | Partial‹[Params](../interfaces/entities.params-1.md)› | properties that should be updated  |

**Returns:** *Promise‹void›*
