# Class: CreateSecurityToken

Procedure that creates a new Security Token on the Polymath ecosystem

## Hierarchy

* Procedure‹CreateSecurityTokenProcedureArgs, [SecurityToken](entities.securitytoken.securitytoken.md)›

  ↳ **CreateSecurityToken**

## Index

### Constructors

* [constructor](procedures.createsecuritytoken.md#constructor)

### Properties

* [args](procedures.createsecuritytoken.md#protected-args)
* [context](procedures.createsecuritytoken.md#protected-context)
* [type](procedures.createsecuritytoken.md#type)

### Methods

* [addProcedure](procedures.createsecuritytoken.md#addprocedure)
* [addSignatureRequest](procedures.createsecuritytoken.md#addsignaturerequest)
* [addTransaction](procedures.createsecuritytoken.md#addtransaction)
* [prepare](procedures.createsecuritytoken.md#prepare)
* [prepareTransactions](procedures.createsecuritytoken.md#preparetransactions)

## Constructors

###  constructor

\+ **new CreateSecurityToken**(`args`: CreateSecurityTokenProcedureArgs, `context`: [Context](_context_.context.md)): *[CreateSecurityToken](procedures.createsecuritytoken.md)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/procedures/Procedure.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | CreateSecurityTokenProcedureArgs |
`context` | [Context](_context_.context.md) |

**Returns:** *[CreateSecurityToken](procedures.createsecuritytoken.md)*

## Properties

### `Protected` args

• **args**: *CreateSecurityTokenProcedureArgs*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:39](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/procedures/Procedure.ts#L39)*

___

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:41](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/procedures/Procedure.ts#L41)*

___

###  type

• **type**: *ProcedureType* =  ProcedureType.CreateSecurityToken

*Overrides void*

*Defined in [src/procedures/CreateSecurityToken.ts:25](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/procedures/CreateSecurityToken.ts#L25)*

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

▸ **prepareTransactions**(): *Promise‹PostTransactionResolver‹[SecurityToken](entities.securitytoken.securitytoken.md), TransactionReceiptWithDecodedLogs››*

*Overrides void*

*Defined in [src/procedures/CreateSecurityToken.ts:36](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/procedures/CreateSecurityToken.ts#L36)*

- Approve spending the required POLY to pay the Security Token launch fee
- Create the new Security Token

Note that this procedure will fail if:
- The Security Token symbol hasn't been reserved
- The Security Token symbol has already been reserved by another issuer
- The Security Token already been launched

**Returns:** *Promise‹PostTransactionResolver‹[SecurityToken](entities.securitytoken.securitytoken.md), TransactionReceiptWithDecodedLogs››*
