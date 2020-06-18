# Documents

Namespace that handles all document Related functionality

## Hierarchy

* [SubModule]()

  ↳ **Documents**

## Index

### Constructors

* [constructor]()

### Properties

* [context]()
* [securityToken]()

### Methods

* [getAllDocuments]()
* [getDocument]()
* [remove]()
* [set]()

## Constructors

### constructor

+ **new Documents**\(`securityToken`: [SecurityToken](), `context`: [Context]()\): [_Documents_]()

_Inherited from_ [_SubModule_]()_._[_constructor_]()

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:10_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SubModule.ts#L10)

Create a new SubModule instance

**Parameters:**

| Name | Type |
| :--- | :--- |
| `securityToken` | [SecurityToken]() |
| `context` | [Context]() |

**Returns:** [_Documents_]()

## Properties

### `Protected` context

• **context**: [_Context_]()

_Inherited from_ [_SubModule_]()_._[_context_]()

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:10_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SubModule.ts#L10)

### `Protected` securityToken

• **securityToken**: [_SecurityToken_]()

_Inherited from_ [_SubModule_]()_._[_securityToken_]()

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:8_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SubModule.ts#L8)

## Methods

### getAllDocuments

▸ **getAllDocuments**\(\): _Promise‹_[_Document_]()_\[\]›_

_Defined in_ [_src/entities/SecurityToken/Documents.ts:90_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Documents.ts#L90)

Retrieve an array of all the documents attached to the security token

**Returns:** _Promise‹_[_Document_]()_\[\]›_

### getDocument

▸ **getDocument**\(`args`: object\): _Promise‹_[_Document_]()_›_

_Defined in_ [_src/entities/SecurityToken/Documents.ts:61_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Documents.ts#L61)

Retrieve a specific document's data by name

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `name` | string |

**Returns:** _Promise‹_[_Document_]()_›_

### remove

▸ **remove**\(`args`: object\): _Promise‹_[_TransactionQueue_]()_‹_[_RemoveDocumentProcedureArgs_]()_, void››_

_Defined in_ [_src/entities/SecurityToken/Documents.ts:50_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Documents.ts#L50)

Remove an existing document from the Security Token

**Parameters:**

▪ **args**: _object_

| Name | Type | Description |
| :--- | :--- | :--- |
| `name` | string | should always be unique |

**Returns:** _Promise‹_[_TransactionQueue_]()_‹_[_RemoveDocumentProcedureArgs_]()_, void››_

### set

▸ **set**\(`args`: object\): _Promise‹_[_TransactionQueue_]()_‹_[_SetDocumentProcedureArgs_]()_, void››_

_Defined in_ [_src/entities/SecurityToken/Documents.ts:37_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Documents.ts#L37)

Attach a new document to the contract, or update the URI or hash of an existing attached document

**Parameters:**

▪ **args**: _object_

| Name | Type | Description |
| :--- | :--- | :--- |
| `documentHash` | string | hash of the document's contents |
| `name` | string | should always be unique |
| `uri` | string | off-chain uri of the document from where it is accessible to investors/advisors to read |

**Returns:** _Promise‹_[_TransactionQueue_]()_‹_[_SetDocumentProcedureArgs_]()_, void››_

