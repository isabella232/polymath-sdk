# Entity

Represents an object or resource in the Polymath Ecosystem with its own set of properties and functionality

## Type parameters

▪ **Params**

## Hierarchy

* **Entity**

  ↳ [PolyTransaction]()

  ↳ [TransactionQueue]()

  ↳ [SecurityTokenReservation]()

  ↳ [DividendDistribution]()

  ↳ [Checkpoint]()

  ↳ [TaxWithholding]()

  ↳ [Erc20TokenBalance]()

  ↳ [Sto]()

  ↳ [Investment]()

  ↳ [Tokenholder]()

  ↳ [Wallet]()

  ↳ [SecurityToken]()

## Index

### Properties

* [uid]()

### Methods

* [\_refresh]()
* [toPojo]()

## Properties

### `Abstract` uid

• **uid**: _string_

_Defined in_ [_src/entities/Entity.ts:5_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Entity.ts#L5)

## Methods

### `Abstract` \_refresh

▸ **\_refresh**\(`params`: Partial‹Params›\): _void_

_Defined in_ [_src/entities/Entity.ts:9_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Entity.ts#L9)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | Partial‹Params› |

**Returns:** _void_

### `Abstract` toPojo

▸ **toPojo**\(\): _any_

_Defined in_ [_src/entities/Entity.ts:7_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Entity.ts#L7)

**Returns:** _any_

