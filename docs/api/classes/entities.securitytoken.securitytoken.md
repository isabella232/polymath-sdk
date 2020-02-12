# Class: SecurityToken

Class used to manage all the Security Token functionality

## Hierarchy

* [Entity](entities.entity.md)‹[Params](../interfaces/entities.securitytoken.params.md)›

  ↳ **SecurityToken**

## Index

### Constructors

* [constructor](entities.securitytoken.securitytoken.md#constructor)

### Properties

* [address](entities.securitytoken.securitytoken.md#address)
* [context](entities.securitytoken.securitytoken.md#context)
* [controller](entities.securitytoken.securitytoken.md#controller)
* [currentCheckpoint](entities.securitytoken.securitytoken.md#currentcheckpoint)
* [dividends](entities.securitytoken.securitytoken.md#dividends)
* [documents](entities.securitytoken.securitytoken.md#documents)
* [features](entities.securitytoken.securitytoken.md#features)
* [granularity](entities.securitytoken.securitytoken.md#granularity)
* [issuance](entities.securitytoken.securitytoken.md#issuance)
* [name](entities.securitytoken.securitytoken.md#name)
* [owner](entities.securitytoken.securitytoken.md#owner)
* [permissions](entities.securitytoken.securitytoken.md#permissions)
* [shareholders](entities.securitytoken.securitytoken.md#shareholders)
* [symbol](entities.securitytoken.securitytoken.md#symbol)
* [tokenDetails](entities.securitytoken.securitytoken.md#tokendetails)
* [totalSupply](entities.securitytoken.securitytoken.md#totalsupply)
* [transfers](entities.securitytoken.securitytoken.md#transfers)
* [treasuryWallet](entities.securitytoken.securitytoken.md#treasurywallet)
* [uid](entities.securitytoken.securitytoken.md#uid)
* [version](entities.securitytoken.securitytoken.md#version)
* [unserialize](entities.securitytoken.securitytoken.md#static-unserialize)

### Methods

* [_refresh](entities.securitytoken.securitytoken.md#_refresh)
* [toPojo](entities.securitytoken.securitytoken.md#topojo)
* [transferOwnership](entities.securitytoken.securitytoken.md#transferownership)
* [generateId](entities.securitytoken.securitytoken.md#static-generateid)

## Constructors

###  constructor

\+ **new SecurityToken**(`params`: [Params](../interfaces/entities.securitytoken.params.md) & [UniqueIdentifiers](../interfaces/entities.securitytoken.uniqueidentifiers.md), `context`: [Context](_context_.context.md)): *[SecurityToken](entities.securitytoken.securitytoken.md)*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:158](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/SecurityToken.ts#L158)*

Create a new SecurityToken instance

**Parameters:**

Name | Type |
------ | ------ |
`params` | [Params](../interfaces/entities.securitytoken.params.md) & [UniqueIdentifiers](../interfaces/entities.securitytoken.uniqueidentifiers.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[SecurityToken](entities.securitytoken.securitytoken.md)*

## Properties

###  address

• **address**: *string*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:119](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/SecurityToken.ts#L119)*

address that owns the Security Token

___

###  context

• **context**: *[Context](_context_.context.md)*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:158](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/SecurityToken.ts#L158)*

___

###  controller

• **controller**: *[Controller](entities.securitytoken.controller.md)*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:152](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/SecurityToken.ts#L152)*

___

###  currentCheckpoint

• **currentCheckpoint**: *number*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:135](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/SecurityToken.ts#L135)*

index of the current checkpoint

___

###  dividends

• **dividends**: *[Dividends](entities.securitytoken.dividends.md)*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:146](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/SecurityToken.ts#L146)*

___

###  documents

• **documents**: *[Documents](entities.securitytoken.documents.md)*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:156](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/SecurityToken.ts#L156)*

___

###  features

• **features**: *[Features](entities.securitytoken.features.md)*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:142](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/SecurityToken.ts#L142)*

___

###  granularity

• **granularity**: *number*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:128](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/SecurityToken.ts#L128)*

___

###  issuance

• **issuance**: *[Issuance](entities.securitytoken.issuance.issuance.md)*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:148](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/SecurityToken.ts#L148)*

___

###  name

• **name**: *string*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:109](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/SecurityToken.ts#L109)*

___

###  owner

• **owner**: *string*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:114](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/SecurityToken.ts#L114)*

address of the Security Token contract

___

###  permissions

• **permissions**: *[Permissions](entities.securitytoken.permissions.md)*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:150](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/SecurityToken.ts#L150)*

___

###  shareholders

• **shareholders**: *[Shareholders](entities.securitytoken.shareholders.md)*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:144](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/SecurityToken.ts#L144)*

___

###  symbol

• **symbol**: *string*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:107](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/SecurityToken.ts#L107)*

___

###  tokenDetails

• **tokenDetails**: *string*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:124](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/SecurityToken.ts#L124)*

URL pointing to off-chain data associated with the Security Token

___

###  totalSupply

• **totalSupply**: *BigNumber*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:130](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/SecurityToken.ts#L130)*

___

###  transfers

• **transfers**: *[Transfers](entities.securitytoken.transfers.transfers.md)*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:154](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/SecurityToken.ts#L154)*

___

###  treasuryWallet

• **treasuryWallet**: *string*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:140](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/SecurityToken.ts#L140)*

treasury wallet used by some features

___

###  uid

• **uid**: *string*

*Overrides [Entity](entities.entity.md).[uid](entities.entity.md#abstract-uid)*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:105](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/SecurityToken.ts#L105)*

___

###  version

• **version**: *Version*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:126](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/SecurityToken.ts#L126)*

___

### `Static` unserialize

▪ **unserialize**: *unserialize* =  unserialize

*Defined in [src/entities/SecurityToken/SecurityToken.ts:103](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/SecurityToken.ts#L103)*

## Methods

###  _refresh

▸ **_refresh**(`params`: Partial‹[Params](../interfaces/entities.securitytoken.params.md)›): *void*

*Overrides [Entity](entities.entity.md).[_refresh](entities.entity.md#abstract-_refresh)*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:254](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/SecurityToken.ts#L254)*

Hydrate the entity

**Parameters:**

Name | Type |
------ | ------ |
`params` | Partial‹[Params](../interfaces/entities.securitytoken.params.md)› |

**Returns:** *void*

___

###  toPojo

▸ **toPojo**(): *object*

*Overrides [Entity](entities.entity.md).[toPojo](entities.entity.md#abstract-topojo)*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:221](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/SecurityToken.ts#L221)*

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** *object*

___

###  transferOwnership

▸ **transferOwnership**(`args`: object): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹TransferOwnershipProcedureArgs, void››*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:207](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/SecurityToken.ts#L207)*

Transfers ownership of the Security Token to a different wallet address

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹TransferOwnershipProcedureArgs, void››*

___

### `Static` generateId

▸ **generateId**(`__namedParameters`: object): *string*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:97](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/SecurityToken.ts#L97)*

Generate the Security Token's UUID from its identifying properties

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | object |

**Returns:** *string*
