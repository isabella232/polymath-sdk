# Wallet

Used to manage a wallet

## Hierarchy

* [Entity](_entities_entity_.entity.md)‹[Params](../interfaces/_entities_wallet_.params.md)›

  ↳ **Wallet**

## Index

### Constructors

* [constructor](_entities_wallet_.wallet.md#constructor)

### Properties

* [address](_entities_wallet_.wallet.md#address)
* [context](_entities_wallet_.wallet.md#protected-context)
* [uid](_entities_wallet_.wallet.md#uid)

### Methods

* [\_refresh](_entities_wallet_.wallet.md#_refresh)
* [getErc20Balance](_entities_wallet_.wallet.md#geterc20balance)
* [getEthBalance](_entities_wallet_.wallet.md#getethbalance)
* [getPolyBalance](_entities_wallet_.wallet.md#getpolybalance)
* [toPojo](_entities_wallet_.wallet.md#topojo)
* [generateId](_entities_wallet_.wallet.md#static-generateid)
* [unserialize](_entities_wallet_.wallet.md#static-unserialize)

## Constructors

### constructor

+ **new Wallet**\(`params`: [Params](../interfaces/_entities_wallet_.params.md), `context`: [Context](_context_.context.md)\): [_Wallet_](_entities_wallet_.wallet.md)

_Defined in_ [_src/entities/Wallet.ts:71_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Wallet.ts#L71)

Create a wallet entity

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | [Params](../interfaces/_entities_wallet_.params.md) |
| `context` | [Context](_context_.context.md) |

**Returns:** [_Wallet_](_entities_wallet_.wallet.md)

## Properties

### address

• **address**: _string_

_Defined in_ [_src/entities/Wallet.ts:69_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Wallet.ts#L69)

wallet address

### `Protected` context

• **context**: [_Context_](_context_.context.md)

_Defined in_ [_src/entities/Wallet.ts:71_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Wallet.ts#L71)

### uid

• **uid**: _string_

_Overrides_ [_Entity_](_entities_entity_.entity.md)_._[_uid_](_entities_entity_.entity.md#abstract-uid)

_Defined in_ [_src/entities/Wallet.ts:64_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Wallet.ts#L64)

unique generated wallet id

## Methods

### \_refresh

▸ **\_refresh**\(`params`: Partial‹[Params](../interfaces/_entities_wallet_.params.md)›\): _void_

_Overrides_ [_Entity_](_entities_entity_.entity.md)_._[_\_refresh_](_entities_entity_.entity.md#abstract-_refresh)

_Defined in_ [_src/entities/Wallet.ts:103_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Wallet.ts#L103)

Hydrate the entity

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | Partial‹[Params](../interfaces/_entities_wallet_.params.md)› |

**Returns:** _void_

### getErc20Balance

▸ **getErc20Balance**\(`args`: object\): _Promise‹BigNumber›_

_Defined in_ [_src/entities/Wallet.ts:132_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Wallet.ts#L132)

Retrieve the ERC20 balance of this particular wallet address

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `tokenAddress` | string |

**Returns:** _Promise‹BigNumber›_

### getEthBalance

▸ **getEthBalance**\(\): _Promise‹BigNumber›_

_Defined in_ [_src/entities/Wallet.ts:122_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Wallet.ts#L122)

Retrieve the ETH balance of this particular wallet address

**Returns:** _Promise‹BigNumber›_

### getPolyBalance

▸ **getPolyBalance**\(\): _Promise‹BigNumber›_

_Defined in_ [_src/entities/Wallet.ts:114_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Wallet.ts#L114)

Retrieve the POLY balance of this particular wallet address

**Returns:** _Promise‹BigNumber›_

### toPojo

▸ **toPojo**\(\): _object_

_Overrides_ [_Entity_](_entities_entity_.entity.md)_._[_toPojo_](_entities_entity_.entity.md#abstract-topojo)

_Defined in_ [_src/entities/Wallet.ts:91_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Wallet.ts#L91)

Convert entity to a POJO \(Plain Old Javascript Object\)

**Returns:** _object_

* **address**: _string_
* **uid**: _string_

### `Static` generateId

▸ **generateId**\(`__namedParameters`: object\): _string_

_Defined in_ [_src/entities/Wallet.ts:37_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Wallet.ts#L37)

Generate the Wallet's UUID from its identifying properties

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type |
| :--- | :--- |
| `address` | string |

**Returns:** _string_

### `Static` unserialize

▸ **unserialize**\(`serialized`: string\): [_UniqueIdentifiers_](../interfaces/_entities_wallet_.uniqueidentifiers.md)

_Defined in_ [_src/entities/Wallet.ts:48_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Wallet.ts#L48)

Unserialize a serialized entity

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `serialized` | string | string with entity information |

**Returns:** [_UniqueIdentifiers_](../interfaces/_entities_wallet_.uniqueidentifiers.md)

