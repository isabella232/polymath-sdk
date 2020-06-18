# Interface: GetStoMethod

## Hierarchy

* **GetStoMethod**

## Callable

▸ (`args`: object): *Promise‹[SimpleSto](../classes/_entities_simplesto_.simplesto.md)›*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:149](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/SecurityToken/Issuance/Offerings.ts#L149)*

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`address` | string |
`stoType` | [Simple](../enums/_types_index_.stotype.md#simple) |

**Returns:** *Promise‹[SimpleSto](../classes/_entities_simplesto_.simplesto.md)›*

▸ (`args`: object): *Promise‹[TieredSto](../classes/_entities_tieredsto_.tieredsto.md)›*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:150](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/SecurityToken/Issuance/Offerings.ts#L150)*

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`address` | string |
`stoType` | [Tiered](../enums/_types_index_.stotype.md#tiered) |

**Returns:** *Promise‹[TieredSto](../classes/_entities_tieredsto_.tieredsto.md)›*

▸ (`args`: string): *Promise‹[SimpleSto](../classes/_entities_simplesto_.simplesto.md) | [TieredSto](../classes/_entities_tieredsto_.tieredsto.md)›*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:151](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/SecurityToken/Issuance/Offerings.ts#L151)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | string |

**Returns:** *Promise‹[SimpleSto](../classes/_entities_simplesto_.simplesto.md) | [TieredSto](../classes/_entities_tieredsto_.tieredsto.md)›*
