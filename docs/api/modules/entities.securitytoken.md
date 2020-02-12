# External module: SecurityToken

## Index

### External modules

* [Issuance](entities.securitytoken.issuance.md)
* [Transfers](entities.securitytoken.transfers.md)

### Classes

* [Controller](../classes/entities.securitytoken.controller.md)
* [Dividends](../classes/entities.securitytoken.dividends.md)
* [Documents](../classes/entities.securitytoken.documents.md)
* [Features](../classes/entities.securitytoken.features.md)
* [Permissions](../classes/entities.securitytoken.permissions.md)
* [SecurityToken](../classes/entities.securitytoken.securitytoken.md)
* [Shareholders](../classes/entities.securitytoken.shareholders.md)
* [SubModule](../classes/entities.securitytoken.submodule.md)

### Interfaces

* [Document](../interfaces/entities.securitytoken.document.md)
* [Enable](../interfaces/entities.securitytoken.enable.md)
* [EnableErc20DividendsOpts](../interfaces/entities.securitytoken.enableerc20dividendsopts.md)
* [EnablePercentageOwnershipRestrictionsOpts](../interfaces/entities.securitytoken.enablepercentageownershiprestrictionsopts.md)
* [EnableShareholderCountRestrictionsOpts](../interfaces/entities.securitytoken.enableshareholdercountrestrictionsopts.md)
* [FeatureStatuses](../interfaces/entities.securitytoken.featurestatuses.md)
* [GetCheckpointParams](../interfaces/entities.securitytoken.getcheckpointparams.md)
* [GetDistributionParams](../interfaces/entities.securitytoken.getdistributionparams.md)
* [Params](../interfaces/entities.securitytoken.params.md)
* [UniqueIdentifiers](../interfaces/entities.securitytoken.uniqueidentifiers.md)

### Type aliases

* [EnableOpts](entities.securitytoken.md#enableopts)

### Functions

* [isUniqueIdentifiers](entities.securitytoken.md#isuniqueidentifiers)
* [unserialize](entities.securitytoken.md#const-unserialize)

## Type aliases

###  EnableOpts

Ƭ **EnableOpts**: *[EnableErc20DividendsOpts](../interfaces/entities.securitytoken.enableerc20dividendsopts.md) | [EnableShareholderCountRestrictionsOpts](../interfaces/entities.securitytoken.enableshareholdercountrestrictionsopts.md) | [EnablePercentageOwnershipRestrictionsOpts](../interfaces/entities.securitytoken.enablepercentageownershiprestrictionsopts.md)*

*Defined in [src/entities/SecurityToken/Features.ts:40](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/Features.ts#L40)*

## Functions

###  isUniqueIdentifiers

▸ **isUniqueIdentifiers**(`identifiers`: any): *identifiers is UniqueIdentifiers*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:35](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/SecurityToken.ts#L35)*

Check if the provided value is of type [UniqueIdentifiers](../interfaces/entities.securitytoken.uniqueidentifiers.md)

**Parameters:**

Name | Type |
------ | ------ |
`identifiers` | any |

**Returns:** *identifiers is UniqueIdentifiers*

___

### `Const` unserialize

▸ **unserialize**(`serialized`: string): *[UniqueIdentifiers](../interfaces/entities.securitytoken.uniqueidentifiers.md)*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:77](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/SecurityToken.ts#L77)*

Unserialize string to a Security Token object representation

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`serialized` | string | Security Token's serialized representation  |

**Returns:** *[UniqueIdentifiers](../interfaces/entities.securitytoken.uniqueidentifiers.md)*
