# Interface: GetStoMethod

## Hierarchy

- **GetStoMethod**

## Callable

▸ (`args`: object): _Promise‹[SimpleSto](../classes/_entities_simplesto_.simplesto.md)›_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:149](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Issuance/Offerings.ts#L149)_

**Parameters:**

▪ **args**: _object_

| Name      | Type                                               |
| --------- | -------------------------------------------------- |
| `address` | string                                             |
| `stoType` | [Simple](../enums/_types_index_.stotype.md#simple) |

**Returns:** _Promise‹[SimpleSto](../classes/_entities_simplesto_.simplesto.md)›_

▸ (`args`: object): _Promise‹[TieredSto](../classes/_entities_tieredsto_.tieredsto.md)›_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:150](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Issuance/Offerings.ts#L150)_

**Parameters:**

▪ **args**: _object_

| Name      | Type                                               |
| --------- | -------------------------------------------------- |
| `address` | string                                             |
| `stoType` | [Tiered](../enums/_types_index_.stotype.md#tiered) |

**Returns:** _Promise‹[TieredSto](../classes/_entities_tieredsto_.tieredsto.md)›_

▸ (`args`: string): _Promise‹[SimpleSto](../classes/_entities_simplesto_.simplesto.md) | [TieredSto](../classes/_entities_tieredsto_.tieredsto.md)›_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:151](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Issuance/Offerings.ts#L151)_

**Parameters:**

| Name   | Type   |
| ------ | ------ |
| `args` | string |

**Returns:** _Promise‹[SimpleSto](../classes/_entities_simplesto_.simplesto.md) | [TieredSto](../classes/_entities_tieredsto_.tieredsto.md)›_
