# Class: Issuance

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

###  constructor

\+ **new Issuance**(`securityToken`: [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md), `context`: [Context](_context_.context.md)): *[Issuance](_entities_securitytoken_issuance_issuance_.issuance.md)*

*Overrides [SubModule](_entities_securitytoken_submodule_.submodule.md).[constructor](_entities_securitytoken_submodule_.submodule.md#constructor)*

*Defined in [src/entities/SecurityToken/Issuance/Issuance.ts:14](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Issuance/Issuance.ts#L14)*

Create a new Issuance instance

**Parameters:**

Name | Type |
------ | ------ |
`securityToken` | [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[Issuance](_entities_securitytoken_issuance_issuance_.issuance.md)*

## Properties

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[context](_entities_securitytoken_submodule_.submodule.md#protected-context)*

*Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SubModule.ts#L10)*

___

###  offerings

• **offerings**: *[Offerings](_entities_securitytoken_issuance_offerings_.offerings.md)*

*Defined in [src/entities/SecurityToken/Issuance/Issuance.ts:14](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Issuance/Issuance.ts#L14)*

___

### `Protected` securityToken

• **securityToken**: *[SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)*

*Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[securityToken](_entities_securitytoken_submodule_.submodule.md#protected-securitytoken)*

*Defined in [src/entities/SecurityToken/SubModule.ts:8](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SubModule.ts#L8)*

## Methods

###  allowed

▸ **allowed**(): *Promise‹Boolean›*

*Defined in [src/entities/SecurityToken/Issuance/Issuance.ts:73](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Issuance/Issuance.ts#L73)*

Retrieve whether the issuance of tokens is allowed or not
Can be permanently frozen with `freeze`

**Returns:** *Promise‹Boolean›*

___

###  freeze

▸ **freeze**(`args?`: undefined | object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[FreezeIssuanceProcedureArgs](../interfaces/_types_index_.freezeissuanceprocedureargs.md), void››*

*Defined in [src/entities/SecurityToken/Issuance/Issuance.ts:48](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Issuance/Issuance.ts#L48)*

Permanently freeze issuance of the security token

**Parameters:**

Name | Type |
------ | ------ |
`args?` | undefined &#124; object |

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[FreezeIssuanceProcedureArgs](../interfaces/_types_index_.freezeissuanceprocedureargs.md), void››*

___

###  issue

▸ **issue**(`args`: object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[IssueTokensProcedureArgs](../interfaces/_types_index_.issuetokensprocedureargs.md), [Tokenholder](_entities_tokenholder_.tokenholder.md)[]››*

*Defined in [src/entities/SecurityToken/Issuance/Issuance.ts:32](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Issuance/Issuance.ts#L32)*

Issue a certain amount of tokens to an address. The address must already have been added via `modifyData`. Otherwise,
the corresponding tokenholder data for that address must be supplied to this method
**NOTE: If tokenholder data is supplied, client-side validations to verify if the transfer is possible won't be performed**

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`issuanceData` | [IssuanceDataEntry](../interfaces/_types_index_.issuancedataentry.md)[] |

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[IssueTokensProcedureArgs](../interfaces/_types_index_.issuetokensprocedureargs.md), [Tokenholder](_entities_tokenholder_.tokenholder.md)[]››*

___

###  signFreezeAck

▸ **signFreezeAck**(): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[SignFreezeIssuanceAckProcedureArgs](../interfaces/_types_index_.signfreezeissuanceackprocedureargs.md), void››*

*Defined in [src/entities/SecurityToken/Issuance/Issuance.ts:61](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Issuance/Issuance.ts#L61)*

Generate a signature string that can be used to permanently freeze issuance of the Security Token

**Note that only the owner's signature is valid for this operation**

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[SignFreezeIssuanceAckProcedureArgs](../interfaces/_types_index_.signfreezeissuanceackprocedureargs.md), void››*
