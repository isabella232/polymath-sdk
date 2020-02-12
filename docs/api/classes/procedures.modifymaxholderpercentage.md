# Class: ModifyMaxHolderPercentage <**ReturnType**>

Procedure that modifies the maximum percentage that an individual token holder can hold

## Type parameters

▪ **ReturnType**

## Hierarchy

* Procedure‹ModifyMaxHolderPercentageProcedureArgs›

  ↳ **ModifyMaxHolderPercentage**

## Index

### Constructors

* [constructor](procedures.modifymaxholderpercentage.md#constructor)

### Properties

* [args](procedures.modifymaxholderpercentage.md#protected-args)
* [context](procedures.modifymaxholderpercentage.md#protected-context)
* [type](procedures.modifymaxholderpercentage.md#type)

### Methods

* [addProcedure](procedures.modifymaxholderpercentage.md#addprocedure)
* [addSignatureRequest](procedures.modifymaxholderpercentage.md#addsignaturerequest)
* [addTransaction](procedures.modifymaxholderpercentage.md#addtransaction)
* [prepare](procedures.modifymaxholderpercentage.md#prepare)
* [prepareTransactions](procedures.modifymaxholderpercentage.md#preparetransactions)

## Constructors

###  constructor

\+ **new ModifyMaxHolderPercentage**(`args`: ModifyMaxHolderPercentageProcedureArgs, `context`: [Context](_context_.context.md)): *[ModifyMaxHolderPercentage](procedures.modifymaxholderpercentage.md)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/procedures/Procedure.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | ModifyMaxHolderPercentageProcedureArgs |
`context` | [Context](_context_.context.md) |

**Returns:** *[ModifyMaxHolderPercentage](procedures.modifymaxholderpercentage.md)*

## Properties

### `Protected` args

• **args**: *ModifyMaxHolderPercentageProcedureArgs*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:39](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/procedures/Procedure.ts#L39)*

___

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:41](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/procedures/Procedure.ts#L41)*

___

###  type

• **type**: *ProcedureType* =  ProcedureType.ModifyMaxHolderPercentage

*Overrides void*

*Defined in [src/procedures/ModifyMaxHolderPercentage.ts:20](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/procedures/ModifyMaxHolderPercentage.ts#L20)*

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

*Defined in [src/procedures/ModifyMaxHolderPercentage.ts:29](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/procedures/ModifyMaxHolderPercentage.ts#L29)*

Modify the number of security tokens (expressed in percentage) that an investor can hold as maximum

Note that this procedure will fail if:
- The security token symbol doesn't exist
- The security token has disabled the PercentageOwnershipRestrictions feature

**Returns:** *Promise‹void›*
