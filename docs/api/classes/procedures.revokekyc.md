# Class: RevokeKyc

Procedure that revokes KYC for a list of investors

## Hierarchy

* Procedure‹RevokeKycProcedureArgs, [Shareholder](entities.shareholder.md)[]›

  ↳ **RevokeKyc**

## Index

### Constructors

* [constructor](procedures.revokekyc.md#constructor)

### Properties

* [args](procedures.revokekyc.md#protected-args)
* [context](procedures.revokekyc.md#protected-context)
* [type](procedures.revokekyc.md#type)

### Methods

* [addProcedure](procedures.revokekyc.md#addprocedure)
* [addSignatureRequest](procedures.revokekyc.md#addsignaturerequest)
* [addTransaction](procedures.revokekyc.md#addtransaction)
* [prepare](procedures.revokekyc.md#prepare)
* [prepareTransactions](procedures.revokekyc.md#preparetransactions)

## Constructors

###  constructor

\+ **new RevokeKyc**(`args`: RevokeKycProcedureArgs, `context`: [Context](_context_.context.md)): *[RevokeKyc](procedures.revokekyc.md)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/procedures/Procedure.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | RevokeKycProcedureArgs |
`context` | [Context](_context_.context.md) |

**Returns:** *[RevokeKyc](procedures.revokekyc.md)*

## Properties

### `Protected` args

• **args**: *RevokeKycProcedureArgs*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:39](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/procedures/Procedure.ts#L39)*

___

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:41](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/procedures/Procedure.ts#L41)*

___

###  type

• **type**: *ProcedureType* =  ProcedureType.RevokeKyc

*Overrides void*

*Defined in [src/procedures/RevokeKyc.ts:17](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/procedures/RevokeKyc.ts#L17)*

## Methods

###  addProcedure

▸ **addProcedure**<**A**, **R**>(`Proc`: [ProcedureClass](../interfaces/procedures.procedureclass.md)‹A, R›): *(Anonymous function)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:96](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/procedures/Procedure.ts#L96)*

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

*Defined in [src/procedures/Procedure.ts:184](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/procedures/Procedure.ts#L184)*

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

*Defined in [src/procedures/Procedure.ts:142](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/procedures/Procedure.ts#L142)*

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

*Defined in [src/procedures/Procedure.ts:57](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/procedures/Procedure.ts#L57)*

Mandatory method that builds a list of transactions that will be
run

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹Args, ReturnType››*

___

###  prepareTransactions

▸ **prepareTransactions**(): *Promise‹PostTransactionResolver‹[Shareholder](entities.shareholder.md)[], TransactionReceiptWithDecodedLogs››*

*Overrides void*

*Defined in [src/procedures/RevokeKyc.ts:28](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/procedures/RevokeKyc.ts#L28)*

Sets all KYC dates for a shareholder to epoch. This effectively makes them unable to send or receive Security Tokens

Note that this procedure will fail if:
- The shareholder address array is empty
- The Security Token doesn't exist
- KYC is already revoked for at least one of the addresses in the list
- Shareholders Feature isn't enabled

**Returns:** *Promise‹PostTransactionResolver‹[Shareholder](entities.shareholder.md)[], TransactionReceiptWithDecodedLogs››*
