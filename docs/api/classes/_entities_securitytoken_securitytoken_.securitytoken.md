# SecurityToken

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

* [\_refresh](_entities_securitytoken_securitytoken_.securitytoken.md#_refresh)
* [toPojo](_entities_securitytoken_securitytoken_.securitytoken.md#topojo)
* [transferOwnership](_entities_securitytoken_securitytoken_.securitytoken.md#transferownership)
* [generateId](_entities_securitytoken_securitytoken_.securitytoken.md#static-generateid)

## Constructors

### constructor

+ **new SecurityToken**\(`params`: [Params](../interfaces/_entities_securitytoken_securitytoken_.params.md) & [UniqueIdentifiers](../interfaces/_entities_securitytoken_securitytoken_.uniqueidentifiers.md), `context`: [Context](_context_.context.md)\): [_SecurityToken_](_entities_securitytoken_securitytoken_.securitytoken.md)

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:153_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L153)

Create a new SecurityToken instance

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | [Params](../interfaces/_entities_securitytoken_securitytoken_.params.md) & [UniqueIdentifiers](../interfaces/_entities_securitytoken_securitytoken_.uniqueidentifiers.md) |
| `context` | [Context](_context_.context.md) |

**Returns:** [_SecurityToken_](_entities_securitytoken_securitytoken_.securitytoken.md)

## Properties

### address

• **address**: _string_

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:114_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L114)

address that owns the Security Token

### context

• **context**: [_Context_](_context_.context.md)

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:153_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L153)

### controller

• **controller**: [_Controller_](_entities_securitytoken_controller_.controller.md)

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:147_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L147)

### currentCheckpoint

• **currentCheckpoint**: _number_

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:130_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L130)

index of the current checkpoint

### dividends

• **dividends**: [_Dividends_](_entities_securitytoken_dividends_.dividends.md)

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:141_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L141)

### documents

• **documents**: [_Documents_](_entities_securitytoken_documents_.documents.md)

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:151_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L151)

### features

• **features**: [_Features_](_entities_securitytoken_features_.features.md)

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:137_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L137)

### granularity

• **granularity**: _number_

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:123_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L123)

### issuance

• **issuance**: [_Issuance_](_entities_securitytoken_issuance_issuance_.issuance.md)

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:143_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L143)

### name

• **name**: _string_

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:104_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L104)

### owner

• **owner**: _string_

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:109_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L109)

address of the Security Token contract

### permissions

• **permissions**: [_Permissions_](_entities_securitytoken_permissions_.permissions.md)

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:145_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L145)

### symbol

• **symbol**: _string_

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:102_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L102)

### tokenDetails

• **tokenDetails**: _string_

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:119_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L119)

URL pointing to off-chain data associated with the Security Token

### tokenholders

• **tokenholders**: [_Tokenholders_](_entities_securitytoken_tokenholders_.tokenholders.md)

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:139_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L139)

### totalSupply

• **totalSupply**: _BigNumber_

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:125_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L125)

### transfers

• **transfers**: [_Transfers_](_entities_securitytoken_transfers_transfers_.transfers.md)

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:149_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L149)

### treasuryWallet

• **treasuryWallet**: _string_

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:135_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L135)

treasury wallet used by some features

### uid

• **uid**: _string_

_Overrides_ [_Entity_](_entities_entity_.entity.md)_._[_uid_](_entities_entity_.entity.md#abstract-uid)

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:100_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L100)

### version

• **version**: _Version_

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:121_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L121)

### `Static` unserialize

▪ **unserialize**: _unserialize_ = unserialize

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:98_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L98)

## Methods

### \_refresh

▸ **\_refresh**\(`params`: Partial‹[Params](../interfaces/_entities_securitytoken_securitytoken_.params.md)›\): _void_

_Overrides_ [_Entity_](_entities_entity_.entity.md)_._[_\_refresh_](_entities_entity_.entity.md#abstract-_refresh)

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:249_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L249)

Hydrate the entity

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | Partial‹[Params](../interfaces/_entities_securitytoken_securitytoken_.params.md)› |

**Returns:** _void_

### toPojo

▸ **toPojo**\(\): _object_

_Overrides_ [_Entity_](_entities_entity_.entity.md)_._[_toPojo_](_entities_entity_.entity.md#abstract-topojo)

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:216_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L216)

Convert entity to a POJO \(Plain Old Javascript Object\)

**Returns:** _object_

* **address**: _string_
* **currentCheckpoint**: _number_
* **granularity**: _number_
* **name**: _string_
* **owner**: _string_
* **symbol**: _string_
* **tokenDetails**: _string_
* **totalSupply**: _BigNumber_
* **treasuryWallet**: _string_
* **uid**: _string_
* **version**: _ContractVersion_

### transferOwnership

▸ **transferOwnership**\(`args`: object\): _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_TransferOwnershipProcedureArgs_](../interfaces/_types_index_.transferownershipprocedureargs.md)_, void››_

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:202_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L202)

Transfers ownership of the Security Token to a different wallet address

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `newOwner` | string |

**Returns:** _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_TransferOwnershipProcedureArgs_](../interfaces/_types_index_.transferownershipprocedureargs.md)_, void››_

### `Static` generateId

▸ **generateId**\(`__namedParameters`: object\): _string_

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:92_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L92)

Generate the Security Token's UUID from its identifying properties

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type |
| :--- | :--- |
| `symbol` | string |

**Returns:** _string_

