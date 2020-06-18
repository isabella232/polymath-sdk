# Dividends

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

### constructor

+ **new Dividends**\(`securityToken`: [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md), `context`: [Context](_context_.context.md)\): [_Dividends_](_entities_securitytoken_dividends_.dividends.md)

_Inherited from_ [_SubModule_](_entities_securitytoken_submodule_.submodule.md)_._[_constructor_](_entities_securitytoken_submodule_.submodule.md#constructor)

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:10_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SubModule.ts#L10)

Create a new SubModule instance

**Parameters:**

| Name | Type |
| :--- | :--- |
| `securityToken` | [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md) |
| `context` | [Context](_context_.context.md) |

**Returns:** [_Dividends_](_entities_securitytoken_dividends_.dividends.md)

## Properties

### `Protected` context

• **context**: [_Context_](_context_.context.md)

_Inherited from_ [_SubModule_](_entities_securitytoken_submodule_.submodule.md)_._[_context_](_entities_securitytoken_submodule_.submodule.md#protected-context)

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:10_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SubModule.ts#L10)

### `Protected` securityToken

• **securityToken**: [_SecurityToken_](_entities_securitytoken_securitytoken_.securitytoken.md)

_Inherited from_ [_SubModule_](_entities_securitytoken_submodule_.submodule.md)_._[_securityToken_](_entities_securitytoken_submodule_.submodule.md#protected-securitytoken)

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:8_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SubModule.ts#L8)

## Methods

### createErc20Distribution

▸ **createErc20Distribution**\(`args`: object\): _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_CreateDividendDistributionProcedureArgs_](../interfaces/_types_index_.createdividenddistributionprocedureargs.md)_,_ [_DividendDistribution_](_entities_dividenddistribution_.dividenddistribution.md)_››_

_Defined in_ [_src/entities/SecurityToken/Dividends.ts:79_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Dividends.ts#L79)

Distribute dividends in a specified ERC20 token

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `amount` | BigNumber |
| `checkpointId` | string |
| `erc20Address` | string |
| `excludedAddresses?` | string\[\] |
| `expiryDate` | Date |
| `maturityDate` | Date |
| `name` | string |
| `taxWithholdings?` | [TaxWithholdingEntry](../interfaces/_types_index_.taxwithholdingentry.md)\[\] |

**Returns:** _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_CreateDividendDistributionProcedureArgs_](../interfaces/_types_index_.createdividenddistributionprocedureargs.md)_,_ [_DividendDistribution_](_entities_dividenddistribution_.dividenddistribution.md)_››_

### createPolyDistribution

▸ **createPolyDistribution**\(`args`: object\): _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_CreateDividendDistributionProcedureArgs_](../interfaces/_types_index_.createdividenddistributionprocedureargs.md)_,_ [_DividendDistribution_](_entities_dividenddistribution_.dividenddistribution.md)_››_

_Defined in_ [_src/entities/SecurityToken/Dividends.ts:40_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Dividends.ts#L40)

Distribute dividends in POLY

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `amount` | BigNumber |
| `checkpointId` | string |
| `excludedAddresses?` | string\[\] |
| `expiryDate` | Date |
| `maturityDate` | Date |
| `name` | string |
| `taxWithholdings?` | [TaxWithholdingEntry](../interfaces/_types_index_.taxwithholdingentry.md)\[\] |

**Returns:** _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_CreateDividendDistributionProcedureArgs_](../interfaces/_types_index_.createdividenddistributionprocedureargs.md)_,_ [_DividendDistribution_](_entities_dividenddistribution_.dividenddistribution.md)_››_

### getDefaultExclusionList

▸ **getDefaultExclusionList**\(\): _Promise‹string\[\]›_

_Defined in_ [_src/entities/SecurityToken/Dividends.ts:278_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Dividends.ts#L278)

Retrieve the list of addresses which are excluded from receiving dividend payments by default

**Returns:** _Promise‹string\[\]›_

### getDistribution

▸ **getDistribution**\(`args`: [GetDistributionParams](../interfaces/_entities_securitytoken_dividends_.getdistributionparams.md) \| string\): _Promise‹_[_DividendDistribution_](_entities_dividenddistribution_.dividenddistribution.md)_›_

_Defined in_ [_src/entities/SecurityToken/Dividends.ts:254_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Dividends.ts#L254)

Retrieve a particular dividend distribution by type and index or UUID

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `args` | [GetDistributionParams](../interfaces/_entities_securitytoken_dividends_.getdistributionparams.md) \| string | dividend uuid or object containing its index |

**Returns:** _Promise‹_[_DividendDistribution_](_entities_dividenddistribution_.dividenddistribution.md)_›_

### getDistributions

▸ **getDistributions**\(`args`: object\): _Promise‹_[_DividendDistribution_](_entities_dividenddistribution_.dividenddistribution.md)_\[\]›_

_Defined in_ [_src/entities/SecurityToken/Dividends.ts:222_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Dividends.ts#L222)

Retrieve all dividend distributions at a certain checkpoint

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `checkpointId` | string |

**Returns:** _Promise‹_[_DividendDistribution_](_entities_dividenddistribution_.dividenddistribution.md)_\[\]›_

### getTaxWithholdingList

▸ **getTaxWithholdingList**\(\): _Promise‹_[_TaxWithholding_](_entities_taxwithholding_.taxwithholding.md)_\[\]›_

_Defined in_ [_src/entities/SecurityToken/Dividends.ts:169_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Dividends.ts#L169)

Retrieve a list of investor addresses and their corresponding tax withholding percentages

**Returns:** _Promise‹_[_TaxWithholding_](_entities_taxwithholding_.taxwithholding.md)_\[\]›_

### modifyDefaultExclusionList

▸ **modifyDefaultExclusionList**\(`args`: object\): _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_ModifyDividendsDefaultExclusionListProcedureArgs_](../interfaces/_types_index_.modifydividendsdefaultexclusionlistprocedureargs.md)_, void››_

_Defined in_ [_src/entities/SecurityToken/Dividends.ts:152_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Dividends.ts#L152)

Set default exclusion list for a type of dividends. Addresses on this list won't be considered for dividend distribution. This operation overrides the previous default exclusion list

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `tokenholderAddresses` | string\[\] |

**Returns:** _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_ModifyDividendsDefaultExclusionListProcedureArgs_](../interfaces/_types_index_.modifydividendsdefaultexclusionlistprocedureargs.md)_, void››_

### modifyStorageWallet

▸ **modifyStorageWallet**\(`args`: object\): _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_SetDividendsWalletProcedureArgs_](../interfaces/_types_index_.setdividendswalletprocedureargs.md)_, void››_

_Defined in_ [_src/entities/SecurityToken/Dividends.ts:135_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Dividends.ts#L135)

Change dividends storage wallet address

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `address` | string |

**Returns:** _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_SetDividendsWalletProcedureArgs_](../interfaces/_types_index_.setdividendswalletprocedureargs.md)_, void››_

### modifyTaxWithholdingList

▸ **modifyTaxWithholdingList**\(`args`: object\): _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_UpdateDividendsTaxWithholdingListProcedureArgs_](../interfaces/_types_index_.updatedividendstaxwithholdinglistprocedureargs.md)_, void››_

_Defined in_ [_src/entities/SecurityToken/Dividends.ts:109_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Dividends.ts#L109)

Set default tax withtholding list for a type of dividends

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `taxWithholdings` | [TaxWithholdingEntry](../interfaces/_types_index_.taxwithholdingentry.md)\[\] |

**Returns:** _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_UpdateDividendsTaxWithholdingListProcedureArgs_](../interfaces/_types_index_.updatedividendstaxwithholdinglistprocedureargs.md)_, void››_

