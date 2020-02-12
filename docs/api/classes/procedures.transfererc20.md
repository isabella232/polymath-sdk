# Class: TransferErc20 <**ReturnType**>

Procedure to transfer funds of an ERC20 token. If no token address is specified, it defaults to POLY

## Type parameters

▪ **ReturnType**

## Hierarchy

* Procedure‹TransferErc20ProcedureArgs›

  ↳ **TransferErc20**

## Index

### Constructors

* [constructor](procedures.transfererc20.md#constructor)

### Properties

* [args](procedures.transfererc20.md#protected-args)
* [context](procedures.transfererc20.md#protected-context)
* [type](procedures.transfererc20.md#type)

### Methods

* [addProcedure](procedures.transfererc20.md#addprocedure)
* [addSignatureRequest](procedures.transfererc20.md#addsignaturerequest)
* [addTransaction](procedures.transfererc20.md#addtransaction)
* [prepare](procedures.transfererc20.md#prepare)
* [prepareTransactions](procedures.transfererc20.md#preparetransactions)

## Constructors

###  constructor

\+ **new TransferErc20**(`args`: TransferErc20ProcedureArgs, `context`: [Context](_context_.context.md)): *[TransferErc20](procedures.transfererc20.md)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/procedures/Procedure.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | TransferErc20ProcedureArgs |
`context` | [Context](_context_.context.md) |

**Returns:** *[TransferErc20](procedures.transfererc20.md)*

## Properties

### `Protected` args

• **args**: *TransferErc20ProcedureArgs*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:39](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/procedures/Procedure.ts#L39)*

___

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:41](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/procedures/Procedure.ts#L41)*

___

###  type

• **type**: *ProcedureType* =  ProcedureType.TransferErc20

*Overrides void*

*Defined in [src/procedures/TransferErc20.ts:33](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/procedures/TransferErc20.ts#L33)*

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

*Defined in [src/procedures/TransferErc20.ts:43](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/procedures/TransferErc20.ts#L43)*

Transfer an ERC20 token to another wallet. The token in question defaults to POLY if no address is supplied

Note that the procedure will fail if:
- The owner's token balance is less than the amount being transferred. The only exception to this is when transferring POLY on a testnet.
If that is the case, an extra transaction will be submitted to request the missing amount of tokens from the faucet
- The token being transferred is a Security Token. In that case, the corresponding Security Token transfer procedures should be used

**Returns:** *Promise‹void›*
