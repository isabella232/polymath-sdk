# Class: Wallet

Used to manage a wallet

## Hierarchy

- [Entity](_entities_entity_.entity.md)‹[Params](../interfaces/_entities_wallet_.params.md)›

  ↳ **Wallet**

## Index

### Constructors

- [constructor](_entities_wallet_.wallet.md#constructor)

### Properties

- [address](_entities_wallet_.wallet.md#address)
- [context](_entities_wallet_.wallet.md#protected-context)
- [uid](_entities_wallet_.wallet.md#uid)

### Methods

- [\_refresh](_entities_wallet_.wallet.md#_refresh)
- [getErc20Balance](_entities_wallet_.wallet.md#geterc20balance)
- [getEthBalance](_entities_wallet_.wallet.md#getethbalance)
- [getPolyBalance](_entities_wallet_.wallet.md#getpolybalance)
- [toPojo](_entities_wallet_.wallet.md#topojo)
- [generateId](_entities_wallet_.wallet.md#static-generateid)
- [unserialize](_entities_wallet_.wallet.md#static-unserialize)

## Constructors

### constructor

\+ **new Wallet**(`params`: [Params](../interfaces/_entities_wallet_.params.md), `context`: [Context](_context_.context.md)): _[Wallet](_entities_wallet_.wallet.md)_

_Defined in [src/entities/Wallet.ts:71](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Wallet.ts#L71)_

Create a wallet entity

**Parameters:**

| Name      | Type                                                |
| --------- | --------------------------------------------------- |
| `params`  | [Params](../interfaces/_entities_wallet_.params.md) |
| `context` | [Context](_context_.context.md)                     |

**Returns:** _[Wallet](_entities_wallet_.wallet.md)_

## Properties

### address

• **address**: _string_

_Defined in [src/entities/Wallet.ts:69](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Wallet.ts#L69)_

wallet address

---

### `Protected` context

• **context**: _[Context](_context_.context.md)_

_Defined in [src/entities/Wallet.ts:71](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Wallet.ts#L71)_

---

### uid

• **uid**: _string_

_Overrides [Entity](_entities_entity_.entity.md).[uid](_entities_entity_.entity.md#abstract-uid)_

_Defined in [src/entities/Wallet.ts:64](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Wallet.ts#L64)_

unique generated wallet id

## Methods

### \_refresh

▸ **\_refresh**(`params`: Partial‹[Params](../interfaces/_entities_wallet_.params.md)›): _void_

_Overrides [Entity](_entities_entity_.entity.md).[\_refresh](_entities_entity_.entity.md#abstract-_refresh)_

_Defined in [src/entities/Wallet.ts:103](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Wallet.ts#L103)_

Hydrate the entity

**Parameters:**

| Name     | Type                                                         |
| -------- | ------------------------------------------------------------ |
| `params` | Partial‹[Params](../interfaces/_entities_wallet_.params.md)› |

**Returns:** _void_

---

### getErc20Balance

▸ **getErc20Balance**(`args`: object): _Promise‹BigNumber›_

_Defined in [src/entities/Wallet.ts:132](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Wallet.ts#L132)_

Retrieve the ERC20 balance of this particular wallet address

**Parameters:**

▪ **args**: _object_

| Name           | Type   |
| -------------- | ------ |
| `tokenAddress` | string |

**Returns:** _Promise‹BigNumber›_

---

### getEthBalance

▸ **getEthBalance**(): _Promise‹BigNumber›_

_Defined in [src/entities/Wallet.ts:122](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Wallet.ts#L122)_

Retrieve the ETH balance of this particular wallet address

**Returns:** _Promise‹BigNumber›_

---

### getPolyBalance

▸ **getPolyBalance**(): _Promise‹BigNumber›_

_Defined in [src/entities/Wallet.ts:114](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Wallet.ts#L114)_

Retrieve the POLY balance of this particular wallet address

**Returns:** _Promise‹BigNumber›_

---

### toPojo

▸ **toPojo**(): _object_

_Overrides [Entity](_entities_entity_.entity.md).[toPojo](_entities_entity_.entity.md#abstract-topojo)_

_Defined in [src/entities/Wallet.ts:91](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Wallet.ts#L91)_

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** _object_

- **address**: _string_

- **uid**: _string_

---

### `Static` generateId

▸ **generateId**(`__namedParameters`: object): _string_

_Defined in [src/entities/Wallet.ts:37](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Wallet.ts#L37)_

Generate the Wallet's UUID from its identifying properties

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name      | Type   |
| --------- | ------ |
| `address` | string |

**Returns:** _string_

---

### `Static` unserialize

▸ **unserialize**(`serialized`: string): _[UniqueIdentifiers](../interfaces/_entities_wallet_.uniqueidentifiers.md)_

_Defined in [src/entities/Wallet.ts:48](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Wallet.ts#L48)_

Unserialize a serialized entity

**Parameters:**

| Name         | Type   | Description                    |
| ------------ | ------ | ------------------------------ |
| `serialized` | string | string with entity information |

**Returns:** _[UniqueIdentifiers](../interfaces/_entities_wallet_.uniqueidentifiers.md)_
