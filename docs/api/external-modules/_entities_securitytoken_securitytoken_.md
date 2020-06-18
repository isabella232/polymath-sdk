# entities/SecurityToken/SecurityToken

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

### isUniqueIdentifiers

▸ **isUniqueIdentifiers**\(`identifiers`: any\): _identifiers is UniqueIdentifiers_

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:30_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L30)

Check if the provided value is of type [UniqueIdentifiers](../interfaces/_entities_securitytoken_securitytoken_.uniqueidentifiers.md)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `identifiers` | any |

**Returns:** _identifiers is UniqueIdentifiers_

### `Const` unserialize

▸ **unserialize**\(`serialized`: string\): [_UniqueIdentifiers_](../interfaces/_entities_securitytoken_securitytoken_.uniqueidentifiers.md)

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:72_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L72)

Unserialize string to a Security Token object representation

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `serialized` | string | Security Token's serialized representation |

**Returns:** [_UniqueIdentifiers_](../interfaces/_entities_securitytoken_securitytoken_.uniqueidentifiers.md)

