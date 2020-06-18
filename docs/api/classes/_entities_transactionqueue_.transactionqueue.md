# TransactionQueue

Class to manage procedural transaction queues

## Type parameters

▪ **Args**: _any_

▪ **ReturnType**: _any_

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

* [\_refresh](_entities_transactionqueue_.transactionqueue.md#_refresh)
* [onStatusChange](_entities_transactionqueue_.transactionqueue.md#onstatuschange)
* [onTransactionStatusChange](_entities_transactionqueue_.transactionqueue.md#ontransactionstatuschange)
* [run](_entities_transactionqueue_.transactionqueue.md#run)
* [toPojo](_entities_transactionqueue_.transactionqueue.md#topojo)
* [generateId](_entities_transactionqueue_.transactionqueue.md#static-generateid)

## Constructors

### constructor

+ **new TransactionQueue**\(`transactions`: [TransactionSpec](../interfaces/_types_index_.transactionspec.md)\[\], `fees`: [Fees](../interfaces/_types_index_.fees.md), `returnValue`: [MaybeResolver](../external-modules/_types_index_.md#mayberesolver)‹ReturnType›, `args`: Args, `procedureType`: [ProcedureType](../enums/_types_index_.proceduretype.md)\): [_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)

_Defined in_ [_src/entities/TransactionQueue.ts:95_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TransactionQueue.ts#L95)

Create a transaction queue

**Parameters:**

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `transactions` | [TransactionSpec](../interfaces/_types_index_.transactionspec.md)\[\] | - | list of transactions to be run in this queue |
| `fees` | [Fees](../interfaces/_types_index_.fees.md) | - | - |
| `returnValue` | [MaybeResolver](../external-modules/_types_index_.md#mayberesolver)‹ReturnType› | - | value that will be returned by the queue after it is run. It can be a Post Transaction Resolver |
| `args` | Args | - | arguments with which the Procedure that generated this queue was instanced |
| `procedureType` | [ProcedureType](../enums/_types_index_.proceduretype.md) | ProcedureType.UnnamedProcedure | - |

**Returns:** [_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)

## Properties

### args

• **args**: _Args_

_Defined in_ [_src/entities/TransactionQueue.ts:65_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TransactionQueue.ts#L65)

arguments provided to the transaction queue

### entityType

• **entityType**: _string_ = "transactionQueue"

_Defined in_ [_src/entities/TransactionQueue.ts:40_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TransactionQueue.ts#L40)

type of entity

### `Optional` error

• **error**? : [_Error_](_polymatherror_.polymatherror.md#static-error)

_Defined in_ [_src/entities/TransactionQueue.ts:70_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TransactionQueue.ts#L70)

optional error information

### fees

• **fees**: [_Fees_](../interfaces/_types_index_.fees.md)

_Defined in_ [_src/entities/TransactionQueue.ts:75_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TransactionQueue.ts#L75)

total cost of running the transactions in the queue. This does not include gas

### procedureType

• **procedureType**: [_ProcedureType_](../enums/_types_index_.proceduretype.md)

_Defined in_ [_src/entities/TransactionQueue.ts:45_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TransactionQueue.ts#L45)

type of procedure being run

### status

• **status**: _TransactionQueueStatus_ = TransactionQueueStatus.Idle

_Defined in_ [_src/entities/TransactionQueue.ts:60_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TransactionQueue.ts#L60)

status of the transaction queue

### transactions

• **transactions**: [_PolyTransaction_](_entities_polytransaction_.polytransaction.md)_\[\]_

_Defined in_ [_src/entities/TransactionQueue.ts:55_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TransactionQueue.ts#L55)

array of poly transactions

### uid

• **uid**: _string_

_Overrides_ [_Entity_](_entities_entity_.entity.md)_._[_uid_](_entities_entity_.entity.md#abstract-uid)

_Defined in_ [_src/entities/TransactionQueue.ts:50_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TransactionQueue.ts#L50)

generated transaction queue unique identifier

## Methods

### \_refresh

▸ **\_refresh**\(\): _void_

_Overrides_ [_Entity_](_entities_entity_.entity.md)_._[_\_refresh_](_entities_entity_.entity.md#abstract-_refresh)

_Defined in_ [_src/entities/TransactionQueue.ts:269_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TransactionQueue.ts#L269)

Hydrate the entity

**Returns:** _void_

### onStatusChange

▸ **onStatusChange**\(`listener`: function\): _\(Anonymous function\)_

_Defined in_ [_src/entities/TransactionQueue.ts:188_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TransactionQueue.ts#L188)

Subscribe to status changes on the Transaction Queue

**Parameters:**

▪ **listener**: _function_

callback function that will be called whenever the Transaction Queue's status changes

▸ \(`transactionQueue`: this\): _void_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `transactionQueue` | this |

**Returns:** _\(Anonymous function\)_

unsubscribe function

### onTransactionStatusChange

▸ **onTransactionStatusChange**\(`listener`: function\): _\(Anonymous function\)_

_Defined in_ [_src/entities/TransactionQueue.ts:203_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TransactionQueue.ts#L203)

Subscribe to status changes on individual transactions

**Parameters:**

▪ **listener**: _function_

callback function that will be called whenever the individual transaction's status changes

▸ \(`transaction`: [PolyTransaction](_entities_polytransaction_.polytransaction.md), `transactionQueue`: this\): _void_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `transaction` | [PolyTransaction](_entities_polytransaction_.polytransaction.md) |
| `transactionQueue` | this |

**Returns:** _\(Anonymous function\)_

unsubscribe function

### run

▸ **run**\(\): _Promise‹ReturnType›_

_Defined in_ [_src/entities/TransactionQueue.ts:155_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TransactionQueue.ts#L155)

Run the transactions in the queue

**Returns:** _Promise‹ReturnType›_

### toPojo

▸ **toPojo**\(\): _object_

_Overrides_ [_Entity_](_entities_entity_.entity.md)_._[_toPojo_](_entities_entity_.entity.md#abstract-topojo)

_Defined in_ [_src/entities/TransactionQueue.ts:139_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TransactionQueue.ts#L139)

Convert entity to a POJO \(Plain Old Javascript Object\)

**Returns:** _object_

* **args**: _Args_
* **fees**: [_Fees_](../interfaces/_types_index_.fees.md)
* **procedureType**: [_ProcedureType_](../enums/_types_index_.proceduretype.md)
* **status**: _TransactionQueueStatus_
* **transactions**: _object\[\]_ = transactions.map\(transaction =&gt; transaction.toPojo\(\)\)
* **uid**: _string_

### `Static` generateId

▸ **generateId**\(\): _string_

_Defined in_ [_src/entities/TransactionQueue.ts:31_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TransactionQueue.ts#L31)

Generate UUID for this Transaction Queue

**Returns:** _string_

