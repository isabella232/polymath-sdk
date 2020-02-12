# Class: FreezeIssuance <**ReturnType**>

Procedure that permanently freezes issuance of a Security Token. This requires the Security Token's owner to send signed data in acknowledgement

## Type parameters

▪ **ReturnType**

## Hierarchy

* Procedure‹FreezeIssuanceProcedureArgs›

  ↳ **FreezeIssuance**

## Index

### Constructors

* [constructor](procedures.freezeissuance.md#constructor)

### Properties

* [args](procedures.freezeissuance.md#protected-args)
* [context](procedures.freezeissuance.md#protected-context)
* [type](procedures.freezeissuance.md#type)

### Methods

* [addProcedure](procedures.freezeissuance.md#addprocedure)
* [addSignatureRequest](procedures.freezeissuance.md#addsignaturerequest)
* [addTransaction](procedures.freezeissuance.md#addtransaction)
* [prepare](procedures.freezeissuance.md#prepare)
* [prepareTransactions](procedures.freezeissuance.md#preparetransactions)

## Constructors

###  constructor

\+ **new FreezeIssuance**(`args`: FreezeIssuanceProcedureArgs, `context`: [Context](_context_.context.md)): *[FreezeIssuance](procedures.freezeissuance.md)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/procedures/Procedure.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | FreezeIssuanceProcedureArgs |
`context` | [Context](_context_.context.md) |

**Returns:** *[FreezeIssuance](procedures.freezeissuance.md)*

## Properties

### `Protected` args

• **args**: *FreezeIssuanceProcedureArgs*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:39](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/procedures/Procedure.ts#L39)*

___

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from void*

*Defined in [src/procedures/Procedure.ts:41](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/procedures/Procedure.ts#L41)*

___

###  type

• **type**: *ProcedureType* =  ProcedureType.FreezeIssuance

*Overrides void*

*Defined in [src/procedures/FreezeIssuance.ts:19](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/procedures/FreezeIssuance.ts#L19)*

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

*Defined in [src/procedures/FreezeIssuance.ts:29](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/procedures/FreezeIssuance.ts#L29)*

- If no signature acknowledgement data (optional) is appended to the procedure arguments, the procedure itself will request the user's signature or sign the data in place if the client was instanced with a private key
- Freeze the issuance of the Security Token

Note this procedure will fail if:
- The current user is not the owner of the Security Token
- Issuance has already been frozen

**Returns:** *Promise‹void›*
