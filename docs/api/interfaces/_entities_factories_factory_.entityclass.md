# Interface: EntityClass <**T, U**>

Represents an entity

## Type parameters

▪ **T**

▪ **U**

## Hierarchy

- **EntityClass**

## Index

### Constructors

- [constructor](_entities_factories_factory_.entityclass.md#constructor)

### Methods

- [generateId](_entities_factories_factory_.entityclass.md#generateid)
- [unserialize](_entities_factories_factory_.entityclass.md#unserialize)

## Constructors

### constructor

\+ **new EntityClass**(`params`: T & U, `context`: [Context](../classes/_context_.context.md)): _[Entity](../classes/_entities_entity_.entity.md)‹T›_

_Defined in [src/entities/factories/Factory.ts:8](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/factories/Factory.ts#L8)_

**Parameters:**

| Name      | Type                                       |
| --------- | ------------------------------------------ |
| `params`  | T & U                                      |
| `context` | [Context](../classes/_context_.context.md) |

**Returns:** _[Entity](../classes/_entities_entity_.entity.md)‹T›_

## Methods

### generateId

▸ **generateId**(`identifiers`: U): _string_

_Defined in [src/entities/factories/Factory.ts:19](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/factories/Factory.ts#L19)_

generate a unique identifier for an entity

**Parameters:**

| Name          | Type |
| ------------- | ---- |
| `identifiers` | U    |

**Returns:** _string_

---

### unserialize

▸ **unserialize**(`uid`: string): _U_

_Defined in [src/entities/factories/Factory.ts:14](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/factories/Factory.ts#L14)_

unserialize serialized entity information

**Parameters:**

| Name  | Type   |
| ----- | ------ |
| `uid` | string |

**Returns:** _U_
