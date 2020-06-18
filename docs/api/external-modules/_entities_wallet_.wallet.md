# Wallet

Used to manage a wallet

## Hierarchy

* [Entity]()‹[Params]()›

  ↳ **Wallet**

## Index

### Constructors

* [constructor]()

### Properties

* [address]()
* [context]()
* [uid]()

### Methods

* [\_refresh]()
* [getErc20Balance]()
* [getEthBalance]()
* [getPolyBalance]()
* [toPojo]()
* [generateId]()
* [unserialize]()

## Constructors

### constructor

+ **new Wallet**\(`params`: [Params](), `context`: [Context]()\): [_Wallet_]()

_Defined in_ [_src/entities/Wallet.ts:71_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Wallet.ts#L71)

Create a wallet entity

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | [Params]() |
| `context` | [Context]() |

**Returns:** [_Wallet_]()

## Properties

### address

• **address**: _string_

_Defined in_ [_src/entities/Wallet.ts:69_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Wallet.ts#L69)

wallet address

### `Protected` context

• **context**: [_Context_]()

_Defined in_ [_src/entities/Wallet.ts:71_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Wallet.ts#L71)

### uid

• **uid**: _string_

_Overrides_ [_Entity_]()_._[_uid_]()

_Defined in_ [_src/entities/Wallet.ts:64_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Wallet.ts#L64)

unique generated wallet id

## Methods

### \_refresh

▸ **\_refresh**\(`params`: Partial‹[Params]()›\): _void_

_Overrides_ [_Entity_]()_._[_\_refresh_]()

_Defined in_ [_src/entities/Wallet.ts:103_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Wallet.ts#L103)

Hydrate the entity

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | Partial‹[Params]()› |

**Returns:** _void_

### getErc20Balance

▸ **getErc20Balance**\(`args`: object\): _Promise‹BigNumber›_

_Defined in_ [_src/entities/Wallet.ts:132_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Wallet.ts#L132)

Retrieve the ERC20 balance of this particular wallet address

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `tokenAddress` | string |

**Returns:** _Promise‹BigNumber›_

### getEthBalance

▸ **getEthBalance**\(\): _Promise‹BigNumber›_

_Defined in_ [_src/entities/Wallet.ts:122_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Wallet.ts#L122)

Retrieve the ETH balance of this particular wallet address

**Returns:** _Promise‹BigNumber›_

### getPolyBalance

▸ **getPolyBalance**\(\): _Promise‹BigNumber›_

_Defined in_ [_src/entities/Wallet.ts:114_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Wallet.ts#L114)

Retrieve the POLY balance of this particular wallet address

**Returns:** _Promise‹BigNumber›_

### toPojo

▸ **toPojo**\(\): _object_

_Overrides_ [_Entity_]()_._[_toPojo_]()

_Defined in_ [_src/entities/Wallet.ts:91_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Wallet.ts#L91)

Convert entity to a POJO \(Plain Old Javascript Object\)

**Returns:** _object_

* **address**: _string_
* **uid**: _string_

### `Static` generateId

▸ **generateId**\(`__namedParameters`: object\): _string_

_Defined in_ [_src/entities/Wallet.ts:37_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Wallet.ts#L37)

Generate the Wallet's UUID from its identifying properties

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type |
| :--- | :--- |
| `address` | string |

**Returns:** _string_

### `Static` unserialize

▸ **unserialize**\(`serialized`: string\): [_UniqueIdentifiers_]()

_Defined in_ [_src/entities/Wallet.ts:48_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Wallet.ts#L48)

Unserialize a serialized entity

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `serialized` | string | string with entity information |

**Returns:** [_UniqueIdentifiers_]()

