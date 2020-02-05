# Class: InvestmentFactory

Factory generates information for an Investment entity

## Hierarchy

- [Factory](_entities_factories_factory_.factory.md)‹[Investment](_entities_investment_.investment.md), [Params](../interfaces/_entities_investment_.params.md), [UniqueIdentifiers](../interfaces/_entities_investment_.uniqueidentifiers.md)›

  ↳ **InvestmentFactory**

## Index

### Constructors

- [constructor](_entities_factories_investmentfactory_.investmentfactory.md#constructor)

### Properties

- [Entity](_entities_factories_investmentfactory_.investmentfactory.md#entity)
- [cache](_entities_factories_investmentfactory_.investmentfactory.md#cache)
- [context](_entities_factories_investmentfactory_.investmentfactory.md#context)

### Methods

- [create](_entities_factories_investmentfactory_.investmentfactory.md#create)
- [fetch](_entities_factories_investmentfactory_.investmentfactory.md#fetch)
- [refresh](_entities_factories_investmentfactory_.investmentfactory.md#refresh)
- [update](_entities_factories_investmentfactory_.investmentfactory.md#update)

## Constructors

### constructor

\+ **new InvestmentFactory**(`context`: [Context](_context_.context.md)): _[InvestmentFactory](_entities_factories_investmentfactory_.investmentfactory.md)_

_Overrides [Factory](_entities_factories_factory_.factory.md).[constructor](_entities_factories_factory_.factory.md#constructor)_

_Defined in [src/entities/factories/InvestmentFactory.ts:106](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/factories/InvestmentFactory.ts#L106)_

Create an instance of the Investment Factory

**Parameters:**

| Name      | Type                            |
| --------- | ------------------------------- |
| `context` | [Context](_context_.context.md) |

**Returns:** _[InvestmentFactory](_entities_factories_investmentfactory_.investmentfactory.md)_

## Properties

### Entity

• **Entity**: _[EntityClass](../interfaces/_entities_factories_factory_.entityclass.md)‹[Params](../interfaces/_entities_investment_.params.md), [UniqueIdentifiers](../interfaces/_entities_investment_.uniqueidentifiers.md)›_

_Inherited from [Factory](_entities_factories_factory_.factory.md).[Entity](_entities_factories_factory_.factory.md#entity)_

_Defined in [src/entities/factories/Factory.ts:37](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/factories/Factory.ts#L37)_

entity class that this Factory is in charge of generating and caching

---

### cache

• **cache**: _object_

_Inherited from [Factory](_entities_factories_factory_.factory.md).[cache](_entities_factories_factory_.factory.md#cache)_

_Defined in [src/entities/factories/Factory.ts:28](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/factories/Factory.ts#L28)_

#### Type declaration:

- \[ **key**: _string_\]: [Investment](_entities_investment_.investment.md) | undefined

---

### context

• **context**: _[Context](_context_.context.md)_

_Inherited from [Factory](_entities_factories_factory_.factory.md).[context](_entities_factories_factory_.factory.md#context)_

_Defined in [src/entities/factories/Factory.ts:32](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/factories/Factory.ts#L32)_

## Methods

### create

▸ **create**(`uid`: string, `params`: [Params](../interfaces/_entities_investment_.params.md)): _EntityType_

_Inherited from [Factory](_entities_factories_factory_.factory.md).[create](_entities_factories_factory_.factory.md#create)_

_Defined in [src/entities/factories/Factory.ts:87](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/factories/Factory.ts#L87)_

Get an entity from the cache. Creates it if it isn't cached, updates it if it is

**Parameters:**

| Name     | Type                                                    | Description                      |
| -------- | ------------------------------------------------------- | -------------------------------- |
| `uid`    | string                                                  | unique identifier for the entity |
| `params` | [Params](../interfaces/_entities_investment_.params.md) | constructor data for the entity  |

**Returns:** _EntityType_

---

### fetch

▸ **fetch**(`uid`: string): _Promise‹EntityType›_

_Inherited from [Factory](_entities_factories_factory_.factory.md).[fetch](_entities_factories_factory_.factory.md#fetch)_

_Defined in [src/entities/factories/Factory.ts:57](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/factories/Factory.ts#L57)_

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

_Defined in [src/entities/factories/Factory.ts:108](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/factories/Factory.ts#L108)_

Fetch the data for an entity and updates its properties

**Parameters:**

| Name  | Type   | Description                      |
| ----- | ------ | -------------------------------- |
| `uid` | string | unique identifier for the entity |

**Returns:** _Promise‹void›_

---

### update

▸ **update**(`uid`: string, `params`: Partial‹[Params](../interfaces/_entities_investment_.params.md)›): _Promise‹void›_

_Inherited from [Factory](_entities_factories_factory_.factory.md).[update](_entities_factories_factory_.factory.md#update)_

_Defined in [src/entities/factories/Factory.ts:126](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/factories/Factory.ts#L126)_

Update an entity's properties in place

**Parameters:**

| Name     | Type                                                             | Description                       |
| -------- | ---------------------------------------------------------------- | --------------------------------- |
| `uid`    | string                                                           | unique identifier for the entity  |
| `params` | Partial‹[Params](../interfaces/_entities_investment_.params.md)› | properties that should be updated |

**Returns:** _Promise‹void›_
