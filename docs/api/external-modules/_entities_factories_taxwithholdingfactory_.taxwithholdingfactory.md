# TaxWithholdingFactory

Factory generates information for a Tax Withholding entity

## Hierarchy

* [Factory]()‹[TaxWithholding](), [Params](), [UniqueIdentifiers]()›

  ↳ **TaxWithholdingFactory**

## Index

### Constructors

* [constructor]()

### Properties

* [Entity]()
* [cache]()
* [context]()

### Methods

* [create]()
* [fetch]()
* [refresh]()
* [update]()

## Constructors

### constructor

+ **new TaxWithholdingFactory**\(`context`: [Context]()\): [_TaxWithholdingFactory_]()

_Overrides_ [_Factory_]()_._[_constructor_]()

_Defined in_ [_src/entities/factories/TaxWithholdingFactory.ts:71_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/factories/TaxWithholdingFactory.ts#L71)

Create an instance of the Tax Withholding Factory

**Parameters:**

| Name | Type |
| :--- | :--- |
| `context` | [Context]() |

**Returns:** [_TaxWithholdingFactory_]()

## Properties

### Entity

• **Entity**: [_EntityClass_]()_‹_[_Params_]()_,_ [_UniqueIdentifiers_]()_›_

_Inherited from_ [_Factory_]()_._[_Entity_]()

_Defined in_ [_src/entities/factories/Factory.ts:37_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/factories/Factory.ts#L37)

entity class that this Factory is in charge of generating and caching

### cache

• **cache**: _object_

_Inherited from_ [_Factory_]()_._[_cache_]()

_Defined in_ [_src/entities/factories/Factory.ts:28_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/factories/Factory.ts#L28)

#### Type declaration:

* \[ **key**: _string_\]: [TaxWithholding]() \| undefined

### context

• **context**: [_Context_]()

_Inherited from_ [_Factory_]()_._[_context_]()

_Defined in_ [_src/entities/factories/Factory.ts:32_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/factories/Factory.ts#L32)

## Methods

### create

▸ **create**\(`uid`: string, `params`: [Params]()\): _EntityType_

_Inherited from_ [_Factory_]()_._[_create_]()

_Defined in_ [_src/entities/factories/Factory.ts:87_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/factories/Factory.ts#L87)

Get an entity from the cache. Creates it if it isn't cached, updates it if it is

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `uid` | string | unique identifier for the entity |
| `params` | [Params]() | constructor data for the entity |

**Returns:** _EntityType_

### fetch

▸ **fetch**\(`uid`: string\): _Promise‹EntityType›_

_Inherited from_ [_Factory_]()_._[_fetch_]()

_Defined in_ [_src/entities/factories/Factory.ts:57_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/factories/Factory.ts#L57)

Get an entity from the cache. Fetches the necessary data to create it if it isn't cached, refreshes it if it is

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `uid` | string | unique identifier for the entity |

**Returns:** _Promise‹EntityType›_

### refresh

▸ **refresh**\(`uid`: string\): _Promise‹void›_

_Inherited from_ [_Factory_]()_._[_refresh_]()

_Defined in_ [_src/entities/factories/Factory.ts:108_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/factories/Factory.ts#L108)

Fetch the data for an entity and updates its properties

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `uid` | string | unique identifier for the entity |

**Returns:** _Promise‹void›_

### update

▸ **update**\(`uid`: string, `params`: Partial‹[Params]()›\): _Promise‹void›_

_Inherited from_ [_Factory_]()_._[_update_]()

_Defined in_ [_src/entities/factories/Factory.ts:126_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/factories/Factory.ts#L126)

Update an entity's properties in place

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `uid` | string | unique identifier for the entity |
| `params` | Partial‹[Params]()› | properties that should be updated |

**Returns:** _Promise‹void›_

