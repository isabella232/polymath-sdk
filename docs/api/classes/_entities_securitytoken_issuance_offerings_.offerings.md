# Offerings

Namespace that handles all Offering related functionality

## Hierarchy

* [SubModule](_entities_securitytoken_submodule_.submodule.md)

  ↳ **Offerings**

## Index

### Constructors

* [constructor](_entities_securitytoken_issuance_offerings_.offerings.md#constructor)

### Properties

* [context](_entities_securitytoken_issuance_offerings_.offerings.md#protected-context)
* [securityToken](_entities_securitytoken_issuance_offerings_.offerings.md#protected-securitytoken)

### Methods

* [getSto](_entities_securitytoken_issuance_offerings_.offerings.md#getsto)
* [getStos](_entities_securitytoken_issuance_offerings_.offerings.md#getstos)
* [launchSimpleSto](_entities_securitytoken_issuance_offerings_.offerings.md#launchsimplesto)
* [launchTieredSto](_entities_securitytoken_issuance_offerings_.offerings.md#launchtieredsto)

## Constructors

### constructor

+ **new Offerings**\(`securityToken`: [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md), `context`: [Context](_context_.context.md)\): [_Offerings_](_entities_securitytoken_issuance_offerings_.offerings.md)

_Inherited from_ [_SubModule_](_entities_securitytoken_submodule_.submodule.md)_._[_constructor_](_entities_securitytoken_submodule_.submodule.md#constructor)

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:10_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SubModule.ts#L10)

Create a new SubModule instance

**Parameters:**

| Name | Type |
| :--- | :--- |
| `securityToken` | [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md) |
| `context` | [Context](_context_.context.md) |

**Returns:** [_Offerings_](_entities_securitytoken_issuance_offerings_.offerings.md)

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

### getSto

▸ **getSto**\(`args`: [GetStoParams](../interfaces/_entities_securitytoken_issuance_offerings_.getstoparams.md) \| string\): _Promise‹any›_

_Defined in_ [_src/entities/SecurityToken/Issuance/Offerings.ts:223_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L223)

Retrieve an STO by type and address or UUID

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `args` | [GetStoParams](../interfaces/_entities_securitytoken_issuance_offerings_.getstoparams.md) \| string | STO uuid or object containing its type and address |

**Returns:** _Promise‹any›_

### getStos

▸ **getStos**\(`opts`: object\): _Promise‹_[_SimpleSto_](_entities_simplesto_.simplesto.md) _\|_ [_TieredSto_](_entities_tieredsto_.tieredsto.md)_\[\]›_

_Defined in_ [_src/entities/SecurityToken/Issuance/Offerings.ts:260_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L260)

Retrieve all STOs attached to a security token

**Parameters:**

▪`Default value` **opts**: _object_= { stoTypes: \[StoType.Simple, StoType.Tiered\], }

| Name | Type |
| :--- | :--- |
| `stoTypes` | [StoType](../enums/_types_index_.stotype.md)\[\] |

**Returns:** _Promise‹_[_SimpleSto_](_entities_simplesto_.simplesto.md) _\|_ [_TieredSto_](_entities_tieredsto_.tieredsto.md)_\[\]›_

### launchSimpleSto

▸ **launchSimpleSto**\(`args`: object\): _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_LaunchSimpleStoProcedureArgs_](../interfaces/_types_index_.launchsimplestoprocedureargs.md)_,_ [_SimpleSto_](_entities_simplesto_.simplesto.md)_››_

_Defined in_ [_src/entities/SecurityToken/Issuance/Offerings.ts:168_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L168)

Launch a Simple STO

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `allowPreIssuance?` | undefined \| false \| true |
| `currency` | Currency.ETH \| Currency.POLY |
| `endDate` | Date |
| `raisedFundsWallet` | string |
| `rate` | BigNumber |
| `startDate` | Date |
| `tokensOnSale` | BigNumber |
| `unsoldTokensWallet` | string |

**Returns:** _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_LaunchSimpleStoProcedureArgs_](../interfaces/_types_index_.launchsimplestoprocedureargs.md)_,_ [_SimpleSto_](_entities_simplesto_.simplesto.md)_››_

### launchTieredSto

▸ **launchTieredSto**\(`args`: [LaunchTieredStoParams](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md)\): _Promise‹any›_

_Defined in_ [_src/entities/SecurityToken/Issuance/Offerings.ts:203_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L203)

Launch a Tiered STO

**Parameters:**

| Name | Type |
| :--- | :--- |
| `args` | [LaunchTieredStoParams](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md) |

**Returns:** _Promise‹any›_

