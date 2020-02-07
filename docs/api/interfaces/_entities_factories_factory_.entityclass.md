# Interface: EntityClass <**T, U**>

Represents an entity

## Type parameters

▪ **T**

▪ **U**

## Hierarchy

* **EntityClass**

## Index

### Constructors

* [constructor](_entities_factories_factory_.entityclass.md#constructor)

### Methods

* [generateId](_entities_factories_factory_.entityclass.md#generateid)
* [unserialize](_entities_factories_factory_.entityclass.md#unserialize)

## Constructors

###  constructor

\+ **new EntityClass**(`params`: T & U, `context`: [Context](../classes/_context_.context.md)): *[Entity](../classes/_entities_entity_.entity.md)‹T›*

*Defined in [src/entities/factories/Factory.ts:8](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/factories/Factory.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`params` | T & U |
`context` | [Context](../classes/_context_.context.md) |

**Returns:** *[Entity](../classes/_entities_entity_.entity.md)‹T›*

## Methods

###  generateId

▸ **generateId**(`identifiers`: U): *string*

*Defined in [src/entities/factories/Factory.ts:19](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/factories/Factory.ts#L19)*

generate a unique identifier for an entity

**Parameters:**

Name | Type |
------ | ------ |
`identifiers` | U |

**Returns:** *string*

___

###  unserialize

▸ **unserialize**(`uid`: string): *U*

*Defined in [src/entities/factories/Factory.ts:14](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/factories/Factory.ts#L14)*

unserialize serialized entity information

**Parameters:**

Name | Type |
------ | ------ |
`uid` | string |

**Returns:** *U*
