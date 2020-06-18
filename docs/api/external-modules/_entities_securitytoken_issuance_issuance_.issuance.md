# Issuance

Namespace that handles all Issuance related functionality

## Hierarchy

* [SubModule]()

  ↳ **Issuance**

## Index

### Constructors

* [constructor]()

### Properties

* [context]()
* [offerings]()
* [securityToken]()

### Methods

* [allowed]()
* [freeze]()
* [issue]()
* [signFreezeAck]()

## Constructors

### constructor

+ **new Issuance**\(`securityToken`: [SecurityToken](), `context`: [Context]()\): [_Issuance_]()

_Overrides_ [_SubModule_]()_._[_constructor_]()

_Defined in_ [_src/entities/SecurityToken/Issuance/Issuance.ts:14_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Issuance/Issuance.ts#L14)

Create a new Issuance instance

**Parameters:**

| Name | Type |
| :--- | :--- |
| `securityToken` | [SecurityToken]() |
| `context` | [Context]() |

**Returns:** [_Issuance_]()

## Properties

### `Protected` context

• **context**: [_Context_]()

_Inherited from_ [_SubModule_]()_._[_context_]()

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:10_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SubModule.ts#L10)

### offerings

• **offerings**: [_Offerings_]()

_Defined in_ [_src/entities/SecurityToken/Issuance/Issuance.ts:14_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Issuance/Issuance.ts#L14)

### `Protected` securityToken

• **securityToken**: [_SecurityToken_]()

_Inherited from_ [_SubModule_]()_._[_securityToken_]()

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:8_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SubModule.ts#L8)

## Methods

### allowed

▸ **allowed**\(\): _Promise‹Boolean›_

_Defined in_ [_src/entities/SecurityToken/Issuance/Issuance.ts:73_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Issuance/Issuance.ts#L73)

Retrieve whether the issuance of tokens is allowed or not Can be permanently frozen with `freeze`

**Returns:** _Promise‹Boolean›_

### freeze

▸ **freeze**\(`args?`: undefined \| object\): _Promise‹_[_TransactionQueue_]()_‹_[_FreezeIssuanceProcedureArgs_]()_, void››_

_Defined in_ [_src/entities/SecurityToken/Issuance/Issuance.ts:48_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Issuance/Issuance.ts#L48)

Permanently freeze issuance of the security token

**Parameters:**

| Name | Type |
| :--- | :--- |
| `args?` | undefined \| object |

**Returns:** _Promise‹_[_TransactionQueue_]()_‹_[_FreezeIssuanceProcedureArgs_]()_, void››_

### issue

▸ **issue**\(`args`: object\): _Promise‹_[_TransactionQueue_]()_‹_[_IssueTokensProcedureArgs_]()_,_ [_Tokenholder_]()_\[\]››_

_Defined in_ [_src/entities/SecurityToken/Issuance/Issuance.ts:32_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Issuance/Issuance.ts#L32)

Issue a certain amount of tokens to an address. The address must already have been added via `modifyData`. Otherwise, the corresponding tokenholder data for that address must be supplied to this method **NOTE: If tokenholder data is supplied, client-side validations to verify if the transfer is possible won't be performed**

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `issuanceData` | [IssuanceDataEntry]()\[\] |

**Returns:** _Promise‹_[_TransactionQueue_]()_‹_[_IssueTokensProcedureArgs_]()_,_ [_Tokenholder_]()_\[\]››_

### signFreezeAck

▸ **signFreezeAck**\(\): _Promise‹_[_TransactionQueue_]()_‹_[_SignFreezeIssuanceAckProcedureArgs_]()_, void››_

_Defined in_ [_src/entities/SecurityToken/Issuance/Issuance.ts:61_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Issuance/Issuance.ts#L61)

Generate a signature string that can be used to permanently freeze issuance of the Security Token

**Note that only the owner's signature is valid for this operation**

**Returns:** _Promise‹_[_TransactionQueue_]()_‹_[_SignFreezeIssuanceAckProcedureArgs_]()_, void››_

