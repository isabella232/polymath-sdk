# Class: SecurityTokenReservation

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

* [_refresh](_entities_securitytokenreservation_.securitytokenreservation.md#_refresh)
* [createSecurityToken](_entities_securitytokenreservation_.securitytokenreservation.md#createsecuritytoken)
* [isLaunched](_entities_securitytokenreservation_.securitytokenreservation.md#islaunched)
* [toPojo](_entities_securitytokenreservation_.securitytokenreservation.md#topojo)
* [transferOwnership](_entities_securitytokenreservation_.securitytokenreservation.md#transferownership)
* [generateId](_entities_securitytokenreservation_.securitytokenreservation.md#static-generateid)
* [unserialize](_entities_securitytokenreservation_.securitytokenreservation.md#static-unserialize)

## Constructors

###  constructor

\+ **new SecurityTokenReservation**(`params`: [Params](../interfaces/_entities_securitytokenreservation_.params.md) & [UniqueIdentifiers](../interfaces/_entities_securitytokenreservation_.uniqueidentifiers.md), `context`: [Context](_context_.context.md)): *[SecurityTokenReservation](_entities_securitytokenreservation_.securitytokenreservation.md)*

*Defined in [src/entities/SecurityTokenReservation.ts:92](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/SecurityTokenReservation.ts#L92)*

Create a new SecurityTokenReservation instance

**Parameters:**

Name | Type |
------ | ------ |
`params` | [Params](../interfaces/_entities_securitytokenreservation_.params.md) & [UniqueIdentifiers](../interfaces/_entities_securitytokenreservation_.uniqueidentifiers.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[SecurityTokenReservation](_entities_securitytokenreservation_.securitytokenreservation.md)*

## Properties

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Defined in [src/entities/SecurityTokenReservation.ts:92](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/SecurityTokenReservation.ts#L92)*

___

###  expiry

• **expiry**: *Date*

*Defined in [src/entities/SecurityTokenReservation.ts:75](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/SecurityTokenReservation.ts#L75)*

Date at which this reservation expires

___

###  ownerAddress

• **ownerAddress**: *string*

*Defined in [src/entities/SecurityTokenReservation.ts:85](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/SecurityTokenReservation.ts#L85)*

Address of the owner of the reservation

___

###  reservedAt

• **reservedAt**: *Date*

*Defined in [src/entities/SecurityTokenReservation.ts:80](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/SecurityTokenReservation.ts#L80)*

Date when the Security Token was reserved

___

### `Optional` securityTokenAddress

• **securityTokenAddress**? : *undefined | string*

*Defined in [src/entities/SecurityTokenReservation.ts:90](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/SecurityTokenReservation.ts#L90)*

Address of the Security Token if it has already been launched, undefined if not

___

###  symbol

• **symbol**: *string*

*Defined in [src/entities/SecurityTokenReservation.ts:70](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/SecurityTokenReservation.ts#L70)*

___

###  uid

• **uid**: *string*

*Overrides [Entity](_entities_entity_.entity.md).[uid](_entities_entity_.entity.md#abstract-uid)*

*Defined in [src/entities/SecurityTokenReservation.ts:68](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/SecurityTokenReservation.ts#L68)*

## Methods

###  _refresh

▸ **_refresh**(`params`: Partial‹[Params](../interfaces/_entities_securitytokenreservation_.params.md)›): *void*

*Overrides [Entity](_entities_entity_.entity.md).[_refresh](_entities_entity_.entity.md#abstract-_refresh)*

*Defined in [src/entities/SecurityTokenReservation.ts:167](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/SecurityTokenReservation.ts#L167)*

Hydrate the entity

**Parameters:**

Name | Type |
------ | ------ |
`params` | Partial‹[Params](../interfaces/_entities_securitytokenreservation_.params.md)› |

**Returns:** *void*

___

###  createSecurityToken

▸ **createSecurityToken**(`args`: object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[CreateSecurityTokenProcedureArgs](../interfaces/_types_index_.createsecuritytokenprocedureargs.md), [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)››*

*Defined in [src/entities/SecurityTokenReservation.ts:119](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/SecurityTokenReservation.ts#L119)*

Creates a security token with the reserved symbol

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`detailsUrl?` | undefined &#124; string |
`divisible` | boolean |
`name` | string |
`treasuryWallet?` | undefined &#124; string |

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[CreateSecurityTokenProcedureArgs](../interfaces/_types_index_.createsecuritytokenprocedureargs.md), [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)››*

___

###  isLaunched

▸ **isLaunched**(): *Promise‹boolean›*

*Defined in [src/entities/SecurityTokenReservation.ts:138](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/SecurityTokenReservation.ts#L138)*

Returns true if the Security Token associated to this reservation has already been launched

**Returns:** *Promise‹boolean›*

___

###  toPojo

▸ **toPojo**(): *object*

*Overrides [Entity](_entities_entity_.entity.md).[toPojo](_entities_entity_.entity.md#abstract-topojo)*

*Defined in [src/entities/SecurityTokenReservation.ts:158](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/SecurityTokenReservation.ts#L158)*

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** *object*

* **expiry**: *Date*

* **ownerAddress**: *string*

* **reservedAt**: *Date*

* **securityTokenAddress**: *undefined | string*

* **symbol**: *string*

* **uid**: *string*

___

###  transferOwnership

▸ **transferOwnership**(`args`: object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[TransferReservationOwnershipProcedureArgs](../interfaces/_types_index_.transferreservationownershipprocedureargs.md), void››*

*Defined in [src/entities/SecurityTokenReservation.ts:147](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/SecurityTokenReservation.ts#L147)*

Transfer the ownership of the ticker

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`newOwner` | string |

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[TransferReservationOwnershipProcedureArgs](../interfaces/_types_index_.transferreservationownershipprocedureargs.md), void››*

___

### `Static` generateId

▸ **generateId**(`__namedParameters`: object): *string*

*Defined in [src/entities/SecurityTokenReservation.ts:44](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/SecurityTokenReservation.ts#L44)*

Generate the Security Token Reservation's UUID from its identifying properties

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`symbol` | string |

**Returns:** *string*

___

### `Static` unserialize

▸ **unserialize**(`serialized`: string): *[UniqueIdentifiers](../interfaces/_entities_securitytokenreservation_.uniqueidentifiers.md)*

*Defined in [src/entities/SecurityTokenReservation.ts:55](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/SecurityTokenReservation.ts#L55)*

Unserialize string to a Security Token Reservation object representation

**Parameters:**

Name | Type |
------ | ------ |
`serialized` | string |

**Returns:** *[UniqueIdentifiers](../interfaces/_entities_securitytokenreservation_.uniqueidentifiers.md)*
