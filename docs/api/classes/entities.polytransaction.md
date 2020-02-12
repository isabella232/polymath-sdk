# Class: PolyTransaction <**Args, Values**>

Wrapper class for a Polymath Transaction

## Type parameters

▪ **Args**

▪ **Values**: *any[]*

## Hierarchy

* [Entity](entities.entity.md)‹void›

  ↳ **PolyTransaction**

## Index

### Constructors

* [constructor](entities.polytransaction.md#constructor)

### Properties

* [args](entities.polytransaction.md#args)
* [error](entities.polytransaction.md#optional-error)
* [promise](entities.polytransaction.md#promise)
* [receipt](entities.polytransaction.md#optional-receipt)
* [status](entities.polytransaction.md#status)
* [tag](entities.polytransaction.md#tag)
* [transactionQueue](entities.polytransaction.md#transactionqueue)
* [txHash](entities.polytransaction.md#optional-txhash)
* [uid](entities.polytransaction.md#uid)

### Methods

* [_refresh](entities.polytransaction.md#_refresh)
* [onStatusChange](entities.polytransaction.md#onstatuschange)
* [run](entities.polytransaction.md#run)
* [toPojo](entities.polytransaction.md#topojo)
* [generateId](entities.polytransaction.md#static-generateid)

## Constructors

###  constructor

\+ **new PolyTransaction**(`transaction`: TransactionSpec‹Args, Values, TransactionReceiptWithDecodedLogs | string›, `transactionQueue`: [TransactionQueue](entities.transactionqueue.md)‹any, any›): *[PolyTransaction](entities.polytransaction.md)*

*Defined in [src/entities/PolyTransaction.ts:119](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/PolyTransaction.ts#L119)*

Creates a poly transaction

**Parameters:**

Name | Type |
------ | ------ |
`transaction` | TransactionSpec‹Args, Values, TransactionReceiptWithDecodedLogs &#124; string› |
`transactionQueue` | [TransactionQueue](entities.transactionqueue.md)‹any, any› |

**Returns:** *[PolyTransaction](entities.polytransaction.md)*

## Properties

###  args

• **args**: *TransactionSpec<Args, Values, TransactionReceiptWithDecodedLogs | string>["args"]*

*Defined in [src/entities/PolyTransaction.ts:94](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/PolyTransaction.ts#L94)*

arguments with which the transaction will be called

___

### `Optional` error

• **error**? : *[PolymathError](_polymatherror_.polymatherror.md)*

*Defined in [src/entities/PolyTransaction.ts:74](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/PolyTransaction.ts#L74)*

stores errors thrown while running the transaction (if any)

___

###  promise

• **promise**: *Promise‹any›*

*Defined in [src/entities/PolyTransaction.ts:69](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/PolyTransaction.ts#L69)*

internal promise that resolves when the transaction has finished running

___

### `Optional` receipt

• **receipt**? : *TransactionReceiptWithDecodedLogs | string*

*Defined in [src/entities/PolyTransaction.ts:79](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/PolyTransaction.ts#L79)*

stores the transaction receipt (if successful)

___

###  status

• **status**: *TransactionStatus* =  TransactionStatus.Idle

*Defined in [src/entities/PolyTransaction.ts:59](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/PolyTransaction.ts#L59)*

current status of the transaction

___

###  tag

• **tag**: *PolyTransactionTag*

*Defined in [src/entities/PolyTransaction.ts:84](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/PolyTransaction.ts#L84)*

type of transaction represented by this instance for display purposes

___

###  transactionQueue

• **transactionQueue**: *[TransactionQueue](entities.transactionqueue.md)*

*Defined in [src/entities/PolyTransaction.ts:64](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/PolyTransaction.ts#L64)*

transaction queue to which this transaction belongs

___

### `Optional` txHash

• **txHash**? : *undefined | string*

*Defined in [src/entities/PolyTransaction.ts:89](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/PolyTransaction.ts#L89)*

transaction hash (available after running)

___

###  uid

• **uid**: *string*

*Overrides [Entity](entities.entity.md).[uid](entities.entity.md#abstract-uid)*

*Defined in [src/entities/PolyTransaction.ts:54](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/PolyTransaction.ts#L54)*

unique generated identifier of the poly transaction

## Methods

###  _refresh

▸ **_refresh**(): *void*

*Overrides [Entity](entities.entity.md).[_refresh](entities.entity.md#abstract-_refresh)*

*Defined in [src/entities/PolyTransaction.ts:335](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/PolyTransaction.ts#L335)*

Hydrate the entity

**Returns:** *void*

___

###  onStatusChange

▸ **onStatusChange**(`listener`: function): *(Anonymous function)*

*Defined in [src/entities/PolyTransaction.ts:208](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/PolyTransaction.ts#L208)*

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

*Defined in [src/entities/PolyTransaction.ts:176](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/PolyTransaction.ts#L176)*

Run the poly transaction and update the transaction status

**Returns:** *Promise‹void›*

___

###  toPojo

▸ **toPojo**(): *object*

*Overrides [Entity](entities.entity.md).[toPojo](entities.entity.md#abstract-topojo)*

*Defined in [src/entities/PolyTransaction.ts:149](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/PolyTransaction.ts#L149)*

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** *object*

___

### `Static` generateId

▸ **generateId**(): *string*

*Defined in [src/entities/PolyTransaction.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/PolyTransaction.ts#L45)*

Generate the Poly Transaction's UUID from its identifying properties

**Returns:** *string*
