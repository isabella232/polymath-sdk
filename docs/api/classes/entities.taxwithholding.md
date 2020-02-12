# Class: TaxWithholding

Represents the percentage that should be withheld from a Shareholder's dividend payment for tax purposes

## Hierarchy

* [Entity](entities.entity.md)‹[Params](../interfaces/entities.params-1.md)›

  ↳ **TaxWithholding**

## Index

### Constructors

* [constructor](entities.taxwithholding.md#constructor)

### Properties

* [percentage](entities.taxwithholding.md#percentage)
* [securityTokenId](entities.taxwithholding.md#securitytokenid)
* [securityTokenSymbol](entities.taxwithholding.md#securitytokensymbol)
* [shareholderAddress](entities.taxwithholding.md#shareholderaddress)
* [uid](entities.taxwithholding.md#uid)

### Methods

* [_refresh](entities.taxwithholding.md#_refresh)
* [toPojo](entities.taxwithholding.md#topojo)
* [generateId](entities.taxwithholding.md#static-generateid)
* [unserialize](entities.taxwithholding.md#static-unserialize)

## Constructors

###  constructor

\+ **new TaxWithholding**(`params`: [Params](../interfaces/entities.params-1.md) & [UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-3.md)): *[TaxWithholding](entities.taxwithholding.md)*

*Defined in [src/entities/TaxWithholding.ts:87](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/TaxWithholding.ts#L87)*

Create a new tax withholding instance

**Parameters:**

Name | Type |
------ | ------ |
`params` | [Params](../interfaces/entities.params-1.md) & [UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-3.md) |

**Returns:** *[TaxWithholding](entities.taxwithholding.md)*

## Properties

###  percentage

• **percentage**: *number*

*Defined in [src/entities/TaxWithholding.ts:87](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/TaxWithholding.ts#L87)*

percentage of tax to be withheld (0 to 1)

___

###  securityTokenId

• **securityTokenId**: *string*

*Defined in [src/entities/TaxWithholding.ts:80](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/TaxWithholding.ts#L80)*

___

###  securityTokenSymbol

• **securityTokenSymbol**: *string*

*Defined in [src/entities/TaxWithholding.ts:78](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/TaxWithholding.ts#L78)*

___

###  shareholderAddress

• **shareholderAddress**: *string*

*Defined in [src/entities/TaxWithholding.ts:82](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/TaxWithholding.ts#L82)*

___

###  uid

• **uid**: *string*

*Overrides [Entity](entities.entity.md).[uid](entities.entity.md#abstract-uid)*

*Defined in [src/entities/TaxWithholding.ts:76](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/TaxWithholding.ts#L76)*

unique generated identifer for tax withholding entity

## Methods

###  _refresh

▸ **_refresh**(`params`: Partial‹[Params](../interfaces/entities.params-1.md)›): *void*

*Overrides [Entity](entities.entity.md).[_refresh](entities.entity.md#abstract-_refresh)*

*Defined in [src/entities/TaxWithholding.ts:125](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/TaxWithholding.ts#L125)*

Hydrate the entity

**Parameters:**

Name | Type |
------ | ------ |
`params` | Partial‹[Params](../interfaces/entities.params-1.md)› |

**Returns:** *void*

___

###  toPojo

▸ **toPojo**(): *object*

*Overrides [Entity](entities.entity.md).[toPojo](entities.entity.md#abstract-topojo)*

*Defined in [src/entities/TaxWithholding.ts:110](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/TaxWithholding.ts#L110)*

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** *object*

* **percentage**: *number*

* **securityTokenId**: *string*

* **securityTokenSymbol**: *string*

* **shareholderAddress**: *string*

* **uid**: *string*

___

### `Static` generateId

▸ **generateId**(`__namedParameters`: object): *string*

*Defined in [src/entities/TaxWithholding.ts:48](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/TaxWithholding.ts#L48)*

Generate the Tax Withholding's UUID from its identifying properties

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`securityTokenId` | string |
`shareholderAddress` | string |

**Returns:** *string*

___

### `Static` unserialize

▸ **unserialize**(`serialized`: string): *[UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-3.md)*

*Defined in [src/entities/TaxWithholding.ts:60](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/TaxWithholding.ts#L60)*

Unserialize a serialized entity of tax withholding information

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`serialized` | string | string with tax withholding information  |

**Returns:** *[UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-3.md)*
