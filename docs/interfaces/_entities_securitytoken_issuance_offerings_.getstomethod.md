[@polymathnetwork/sdk - v2.0.1-beta.120](../README.md) › [Globals](../globals.md) › ["entities/SecurityToken/Issuance/Offerings"](../modules/_entities_securitytoken_issuance_offerings_.md) › [GetStoMethod](_entities_securitytoken_issuance_offerings_.getstomethod.md)

# Interface: GetStoMethod

## Hierarchy

- **GetStoMethod**

## Callable

▸ (`args`: object): _Promise‹[SimpleSto](../classes/_entities_simplesto_.simplesto.md)›_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:149](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/Issuance/Offerings.ts#L149)_

**Parameters:**

▪ **args**: _object_

| Name      | Type                                               |
| --------- | -------------------------------------------------- |
| `address` | string                                             |
| `stoType` | [Simple](../enums/_types_index_.stotype.md#simple) |

**Returns:** _Promise‹[SimpleSto](../classes/_entities_simplesto_.simplesto.md)›_

▸ (`args`: object): _Promise‹[TieredSto](../classes/_entities_tieredsto_.tieredsto.md)›_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:150](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/Issuance/Offerings.ts#L150)_

**Parameters:**

▪ **args**: _object_

| Name      | Type                                               |
| --------- | -------------------------------------------------- |
| `address` | string                                             |
| `stoType` | [Tiered](../enums/_types_index_.stotype.md#tiered) |

**Returns:** _Promise‹[TieredSto](../classes/_entities_tieredsto_.tieredsto.md)›_

▸ (`args`: string): _Promise‹[SimpleSto](../classes/_entities_simplesto_.simplesto.md) | [TieredSto](../classes/_entities_tieredsto_.tieredsto.md)›_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:151](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/Issuance/Offerings.ts#L151)_

**Parameters:**

| Name   | Type   |
| ------ | ------ |
| `args` | string |

**Returns:** _Promise‹[SimpleSto](../classes/_entities_simplesto_.simplesto.md) | [TieredSto](../classes/_entities_tieredsto_.tieredsto.md)›_
