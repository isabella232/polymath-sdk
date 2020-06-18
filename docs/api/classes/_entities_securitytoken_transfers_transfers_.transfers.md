# Transfers

Namespace that handles all Transfer related functionality

## Hierarchy

* [SubModule](_entities_securitytoken_submodule_.submodule.md)

  ↳ **Transfers**

## Index

### Constructors

* [constructor](_entities_securitytoken_transfers_transfers_.transfers.md#constructor)

### Properties

* [context](_entities_securitytoken_transfers_transfers_.transfers.md#protected-context)
* [restrictions](_entities_securitytoken_transfers_transfers_.transfers.md#restrictions)
* [securityToken](_entities_securitytoken_transfers_transfers_.transfers.md#protected-securitytoken)

### Methods

* [canTransfer](_entities_securitytoken_transfers_transfers_.transfers.md#cantransfer)
* [freeze](_entities_securitytoken_transfers_transfers_.transfers.md#freeze)
* [frozen](_entities_securitytoken_transfers_transfers_.transfers.md#frozen)
* [getStatusCode](_entities_securitytoken_transfers_transfers_.transfers.md#private-getstatuscode)
* [signKycData](_entities_securitytoken_transfers_transfers_.transfers.md#signkycdata)
* [transfer](_entities_securitytoken_transfers_transfers_.transfers.md#transfer)
* [unfreeze](_entities_securitytoken_transfers_transfers_.transfers.md#unfreeze)

## Constructors

### constructor

+ **new Transfers**\(`securityToken`: [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md), `context`: [Context](_context_.context.md)\): [_Transfers_](_entities_securitytoken_transfers_transfers_.transfers.md)

_Overrides_ [_SubModule_](_entities_securitytoken_submodule_.submodule.md)_._[_constructor_](_entities_securitytoken_submodule_.submodule.md#constructor)

_Defined in_ [_src/entities/SecurityToken/Transfers/Transfers.ts:21_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Transfers/Transfers.ts#L21)

Create a new Transfers instance

**Parameters:**

| Name | Type |
| :--- | :--- |
| `securityToken` | [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md) |
| `context` | [Context](_context_.context.md) |

**Returns:** [_Transfers_](_entities_securitytoken_transfers_transfers_.transfers.md)

## Properties

### `Protected` context

• **context**: [_Context_](_context_.context.md)

_Inherited from_ [_SubModule_](_entities_securitytoken_submodule_.submodule.md)_._[_context_](_entities_securitytoken_submodule_.submodule.md#protected-context)

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:10_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SubModule.ts#L10)

### restrictions

• **restrictions**: [_Restrictions_](_entities_securitytoken_transfers_restrictions_restrictions_.restrictions.md)

_Defined in_ [_src/entities/SecurityToken/Transfers/Transfers.ts:21_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Transfers/Transfers.ts#L21)

### `Protected` securityToken

• **securityToken**: [_SecurityToken_](_entities_securitytoken_securitytoken_.securitytoken.md)

_Inherited from_ [_SubModule_](_entities_securitytoken_submodule_.submodule.md)_._[_securityToken_](_entities_securitytoken_submodule_.submodule.md#protected-securitytoken)

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:8_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SubModule.ts#L8)

## Methods

### canTransfer

▸ **canTransfer**\(`args`: object\): _Promise‹object›_

_Defined in_ [_src/entities/SecurityToken/Transfers/Transfers.ts:130_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Transfers/Transfers.ts#L130)

Validate if a transfer of Security Tokens can be performed. This takes all present transfer restrictions into account

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `data?` | undefined \| string |
| `from?` | undefined \| string |
| `to` | string |
| `value` | BigNumber |

**Returns:** _Promise‹object›_

### freeze

▸ **freeze**\(\): _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_ToggleFreezeTransfersProcedureArgs_](../interfaces/_types_index_.togglefreezetransfersprocedureargs.md)_, void››_

_Defined in_ [_src/entities/SecurityToken/Transfers/Transfers.ts:114_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Transfers/Transfers.ts#L114)

Freeze transfers of the security token

**Returns:** _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_ToggleFreezeTransfersProcedureArgs_](../interfaces/_types_index_.togglefreezetransfersprocedureargs.md)_, void››_

### frozen

▸ **frozen**\(\): _Promise‹boolean›_

_Defined in_ [_src/entities/SecurityToken/Transfers/Transfers.ts:89_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Transfers/Transfers.ts#L89)

Retrieve whether the transfer of tokens is frozen or not Can be modified with `freeze` and `unfreeze`

**Returns:** _Promise‹boolean›_

### `Private` getStatusCode

▸ **getStatusCode**\(`statusCode`: RawTransferStatusCode\): [_TransferStatusCode_](../enums/_types_index_.transferstatuscode.md)

_Defined in_ [_src/entities/SecurityToken/Transfers/Transfers.ts:168_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Transfers/Transfers.ts#L168)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `statusCode` | RawTransferStatusCode |

**Returns:** [_TransferStatusCode_](../enums/_types_index_.transferstatuscode.md)

### signKycData

▸ **signKycData**\(`args`: object\): _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_SignTransferDataProcedureArgs_](../interfaces/_types_index_.signtransferdataprocedureargs.md)_, void››_

_Defined in_ [_src/entities/SecurityToken/Transfers/Transfers.ts:47_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Transfers/Transfers.ts#L47)

Generate a signature string based on dynamic KYC data. This data can be used to:

* Check if a transfer can be made \(using `canTransfer`\) with different KYC data than is currently present
* Actually make a transfer \(using `transfer`\) with different KYC data than is currently present \(in this case, the existing KYC data will be overwritten\)

The signature can be generated by a third party other than the issuer. The signing wallet should have permission to modify KYC data \(via the Tokenholders Administrator role\) Otherwise, the new data will be disregarded

**Note that, when supplying KYC data for signing, ALL investor entries should be supplied \(even those that remain the same\)**

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `kycData` | [Omit](../external-modules/_types_index_.md#omit)‹[Omit](../external-modules/_types_index_.md#omit)‹[TokenholderDataEntry](../interfaces/_types_index_.tokenholderdataentry.md), "canBuyFromSto"›, "isAccredited"›\[\] |
| `validFrom` | Date |
| `validTo` | Date |

**Returns:** _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_SignTransferDataProcedureArgs_](../interfaces/_types_index_.signtransferdataprocedureargs.md)_, void››_

### transfer

▸ **transfer**\(`args`: object\): _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_TransferSecurityTokensProcedureArgs_](../interfaces/_types_index_.transfersecuritytokensprocedureargs.md)_, void››_

_Defined in_ [_src/entities/SecurityToken/Transfers/Transfers.ts:72_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Transfers/Transfers.ts#L72)

Transfer an amount of Security Tokens to a specified address

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `amount` | BigNumber |
| `data?` | undefined \| string |
| `from?` | undefined \| string |
| `to` | string |

**Returns:** _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_TransferSecurityTokensProcedureArgs_](../interfaces/_types_index_.transfersecuritytokensprocedureargs.md)_, void››_

### unfreeze

▸ **unfreeze**\(\): _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_ToggleFreezeTransfersProcedureArgs_](../interfaces/_types_index_.togglefreezetransfersprocedureargs.md)_, void››_

_Defined in_ [_src/entities/SecurityToken/Transfers/Transfers.ts:201_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Transfers/Transfers.ts#L201)

Unfreeze transfers of the security token

**Returns:** _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_ToggleFreezeTransfersProcedureArgs_](../interfaces/_types_index_.togglefreezetransfersprocedureargs.md)_, void››_

