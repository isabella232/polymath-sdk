[@polymathnetwork/sdk - v2.0.1-beta.120](../README.md) › [Globals](../globals.md) › ["entities/SecurityToken/SecurityToken"](_entities_securitytoken_securitytoken_.md)

# External module: "entities/SecurityToken/SecurityToken"

## Index

### Classes

- [SecurityToken](../classes/_entities_securitytoken_securitytoken_.securitytoken.md)

### Interfaces

- [Params](../interfaces/_entities_securitytoken_securitytoken_.params.md)
- [UniqueIdentifiers](../interfaces/_entities_securitytoken_securitytoken_.uniqueidentifiers.md)

### Functions

- [isUniqueIdentifiers](_entities_securitytoken_securitytoken_.md#isuniqueidentifiers)
- [unserialize](_entities_securitytoken_securitytoken_.md#const-unserialize)

## Functions

### isUniqueIdentifiers

▸ **isUniqueIdentifiers**(`identifiers`: any): _identifiers is UniqueIdentifiers_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:30](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SecurityToken.ts#L30)_

Check if the provided value is of type [UniqueIdentifiers](../interfaces/_entities_securitytoken_securitytoken_.uniqueidentifiers.md)

**Parameters:**

| Name          | Type |
| ------------- | ---- |
| `identifiers` | any  |

**Returns:** _identifiers is UniqueIdentifiers_

---

### `Const` unserialize

▸ **unserialize**(`serialized`: string): _[UniqueIdentifiers](../interfaces/_entities_securitytoken_securitytoken_.uniqueidentifiers.md)_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:72](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SecurityToken.ts#L72)_

Unserialize string to a Security Token object representation

**Parameters:**

| Name         | Type   | Description                                |
| ------------ | ------ | ------------------------------------------ |
| `serialized` | string | Security Token's serialized representation |

**Returns:** _[UniqueIdentifiers](../interfaces/_entities_securitytoken_securitytoken_.uniqueidentifiers.md)_
