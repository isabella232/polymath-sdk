# Class: Factory <**EntityType, T, U**>

Factories are tasked with creating instances of their corresponding Entity and managing the internal cache for that Entity type.
So, for example, the Security Token Factory is tasked with fetching necessary data to instance a Security Token,
as well as fetching/refreshing the internal Security Token cache

## Type parameters

▪ **EntityType**: _[Entity](_entities_entity_.entity.md)‹T›_

▪ **T**: _any_

▪ **U**: _any_

## Hierarchy

- **Factory**

  ↳ [Erc20TokenBalanceFactory](_entities_factories_erc20tokenbalancefactory_.erc20tokenbalancefactory.md)

  ↳ [InvestmentFactory](_entities_factories_investmentfactory_.investmentfactory.md)

  ↳ [SimpleStoFactory](_entities_factories_simplestofactory_.simplestofactory.md)

  ↳ [TieredStoFactory](_entities_factories_tieredstofactory_.tieredstofactory.md)

  ↳ [ShareholderFactory](_entities_factories_shareholderfactory_.shareholderfactory.md)

  ↳ [TaxWithholdingFactory](_entities_factories_taxwithholdingfactory_.taxwithholdingfactory.md)

  ↳ [WalletFactory](_entities_factories_walletfactory_.walletfactory.md)

## Index

### Constructors

- [constructor](_entities_factories_factory_.factory.md#constructor)

### Properties

- [Entity](_entities_factories_factory_.factory.md#entity)
- [cache](_entities_factories_factory_.factory.md#cache)
- [context](_entities_factories_factory_.factory.md#context)

### Methods

- [create](_entities_factories_factory_.factory.md#create)
- [fetch](_entities_factories_factory_.factory.md#fetch)
- [refresh](_entities_factories_factory_.factory.md#refresh)
- [update](_entities_factories_factory_.factory.md#update)

## Constructors

### constructor

\+ **new Factory**(`eClass`: [EntityClass](../interfaces/_entities_factories_factory_.entityclass.md)‹T, U›, `context`: [Context](_context_.context.md)): _[Factory](_entities_factories_factory_.factory.md)_

_Defined in [src/entities/factories/Factory.ts:42](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/entities/factories/Factory.ts#L42)_

Create a factory that can generate an entity

**Parameters:**

| Name      | Type                                                                           |
| --------- | ------------------------------------------------------------------------------ |
| `eClass`  | [EntityClass](../interfaces/_entities_factories_factory_.entityclass.md)‹T, U› |
| `context` | [Context](_context_.context.md)                                                |

**Returns:** _[Factory](_entities_factories_factory_.factory.md)_

## Properties

### Entity

• **Entity**: _[EntityClass](../interfaces/_entities_factories_factory_.entityclass.md)‹T, U›_

_Defined in [src/entities/factories/Factory.ts:37](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/entities/factories/Factory.ts#L37)_

entity class that this Factory is in charge of generating and caching

---

### cache

• **cache**: _object_

_Defined in [src/entities/factories/Factory.ts:28](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/entities/factories/Factory.ts#L28)_

#### Type declaration:

- \[ **key**: _string_\]: EntityType | undefined

---

### context

• **context**: _[Context](_context_.context.md)_

_Defined in [src/entities/factories/Factory.ts:32](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/entities/factories/Factory.ts#L32)_

## Methods

### create

▸ **create**(`uid`: string, `params`: T): _EntityType_

_Defined in [src/entities/factories/Factory.ts:87](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/entities/factories/Factory.ts#L87)_

Get an entity from the cache. Creates it if it isn't cached, updates it if it is

**Parameters:**

| Name     | Type   | Description                      |
| -------- | ------ | -------------------------------- |
| `uid`    | string | unique identifier for the entity |
| `params` | T      | constructor data for the entity  |

**Returns:** _EntityType_

---

### fetch

▸ **fetch**(`uid`: string): _Promise‹EntityType›_

_Defined in [src/entities/factories/Factory.ts:57](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/entities/factories/Factory.ts#L57)_

Get an entity from the cache. Fetches the necessary data to create it if it isn't cached, refreshes it if it is

**Parameters:**

| Name  | Type   | Description                      |
| ----- | ------ | -------------------------------- |
| `uid` | string | unique identifier for the entity |

**Returns:** _Promise‹EntityType›_

---

### refresh

▸ **refresh**(`uid`: string): _Promise‹void›_

_Defined in [src/entities/factories/Factory.ts:108](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/entities/factories/Factory.ts#L108)_

Fetch the data for an entity and updates its properties

**Parameters:**

| Name  | Type   | Description                      |
| ----- | ------ | -------------------------------- |
| `uid` | string | unique identifier for the entity |

**Returns:** _Promise‹void›_

---

### update

▸ **update**(`uid`: string, `params`: Partial‹T›): _Promise‹void›_

_Defined in [src/entities/factories/Factory.ts:126](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/entities/factories/Factory.ts#L126)_

Update an entity's properties in place

**Parameters:**

| Name     | Type       | Description                       |
| -------- | ---------- | --------------------------------- |
| `uid`    | string     | unique identifier for the entity  |
| `params` | Partial‹T› | properties that should be updated |

**Returns:** _Promise‹void›_
