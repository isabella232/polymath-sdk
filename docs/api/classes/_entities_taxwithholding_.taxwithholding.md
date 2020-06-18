# TaxWithholding

Represents the percentage that should be withheld from a Tokenholder's dividend payment for tax purposes

## Hierarchy

* [Entity](_entities_entity_.entity.md)‹[Params](../interfaces/_entities_taxwithholding_.params.md)›

  ↳ **TaxWithholding**

## Index

### Constructors

* [constructor](_entities_taxwithholding_.taxwithholding.md#constructor)

### Properties

* [percentage](_entities_taxwithholding_.taxwithholding.md#percentage)
* [securityTokenId](_entities_taxwithholding_.taxwithholding.md#securitytokenid)
* [securityTokenSymbol](_entities_taxwithholding_.taxwithholding.md#securitytokensymbol)
* [tokenholderAddress](_entities_taxwithholding_.taxwithholding.md#tokenholderaddress)
* [uid](_entities_taxwithholding_.taxwithholding.md#uid)

### Methods

* [\_refresh](_entities_taxwithholding_.taxwithholding.md#_refresh)
* [toPojo](_entities_taxwithholding_.taxwithholding.md#topojo)
* [generateId](_entities_taxwithholding_.taxwithholding.md#static-generateid)
* [unserialize](_entities_taxwithholding_.taxwithholding.md#static-unserialize)

## Constructors

### constructor

+ **new TaxWithholding**\(`params`: [Params](../interfaces/_entities_taxwithholding_.params.md) & [UniqueIdentifiers](../interfaces/_entities_taxwithholding_.uniqueidentifiers.md)\): [_TaxWithholding_](_entities_taxwithholding_.taxwithholding.md)

_Defined in_ [_src/entities/TaxWithholding.ts:82_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TaxWithholding.ts#L82)

Create a new tax withholding instance

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | [Params](../interfaces/_entities_taxwithholding_.params.md) & [UniqueIdentifiers](../interfaces/_entities_taxwithholding_.uniqueidentifiers.md) |

**Returns:** [_TaxWithholding_](_entities_taxwithholding_.taxwithholding.md)

## Properties

### percentage

• **percentage**: _number_

_Defined in_ [_src/entities/TaxWithholding.ts:82_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TaxWithholding.ts#L82)

percentage of tax to be withheld \(0 to 1\)

### securityTokenId

• **securityTokenId**: _string_

_Defined in_ [_src/entities/TaxWithholding.ts:75_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TaxWithholding.ts#L75)

### securityTokenSymbol

• **securityTokenSymbol**: _string_

_Defined in_ [_src/entities/TaxWithholding.ts:73_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TaxWithholding.ts#L73)

### tokenholderAddress

• **tokenholderAddress**: _string_

_Defined in_ [_src/entities/TaxWithholding.ts:77_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TaxWithholding.ts#L77)

### uid

• **uid**: _string_

_Overrides_ [_Entity_](_entities_entity_.entity.md)_._[_uid_](_entities_entity_.entity.md#abstract-uid)

_Defined in_ [_src/entities/TaxWithholding.ts:71_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TaxWithholding.ts#L71)

unique generated identifer for tax withholding entity

## Methods

### \_refresh

▸ **\_refresh**\(`params`: Partial‹[Params](../interfaces/_entities_taxwithholding_.params.md)›\): _void_

_Overrides_ [_Entity_](_entities_entity_.entity.md)_._[_\_refresh_](_entities_entity_.entity.md#abstract-_refresh)

_Defined in_ [_src/entities/TaxWithholding.ts:120_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TaxWithholding.ts#L120)

Hydrate the entity

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | Partial‹[Params](../interfaces/_entities_taxwithholding_.params.md)› |

**Returns:** _void_

### toPojo

▸ **toPojo**\(\): _object_

_Overrides_ [_Entity_](_entities_entity_.entity.md)_._[_toPojo_](_entities_entity_.entity.md#abstract-topojo)

_Defined in_ [_src/entities/TaxWithholding.ts:105_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TaxWithholding.ts#L105)

Convert entity to a POJO \(Plain Old Javascript Object\)

**Returns:** _object_

* **percentage**: _number_
* **securityTokenId**: _string_
* **securityTokenSymbol**: _string_
* **tokenholderAddress**: _string_
* **uid**: _string_

### `Static` generateId

▸ **generateId**\(`__namedParameters`: object\): _string_

_Defined in_ [_src/entities/TaxWithholding.ts:43_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TaxWithholding.ts#L43)

Generate the Tax Withholding's UUID from its identifying properties

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type |
| :--- | :--- |
| `securityTokenId` | string |
| `tokenholderAddress` | string |

**Returns:** _string_

### `Static` unserialize

▸ **unserialize**\(`serialized`: string\): [_UniqueIdentifiers_](../interfaces/_entities_taxwithholding_.uniqueidentifiers.md)

_Defined in_ [_src/entities/TaxWithholding.ts:55_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TaxWithholding.ts#L55)

Unserialize a serialized entity of tax withholding information

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `serialized` | string | string with tax withholding information |

**Returns:** [_UniqueIdentifiers_](../interfaces/_entities_taxwithholding_.uniqueidentifiers.md)

