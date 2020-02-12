# Class: ControllerTransfer <**ReturnType**>

Procedure that forcefully transfers Security Tokens from one account to another.
Can only be executed by the Security Token's Controller

## Type parameters

▪ **ReturnType**

## Hierarchy

* Procedure‹ControllerTransferProcedureArgs›

  ↳ **ControllerTransfer**

## Index

### Constructors

* [constructor](procedures.controllertransfer.md#constructor)

### Properties

* [args](procedures.controllertransfer.md#protected-args)
* [context](procedures.controllertransfer.md#protected-context)
* [type](procedures.controllertransfer.md#type)

### Methods

* [addProcedure](procedures.controllertransfer.md#addprocedure)
* [addSignatureRequest](procedures.controllertransfer.md#addsignaturerequest)
* [addTransaction](procedures.controllertransfer.md#addtransaction)
* [prepare](procedures.controllertransfer.md#prepare)
* [prepareTransactions](procedures.controllertransfer.md#preparetransactions)

## Constructors

###  constructor

\+ **new ControllerTransfer**(`args`: ControllerTransferProcedureArgs, `context`: [Context](_context_.context.md)): *[ControllerTransfer](procedures.controllertransfer.md)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/procedures/Procedure.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | ControllerTransferProcedureArgs |
`context` | [Context](_context_.context.md) |

**Returns:** *[ControllerTransfer](procedures.controllertransfer.md)*

## Properties

### `Protected` args

• **args**: *ControllerTransferProcedureArgs*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:39](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/procedures/Procedure.ts#L39)*

___

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:41](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/procedures/Procedure.ts#L41)*

___

###  type

• **type**: *ProcedureType* =  ProcedureType.ControllerTransfer

*Overrides void*

*Defined in [src/procedures/ControllerTransfer.ts:49](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/procedures/ControllerTransfer.ts#L49)*

## Methods

###  addProcedure

▸ **addProcedure**<**A**, **R**>(`Proc`: [ProcedureClass](../interfaces/procedures.procedureclass.md)‹A, R›): *(Anonymous function)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:96](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/procedures/Procedure.ts#L96)*

Appends a Procedure into the TransactionQueue's queue. This defines
what will be run by the TransactionQueue when it is started.

**Type parameters:**

▪ **A**

▪ **R**: *any*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`Proc` | [ProcedureClass](../interfaces/procedures.procedureclass.md)‹A, R› | A Procedure that will be run in the Procedure's TransactionQueue  |

**Returns:** *(Anonymous function)*

whichever value is returned by the Procedure

___

###  addSignatureRequest

▸ **addSignatureRequest**<**A**>(`request`: SignatureRequest‹A›): *(Anonymous function)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:184](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/procedures/Procedure.ts#L184)*

Appends a signature request into the TransactionQueue's queue. This defines
what will be run by the TransactionQueue when it is started.

**Type parameters:**

▪ **A**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`request` | SignatureRequest‹A› | A signature request that will be run in the Procedure's TransactionQueue  |

**Returns:** *(Anonymous function)*

a PostTransactionResolver that resolves to the signed data

___

###  addTransaction

▸ **addTransaction**<**A**, **R**, **V**>(`method`: LowLevelMethod‹A› | FutureLowLevelMethod‹V, A›, `__namedParameters`: object): *(Anonymous function)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:142](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/procedures/Procedure.ts#L142)*

Appends a method or future method into the TransactionQueue's queue. This defines
what will be run by the TransactionQueue when it is started.

**Type parameters:**

▪ **A**

▪ **R**: *any[]*

▪ **V**: *any*

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`method` | LowLevelMethod‹A› &#124; FutureLowLevelMethod‹V, A› | - | A method (or future method) that will be run in the Procedure's TransactionQueue. A future method is a transaction that doesn't exist at prepare time (for example a transaction on a module that hasn't been attached but will be by the time the previous transactions are run) |
`__namedParameters` | object |  {} | - |

**Returns:** *(Anonymous function)*

a PostTransactionResolver that resolves to the value returned by the resolver function, or undefined if no resolver function was passed

___

###  prepare

▸ **prepare**(): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹Args, ReturnType››*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:57](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/procedures/Procedure.ts#L57)*

Mandatory method that builds a list of transactions that will be
run

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹Args, ReturnType››*

___

###  prepareTransactions

▸ **prepareTransactions**(): *Promise‹void›*

*Overrides void*

*Defined in [src/procedures/ControllerTransfer.ts:59](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/procedures/ControllerTransfer.ts#L59)*

Forcefully transfer tokens from one address to another

Note this procedure will fail if:
- Any of the addresses are invalid
- The sender's ("from" address) balance is less than the amount being transferred
- The current wallet address is not the Security Token controller address

**Returns:** *Promise‹void›*
