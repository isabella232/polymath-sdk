[@polymathnetwork/sdk - v2.0.1-beta.120](../README.md) › [Globals](../globals.md) › ["entities/SecurityToken/SecurityToken"](../modules/_entities_securitytoken_securitytoken_.md) › [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)

# Class: SecurityToken

Class used to manage all the Security Token functionality

## Hierarchy

- [Entity](_entities_entity_.entity.md)‹[Params](../interfaces/_entities_securitytoken_securitytoken_.params.md)›

  ↳ **SecurityToken**

## Index

### Constructors

- [constructor](_entities_securitytoken_securitytoken_.securitytoken.md#constructor)

### Properties

- [address](_entities_securitytoken_securitytoken_.securitytoken.md#address)
- [context](_entities_securitytoken_securitytoken_.securitytoken.md#context)
- [controller](_entities_securitytoken_securitytoken_.securitytoken.md#controller)
- [currentCheckpoint](_entities_securitytoken_securitytoken_.securitytoken.md#currentcheckpoint)
- [dividends](_entities_securitytoken_securitytoken_.securitytoken.md#dividends)
- [documents](_entities_securitytoken_securitytoken_.securitytoken.md#documents)
- [features](_entities_securitytoken_securitytoken_.securitytoken.md#features)
- [granularity](_entities_securitytoken_securitytoken_.securitytoken.md#granularity)
- [issuance](_entities_securitytoken_securitytoken_.securitytoken.md#issuance)
- [name](_entities_securitytoken_securitytoken_.securitytoken.md#name)
- [owner](_entities_securitytoken_securitytoken_.securitytoken.md#owner)
- [permissions](_entities_securitytoken_securitytoken_.securitytoken.md#permissions)
- [shareholders](_entities_securitytoken_securitytoken_.securitytoken.md#shareholders)
- [symbol](_entities_securitytoken_securitytoken_.securitytoken.md#symbol)
- [tokenDetails](_entities_securitytoken_securitytoken_.securitytoken.md#tokendetails)
- [totalSupply](_entities_securitytoken_securitytoken_.securitytoken.md#totalsupply)
- [transfers](_entities_securitytoken_securitytoken_.securitytoken.md#transfers)
- [treasuryWallet](_entities_securitytoken_securitytoken_.securitytoken.md#treasurywallet)
- [uid](_entities_securitytoken_securitytoken_.securitytoken.md#uid)
- [version](_entities_securitytoken_securitytoken_.securitytoken.md#version)
- [unserialize](_entities_securitytoken_securitytoken_.securitytoken.md#static-unserialize)

### Methods

- [\_refresh](_entities_securitytoken_securitytoken_.securitytoken.md#_refresh)
- [toPojo](_entities_securitytoken_securitytoken_.securitytoken.md#topojo)
- [transferOwnership](_entities_securitytoken_securitytoken_.securitytoken.md#transferownership)
- [generateId](_entities_securitytoken_securitytoken_.securitytoken.md#static-generateid)

## Constructors

### constructor

\+ **new SecurityToken**(`params`: [Params](../interfaces/_entities_securitytoken_securitytoken_.params.md) & [UniqueIdentifiers](../interfaces/_entities_securitytoken_securitytoken_.uniqueidentifiers.md), `context`: [Context](_context_.context.md)): _[SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:153](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SecurityToken.ts#L153)_

Create a new SecurityToken instance

**Parameters:**

| Name      | Type                                                                                                                                                                      |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `params`  | [Params](../interfaces/_entities_securitytoken_securitytoken_.params.md) & [UniqueIdentifiers](../interfaces/_entities_securitytoken_securitytoken_.uniqueidentifiers.md) |
| `context` | [Context](_context_.context.md)                                                                                                                                           |

**Returns:** _[SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)_

## Properties

### address

• **address**: _string_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:114](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SecurityToken.ts#L114)_

address that owns the Security Token

---

### context

• **context**: _[Context](_context_.context.md)_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:153](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SecurityToken.ts#L153)_

---

### controller

• **controller**: _[Controller](_entities_securitytoken_controller_.controller.md)_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:147](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SecurityToken.ts#L147)_

---

### currentCheckpoint

• **currentCheckpoint**: _number_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:130](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SecurityToken.ts#L130)_

index of the current checkpoint

---

### dividends

• **dividends**: _[Dividends](_entities_securitytoken_dividends_.dividends.md)_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:141](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SecurityToken.ts#L141)_

---

### documents

• **documents**: _[Documents](_entities_securitytoken_documents_.documents.md)_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:151](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SecurityToken.ts#L151)_

---

### features

• **features**: _[Features](_entities_securitytoken_features_.features.md)_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:137](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SecurityToken.ts#L137)_

---

### granularity

• **granularity**: _number_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:123](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SecurityToken.ts#L123)_

---

### issuance

• **issuance**: _[Issuance](_entities_securitytoken_issuance_issuance_.issuance.md)_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:143](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SecurityToken.ts#L143)_

---

### name

• **name**: _string_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:104](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SecurityToken.ts#L104)_

---

### owner

• **owner**: _string_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:109](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SecurityToken.ts#L109)_

address of the Security Token contract

---

### permissions

• **permissions**: _[Permissions](_entities_securitytoken_permissions_.permissions.md)_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:145](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SecurityToken.ts#L145)_

---

### shareholders

• **shareholders**: _[Shareholders](_entities_securitytoken_shareholders_.shareholders.md)_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:139](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SecurityToken.ts#L139)_

---

### symbol

• **symbol**: _string_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:102](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SecurityToken.ts#L102)_

---

### tokenDetails

• **tokenDetails**: _string_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:119](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SecurityToken.ts#L119)_

URL pointing to off-chain data associated with the Security Token

---

### totalSupply

• **totalSupply**: _BigNumber_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:125](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SecurityToken.ts#L125)_

---

### transfers

• **transfers**: _[Transfers](_entities_securitytoken_transfers_transfers_.transfers.md)_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:149](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SecurityToken.ts#L149)_

---

### treasuryWallet

• **treasuryWallet**: _string_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:135](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SecurityToken.ts#L135)_

treasury wallet used by some features

---

### uid

• **uid**: _string_

_Overrides [Entity](_entities_entity_.entity.md).[uid](_entities_entity_.entity.md#abstract-uid)_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:100](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SecurityToken.ts#L100)_

---

### version

• **version**: _Version_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:121](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SecurityToken.ts#L121)_

---

### `Static` unserialize

▪ **unserialize**: _unserialize_ = unserialize

_Defined in [src/entities/SecurityToken/SecurityToken.ts:98](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SecurityToken.ts#L98)_

## Methods

### \_refresh

▸ **\_refresh**(`params`: Partial‹[Params](../interfaces/_entities_securitytoken_securitytoken_.params.md)›): _void_

_Overrides [Entity](_entities_entity_.entity.md).[\_refresh](_entities_entity_.entity.md#abstract-_refresh)_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:249](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SecurityToken.ts#L249)_

Hydrate the entity

**Parameters:**

| Name     | Type                                                                              |
| -------- | --------------------------------------------------------------------------------- |
| `params` | Partial‹[Params](../interfaces/_entities_securitytoken_securitytoken_.params.md)› |

**Returns:** _void_

---

### toPojo

▸ **toPojo**(): _object_

_Overrides [Entity](_entities_entity_.entity.md).[toPojo](_entities_entity_.entity.md#abstract-topojo)_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:216](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SecurityToken.ts#L216)_

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** _object_

- **address**: _string_

- **currentCheckpoint**: _number_

- **granularity**: _number_

- **name**: _string_

- **owner**: _string_

- **symbol**: _string_

- **tokenDetails**: _string_

- **totalSupply**: _BigNumber_

- **treasuryWallet**: _string_

- **uid**: _string_

- **version**: _ContractVersion_

---

### transferOwnership

▸ **transferOwnership**(`args`: object): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[TransferOwnershipProcedureArgs](../interfaces/_types_index_.transferownershipprocedureargs.md), void››_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:202](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SecurityToken.ts#L202)_

Transfers ownership of the Security Token to a different wallet address

**Parameters:**

▪ **args**: _object_

| Name       | Type   |
| ---------- | ------ |
| `newOwner` | string |

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[TransferOwnershipProcedureArgs](../interfaces/_types_index_.transferownershipprocedureargs.md), void››_

---

### `Static` generateId

▸ **generateId**(`__namedParameters`: object): _string_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:92](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SecurityToken.ts#L92)_

Generate the Security Token's UUID from its identifying properties

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name     | Type   |
| -------- | ------ |
| `symbol` | string |

**Returns:** _string_
