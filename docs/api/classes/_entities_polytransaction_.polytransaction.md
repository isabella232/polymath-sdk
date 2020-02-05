# Class: PolyTransaction <**Args, Values**>

Wrapper class for a Polymath Transaction

## Type parameters

▪ **Args**

▪ **Values**: _any[]_

## Hierarchy

- [Entity](_entities_entity_.entity.md)‹void›

  ↳ **PolyTransaction**

## Index

### Constructors

- [constructor](_entities_polytransaction_.polytransaction.md#constructor)

### Properties

- [args](_entities_polytransaction_.polytransaction.md#args)
- [error](_entities_polytransaction_.polytransaction.md#optional-error)
- [promise](_entities_polytransaction_.polytransaction.md#promise)
- [receipt](_entities_polytransaction_.polytransaction.md#optional-receipt)
- [status](_entities_polytransaction_.polytransaction.md#status)
- [tag](_entities_polytransaction_.polytransaction.md#tag)
- [transactionQueue](_entities_polytransaction_.polytransaction.md#transactionqueue)
- [txHash](_entities_polytransaction_.polytransaction.md#optional-txhash)
- [uid](_entities_polytransaction_.polytransaction.md#uid)

### Methods

- [\_refresh](_entities_polytransaction_.polytransaction.md#_refresh)
- [onStatusChange](_entities_polytransaction_.polytransaction.md#onstatuschange)
- [run](_entities_polytransaction_.polytransaction.md#run)
- [toPojo](_entities_polytransaction_.polytransaction.md#topojo)
- [generateId](_entities_polytransaction_.polytransaction.md#static-generateid)

## Constructors

### constructor

\+ **new PolyTransaction**(`transaction`: [TransactionSpec](../interfaces/_types_index_.transactionspec.md)‹Args, Values, TransactionReceiptWithDecodedLogs | string›, `transactionQueue`: [TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹any, any›): _[PolyTransaction](_entities_polytransaction_.polytransaction.md)_

_Defined in [src/entities/PolyTransaction.ts:114](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/PolyTransaction.ts#L114)_

Creates a poly transaction

**Parameters:**

| Name               | Type                                                                                                                             |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `transaction`      | [TransactionSpec](../interfaces/_types_index_.transactionspec.md)‹Args, Values, TransactionReceiptWithDecodedLogs &#124; string› |
| `transactionQueue` | [TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹any, any›                                                    |

**Returns:** _[PolyTransaction](_entities_polytransaction_.polytransaction.md)_

## Properties

### args

• **args**: _TransactionSpec<Args, Values, TransactionReceiptWithDecodedLogs | string>["args"]_

_Defined in [src/entities/PolyTransaction.ts:89](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/PolyTransaction.ts#L89)_

arguments with which the transaction will be called

---

### `Optional` error

• **error**? : _[PolymathError](_polymatherror_.polymatherror.md)_

_Defined in [src/entities/PolyTransaction.ts:69](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/PolyTransaction.ts#L69)_

stores errors thrown while running the transaction (if any)

---

### promise

• **promise**: _Promise‹any›_

_Defined in [src/entities/PolyTransaction.ts:64](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/PolyTransaction.ts#L64)_

internal promise that resolves when the transaction has finished running

---

### `Optional` receipt

• **receipt**? : _TransactionReceiptWithDecodedLogs | string_

_Defined in [src/entities/PolyTransaction.ts:74](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/PolyTransaction.ts#L74)_

stores the transaction receipt (if successful)

---

### status

• **status**: _[TransactionStatus](../enums/_types_index_.transactionstatus.md)_ = TransactionStatus.Idle

_Defined in [src/entities/PolyTransaction.ts:54](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/PolyTransaction.ts#L54)_

current status of the transaction

---

### tag

• **tag**: _[PolyTransactionTag](../enums/_types_index_.polytransactiontag.md)_

_Defined in [src/entities/PolyTransaction.ts:79](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/PolyTransaction.ts#L79)_

type of transaction represented by this instance for display purposes

---

### transactionQueue

• **transactionQueue**: _[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)_

_Defined in [src/entities/PolyTransaction.ts:59](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/PolyTransaction.ts#L59)_

transaction queue to which this transaction belongs

---

### `Optional` txHash

• **txHash**? : _undefined | string_

_Defined in [src/entities/PolyTransaction.ts:84](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/PolyTransaction.ts#L84)_

transaction hash (available after running)

---

### uid

• **uid**: _string_

_Overrides [Entity](_entities_entity_.entity.md).[uid](_entities_entity_.entity.md#abstract-uid)_

_Defined in [src/entities/PolyTransaction.ts:49](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/PolyTransaction.ts#L49)_

unique generated identifier of the poly transaction

## Methods

### \_refresh

▸ **\_refresh**(): _void_

_Overrides [Entity](_entities_entity_.entity.md).[\_refresh](_entities_entity_.entity.md#abstract-_refresh)_

_Defined in [src/entities/PolyTransaction.ts:330](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/PolyTransaction.ts#L330)_

Hydrate the entity

**Returns:** _void_

---

### onStatusChange

▸ **onStatusChange**(`listener`: function): _(Anonymous function)_

_Defined in [src/entities/PolyTransaction.ts:203](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/PolyTransaction.ts#L203)_

Subscribe to status changes

**Parameters:**

▪ **listener**: _function_

callback function that will be called whenever the status changes

▸ (`transaction`: this): _void_

**Parameters:**

| Name          | Type |
| ------------- | ---- |
| `transaction` | this |

**Returns:** _(Anonymous function)_

unsubscribe function

---

### run

▸ **run**(): _Promise‹void›_

_Defined in [src/entities/PolyTransaction.ts:171](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/PolyTransaction.ts#L171)_

Run the poly transaction and update the transaction status

**Returns:** _Promise‹void›_

---

### toPojo

▸ **toPojo**(): _object_

_Overrides [Entity](_entities_entity_.entity.md).[toPojo](_entities_entity_.entity.md#abstract-topojo)_

_Defined in [src/entities/PolyTransaction.ts:144](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/PolyTransaction.ts#L144)_

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** _object_

- **args**: _any_ = filteredArgs as any

- **error**: _undefined | [PolymathError](_polymatherror_.polymatherror.md)_

- **receipt**: _undefined | string | TransactionReceiptWithDecodedLogs_

- **status**: _[TransactionStatus](../enums/_types_index_.transactionstatus.md)_

- **tag**: _[PolyTransactionTag](../enums/_types_index_.polytransactiontag.md)_

- **transactionQueueUid**: _string_

- **txHash**: _undefined | string_

- **uid**: _string_

---

### `Static` generateId

▸ **generateId**(): _string_

_Defined in [src/entities/PolyTransaction.ts:40](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/PolyTransaction.ts#L40)_

Generate the Poly Transaction's UUID from its identifying properties

**Returns:** _string_
