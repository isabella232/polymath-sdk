# CountRestrictions

Namespace that handles all Count Restriction related functionality

## Hierarchy

* [SubModule]()

  ↳ **CountRestrictions**

## Index

### Constructors

* [constructor]()

### Properties

* [context]()
* [securityToken]()

### Methods

* [getMaxHolderCount]()
* [modifyMaxHolderCount]()

## Constructors

### constructor

+ **new CountRestrictions**\(`securityToken`: [SecurityToken](), `context`: [Context]()\): [_CountRestrictions_]()

_Inherited from_ [_SubModule_]()_._[_constructor_]()

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:10_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SubModule.ts#L10)

Create a new SubModule instance

**Parameters:**

| Name | Type |
| :--- | :--- |
| `securityToken` | [SecurityToken]() |
| `context` | [Context]() |

**Returns:** [_CountRestrictions_]()

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

### getMaxHolderCount

▸ **getMaxHolderCount**\(\): _Promise‹number›_

_Defined in_ [_src/entities/SecurityToken/Transfers/Restrictions/CountRestrictions.ts:31_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Transfers/Restrictions/CountRestrictions.ts#L31)

Retrieve the maximum amonut of tokenholders allowed to hold the token at once Can be modified with `modifyMaxHolderCount`

**Returns:** _Promise‹number›_

### modifyMaxHolderCount

▸ **modifyMaxHolderCount**\(`args`: object\): _Promise‹_[_TransactionQueue_]()_‹_[_ModifyMaxHolderCountProcedureArgs_]()_, void››_

_Defined in_ [_src/entities/SecurityToken/Transfers/Restrictions/CountRestrictions.ts:16_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Transfers/Restrictions/CountRestrictions.ts#L16)

Modify the maximum amount of tokenholders allowed to hold the token at once

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `maxHolderCount` | number |

**Returns:** _Promise‹_[_TransactionQueue_]()_‹_[_ModifyMaxHolderCountProcedureArgs_]()_, void››_

