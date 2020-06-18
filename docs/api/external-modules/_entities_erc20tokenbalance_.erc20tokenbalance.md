# Erc20TokenBalance

Used to manage a ERC20 token balance

## Hierarchy

* [Entity]()‹[Params]()›

  ↳ **Erc20TokenBalance**

## Index

### Constructors

* [constructor]()

### Properties

* [balance]()
* [tokenAddress]()
* [tokenSymbol]()
* [uid]()
* [walletAddress]()

### Methods

* [\_refresh]()
* [toPojo]()
* [generateId]()
* [unserialize]()

## Constructors

### constructor

+ **new Erc20TokenBalance**\(`params`: [Params]() & [UniqueIdentifiers]()\): [_Erc20TokenBalance_]()

_Defined in_ [_src/entities/Erc20TokenBalance.ts:84_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Erc20TokenBalance.ts#L84)

Create an ERC20 Token balance instance

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | [Params]() & [UniqueIdentifiers]() |

**Returns:** [_Erc20TokenBalance_]()

## Properties

### balance

• **balance**: _BigNumber_

_Defined in_ [_src/entities/Erc20TokenBalance.ts:84_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Erc20TokenBalance.ts#L84)

total number of tokens belonging to token holder

### tokenAddress

• **tokenAddress**: _string_

_Defined in_ [_src/entities/Erc20TokenBalance.ts:74_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Erc20TokenBalance.ts#L74)

address of the ERC20 token

### tokenSymbol

• **tokenSymbol**: _string \| null_

_Defined in_ [_src/entities/Erc20TokenBalance.ts:69_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Erc20TokenBalance.ts#L69)

### uid

• **uid**: _string_

_Overrides_ [_Entity_]()_._[_uid_]()

_Defined in_ [_src/entities/Erc20TokenBalance.ts:67_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Erc20TokenBalance.ts#L67)

unique generated identifier for an ERC20 token balance

### walletAddress

• **walletAddress**: _string_

_Defined in_ [_src/entities/Erc20TokenBalance.ts:79_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Erc20TokenBalance.ts#L79)

wallet address of the token holder

## Methods

### \_refresh

▸ **\_refresh**\(`params`: Partial‹[Params]()›\): _void_

_Overrides_ [_Entity_]()_._[_\_refresh_]()

_Defined in_ [_src/entities/Erc20TokenBalance.ts:122_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Erc20TokenBalance.ts#L122)

Hydrate the entity

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | Partial‹[Params]()› |

**Returns:** _void_

### toPojo

▸ **toPojo**\(\): _object_

_Overrides_ [_Entity_]()_._[_toPojo_]()

_Defined in_ [_src/entities/Erc20TokenBalance.ts:107_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Erc20TokenBalance.ts#L107)

Convert entity to a POJO \(Plain Old Javascript Object\)

**Returns:** _object_

* **balance**: _BigNumber_
* **tokenAddress**: _string_
* **tokenSymbol**: _null \| string_
* **uid**: _string_
* **walletAddress**: _string_

### `Static` generateId

▸ **generateId**\(`__namedParameters`: object\): _string_

_Defined in_ [_src/entities/Erc20TokenBalance.ts:39_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Erc20TokenBalance.ts#L39)

Generate the ERC20 Token Balance's UUID from its identifying properties

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type |
| :--- | :--- |
| `tokenAddress` | string |
| `walletAddress` | string |

**Returns:** _string_

### `Static` unserialize

▸ **unserialize**\(`serialized`: any\): [_UniqueIdentifiers_]()

_Defined in_ [_src/entities/Erc20TokenBalance.ts:51_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Erc20TokenBalance.ts#L51)

Unserialize a serialized erc20 token balance

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `serialized` | any | string with erc20 token balance entity information |

**Returns:** [_UniqueIdentifiers_]()

