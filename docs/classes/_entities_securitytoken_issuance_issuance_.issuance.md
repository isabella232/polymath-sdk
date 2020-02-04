[@polymathnetwork/sdk - v2.0.1-beta.120](../README.md) › [Globals](../globals.md) › ["entities/SecurityToken/Issuance/Issuance"](../modules/_entities_securitytoken_issuance_issuance_.md) › [Issuance](_entities_securitytoken_issuance_issuance_.issuance.md)

# Class: Issuance

Namespace that handles all Issuance related functionality

## Hierarchy

- [SubModule](_entities_securitytoken_submodule_.submodule.md)

  ↳ **Issuance**

## Index

### Constructors

- [constructor](_entities_securitytoken_issuance_issuance_.issuance.md#constructor)

### Properties

- [context](_entities_securitytoken_issuance_issuance_.issuance.md#protected-context)
- [offerings](_entities_securitytoken_issuance_issuance_.issuance.md#offerings)
- [securityToken](_entities_securitytoken_issuance_issuance_.issuance.md#protected-securitytoken)

### Methods

- [allowed](_entities_securitytoken_issuance_issuance_.issuance.md#allowed)
- [freeze](_entities_securitytoken_issuance_issuance_.issuance.md#freeze)
- [issue](_entities_securitytoken_issuance_issuance_.issuance.md#issue)
- [signFreezeAck](_entities_securitytoken_issuance_issuance_.issuance.md#signfreezeack)

## Constructors

### constructor

\+ **new Issuance**(`securityToken`: [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md), `context`: [Context](_context_.context.md)): _[Issuance](_entities_securitytoken_issuance_issuance_.issuance.md)_

_Overrides [SubModule](_entities_securitytoken_submodule_.submodule.md).[constructor](_entities_securitytoken_submodule_.submodule.md#constructor)_

_Defined in [src/entities/SecurityToken/Issuance/Issuance.ts:14](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/Issuance/Issuance.ts#L14)_

Create a new Issuance instance

**Parameters:**

| Name            | Type                                                                     |
| --------------- | ------------------------------------------------------------------------ |
| `securityToken` | [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md) |
| `context`       | [Context](_context_.context.md)                                          |

**Returns:** _[Issuance](_entities_securitytoken_issuance_issuance_.issuance.md)_

## Properties

### `Protected` context

• **context**: _[Context](_context_.context.md)_

_Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[context](_entities_securitytoken_submodule_.submodule.md#protected-context)_

_Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SubModule.ts#L10)_

---

### offerings

• **offerings**: _[Offerings](_entities_securitytoken_issuance_offerings_.offerings.md)_

_Defined in [src/entities/SecurityToken/Issuance/Issuance.ts:14](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/Issuance/Issuance.ts#L14)_

---

### `Protected` securityToken

• **securityToken**: _[SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)_

_Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[securityToken](_entities_securitytoken_submodule_.submodule.md#protected-securitytoken)_

_Defined in [src/entities/SecurityToken/SubModule.ts:8](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/SubModule.ts#L8)_

## Methods

### allowed

▸ **allowed**(): _Promise‹Boolean›_

_Defined in [src/entities/SecurityToken/Issuance/Issuance.ts:73](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/Issuance/Issuance.ts#L73)_

Retrieve whether the issuance of tokens is allowed or not
Can be permanently frozen with `freeze`

**Returns:** _Promise‹Boolean›_

---

### freeze

▸ **freeze**(`args?`: undefined | object): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[FreezeIssuanceProcedureArgs](../interfaces/_types_index_.freezeissuanceprocedureargs.md), void››_

_Defined in [src/entities/SecurityToken/Issuance/Issuance.ts:48](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/Issuance/Issuance.ts#L48)_

Permanently freeze issuance of the security token

**Parameters:**

| Name    | Type                    |
| ------- | ----------------------- |
| `args?` | undefined &#124; object |

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[FreezeIssuanceProcedureArgs](../interfaces/_types_index_.freezeissuanceprocedureargs.md), void››_

---

### issue

▸ **issue**(`args`: object): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[IssueTokensProcedureArgs](../interfaces/_types_index_.issuetokensprocedureargs.md), [Shareholder](_entities_shareholder_.shareholder.md)[]››_

_Defined in [src/entities/SecurityToken/Issuance/Issuance.ts:32](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/Issuance/Issuance.ts#L32)_

Issue a certain amount of tokens to an address. The address must already have been added via `modifyData`. Otherwise,
the corresponding shareholder data for that address must be supplied to this method
**NOTE: If shareholder data is supplied, client-side validations to verify if the transfer is possible won't be performed**

**Parameters:**

▪ **args**: _object_

| Name           | Type                                                                    |
| -------------- | ----------------------------------------------------------------------- |
| `issuanceData` | [IssuanceDataEntry](../interfaces/_types_index_.issuancedataentry.md)[] |

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[IssueTokensProcedureArgs](../interfaces/_types_index_.issuetokensprocedureargs.md), [Shareholder](_entities_shareholder_.shareholder.md)[]››_

---

### signFreezeAck

▸ **signFreezeAck**(): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[SignFreezeIssuanceAckProcedureArgs](../interfaces/_types_index_.signfreezeissuanceackprocedureargs.md), void››_

_Defined in [src/entities/SecurityToken/Issuance/Issuance.ts:61](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/SecurityToken/Issuance/Issuance.ts#L61)_

Generate a signature string that can be used to permanently freeze issuance of the Security Token

**Note that only the owner's signature is valid for this operation**

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[SignFreezeIssuanceAckProcedureArgs](../interfaces/_types_index_.signfreezeissuanceackprocedureargs.md), void››_
