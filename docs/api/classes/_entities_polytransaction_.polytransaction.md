# PolyTransaction

Wrapper class for a Polymath Transaction

## Type parameters

▪ **Args**

▪ **Values**: _any\[\]_

## Hierarchy

* [Entity](_entities_entity_.entity.md)‹void›

  ↳ **PolyTransaction**

## Index

### Constructors

* [constructor](_entities_polytransaction_.polytransaction.md#constructor)

### Properties

* [args](_entities_polytransaction_.polytransaction.md#args)
* [error](_entities_polytransaction_.polytransaction.md#optional-error)
* [promise](_entities_polytransaction_.polytransaction.md#promise)
* [receipt](_entities_polytransaction_.polytransaction.md#optional-receipt)
* [status](_entities_polytransaction_.polytransaction.md#status)
* [tag](_entities_polytransaction_.polytransaction.md#tag)
* [transactionQueue](_entities_polytransaction_.polytransaction.md#transactionqueue)
* [txHash](_entities_polytransaction_.polytransaction.md#optional-txhash)
* [uid](_entities_polytransaction_.polytransaction.md#uid)

### Methods

* [\_refresh](_entities_polytransaction_.polytransaction.md#_refresh)
* [onStatusChange](_entities_polytransaction_.polytransaction.md#onstatuschange)
* [run](_entities_polytransaction_.polytransaction.md#run)
* [toPojo](_entities_polytransaction_.polytransaction.md#topojo)
* [generateId](_entities_polytransaction_.polytransaction.md#static-generateid)

## Constructors

### constructor

+ **new PolyTransaction**\(`transaction`: [TransactionSpec](../interfaces/_types_index_.transactionspec.md)‹Args, Values, TransactionReceiptWithDecodedLogs \| string›, `transactionQueue`: [TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹any, any›\): [_PolyTransaction_](_entities_polytransaction_.polytransaction.md)

_Defined in_ [_src/entities/PolyTransaction.ts:114_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/PolyTransaction.ts#L114)

Creates a poly transaction

**Parameters:**

| Name | Type |
| :--- | :--- |
| `transaction` | [TransactionSpec](../interfaces/_types_index_.transactionspec.md)‹Args, Values, TransactionReceiptWithDecodedLogs \| string› |
| `transactionQueue` | [TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹any, any› |

**Returns:** [_PolyTransaction_](_entities_polytransaction_.polytransaction.md)

## Properties

### args

• **args**: _TransactionSpec\["args"\]_

_Defined in_ [_src/entities/PolyTransaction.ts:89_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/PolyTransaction.ts#L89)

arguments with which the transaction will be called

### `Optional` error

• **error**? : [_PolymathError_](_polymatherror_.polymatherror.md)

_Defined in_ [_src/entities/PolyTransaction.ts:69_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/PolyTransaction.ts#L69)

stores errors thrown while running the transaction \(if any\)

### promise

• **promise**: _Promise‹any›_

_Defined in_ [_src/entities/PolyTransaction.ts:64_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/PolyTransaction.ts#L64)

internal promise that resolves when the transaction has finished running

### `Optional` receipt

• **receipt**? : _TransactionReceiptWithDecodedLogs \| string_

_Defined in_ [_src/entities/PolyTransaction.ts:74_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/PolyTransaction.ts#L74)

stores the transaction receipt \(if successful\)

### status

• **status**: [_TransactionStatus_](../enums/_types_index_.transactionstatus.md) = TransactionStatus.Idle

_Defined in_ [_src/entities/PolyTransaction.ts:54_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/PolyTransaction.ts#L54)

current status of the transaction

### tag

• **tag**: [_PolyTransactionTag_](../enums/_types_index_.polytransactiontag.md)

_Defined in_ [_src/entities/PolyTransaction.ts:79_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/PolyTransaction.ts#L79)

type of transaction represented by this instance for display purposes

### transactionQueue

• **transactionQueue**: [_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)

_Defined in_ [_src/entities/PolyTransaction.ts:59_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/PolyTransaction.ts#L59)

transaction queue to which this transaction belongs

### `Optional` txHash

• **txHash**? : _undefined \| string_

_Defined in_ [_src/entities/PolyTransaction.ts:84_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/PolyTransaction.ts#L84)

transaction hash \(available after running\)

### uid

• **uid**: _string_

_Overrides_ [_Entity_](_entities_entity_.entity.md)_._[_uid_](_entities_entity_.entity.md#abstract-uid)

_Defined in_ [_src/entities/PolyTransaction.ts:49_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/PolyTransaction.ts#L49)

unique generated identifier of the poly transaction

## Methods

### \_refresh

▸ **\_refresh**\(\): _void_

_Overrides_ [_Entity_](_entities_entity_.entity.md)_._[_\_refresh_](_entities_entity_.entity.md#abstract-_refresh)

_Defined in_ [_src/entities/PolyTransaction.ts:330_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/PolyTransaction.ts#L330)

Hydrate the entity

**Returns:** _void_

### onStatusChange

▸ **onStatusChange**\(`listener`: function\): _\(Anonymous function\)_

_Defined in_ [_src/entities/PolyTransaction.ts:203_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/PolyTransaction.ts#L203)

Subscribe to status changes

**Parameters:**

▪ **listener**: _function_

callback function that will be called whenever the status changes

▸ \(`transaction`: this\): _void_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `transaction` | this |

**Returns:** _\(Anonymous function\)_

unsubscribe function

### run

▸ **run**\(\): _Promise‹void›_

_Defined in_ [_src/entities/PolyTransaction.ts:171_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/PolyTransaction.ts#L171)

Run the poly transaction and update the transaction status

**Returns:** _Promise‹void›_

### toPojo

▸ **toPojo**\(\): _object_

_Overrides_ [_Entity_](_entities_entity_.entity.md)_._[_toPojo_](_entities_entity_.entity.md#abstract-topojo)

_Defined in_ [_src/entities/PolyTransaction.ts:144_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/PolyTransaction.ts#L144)

Convert entity to a POJO \(Plain Old Javascript Object\)

**Returns:** _object_

* **args**: _any_ = filteredArgs as any
* **error**: _undefined \|_ [_PolymathError_](_polymatherror_.polymatherror.md)
* **receipt**: _undefined \| string \| TransactionReceiptWithDecodedLogs_
* **status**: [_TransactionStatus_](../enums/_types_index_.transactionstatus.md)
* **tag**: [_PolyTransactionTag_](../enums/_types_index_.polytransactiontag.md)
* **transactionQueueUid**: _string_
* **txHash**: _undefined \| string_
* **uid**: _string_

### `Static` generateId

▸ **generateId**\(\): _string_

_Defined in_ [_src/entities/PolyTransaction.ts:40_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/PolyTransaction.ts#L40)

Generate the Poly Transaction's UUID from its identifying properties

**Returns:** _string_

