# External module: "entities/SecurityToken/SecurityToken"

## Index

### Classes

* [SecurityToken](../classes/_entities_securitytoken_securitytoken_.securitytoken.md)

### Interfaces

* [Params](../interfaces/_entities_securitytoken_securitytoken_.params.md)
* [UniqueIdentifiers](../interfaces/_entities_securitytoken_securitytoken_.uniqueidentifiers.md)

### Functions

* [isUniqueIdentifiers](_entities_securitytoken_securitytoken_.md#isuniqueidentifiers)
* [unserialize](_entities_securitytoken_securitytoken_.md#const-unserialize)

## Functions

###  isUniqueIdentifiers

▸ **isUniqueIdentifiers**(`identifiers`: any): *identifiers is UniqueIdentifiers*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:30](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/SecurityToken.ts#L30)*

Check if the provided value is of type [UniqueIdentifiers](../interfaces/_entities_securitytoken_securitytoken_.uniqueidentifiers.md)

**Parameters:**

Name | Type |
------ | ------ |
`identifiers` | any |

**Returns:** *identifiers is UniqueIdentifiers*

___

### `Const` unserialize

▸ **unserialize**(`serialized`: string): *[UniqueIdentifiers](../interfaces/_entities_securitytoken_securitytoken_.uniqueidentifiers.md)*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:72](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/SecurityToken.ts#L72)*

Unserialize string to a Security Token object representation

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`serialized` | string | Security Token's serialized representation  |

**Returns:** *[UniqueIdentifiers](../interfaces/_entities_securitytoken_securitytoken_.uniqueidentifiers.md)*
