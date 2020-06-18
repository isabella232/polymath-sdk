# Class: TaxWithholdingFactory

Factory generates information for a Tax Withholding entity

## Hierarchy

* [Factory](_entities_factories_factory_.factory.md)‹[TaxWithholding](_entities_taxwithholding_.taxwithholding.md), [Params](../interfaces/_entities_taxwithholding_.params.md), [UniqueIdentifiers](../interfaces/_entities_taxwithholding_.uniqueidentifiers.md)›

  ↳ **TaxWithholdingFactory**

## Index

### Constructors

* [constructor](_entities_factories_taxwithholdingfactory_.taxwithholdingfactory.md#constructor)

### Properties

* [Entity](_entities_factories_taxwithholdingfactory_.taxwithholdingfactory.md#entity)
* [cache](_entities_factories_taxwithholdingfactory_.taxwithholdingfactory.md#cache)
* [context](_entities_factories_taxwithholdingfactory_.taxwithholdingfactory.md#context)

### Methods

* [create](_entities_factories_taxwithholdingfactory_.taxwithholdingfactory.md#create)
* [fetch](_entities_factories_taxwithholdingfactory_.taxwithholdingfactory.md#fetch)
* [refresh](_entities_factories_taxwithholdingfactory_.taxwithholdingfactory.md#refresh)
* [update](_entities_factories_taxwithholdingfactory_.taxwithholdingfactory.md#update)

## Constructors

###  constructor

\+ **new TaxWithholdingFactory**(`context`: [Context](_context_.context.md)): *[TaxWithholdingFactory](_entities_factories_taxwithholdingfactory_.taxwithholdingfactory.md)*

*Overrides [Factory](_entities_factories_factory_.factory.md).[constructor](_entities_factories_factory_.factory.md#constructor)*

*Defined in [src/entities/factories/TaxWithholdingFactory.ts:71](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/factories/TaxWithholdingFactory.ts#L71)*

Create an instance of the Tax Withholding Factory

**Parameters:**

Name | Type |
------ | ------ |
`context` | [Context](_context_.context.md) |

**Returns:** *[TaxWithholdingFactory](_entities_factories_taxwithholdingfactory_.taxwithholdingfactory.md)*

## Properties

###  Entity

• **Entity**: *[EntityClass](../interfaces/_entities_factories_factory_.entityclass.md)‹[Params](../interfaces/_entities_taxwithholding_.params.md), [UniqueIdentifiers](../interfaces/_entities_taxwithholding_.uniqueidentifiers.md)›*

*Inherited from [Factory](_entities_factories_factory_.factory.md).[Entity](_entities_factories_factory_.factory.md#entity)*

*Defined in [src/entities/factories/Factory.ts:37](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/factories/Factory.ts#L37)*

entity class that this Factory is in charge of generating and caching

___

###  cache

• **cache**: *object*

*Inherited from [Factory](_entities_factories_factory_.factory.md).[cache](_entities_factories_factory_.factory.md#cache)*

*Defined in [src/entities/factories/Factory.ts:28](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/factories/Factory.ts#L28)*

#### Type declaration:

* \[ **key**: *string*\]: [TaxWithholding](_entities_taxwithholding_.taxwithholding.md) | undefined

___

###  context

• **context**: *[Context](_context_.context.md)*

*Inherited from [Factory](_entities_factories_factory_.factory.md).[context](_entities_factories_factory_.factory.md#context)*

*Defined in [src/entities/factories/Factory.ts:32](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/factories/Factory.ts#L32)*

## Methods

###  create

▸ **create**(`uid`: string, `params`: [Params](../interfaces/_entities_taxwithholding_.params.md)): *EntityType*

*Inherited from [Factory](_entities_factories_factory_.factory.md).[create](_entities_factories_factory_.factory.md#create)*

*Defined in [src/entities/factories/Factory.ts:87](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/factories/Factory.ts#L87)*

Get an entity from the cache. Creates it if it isn't cached, updates it if it is

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`uid` | string | unique identifier for the entity |
`params` | [Params](../interfaces/_entities_taxwithholding_.params.md) | constructor data for the entity  |

**Returns:** *EntityType*

___

###  fetch

▸ **fetch**(`uid`: string): *Promise‹EntityType›*

*Inherited from [Factory](_entities_factories_factory_.factory.md).[fetch](_entities_factories_factory_.factory.md#fetch)*

*Defined in [src/entities/factories/Factory.ts:57](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/factories/Factory.ts#L57)*

Get an entity from the cache. Fetches the necessary data to create it if it isn't cached, refreshes it if it is

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`uid` | string | unique identifier for the entity  |

**Returns:** *Promise‹EntityType›*

___

###  refresh

▸ **refresh**(`uid`: string): *Promise‹void›*

*Inherited from [Factory](_entities_factories_factory_.factory.md).[refresh](_entities_factories_factory_.factory.md#refresh)*

*Defined in [src/entities/factories/Factory.ts:108](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/factories/Factory.ts#L108)*

Fetch the data for an entity and updates its properties

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`uid` | string | unique identifier for the entity  |

**Returns:** *Promise‹void›*

___

###  update

▸ **update**(`uid`: string, `params`: Partial‹[Params](../interfaces/_entities_taxwithholding_.params.md)›): *Promise‹void›*

*Inherited from [Factory](_entities_factories_factory_.factory.md).[update](_entities_factories_factory_.factory.md#update)*

*Defined in [src/entities/factories/Factory.ts:126](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/factories/Factory.ts#L126)*

Update an entity's properties in place

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`uid` | string | unique identifier for the entity |
`params` | Partial‹[Params](../interfaces/_entities_taxwithholding_.params.md)› | properties that should be updated  |

**Returns:** *Promise‹void›*
