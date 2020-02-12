# Class: ModifyTieredStoData <**ReturnType**>

Procedure that modifies the configuration parameters of a Tiered STO

## Type parameters

▪ **ReturnType**

## Hierarchy

* Procedure‹ModifyTieredStoDataProcedureArgs›

  ↳ **ModifyTieredStoData**

## Index

### Constructors

* [constructor](procedures.modifytieredstodata.md#constructor)

### Properties

* [args](procedures.modifytieredstodata.md#protected-args)
* [context](procedures.modifytieredstodata.md#protected-context)
* [type](procedures.modifytieredstodata.md#type)

### Methods

* [addProcedure](procedures.modifytieredstodata.md#addprocedure)
* [addSignatureRequest](procedures.modifytieredstodata.md#addsignaturerequest)
* [addTransaction](procedures.modifytieredstodata.md#addtransaction)
* [prepare](procedures.modifytieredstodata.md#prepare)
* [prepareTransactions](procedures.modifytieredstodata.md#preparetransactions)

## Constructors

###  constructor

\+ **new ModifyTieredStoData**(`args`: ModifyTieredStoDataProcedureArgs, `context`: [Context](_context_.context.md)): *[ModifyTieredStoData](procedures.modifytieredstodata.md)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/procedures/Procedure.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | ModifyTieredStoDataProcedureArgs |
`context` | [Context](_context_.context.md) |

**Returns:** *[ModifyTieredStoData](procedures.modifytieredstodata.md)*

## Properties

### `Protected` args

• **args**: *ModifyTieredStoDataProcedureArgs*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:39](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/procedures/Procedure.ts#L39)*

___

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:41](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/procedures/Procedure.ts#L41)*

___

###  type

• **type**: *ProcedureType* =  ProcedureType.ModifyTieredStoData

*Overrides void*

*Defined in [src/procedures/ModifyTieredStoData.ts:48](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/procedures/ModifyTieredStoData.ts#L48)*

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

*Defined in [src/procedures/ModifyTieredStoData.ts:66](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/procedures/ModifyTieredStoData.ts#L66)*

- Modify the start and end date of the STO
- Modify the fundraise types of the STO
- Modify the custom currency symbol and the oracles used to convert POLY and ETH to said currency
- Modify the STO's tiers (rates, tokens per tier and discounts when buying with POLY)
- Modify investment limits (min investment, max invested for non-accredited investors)
- Modify treasury wallet, wallet for unsold tokens and stable coin addresses

Only transactions that will effectively present changes will be submitted

Note that this procedure will fail if:
- The STO has not been enabled or has been archived
- The STO has already started
- Attempting to use a custom currency on an STO with version 3.0.0 or lower
- The supplied parameters don't represent any changes in the STO

**Returns:** *Promise‹void›*
