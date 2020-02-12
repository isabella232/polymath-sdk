# Class: Dividends

Namespace that handles all Dividend related functionality

## Hierarchy

* [SubModule](entities.securitytoken.submodule.md)

  ↳ **Dividends**

## Index

### Constructors

* [constructor](entities.securitytoken.dividends.md#constructor)

### Properties

* [context](entities.securitytoken.dividends.md#protected-context)
* [securityToken](entities.securitytoken.dividends.md#protected-securitytoken)

### Methods

* [createErc20Distribution](entities.securitytoken.dividends.md#createerc20distribution)
* [createPolyDistribution](entities.securitytoken.dividends.md#createpolydistribution)
* [getDefaultExclusionList](entities.securitytoken.dividends.md#getdefaultexclusionlist)
* [getDistribution](entities.securitytoken.dividends.md#getdistribution)
* [getDistributions](entities.securitytoken.dividends.md#getdistributions)
* [getTaxWithholdingList](entities.securitytoken.dividends.md#gettaxwithholdinglist)
* [modifyDefaultExclusionList](entities.securitytoken.dividends.md#modifydefaultexclusionlist)
* [modifyStorageWallet](entities.securitytoken.dividends.md#modifystoragewallet)
* [modifyTaxWithholdingList](entities.securitytoken.dividends.md#modifytaxwithholdinglist)

## Constructors

###  constructor

\+ **new Dividends**(`securityToken`: [SecurityToken](entities.securitytoken.securitytoken.md), `context`: [Context](_context_.context.md)): *[Dividends](entities.securitytoken.dividends.md)*

*Inherited from [SubModule](entities.securitytoken.submodule.md).[constructor](entities.securitytoken.submodule.md#constructor)*

*Defined in [src/entities/SecurityToken/SubModule.ts:15](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SecurityToken/SubModule.ts#L15)*

Create a new SubModule instance

**Parameters:**

Name | Type |
------ | ------ |
`securityToken` | [SecurityToken](entities.securitytoken.securitytoken.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[Dividends](entities.securitytoken.dividends.md)*

## Properties

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from [SubModule](entities.securitytoken.submodule.md).[context](entities.securitytoken.submodule.md#protected-context)*

*Defined in [src/entities/SecurityToken/SubModule.ts:15](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SecurityToken/SubModule.ts#L15)*

___

### `Protected` securityToken

• **securityToken**: *[SecurityToken](entities.securitytoken.securitytoken.md)*

*Inherited from [SubModule](entities.securitytoken.submodule.md).[securityToken](entities.securitytoken.submodule.md#protected-securitytoken)*

*Defined in [src/entities/SecurityToken/SubModule.ts:13](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SecurityToken/SubModule.ts#L13)*

## Methods

###  createErc20Distribution

▸ **createErc20Distribution**(`args`: object): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹CreateDividendDistributionProcedureArgs, [DividendDistribution](entities.dividenddistribution.md)››*

*Defined in [src/entities/SecurityToken/Dividends.ts:84](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SecurityToken/Dividends.ts#L84)*

Distribute dividends in a specified ERC20 token

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹CreateDividendDistributionProcedureArgs, [DividendDistribution](entities.dividenddistribution.md)››*

___

###  createPolyDistribution

▸ **createPolyDistribution**(`args`: object): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹CreateDividendDistributionProcedureArgs, [DividendDistribution](entities.dividenddistribution.md)››*

*Defined in [src/entities/SecurityToken/Dividends.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SecurityToken/Dividends.ts#L45)*

Distribute dividends in POLY

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹CreateDividendDistributionProcedureArgs, [DividendDistribution](entities.dividenddistribution.md)››*

___

###  getDefaultExclusionList

▸ **getDefaultExclusionList**(): *Promise‹string[]›*

*Defined in [src/entities/SecurityToken/Dividends.ts:283](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SecurityToken/Dividends.ts#L283)*

Retrieve the list of addresses which are excluded from receiving dividend payments by default

**Returns:** *Promise‹string[]›*

___

###  getDistribution

▸ **getDistribution**(`args`: [GetDistributionParams](../interfaces/entities.securitytoken.getdistributionparams.md) | string): *Promise‹[DividendDistribution](entities.dividenddistribution.md)›*

*Defined in [src/entities/SecurityToken/Dividends.ts:259](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SecurityToken/Dividends.ts#L259)*

Retrieve a particular dividend distribution by type and index or UUID

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`args` | [GetDistributionParams](../interfaces/entities.securitytoken.getdistributionparams.md) &#124; string | dividend uuid or object containing its index  |

**Returns:** *Promise‹[DividendDistribution](entities.dividenddistribution.md)›*

___

###  getDistributions

▸ **getDistributions**(`args`: object): *Promise‹[DividendDistribution](entities.dividenddistribution.md)[]›*

*Defined in [src/entities/SecurityToken/Dividends.ts:227](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SecurityToken/Dividends.ts#L227)*

Retrieve all dividend distributions at a certain checkpoint

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *Promise‹[DividendDistribution](entities.dividenddistribution.md)[]›*

___

###  getTaxWithholdingList

▸ **getTaxWithholdingList**(): *Promise‹[TaxWithholding](entities.taxwithholding.md)[]›*

*Defined in [src/entities/SecurityToken/Dividends.ts:174](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SecurityToken/Dividends.ts#L174)*

Retrieve a list of investor addresses and their corresponding tax withholding percentages

**Returns:** *Promise‹[TaxWithholding](entities.taxwithholding.md)[]›*

___

###  modifyDefaultExclusionList

▸ **modifyDefaultExclusionList**(`args`: object): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹ModifyDividendsDefaultExclusionListProcedureArgs, void››*

*Defined in [src/entities/SecurityToken/Dividends.ts:157](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SecurityToken/Dividends.ts#L157)*

Set default exclusion list for a type of dividends. Addresses on this list won't be considered for dividend distribution. This operation overrides the previous default exclusion list

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹ModifyDividendsDefaultExclusionListProcedureArgs, void››*

___

###  modifyStorageWallet

▸ **modifyStorageWallet**(`args`: object): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹SetDividendsWalletProcedureArgs, void››*

*Defined in [src/entities/SecurityToken/Dividends.ts:140](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SecurityToken/Dividends.ts#L140)*

Change dividends storage wallet address

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹SetDividendsWalletProcedureArgs, void››*

___

###  modifyTaxWithholdingList

▸ **modifyTaxWithholdingList**(`args`: object): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹UpdateDividendsTaxWithholdingListProcedureArgs, void››*

*Defined in [src/entities/SecurityToken/Dividends.ts:114](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SecurityToken/Dividends.ts#L114)*

Set default tax withtholding list for a type of dividends

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹UpdateDividendsTaxWithholdingListProcedureArgs, void››*
