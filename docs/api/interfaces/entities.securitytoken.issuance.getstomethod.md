# Interface: GetStoMethod

## Hierarchy

* **GetStoMethod**

## Callable

▸ (`args`: object): *Promise‹[SimpleSto](../classes/entities.simplesto.md)›*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:154](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/Issuance/Offerings.ts#L154)*

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`address` | string |
`stoType` | [Simple](../enums/_types_index_.stotype.md#simple) |

**Returns:** *Promise‹[SimpleSto](../classes/entities.simplesto.md)›*

▸ (`args`: object): *Promise‹[TieredSto](../classes/entities.tieredsto.md)›*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:155](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/Issuance/Offerings.ts#L155)*

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`address` | string |
`stoType` | [Tiered](../enums/_types_index_.stotype.md#tiered) |

**Returns:** *Promise‹[TieredSto](../classes/entities.tieredsto.md)›*

▸ (`args`: string): *Promise‹[SimpleSto](../classes/entities.simplesto.md) | [TieredSto](../classes/entities.tieredsto.md)›*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:156](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/Issuance/Offerings.ts#L156)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | string |

**Returns:** *Promise‹[SimpleSto](../classes/entities.simplesto.md) | [TieredSto](../classes/entities.tieredsto.md)›*
