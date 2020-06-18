# Documents

Namespace that handles all document Related functionality

## Hierarchy

* [SubModule](_entities_securitytoken_submodule_.submodule.md)

  ↳ **Documents**

## Index

### Constructors

* [constructor](_entities_securitytoken_documents_.documents.md#constructor)

### Properties

* [context](_entities_securitytoken_documents_.documents.md#protected-context)
* [securityToken](_entities_securitytoken_documents_.documents.md#protected-securitytoken)

### Methods

* [getAllDocuments](_entities_securitytoken_documents_.documents.md#getalldocuments)
* [getDocument](_entities_securitytoken_documents_.documents.md#getdocument)
* [remove](_entities_securitytoken_documents_.documents.md#remove)
* [set](_entities_securitytoken_documents_.documents.md#set)

## Constructors

### constructor

+ **new Documents**\(`securityToken`: [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md), `context`: [Context](_context_.context.md)\): [_Documents_](_entities_securitytoken_documents_.documents.md)

_Inherited from_ [_SubModule_](_entities_securitytoken_submodule_.submodule.md)_._[_constructor_](_entities_securitytoken_submodule_.submodule.md#constructor)

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:10_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SubModule.ts#L10)

Create a new SubModule instance

**Parameters:**

| Name | Type |
| :--- | :--- |
| `securityToken` | [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md) |
| `context` | [Context](_context_.context.md) |

**Returns:** [_Documents_](_entities_securitytoken_documents_.documents.md)

## Properties

### `Protected` context

• **context**: [_Context_](_context_.context.md)

_Inherited from_ [_SubModule_](_entities_securitytoken_submodule_.submodule.md)_._[_context_](_entities_securitytoken_submodule_.submodule.md#protected-context)

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:10_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SubModule.ts#L10)

### `Protected` securityToken

• **securityToken**: [_SecurityToken_](_entities_securitytoken_securitytoken_.securitytoken.md)

_Inherited from_ [_SubModule_](_entities_securitytoken_submodule_.submodule.md)_._[_securityToken_](_entities_securitytoken_submodule_.submodule.md#protected-securitytoken)

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:8_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SubModule.ts#L8)

## Methods

### getAllDocuments

▸ **getAllDocuments**\(\): _Promise‹_[_Document_](../interfaces/_entities_securitytoken_documents_.document.md)_\[\]›_

_Defined in_ [_src/entities/SecurityToken/Documents.ts:90_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Documents.ts#L90)

Retrieve an array of all the documents attached to the security token

**Returns:** _Promise‹_[_Document_](../interfaces/_entities_securitytoken_documents_.document.md)_\[\]›_

### getDocument

▸ **getDocument**\(`args`: object\): _Promise‹_[_Document_](../interfaces/_entities_securitytoken_documents_.document.md)_›_

_Defined in_ [_src/entities/SecurityToken/Documents.ts:61_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Documents.ts#L61)

Retrieve a specific document's data by name

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `name` | string |

**Returns:** _Promise‹_[_Document_](../interfaces/_entities_securitytoken_documents_.document.md)_›_

### remove

▸ **remove**\(`args`: object\): _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_RemoveDocumentProcedureArgs_](../interfaces/_types_index_.removedocumentprocedureargs.md)_, void››_

_Defined in_ [_src/entities/SecurityToken/Documents.ts:50_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Documents.ts#L50)

Remove an existing document from the Security Token

**Parameters:**

▪ **args**: _object_

| Name | Type | Description |
| :--- | :--- | :--- |
| `name` | string | should always be unique |

**Returns:** _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_RemoveDocumentProcedureArgs_](../interfaces/_types_index_.removedocumentprocedureargs.md)_, void››_

### set

▸ **set**\(`args`: object\): _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_SetDocumentProcedureArgs_](../interfaces/_types_index_.setdocumentprocedureargs.md)_, void››_

_Defined in_ [_src/entities/SecurityToken/Documents.ts:37_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Documents.ts#L37)

Attach a new document to the contract, or update the URI or hash of an existing attached document

**Parameters:**

▪ **args**: _object_

| Name | Type | Description |
| :--- | :--- | :--- |
| `documentHash` | string | hash of the document's contents |
| `name` | string | should always be unique |
| `uri` | string | off-chain uri of the document from where it is accessible to investors/advisors to read |

**Returns:** _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_SetDocumentProcedureArgs_](../interfaces/_types_index_.setdocumentprocedureargs.md)_, void››_

