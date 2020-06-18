# Class: Documents

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

###  constructor

\+ **new Documents**(`securityToken`: [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md), `context`: [Context](_context_.context.md)): *[Documents](_entities_securitytoken_documents_.documents.md)*

*Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[constructor](_entities_securitytoken_submodule_.submodule.md#constructor)*

*Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SubModule.ts#L10)*

Create a new SubModule instance

**Parameters:**

Name | Type |
------ | ------ |
`securityToken` | [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[Documents](_entities_securitytoken_documents_.documents.md)*

## Properties

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[context](_entities_securitytoken_submodule_.submodule.md#protected-context)*

*Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SubModule.ts#L10)*

___

### `Protected` securityToken

• **securityToken**: *[SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)*

*Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[securityToken](_entities_securitytoken_submodule_.submodule.md#protected-securitytoken)*

*Defined in [src/entities/SecurityToken/SubModule.ts:8](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SubModule.ts#L8)*

## Methods

###  getAllDocuments

▸ **getAllDocuments**(): *Promise‹[Document](../interfaces/_entities_securitytoken_documents_.document.md)[]›*

*Defined in [src/entities/SecurityToken/Documents.ts:90](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Documents.ts#L90)*

Retrieve an array of all the documents attached to the security token

**Returns:** *Promise‹[Document](../interfaces/_entities_securitytoken_documents_.document.md)[]›*

___

###  getDocument

▸ **getDocument**(`args`: object): *Promise‹[Document](../interfaces/_entities_securitytoken_documents_.document.md)›*

*Defined in [src/entities/SecurityToken/Documents.ts:61](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Documents.ts#L61)*

Retrieve a specific document's data by name

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *Promise‹[Document](../interfaces/_entities_securitytoken_documents_.document.md)›*

___

###  remove

▸ **remove**(`args`: object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[RemoveDocumentProcedureArgs](../interfaces/_types_index_.removedocumentprocedureargs.md), void››*

*Defined in [src/entities/SecurityToken/Documents.ts:50](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Documents.ts#L50)*

Remove an existing document from the Security Token

**Parameters:**

▪ **args**: *object*

Name | Type | Description |
------ | ------ | ------ |
`name` | string | should always be unique  |

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[RemoveDocumentProcedureArgs](../interfaces/_types_index_.removedocumentprocedureargs.md), void››*

___

###  set

▸ **set**(`args`: object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[SetDocumentProcedureArgs](../interfaces/_types_index_.setdocumentprocedureargs.md), void››*

*Defined in [src/entities/SecurityToken/Documents.ts:37](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Documents.ts#L37)*

Attach a new document to the contract, or update the URI or hash of an existing attached document

**Parameters:**

▪ **args**: *object*

Name | Type | Description |
------ | ------ | ------ |
`documentHash` | string | hash of the document's contents  |
`name` | string | should always be unique |
`uri` | string | off-chain uri of the document from where it is accessible to investors/advisors to read |

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[SetDocumentProcedureArgs](../interfaces/_types_index_.setdocumentprocedureargs.md), void››*
