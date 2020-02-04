[@polymathnetwork/sdk - v2.0.1-beta.120](../README.md) › [Globals](../globals.md) › ["entities/factories/TaxWithholdingFactory"](../modules/_entities_factories_taxwithholdingfactory_.md) › [TaxWithholdingFactory](_entities_factories_taxwithholdingfactory_.taxwithholdingfactory.md)

# Class: TaxWithholdingFactory

Factory generates information for a Tax Withholding entity

## Hierarchy

- [Factory](_entities_factories_factory_.factory.md)‹[TaxWithholding](_entities_taxwithholding_.taxwithholding.md), [Params](../interfaces/_entities_taxwithholding_.params.md), [UniqueIdentifiers](../interfaces/_entities_taxwithholding_.uniqueidentifiers.md)›

  ↳ **TaxWithholdingFactory**

## Index

### Constructors

- [constructor](_entities_factories_taxwithholdingfactory_.taxwithholdingfactory.md#constructor)

### Properties

- [Entity](_entities_factories_taxwithholdingfactory_.taxwithholdingfactory.md#entity)
- [cache](_entities_factories_taxwithholdingfactory_.taxwithholdingfactory.md#cache)
- [context](_entities_factories_taxwithholdingfactory_.taxwithholdingfactory.md#context)

### Methods

- [create](_entities_factories_taxwithholdingfactory_.taxwithholdingfactory.md#create)
- [fetch](_entities_factories_taxwithholdingfactory_.taxwithholdingfactory.md#fetch)
- [refresh](_entities_factories_taxwithholdingfactory_.taxwithholdingfactory.md#refresh)
- [update](_entities_factories_taxwithholdingfactory_.taxwithholdingfactory.md#update)

## Constructors

### constructor

\+ **new TaxWithholdingFactory**(`context`: [Context](_context_.context.md)): _[TaxWithholdingFactory](_entities_factories_taxwithholdingfactory_.taxwithholdingfactory.md)_

_Overrides [Factory](_entities_factories_factory_.factory.md).[constructor](_entities_factories_factory_.factory.md#constructor)_

_Defined in [src/entities/factories/TaxWithholdingFactory.ts:71](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/factories/TaxWithholdingFactory.ts#L71)_

Create an instance of the Tax Withholding Factory

**Parameters:**

| Name      | Type                            |
| --------- | ------------------------------- |
| `context` | [Context](_context_.context.md) |

**Returns:** _[TaxWithholdingFactory](_entities_factories_taxwithholdingfactory_.taxwithholdingfactory.md)_

## Properties

### Entity

• **Entity**: _[EntityClass](../interfaces/_entities_factories_factory_.entityclass.md)‹[Params](../interfaces/_entities_taxwithholding_.params.md), [UniqueIdentifiers](../interfaces/_entities_taxwithholding_.uniqueidentifiers.md)›_

_Inherited from [Factory](_entities_factories_factory_.factory.md).[Entity](_entities_factories_factory_.factory.md#entity)_

_Defined in [src/entities/factories/Factory.ts:37](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/factories/Factory.ts#L37)_

entity class that this Factory is in charge of generating and caching

---

### cache

• **cache**: _object_

_Inherited from [Factory](_entities_factories_factory_.factory.md).[cache](_entities_factories_factory_.factory.md#cache)_

_Defined in [src/entities/factories/Factory.ts:28](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/factories/Factory.ts#L28)_

#### Type declaration:

- \[ **key**: _string_\]: [TaxWithholding](_entities_taxwithholding_.taxwithholding.md) | undefined

---

### context

• **context**: _[Context](_context_.context.md)_

_Inherited from [Factory](_entities_factories_factory_.factory.md).[context](_entities_factories_factory_.factory.md#context)_

_Defined in [src/entities/factories/Factory.ts:32](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/factories/Factory.ts#L32)_

## Methods

### create

▸ **create**(`uid`: string, `params`: [Params](../interfaces/_entities_taxwithholding_.params.md)): _EntityType_

_Inherited from [Factory](_entities_factories_factory_.factory.md).[create](_entities_factories_factory_.factory.md#create)_

_Defined in [src/entities/factories/Factory.ts:87](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/factories/Factory.ts#L87)_

Get an entity from the cache. Creates it if it isn't cached, updates it if it is

**Parameters:**

| Name     | Type                                                        | Description                      |
| -------- | ----------------------------------------------------------- | -------------------------------- |
| `uid`    | string                                                      | unique identifier for the entity |
| `params` | [Params](../interfaces/_entities_taxwithholding_.params.md) | constructor data for the entity  |

**Returns:** _EntityType_

---

### fetch

▸ **fetch**(`uid`: string): _Promise‹EntityType›_

_Inherited from [Factory](_entities_factories_factory_.factory.md).[fetch](_entities_factories_factory_.factory.md#fetch)_

_Defined in [src/entities/factories/Factory.ts:57](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/factories/Factory.ts#L57)_

Get an entity from the cache. Fetches the necessary data to create it if it isn't cached, refreshes it if it is

**Parameters:**

| Name  | Type   | Description                      |
| ----- | ------ | -------------------------------- |
| `uid` | string | unique identifier for the entity |

**Returns:** _Promise‹EntityType›_

---

### refresh

▸ **refresh**(`uid`: string): _Promise‹void›_

_Inherited from [Factory](_entities_factories_factory_.factory.md).[refresh](_entities_factories_factory_.factory.md#refresh)_

_Defined in [src/entities/factories/Factory.ts:108](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/factories/Factory.ts#L108)_

Fetch the data for an entity and updates its properties

**Parameters:**

| Name  | Type   | Description                      |
| ----- | ------ | -------------------------------- |
| `uid` | string | unique identifier for the entity |

**Returns:** _Promise‹void›_

---

### update

▸ **update**(`uid`: string, `params`: Partial‹[Params](../interfaces/_entities_taxwithholding_.params.md)›): _Promise‹void›_

_Inherited from [Factory](_entities_factories_factory_.factory.md).[update](_entities_factories_factory_.factory.md#update)_

_Defined in [src/entities/factories/Factory.ts:126](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/factories/Factory.ts#L126)_

Update an entity's properties in place

**Parameters:**

| Name     | Type                                                                 | Description                       |
| -------- | -------------------------------------------------------------------- | --------------------------------- |
| `uid`    | string                                                               | unique identifier for the entity  |
| `params` | Partial‹[Params](../interfaces/_entities_taxwithholding_.params.md)› | properties that should be updated |

**Returns:** _Promise‹void›_
