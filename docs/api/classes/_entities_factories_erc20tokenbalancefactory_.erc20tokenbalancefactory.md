# Class: Erc20TokenBalanceFactory

Factory generates information for an ERC20 Token Balance

## Hierarchy

- [Factory](_entities_factories_factory_.factory.md)‹[Erc20TokenBalance](_entities_erc20tokenbalance_.erc20tokenbalance.md), [Params](../interfaces/_entities_erc20tokenbalance_.params.md), [UniqueIdentifiers](../interfaces/_entities_erc20tokenbalance_.uniqueidentifiers.md)›

  ↳ **Erc20TokenBalanceFactory**

## Index

### Constructors

- [constructor](_entities_factories_erc20tokenbalancefactory_.erc20tokenbalancefactory.md#constructor)

### Properties

- [Entity](_entities_factories_erc20tokenbalancefactory_.erc20tokenbalancefactory.md#entity)
- [cache](_entities_factories_erc20tokenbalancefactory_.erc20tokenbalancefactory.md#cache)
- [context](_entities_factories_erc20tokenbalancefactory_.erc20tokenbalancefactory.md#context)

### Methods

- [create](_entities_factories_erc20tokenbalancefactory_.erc20tokenbalancefactory.md#create)
- [fetch](_entities_factories_erc20tokenbalancefactory_.erc20tokenbalancefactory.md#fetch)
- [refresh](_entities_factories_erc20tokenbalancefactory_.erc20tokenbalancefactory.md#refresh)
- [update](_entities_factories_erc20tokenbalancefactory_.erc20tokenbalancefactory.md#update)

## Constructors

### constructor

\+ **new Erc20TokenBalanceFactory**(`context`: [Context](_context_.context.md)): _[Erc20TokenBalanceFactory](_entities_factories_erc20tokenbalancefactory_.erc20tokenbalancefactory.md)_

_Overrides [Factory](_entities_factories_factory_.factory.md).[constructor](_entities_factories_factory_.factory.md#constructor)_

_Defined in [src/entities/factories/Erc20TokenBalanceFactory.ts:28](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/factories/Erc20TokenBalanceFactory.ts#L28)_

Create an instance of the ERC20 Token Balance Factory

**Parameters:**

| Name      | Type                            |
| --------- | ------------------------------- |
| `context` | [Context](_context_.context.md) |

**Returns:** _[Erc20TokenBalanceFactory](_entities_factories_erc20tokenbalancefactory_.erc20tokenbalancefactory.md)_

## Properties

### Entity

• **Entity**: _[EntityClass](../interfaces/_entities_factories_factory_.entityclass.md)‹[Params](../interfaces/_entities_erc20tokenbalance_.params.md), [UniqueIdentifiers](../interfaces/_entities_erc20tokenbalance_.uniqueidentifiers.md)›_

_Inherited from [Factory](_entities_factories_factory_.factory.md).[Entity](_entities_factories_factory_.factory.md#entity)_

_Defined in [src/entities/factories/Factory.ts:37](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/factories/Factory.ts#L37)_

entity class that this Factory is in charge of generating and caching

---

### cache

• **cache**: _object_

_Inherited from [Factory](_entities_factories_factory_.factory.md).[cache](_entities_factories_factory_.factory.md#cache)_

_Defined in [src/entities/factories/Factory.ts:28](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/factories/Factory.ts#L28)_

#### Type declaration:

- \[ **key**: _string_\]: [Erc20TokenBalance](_entities_erc20tokenbalance_.erc20tokenbalance.md) | undefined

---

### context

• **context**: _[Context](_context_.context.md)_

_Inherited from [Factory](_entities_factories_factory_.factory.md).[context](_entities_factories_factory_.factory.md#context)_

_Defined in [src/entities/factories/Factory.ts:32](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/factories/Factory.ts#L32)_

## Methods

### create

▸ **create**(`uid`: string, `params`: [Params](../interfaces/_entities_erc20tokenbalance_.params.md)): _EntityType_

_Inherited from [Factory](_entities_factories_factory_.factory.md).[create](_entities_factories_factory_.factory.md#create)_

_Defined in [src/entities/factories/Factory.ts:87](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/factories/Factory.ts#L87)_

Get an entity from the cache. Creates it if it isn't cached, updates it if it is

**Parameters:**

| Name     | Type                                                           | Description                      |
| -------- | -------------------------------------------------------------- | -------------------------------- |
| `uid`    | string                                                         | unique identifier for the entity |
| `params` | [Params](../interfaces/_entities_erc20tokenbalance_.params.md) | constructor data for the entity  |

**Returns:** _EntityType_

---

### fetch

▸ **fetch**(`uid`: string): _Promise‹EntityType›_

_Inherited from [Factory](_entities_factories_factory_.factory.md).[fetch](_entities_factories_factory_.factory.md#fetch)_

_Defined in [src/entities/factories/Factory.ts:57](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/factories/Factory.ts#L57)_

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

_Defined in [src/entities/factories/Factory.ts:108](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/factories/Factory.ts#L108)_

Fetch the data for an entity and updates its properties

**Parameters:**

| Name  | Type   | Description                      |
| ----- | ------ | -------------------------------- |
| `uid` | string | unique identifier for the entity |

**Returns:** _Promise‹void›_

---

### update

▸ **update**(`uid`: string, `params`: Partial‹[Params](../interfaces/_entities_erc20tokenbalance_.params.md)›): _Promise‹void›_

_Inherited from [Factory](_entities_factories_factory_.factory.md).[update](_entities_factories_factory_.factory.md#update)_

_Defined in [src/entities/factories/Factory.ts:126](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/factories/Factory.ts#L126)_

Update an entity's properties in place

**Parameters:**

| Name     | Type                                                                    | Description                       |
| -------- | ----------------------------------------------------------------------- | --------------------------------- |
| `uid`    | string                                                                  | unique identifier for the entity  |
| `params` | Partial‹[Params](../interfaces/_entities_erc20tokenbalance_.params.md)› | properties that should be updated |

**Returns:** _Promise‹void›_
