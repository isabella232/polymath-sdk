# Class: Dividends

Namespace that handles all Dividend related functionality

## Hierarchy

* [SubModule](_entities_securitytoken_submodule_.submodule.md)

  ↳ **Dividends**

## Index

### Constructors

* [constructor](_entities_securitytoken_dividends_.dividends.md#constructor)

### Properties

* [context](_entities_securitytoken_dividends_.dividends.md#protected-context)
* [securityToken](_entities_securitytoken_dividends_.dividends.md#protected-securitytoken)

### Methods

* [createErc20Distribution](_entities_securitytoken_dividends_.dividends.md#createerc20distribution)
* [createPolyDistribution](_entities_securitytoken_dividends_.dividends.md#createpolydistribution)
* [getDefaultExclusionList](_entities_securitytoken_dividends_.dividends.md#getdefaultexclusionlist)
* [getDistribution](_entities_securitytoken_dividends_.dividends.md#getdistribution)
* [getDistributions](_entities_securitytoken_dividends_.dividends.md#getdistributions)
* [getTaxWithholdingList](_entities_securitytoken_dividends_.dividends.md#gettaxwithholdinglist)
* [modifyDefaultExclusionList](_entities_securitytoken_dividends_.dividends.md#modifydefaultexclusionlist)
* [modifyStorageWallet](_entities_securitytoken_dividends_.dividends.md#modifystoragewallet)
* [modifyTaxWithholdingList](_entities_securitytoken_dividends_.dividends.md#modifytaxwithholdinglist)

## Constructors

###  constructor

\+ **new Dividends**(`securityToken`: [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md), `context`: [Context](_context_.context.md)): *[Dividends](_entities_securitytoken_dividends_.dividends.md)*

*Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[constructor](_entities_securitytoken_submodule_.submodule.md#constructor)*

*Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/SecurityToken/SubModule.ts#L10)*

Create a new SubModule instance

**Parameters:**

Name | Type |
------ | ------ |
`securityToken` | [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[Dividends](_entities_securitytoken_dividends_.dividends.md)*

## Properties

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[context](_entities_securitytoken_submodule_.submodule.md#protected-context)*

*Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/SecurityToken/SubModule.ts#L10)*

___

### `Protected` securityToken

• **securityToken**: *[SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)*

*Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[securityToken](_entities_securitytoken_submodule_.submodule.md#protected-securitytoken)*

*Defined in [src/entities/SecurityToken/SubModule.ts:8](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/SecurityToken/SubModule.ts#L8)*

## Methods

###  createErc20Distribution

▸ **createErc20Distribution**(`args`: object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[CreateDividendDistributionProcedureArgs](../interfaces/_types_index_.createdividenddistributionprocedureargs.md), [DividendDistribution](_entities_dividenddistribution_.dividenddistribution.md)››*

*Defined in [src/entities/SecurityToken/Dividends.ts:79](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/SecurityToken/Dividends.ts#L79)*

Distribute dividends in a specified ERC20 token

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`amount` | BigNumber |
`checkpointId` | string |
`erc20Address` | string |
`excludedAddresses?` | string[] |
`expiryDate` | Date |
`maturityDate` | Date |
`name` | string |
`taxWithholdings?` | [TaxWithholdingEntry](../interfaces/_types_index_.taxwithholdingentry.md)[] |

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[CreateDividendDistributionProcedureArgs](../interfaces/_types_index_.createdividenddistributionprocedureargs.md), [DividendDistribution](_entities_dividenddistribution_.dividenddistribution.md)››*

___

###  createPolyDistribution

▸ **createPolyDistribution**(`args`: object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[CreateDividendDistributionProcedureArgs](../interfaces/_types_index_.createdividenddistributionprocedureargs.md), [DividendDistribution](_entities_dividenddistribution_.dividenddistribution.md)››*

*Defined in [src/entities/SecurityToken/Dividends.ts:40](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/SecurityToken/Dividends.ts#L40)*

Distribute dividends in POLY

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`amount` | BigNumber |
`checkpointId` | string |
`excludedAddresses?` | string[] |
`expiryDate` | Date |
`maturityDate` | Date |
`name` | string |
`taxWithholdings?` | [TaxWithholdingEntry](../interfaces/_types_index_.taxwithholdingentry.md)[] |

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[CreateDividendDistributionProcedureArgs](../interfaces/_types_index_.createdividenddistributionprocedureargs.md), [DividendDistribution](_entities_dividenddistribution_.dividenddistribution.md)››*

___

###  getDefaultExclusionList

▸ **getDefaultExclusionList**(): *Promise‹string[]›*

*Defined in [src/entities/SecurityToken/Dividends.ts:278](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/SecurityToken/Dividends.ts#L278)*

Retrieve the list of addresses which are excluded from receiving dividend payments by default

**Returns:** *Promise‹string[]›*

___

###  getDistribution

▸ **getDistribution**(`args`: [GetDistributionParams](../interfaces/_entities_securitytoken_dividends_.getdistributionparams.md) | string): *Promise‹[DividendDistribution](_entities_dividenddistribution_.dividenddistribution.md)›*

*Defined in [src/entities/SecurityToken/Dividends.ts:254](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/SecurityToken/Dividends.ts#L254)*

Retrieve a particular dividend distribution by type and index or UUID

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`args` | [GetDistributionParams](../interfaces/_entities_securitytoken_dividends_.getdistributionparams.md) &#124; string | dividend uuid or object containing its index  |

**Returns:** *Promise‹[DividendDistribution](_entities_dividenddistribution_.dividenddistribution.md)›*

___

###  getDistributions

▸ **getDistributions**(`args`: object): *Promise‹[DividendDistribution](_entities_dividenddistribution_.dividenddistribution.md)[]›*

*Defined in [src/entities/SecurityToken/Dividends.ts:222](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/SecurityToken/Dividends.ts#L222)*

Retrieve all dividend distributions at a certain checkpoint

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`checkpointId` | string |

**Returns:** *Promise‹[DividendDistribution](_entities_dividenddistribution_.dividenddistribution.md)[]›*

___

###  getTaxWithholdingList

▸ **getTaxWithholdingList**(): *Promise‹[TaxWithholding](_entities_taxwithholding_.taxwithholding.md)[]›*

*Defined in [src/entities/SecurityToken/Dividends.ts:169](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/SecurityToken/Dividends.ts#L169)*

Retrieve a list of investor addresses and their corresponding tax withholding percentages

**Returns:** *Promise‹[TaxWithholding](_entities_taxwithholding_.taxwithholding.md)[]›*

___

###  modifyDefaultExclusionList

▸ **modifyDefaultExclusionList**(`args`: object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ModifyDividendsDefaultExclusionListProcedureArgs](../interfaces/_types_index_.modifydividendsdefaultexclusionlistprocedureargs.md), void››*

*Defined in [src/entities/SecurityToken/Dividends.ts:152](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/SecurityToken/Dividends.ts#L152)*

Set default exclusion list for a type of dividends. Addresses on this list won't be considered for dividend distribution. This operation overrides the previous default exclusion list

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`shareholderAddresses` | string[] |

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ModifyDividendsDefaultExclusionListProcedureArgs](../interfaces/_types_index_.modifydividendsdefaultexclusionlistprocedureargs.md), void››*

___

###  modifyStorageWallet

▸ **modifyStorageWallet**(`args`: object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[SetDividendsWalletProcedureArgs](../interfaces/_types_index_.setdividendswalletprocedureargs.md), void››*

*Defined in [src/entities/SecurityToken/Dividends.ts:135](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/SecurityToken/Dividends.ts#L135)*

Change dividends storage wallet address

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`address` | string |

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[SetDividendsWalletProcedureArgs](../interfaces/_types_index_.setdividendswalletprocedureargs.md), void››*

___

###  modifyTaxWithholdingList

▸ **modifyTaxWithholdingList**(`args`: object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[UpdateDividendsTaxWithholdingListProcedureArgs](../interfaces/_types_index_.updatedividendstaxwithholdinglistprocedureargs.md), void››*

*Defined in [src/entities/SecurityToken/Dividends.ts:109](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/SecurityToken/Dividends.ts#L109)*

Set default tax withtholding list for a type of dividends

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`taxWithholdings` | [TaxWithholdingEntry](../interfaces/_types_index_.taxwithholdingentry.md)[] |

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[UpdateDividendsTaxWithholdingListProcedureArgs](../interfaces/_types_index_.updatedividendstaxwithholdinglistprocedureargs.md), void››*
