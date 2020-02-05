# Class: SecurityTokenReservation

Class used to manage all the Security Token Reservation functionality

## Hierarchy

- [Entity](_entities_entity_.entity.md)‹[Params](../interfaces/_entities_securitytokenreservation_.params.md)›

  ↳ **SecurityTokenReservation**

## Index

### Constructors

- [constructor](_entities_securitytokenreservation_.securitytokenreservation.md#constructor)

### Properties

- [context](_entities_securitytokenreservation_.securitytokenreservation.md#protected-context)
- [expiry](_entities_securitytokenreservation_.securitytokenreservation.md#expiry)
- [ownerAddress](_entities_securitytokenreservation_.securitytokenreservation.md#owneraddress)
- [reservedAt](_entities_securitytokenreservation_.securitytokenreservation.md#reservedat)
- [securityTokenAddress](_entities_securitytokenreservation_.securitytokenreservation.md#optional-securitytokenaddress)
- [symbol](_entities_securitytokenreservation_.securitytokenreservation.md#symbol)
- [uid](_entities_securitytokenreservation_.securitytokenreservation.md#uid)

### Methods

- [\_refresh](_entities_securitytokenreservation_.securitytokenreservation.md#_refresh)
- [createSecurityToken](_entities_securitytokenreservation_.securitytokenreservation.md#createsecuritytoken)
- [isLaunched](_entities_securitytokenreservation_.securitytokenreservation.md#islaunched)
- [toPojo](_entities_securitytokenreservation_.securitytokenreservation.md#topojo)
- [transferOwnership](_entities_securitytokenreservation_.securitytokenreservation.md#transferownership)
- [generateId](_entities_securitytokenreservation_.securitytokenreservation.md#static-generateid)
- [unserialize](_entities_securitytokenreservation_.securitytokenreservation.md#static-unserialize)

## Constructors

### constructor

\+ **new SecurityTokenReservation**(`params`: [Params](../interfaces/_entities_securitytokenreservation_.params.md) & [UniqueIdentifiers](../interfaces/_entities_securitytokenreservation_.uniqueidentifiers.md), `context`: [Context](_context_.context.md)): _[SecurityTokenReservation](_entities_securitytokenreservation_.securitytokenreservation.md)_

_Defined in [src/entities/SecurityTokenReservation.ts:92](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityTokenReservation.ts#L92)_

Create a new SecurityTokenReservation instance

**Parameters:**

| Name      | Type                                                                                                                                                                |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `params`  | [Params](../interfaces/_entities_securitytokenreservation_.params.md) & [UniqueIdentifiers](../interfaces/_entities_securitytokenreservation_.uniqueidentifiers.md) |
| `context` | [Context](_context_.context.md)                                                                                                                                     |

**Returns:** _[SecurityTokenReservation](_entities_securitytokenreservation_.securitytokenreservation.md)_

## Properties

### `Protected` context

• **context**: _[Context](_context_.context.md)_

_Defined in [src/entities/SecurityTokenReservation.ts:92](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityTokenReservation.ts#L92)_

---

### expiry

• **expiry**: _Date_

_Defined in [src/entities/SecurityTokenReservation.ts:75](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityTokenReservation.ts#L75)_

Date at which this reservation expires

---

### ownerAddress

• **ownerAddress**: _string_

_Defined in [src/entities/SecurityTokenReservation.ts:85](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityTokenReservation.ts#L85)_

Address of the owner of the reservation

---

### reservedAt

• **reservedAt**: _Date_

_Defined in [src/entities/SecurityTokenReservation.ts:80](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityTokenReservation.ts#L80)_

Date when the Security Token was reserved

---

### `Optional` securityTokenAddress

• **securityTokenAddress**? : _undefined | string_

_Defined in [src/entities/SecurityTokenReservation.ts:90](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityTokenReservation.ts#L90)_

Address of the Security Token if it has already been launched, undefined if not

---

### symbol

• **symbol**: _string_

_Defined in [src/entities/SecurityTokenReservation.ts:70](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityTokenReservation.ts#L70)_

---

### uid

• **uid**: _string_

_Overrides [Entity](_entities_entity_.entity.md).[uid](_entities_entity_.entity.md#abstract-uid)_

_Defined in [src/entities/SecurityTokenReservation.ts:68](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityTokenReservation.ts#L68)_

## Methods

### \_refresh

▸ **\_refresh**(`params`: Partial‹[Params](../interfaces/_entities_securitytokenreservation_.params.md)›): _void_

_Overrides [Entity](_entities_entity_.entity.md).[\_refresh](_entities_entity_.entity.md#abstract-_refresh)_

_Defined in [src/entities/SecurityTokenReservation.ts:167](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityTokenReservation.ts#L167)_

Hydrate the entity

**Parameters:**

| Name     | Type                                                                           |
| -------- | ------------------------------------------------------------------------------ |
| `params` | Partial‹[Params](../interfaces/_entities_securitytokenreservation_.params.md)› |

**Returns:** _void_

---

### createSecurityToken

▸ **createSecurityToken**(`args`: object): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[CreateSecurityTokenProcedureArgs](../interfaces/_types_index_.createsecuritytokenprocedureargs.md), [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)››_

_Defined in [src/entities/SecurityTokenReservation.ts:119](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityTokenReservation.ts#L119)_

Creates a security token with the reserved symbol

**Parameters:**

▪ **args**: _object_

| Name              | Type                    |
| ----------------- | ----------------------- |
| `detailsUrl?`     | undefined &#124; string |
| `divisible`       | boolean                 |
| `name`            | string                  |
| `treasuryWallet?` | undefined &#124; string |

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[CreateSecurityTokenProcedureArgs](../interfaces/_types_index_.createsecuritytokenprocedureargs.md), [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)››_

---

### isLaunched

▸ **isLaunched**(): _Promise‹boolean›_

_Defined in [src/entities/SecurityTokenReservation.ts:138](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityTokenReservation.ts#L138)_

Returns true if the Security Token associated to this reservation has already been launched

**Returns:** _Promise‹boolean›_

---

### toPojo

▸ **toPojo**(): _object_

_Overrides [Entity](_entities_entity_.entity.md).[toPojo](_entities_entity_.entity.md#abstract-topojo)_

_Defined in [src/entities/SecurityTokenReservation.ts:158](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityTokenReservation.ts#L158)_

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** _object_

- **expiry**: _Date_

- **ownerAddress**: _string_

- **reservedAt**: _Date_

- **securityTokenAddress**: _undefined | string_

- **symbol**: _string_

- **uid**: _string_

---

### transferOwnership

▸ **transferOwnership**(`args`: object): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[TransferReservationOwnershipProcedureArgs](../interfaces/_types_index_.transferreservationownershipprocedureargs.md), void››_

_Defined in [src/entities/SecurityTokenReservation.ts:147](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityTokenReservation.ts#L147)_

Transfer the ownership of the ticker

**Parameters:**

▪ **args**: _object_

| Name       | Type   |
| ---------- | ------ |
| `newOwner` | string |

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[TransferReservationOwnershipProcedureArgs](../interfaces/_types_index_.transferreservationownershipprocedureargs.md), void››_

---

### `Static` generateId

▸ **generateId**(`__namedParameters`: object): _string_

_Defined in [src/entities/SecurityTokenReservation.ts:44](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityTokenReservation.ts#L44)_

Generate the Security Token Reservation's UUID from its identifying properties

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name     | Type   |
| -------- | ------ |
| `symbol` | string |

**Returns:** _string_

---

### `Static` unserialize

▸ **unserialize**(`serialized`: string): _[UniqueIdentifiers](../interfaces/_entities_securitytokenreservation_.uniqueidentifiers.md)_

_Defined in [src/entities/SecurityTokenReservation.ts:55](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityTokenReservation.ts#L55)_

Unserialize string to a Security Token Reservation object representation

**Parameters:**

| Name         | Type   |
| ------------ | ------ |
| `serialized` | string |

**Returns:** _[UniqueIdentifiers](../interfaces/_entities_securitytokenreservation_.uniqueidentifiers.md)_
