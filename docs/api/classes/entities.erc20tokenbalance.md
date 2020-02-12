# Class: Erc20TokenBalance

Used to manage a ERC20 token balance

## Hierarchy

* [Entity](entities.entity.md)‹[Params](../interfaces/entities.params-1.md)›

  ↳ **Erc20TokenBalance**

## Index

### Constructors

* [constructor](entities.erc20tokenbalance.md#constructor)

### Properties

* [balance](entities.erc20tokenbalance.md#balance)
* [tokenAddress](entities.erc20tokenbalance.md#tokenaddress)
* [tokenSymbol](entities.erc20tokenbalance.md#tokensymbol)
* [uid](entities.erc20tokenbalance.md#uid)
* [walletAddress](entities.erc20tokenbalance.md#walletaddress)

### Methods

* [_refresh](entities.erc20tokenbalance.md#_refresh)
* [toPojo](entities.erc20tokenbalance.md#topojo)
* [generateId](entities.erc20tokenbalance.md#static-generateid)
* [unserialize](entities.erc20tokenbalance.md#static-unserialize)

## Constructors

###  constructor

\+ **new Erc20TokenBalance**(`params`: [Params](../interfaces/entities.params-1.md) & [UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-7.md)): *[Erc20TokenBalance](entities.erc20tokenbalance.md)*

*Defined in [src/entities/Erc20TokenBalance.ts:89](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Erc20TokenBalance.ts#L89)*

Create an ERC20 Token balance instance

**Parameters:**

Name | Type |
------ | ------ |
`params` | [Params](../interfaces/entities.params-1.md) & [UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-7.md) |

**Returns:** *[Erc20TokenBalance](entities.erc20tokenbalance.md)*

## Properties

###  balance

• **balance**: *BigNumber*

*Defined in [src/entities/Erc20TokenBalance.ts:89](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Erc20TokenBalance.ts#L89)*

total number of tokens belonging to token holder

___

###  tokenAddress

• **tokenAddress**: *string*

*Defined in [src/entities/Erc20TokenBalance.ts:79](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Erc20TokenBalance.ts#L79)*

address of the ERC20 token

___

###  tokenSymbol

• **tokenSymbol**: *string | null*

*Defined in [src/entities/Erc20TokenBalance.ts:74](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Erc20TokenBalance.ts#L74)*

___

###  uid

• **uid**: *string*

*Overrides [Entity](entities.entity.md).[uid](entities.entity.md#abstract-uid)*

*Defined in [src/entities/Erc20TokenBalance.ts:72](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Erc20TokenBalance.ts#L72)*

unique generated identifier for an ERC20 token balance

___

###  walletAddress

• **walletAddress**: *string*

*Defined in [src/entities/Erc20TokenBalance.ts:84](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Erc20TokenBalance.ts#L84)*

wallet address of the token holder

## Methods

###  _refresh

▸ **_refresh**(`params`: Partial‹[Params](../interfaces/entities.params-1.md)›): *void*

*Overrides [Entity](entities.entity.md).[_refresh](entities.entity.md#abstract-_refresh)*

*Defined in [src/entities/Erc20TokenBalance.ts:127](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Erc20TokenBalance.ts#L127)*

Hydrate the entity

**Parameters:**

Name | Type |
------ | ------ |
`params` | Partial‹[Params](../interfaces/entities.params-1.md)› |

**Returns:** *void*

___

###  toPojo

▸ **toPojo**(): *object*

*Overrides [Entity](entities.entity.md).[toPojo](entities.entity.md#abstract-topojo)*

*Defined in [src/entities/Erc20TokenBalance.ts:112](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Erc20TokenBalance.ts#L112)*

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** *object*

___

### `Static` generateId

▸ **generateId**(`__namedParameters`: object): *string*

*Defined in [src/entities/Erc20TokenBalance.ts:44](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Erc20TokenBalance.ts#L44)*

Generate the ERC20 Token Balance's UUID from its identifying properties

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | object |

**Returns:** *string*

___

### `Static` unserialize

▸ **unserialize**(`serialized`: any): *[UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-7.md)*

*Defined in [src/entities/Erc20TokenBalance.ts:56](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Erc20TokenBalance.ts#L56)*

Unserialize a serialized erc20 token balance

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`serialized` | any | string with erc20 token balance entity information  |

**Returns:** *[UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-7.md)*
