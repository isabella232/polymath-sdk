# SecurityToken

Class used to manage all the Security Token functionality

## Hierarchy

* [Entity]()‹[Params]()›

  ↳ **SecurityToken**

## Index

### Constructors

* [constructor]()

### Properties

* [address]()
* [context]()
* [controller]()
* [currentCheckpoint]()
* [dividends]()
* [documents]()
* [features]()
* [granularity]()
* [issuance]()
* [name]()
* [owner]()
* [permissions]()
* [symbol]()
* [tokenDetails]()
* [tokenholders]()
* [totalSupply]()
* [transfers]()
* [treasuryWallet]()
* [uid]()
* [version]()
* [unserialize]()

### Methods

* [\_refresh]()
* [toPojo]()
* [transferOwnership]()
* [generateId]()

## Constructors

### constructor

+ **new SecurityToken**\(`params`: [Params]() & [UniqueIdentifiers](), `context`: [Context]()\): [_SecurityToken_]()

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:153_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SecurityToken.ts#L153)

Create a new SecurityToken instance

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | [Params]() & [UniqueIdentifiers]() |
| `context` | [Context]() |

**Returns:** [_SecurityToken_]()

## Properties

### address

• **address**: _string_

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:114_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SecurityToken.ts#L114)

address that owns the Security Token

### context

• **context**: [_Context_]()

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:153_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SecurityToken.ts#L153)

### controller

• **controller**: [_Controller_]()

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:147_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SecurityToken.ts#L147)

### currentCheckpoint

• **currentCheckpoint**: _number_

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:130_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SecurityToken.ts#L130)

index of the current checkpoint

### dividends

• **dividends**: [_Dividends_]()

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:141_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SecurityToken.ts#L141)

### documents

• **documents**: [_Documents_]()

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:151_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SecurityToken.ts#L151)

### features

• **features**: [_Features_]()

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:137_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SecurityToken.ts#L137)

### granularity

• **granularity**: _number_

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:123_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SecurityToken.ts#L123)

### issuance

• **issuance**: [_Issuance_]()

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:143_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SecurityToken.ts#L143)

### name

• **name**: _string_

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:104_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SecurityToken.ts#L104)

### owner

• **owner**: _string_

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:109_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SecurityToken.ts#L109)

address of the Security Token contract

### permissions

• **permissions**: [_Permissions_]()

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:145_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SecurityToken.ts#L145)

### symbol

• **symbol**: _string_

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:102_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SecurityToken.ts#L102)

### tokenDetails

• **tokenDetails**: _string_

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:119_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SecurityToken.ts#L119)

URL pointing to off-chain data associated with the Security Token

### tokenholders

• **tokenholders**: [_Tokenholders_]()

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:139_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SecurityToken.ts#L139)

### totalSupply

• **totalSupply**: _BigNumber_

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:125_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SecurityToken.ts#L125)

### transfers

• **transfers**: [_Transfers_]()

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:149_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SecurityToken.ts#L149)

### treasuryWallet

• **treasuryWallet**: _string_

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:135_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SecurityToken.ts#L135)

treasury wallet used by some features

### uid

• **uid**: _string_

_Overrides_ [_Entity_]()_._[_uid_]()

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:100_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SecurityToken.ts#L100)

### version

• **version**: _Version_

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:121_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SecurityToken.ts#L121)

### `Static` unserialize

▪ **unserialize**: _unserialize_ = unserialize

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:98_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SecurityToken.ts#L98)

## Methods

### \_refresh

▸ **\_refresh**\(`params`: Partial‹[Params]()›\): _void_

_Overrides_ [_Entity_]()_._[_\_refresh_]()

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:249_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SecurityToken.ts#L249)

Hydrate the entity

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | Partial‹[Params]()› |

**Returns:** _void_

### toPojo

▸ **toPojo**\(\): _object_

_Overrides_ [_Entity_]()_._[_toPojo_]()

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:216_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SecurityToken.ts#L216)

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

▸ **transferOwnership**\(`args`: object\): _Promise‹_[_TransactionQueue_]()_‹_[_TransferOwnershipProcedureArgs_]()_, void››_

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:202_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SecurityToken.ts#L202)

Transfers ownership of the Security Token to a different wallet address

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `newOwner` | string |

**Returns:** _Promise‹_[_TransactionQueue_]()_‹_[_TransferOwnershipProcedureArgs_]()_, void››_

### `Static` generateId

▸ **generateId**\(`__namedParameters`: object\): _string_

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:92_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SecurityToken.ts#L92)

Generate the Security Token's UUID from its identifying properties

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type |
| :--- | :--- |
| `symbol` | string |

**Returns:** _string_

