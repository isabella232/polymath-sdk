# Class: TransactionQueue <**Args, ReturnType**>

Class to manage procedural transaction queues

## Type parameters

▪ **Args**: *any*

▪ **ReturnType**: *any*

## Hierarchy

* [Entity](_entities_entity_.entity.md)‹void›

  ↳ **TransactionQueue**

## Index

### Constructors

* [constructor](_entities_transactionqueue_.transactionqueue.md#constructor)

### Properties

* [args](_entities_transactionqueue_.transactionqueue.md#args)
* [entityType](_entities_transactionqueue_.transactionqueue.md#entitytype)
* [error](_entities_transactionqueue_.transactionqueue.md#optional-error)
* [fees](_entities_transactionqueue_.transactionqueue.md#fees)
* [procedureType](_entities_transactionqueue_.transactionqueue.md#proceduretype)
* [status](_entities_transactionqueue_.transactionqueue.md#status)
* [transactions](_entities_transactionqueue_.transactionqueue.md#transactions)
* [uid](_entities_transactionqueue_.transactionqueue.md#uid)

### Methods

* [_refresh](_entities_transactionqueue_.transactionqueue.md#_refresh)
* [onStatusChange](_entities_transactionqueue_.transactionqueue.md#onstatuschange)
* [onTransactionStatusChange](_entities_transactionqueue_.transactionqueue.md#ontransactionstatuschange)
* [run](_entities_transactionqueue_.transactionqueue.md#run)
* [toPojo](_entities_transactionqueue_.transactionqueue.md#topojo)
* [generateId](_entities_transactionqueue_.transactionqueue.md#static-generateid)

## Constructors

###  constructor

\+ **new TransactionQueue**(`transactions`: [TransactionSpec](../interfaces/_types_index_.transactionspec.md)[], `fees`: [Fees](../interfaces/_types_index_.fees.md), `returnValue`: [MaybeResolver](../modules/_types_index_.md#mayberesolver)‹ReturnType›, `args`: Args, `procedureType`: [ProcedureType](../enums/_types_index_.proceduretype.md)): *[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)*

*Defined in [src/entities/TransactionQueue.ts:95](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/TransactionQueue.ts#L95)*

Create a transaction queue

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`transactions` | [TransactionSpec](../interfaces/_types_index_.transactionspec.md)[] | - | list of transactions to be run in this queue |
`fees` | [Fees](../interfaces/_types_index_.fees.md) | - | - |
`returnValue` | [MaybeResolver](../modules/_types_index_.md#mayberesolver)‹ReturnType› | - | value that will be returned by the queue after it is run. It can be a Post Transaction Resolver |
`args` | Args | - | arguments with which the Procedure that generated this queue was instanced  |
`procedureType` | [ProcedureType](../enums/_types_index_.proceduretype.md) |  ProcedureType.UnnamedProcedure | - |

**Returns:** *[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)*

## Properties

###  args

• **args**: *Args*

*Defined in [src/entities/TransactionQueue.ts:65](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/TransactionQueue.ts#L65)*

arguments provided to the transaction queue

___

###  entityType

• **entityType**: *string* = "transactionQueue"

*Defined in [src/entities/TransactionQueue.ts:40](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/TransactionQueue.ts#L40)*

type of entity

___

### `Optional` error

• **error**? : *[Error](_polymatherror_.polymatherror.md#static-error)*

*Defined in [src/entities/TransactionQueue.ts:70](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/TransactionQueue.ts#L70)*

optional error information

___

###  fees

• **fees**: *[Fees](../interfaces/_types_index_.fees.md)*

*Defined in [src/entities/TransactionQueue.ts:75](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/TransactionQueue.ts#L75)*

total cost of running the transactions in the queue. This does not include gas

___

###  procedureType

• **procedureType**: *[ProcedureType](../enums/_types_index_.proceduretype.md)*

*Defined in [src/entities/TransactionQueue.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/TransactionQueue.ts#L45)*

type of procedure being run

___

###  status

• **status**: *TransactionQueueStatus* =  TransactionQueueStatus.Idle

*Defined in [src/entities/TransactionQueue.ts:60](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/TransactionQueue.ts#L60)*

status of the transaction queue

___

###  transactions

• **transactions**: *[PolyTransaction](_entities_polytransaction_.polytransaction.md)[]*

*Defined in [src/entities/TransactionQueue.ts:55](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/TransactionQueue.ts#L55)*

array of poly transactions

___

###  uid

• **uid**: *string*

*Overrides [Entity](_entities_entity_.entity.md).[uid](_entities_entity_.entity.md#abstract-uid)*

*Defined in [src/entities/TransactionQueue.ts:50](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/TransactionQueue.ts#L50)*

generated transaction queue unique identifier

## Methods

###  _refresh

▸ **_refresh**(): *void*

*Overrides [Entity](_entities_entity_.entity.md).[_refresh](_entities_entity_.entity.md#abstract-_refresh)*

*Defined in [src/entities/TransactionQueue.ts:269](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/TransactionQueue.ts#L269)*

Hydrate the entity

**Returns:** *void*

___

###  onStatusChange

▸ **onStatusChange**(`listener`: function): *(Anonymous function)*

*Defined in [src/entities/TransactionQueue.ts:188](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/TransactionQueue.ts#L188)*

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

*Defined in [src/entities/TransactionQueue.ts:203](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/TransactionQueue.ts#L203)*

Subscribe to status changes on individual transactions

**Parameters:**

▪ **listener**: *function*

callback function that will be called whenever the individual transaction's status changes

▸ (`transaction`: [PolyTransaction](_entities_polytransaction_.polytransaction.md), `transactionQueue`: this): *void*

**Parameters:**

Name | Type |
------ | ------ |
`transaction` | [PolyTransaction](_entities_polytransaction_.polytransaction.md) |
`transactionQueue` | this |

**Returns:** *(Anonymous function)*

unsubscribe function

___

###  run

▸ **run**(): *Promise‹ReturnType›*

*Defined in [src/entities/TransactionQueue.ts:155](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/TransactionQueue.ts#L155)*

Run the transactions in the queue

**Returns:** *Promise‹ReturnType›*

___

###  toPojo

▸ **toPojo**(): *object*

*Overrides [Entity](_entities_entity_.entity.md).[toPojo](_entities_entity_.entity.md#abstract-topojo)*

*Defined in [src/entities/TransactionQueue.ts:139](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/TransactionQueue.ts#L139)*

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** *object*

* **args**: *Args*

* **fees**: *[Fees](../interfaces/_types_index_.fees.md)*

* **procedureType**: *[ProcedureType](../enums/_types_index_.proceduretype.md)*

* **status**: *TransactionQueueStatus*

* **transactions**: *object[]* =  transactions.map(transaction => transaction.toPojo())

* **uid**: *string*

___

### `Static` generateId

▸ **generateId**(): *string*

*Defined in [src/entities/TransactionQueue.ts:31](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/TransactionQueue.ts#L31)*

Generate UUID for this Transaction Queue

**Returns:** *string*
