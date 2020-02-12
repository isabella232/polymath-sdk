# Class: IssueTokens

Procedure that issues tokens to the specified addresses. KYC data for those addresses must already exist or otherwise be provided in this procedure

## Hierarchy

* Procedure‹IssueTokensProcedureArgs, [Shareholder](entities.shareholder.md)[]›

  ↳ **IssueTokens**

## Index

### Constructors

* [constructor](procedures.issuetokens.md#constructor)

### Properties

* [args](procedures.issuetokens.md#protected-args)
* [context](procedures.issuetokens.md#protected-context)
* [type](procedures.issuetokens.md#type)

### Methods

* [addProcedure](procedures.issuetokens.md#addprocedure)
* [addSignatureRequest](procedures.issuetokens.md#addsignaturerequest)
* [addTransaction](procedures.issuetokens.md#addtransaction)
* [prepare](procedures.issuetokens.md#prepare)
* [prepareTransactions](procedures.issuetokens.md#preparetransactions)

## Constructors

###  constructor

\+ **new IssueTokens**(`args`: IssueTokensProcedureArgs, `context`: [Context](_context_.context.md)): *[IssueTokens](procedures.issuetokens.md)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/procedures/Procedure.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | IssueTokensProcedureArgs |
`context` | [Context](_context_.context.md) |

**Returns:** *[IssueTokens](procedures.issuetokens.md)*

## Properties

### `Protected` args

• **args**: *IssueTokensProcedureArgs*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:39](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/procedures/Procedure.ts#L39)*

___

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:41](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/procedures/Procedure.ts#L41)*

___

###  type

• **type**: *ProcedureType* =  ProcedureType.IssueTokens

*Overrides void*

*Defined in [src/procedures/IssueTokens.ts:41](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/procedures/IssueTokens.ts#L41)*

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

*Defined in [src/procedures/IssueTokens.ts:52](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/procedures/IssueTokens.ts#L52)*

Issue the specified amounts to the corresponding addresses
If KYC data is provided, transfer restrictions will not be checked before submitting the issuing transaction
This means that if one of the wallets on the list doesn't clear transfer restrictions, the transaction will revert

Note that this procedure will fail if:
- The Security Token doesn't exist
- At least one wallet address doesn't clear transfer restrictions. This check is bypassed if new KYC data is provided

**Returns:** *Promise‹PostTransactionResolver‹[Shareholder](entities.shareholder.md)[], TransactionReceiptWithDecodedLogs››*
