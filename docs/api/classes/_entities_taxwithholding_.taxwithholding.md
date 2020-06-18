# Class: TaxWithholding

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

* [_refresh](_entities_taxwithholding_.taxwithholding.md#_refresh)
* [toPojo](_entities_taxwithholding_.taxwithholding.md#topojo)
* [generateId](_entities_taxwithholding_.taxwithholding.md#static-generateid)
* [unserialize](_entities_taxwithholding_.taxwithholding.md#static-unserialize)

## Constructors

###  constructor

\+ **new TaxWithholding**(`params`: [Params](../interfaces/_entities_taxwithholding_.params.md) & [UniqueIdentifiers](../interfaces/_entities_taxwithholding_.uniqueidentifiers.md)): *[TaxWithholding](_entities_taxwithholding_.taxwithholding.md)*

*Defined in [src/entities/TaxWithholding.ts:82](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/TaxWithholding.ts#L82)*

Create a new tax withholding instance

**Parameters:**

Name | Type |
------ | ------ |
`params` | [Params](../interfaces/_entities_taxwithholding_.params.md) & [UniqueIdentifiers](../interfaces/_entities_taxwithholding_.uniqueidentifiers.md) |

**Returns:** *[TaxWithholding](_entities_taxwithholding_.taxwithholding.md)*

## Properties

###  percentage

• **percentage**: *number*

*Defined in [src/entities/TaxWithholding.ts:82](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/TaxWithholding.ts#L82)*

percentage of tax to be withheld (0 to 1)

___

###  securityTokenId

• **securityTokenId**: *string*

*Defined in [src/entities/TaxWithholding.ts:75](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/TaxWithholding.ts#L75)*

___

###  securityTokenSymbol

• **securityTokenSymbol**: *string*

*Defined in [src/entities/TaxWithholding.ts:73](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/TaxWithholding.ts#L73)*

___

###  tokenholderAddress

• **tokenholderAddress**: *string*

*Defined in [src/entities/TaxWithholding.ts:77](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/TaxWithholding.ts#L77)*

___

###  uid

• **uid**: *string*

*Overrides [Entity](_entities_entity_.entity.md).[uid](_entities_entity_.entity.md#abstract-uid)*

*Defined in [src/entities/TaxWithholding.ts:71](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/TaxWithholding.ts#L71)*

unique generated identifer for tax withholding entity

## Methods

###  _refresh

▸ **_refresh**(`params`: Partial‹[Params](../interfaces/_entities_taxwithholding_.params.md)›): *void*

*Overrides [Entity](_entities_entity_.entity.md).[_refresh](_entities_entity_.entity.md#abstract-_refresh)*

*Defined in [src/entities/TaxWithholding.ts:120](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/TaxWithholding.ts#L120)*

Hydrate the entity

**Parameters:**

Name | Type |
------ | ------ |
`params` | Partial‹[Params](../interfaces/_entities_taxwithholding_.params.md)› |

**Returns:** *void*

___

###  toPojo

▸ **toPojo**(): *object*

*Overrides [Entity](_entities_entity_.entity.md).[toPojo](_entities_entity_.entity.md#abstract-topojo)*

*Defined in [src/entities/TaxWithholding.ts:105](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/TaxWithholding.ts#L105)*

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** *object*

* **percentage**: *number*

* **securityTokenId**: *string*

* **securityTokenSymbol**: *string*

* **tokenholderAddress**: *string*

* **uid**: *string*

___

### `Static` generateId

▸ **generateId**(`__namedParameters`: object): *string*

*Defined in [src/entities/TaxWithholding.ts:43](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/TaxWithholding.ts#L43)*

Generate the Tax Withholding's UUID from its identifying properties

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`securityTokenId` | string |
`tokenholderAddress` | string |

**Returns:** *string*

___

### `Static` unserialize

▸ **unserialize**(`serialized`: string): *[UniqueIdentifiers](../interfaces/_entities_taxwithholding_.uniqueidentifiers.md)*

*Defined in [src/entities/TaxWithholding.ts:55](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/TaxWithholding.ts#L55)*

Unserialize a serialized entity of tax withholding information

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`serialized` | string | string with tax withholding information  |

**Returns:** *[UniqueIdentifiers](../interfaces/_entities_taxwithholding_.uniqueidentifiers.md)*
