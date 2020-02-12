# Class: Controller

Namespace that handles all Controller related functionality

## Hierarchy

* [SubModule](entities.securitytoken.submodule.md)

  ↳ **Controller**

## Index

### Constructors

* [constructor](entities.securitytoken.controller.md#constructor)

### Properties

* [context](entities.securitytoken.controller.md#protected-context)
* [securityToken](entities.securitytoken.controller.md#protected-securitytoken)

### Methods

* [disable](entities.securitytoken.controller.md#disable)
* [modifyController](entities.securitytoken.controller.md#modifycontroller)
* [redeem](entities.securitytoken.controller.md#redeem)
* [signDisableAck](entities.securitytoken.controller.md#signdisableack)
* [transfer](entities.securitytoken.controller.md#transfer)

## Constructors

###  constructor

\+ **new Controller**(`securityToken`: [SecurityToken](entities.securitytoken.securitytoken.md), `context`: [Context](_context_.context.md)): *[Controller](entities.securitytoken.controller.md)*

*Inherited from [SubModule](entities.securitytoken.submodule.md).[constructor](entities.securitytoken.submodule.md#constructor)*

*Defined in [src/entities/SecurityToken/SubModule.ts:15](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/SubModule.ts#L15)*

Create a new SubModule instance

**Parameters:**

Name | Type |
------ | ------ |
`securityToken` | [SecurityToken](entities.securitytoken.securitytoken.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[Controller](entities.securitytoken.controller.md)*

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

###  disable

▸ **disable**(`args?`: undefined | object): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹DisableControllerProcedureArgs, void››*

*Defined in [src/entities/SecurityToken/Controller.ts:38](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/Controller.ts#L38)*

Permanently disable controller functionality

**Parameters:**

Name | Type |
------ | ------ |
`args?` | undefined &#124; object |

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹DisableControllerProcedureArgs, void››*

___

###  modifyController

▸ **modifyController**(`args`: object): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹SetControllerProcedureArgs, void››*

*Defined in [src/entities/SecurityToken/Controller.ts:25](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/Controller.ts#L25)*

Set the address of the Security Token's Controller. The controller may perform forced transfers

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹SetControllerProcedureArgs, void››*

___

###  redeem

▸ **redeem**(`args`: object): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹ControllerRedeemProcedureArgs, void››*

*Defined in [src/entities/SecurityToken/Controller.ts:82](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/Controller.ts#L82)*

Redeem (burn) an amount of tokens from a token holder. Only the Security Token's controller can call this
This operation is subject to transfer restrictions and the amount is limited by the token holder's balance.
`balanceOf(tokenHolder)` tokens) and potentially also need to respect other transfer restrictions.

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹ControllerRedeemProcedureArgs, void››*

___

###  signDisableAck

▸ **signDisableAck**(): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹SignDisableControllerAckProcedureArgs, void››*

*Defined in [src/entities/SecurityToken/Controller.ts:100](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/Controller.ts#L100)*

Generate a signature string that can be used to permanently disable the Security Token's controller functionality

**Note that only the owner's signature is valid for this operation**

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹SignDisableControllerAckProcedureArgs, void››*

___

###  transfer

▸ **transfer**(`args`: object): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹ControllerTransferProcedureArgs, void››*

*Defined in [src/entities/SecurityToken/Controller.ts:54](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/SecurityToken/Controller.ts#L54)*

Perform a forced transfer of tokens from one address to another. You must be the
Security Token's controller to do this

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹ControllerTransferProcedureArgs, void››*
