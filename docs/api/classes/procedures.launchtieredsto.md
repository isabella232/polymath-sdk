# Class: LaunchTieredSto

Procedure that launches a Tiered STO

## Hierarchy

* Procedure‹LaunchTieredStoProcedureArgs, [TieredSto](entities.tieredsto.md)›

  ↳ **LaunchTieredSto**

## Index

### Constructors

* [constructor](procedures.launchtieredsto.md#constructor)

### Properties

* [args](procedures.launchtieredsto.md#protected-args)
* [context](procedures.launchtieredsto.md#protected-context)
* [type](procedures.launchtieredsto.md#type)

### Methods

* [addProcedure](procedures.launchtieredsto.md#addprocedure)
* [addSignatureRequest](procedures.launchtieredsto.md#addsignaturerequest)
* [addTransaction](procedures.launchtieredsto.md#addtransaction)
* [prepare](procedures.launchtieredsto.md#prepare)
* [prepareTransactions](procedures.launchtieredsto.md#preparetransactions)

## Constructors

###  constructor

\+ **new LaunchTieredSto**(`args`: LaunchTieredStoProcedureArgs, `context`: [Context](_context_.context.md)): *[LaunchTieredSto](procedures.launchtieredsto.md)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/procedures/Procedure.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | LaunchTieredStoProcedureArgs |
`context` | [Context](_context_.context.md) |

**Returns:** *[LaunchTieredSto](procedures.launchtieredsto.md)*

## Properties

### `Protected` args

• **args**: *LaunchTieredStoProcedureArgs*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:39](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/procedures/Procedure.ts#L39)*

___

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:41](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/procedures/Procedure.ts#L41)*

___

###  type

• **type**: *ProcedureType* =  ProcedureType.LaunchTieredSto

*Overrides void*

*Defined in [src/procedures/LaunchTieredSto.ts:32](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/procedures/LaunchTieredSto.ts#L32)*

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

▸ **prepareTransactions**(): *Promise‹PostTransactionResolver‹[TieredSto](entities.tieredsto.md), TransactionReceiptWithDecodedLogs››*

*Overrides void*

*Defined in [src/procedures/LaunchTieredSto.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/procedures/LaunchTieredSto.ts#L45)*

- Transfer the necessary amount of POLY to the Security Token to cover the STO's setup fee
- Launch the Tiered STO
- Allow pre-issuing (if applicable, defaults to false)
- Return the newly created STO

Note that this procedure will fail if:
- The supplied custom currency oracle addresses corresponding to the selected fund raise currencies are invalid
- Raising in Stable Coin and not providing stable coin addresses
- Attempting to allow pre-issuing on a version 3.0 STO

**Returns:** *Promise‹PostTransactionResolver‹[TieredSto](entities.tieredsto.md), TransactionReceiptWithDecodedLogs››*
