# SecurityTokenReservation

Class used to manage all the Security Token Reservation functionality

## Hierarchy

* [Entity]()‹[Params]()›

  ↳ **SecurityTokenReservation**

## Index

### Constructors

* [constructor]()

### Properties

* [context]()
* [expiry]()
* [ownerAddress]()
* [reservedAt]()
* [securityTokenAddress]()
* [symbol]()
* [uid]()

### Methods

* [\_refresh]()
* [createSecurityToken]()
* [isLaunched]()
* [toPojo]()
* [transferOwnership]()
* [generateId]()
* [unserialize]()

## Constructors

### constructor

+ **new SecurityTokenReservation**\(`params`: [Params]() & [UniqueIdentifiers](), `context`: [Context]()\): [_SecurityTokenReservation_]()

_Defined in_ [_src/entities/SecurityTokenReservation.ts:92_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityTokenReservation.ts#L92)

Create a new SecurityTokenReservation instance

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | [Params]() & [UniqueIdentifiers]() |
| `context` | [Context]() |

**Returns:** [_SecurityTokenReservation_]()

## Properties

### `Protected` context

• **context**: [_Context_]()

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

_Overrides_ [_Entity_]()_._[_uid_]()

_Defined in_ [_src/entities/SecurityTokenReservation.ts:68_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityTokenReservation.ts#L68)

## Methods

### \_refresh

▸ **\_refresh**\(`params`: Partial‹[Params]()›\): _void_

_Overrides_ [_Entity_]()_._[_\_refresh_]()

_Defined in_ [_src/entities/SecurityTokenReservation.ts:167_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityTokenReservation.ts#L167)

Hydrate the entity

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | Partial‹[Params]()› |

**Returns:** _void_

### createSecurityToken

▸ **createSecurityToken**\(`args`: object\): _Promise‹_[_TransactionQueue_]()_‹_[_CreateSecurityTokenProcedureArgs_]()_,_ [_SecurityToken_]()_››_

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

**Returns:** _Promise‹_[_TransactionQueue_]()_‹_[_CreateSecurityTokenProcedureArgs_]()_,_ [_SecurityToken_]()_››_

### isLaunched

▸ **isLaunched**\(\): _Promise‹boolean›_

_Defined in_ [_src/entities/SecurityTokenReservation.ts:138_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityTokenReservation.ts#L138)

Returns true if the Security Token associated to this reservation has already been launched

**Returns:** _Promise‹boolean›_

### toPojo

▸ **toPojo**\(\): _object_

_Overrides_ [_Entity_]()_._[_toPojo_]()

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

▸ **transferOwnership**\(`args`: object\): _Promise‹_[_TransactionQueue_]()_‹_[_TransferReservationOwnershipProcedureArgs_]()_, void››_

_Defined in_ [_src/entities/SecurityTokenReservation.ts:147_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityTokenReservation.ts#L147)

Transfer the ownership of the ticker

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `newOwner` | string |

**Returns:** _Promise‹_[_TransactionQueue_]()_‹_[_TransferReservationOwnershipProcedureArgs_]()_, void››_

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

▸ **unserialize**\(`serialized`: string\): [_UniqueIdentifiers_]()

_Defined in_ [_src/entities/SecurityTokenReservation.ts:55_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityTokenReservation.ts#L55)

Unserialize string to a Security Token Reservation object representation

**Parameters:**

| Name | Type |
| :--- | :--- |
| `serialized` | string |

**Returns:** [_UniqueIdentifiers_]()

