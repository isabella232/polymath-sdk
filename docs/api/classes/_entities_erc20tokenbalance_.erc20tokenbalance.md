# Class: Erc20TokenBalance

Used to manage a ERC20 token balance

## Hierarchy

* [Entity](_entities_entity_.entity.md)‹[Params](../interfaces/_entities_erc20tokenbalance_.params.md)›

  ↳ **Erc20TokenBalance**

## Index

### Constructors

* [constructor](_entities_erc20tokenbalance_.erc20tokenbalance.md#constructor)

### Properties

* [balance](_entities_erc20tokenbalance_.erc20tokenbalance.md#balance)
* [tokenAddress](_entities_erc20tokenbalance_.erc20tokenbalance.md#tokenaddress)
* [tokenSymbol](_entities_erc20tokenbalance_.erc20tokenbalance.md#tokensymbol)
* [uid](_entities_erc20tokenbalance_.erc20tokenbalance.md#uid)
* [walletAddress](_entities_erc20tokenbalance_.erc20tokenbalance.md#walletaddress)

### Methods

* [_refresh](_entities_erc20tokenbalance_.erc20tokenbalance.md#_refresh)
* [toPojo](_entities_erc20tokenbalance_.erc20tokenbalance.md#topojo)
* [generateId](_entities_erc20tokenbalance_.erc20tokenbalance.md#static-generateid)
* [unserialize](_entities_erc20tokenbalance_.erc20tokenbalance.md#static-unserialize)

## Constructors

###  constructor

\+ **new Erc20TokenBalance**(`params`: [Params](../interfaces/_entities_erc20tokenbalance_.params.md) & [UniqueIdentifiers](../interfaces/_entities_erc20tokenbalance_.uniqueidentifiers.md)): *[Erc20TokenBalance](_entities_erc20tokenbalance_.erc20tokenbalance.md)*

*Defined in [src/entities/Erc20TokenBalance.ts:84](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Erc20TokenBalance.ts#L84)*

Create an ERC20 Token balance instance

**Parameters:**

Name | Type |
------ | ------ |
`params` | [Params](../interfaces/_entities_erc20tokenbalance_.params.md) & [UniqueIdentifiers](../interfaces/_entities_erc20tokenbalance_.uniqueidentifiers.md) |

**Returns:** *[Erc20TokenBalance](_entities_erc20tokenbalance_.erc20tokenbalance.md)*

## Properties

###  balance

• **balance**: *BigNumber*

*Defined in [src/entities/Erc20TokenBalance.ts:84](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Erc20TokenBalance.ts#L84)*

total number of tokens belonging to token holder

___

###  tokenAddress

• **tokenAddress**: *string*

*Defined in [src/entities/Erc20TokenBalance.ts:74](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Erc20TokenBalance.ts#L74)*

address of the ERC20 token

___

###  tokenSymbol

• **tokenSymbol**: *string | null*

*Defined in [src/entities/Erc20TokenBalance.ts:69](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Erc20TokenBalance.ts#L69)*

___

###  uid

• **uid**: *string*

*Overrides [Entity](_entities_entity_.entity.md).[uid](_entities_entity_.entity.md#abstract-uid)*

*Defined in [src/entities/Erc20TokenBalance.ts:67](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Erc20TokenBalance.ts#L67)*

unique generated identifier for an ERC20 token balance

___

###  walletAddress

• **walletAddress**: *string*

*Defined in [src/entities/Erc20TokenBalance.ts:79](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Erc20TokenBalance.ts#L79)*

wallet address of the token holder

## Methods

###  _refresh

▸ **_refresh**(`params`: Partial‹[Params](../interfaces/_entities_erc20tokenbalance_.params.md)›): *void*

*Overrides [Entity](_entities_entity_.entity.md).[_refresh](_entities_entity_.entity.md#abstract-_refresh)*

*Defined in [src/entities/Erc20TokenBalance.ts:122](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Erc20TokenBalance.ts#L122)*

Hydrate the entity

**Parameters:**

Name | Type |
------ | ------ |
`params` | Partial‹[Params](../interfaces/_entities_erc20tokenbalance_.params.md)› |

**Returns:** *void*

___

###  toPojo

▸ **toPojo**(): *object*

*Overrides [Entity](_entities_entity_.entity.md).[toPojo](_entities_entity_.entity.md#abstract-topojo)*

*Defined in [src/entities/Erc20TokenBalance.ts:107](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Erc20TokenBalance.ts#L107)*

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** *object*

* **balance**: *BigNumber*

* **tokenAddress**: *string*

* **tokenSymbol**: *null | string*

* **uid**: *string*

* **walletAddress**: *string*

___

### `Static` generateId

▸ **generateId**(`__namedParameters`: object): *string*

*Defined in [src/entities/Erc20TokenBalance.ts:39](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Erc20TokenBalance.ts#L39)*

Generate the ERC20 Token Balance's UUID from its identifying properties

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`tokenAddress` | string |
`walletAddress` | string |

**Returns:** *string*

___

### `Static` unserialize

▸ **unserialize**(`serialized`: any): *[UniqueIdentifiers](../interfaces/_entities_erc20tokenbalance_.uniqueidentifiers.md)*

*Defined in [src/entities/Erc20TokenBalance.ts:51](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Erc20TokenBalance.ts#L51)*

Unserialize a serialized erc20 token balance

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`serialized` | any | string with erc20 token balance entity information  |

**Returns:** *[UniqueIdentifiers](../interfaces/_entities_erc20tokenbalance_.uniqueidentifiers.md)*
