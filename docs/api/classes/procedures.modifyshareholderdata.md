# Class: ModifyShareholderData

Procedure that modifies data for a list of (potential) shareholders. The data that can be modified is:

- KYC data (sale/buy lockup dates and KYC expiry)
- Whether the shareholder is accredited
- Whether the shareholder can buy from an STO

## Hierarchy

* Procedure‹ModifyShareholderDataProcedureArgs, [Shareholder](entities.shareholder.md)[]›

  ↳ **ModifyShareholderData**

## Index

### Constructors

* [constructor](procedures.modifyshareholderdata.md#constructor)

### Properties

* [args](procedures.modifyshareholderdata.md#protected-args)
* [context](procedures.modifyshareholderdata.md#protected-context)
* [type](procedures.modifyshareholderdata.md#type)

### Methods

* [addProcedure](procedures.modifyshareholderdata.md#addprocedure)
* [addSignatureRequest](procedures.modifyshareholderdata.md#addsignaturerequest)
* [addTransaction](procedures.modifyshareholderdata.md#addtransaction)
* [prepare](procedures.modifyshareholderdata.md#prepare)
* [prepareTransactions](procedures.modifyshareholderdata.md#preparetransactions)

## Constructors

###  constructor

\+ **new ModifyShareholderData**(`args`: ModifyShareholderDataProcedureArgs, `context`: [Context](_context_.context.md)): *[ModifyShareholderData](procedures.modifyshareholderdata.md)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/procedures/Procedure.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | ModifyShareholderDataProcedureArgs |
`context` | [Context](_context_.context.md) |

**Returns:** *[ModifyShareholderData](procedures.modifyshareholderdata.md)*

## Properties

### `Protected` args

• **args**: *ModifyShareholderDataProcedureArgs*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:39](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/procedures/Procedure.ts#L39)*

___

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:41](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/procedures/Procedure.ts#L41)*

___

###  type

• **type**: *ProcedureType* =  ProcedureType.ModifyShareholderData

*Overrides void*

*Defined in [src/procedures/ModifyShareholderData.ts:36](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/procedures/ModifyShareholderData.ts#L36)*

## Methods

###  addProcedure

▸ **addProcedure**<**A**, **R**>(`Proc`: [ProcedureClass](../interfaces/procedures.procedureclass.md)‹A, R›): *(Anonymous function)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:96](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/procedures/Procedure.ts#L96)*

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

*Defined in [src/procedures/Procedure.ts:184](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/procedures/Procedure.ts#L184)*

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

*Defined in [src/procedures/Procedure.ts:142](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/procedures/Procedure.ts#L142)*

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

*Defined in [src/procedures/Procedure.ts:57](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/procedures/Procedure.ts#L57)*

Mandatory method that builds a list of transactions that will be
run

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹Args, ReturnType››*

___

###  prepareTransactions

▸ **prepareTransactions**(): *Promise‹PostTransactionResolver‹[Shareholder](entities.shareholder.md)[], TransactionReceiptWithDecodedLogs››*

*Overrides void*

*Defined in [src/procedures/ModifyShareholderData.ts:46](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/procedures/ModifyShareholderData.ts#L46)*

Update shareholder data for a subset of addresses

Note that this procedure will fail if:
- You're trying to set the dates to 0 (there is a special "RevokeKyc" procedure for that)
- The Security Token doesn't exist
- There is no difference between the "new" data and the data already present in the contract

**Returns:** *Promise‹PostTransactionResolver‹[Shareholder](entities.shareholder.md)[], TransactionReceiptWithDecodedLogs››*
