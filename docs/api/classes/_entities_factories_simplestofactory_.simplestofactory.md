# Class: SimpleStoFactory

Factory generates information for a simple sto entity

## Hierarchy

* [Factory](_entities_factories_factory_.factory.md)‹[SimpleSto](_entities_simplesto_.simplesto.md), [Params](../interfaces/_entities_simplesto_.params.md), [UniqueIdentifiers](../interfaces/_entities_sto_.uniqueidentifiers.md)›

  ↳ **SimpleStoFactory**

## Index

### Constructors

* [constructor](_entities_factories_simplestofactory_.simplestofactory.md#constructor)

### Properties

* [Entity](_entities_factories_simplestofactory_.simplestofactory.md#entity)
* [cache](_entities_factories_simplestofactory_.simplestofactory.md#cache)
* [context](_entities_factories_simplestofactory_.simplestofactory.md#context)

### Methods

* [create](_entities_factories_simplestofactory_.simplestofactory.md#create)
* [fetch](_entities_factories_simplestofactory_.simplestofactory.md#fetch)
* [generateProperties](_entities_factories_simplestofactory_.simplestofactory.md#protected-generateproperties)
* [refresh](_entities_factories_simplestofactory_.simplestofactory.md#refresh)
* [update](_entities_factories_simplestofactory_.simplestofactory.md#update)

## Constructors

###  constructor

\+ **new SimpleStoFactory**(`context`: [Context](_context_.context.md)): *[SimpleStoFactory](_entities_factories_simplestofactory_.simplestofactory.md)*

*Overrides [Factory](_entities_factories_factory_.factory.md).[constructor](_entities_factories_factory_.factory.md#constructor)*

*Defined in [src/entities/factories/SimpleStoFactory.ts:79](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/factories/SimpleStoFactory.ts#L79)*

Create an instance of the simple sto factory

**Parameters:**

Name | Type |
------ | ------ |
`context` | [Context](_context_.context.md) |

**Returns:** *[SimpleStoFactory](_entities_factories_simplestofactory_.simplestofactory.md)*

## Properties

###  Entity

• **Entity**: *[EntityClass](../interfaces/_entities_factories_factory_.entityclass.md)‹[Params](../interfaces/_entities_simplesto_.params.md), [UniqueIdentifiers](../interfaces/_entities_sto_.uniqueidentifiers.md)›*

*Inherited from [Factory](_entities_factories_factory_.factory.md).[Entity](_entities_factories_factory_.factory.md#entity)*

*Defined in [src/entities/factories/Factory.ts:37](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/factories/Factory.ts#L37)*

entity class that this Factory is in charge of generating and caching

___

###  cache

• **cache**: *object*

*Inherited from [Factory](_entities_factories_factory_.factory.md).[cache](_entities_factories_factory_.factory.md#cache)*

*Defined in [src/entities/factories/Factory.ts:28](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/factories/Factory.ts#L28)*

#### Type declaration:

* \[ **key**: *string*\]: [SimpleSto](_entities_simplesto_.simplesto.md) | undefined

___

###  context

• **context**: *[Context](_context_.context.md)*

*Inherited from [Factory](_entities_factories_factory_.factory.md).[context](_entities_factories_factory_.factory.md#context)*

*Defined in [src/entities/factories/Factory.ts:32](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/factories/Factory.ts#L32)*

## Methods

###  create

▸ **create**(`uid`: string, `params`: [Params](../interfaces/_entities_simplesto_.params.md)): *EntityType*

*Inherited from [Factory](_entities_factories_factory_.factory.md).[create](_entities_factories_factory_.factory.md#create)*

*Defined in [src/entities/factories/Factory.ts:87](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/factories/Factory.ts#L87)*

Get an entity from the cache. Creates it if it isn't cached, updates it if it is

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`uid` | string | unique identifier for the entity |
`params` | [Params](../interfaces/_entities_simplesto_.params.md) | constructor data for the entity  |

**Returns:** *EntityType*

___

###  fetch

▸ **fetch**(`uid`: string): *Promise‹EntityType›*

*Inherited from [Factory](_entities_factories_factory_.factory.md).[fetch](_entities_factories_factory_.factory.md#fetch)*

*Defined in [src/entities/factories/Factory.ts:57](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/factories/Factory.ts#L57)*

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

*Defined in [src/entities/factories/SimpleStoFactory.ts:12](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/factories/SimpleStoFactory.ts#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`uid` | string |

**Returns:** *Promise‹object›*

___

###  refresh

▸ **refresh**(`uid`: string): *Promise‹void›*

*Inherited from [Factory](_entities_factories_factory_.factory.md).[refresh](_entities_factories_factory_.factory.md#refresh)*

*Defined in [src/entities/factories/Factory.ts:108](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/factories/Factory.ts#L108)*

Fetch the data for an entity and updates its properties

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`uid` | string | unique identifier for the entity  |

**Returns:** *Promise‹void›*

___

###  update

▸ **update**(`uid`: string, `params`: Partial‹[Params](../interfaces/_entities_simplesto_.params.md)›): *Promise‹void›*

*Inherited from [Factory](_entities_factories_factory_.factory.md).[update](_entities_factories_factory_.factory.md#update)*

*Defined in [src/entities/factories/Factory.ts:126](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/factories/Factory.ts#L126)*

Update an entity's properties in place

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`uid` | string | unique identifier for the entity |
`params` | Partial‹[Params](../interfaces/_entities_simplesto_.params.md)› | properties that should be updated  |

**Returns:** *Promise‹void›*
