# Class: Controller

Namespace that handles all Controller related functionality

## Hierarchy

- [SubModule](_entities_securitytoken_submodule_.submodule.md)

  ↳ **Controller**

## Index

### Constructors

- [constructor](_entities_securitytoken_controller_.controller.md#constructor)

### Properties

- [context](_entities_securitytoken_controller_.controller.md#protected-context)
- [securityToken](_entities_securitytoken_controller_.controller.md#protected-securitytoken)

### Methods

- [disable](_entities_securitytoken_controller_.controller.md#disable)
- [modifyController](_entities_securitytoken_controller_.controller.md#modifycontroller)
- [redeem](_entities_securitytoken_controller_.controller.md#redeem)
- [signDisableAck](_entities_securitytoken_controller_.controller.md#signdisableack)
- [transfer](_entities_securitytoken_controller_.controller.md#transfer)

## Constructors

### constructor

\+ **new Controller**(`securityToken`: [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md), `context`: [Context](_context_.context.md)): _[Controller](_entities_securitytoken_controller_.controller.md)_

_Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[constructor](_entities_securitytoken_submodule_.submodule.md#constructor)_

_Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/entities/SecurityToken/SubModule.ts#L10)_

Create a new SubModule instance

**Parameters:**

| Name            | Type                                                                     |
| --------------- | ------------------------------------------------------------------------ |
| `securityToken` | [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md) |
| `context`       | [Context](_context_.context.md)                                          |

**Returns:** _[Controller](_entities_securitytoken_controller_.controller.md)_

## Properties

### `Protected` context

• **context**: _[Context](_context_.context.md)_

_Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[context](_entities_securitytoken_submodule_.submodule.md#protected-context)_

_Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/entities/SecurityToken/SubModule.ts#L10)_

---

### `Protected` securityToken

• **securityToken**: _[SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)_

_Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[securityToken](_entities_securitytoken_submodule_.submodule.md#protected-securitytoken)_

_Defined in [src/entities/SecurityToken/SubModule.ts:8](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/entities/SecurityToken/SubModule.ts#L8)_

## Methods

### disable

▸ **disable**(`args?`: undefined | object): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[DisableControllerProcedureArgs](../interfaces/_types_index_.disablecontrollerprocedureargs.md), void››_

_Defined in [src/entities/SecurityToken/Controller.ts:33](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/entities/SecurityToken/Controller.ts#L33)_

Permanently disable controller functionality

**Parameters:**

| Name    | Type                    |
| ------- | ----------------------- |
| `args?` | undefined &#124; object |

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[DisableControllerProcedureArgs](../interfaces/_types_index_.disablecontrollerprocedureargs.md), void››_

---

### modifyController

▸ **modifyController**(`args`: object): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[SetControllerProcedureArgs](../interfaces/_types_index_.setcontrollerprocedureargs.md), void››_

_Defined in [src/entities/SecurityToken/Controller.ts:20](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/entities/SecurityToken/Controller.ts#L20)_

Set the address of the Security Token's Controller. The controller may perform forced transfers

**Parameters:**

▪ **args**: _object_

| Name         | Type   |
| ------------ | ------ |
| `controller` | string |

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[SetControllerProcedureArgs](../interfaces/_types_index_.setcontrollerprocedureargs.md), void››_

---

### redeem

▸ **redeem**(`args`: object): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ControllerRedeemProcedureArgs](../interfaces/_types_index_.controllerredeemprocedureargs.md), void››_

_Defined in [src/entities/SecurityToken/Controller.ts:77](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/entities/SecurityToken/Controller.ts#L77)_

Redeem (burn) an amount of tokens from a token holder. Only the Security Token's controller can call this
This operation is subject to transfer restrictions and the amount is limited by the token holder's balance.
`balanceOf(tokenHolder)` tokens) and potentially also need to respect other transfer restrictions.

**Parameters:**

▪ **args**: _object_

| Name      | Type                    |
| --------- | ----------------------- |
| `amount`  | BigNumber               |
| `data?`   | undefined &#124; string |
| `from`    | string                  |
| `reason?` | undefined &#124; string |

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ControllerRedeemProcedureArgs](../interfaces/_types_index_.controllerredeemprocedureargs.md), void››_

---

### signDisableAck

▸ **signDisableAck**(): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[SignDisableControllerAckProcedureArgs](../interfaces/_types_index_.signdisablecontrollerackprocedureargs.md), void››_

_Defined in [src/entities/SecurityToken/Controller.ts:95](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/entities/SecurityToken/Controller.ts#L95)_

Generate a signature string that can be used to permanently disable the Security Token's controller functionality

**Note that only the owner's signature is valid for this operation**

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[SignDisableControllerAckProcedureArgs](../interfaces/_types_index_.signdisablecontrollerackprocedureargs.md), void››_

---

### transfer

▸ **transfer**(`args`: object): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ControllerTransferProcedureArgs](../interfaces/_types_index_.controllertransferprocedureargs.md), void››_

_Defined in [src/entities/SecurityToken/Controller.ts:49](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/entities/SecurityToken/Controller.ts#L49)_

Perform a forced transfer of tokens from one address to another. You must be the
Security Token's controller to do this

**Parameters:**

▪ **args**: _object_

| Name      | Type                    |
| --------- | ----------------------- |
| `amount`  | BigNumber               |
| `data?`   | undefined &#124; string |
| `from`    | string                  |
| `reason?` | undefined &#124; string |
| `to`      | string                  |

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ControllerTransferProcedureArgs](../interfaces/_types_index_.controllertransferprocedureargs.md), void››_
