# Class: PercentageRestrictions

Namespace that handles all Percentage Restriction related functionality

## Hierarchy

* [SubModule](entities.securitytoken.submodule.md)

  ↳ **PercentageRestrictions**

## Index

### Constructors

* [constructor](entities.securitytoken.transfers.restrictions.percentagerestrictions.md#constructor)

### Properties

* [context](entities.securitytoken.transfers.restrictions.percentagerestrictions.md#protected-context)
* [securityToken](entities.securitytoken.transfers.restrictions.percentagerestrictions.md#protected-securitytoken)

### Methods

* [getExemptions](entities.securitytoken.transfers.restrictions.percentagerestrictions.md#getexemptions)
* [getMaxHolderPercentage](entities.securitytoken.transfers.restrictions.percentagerestrictions.md#getmaxholderpercentage)
* [modifyExemptions](entities.securitytoken.transfers.restrictions.percentagerestrictions.md#modifyexemptions)
* [modifyMaxHolderPercentage](entities.securitytoken.transfers.restrictions.percentagerestrictions.md#modifymaxholderpercentage)

## Constructors

###  constructor

\+ **new PercentageRestrictions**(`securityToken`: [SecurityToken](entities.securitytoken.securitytoken.md), `context`: [Context](_context_.context.md)): *[PercentageRestrictions](entities.securitytoken.transfers.restrictions.percentagerestrictions.md)*

*Inherited from [SubModule](entities.securitytoken.submodule.md).[constructor](entities.securitytoken.submodule.md#constructor)*

*Defined in [src/entities/SecurityToken/SubModule.ts:15](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/SubModule.ts#L15)*

Create a new SubModule instance

**Parameters:**

Name | Type |
------ | ------ |
`securityToken` | [SecurityToken](entities.securitytoken.securitytoken.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[PercentageRestrictions](entities.securitytoken.transfers.restrictions.percentagerestrictions.md)*

## Properties

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from [SubModule](entities.securitytoken.submodule.md).[context](entities.securitytoken.submodule.md#protected-context)*

*Defined in [src/entities/SecurityToken/SubModule.ts:15](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/SubModule.ts#L15)*

___

### `Protected` securityToken

• **securityToken**: *[SecurityToken](entities.securitytoken.securitytoken.md)*

*Inherited from [SubModule](entities.securitytoken.submodule.md).[securityToken](entities.securitytoken.submodule.md#protected-securitytoken)*

*Defined in [src/entities/SecurityToken/SubModule.ts:13](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/SubModule.ts#L13)*

## Methods

###  getExemptions

▸ **getExemptions**(): *Promise‹object›*

*Defined in [src/entities/SecurityToken/Transfers/Restrictions/PercentageRestrictions.ts:71](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/Transfers/Restrictions/PercentageRestrictions.ts#L71)*

Retrieve all exemptions that currently apply to percentage restrictions. That includes the whitelist and whether primary issuance (minting) is allowed to bypass percentage ownership restrictions

Can be modified with `modifyPercentageExemptions`

**Returns:** *Promise‹object›*

___

###  getMaxHolderPercentage

▸ **getMaxHolderPercentage**(): *Promise‹BigNumber›*

*Defined in [src/entities/SecurityToken/Transfers/Restrictions/PercentageRestrictions.ts:144](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/Transfers/Restrictions/PercentageRestrictions.ts#L144)*

Retrieve the maximum percentage of the total supply that a single shareholder can own
Can be modified with `modifyMaxHolderPercentage`

**Returns:** *Promise‹BigNumber›*

___

###  modifyExemptions

▸ **modifyExemptions**(`args`: object): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹ModifyPercentageExemptionsProcedureArgs, void››*

*Defined in [src/entities/SecurityToken/Transfers/Restrictions/PercentageRestrictions.ts:52](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/Transfers/Restrictions/PercentageRestrictions.ts#L52)*

Modify the conditions for exemption from percentage ownership restrictions. There are two (independent) methods of exemption:

- Whitelisting: an address can be whitelisted and thus percentage ownership restrictions will not apply to it
- Primary issuance: if enabled, issuing tokens to an address will bypass percentage ownership restrictions (for example, if issuing tokens to a particular address would leave that address with a higher percentage than the limit, having this option set to `true` will allow that issuance operation)

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹ModifyPercentageExemptionsProcedureArgs, void››*

___

###  modifyMaxHolderPercentage

▸ **modifyMaxHolderPercentage**(`args`: object): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹ModifyMaxHolderPercentageProcedureArgs, void››*

*Defined in [src/entities/SecurityToken/Transfers/Restrictions/PercentageRestrictions.ts:129](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/Transfers/Restrictions/PercentageRestrictions.ts#L129)*

Modify the maximum percentage of the total supply that a single shareholder can own at a given time

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹ModifyMaxHolderPercentageProcedureArgs, void››*
