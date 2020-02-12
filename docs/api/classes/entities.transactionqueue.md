# Class: TransactionQueue <**Args, ReturnType**>

Class to manage procedural transaction queues

## Type parameters

▪ **Args**: *any*

▪ **ReturnType**: *any*

## Hierarchy

* [Entity](entities.entity.md)‹void›

  ↳ **TransactionQueue**

## Index

### Constructors

* [constructor](entities.transactionqueue.md#constructor)

### Properties

* [args](entities.transactionqueue.md#args)
* [entityType](entities.transactionqueue.md#entitytype)
* [error](entities.transactionqueue.md#optional-error)
* [fees](entities.transactionqueue.md#fees)
* [procedureType](entities.transactionqueue.md#proceduretype)
* [status](entities.transactionqueue.md#status)
* [transactions](entities.transactionqueue.md#transactions)
* [uid](entities.transactionqueue.md#uid)

### Methods

* [_refresh](entities.transactionqueue.md#_refresh)
* [onStatusChange](entities.transactionqueue.md#onstatuschange)
* [onTransactionStatusChange](entities.transactionqueue.md#ontransactionstatuschange)
* [run](entities.transactionqueue.md#run)
* [toPojo](entities.transactionqueue.md#topojo)
* [generateId](entities.transactionqueue.md#static-generateid)

## Constructors

###  constructor

\+ **new TransactionQueue**(`transactions`: TransactionSpec[], `fees`: Fees, `returnValue`: MaybeResolver‹ReturnType›, `args`: Args, `procedureType`: ProcedureType): *[TransactionQueue](entities.transactionqueue.md)*

*Defined in [src/entities/TransactionQueue.ts:100](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/TransactionQueue.ts#L100)*

Create a transaction queue

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`transactions` | TransactionSpec[] | - | list of transactions to be run in this queue |
`fees` | Fees | - | - |
`returnValue` | MaybeResolver‹ReturnType› | - | value that will be returned by the queue after it is run. It can be a Post Transaction Resolver |
`args` | Args | - | arguments with which the Procedure that generated this queue was instanced  |
`procedureType` | ProcedureType |  ProcedureType.UnnamedProcedure | - |

**Returns:** *[TransactionQueue](entities.transactionqueue.md)*

## Properties

###  args

• **args**: *Args*

*Defined in [src/entities/TransactionQueue.ts:70](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/TransactionQueue.ts#L70)*

arguments provided to the transaction queue

___

###  entityType

• **entityType**: *string* = "transactionQueue"

*Defined in [src/entities/TransactionQueue.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/TransactionQueue.ts#L45)*

type of entity

___

### `Optional` error

• **error**? : *[Error](_polymatherror_.polymatherror.md#static-error)*

*Defined in [src/entities/TransactionQueue.ts:75](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/TransactionQueue.ts#L75)*

optional error information

___

###  fees

• **fees**: *Fees*

*Defined in [src/entities/TransactionQueue.ts:80](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/TransactionQueue.ts#L80)*

total cost of running the transactions in the queue. This does not include gas

___

###  procedureType

• **procedureType**: *ProcedureType*

*Defined in [src/entities/TransactionQueue.ts:50](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/TransactionQueue.ts#L50)*

type of procedure being run

___

###  status

• **status**: *TransactionQueueStatus* =  TransactionQueueStatus.Idle

*Defined in [src/entities/TransactionQueue.ts:65](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/TransactionQueue.ts#L65)*

status of the transaction queue

___

###  transactions

• **transactions**: *[PolyTransaction](entities.polytransaction.md)[]*

*Defined in [src/entities/TransactionQueue.ts:60](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/TransactionQueue.ts#L60)*

array of poly transactions

___

###  uid

• **uid**: *string*

*Overrides [Entity](entities.entity.md).[uid](entities.entity.md#abstract-uid)*

*Defined in [src/entities/TransactionQueue.ts:55](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/TransactionQueue.ts#L55)*

generated transaction queue unique identifier

## Methods

###  _refresh

▸ **_refresh**(): *void*

*Overrides [Entity](entities.entity.md).[_refresh](entities.entity.md#abstract-_refresh)*

*Defined in [src/entities/TransactionQueue.ts:274](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/TransactionQueue.ts#L274)*

Hydrate the entity

**Returns:** *void*

___

###  onStatusChange

▸ **onStatusChange**(`listener`: function): *(Anonymous function)*

*Defined in [src/entities/TransactionQueue.ts:193](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/TransactionQueue.ts#L193)*

Subscribe to status changes on the Transaction Queue

**Parameters:**

▪ **listener**: *function*

callback function that will be called whenever the Transaction Queue's status changes

▸ (`transactionQueue`: this): *void*

**Parameters:**

Name | Type |
------ | ------ |
`transactionQueue` | this |

**Returns:** *(Anonymous function)*

unsubscribe function

___

###  onTransactionStatusChange

▸ **onTransactionStatusChange**(`listener`: function): *(Anonymous function)*

*Defined in [src/entities/TransactionQueue.ts:208](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/TransactionQueue.ts#L208)*

Subscribe to status changes on individual transactions

**Parameters:**

▪ **listener**: *function*

callback function that will be called whenever the individual transaction's status changes

▸ (`transaction`: [PolyTransaction](entities.polytransaction.md), `transactionQueue`: this): *void*

**Parameters:**

Name | Type |
------ | ------ |
`transaction` | [PolyTransaction](entities.polytransaction.md) |
`transactionQueue` | this |

**Returns:** *(Anonymous function)*

unsubscribe function

___

###  run

▸ **run**(): *Promise‹ReturnType›*

*Defined in [src/entities/TransactionQueue.ts:160](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/TransactionQueue.ts#L160)*

Run the transactions in the queue

**Returns:** *Promise‹ReturnType›*

___

###  toPojo

▸ **toPojo**(): *object*

*Overrides [Entity](entities.entity.md).[toPojo](entities.entity.md#abstract-topojo)*

*Defined in [src/entities/TransactionQueue.ts:144](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/TransactionQueue.ts#L144)*

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** *object*

___

### `Static` generateId

▸ **generateId**(): *string*

*Defined in [src/entities/TransactionQueue.ts:36](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/TransactionQueue.ts#L36)*

Generate UUID for this Transaction Queue

**Returns:** *string*
