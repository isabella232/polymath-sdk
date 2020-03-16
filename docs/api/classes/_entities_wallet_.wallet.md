# Class: Wallet

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

* [_refresh](_entities_wallet_.wallet.md#_refresh)
* [getErc20Balance](_entities_wallet_.wallet.md#geterc20balance)
* [getEthBalance](_entities_wallet_.wallet.md#getethbalance)
* [getPolyBalance](_entities_wallet_.wallet.md#getpolybalance)
* [toPojo](_entities_wallet_.wallet.md#topojo)
* [generateId](_entities_wallet_.wallet.md#static-generateid)
* [unserialize](_entities_wallet_.wallet.md#static-unserialize)

## Constructors

###  constructor

\+ **new Wallet**(`params`: [Params](../interfaces/_entities_wallet_.params.md), `context`: [Context](_context_.context.md)): *[Wallet](_entities_wallet_.wallet.md)*

*Defined in [src/entities/Wallet.ts:71](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Wallet.ts#L71)*

Create a wallet entity

**Parameters:**

Name | Type |
------ | ------ |
`params` | [Params](../interfaces/_entities_wallet_.params.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[Wallet](_entities_wallet_.wallet.md)*

## Properties

###  address

• **address**: *string*

*Defined in [src/entities/Wallet.ts:69](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Wallet.ts#L69)*

wallet address

___

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Defined in [src/entities/Wallet.ts:71](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Wallet.ts#L71)*

___

###  uid

• **uid**: *string*

*Overrides [Entity](_entities_entity_.entity.md).[uid](_entities_entity_.entity.md#abstract-uid)*

*Defined in [src/entities/Wallet.ts:64](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Wallet.ts#L64)*

unique generated wallet id

## Methods

###  _refresh

▸ **_refresh**(`params`: Partial‹[Params](../interfaces/_entities_wallet_.params.md)›): *void*

*Overrides [Entity](_entities_entity_.entity.md).[_refresh](_entities_entity_.entity.md#abstract-_refresh)*

*Defined in [src/entities/Wallet.ts:103](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Wallet.ts#L103)*

Hydrate the entity

**Parameters:**

Name | Type |
------ | ------ |
`params` | Partial‹[Params](../interfaces/_entities_wallet_.params.md)› |

**Returns:** *void*

___

###  getErc20Balance

▸ **getErc20Balance**(`args`: object): *Promise‹BigNumber›*

*Defined in [src/entities/Wallet.ts:132](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Wallet.ts#L132)*

Retrieve the ERC20 balance of this particular wallet address

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`tokenAddress` | string |

**Returns:** *Promise‹BigNumber›*

___

###  getEthBalance

▸ **getEthBalance**(): *Promise‹BigNumber›*

*Defined in [src/entities/Wallet.ts:122](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Wallet.ts#L122)*

Retrieve the ETH balance of this particular wallet address

**Returns:** *Promise‹BigNumber›*

___

###  getPolyBalance

▸ **getPolyBalance**(): *Promise‹BigNumber›*

*Defined in [src/entities/Wallet.ts:114](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Wallet.ts#L114)*

Retrieve the POLY balance of this particular wallet address

**Returns:** *Promise‹BigNumber›*

___

###  toPojo

▸ **toPojo**(): *object*

*Overrides [Entity](_entities_entity_.entity.md).[toPojo](_entities_entity_.entity.md#abstract-topojo)*

*Defined in [src/entities/Wallet.ts:91](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Wallet.ts#L91)*

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** *object*

* **address**: *string*

* **uid**: *string*

___

### `Static` generateId

▸ **generateId**(`__namedParameters`: object): *string*

*Defined in [src/entities/Wallet.ts:37](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Wallet.ts#L37)*

Generate the Wallet's UUID from its identifying properties

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`address` | string |

**Returns:** *string*

___

### `Static` unserialize

▸ **unserialize**(`serialized`: string): *[UniqueIdentifiers](../interfaces/_entities_wallet_.uniqueidentifiers.md)*

*Defined in [src/entities/Wallet.ts:48](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Wallet.ts#L48)*

Unserialize a serialized entity

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`serialized` | string | string with entity information  |

**Returns:** *[UniqueIdentifiers](../interfaces/_entities_wallet_.uniqueidentifiers.md)*
