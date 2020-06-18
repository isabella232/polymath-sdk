# Issuance

Namespace that handles all Issuance related functionality

## Hierarchy

* [SubModule](_entities_securitytoken_submodule_.submodule.md)

  ↳ **Issuance**

## Index

### Constructors

* [constructor](_entities_securitytoken_issuance_issuance_.issuance.md#constructor)

### Properties

* [context](_entities_securitytoken_issuance_issuance_.issuance.md#protected-context)
* [offerings](_entities_securitytoken_issuance_issuance_.issuance.md#offerings)
* [securityToken](_entities_securitytoken_issuance_issuance_.issuance.md#protected-securitytoken)

### Methods

* [allowed](_entities_securitytoken_issuance_issuance_.issuance.md#allowed)
* [freeze](_entities_securitytoken_issuance_issuance_.issuance.md#freeze)
* [issue](_entities_securitytoken_issuance_issuance_.issuance.md#issue)
* [signFreezeAck](_entities_securitytoken_issuance_issuance_.issuance.md#signfreezeack)

## Constructors

### constructor

+ **new Issuance**\(`securityToken`: [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md), `context`: [Context](_context_.context.md)\): [_Issuance_](_entities_securitytoken_issuance_issuance_.issuance.md)

_Overrides_ [_SubModule_](_entities_securitytoken_submodule_.submodule.md)_._[_constructor_](_entities_securitytoken_submodule_.submodule.md#constructor)

_Defined in_ [_src/entities/SecurityToken/Issuance/Issuance.ts:14_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Issuance.ts#L14)

Create a new Issuance instance

**Parameters:**

| Name | Type |
| :--- | :--- |
| `securityToken` | [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md) |
| `context` | [Context](_context_.context.md) |

**Returns:** [_Issuance_](_entities_securitytoken_issuance_issuance_.issuance.md)

## Properties

### `Protected` context

• **context**: [_Context_](_context_.context.md)

_Inherited from_ [_SubModule_](_entities_securitytoken_submodule_.submodule.md)_._[_context_](_entities_securitytoken_submodule_.submodule.md#protected-context)

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:10_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SubModule.ts#L10)

### offerings

• **offerings**: [_Offerings_](_entities_securitytoken_issuance_offerings_.offerings.md)

_Defined in_ [_src/entities/SecurityToken/Issuance/Issuance.ts:14_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Issuance.ts#L14)

### `Protected` securityToken

• **securityToken**: [_SecurityToken_](_entities_securitytoken_securitytoken_.securitytoken.md)

_Inherited from_ [_SubModule_](_entities_securitytoken_submodule_.submodule.md)_._[_securityToken_](_entities_securitytoken_submodule_.submodule.md#protected-securitytoken)

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:8_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SubModule.ts#L8)

## Methods

### allowed

▸ **allowed**\(\): _Promise‹Boolean›_

_Defined in_ [_src/entities/SecurityToken/Issuance/Issuance.ts:73_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Issuance.ts#L73)

Retrieve whether the issuance of tokens is allowed or not Can be permanently frozen with `freeze`

**Returns:** _Promise‹Boolean›_

### freeze

▸ **freeze**\(`args?`: undefined \| object\): _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_FreezeIssuanceProcedureArgs_](../interfaces/_types_index_.freezeissuanceprocedureargs.md)_, void››_

_Defined in_ [_src/entities/SecurityToken/Issuance/Issuance.ts:48_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Issuance.ts#L48)

Permanently freeze issuance of the security token

**Parameters:**

| Name | Type |
| :--- | :--- |
| `args?` | undefined \| object |

**Returns:** _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_FreezeIssuanceProcedureArgs_](../interfaces/_types_index_.freezeissuanceprocedureargs.md)_, void››_

### issue

▸ **issue**\(`args`: object\): _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_IssueTokensProcedureArgs_](../interfaces/_types_index_.issuetokensprocedureargs.md)_,_ [_Tokenholder_](_entities_tokenholder_.tokenholder.md)_\[\]››_

_Defined in_ [_src/entities/SecurityToken/Issuance/Issuance.ts:32_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Issuance.ts#L32)

Issue a certain amount of tokens to an address. The address must already have been added via `modifyData`. Otherwise, the corresponding tokenholder data for that address must be supplied to this method **NOTE: If tokenholder data is supplied, client-side validations to verify if the transfer is possible won't be performed**

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `issuanceData` | [IssuanceDataEntry](../interfaces/_types_index_.issuancedataentry.md)\[\] |

**Returns:** _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_IssueTokensProcedureArgs_](../interfaces/_types_index_.issuetokensprocedureargs.md)_,_ [_Tokenholder_](_entities_tokenholder_.tokenholder.md)_\[\]››_

### signFreezeAck

▸ **signFreezeAck**\(\): _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_SignFreezeIssuanceAckProcedureArgs_](../interfaces/_types_index_.signfreezeissuanceackprocedureargs.md)_, void››_

_Defined in_ [_src/entities/SecurityToken/Issuance/Issuance.ts:61_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Issuance.ts#L61)

Generate a signature string that can be used to permanently freeze issuance of the Security Token

**Note that only the owner's signature is valid for this operation**

**Returns:** _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_SignFreezeIssuanceAckProcedureArgs_](../interfaces/_types_index_.signfreezeissuanceackprocedureargs.md)_, void››_

