# Class: InvestInTieredSto <**ReturnType**>

Procedure that invests in a Tiered STO

## Type parameters

▪ **ReturnType**

## Hierarchy

* Procedure‹InvestInTieredStoProcedureArgs›

  ↳ **InvestInTieredSto**

## Index

### Constructors

* [constructor](procedures.investintieredsto.md#constructor)

### Properties

* [args](procedures.investintieredsto.md#protected-args)
* [context](procedures.investintieredsto.md#protected-context)
* [type](procedures.investintieredsto.md#type)

### Methods

* [addProcedure](procedures.investintieredsto.md#addprocedure)
* [addSignatureRequest](procedures.investintieredsto.md#addsignaturerequest)
* [addTransaction](procedures.investintieredsto.md#addtransaction)
* [prepare](procedures.investintieredsto.md#prepare)
* [prepareTransactions](procedures.investintieredsto.md#preparetransactions)

## Constructors

###  constructor

\+ **new InvestInTieredSto**(`args`: InvestInTieredStoProcedureArgs, `context`: [Context](_context_.context.md)): *[InvestInTieredSto](procedures.investintieredsto.md)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/procedures/Procedure.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | InvestInTieredStoProcedureArgs |
`context` | [Context](_context_.context.md) |

**Returns:** *[InvestInTieredSto](procedures.investintieredsto.md)*

## Properties

### `Protected` args

• **args**: *InvestInTieredStoProcedureArgs*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:39](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/procedures/Procedure.ts#L39)*

___

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:41](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/procedures/Procedure.ts#L41)*

___

###  type

• **type**: *ProcedureType* =  ProcedureType.InvestInTieredSto

*Overrides void*

*Defined in [src/procedures/InvestInTieredSto.ts:47](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/procedures/InvestInTieredSto.ts#L47)*

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

*Defined in [src/procedures/InvestInTieredSto.ts:61](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/procedures/InvestInTieredSto.ts#L61)*

Invest the specified amount in the STO

Note that this procedure will fail if:
- The Security Token doesn't exist
- The STO address is invalid
- The STO is either archived or hasn't been launched
- The STO hasn't started yet
- The STO is paused
- Trying to invest on behalf of someone else if the STO doesn't allow beneficial investments
- The STO doesn't support investments in the selected currency

**Returns:** *Promise‹void›*
