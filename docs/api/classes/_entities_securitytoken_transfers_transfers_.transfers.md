# Class: Transfers

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

###  constructor

\+ **new Transfers**(`securityToken`: [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md), `context`: [Context](_context_.context.md)): *[Transfers](_entities_securitytoken_transfers_transfers_.transfers.md)*

*Overrides [SubModule](_entities_securitytoken_submodule_.submodule.md).[constructor](_entities_securitytoken_submodule_.submodule.md#constructor)*

*Defined in [src/entities/SecurityToken/Transfers/Transfers.ts:21](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Transfers/Transfers.ts#L21)*

Create a new Transfers instance

**Parameters:**

Name | Type |
------ | ------ |
`securityToken` | [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[Transfers](_entities_securitytoken_transfers_transfers_.transfers.md)*

## Properties

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[context](_entities_securitytoken_submodule_.submodule.md#protected-context)*

*Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SubModule.ts#L10)*

___

###  restrictions

• **restrictions**: *[Restrictions](_entities_securitytoken_transfers_restrictions_restrictions_.restrictions.md)*

*Defined in [src/entities/SecurityToken/Transfers/Transfers.ts:21](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Transfers/Transfers.ts#L21)*

___

### `Protected` securityToken

• **securityToken**: *[SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)*

*Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[securityToken](_entities_securitytoken_submodule_.submodule.md#protected-securitytoken)*

*Defined in [src/entities/SecurityToken/SubModule.ts:8](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SubModule.ts#L8)*

## Methods

###  canTransfer

▸ **canTransfer**(`args`: object): *Promise‹object›*

*Defined in [src/entities/SecurityToken/Transfers/Transfers.ts:130](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Transfers/Transfers.ts#L130)*

Validate if a transfer of Security Tokens can be performed. This takes all present transfer restrictions into account

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`data?` | undefined &#124; string |
`from?` | undefined &#124; string |
`to` | string |
`value` | BigNumber |

**Returns:** *Promise‹object›*

___

###  freeze

▸ **freeze**(): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleFreezeTransfersProcedureArgs](../interfaces/_types_index_.togglefreezetransfersprocedureargs.md), void››*

*Defined in [src/entities/SecurityToken/Transfers/Transfers.ts:114](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Transfers/Transfers.ts#L114)*

Freeze transfers of the security token

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleFreezeTransfersProcedureArgs](../interfaces/_types_index_.togglefreezetransfersprocedureargs.md), void››*

___

###  frozen

▸ **frozen**(): *Promise‹boolean›*

*Defined in [src/entities/SecurityToken/Transfers/Transfers.ts:89](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Transfers/Transfers.ts#L89)*

Retrieve whether the transfer of tokens is frozen or not
Can be modified with `freeze` and `unfreeze`

**Returns:** *Promise‹boolean›*

___

### `Private` getStatusCode

▸ **getStatusCode**(`statusCode`: RawTransferStatusCode): *[TransferStatusCode](../enums/_types_index_.transferstatuscode.md)*

*Defined in [src/entities/SecurityToken/Transfers/Transfers.ts:168](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Transfers/Transfers.ts#L168)*

**Parameters:**

Name | Type |
------ | ------ |
`statusCode` | RawTransferStatusCode |

**Returns:** *[TransferStatusCode](../enums/_types_index_.transferstatuscode.md)*

___

###  signKycData

▸ **signKycData**(`args`: object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[SignTransferDataProcedureArgs](../interfaces/_types_index_.signtransferdataprocedureargs.md), void››*

*Defined in [src/entities/SecurityToken/Transfers/Transfers.ts:47](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Transfers/Transfers.ts#L47)*

Generate a signature string based on dynamic KYC data. This data can be used to:

- Check if a transfer can be made (using `canTransfer`) with different KYC data than is currently present
- Actually make a transfer (using `transfer`) with different KYC data than is currently present (in this case, the existing KYC data will be overwritten)

The signature can be generated by a third party other than the issuer. The signing wallet should have permission to modify KYC data (via the Tokenholders Administrator role)
Otherwise, the new data will be disregarded

**Note that, when supplying KYC data for signing, ALL investor entries should be supplied (even those that remain the same)**

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`kycData` | [Omit](../modules/_types_index_.md#omit)‹[Omit](../modules/_types_index_.md#omit)‹[TokenholderDataEntry](../interfaces/_types_index_.tokenholderdataentry.md), "canBuyFromSto"›, "isAccredited"›[] |
`validFrom` | Date |
`validTo` | Date |

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[SignTransferDataProcedureArgs](../interfaces/_types_index_.signtransferdataprocedureargs.md), void››*

___

###  transfer

▸ **transfer**(`args`: object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[TransferSecurityTokensProcedureArgs](../interfaces/_types_index_.transfersecuritytokensprocedureargs.md), void››*

*Defined in [src/entities/SecurityToken/Transfers/Transfers.ts:72](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Transfers/Transfers.ts#L72)*

Transfer an amount of Security Tokens to a specified address

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`amount` | BigNumber |
`data?` | undefined &#124; string |
`from?` | undefined &#124; string |
`to` | string |

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[TransferSecurityTokensProcedureArgs](../interfaces/_types_index_.transfersecuritytokensprocedureargs.md), void››*

___

###  unfreeze

▸ **unfreeze**(): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleFreezeTransfersProcedureArgs](../interfaces/_types_index_.togglefreezetransfersprocedureargs.md), void››*

*Defined in [src/entities/SecurityToken/Transfers/Transfers.ts:201](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Transfers/Transfers.ts#L201)*

Unfreeze transfers of the security token

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ToggleFreezeTransfersProcedureArgs](../interfaces/_types_index_.togglefreezetransfersprocedureargs.md), void››*
