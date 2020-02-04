[@polymathnetwork/sdk - v2.0.1-beta.120](../README.md) › [Globals](../globals.md) › ["entities/TaxWithholding"](../modules/_entities_taxwithholding_.md) › [TaxWithholding](_entities_taxwithholding_.taxwithholding.md)

# Class: TaxWithholding

Represents the percentage that should be withheld from a Shareholder's dividend payment for tax purposes

## Hierarchy

- [Entity](_entities_entity_.entity.md)‹[Params](../interfaces/_entities_taxwithholding_.params.md)›

  ↳ **TaxWithholding**

## Index

### Constructors

- [constructor](_entities_taxwithholding_.taxwithholding.md#constructor)

### Properties

- [percentage](_entities_taxwithholding_.taxwithholding.md#percentage)
- [securityTokenId](_entities_taxwithholding_.taxwithholding.md#securitytokenid)
- [securityTokenSymbol](_entities_taxwithholding_.taxwithholding.md#securitytokensymbol)
- [shareholderAddress](_entities_taxwithholding_.taxwithholding.md#shareholderaddress)
- [uid](_entities_taxwithholding_.taxwithholding.md#uid)

### Methods

- [\_refresh](_entities_taxwithholding_.taxwithholding.md#_refresh)
- [toPojo](_entities_taxwithholding_.taxwithholding.md#topojo)
- [generateId](_entities_taxwithholding_.taxwithholding.md#static-generateid)
- [unserialize](_entities_taxwithholding_.taxwithholding.md#static-unserialize)

## Constructors

### constructor

\+ **new TaxWithholding**(`params`: [Params](../interfaces/_entities_taxwithholding_.params.md) & [UniqueIdentifiers](../interfaces/_entities_taxwithholding_.uniqueidentifiers.md)): _[TaxWithholding](_entities_taxwithholding_.taxwithholding.md)_

_Defined in [src/entities/TaxWithholding.ts:82](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/TaxWithholding.ts#L82)_

Create a new tax withholding instance

**Parameters:**

| Name     | Type                                                                                                                                            |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `params` | [Params](../interfaces/_entities_taxwithholding_.params.md) & [UniqueIdentifiers](../interfaces/_entities_taxwithholding_.uniqueidentifiers.md) |

**Returns:** _[TaxWithholding](_entities_taxwithholding_.taxwithholding.md)_

## Properties

### percentage

• **percentage**: _number_

_Defined in [src/entities/TaxWithholding.ts:82](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/TaxWithholding.ts#L82)_

percentage of tax to be withheld (0 to 1)

---

### securityTokenId

• **securityTokenId**: _string_

_Defined in [src/entities/TaxWithholding.ts:75](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/TaxWithholding.ts#L75)_

---

### securityTokenSymbol

• **securityTokenSymbol**: _string_

_Defined in [src/entities/TaxWithholding.ts:73](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/TaxWithholding.ts#L73)_

---

### shareholderAddress

• **shareholderAddress**: _string_

_Defined in [src/entities/TaxWithholding.ts:77](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/TaxWithholding.ts#L77)_

---

### uid

• **uid**: _string_

_Overrides [Entity](_entities_entity_.entity.md).[uid](_entities_entity_.entity.md#abstract-uid)_

_Defined in [src/entities/TaxWithholding.ts:71](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/TaxWithholding.ts#L71)_

unique generated identifer for tax withholding entity

## Methods

### \_refresh

▸ **\_refresh**(`params`: Partial‹[Params](../interfaces/_entities_taxwithholding_.params.md)›): _void_

_Overrides [Entity](_entities_entity_.entity.md).[\_refresh](_entities_entity_.entity.md#abstract-_refresh)_

_Defined in [src/entities/TaxWithholding.ts:120](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/TaxWithholding.ts#L120)_

Hydrate the entity

**Parameters:**

| Name     | Type                                                                 |
| -------- | -------------------------------------------------------------------- |
| `params` | Partial‹[Params](../interfaces/_entities_taxwithholding_.params.md)› |

**Returns:** _void_

---

### toPojo

▸ **toPojo**(): _object_

_Overrides [Entity](_entities_entity_.entity.md).[toPojo](_entities_entity_.entity.md#abstract-topojo)_

_Defined in [src/entities/TaxWithholding.ts:105](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/TaxWithholding.ts#L105)_

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** _object_

- **percentage**: _number_

- **securityTokenId**: _string_

- **securityTokenSymbol**: _string_

- **shareholderAddress**: _string_

- **uid**: _string_

---

### `Static` generateId

▸ **generateId**(`__namedParameters`: object): _string_

_Defined in [src/entities/TaxWithholding.ts:43](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/TaxWithholding.ts#L43)_

Generate the Tax Withholding's UUID from its identifying properties

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name                 | Type   |
| -------------------- | ------ |
| `securityTokenId`    | string |
| `shareholderAddress` | string |

**Returns:** _string_

---

### `Static` unserialize

▸ **unserialize**(`serialized`: string): _[UniqueIdentifiers](../interfaces/_entities_taxwithholding_.uniqueidentifiers.md)_

_Defined in [src/entities/TaxWithholding.ts:55](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/TaxWithholding.ts#L55)_

Unserialize a serialized entity of tax withholding information

**Parameters:**

| Name         | Type   | Description                             |
| ------------ | ------ | --------------------------------------- |
| `serialized` | string | string with tax withholding information |

**Returns:** _[UniqueIdentifiers](../interfaces/_entities_taxwithholding_.uniqueidentifiers.md)_
