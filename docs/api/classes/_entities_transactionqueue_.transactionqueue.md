# Class: TransactionQueue <**Args, ReturnType**>

Class to manage procedural transaction queues

## Type parameters

▪ **Args**: _any_

▪ **ReturnType**: _any_

## Hierarchy

- [Entity](_entities_entity_.entity.md)‹void›

  ↳ **TransactionQueue**

## Index

### Constructors

- [constructor](_entities_transactionqueue_.transactionqueue.md#constructor)

### Properties

- [args](_entities_transactionqueue_.transactionqueue.md#args)
- [entityType](_entities_transactionqueue_.transactionqueue.md#entitytype)
- [error](_entities_transactionqueue_.transactionqueue.md#optional-error)
- [fees](_entities_transactionqueue_.transactionqueue.md#fees)
- [procedureType](_entities_transactionqueue_.transactionqueue.md#proceduretype)
- [status](_entities_transactionqueue_.transactionqueue.md#status)
- [transactions](_entities_transactionqueue_.transactionqueue.md#transactions)
- [uid](_entities_transactionqueue_.transactionqueue.md#uid)

### Methods

- [\_refresh](_entities_transactionqueue_.transactionqueue.md#_refresh)
- [onStatusChange](_entities_transactionqueue_.transactionqueue.md#onstatuschange)
- [onTransactionStatusChange](_entities_transactionqueue_.transactionqueue.md#ontransactionstatuschange)
- [run](_entities_transactionqueue_.transactionqueue.md#run)
- [toPojo](_entities_transactionqueue_.transactionqueue.md#topojo)
- [generateId](_entities_transactionqueue_.transactionqueue.md#static-generateid)

## Constructors

### constructor

\+ **new TransactionQueue**(`transactions`: [TransactionSpec](../interfaces/_types_index_.transactionspec.md)[], `fees`: [Fees](../interfaces/_types_index_.fees.md), `returnValue`: [MaybeResolver](../modules/_types_index_.md#mayberesolver)‹ReturnType›, `args`: Args, `procedureType`: [ProcedureType](../enums/_types_index_.proceduretype.md)): _[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)_

_Defined in [src/entities/TransactionQueue.ts:95](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/TransactionQueue.ts#L95)_

Create a transaction queue

**Parameters:**

| Name            | Type                                                                   | Default                        | Description                                                                                     |
| --------------- | ---------------------------------------------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------- |
| `transactions`  | [TransactionSpec](../interfaces/_types_index_.transactionspec.md)[]    | -                              | list of transactions to be run in this queue                                                    |
| `fees`          | [Fees](../interfaces/_types_index_.fees.md)                            | -                              | -                                                                                               |
| `returnValue`   | [MaybeResolver](../modules/_types_index_.md#mayberesolver)‹ReturnType› | -                              | value that will be returned by the queue after it is run. It can be a Post Transaction Resolver |
| `args`          | Args                                                                   | -                              | arguments with which the Procedure that generated this queue was instanced                      |
| `procedureType` | [ProcedureType](../enums/_types_index_.proceduretype.md)               | ProcedureType.UnnamedProcedure | -                                                                                               |

**Returns:** _[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)_

## Properties

### args

• **args**: _Args_

_Defined in [src/entities/TransactionQueue.ts:65](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/TransactionQueue.ts#L65)_

arguments provided to the transaction queue

---

### entityType

• **entityType**: _string_ = "transactionQueue"

_Defined in [src/entities/TransactionQueue.ts:40](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/TransactionQueue.ts#L40)_

type of entity

---

### `Optional` error

• **error**? : _[Error](_polymatherror_.polymatherror.md#static-error)_

_Defined in [src/entities/TransactionQueue.ts:70](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/TransactionQueue.ts#L70)_

optional error information

---

### fees

• **fees**: _[Fees](../interfaces/_types_index_.fees.md)_

_Defined in [src/entities/TransactionQueue.ts:75](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/TransactionQueue.ts#L75)_

total cost of running the transactions in the queue. This does not include gas

---

### procedureType

• **procedureType**: _[ProcedureType](../enums/_types_index_.proceduretype.md)_

_Defined in [src/entities/TransactionQueue.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/TransactionQueue.ts#L45)_

type of procedure being run

---

### status

• **status**: _TransactionQueueStatus_ = TransactionQueueStatus.Idle

_Defined in [src/entities/TransactionQueue.ts:60](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/TransactionQueue.ts#L60)_

status of the transaction queue

---

### transactions

• **transactions**: _[PolyTransaction](_entities_polytransaction_.polytransaction.md)[]_

_Defined in [src/entities/TransactionQueue.ts:55](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/TransactionQueue.ts#L55)_

array of poly transactions

---

### uid

• **uid**: _string_

_Overrides [Entity](_entities_entity_.entity.md).[uid](_entities_entity_.entity.md#abstract-uid)_

_Defined in [src/entities/TransactionQueue.ts:50](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/TransactionQueue.ts#L50)_

generated transaction queue unique identifier

## Methods

### \_refresh

▸ **\_refresh**(): _void_

_Overrides [Entity](_entities_entity_.entity.md).[\_refresh](_entities_entity_.entity.md#abstract-_refresh)_

_Defined in [src/entities/TransactionQueue.ts:269](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/TransactionQueue.ts#L269)_

Hydrate the entity

**Returns:** _void_

---

### onStatusChange

▸ **onStatusChange**(`listener`: function): _(Anonymous function)_

_Defined in [src/entities/TransactionQueue.ts:188](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/TransactionQueue.ts#L188)_

Subscribe to status changes on the Transaction Queue

**Parameters:**

▪ **listener**: _function_

callback function that will be called whenever the Transaction Queue's status changes

▸ (`transactionQueue`: this): _void_

**Parameters:**

| Name               | Type |
| ------------------ | ---- |
| `transactionQueue` | this |

**Returns:** _(Anonymous function)_

unsubscribe function

---

### onTransactionStatusChange

▸ **onTransactionStatusChange**(`listener`: function): _(Anonymous function)_

_Defined in [src/entities/TransactionQueue.ts:203](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/TransactionQueue.ts#L203)_

Subscribe to status changes on individual transactions

**Parameters:**

▪ **listener**: _function_

callback function that will be called whenever the individual transaction's status changes

▸ (`transaction`: [PolyTransaction](_entities_polytransaction_.polytransaction.md), `transactionQueue`: this): _void_

**Parameters:**

| Name               | Type                                                             |
| ------------------ | ---------------------------------------------------------------- |
| `transaction`      | [PolyTransaction](_entities_polytransaction_.polytransaction.md) |
| `transactionQueue` | this                                                             |

**Returns:** _(Anonymous function)_

unsubscribe function

---

### run

▸ **run**(): _Promise‹ReturnType›_

_Defined in [src/entities/TransactionQueue.ts:155](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/TransactionQueue.ts#L155)_

Run the transactions in the queue

**Returns:** _Promise‹ReturnType›_

---

### toPojo

▸ **toPojo**(): _object_

_Overrides [Entity](_entities_entity_.entity.md).[toPojo](_entities_entity_.entity.md#abstract-topojo)_

_Defined in [src/entities/TransactionQueue.ts:139](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/TransactionQueue.ts#L139)_

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** _object_

- **args**: _Args_

- **fees**: _[Fees](../interfaces/_types_index_.fees.md)_

- **procedureType**: _[ProcedureType](../enums/_types_index_.proceduretype.md)_

- **status**: _TransactionQueueStatus_

- **transactions**: _object[]_ = transactions.map(transaction => transaction.toPojo())

- **uid**: _string_

---

### `Static` generateId

▸ **generateId**(): _string_

_Defined in [src/entities/TransactionQueue.ts:31](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/TransactionQueue.ts#L31)_

Generate UUID for this Transaction Queue

**Returns:** _string_
