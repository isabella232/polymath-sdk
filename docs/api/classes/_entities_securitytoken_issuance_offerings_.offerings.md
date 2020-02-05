# Class: Offerings

Namespace that handles all Offering related functionality

## Hierarchy

- [SubModule](_entities_securitytoken_submodule_.submodule.md)

  ↳ **Offerings**

## Index

### Constructors

- [constructor](_entities_securitytoken_issuance_offerings_.offerings.md#constructor)

### Properties

- [context](_entities_securitytoken_issuance_offerings_.offerings.md#protected-context)
- [securityToken](_entities_securitytoken_issuance_offerings_.offerings.md#protected-securitytoken)

### Methods

- [getSto](_entities_securitytoken_issuance_offerings_.offerings.md#getsto)
- [getStos](_entities_securitytoken_issuance_offerings_.offerings.md#getstos)
- [launchSimpleSto](_entities_securitytoken_issuance_offerings_.offerings.md#launchsimplesto)
- [launchTieredSto](_entities_securitytoken_issuance_offerings_.offerings.md#launchtieredsto)

## Constructors

### constructor

\+ **new Offerings**(`securityToken`: [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md), `context`: [Context](_context_.context.md)): _[Offerings](_entities_securitytoken_issuance_offerings_.offerings.md)_

_Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[constructor](_entities_securitytoken_submodule_.submodule.md#constructor)_

_Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityToken/SubModule.ts#L10)_

Create a new SubModule instance

**Parameters:**

| Name            | Type                                                                     |
| --------------- | ------------------------------------------------------------------------ |
| `securityToken` | [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md) |
| `context`       | [Context](_context_.context.md)                                          |

**Returns:** _[Offerings](_entities_securitytoken_issuance_offerings_.offerings.md)_

## Properties

### `Protected` context

• **context**: _[Context](_context_.context.md)_

_Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[context](_entities_securitytoken_submodule_.submodule.md#protected-context)_

_Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityToken/SubModule.ts#L10)_

---

### `Protected` securityToken

• **securityToken**: _[SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)_

_Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[securityToken](_entities_securitytoken_submodule_.submodule.md#protected-securitytoken)_

_Defined in [src/entities/SecurityToken/SubModule.ts:8](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityToken/SubModule.ts#L8)_

## Methods

### getSto

▸ **getSto**(`args`: [GetStoParams](../interfaces/_entities_securitytoken_issuance_offerings_.getstoparams.md) | string): _Promise‹any›_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:223](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityToken/Issuance/Offerings.ts#L223)_

Retrieve an STO by type and address or UUID

**Parameters:**

| Name   | Type                                                                                                    | Description                                        |
| ------ | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `args` | [GetStoParams](../interfaces/_entities_securitytoken_issuance_offerings_.getstoparams.md) &#124; string | STO uuid or object containing its type and address |

**Returns:** _Promise‹any›_

---

### getStos

▸ **getStos**(`opts`: object): _Promise‹[SimpleSto](_entities_simplesto_.simplesto.md) | [TieredSto](_entities_tieredsto_.tieredsto.md)[]›_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:260](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityToken/Issuance/Offerings.ts#L260)_

Retrieve all STOs attached to a security token

**Parameters:**

▪`Default value` **opts**: _object_= {
stoTypes: [StoType.Simple, StoType.Tiered],
}

| Name       | Type                                           |
| ---------- | ---------------------------------------------- |
| `stoTypes` | [StoType](../enums/_types_index_.stotype.md)[] |

**Returns:** _Promise‹[SimpleSto](_entities_simplesto_.simplesto.md) | [TieredSto](_entities_tieredsto_.tieredsto.md)[]›_

---

### launchSimpleSto

▸ **launchSimpleSto**(`args`: object): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[LaunchSimpleStoProcedureArgs](../interfaces/_types_index_.launchsimplestoprocedureargs.md), [SimpleSto](_entities_simplesto_.simplesto.md)››_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:168](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityToken/Issuance/Offerings.ts#L168)_

Launch a Simple STO

**Parameters:**

▪ **args**: _object_

| Name                 | Type                               |
| -------------------- | ---------------------------------- |
| `allowPreIssuance?`  | undefined &#124; false &#124; true |
| `currency`           | Currency.ETH &#124; Currency.POLY  |
| `endDate`            | Date                               |
| `raisedFundsWallet`  | string                             |
| `rate`               | BigNumber                          |
| `startDate`          | Date                               |
| `tokensOnSale`       | BigNumber                          |
| `unsoldTokensWallet` | string                             |

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[LaunchSimpleStoProcedureArgs](../interfaces/_types_index_.launchsimplestoprocedureargs.md), [SimpleSto](_entities_simplesto_.simplesto.md)››_

---

### launchTieredSto

▸ **launchTieredSto**(`args`: [LaunchTieredStoParams](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md)): _Promise‹any›_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:203](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityToken/Issuance/Offerings.ts#L203)_

Launch a Tiered STO

**Parameters:**

| Name   | Type                                                                                                        |
| ------ | ----------------------------------------------------------------------------------------------------------- |
| `args` | [LaunchTieredStoParams](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md) |

**Returns:** _Promise‹any›_
