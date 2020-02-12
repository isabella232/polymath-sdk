# Interface: EntityClass <**T, U**>

Represents an entity

## Type parameters

▪ **T**

▪ **U**

## Hierarchy

* **EntityClass**

## Index

### Constructors

* [constructor](entities.factories.entityclass.md#constructor)

### Methods

* [generateId](entities.factories.entityclass.md#generateid)
* [unserialize](entities.factories.entityclass.md#unserialize)

## Constructors

###  constructor

\+ **new EntityClass**(`params`: T & U, `context`: [Context](../classes/_context_.context.md)): *[Entity](../classes/entities.entity.md)‹T›*

*Defined in [src/entities/factories/Factory.ts:13](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/factories/Factory.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`params` | T & U |
`context` | [Context](../classes/_context_.context.md) |

**Returns:** *[Entity](../classes/entities.entity.md)‹T›*

## Methods

###  generateId

▸ **generateId**(`identifiers`: U): *string*

*Defined in [src/entities/factories/Factory.ts:24](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/factories/Factory.ts#L24)*

generate a unique identifier for an entity

**Parameters:**

Name | Type |
------ | ------ |
`identifiers` | U |

**Returns:** *string*

___

###  unserialize

▸ **unserialize**(`uid`: string): *U*

*Defined in [src/entities/factories/Factory.ts:19](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/factories/Factory.ts#L19)*

unserialize serialized entity information

**Parameters:**

Name | Type |
------ | ------ |
`uid` | string |

**Returns:** *U*
