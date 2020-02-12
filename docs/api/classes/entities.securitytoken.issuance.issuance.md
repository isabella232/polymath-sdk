# Class: Issuance

Namespace that handles all Issuance related functionality

## Hierarchy

* [SubModule](entities.securitytoken.submodule.md)

  ↳ **Issuance**

## Index

### Constructors

* [constructor](entities.securitytoken.issuance.issuance.md#constructor)

### Properties

* [context](entities.securitytoken.issuance.issuance.md#protected-context)
* [offerings](entities.securitytoken.issuance.issuance.md#offerings)
* [securityToken](entities.securitytoken.issuance.issuance.md#protected-securitytoken)

### Methods

* [allowed](entities.securitytoken.issuance.issuance.md#allowed)
* [freeze](entities.securitytoken.issuance.issuance.md#freeze)
* [issue](entities.securitytoken.issuance.issuance.md#issue)
* [signFreezeAck](entities.securitytoken.issuance.issuance.md#signfreezeack)

## Constructors

###  constructor

\+ **new Issuance**(`securityToken`: [SecurityToken](entities.securitytoken.securitytoken.md), `context`: [Context](_context_.context.md)): *[Issuance](entities.securitytoken.issuance.issuance.md)*

*Overrides [SubModule](entities.securitytoken.submodule.md).[constructor](entities.securitytoken.submodule.md#constructor)*

*Defined in [src/entities/SecurityToken/Issuance/Issuance.ts:19](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityToken/Issuance/Issuance.ts#L19)*

Create a new Issuance instance

**Parameters:**

Name | Type |
------ | ------ |
`securityToken` | [SecurityToken](entities.securitytoken.securitytoken.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[Issuance](entities.securitytoken.issuance.issuance.md)*

## Properties

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from [SubModule](entities.securitytoken.submodule.md).[context](entities.securitytoken.submodule.md#protected-context)*

*Defined in [src/entities/SecurityToken/SubModule.ts:15](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityToken/SubModule.ts#L15)*

___

###  offerings

• **offerings**: *[Offerings](entities.securitytoken.issuance.offerings.md)*

*Defined in [src/entities/SecurityToken/Issuance/Issuance.ts:19](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityToken/Issuance/Issuance.ts#L19)*

___

### `Protected` securityToken

• **securityToken**: *[SecurityToken](entities.securitytoken.securitytoken.md)*

*Inherited from [SubModule](entities.securitytoken.submodule.md).[securityToken](entities.securitytoken.submodule.md#protected-securitytoken)*

*Defined in [src/entities/SecurityToken/SubModule.ts:13](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityToken/SubModule.ts#L13)*

## Methods

###  allowed

▸ **allowed**(): *Promise‹Boolean›*

*Defined in [src/entities/SecurityToken/Issuance/Issuance.ts:78](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityToken/Issuance/Issuance.ts#L78)*

Retrieve whether the issuance of tokens is allowed or not
Can be permanently frozen with `freeze`

**Returns:** *Promise‹Boolean›*

___

###  freeze

▸ **freeze**(`args?`: undefined | object): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹FreezeIssuanceProcedureArgs, void››*

*Defined in [src/entities/SecurityToken/Issuance/Issuance.ts:53](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityToken/Issuance/Issuance.ts#L53)*

Permanently freeze issuance of the security token

**Parameters:**

Name | Type |
------ | ------ |
`args?` | undefined &#124; object |

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹FreezeIssuanceProcedureArgs, void››*

___

###  issue

▸ **issue**(`args`: object): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹IssueTokensProcedureArgs, [Shareholder](entities.shareholder.md)[]››*

*Defined in [src/entities/SecurityToken/Issuance/Issuance.ts:37](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityToken/Issuance/Issuance.ts#L37)*

Issue a certain amount of tokens to an address. The address must already have been added via `modifyData`. Otherwise,
the corresponding shareholder data for that address must be supplied to this method
**NOTE: If shareholder data is supplied, client-side validations to verify if the transfer is possible won't be performed**

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹IssueTokensProcedureArgs, [Shareholder](entities.shareholder.md)[]››*

___

###  signFreezeAck

▸ **signFreezeAck**(): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹SignFreezeIssuanceAckProcedureArgs, void››*

*Defined in [src/entities/SecurityToken/Issuance/Issuance.ts:66](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityToken/Issuance/Issuance.ts#L66)*

Generate a signature string that can be used to permanently freeze issuance of the Security Token

**Note that only the owner's signature is valid for this operation**

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹SignFreezeIssuanceAckProcedureArgs, void››*
