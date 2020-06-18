# Class: Controller

Namespace that handles all Controller related functionality

## Hierarchy

* [SubModule](_entities_securitytoken_submodule_.submodule.md)

  ↳ **Controller**

## Index

### Constructors

* [constructor](_entities_securitytoken_controller_.controller.md#constructor)

### Properties

* [context](_entities_securitytoken_controller_.controller.md#protected-context)
* [securityToken](_entities_securitytoken_controller_.controller.md#protected-securitytoken)

### Methods

* [disable](_entities_securitytoken_controller_.controller.md#disable)
* [modifyController](_entities_securitytoken_controller_.controller.md#modifycontroller)
* [redeem](_entities_securitytoken_controller_.controller.md#redeem)
* [signDisableAck](_entities_securitytoken_controller_.controller.md#signdisableack)
* [transfer](_entities_securitytoken_controller_.controller.md#transfer)

## Constructors

###  constructor

\+ **new Controller**(`securityToken`: [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md), `context`: [Context](_context_.context.md)): *[Controller](_entities_securitytoken_controller_.controller.md)*

*Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[constructor](_entities_securitytoken_submodule_.submodule.md#constructor)*

*Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/SecurityToken/SubModule.ts#L10)*

Create a new SubModule instance

**Parameters:**

Name | Type |
------ | ------ |
`securityToken` | [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[Controller](_entities_securitytoken_controller_.controller.md)*

## Properties

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[context](_entities_securitytoken_submodule_.submodule.md#protected-context)*

*Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/SecurityToken/SubModule.ts#L10)*

___

### `Protected` securityToken

• **securityToken**: *[SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)*

*Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[securityToken](_entities_securitytoken_submodule_.submodule.md#protected-securitytoken)*

*Defined in [src/entities/SecurityToken/SubModule.ts:8](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/SecurityToken/SubModule.ts#L8)*

## Methods

###  disable

▸ **disable**(`args?`: undefined | object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[DisableControllerProcedureArgs](../interfaces/_types_index_.disablecontrollerprocedureargs.md), void››*

*Defined in [src/entities/SecurityToken/Controller.ts:33](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/SecurityToken/Controller.ts#L33)*

Permanently disable controller functionality

**Parameters:**

Name | Type |
------ | ------ |
`args?` | undefined &#124; object |

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[DisableControllerProcedureArgs](../interfaces/_types_index_.disablecontrollerprocedureargs.md), void››*

___

###  modifyController

▸ **modifyController**(`args`: object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[SetControllerProcedureArgs](../interfaces/_types_index_.setcontrollerprocedureargs.md), void››*

*Defined in [src/entities/SecurityToken/Controller.ts:20](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/SecurityToken/Controller.ts#L20)*

Set the address of the Security Token's Controller. The controller may perform forced transfers

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`controller` | string |

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[SetControllerProcedureArgs](../interfaces/_types_index_.setcontrollerprocedureargs.md), void››*

___

###  redeem

▸ **redeem**(`args`: object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ControllerRedeemProcedureArgs](../interfaces/_types_index_.controllerredeemprocedureargs.md), void››*

*Defined in [src/entities/SecurityToken/Controller.ts:77](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/SecurityToken/Controller.ts#L77)*

Redeem (burn) an amount of tokens from a token holder. Only the Security Token's controller can call this
This operation is subject to transfer restrictions and the amount is limited by the token holder's balance.
`balanceOf(tokenHolder)` tokens) and potentially also need to respect other transfer restrictions.

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`amount` | BigNumber |
`data?` | undefined &#124; string |
`from` | string |
`reason?` | undefined &#124; string |

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ControllerRedeemProcedureArgs](../interfaces/_types_index_.controllerredeemprocedureargs.md), void››*

___

###  signDisableAck

▸ **signDisableAck**(): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[SignDisableControllerAckProcedureArgs](../interfaces/_types_index_.signdisablecontrollerackprocedureargs.md), void››*

*Defined in [src/entities/SecurityToken/Controller.ts:95](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/SecurityToken/Controller.ts#L95)*

Generate a signature string that can be used to permanently disable the Security Token's controller functionality

**Note that only the owner's signature is valid for this operation**

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[SignDisableControllerAckProcedureArgs](../interfaces/_types_index_.signdisablecontrollerackprocedureargs.md), void››*

___

###  transfer

▸ **transfer**(`args`: object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ControllerTransferProcedureArgs](../interfaces/_types_index_.controllertransferprocedureargs.md), void››*

*Defined in [src/entities/SecurityToken/Controller.ts:49](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/SecurityToken/Controller.ts#L49)*

Perform a forced transfer of tokens from one address to another. You must be the
Security Token's controller to do this

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`amount` | BigNumber |
`data?` | undefined &#124; string |
`from` | string |
`reason?` | undefined &#124; string |
`to` | string |

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ControllerTransferProcedureArgs](../interfaces/_types_index_.controllertransferprocedureargs.md), void››*
