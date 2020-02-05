# Class: Transfers

Namespace that handles all Transfer related functionality

## Hierarchy

- [SubModule](_entities_securitytoken_submodule_.submodule.md)

  ↳ **Transfers**

## Index

### Constructors

- [constructor](_entities_securitytoken_transfers_transfers_.transfers.md#constructor)

### Properties

- [context](_entities_securitytoken_transfers_transfers_.transfers.md#protected-context)
- [restrictions](_entities_securitytoken_transfers_transfers_.transfers.md#restrictions)
- [securityToken](_entities_securitytoken_transfers_transfers_.transfers.md#protected-securitytoken)

### Methods

- [canTransfer](_entities_securitytoken_transfers_transfers_.transfers.md#cantransfer)
- [freeze](_entities_securitytoken_transfers_transfers_.transfers.md#freeze)
- [frozen](_entities_securitytoken_transfers_transfers_.transfers.md#frozen)
- [getStatusCode](_entities_securitytoken_transfers_transfers_.transfers.md#private-getstatuscode)
- [signKycData](_entities_securitytoken_transfers_transfers_.transfers.md#signkycdata)
- [transfer](_entities_securitytoken_transfers_transfers_.transfers.md#transfer)
- [unfreeze](_entities_securitytoken_transfers_transfers_.transfers.md#unfreeze)

## Constructors

### constructor

\+ **new Transfers**(`securityToken`: [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md), `context`: [Context](_context_.context.md)): _[Transfers](_entities_securitytoken_transfers_transfers_.transfers.md)_

_Overrides [SubModule](_entities_securitytoken_submodule_.submodule.md).[constructor](_entities_securitytoken_submodule_.submodule.md#constructor)_

_Defined in [src/entities/SecurityToken/Transfers/Transfers.ts:21](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Transfers/Transfers.ts#L21)_

Create a new Transfers instance

**Parameters:**

| Name            | Type                                                                     |
| --------------- | ------------------------------------------------------------------------ |
| `securityToken` | [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md) |
| `context`       | [Context](_context_.context.md)                                          |

**Returns:** _[Transfers](_entities_securitytoken_transfers_transfers_.transfers.md)_

## Properties

### `Protected` context

• **context**: _[Context](_context_.context.md)_

_Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[context](_entities_securitytoken_submodule_.submodule.md#protected-context)_

_Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/SubModule.ts#L10)_

---

### restrictions

• **restrictions**: _[Restrictions](_entities_securitytoken_transfers_restrictions_restrictions_.restrictions.md)_

_Defined in [src/entities/SecurityToken/Transfers/Transfers.ts:21](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Transfers/Transfers.ts#L21)_

---

### `Protected` securityToken

• **securityToken**: _[SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)_

_Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[securityToken](_entities_securitytoken_submodule_.submodule.md#protected-securitytoken)_

_Defined in [src/entities/SecurityToken/SubModule.ts:8](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/SubModule.ts#L8)_

## Methods

### canTransfer

▸ **canTransfer**(`args`: object): _Promise‹object›_

_Defined in [src/entities/SecurityToken/Transfers/Transfers.ts:130](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Transfers/Transfers.ts#L130)_

Validate if a transfer of Security Tokens can be performed. This takes all present transfer restrictions into account

**Parameters:**

▪ **args**: _object_

| Name    | Type                    |
| ------- | ----------------------- |
| `data?` | undefined &#124; string |
| `from?` | undefined &#124; string |
| `to`    | string                  |
| `value` | BigNumber               |

**Returns:** _Promise‹object›_

---

### freeze

▸ **freeze**(): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleFreezeTransfersProcedureArgs](../interfaces/_types_index_.togglefreezetransfersprocedureargs.md), void››_

_Defined in [src/entities/SecurityToken/Transfers/Transfers.ts:114](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Transfers/Transfers.ts#L114)_

Freeze transfers of the security token

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleFreezeTransfersProcedureArgs](../interfaces/_types_index_.togglefreezetransfersprocedureargs.md), void››_

---

### frozen

▸ **frozen**(): _Promise‹boolean›_

_Defined in [src/entities/SecurityToken/Transfers/Transfers.ts:89](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Transfers/Transfers.ts#L89)_

Retrieve whether the transfer of tokens is frozen or not
Can be modified with `freeze` and `unfreeze`

**Returns:** _Promise‹boolean›_

---

### `Private` getStatusCode

▸ **getStatusCode**(`statusCode`: RawTransferStatusCode): _[TransferStatusCode](../enums/_types_index_.transferstatuscode.md)_

_Defined in [src/entities/SecurityToken/Transfers/Transfers.ts:168](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Transfers/Transfers.ts#L168)_

**Parameters:**

| Name         | Type                  |
| ------------ | --------------------- |
| `statusCode` | RawTransferStatusCode |

**Returns:** _[TransferStatusCode](../enums/_types_index_.transferstatuscode.md)_

---

### signKycData

▸ **signKycData**(`args`: object): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[SignTransferDataProcedureArgs](../interfaces/_types_index_.signtransferdataprocedureargs.md), void››_

_Defined in [src/entities/SecurityToken/Transfers/Transfers.ts:47](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Transfers/Transfers.ts#L47)_

Generate a signature string based on dynamic KYC data. This data can be used to:

- Check if a transfer can be made (using `canTransfer`) with different KYC data than is currently present
- Actually make a transfer (using `transfer`) with different KYC data than is currently present (in this case, the existing KYC data will be overwritten)

The signature can be generated by a third party other than the issuer. The signing wallet should have permission to modify KYC data (via the Shareholders Administrator role)
Otherwise, the new data will be disregarded

**Note that, when supplying KYC data for signing, ALL investor entries should be supplied (even those that remain the same)**

**Parameters:**

▪ **args**: _object_

| Name        | Type                                                                                                                                                                                               |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kycData`   | [Omit](../modules/_types_index_.md#omit)‹[Omit](../modules/_types_index_.md#omit)‹[ShareholderDataEntry](../interfaces/_types_index_.shareholderdataentry.md), "canBuyFromSto"›, "isAccredited"›[] |
| `validFrom` | Date                                                                                                                                                                                               |
| `validTo`   | Date                                                                                                                                                                                               |

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[SignTransferDataProcedureArgs](../interfaces/_types_index_.signtransferdataprocedureargs.md), void››_

---

### transfer

▸ **transfer**(`args`: object): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[TransferSecurityTokensProcedureArgs](../interfaces/_types_index_.transfersecuritytokensprocedureargs.md), void››_

_Defined in [src/entities/SecurityToken/Transfers/Transfers.ts:72](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Transfers/Transfers.ts#L72)_

Transfer an amount of Security Tokens to a specified address

**Parameters:**

▪ **args**: _object_

| Name     | Type                    |
| -------- | ----------------------- |
| `amount` | BigNumber               |
| `data?`  | undefined &#124; string |
| `from?`  | undefined &#124; string |
| `to`     | string                  |

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[TransferSecurityTokensProcedureArgs](../interfaces/_types_index_.transfersecuritytokensprocedureargs.md), void››_

---

### unfreeze

▸ **unfreeze**(): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleFreezeTransfersProcedureArgs](../interfaces/_types_index_.togglefreezetransfersprocedureargs.md), void››_

_Defined in [src/entities/SecurityToken/Transfers/Transfers.ts:201](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Transfers/Transfers.ts#L201)_

Unfreeze transfers of the security token

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleFreezeTransfersProcedureArgs](../interfaces/_types_index_.togglefreezetransfersprocedureargs.md), void››_
