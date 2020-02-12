# Class: InvestInSimpleSto <**ReturnType**>

Procedure that invests in a Simple STO

## Type parameters

▪ **ReturnType**

## Hierarchy

* Procedure‹InvestInSimpleStoProcedureArgs›

  ↳ **InvestInSimpleSto**

## Index

### Constructors

* [constructor](procedures.investinsimplesto.md#constructor)

### Properties

* [args](procedures.investinsimplesto.md#protected-args)
* [context](procedures.investinsimplesto.md#protected-context)
* [type](procedures.investinsimplesto.md#type)

### Methods

* [addProcedure](procedures.investinsimplesto.md#addprocedure)
* [addSignatureRequest](procedures.investinsimplesto.md#addsignaturerequest)
* [addTransaction](procedures.investinsimplesto.md#addtransaction)
* [prepare](procedures.investinsimplesto.md#prepare)
* [prepareTransactions](procedures.investinsimplesto.md#preparetransactions)

## Constructors

###  constructor

\+ **new InvestInSimpleSto**(`args`: InvestInSimpleStoProcedureArgs, `context`: [Context](_context_.context.md)): *[InvestInSimpleSto](procedures.investinsimplesto.md)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/procedures/Procedure.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | InvestInSimpleStoProcedureArgs |
`context` | [Context](_context_.context.md) |

**Returns:** *[InvestInSimpleSto](procedures.investinsimplesto.md)*

## Properties

### `Protected` args

• **args**: *InvestInSimpleStoProcedureArgs*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:39](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/procedures/Procedure.ts#L39)*

___

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:41](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/procedures/Procedure.ts#L41)*

___

###  type

• **type**: *ProcedureType* =  ProcedureType.InvestInSimpleSto

*Overrides void*

*Defined in [src/procedures/InvestInSimpleSto.ts:46](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/procedures/InvestInSimpleSto.ts#L46)*

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

▸ **prepareTransactions**(): *Promise‹void›*

*Overrides void*

*Defined in [src/procedures/InvestInSimpleSto.ts:61](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/procedures/InvestInSimpleSto.ts#L61)*

Buy Security Tokens from the STO

Note that this procedure will fail if:
- The Security Token doesn't exist
- The STO address is invalid
- The STO is either archived or hasn't been launched
- The STO hasn't started yet
- The STO is paused
- The STO has already been finalized
- Attempting to invest on behalf of another address when beneficial investments aren't allowed for the STO
- The STO doesn't support investments in the selected currency

**Returns:** *Promise‹void›*
