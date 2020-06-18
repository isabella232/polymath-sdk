# SecurityTokenReservation

Class used to manage all the Security Token Reservation functionality

## Hierarchy

* [Entity](_entities_entity_.entity.md)‹[Params](../interfaces/_entities_securitytokenreservation_.params.md)›

  ↳ **SecurityTokenReservation**

## Index

### Constructors

* [constructor](_entities_securitytokenreservation_.securitytokenreservation.md#constructor)

### Properties

* [context](_entities_securitytokenreservation_.securitytokenreservation.md#protected-context)
* [expiry](_entities_securitytokenreservation_.securitytokenreservation.md#expiry)
* [ownerAddress](_entities_securitytokenreservation_.securitytokenreservation.md#owneraddress)
* [reservedAt](_entities_securitytokenreservation_.securitytokenreservation.md#reservedat)
* [securityTokenAddress](_entities_securitytokenreservation_.securitytokenreservation.md#optional-securitytokenaddress)
* [symbol](_entities_securitytokenreservation_.securitytokenreservation.md#symbol)
* [uid](_entities_securitytokenreservation_.securitytokenreservation.md#uid)

### Methods

* [\_refresh](_entities_securitytokenreservation_.securitytokenreservation.md#_refresh)
* [createSecurityToken](_entities_securitytokenreservation_.securitytokenreservation.md#createsecuritytoken)
* [isLaunched](_entities_securitytokenreservation_.securitytokenreservation.md#islaunched)
* [toPojo](_entities_securitytokenreservation_.securitytokenreservation.md#topojo)
* [transferOwnership](_entities_securitytokenreservation_.securitytokenreservation.md#transferownership)
* [generateId](_entities_securitytokenreservation_.securitytokenreservation.md#static-generateid)
* [unserialize](_entities_securitytokenreservation_.securitytokenreservation.md#static-unserialize)

## Constructors

### constructor

+ **new SecurityTokenReservation**\(`params`: [Params](../interfaces/_entities_securitytokenreservation_.params.md) & [UniqueIdentifiers](../interfaces/_entities_securitytokenreservation_.uniqueidentifiers.md), `context`: [Context](_context_.context.md)\): [_SecurityTokenReservation_](_entities_securitytokenreservation_.securitytokenreservation.md)

_Defined in_ [_src/entities/SecurityTokenReservation.ts:92_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityTokenReservation.ts#L92)

Create a new SecurityTokenReservation instance

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | [Params](../interfaces/_entities_securitytokenreservation_.params.md) & [UniqueIdentifiers](../interfaces/_entities_securitytokenreservation_.uniqueidentifiers.md) |
| `context` | [Context](_context_.context.md) |

**Returns:** [_SecurityTokenReservation_](_entities_securitytokenreservation_.securitytokenreservation.md)

## Properties

### `Protected` context

• **context**: [_Context_](_context_.context.md)

_Defined in_ [_src/entities/SecurityTokenReservation.ts:92_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityTokenReservation.ts#L92)

### expiry

• **expiry**: _Date_

_Defined in_ [_src/entities/SecurityTokenReservation.ts:75_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityTokenReservation.ts#L75)

Date at which this reservation expires

### ownerAddress

• **ownerAddress**: _string_

_Defined in_ [_src/entities/SecurityTokenReservation.ts:85_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityTokenReservation.ts#L85)

Address of the owner of the reservation

### reservedAt

• **reservedAt**: _Date_

_Defined in_ [_src/entities/SecurityTokenReservation.ts:80_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityTokenReservation.ts#L80)

Date when the Security Token was reserved

### `Optional` securityTokenAddress

• **securityTokenAddress**? : _undefined \| string_

_Defined in_ [_src/entities/SecurityTokenReservation.ts:90_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityTokenReservation.ts#L90)

Address of the Security Token if it has already been launched, undefined if not

### symbol

• **symbol**: _string_

_Defined in_ [_src/entities/SecurityTokenReservation.ts:70_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityTokenReservation.ts#L70)

### uid

• **uid**: _string_

_Overrides_ [_Entity_](_entities_entity_.entity.md)_._[_uid_](_entities_entity_.entity.md#abstract-uid)

_Defined in_ [_src/entities/SecurityTokenReservation.ts:68_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityTokenReservation.ts#L68)

## Methods

### \_refresh

▸ **\_refresh**\(`params`: Partial‹[Params](../interfaces/_entities_securitytokenreservation_.params.md)›\): _void_

_Overrides_ [_Entity_](_entities_entity_.entity.md)_._[_\_refresh_](_entities_entity_.entity.md#abstract-_refresh)

_Defined in_ [_src/entities/SecurityTokenReservation.ts:167_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityTokenReservation.ts#L167)

Hydrate the entity

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | Partial‹[Params](../interfaces/_entities_securitytokenreservation_.params.md)› |

**Returns:** _void_

### createSecurityToken

▸ **createSecurityToken**\(`args`: object\): _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_CreateSecurityTokenProcedureArgs_](../interfaces/_types_index_.createsecuritytokenprocedureargs.md)_,_ [_SecurityToken_](_entities_securitytoken_securitytoken_.securitytoken.md)_››_

_Defined in_ [_src/entities/SecurityTokenReservation.ts:119_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityTokenReservation.ts#L119)

Creates a security token with the reserved symbol

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `detailsUrl?` | undefined \| string |
| `divisible` | boolean |
| `name` | string |
| `treasuryWallet?` | undefined \| string |

**Returns:** _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_CreateSecurityTokenProcedureArgs_](../interfaces/_types_index_.createsecuritytokenprocedureargs.md)_,_ [_SecurityToken_](_entities_securitytoken_securitytoken_.securitytoken.md)_››_

### isLaunched

▸ **isLaunched**\(\): _Promise‹boolean›_

_Defined in_ [_src/entities/SecurityTokenReservation.ts:138_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityTokenReservation.ts#L138)

Returns true if the Security Token associated to this reservation has already been launched

**Returns:** _Promise‹boolean›_

### toPojo

▸ **toPojo**\(\): _object_

_Overrides_ [_Entity_](_entities_entity_.entity.md)_._[_toPojo_](_entities_entity_.entity.md#abstract-topojo)

_Defined in_ [_src/entities/SecurityTokenReservation.ts:158_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityTokenReservation.ts#L158)

Convert entity to a POJO \(Plain Old Javascript Object\)

**Returns:** _object_

* **expiry**: _Date_
* **ownerAddress**: _string_
* **reservedAt**: _Date_
* **securityTokenAddress**: _undefined \| string_
* **symbol**: _string_
* **uid**: _string_

### transferOwnership

▸ **transferOwnership**\(`args`: object\): _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_TransferReservationOwnershipProcedureArgs_](../interfaces/_types_index_.transferreservationownershipprocedureargs.md)_, void››_

_Defined in_ [_src/entities/SecurityTokenReservation.ts:147_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityTokenReservation.ts#L147)

Transfer the ownership of the ticker

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `newOwner` | string |

**Returns:** _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_TransferReservationOwnershipProcedureArgs_](../interfaces/_types_index_.transferreservationownershipprocedureargs.md)_, void››_

### `Static` generateId

▸ **generateId**\(`__namedParameters`: object\): _string_

_Defined in_ [_src/entities/SecurityTokenReservation.ts:44_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityTokenReservation.ts#L44)

Generate the Security Token Reservation's UUID from its identifying properties

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type |
| :--- | :--- |
| `symbol` | string |

**Returns:** _string_

### `Static` unserialize

▸ **unserialize**\(`serialized`: string\): [_UniqueIdentifiers_](../interfaces/_entities_securitytokenreservation_.uniqueidentifiers.md)

_Defined in_ [_src/entities/SecurityTokenReservation.ts:55_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityTokenReservation.ts#L55)

Unserialize string to a Security Token Reservation object representation

**Parameters:**

| Name | Type |
| :--- | :--- |
| `serialized` | string |

**Returns:** [_UniqueIdentifiers_](../interfaces/_entities_securitytokenreservation_.uniqueidentifiers.md)

