# Class: Documents

Namespace that handles all document Related functionality

## Hierarchy

- [SubModule](_entities_securitytoken_submodule_.submodule.md)

  ↳ **Documents**

## Index

### Constructors

- [constructor](_entities_securitytoken_documents_.documents.md#constructor)

### Properties

- [context](_entities_securitytoken_documents_.documents.md#protected-context)
- [securityToken](_entities_securitytoken_documents_.documents.md#protected-securitytoken)

### Methods

- [getAllDocuments](_entities_securitytoken_documents_.documents.md#getalldocuments)
- [getDocument](_entities_securitytoken_documents_.documents.md#getdocument)
- [remove](_entities_securitytoken_documents_.documents.md#remove)
- [set](_entities_securitytoken_documents_.documents.md#set)

## Constructors

### constructor

\+ **new Documents**(`securityToken`: [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md), `context`: [Context](_context_.context.md)): _[Documents](_entities_securitytoken_documents_.documents.md)_

_Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[constructor](_entities_securitytoken_submodule_.submodule.md#constructor)_

_Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/SecurityToken/SubModule.ts#L10)_

Create a new SubModule instance

**Parameters:**

| Name            | Type                                                                     |
| --------------- | ------------------------------------------------------------------------ |
| `securityToken` | [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md) |
| `context`       | [Context](_context_.context.md)                                          |

**Returns:** _[Documents](_entities_securitytoken_documents_.documents.md)_

## Properties

### `Protected` context

• **context**: _[Context](_context_.context.md)_

_Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[context](_entities_securitytoken_submodule_.submodule.md#protected-context)_

_Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/SecurityToken/SubModule.ts#L10)_

---

### `Protected` securityToken

• **securityToken**: _[SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)_

_Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[securityToken](_entities_securitytoken_submodule_.submodule.md#protected-securitytoken)_

_Defined in [src/entities/SecurityToken/SubModule.ts:8](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/SecurityToken/SubModule.ts#L8)_

## Methods

### getAllDocuments

▸ **getAllDocuments**(): _Promise‹[Document](../interfaces/_entities_securitytoken_documents_.document.md)[]›_

_Defined in [src/entities/SecurityToken/Documents.ts:90](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/SecurityToken/Documents.ts#L90)_

Retrieve an array of all the documents attached to the security token

**Returns:** _Promise‹[Document](../interfaces/_entities_securitytoken_documents_.document.md)[]›_

---

### getDocument

▸ **getDocument**(`args`: object): _Promise‹[Document](../interfaces/_entities_securitytoken_documents_.document.md)›_

_Defined in [src/entities/SecurityToken/Documents.ts:61](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/SecurityToken/Documents.ts#L61)_

Retrieve a specific document's data by name

**Parameters:**

▪ **args**: _object_

| Name   | Type   |
| ------ | ------ |
| `name` | string |

**Returns:** _Promise‹[Document](../interfaces/_entities_securitytoken_documents_.document.md)›_

---

### remove

▸ **remove**(`args`: object): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[RemoveDocumentProcedureArgs](../interfaces/_types_index_.removedocumentprocedureargs.md), void››_

_Defined in [src/entities/SecurityToken/Documents.ts:50](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/SecurityToken/Documents.ts#L50)_

Remove an existing document from the Security Token

**Parameters:**

▪ **args**: _object_

| Name   | Type   | Description             |
| ------ | ------ | ----------------------- |
| `name` | string | should always be unique |

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[RemoveDocumentProcedureArgs](../interfaces/_types_index_.removedocumentprocedureargs.md), void››_

---

### set

▸ **set**(`args`: object): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[SetDocumentProcedureArgs](../interfaces/_types_index_.setdocumentprocedureargs.md), void››_

_Defined in [src/entities/SecurityToken/Documents.ts:37](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/SecurityToken/Documents.ts#L37)_

Attach a new document to the contract, or update the URI or hash of an existing attached document

**Parameters:**

▪ **args**: _object_

| Name           | Type   | Description                                                                             |
| -------------- | ------ | --------------------------------------------------------------------------------------- |
| `documentHash` | string | hash of the document's contents                                                         |
| `name`         | string | should always be unique                                                                 |
| `uri`          | string | off-chain uri of the document from where it is accessible to investors/advisors to read |

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[SetDocumentProcedureArgs](../interfaces/_types_index_.setdocumentprocedureargs.md), void››_
