# Class: SecurityTokenReservation

Class used to manage all the Security Token Reservation functionality

## Hierarchy

* [Entity](entities.entity.md)‹[Params](../interfaces/entities.params-6.md)›

  ↳ **SecurityTokenReservation**

## Index

### Constructors

* [constructor](entities.securitytokenreservation.md#constructor)

### Properties

* [context](entities.securitytokenreservation.md#protected-context)
* [expiry](entities.securitytokenreservation.md#expiry)
* [ownerAddress](entities.securitytokenreservation.md#owneraddress)
* [reservedAt](entities.securitytokenreservation.md#reservedat)
* [securityTokenAddress](entities.securitytokenreservation.md#optional-securitytokenaddress)
* [symbol](entities.securitytokenreservation.md#symbol)
* [uid](entities.securitytokenreservation.md#uid)

### Methods

* [_refresh](entities.securitytokenreservation.md#_refresh)
* [createSecurityToken](entities.securitytokenreservation.md#createsecuritytoken)
* [isLaunched](entities.securitytokenreservation.md#islaunched)
* [toPojo](entities.securitytokenreservation.md#topojo)
* [transferOwnership](entities.securitytokenreservation.md#transferownership)
* [generateId](entities.securitytokenreservation.md#static-generateid)
* [unserialize](entities.securitytokenreservation.md#static-unserialize)

## Constructors

###  constructor

\+ **new SecurityTokenReservation**(`params`: [Params](../interfaces/entities.params-6.md) & [UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-8.md), `context`: [Context](_context_.context.md)): *[SecurityTokenReservation](entities.securitytokenreservation.md)*

*Defined in [src/entities/SecurityTokenReservation.ts:97](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityTokenReservation.ts#L97)*

Create a new SecurityTokenReservation instance

**Parameters:**

Name | Type |
------ | ------ |
`params` | [Params](../interfaces/entities.params-6.md) & [UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-8.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[SecurityTokenReservation](entities.securitytokenreservation.md)*

## Properties

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Defined in [src/entities/SecurityTokenReservation.ts:97](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityTokenReservation.ts#L97)*

___

###  expiry

• **expiry**: *Date*

*Defined in [src/entities/SecurityTokenReservation.ts:80](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityTokenReservation.ts#L80)*

Date at which this reservation expires

___

###  ownerAddress

• **ownerAddress**: *string*

*Defined in [src/entities/SecurityTokenReservation.ts:90](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityTokenReservation.ts#L90)*

Address of the owner of the reservation

___

###  reservedAt

• **reservedAt**: *Date*

*Defined in [src/entities/SecurityTokenReservation.ts:85](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityTokenReservation.ts#L85)*

Date when the Security Token was reserved

___

### `Optional` securityTokenAddress

• **securityTokenAddress**? : *undefined | string*

*Defined in [src/entities/SecurityTokenReservation.ts:95](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityTokenReservation.ts#L95)*

Address of the Security Token if it has already been launched, undefined if not

___

###  symbol

• **symbol**: *string*

*Defined in [src/entities/SecurityTokenReservation.ts:75](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityTokenReservation.ts#L75)*

___

###  uid

• **uid**: *string*

*Overrides [Entity](entities.entity.md).[uid](entities.entity.md#abstract-uid)*

*Defined in [src/entities/SecurityTokenReservation.ts:73](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityTokenReservation.ts#L73)*

## Methods

###  _refresh

▸ **_refresh**(`params`: Partial‹[Params](../interfaces/entities.params-6.md)›): *void*

*Overrides [Entity](entities.entity.md).[_refresh](entities.entity.md#abstract-_refresh)*

*Defined in [src/entities/SecurityTokenReservation.ts:172](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityTokenReservation.ts#L172)*

Hydrate the entity

**Parameters:**

Name | Type |
------ | ------ |
`params` | Partial‹[Params](../interfaces/entities.params-6.md)› |

**Returns:** *void*

___

###  createSecurityToken

▸ **createSecurityToken**(`args`: object): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹CreateSecurityTokenProcedureArgs, [SecurityToken](entities.securitytoken.securitytoken.md)››*

*Defined in [src/entities/SecurityTokenReservation.ts:124](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityTokenReservation.ts#L124)*

Creates a security token with the reserved symbol

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹CreateSecurityTokenProcedureArgs, [SecurityToken](entities.securitytoken.securitytoken.md)››*

___

###  isLaunched

▸ **isLaunched**(): *Promise‹boolean›*

*Defined in [src/entities/SecurityTokenReservation.ts:143](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityTokenReservation.ts#L143)*

Returns true if the Security Token associated to this reservation has already been launched

**Returns:** *Promise‹boolean›*

___

###  toPojo

▸ **toPojo**(): *object*

*Overrides [Entity](entities.entity.md).[toPojo](entities.entity.md#abstract-topojo)*

*Defined in [src/entities/SecurityTokenReservation.ts:163](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityTokenReservation.ts#L163)*

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** *object*

___

###  transferOwnership

▸ **transferOwnership**(`args`: object): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹TransferReservationOwnershipProcedureArgs, void››*

*Defined in [src/entities/SecurityTokenReservation.ts:152](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityTokenReservation.ts#L152)*

Transfer the ownership of the ticker

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹TransferReservationOwnershipProcedureArgs, void››*

___

### `Static` generateId

▸ **generateId**(`__namedParameters`: object): *string*

*Defined in [src/entities/SecurityTokenReservation.ts:49](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityTokenReservation.ts#L49)*

Generate the Security Token Reservation's UUID from its identifying properties

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | object |

**Returns:** *string*

___

### `Static` unserialize

▸ **unserialize**(`serialized`: string): *[UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-8.md)*

*Defined in [src/entities/SecurityTokenReservation.ts:60](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityTokenReservation.ts#L60)*

Unserialize string to a Security Token Reservation object representation

**Parameters:**

Name | Type |
------ | ------ |
`serialized` | string |

**Returns:** *[UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-8.md)*
