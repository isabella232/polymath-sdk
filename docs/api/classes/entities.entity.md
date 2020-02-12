# Class: Entity <**Params**>

Represents an object or resource in the Polymath Ecosystem with its own set of properties and functionality

## Type parameters

▪ **Params**

## Hierarchy

* **Entity**

  ↳ [PolyTransaction](entities.polytransaction.md)

  ↳ [TransactionQueue](entities.transactionqueue.md)

  ↳ [SecurityTokenReservation](entities.securitytokenreservation.md)

  ↳ [DividendDistribution](entities.dividenddistribution.md)

  ↳ [Checkpoint](entities.checkpoint.md)

  ↳ [TaxWithholding](entities.taxwithholding.md)

  ↳ [Erc20TokenBalance](entities.erc20tokenbalance.md)

  ↳ [Sto](entities.sto.md)

  ↳ [Investment](entities.investment.md)

  ↳ [Shareholder](entities.shareholder.md)

  ↳ [Wallet](entities.wallet.md)

  ↳ [SecurityToken](entities.securitytoken.securitytoken.md)

## Index

### Properties

* [uid](entities.entity.md#abstract-uid)

### Methods

* [_refresh](entities.entity.md#abstract-_refresh)
* [toPojo](entities.entity.md#abstract-topojo)

## Properties

### `Abstract` uid

• **uid**: *string*

*Defined in [src/entities/Entity.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Entity.ts#L10)*

## Methods

### `Abstract` _refresh

▸ **_refresh**(`params`: Partial‹Params›): *void*

*Defined in [src/entities/Entity.ts:14](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Entity.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`params` | Partial‹Params› |

**Returns:** *void*

___

### `Abstract` toPojo

▸ **toPojo**(): *any*

*Defined in [src/entities/Entity.ts:12](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/Entity.ts#L12)*

**Returns:** *any*
