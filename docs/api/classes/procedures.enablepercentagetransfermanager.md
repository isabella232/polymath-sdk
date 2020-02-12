# Class: EnablePercentageTransferManager <**ReturnType**>

Procedure that enables Percentage Ownership Restictions on a Security Token. This allows setting a maximum percentage of the total supply that a single shareholder can own. Any token transfer that would result in a single shareholder owning more than the allowed percentage will fail

## Type parameters

▪ **ReturnType**

## Hierarchy

* Procedure‹EnablePercentageTransferManagerProcedureArgs›

  ↳ **EnablePercentageTransferManager**

## Index

### Constructors

* [constructor](procedures.enablepercentagetransfermanager.md#constructor)

### Properties

* [args](procedures.enablepercentagetransfermanager.md#protected-args)
* [context](procedures.enablepercentagetransfermanager.md#protected-context)
* [type](procedures.enablepercentagetransfermanager.md#type)

### Methods

* [addProcedure](procedures.enablepercentagetransfermanager.md#addprocedure)
* [addSignatureRequest](procedures.enablepercentagetransfermanager.md#addsignaturerequest)
* [addTransaction](procedures.enablepercentagetransfermanager.md#addtransaction)
* [prepare](procedures.enablepercentagetransfermanager.md#prepare)
* [prepareTransactions](procedures.enablepercentagetransfermanager.md#preparetransactions)

## Constructors

###  constructor

\+ **new EnablePercentageTransferManager**(`args`: EnablePercentageTransferManagerProcedureArgs, `context`: [Context](_context_.context.md)): *[EnablePercentageTransferManager](procedures.enablepercentagetransfermanager.md)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/procedures/Procedure.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | EnablePercentageTransferManagerProcedureArgs |
`context` | [Context](_context_.context.md) |

**Returns:** *[EnablePercentageTransferManager](procedures.enablepercentagetransfermanager.md)*

## Properties

### `Protected` args

• **args**: *EnablePercentageTransferManagerProcedureArgs*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:39](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/procedures/Procedure.ts#L39)*

___

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:41](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/procedures/Procedure.ts#L41)*

___

###  type

• **type**: *ProcedureType* =  ProcedureType.EnablePercentageTransferManager

*Overrides void*

*Defined in [src/procedures/EnablePercentageTransferManager.ts:22](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/procedures/EnablePercentageTransferManager.ts#L22)*

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

*Defined in [src/procedures/EnablePercentageTransferManager.ts:29](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/procedures/EnablePercentageTransferManager.ts#L29)*

Enable Percentage Ownership restrictions and set the max ownership percentage and whether primary issuance is exempted from said restrictions

Note: Primary issuance exemption is disallowed by default unless otherwise specified

**Returns:** *Promise‹void›*
