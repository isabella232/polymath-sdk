# Class: ToggleAllowPreIssuing <**ReturnType**>

Procedure that toggles whether pre-issuing of tokens is allowed or not in an STO

## Type parameters

▪ **ReturnType**

## Hierarchy

* Procedure‹ToggleAllowPreIssuingProcedureArgs›

  ↳ **ToggleAllowPreIssuing**

## Index

### Constructors

* [constructor](procedures.toggleallowpreissuing.md#constructor)

### Properties

* [args](procedures.toggleallowpreissuing.md#protected-args)
* [context](procedures.toggleallowpreissuing.md#protected-context)
* [type](procedures.toggleallowpreissuing.md#type)

### Methods

* [addProcedure](procedures.toggleallowpreissuing.md#addprocedure)
* [addSignatureRequest](procedures.toggleallowpreissuing.md#addsignaturerequest)
* [addTransaction](procedures.toggleallowpreissuing.md#addtransaction)
* [prepare](procedures.toggleallowpreissuing.md#prepare)
* [prepareTransactions](procedures.toggleallowpreissuing.md#preparetransactions)

## Constructors

###  constructor

\+ **new ToggleAllowPreIssuing**(`args`: ToggleAllowPreIssuingProcedureArgs, `context`: [Context](_context_.context.md)): *[ToggleAllowPreIssuing](procedures.toggleallowpreissuing.md)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/procedures/Procedure.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | ToggleAllowPreIssuingProcedureArgs |
`context` | [Context](_context_.context.md) |

**Returns:** *[ToggleAllowPreIssuing](procedures.toggleallowpreissuing.md)*

## Properties

### `Protected` args

• **args**: *ToggleAllowPreIssuingProcedureArgs*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:39](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/procedures/Procedure.ts#L39)*

___

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:41](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/procedures/Procedure.ts#L41)*

___

###  type

• **type**: *ProcedureType* =  ProcedureType.ToggleAllowPreIssuing

*Overrides void*

*Defined in [src/procedures/ToggleAllowPreIssuing.ts:64](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/procedures/ToggleAllowPreIssuing.ts#L64)*

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

*Defined in [src/procedures/ToggleAllowPreIssuing.ts:77](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/procedures/ToggleAllowPreIssuing.ts#L77)*

Allow or disallow pre-issuing in the STO

Note this procedure will fail if:
- Trying to allow pre issuing when it is already allowed
- Trying to disallow pre issuing when it is already disallowed
- Trying to execute this procedure on an STO with version 3.0.0 or lower
- The specified STO address is invalid
- The specified STO type is invalid
- The STO has not been launched, or the module has been archived

**Returns:** *Promise‹void›*
