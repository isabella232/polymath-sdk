[@polymathnetwork/sdk - v2.0.1-beta.120](../README.md) › [Globals](../globals.md) › ["entities/SecurityToken/Dividends"](../modules/_entities_securitytoken_dividends_.md) › [Dividends](_entities_securitytoken_dividends_.dividends.md)

# Class: Dividends

Namespace that handles all Dividend related functionality

## Hierarchy

- [SubModule](_entities_securitytoken_submodule_.submodule.md)

  ↳ **Dividends**

## Index

### Constructors

- [constructor](_entities_securitytoken_dividends_.dividends.md#constructor)

### Properties

- [context](_entities_securitytoken_dividends_.dividends.md#protected-context)
- [securityToken](_entities_securitytoken_dividends_.dividends.md#protected-securitytoken)

### Methods

- [createErc20Distribution](_entities_securitytoken_dividends_.dividends.md#createerc20distribution)
- [createPolyDistribution](_entities_securitytoken_dividends_.dividends.md#createpolydistribution)
- [getDefaultExclusionList](_entities_securitytoken_dividends_.dividends.md#getdefaultexclusionlist)
- [getDistribution](_entities_securitytoken_dividends_.dividends.md#getdistribution)
- [getDistributions](_entities_securitytoken_dividends_.dividends.md#getdistributions)
- [getTaxWithholdingList](_entities_securitytoken_dividends_.dividends.md#gettaxwithholdinglist)
- [modifyDefaultExclusionList](_entities_securitytoken_dividends_.dividends.md#modifydefaultexclusionlist)
- [modifyStorageWallet](_entities_securitytoken_dividends_.dividends.md#modifystoragewallet)
- [modifyTaxWithholdingList](_entities_securitytoken_dividends_.dividends.md#modifytaxwithholdinglist)

## Constructors

### constructor

\+ **new Dividends**(`securityToken`: [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md), `context`: [Context](_context_.context.md)): _[Dividends](_entities_securitytoken_dividends_.dividends.md)_

_Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[constructor](_entities_securitytoken_submodule_.submodule.md#constructor)_

_Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SubModule.ts#L10)_

Create a new SubModule instance

**Parameters:**

| Name            | Type                                                                     |
| --------------- | ------------------------------------------------------------------------ |
| `securityToken` | [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md) |
| `context`       | [Context](_context_.context.md)                                          |

**Returns:** _[Dividends](_entities_securitytoken_dividends_.dividends.md)_

## Properties

### `Protected` context

• **context**: _[Context](_context_.context.md)_

_Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[context](_entities_securitytoken_submodule_.submodule.md#protected-context)_

_Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SubModule.ts#L10)_

---

### `Protected` securityToken

• **securityToken**: _[SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)_

_Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[securityToken](_entities_securitytoken_submodule_.submodule.md#protected-securitytoken)_

_Defined in [src/entities/SecurityToken/SubModule.ts:8](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SubModule.ts#L8)_

## Methods

### createErc20Distribution

▸ **createErc20Distribution**(`args`: object): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[CreateDividendDistributionProcedureArgs](../interfaces/_types_index_.createdividenddistributionprocedureargs.md), [DividendDistribution](_entities_dividenddistribution_.dividenddistribution.md)››_

_Defined in [src/entities/SecurityToken/Dividends.ts:79](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/Dividends.ts#L79)_

Distribute dividends in a specified ERC20 token

**Parameters:**

▪ **args**: _object_

| Name                 | Type                                                                        |
| -------------------- | --------------------------------------------------------------------------- |
| `amount`             | BigNumber                                                                   |
| `checkpointId`       | string                                                                      |
| `erc20Address`       | string                                                                      |
| `excludedAddresses?` | string[]                                                                    |
| `expiryDate`         | Date                                                                        |
| `maturityDate`       | Date                                                                        |
| `name`               | string                                                                      |
| `taxWithholdings?`   | [TaxWithholdingEntry](../interfaces/_types_index_.taxwithholdingentry.md)[] |

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[CreateDividendDistributionProcedureArgs](../interfaces/_types_index_.createdividenddistributionprocedureargs.md), [DividendDistribution](_entities_dividenddistribution_.dividenddistribution.md)››_

---

### createPolyDistribution

▸ **createPolyDistribution**(`args`: object): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[CreateDividendDistributionProcedureArgs](../interfaces/_types_index_.createdividenddistributionprocedureargs.md), [DividendDistribution](_entities_dividenddistribution_.dividenddistribution.md)››_

_Defined in [src/entities/SecurityToken/Dividends.ts:40](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/Dividends.ts#L40)_

Distribute dividends in POLY

**Parameters:**

▪ **args**: _object_

| Name                 | Type                                                                        |
| -------------------- | --------------------------------------------------------------------------- |
| `amount`             | BigNumber                                                                   |
| `checkpointId`       | string                                                                      |
| `excludedAddresses?` | string[]                                                                    |
| `expiryDate`         | Date                                                                        |
| `maturityDate`       | Date                                                                        |
| `name`               | string                                                                      |
| `taxWithholdings?`   | [TaxWithholdingEntry](../interfaces/_types_index_.taxwithholdingentry.md)[] |

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[CreateDividendDistributionProcedureArgs](../interfaces/_types_index_.createdividenddistributionprocedureargs.md), [DividendDistribution](_entities_dividenddistribution_.dividenddistribution.md)››_

---

### getDefaultExclusionList

▸ **getDefaultExclusionList**(): _Promise‹string[]›_

_Defined in [src/entities/SecurityToken/Dividends.ts:278](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/Dividends.ts#L278)_

Retrieve the list of addresses which are excluded from receiving dividend payments by default

**Returns:** _Promise‹string[]›_

---

### getDistribution

▸ **getDistribution**(`args`: [GetDistributionParams](../interfaces/_entities_securitytoken_dividends_.getdistributionparams.md) | string): _Promise‹[DividendDistribution](_entities_dividenddistribution_.dividenddistribution.md)›_

_Defined in [src/entities/SecurityToken/Dividends.ts:254](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/Dividends.ts#L254)_

Retrieve a particular dividend distribution by type and index or UUID

**Parameters:**

| Name   | Type                                                                                                             | Description                                  |
| ------ | ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `args` | [GetDistributionParams](../interfaces/_entities_securitytoken_dividends_.getdistributionparams.md) &#124; string | dividend uuid or object containing its index |

**Returns:** _Promise‹[DividendDistribution](_entities_dividenddistribution_.dividenddistribution.md)›_

---

### getDistributions

▸ **getDistributions**(`args`: object): _Promise‹[DividendDistribution](_entities_dividenddistribution_.dividenddistribution.md)[]›_

_Defined in [src/entities/SecurityToken/Dividends.ts:222](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/Dividends.ts#L222)_

Retrieve all dividend distributions at a certain checkpoint

**Parameters:**

▪ **args**: _object_

| Name           | Type   |
| -------------- | ------ |
| `checkpointId` | string |

**Returns:** _Promise‹[DividendDistribution](_entities_dividenddistribution_.dividenddistribution.md)[]›_

---

### getTaxWithholdingList

▸ **getTaxWithholdingList**(): _Promise‹[TaxWithholding](_entities_taxwithholding_.taxwithholding.md)[]›_

_Defined in [src/entities/SecurityToken/Dividends.ts:169](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/Dividends.ts#L169)_

Retrieve a list of investor addresses and their corresponding tax withholding percentages

**Returns:** _Promise‹[TaxWithholding](_entities_taxwithholding_.taxwithholding.md)[]›_

---

### modifyDefaultExclusionList

▸ **modifyDefaultExclusionList**(`args`: object): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ModifyDividendsDefaultExclusionListProcedureArgs](../interfaces/_types_index_.modifydividendsdefaultexclusionlistprocedureargs.md), void››_

_Defined in [src/entities/SecurityToken/Dividends.ts:152](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/Dividends.ts#L152)_

Set default exclusion list for a type of dividends. Addresses on this list won't be considered for dividend distribution. This operation overrides the previous default exclusion list

**Parameters:**

▪ **args**: _object_

| Name                   | Type     |
| ---------------------- | -------- |
| `shareholderAddresses` | string[] |

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ModifyDividendsDefaultExclusionListProcedureArgs](../interfaces/_types_index_.modifydividendsdefaultexclusionlistprocedureargs.md), void››_

---

### modifyStorageWallet

▸ **modifyStorageWallet**(`args`: object): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[SetDividendsWalletProcedureArgs](../interfaces/_types_index_.setdividendswalletprocedureargs.md), void››_

_Defined in [src/entities/SecurityToken/Dividends.ts:135](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/Dividends.ts#L135)_

Change dividends storage wallet address

**Parameters:**

▪ **args**: _object_

| Name      | Type   |
| --------- | ------ |
| `address` | string |

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[SetDividendsWalletProcedureArgs](../interfaces/_types_index_.setdividendswalletprocedureargs.md), void››_

---

### modifyTaxWithholdingList

▸ **modifyTaxWithholdingList**(`args`: object): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[UpdateDividendsTaxWithholdingListProcedureArgs](../interfaces/_types_index_.updatedividendstaxwithholdinglistprocedureargs.md), void››_

_Defined in [src/entities/SecurityToken/Dividends.ts:109](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/Dividends.ts#L109)_

Set default tax withtholding list for a type of dividends

**Parameters:**

▪ **args**: _object_

| Name              | Type                                                                        |
| ----------------- | --------------------------------------------------------------------------- |
| `taxWithholdings` | [TaxWithholdingEntry](../interfaces/_types_index_.taxwithholdingentry.md)[] |

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[UpdateDividendsTaxWithholdingListProcedureArgs](../interfaces/_types_index_.updatedividendstaxwithholdinglistprocedureargs.md), void››_
