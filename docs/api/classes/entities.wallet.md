# Class: Wallet

Used to manage a wallet

## Hierarchy

* [Entity](entities.entity.md)‹[Params](../interfaces/entities.params-3.md)›

  ↳ **Wallet**

## Index

### Constructors

* [constructor](entities.wallet.md#constructor)

### Properties

* [address](entities.wallet.md#address)
* [context](entities.wallet.md#protected-context)
* [uid](entities.wallet.md#uid)

### Methods

* [_refresh](entities.wallet.md#_refresh)
* [getErc20Balance](entities.wallet.md#geterc20balance)
* [getEthBalance](entities.wallet.md#getethbalance)
* [getPolyBalance](entities.wallet.md#getpolybalance)
* [toPojo](entities.wallet.md#topojo)
* [generateId](entities.wallet.md#static-generateid)
* [unserialize](entities.wallet.md#static-unserialize)

## Constructors

###  constructor

\+ **new Wallet**(`params`: [Params](../interfaces/entities.params-3.md), `context`: [Context](_context_.context.md)): *[Wallet](entities.wallet.md)*

*Defined in [src/entities/Wallet.ts:76](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Wallet.ts#L76)*

Create a wallet entity

**Parameters:**

Name | Type |
------ | ------ |
`params` | [Params](../interfaces/entities.params-3.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[Wallet](entities.wallet.md)*

## Properties

###  address

• **address**: *string*

*Defined in [src/entities/Wallet.ts:74](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Wallet.ts#L74)*

wallet address

___

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Defined in [src/entities/Wallet.ts:76](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Wallet.ts#L76)*

___

###  uid

• **uid**: *string*

*Overrides [Entity](entities.entity.md).[uid](entities.entity.md#abstract-uid)*

*Defined in [src/entities/Wallet.ts:69](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Wallet.ts#L69)*

unique generated wallet id

## Methods

###  _refresh

▸ **_refresh**(`params`: Partial‹[Params](../interfaces/entities.params-3.md)›): *void*

*Overrides [Entity](entities.entity.md).[_refresh](entities.entity.md#abstract-_refresh)*

*Defined in [src/entities/Wallet.ts:108](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Wallet.ts#L108)*

Hydrate the entity

**Parameters:**

Name | Type |
------ | ------ |
`params` | Partial‹[Params](../interfaces/entities.params-3.md)› |

**Returns:** *void*

___

###  getErc20Balance

▸ **getErc20Balance**(`args`: object): *Promise‹BigNumber›*

*Defined in [src/entities/Wallet.ts:137](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Wallet.ts#L137)*

Retrieve the ERC20 balance of this particular wallet address

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *Promise‹BigNumber›*

___

###  getEthBalance

▸ **getEthBalance**(): *Promise‹BigNumber›*

*Defined in [src/entities/Wallet.ts:127](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Wallet.ts#L127)*

Retrieve the ETH balance of this particular wallet address

**Returns:** *Promise‹BigNumber›*

___

###  getPolyBalance

▸ **getPolyBalance**(): *Promise‹BigNumber›*

*Defined in [src/entities/Wallet.ts:119](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Wallet.ts#L119)*

Retrieve the POLY balance of this particular wallet address

**Returns:** *Promise‹BigNumber›*

___

###  toPojo

▸ **toPojo**(): *object*

*Overrides [Entity](entities.entity.md).[toPojo](entities.entity.md#abstract-topojo)*

*Defined in [src/entities/Wallet.ts:96](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Wallet.ts#L96)*

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** *object*

___

### `Static` generateId

▸ **generateId**(`__namedParameters`: object): *string*

*Defined in [src/entities/Wallet.ts:42](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Wallet.ts#L42)*

Generate the Wallet's UUID from its identifying properties

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | object |

**Returns:** *string*

___

### `Static` unserialize

▸ **unserialize**(`serialized`: string): *[UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-5.md)*

*Defined in [src/entities/Wallet.ts:53](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Wallet.ts#L53)*

Unserialize a serialized entity

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`serialized` | string | string with entity information  |

**Returns:** *[UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-5.md)*
