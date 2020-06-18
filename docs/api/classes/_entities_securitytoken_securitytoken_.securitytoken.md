# Class: SecurityToken

Class used to manage all the Security Token functionality

## Hierarchy

* [Entity](_entities_entity_.entity.md)‹[Params](../interfaces/_entities_securitytoken_securitytoken_.params.md)›

  ↳ **SecurityToken**

## Index

### Constructors

* [constructor](_entities_securitytoken_securitytoken_.securitytoken.md#constructor)

### Properties

* [address](_entities_securitytoken_securitytoken_.securitytoken.md#address)
* [context](_entities_securitytoken_securitytoken_.securitytoken.md#context)
* [controller](_entities_securitytoken_securitytoken_.securitytoken.md#controller)
* [currentCheckpoint](_entities_securitytoken_securitytoken_.securitytoken.md#currentcheckpoint)
* [dividends](_entities_securitytoken_securitytoken_.securitytoken.md#dividends)
* [documents](_entities_securitytoken_securitytoken_.securitytoken.md#documents)
* [features](_entities_securitytoken_securitytoken_.securitytoken.md#features)
* [granularity](_entities_securitytoken_securitytoken_.securitytoken.md#granularity)
* [issuance](_entities_securitytoken_securitytoken_.securitytoken.md#issuance)
* [name](_entities_securitytoken_securitytoken_.securitytoken.md#name)
* [owner](_entities_securitytoken_securitytoken_.securitytoken.md#owner)
* [permissions](_entities_securitytoken_securitytoken_.securitytoken.md#permissions)
* [symbol](_entities_securitytoken_securitytoken_.securitytoken.md#symbol)
* [tokenDetails](_entities_securitytoken_securitytoken_.securitytoken.md#tokendetails)
* [tokenholders](_entities_securitytoken_securitytoken_.securitytoken.md#tokenholders)
* [totalSupply](_entities_securitytoken_securitytoken_.securitytoken.md#totalsupply)
* [transfers](_entities_securitytoken_securitytoken_.securitytoken.md#transfers)
* [treasuryWallet](_entities_securitytoken_securitytoken_.securitytoken.md#treasurywallet)
* [uid](_entities_securitytoken_securitytoken_.securitytoken.md#uid)
* [version](_entities_securitytoken_securitytoken_.securitytoken.md#version)
* [unserialize](_entities_securitytoken_securitytoken_.securitytoken.md#static-unserialize)

### Methods

* [_refresh](_entities_securitytoken_securitytoken_.securitytoken.md#_refresh)
* [toPojo](_entities_securitytoken_securitytoken_.securitytoken.md#topojo)
* [transferOwnership](_entities_securitytoken_securitytoken_.securitytoken.md#transferownership)
* [generateId](_entities_securitytoken_securitytoken_.securitytoken.md#static-generateid)

## Constructors

###  constructor

\+ **new SecurityToken**(`params`: [Params](../interfaces/_entities_securitytoken_securitytoken_.params.md) & [UniqueIdentifiers](../interfaces/_entities_securitytoken_securitytoken_.uniqueidentifiers.md), `context`: [Context](_context_.context.md)): *[SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:153](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L153)*

Create a new SecurityToken instance

**Parameters:**

Name | Type |
------ | ------ |
`params` | [Params](../interfaces/_entities_securitytoken_securitytoken_.params.md) & [UniqueIdentifiers](../interfaces/_entities_securitytoken_securitytoken_.uniqueidentifiers.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)*

## Properties

###  address

• **address**: *string*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:114](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L114)*

address that owns the Security Token

___

###  context

• **context**: *[Context](_context_.context.md)*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:153](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L153)*

___

###  controller

• **controller**: *[Controller](_entities_securitytoken_controller_.controller.md)*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:147](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L147)*

___

###  currentCheckpoint

• **currentCheckpoint**: *number*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:130](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L130)*

index of the current checkpoint

___

###  dividends

• **dividends**: *[Dividends](_entities_securitytoken_dividends_.dividends.md)*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:141](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L141)*

___

###  documents

• **documents**: *[Documents](_entities_securitytoken_documents_.documents.md)*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:151](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L151)*

___

###  features

• **features**: *[Features](_entities_securitytoken_features_.features.md)*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:137](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L137)*

___

###  granularity

• **granularity**: *number*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:123](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L123)*

___

###  issuance

• **issuance**: *[Issuance](_entities_securitytoken_issuance_issuance_.issuance.md)*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:143](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L143)*

___

###  name

• **name**: *string*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:104](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L104)*

___

###  owner

• **owner**: *string*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:109](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L109)*

address of the Security Token contract

___

###  permissions

• **permissions**: *[Permissions](_entities_securitytoken_permissions_.permissions.md)*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:145](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L145)*

___

###  symbol

• **symbol**: *string*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:102](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L102)*

___

###  tokenDetails

• **tokenDetails**: *string*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:119](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L119)*

URL pointing to off-chain data associated with the Security Token

___

###  tokenholders

• **tokenholders**: *[Tokenholders](_entities_securitytoken_tokenholders_.tokenholders.md)*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:139](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L139)*

___

###  totalSupply

• **totalSupply**: *BigNumber*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:125](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L125)*

___

###  transfers

• **transfers**: *[Transfers](_entities_securitytoken_transfers_transfers_.transfers.md)*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:149](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L149)*

___

###  treasuryWallet

• **treasuryWallet**: *string*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:135](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L135)*

treasury wallet used by some features

___

###  uid

• **uid**: *string*

*Overrides [Entity](_entities_entity_.entity.md).[uid](_entities_entity_.entity.md#abstract-uid)*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:100](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L100)*

___

###  version

• **version**: *Version*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:121](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L121)*

___

### `Static` unserialize

▪ **unserialize**: *unserialize* =  unserialize

*Defined in [src/entities/SecurityToken/SecurityToken.ts:98](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L98)*

## Methods

###  _refresh

▸ **_refresh**(`params`: Partial‹[Params](../interfaces/_entities_securitytoken_securitytoken_.params.md)›): *void*

*Overrides [Entity](_entities_entity_.entity.md).[_refresh](_entities_entity_.entity.md#abstract-_refresh)*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:249](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L249)*

Hydrate the entity

**Parameters:**

Name | Type |
------ | ------ |
`params` | Partial‹[Params](../interfaces/_entities_securitytoken_securitytoken_.params.md)› |

**Returns:** *void*

___

###  toPojo

▸ **toPojo**(): *object*

*Overrides [Entity](_entities_entity_.entity.md).[toPojo](_entities_entity_.entity.md#abstract-topojo)*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:216](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L216)*

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** *object*

* **address**: *string*

* **currentCheckpoint**: *number*

* **granularity**: *number*

* **name**: *string*

* **owner**: *string*

* **symbol**: *string*

* **tokenDetails**: *string*

* **totalSupply**: *BigNumber*

* **treasuryWallet**: *string*

* **uid**: *string*

* **version**: *ContractVersion*

___

###  transferOwnership

▸ **transferOwnership**(`args`: object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[TransferOwnershipProcedureArgs](../interfaces/_types_index_.transferownershipprocedureargs.md), void››*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:202](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L202)*

Transfers ownership of the Security Token to a different wallet address

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`newOwner` | string |

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[TransferOwnershipProcedureArgs](../interfaces/_types_index_.transferownershipprocedureargs.md), void››*

___

### `Static` generateId

▸ **generateId**(`__namedParameters`: object): *string*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:92](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L92)*

Generate the Security Token's UUID from its identifying properties

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`symbol` | string |

**Returns:** *string*
