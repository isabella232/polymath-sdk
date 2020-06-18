# Dividends

Namespace that handles all Dividend related functionality

## Hierarchy

* [SubModule]()

  ↳ **Dividends**

## Index

### Constructors

* [constructor]()

### Properties

* [context]()
* [securityToken]()

### Methods

* [createErc20Distribution]()
* [createPolyDistribution]()
* [getDefaultExclusionList]()
* [getDistribution]()
* [getDistributions]()
* [getTaxWithholdingList]()
* [modifyDefaultExclusionList]()
* [modifyStorageWallet]()
* [modifyTaxWithholdingList]()

## Constructors

### constructor

+ **new Dividends**\(`securityToken`: [SecurityToken](), `context`: [Context]()\): [_Dividends_]()

_Inherited from_ [_SubModule_]()_._[_constructor_]()

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:10_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SubModule.ts#L10)

Create a new SubModule instance

**Parameters:**

| Name | Type |
| :--- | :--- |
| `securityToken` | [SecurityToken]() |
| `context` | [Context]() |

**Returns:** [_Dividends_]()

## Properties

### `Protected` context

• **context**: [_Context_]()

_Inherited from_ [_SubModule_]()_._[_context_]()

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:10_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SubModule.ts#L10)

### `Protected` securityToken

• **securityToken**: [_SecurityToken_]()

_Inherited from_ [_SubModule_]()_._[_securityToken_]()

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:8_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SubModule.ts#L8)

## Methods

### createErc20Distribution

▸ **createErc20Distribution**\(`args`: object\): _Promise‹_[_TransactionQueue_]()_‹_[_CreateDividendDistributionProcedureArgs_]()_,_ [_DividendDistribution_]()_››_

_Defined in_ [_src/entities/SecurityToken/Dividends.ts:79_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Dividends.ts#L79)

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
| `taxWithholdings?` | [TaxWithholdingEntry]()\[\] |

**Returns:** _Promise‹_[_TransactionQueue_]()_‹_[_CreateDividendDistributionProcedureArgs_]()_,_ [_DividendDistribution_]()_››_

### createPolyDistribution

▸ **createPolyDistribution**\(`args`: object\): _Promise‹_[_TransactionQueue_]()_‹_[_CreateDividendDistributionProcedureArgs_]()_,_ [_DividendDistribution_]()_››_

_Defined in_ [_src/entities/SecurityToken/Dividends.ts:40_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Dividends.ts#L40)

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
| `taxWithholdings?` | [TaxWithholdingEntry]()\[\] |

**Returns:** _Promise‹_[_TransactionQueue_]()_‹_[_CreateDividendDistributionProcedureArgs_]()_,_ [_DividendDistribution_]()_››_

### getDefaultExclusionList

▸ **getDefaultExclusionList**\(\): _Promise‹string\[\]›_

_Defined in_ [_src/entities/SecurityToken/Dividends.ts:278_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Dividends.ts#L278)

Retrieve the list of addresses which are excluded from receiving dividend payments by default

**Returns:** _Promise‹string\[\]›_

### getDistribution

▸ **getDistribution**\(`args`: [GetDistributionParams]() \| string\): _Promise‹_[_DividendDistribution_]()_›_

_Defined in_ [_src/entities/SecurityToken/Dividends.ts:254_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Dividends.ts#L254)

Retrieve a particular dividend distribution by type and index or UUID

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `args` | [GetDistributionParams]() \| string | dividend uuid or object containing its index |

**Returns:** _Promise‹_[_DividendDistribution_]()_›_

### getDistributions

▸ **getDistributions**\(`args`: object\): _Promise‹_[_DividendDistribution_]()_\[\]›_

_Defined in_ [_src/entities/SecurityToken/Dividends.ts:222_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Dividends.ts#L222)

Retrieve all dividend distributions at a certain checkpoint

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `checkpointId` | string |

**Returns:** _Promise‹_[_DividendDistribution_]()_\[\]›_

### getTaxWithholdingList

▸ **getTaxWithholdingList**\(\): _Promise‹_[_TaxWithholding_]()_\[\]›_

_Defined in_ [_src/entities/SecurityToken/Dividends.ts:169_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Dividends.ts#L169)

Retrieve a list of investor addresses and their corresponding tax withholding percentages

**Returns:** _Promise‹_[_TaxWithholding_]()_\[\]›_

### modifyDefaultExclusionList

▸ **modifyDefaultExclusionList**\(`args`: object\): _Promise‹_[_TransactionQueue_]()_‹_[_ModifyDividendsDefaultExclusionListProcedureArgs_]()_, void››_

_Defined in_ [_src/entities/SecurityToken/Dividends.ts:152_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Dividends.ts#L152)

Set default exclusion list for a type of dividends. Addresses on this list won't be considered for dividend distribution. This operation overrides the previous default exclusion list

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `tokenholderAddresses` | string\[\] |

**Returns:** _Promise‹_[_TransactionQueue_]()_‹_[_ModifyDividendsDefaultExclusionListProcedureArgs_]()_, void››_

### modifyStorageWallet

▸ **modifyStorageWallet**\(`args`: object\): _Promise‹_[_TransactionQueue_]()_‹_[_SetDividendsWalletProcedureArgs_]()_, void››_

_Defined in_ [_src/entities/SecurityToken/Dividends.ts:135_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Dividends.ts#L135)

Change dividends storage wallet address

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `address` | string |

**Returns:** _Promise‹_[_TransactionQueue_]()_‹_[_SetDividendsWalletProcedureArgs_]()_, void››_

### modifyTaxWithholdingList

▸ **modifyTaxWithholdingList**\(`args`: object\): _Promise‹_[_TransactionQueue_]()_‹_[_UpdateDividendsTaxWithholdingListProcedureArgs_]()_, void››_

_Defined in_ [_src/entities/SecurityToken/Dividends.ts:109_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Dividends.ts#L109)

Set default tax withtholding list for a type of dividends

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `taxWithholdings` | [TaxWithholdingEntry]()\[\] |

**Returns:** _Promise‹_[_TransactionQueue_]()_‹_[_UpdateDividendsTaxWithholdingListProcedureArgs_]()_, void››_

