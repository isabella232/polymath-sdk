# Entity

Represents an object or resource in the Polymath Ecosystem with its own set of properties and functionality

## Type parameters

▪ **Params**

## Hierarchy

* **Entity**

  ↳ [PolyTransaction](../classes/_entities_polytransaction_.polytransaction.md)

  ↳ [TransactionQueue](../classes/_entities_transactionqueue_.transactionqueue.md)

  ↳ [SecurityTokenReservation](../classes/_entities_securitytokenreservation_.securitytokenreservation.md)

  ↳ [DividendDistribution](../classes/_entities_dividenddistribution_.dividenddistribution.md)

  ↳ [Checkpoint](../classes/_entities_checkpoint_.checkpoint.md)

  ↳ [TaxWithholding](../classes/_entities_taxwithholding_.taxwithholding.md)

  ↳ [Erc20TokenBalance](../classes/_entities_erc20tokenbalance_.erc20tokenbalance.md)

  ↳ [Sto](../classes/_entities_sto_.sto.md)

  ↳ [Investment](../classes/_entities_investment_.investment.md)

  ↳ [Tokenholder](../classes/_entities_tokenholder_.tokenholder.md)

  ↳ [Wallet](../classes/_entities_wallet_.wallet.md)

  ↳ [SecurityToken](../classes/_entities_securitytoken_securitytoken_.securitytoken.md)

## Index

### Properties

* [uid](../classes/_entities_entity_.entity.md#abstract-uid)

### Methods

* [\_refresh](../classes/_entities_entity_.entity.md#abstract-_refresh)
* [toPojo](../classes/_entities_entity_.entity.md#abstract-topojo)

## Properties

### `Abstract` uid

• **uid**: _string_

_Defined in_ [_src/entities/Entity.ts:5_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Entity.ts#L5)

## Methods

### `Abstract` \_refresh

▸ **\_refresh**\(`params`: Partial‹Params›\): _void_

_Defined in_ [_src/entities/Entity.ts:9_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Entity.ts#L9)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | Partial‹Params› |

**Returns:** _void_

### `Abstract` toPojo

▸ **toPojo**\(\): _any_

_Defined in_ [_src/entities/Entity.ts:7_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Entity.ts#L7)

**Returns:** _any_

