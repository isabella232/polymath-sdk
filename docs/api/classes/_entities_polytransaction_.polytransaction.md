# Class: PolyTransaction <**Args, Values**>

Wrapper class for a Polymath Transaction

## Type parameters

▪ **Args**

▪ **Values**: *any[]*

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

* [_refresh](_entities_polytransaction_.polytransaction.md#_refresh)
* [onStatusChange](_entities_polytransaction_.polytransaction.md#onstatuschange)
* [run](_entities_polytransaction_.polytransaction.md#run)
* [toPojo](_entities_polytransaction_.polytransaction.md#topojo)
* [generateId](_entities_polytransaction_.polytransaction.md#static-generateid)

## Constructors

###  constructor

\+ **new PolyTransaction**(`transaction`: [TransactionSpec](../interfaces/_types_index_.transactionspec.md)‹Args, Values, TransactionReceiptWithDecodedLogs | string›, `transactionQueue`: [TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹any, any›): *[PolyTransaction](_entities_polytransaction_.polytransaction.md)*

*Defined in [src/entities/PolyTransaction.ts:114](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/PolyTransaction.ts#L114)*

Creates a poly transaction

**Parameters:**

Name | Type |
------ | ------ |
`transaction` | [TransactionSpec](../interfaces/_types_index_.transactionspec.md)‹Args, Values, TransactionReceiptWithDecodedLogs &#124; string› |
`transactionQueue` | [TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹any, any› |

**Returns:** *[PolyTransaction](_entities_polytransaction_.polytransaction.md)*

## Properties

###  args

• **args**: *TransactionSpec<Args, Values, TransactionReceiptWithDecodedLogs | string>["args"]*

*Defined in [src/entities/PolyTransaction.ts:89](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/PolyTransaction.ts#L89)*

arguments with which the transaction will be called

___

### `Optional` error

• **error**? : *[PolymathError](_polymatherror_.polymatherror.md)*

*Defined in [src/entities/PolyTransaction.ts:69](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/PolyTransaction.ts#L69)*

stores errors thrown while running the transaction (if any)

___

###  promise

• **promise**: *Promise‹any›*

*Defined in [src/entities/PolyTransaction.ts:64](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/PolyTransaction.ts#L64)*

internal promise that resolves when the transaction has finished running

___

### `Optional` receipt

• **receipt**? : *TransactionReceiptWithDecodedLogs | string*

*Defined in [src/entities/PolyTransaction.ts:74](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/PolyTransaction.ts#L74)*

stores the transaction receipt (if successful)

___

###  status

• **status**: *[TransactionStatus](../enums/_types_index_.transactionstatus.md)* =  TransactionStatus.Idle

*Defined in [src/entities/PolyTransaction.ts:54](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/PolyTransaction.ts#L54)*

current status of the transaction

___

###  tag

• **tag**: *[PolyTransactionTag](../enums/_types_index_.polytransactiontag.md)*

*Defined in [src/entities/PolyTransaction.ts:79](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/PolyTransaction.ts#L79)*

type of transaction represented by this instance for display purposes

___

###  transactionQueue

• **transactionQueue**: *[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)*

*Defined in [src/entities/PolyTransaction.ts:59](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/PolyTransaction.ts#L59)*

transaction queue to which this transaction belongs

___

### `Optional` txHash

• **txHash**? : *undefined | string*

*Defined in [src/entities/PolyTransaction.ts:84](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/PolyTransaction.ts#L84)*

transaction hash (available after running)

___

###  uid

• **uid**: *string*

*Overrides [Entity](_entities_entity_.entity.md).[uid](_entities_entity_.entity.md#abstract-uid)*

*Defined in [src/entities/PolyTransaction.ts:49](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/PolyTransaction.ts#L49)*

unique generated identifier of the poly transaction

## Methods

###  _refresh

▸ **_refresh**(): *void*

*Overrides [Entity](_entities_entity_.entity.md).[_refresh](_entities_entity_.entity.md#abstract-_refresh)*

*Defined in [src/entities/PolyTransaction.ts:330](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/PolyTransaction.ts#L330)*

Hydrate the entity

**Returns:** *void*

___

###  onStatusChange

▸ **onStatusChange**(`listener`: function): *(Anonymous function)*

*Defined in [src/entities/PolyTransaction.ts:203](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/PolyTransaction.ts#L203)*

Subscribe to status changes

**Parameters:**

▪ **listener**: *function*

callback function that will be called whenever the status changes

▸ (`transaction`: this): *void*

**Parameters:**

Name | Type |
------ | ------ |
`transaction` | this |

**Returns:** *(Anonymous function)*

unsubscribe function

___

###  run

▸ **run**(): *Promise‹void›*

*Defined in [src/entities/PolyTransaction.ts:171](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/PolyTransaction.ts#L171)*

Run the poly transaction and update the transaction status

**Returns:** *Promise‹void›*

___

###  toPojo

▸ **toPojo**(): *object*

*Overrides [Entity](_entities_entity_.entity.md).[toPojo](_entities_entity_.entity.md#abstract-topojo)*

*Defined in [src/entities/PolyTransaction.ts:144](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/PolyTransaction.ts#L144)*

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** *object*

* **args**: *any* =  filteredArgs as any

* **error**: *undefined | [PolymathError](_polymatherror_.polymatherror.md)*

* **receipt**: *undefined | string | TransactionReceiptWithDecodedLogs*

* **status**: *[TransactionStatus](../enums/_types_index_.transactionstatus.md)*

* **tag**: *[PolyTransactionTag](../enums/_types_index_.polytransactiontag.md)*

* **transactionQueueUid**: *string*

* **txHash**: *undefined | string*

* **uid**: *string*

___

### `Static` generateId

▸ **generateId**(): *string*

*Defined in [src/entities/PolyTransaction.ts:40](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/PolyTransaction.ts#L40)*

Generate the Poly Transaction's UUID from its identifying properties

**Returns:** *string*
