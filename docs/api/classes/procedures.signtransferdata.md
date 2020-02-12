# Class: SignTransferData <**ReturnType**>

Procedure that signs KYC data for transfers.
This signature can be used to simulate updates to KYC data when checking if a transfer can be made or to actually modify said data at the moment of performing a transfer without having to do it in a separate transaction.
The signature has a period of validity which is specified by the parameters passed to the procedure

## Type parameters

▪ **ReturnType**

## Hierarchy

* Procedure‹SignTransferDataProcedureArgs›

  ↳ **SignTransferData**

## Index

### Constructors

* [constructor](procedures.signtransferdata.md#constructor)

### Properties

* [args](procedures.signtransferdata.md#protected-args)
* [context](procedures.signtransferdata.md#protected-context)
* [type](procedures.signtransferdata.md#type)

### Methods

* [addProcedure](procedures.signtransferdata.md#addprocedure)
* [addSignatureRequest](procedures.signtransferdata.md#addsignaturerequest)
* [addTransaction](procedures.signtransferdata.md#addtransaction)
* [prepare](procedures.signtransferdata.md#prepare)
* [prepareTransactions](procedures.signtransferdata.md#preparetransactions)

## Constructors

###  constructor

\+ **new SignTransferData**(`args`: SignTransferDataProcedureArgs, `context`: [Context](_context_.context.md)): *[SignTransferData](procedures.signtransferdata.md)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/procedures/Procedure.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | SignTransferDataProcedureArgs |
`context` | [Context](_context_.context.md) |

**Returns:** *[SignTransferData](procedures.signtransferdata.md)*

## Properties

### `Protected` args

• **args**: *SignTransferDataProcedureArgs*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:39](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/procedures/Procedure.ts#L39)*

___

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:41](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/procedures/Procedure.ts#L41)*

___

###  type

• **type**: *ProcedureType* =  ProcedureType.SignTransferData

*Overrides void*

*Defined in [src/procedures/SignTransferData.ts:16](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/procedures/SignTransferData.ts#L16)*

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

▸ **prepareTransactions**(): *Promise‹void›*

*Overrides void*

*Defined in [src/procedures/SignTransferData.ts:25](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/procedures/SignTransferData.ts#L25)*

Sign KYC data, passing the valid dates and extra kyc data

Note this procedure will fail if:
- The signature validity period starting date (validFrom) is later than the end date (validTo)
- The validity period end date (validTo) is in the past

**Returns:** *Promise‹void›*
