# TieredStoFactory

Factory generates information for a tiered sto entity

## Hierarchy

* [Factory](../classes/_entities_factories_factory_.factory.md)‹[TieredSto](../classes/_entities_tieredsto_.tieredsto.md), [Params](../interfaces/_entities_tieredsto_.params.md), [UniqueIdentifiers](../interfaces/_entities_sto_.uniqueidentifiers.md)›

  ↳ **TieredStoFactory**

## Index

### Constructors

* [constructor](../classes/_entities_factories_tieredstofactory_.tieredstofactory.md#constructor)

### Properties

* [Entity](../classes/_entities_factories_tieredstofactory_.tieredstofactory.md#entity)
* [cache](../classes/_entities_factories_tieredstofactory_.tieredstofactory.md#cache)
* [context](../classes/_entities_factories_tieredstofactory_.tieredstofactory.md#context)

### Methods

* [create](../classes/_entities_factories_tieredstofactory_.tieredstofactory.md#create)
* [fetch](../classes/_entities_factories_tieredstofactory_.tieredstofactory.md#fetch)
* [generateProperties](../classes/_entities_factories_tieredstofactory_.tieredstofactory.md#protected-generateproperties)
* [refresh](../classes/_entities_factories_tieredstofactory_.tieredstofactory.md#refresh)
* [update](../classes/_entities_factories_tieredstofactory_.tieredstofactory.md#update)

## Constructors

### constructor

+ **new TieredStoFactory**\(`context`: [Context](../classes/_context_.context.md)\): [_TieredStoFactory_](../classes/_entities_factories_tieredstofactory_.tieredstofactory.md)

_Overrides_ [_Factory_](../classes/_entities_factories_factory_.factory.md)_._[_constructor_](../classes/_entities_factories_factory_.factory.md#constructor)

_Defined in_ [_src/entities/factories/TieredStoFactory.ts:148_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/factories/TieredStoFactory.ts#L148)

Create an instance of the tiered sto factory

**Parameters:**

| Name | Type |
| :--- | :--- |
| `context` | [Context](../classes/_context_.context.md) |

**Returns:** [_TieredStoFactory_](../classes/_entities_factories_tieredstofactory_.tieredstofactory.md)

## Properties

### Entity

• **Entity**: [_EntityClass_](../interfaces/_entities_factories_factory_.entityclass.md)_‹_[_Params_](../interfaces/_entities_tieredsto_.params.md)_,_ [_UniqueIdentifiers_](../interfaces/_entities_sto_.uniqueidentifiers.md)_›_

_Inherited from_ [_Factory_](../classes/_entities_factories_factory_.factory.md)_._[_Entity_](../classes/_entities_factories_factory_.factory.md#entity)

_Defined in_ [_src/entities/factories/Factory.ts:37_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/factories/Factory.ts#L37)

entity class that this Factory is in charge of generating and caching

### cache

• **cache**: _object_

_Inherited from_ [_Factory_](../classes/_entities_factories_factory_.factory.md)_._[_cache_](../classes/_entities_factories_factory_.factory.md#cache)

_Defined in_ [_src/entities/factories/Factory.ts:28_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/factories/Factory.ts#L28)

#### Type declaration:

* \[ **key**: _string_\]: [TieredSto](../classes/_entities_tieredsto_.tieredsto.md) \| undefined

### context

• **context**: [_Context_](../classes/_context_.context.md)

_Inherited from_ [_Factory_](../classes/_entities_factories_factory_.factory.md)_._[_context_](../classes/_entities_factories_factory_.factory.md#context)

_Defined in_ [_src/entities/factories/Factory.ts:32_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/factories/Factory.ts#L32)

## Methods

### create

▸ **create**\(`uid`: string, `params`: [Params](../interfaces/_entities_tieredsto_.params.md)\): _EntityType_

_Inherited from_ [_Factory_](../classes/_entities_factories_factory_.factory.md)_._[_create_](../classes/_entities_factories_factory_.factory.md#create)

_Defined in_ [_src/entities/factories/Factory.ts:87_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/factories/Factory.ts#L87)

Get an entity from the cache. Creates it if it isn't cached, updates it if it is

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `uid` | string | unique identifier for the entity |
| `params` | [Params](../interfaces/_entities_tieredsto_.params.md) | constructor data for the entity |

**Returns:** _EntityType_

### fetch

▸ **fetch**\(`uid`: string\): _Promise‹EntityType›_

_Inherited from_ [_Factory_](../classes/_entities_factories_factory_.factory.md)_._[_fetch_](../classes/_entities_factories_factory_.factory.md#fetch)

_Defined in_ [_src/entities/factories/Factory.ts:57_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/factories/Factory.ts#L57)

Get an entity from the cache. Fetches the necessary data to create it if it isn't cached, refreshes it if it is

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `uid` | string | unique identifier for the entity |

**Returns:** _Promise‹EntityType›_

### `Protected` generateProperties

▸ **generateProperties**\(`uid`: string\): _Promise‹object›_

_Overrides void_

_Defined in_ [_src/entities/factories/TieredStoFactory.ts:13_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/factories/TieredStoFactory.ts#L13)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `uid` | string |

**Returns:** _Promise‹object›_

### refresh

▸ **refresh**\(`uid`: string\): _Promise‹void›_

_Inherited from_ [_Factory_](../classes/_entities_factories_factory_.factory.md)_._[_refresh_](../classes/_entities_factories_factory_.factory.md#refresh)

_Defined in_ [_src/entities/factories/Factory.ts:108_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/factories/Factory.ts#L108)

Fetch the data for an entity and updates its properties

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `uid` | string | unique identifier for the entity |

**Returns:** _Promise‹void›_

### update

▸ **update**\(`uid`: string, `params`: Partial‹[Params](../interfaces/_entities_tieredsto_.params.md)›\): _Promise‹void›_

_Inherited from_ [_Factory_](../classes/_entities_factories_factory_.factory.md)_._[_update_](../classes/_entities_factories_factory_.factory.md#update)

_Defined in_ [_src/entities/factories/Factory.ts:126_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/factories/Factory.ts#L126)

Update an entity's properties in place

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `uid` | string | unique identifier for the entity |
| `params` | Partial‹[Params](../interfaces/_entities_tieredsto_.params.md)› | properties that should be updated |

**Returns:** _Promise‹void›_

