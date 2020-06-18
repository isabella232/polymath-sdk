# PercentageRestrictions

Namespace that handles all Percentage Restriction related functionality

## Hierarchy

* [SubModule]()

  ↳ **PercentageRestrictions**

## Index

### Constructors

* [constructor]()

### Properties

* [context]()
* [securityToken]()

### Methods

* [getExemptions]()
* [getMaxHolderPercentage]()
* [modifyExemptions]()
* [modifyMaxHolderPercentage]()

## Constructors

### constructor

+ **new PercentageRestrictions**\(`securityToken`: [SecurityToken](), `context`: [Context]()\): [_PercentageRestrictions_]()

_Inherited from_ [_SubModule_]()_._[_constructor_]()

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:10_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SubModule.ts#L10)

Create a new SubModule instance

**Parameters:**

| Name | Type |
| :--- | :--- |
| `securityToken` | [SecurityToken]() |
| `context` | [Context]() |

**Returns:** [_PercentageRestrictions_]()

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

### getExemptions

▸ **getExemptions**\(\): _Promise‹object›_

_Defined in_ [_src/entities/SecurityToken/Transfers/Restrictions/PercentageRestrictions.ts:66_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Transfers/Restrictions/PercentageRestrictions.ts#L66)

Retrieve all exemptions that currently apply to percentage restrictions. That includes the whitelist and whether primary issuance \(minting\) is allowed to bypass percentage ownership restrictions

Can be modified with `modifyPercentageExemptions`

**Returns:** _Promise‹object›_

### getMaxHolderPercentage

▸ **getMaxHolderPercentage**\(\): _Promise‹BigNumber›_

_Defined in_ [_src/entities/SecurityToken/Transfers/Restrictions/PercentageRestrictions.ts:139_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Transfers/Restrictions/PercentageRestrictions.ts#L139)

Retrieve the maximum percentage of the total supply that a single tokenholder can own Can be modified with `modifyMaxHolderPercentage`

**Returns:** _Promise‹BigNumber›_

### modifyExemptions

▸ **modifyExemptions**\(`args`: object\): _Promise‹_[_TransactionQueue_]()_‹_[_ModifyPercentageExemptionsProcedureArgs_]()_, void››_

_Defined in_ [_src/entities/SecurityToken/Transfers/Restrictions/PercentageRestrictions.ts:47_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Transfers/Restrictions/PercentageRestrictions.ts#L47)

Modify the conditions for exemption from percentage ownership restrictions. There are two \(independent\) methods of exemption:

* Whitelisting: an address can be whitelisted and thus percentage ownership restrictions will not apply to it
* Primary issuance: if enabled, issuing tokens to an address will bypass percentage ownership restrictions \(for example, if issuing tokens to a particular address would leave that address with a higher percentage than the limit, having this option set to `true` will allow that issuance operation\)

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `allowPrimaryIssuance?` | undefined \| false \| true |
| `whitelistEntries?` | [PercentageWhitelistEntry]()\[\] |

**Returns:** _Promise‹_[_TransactionQueue_]()_‹_[_ModifyPercentageExemptionsProcedureArgs_]()_, void››_

### modifyMaxHolderPercentage

▸ **modifyMaxHolderPercentage**\(`args`: object\): _Promise‹_[_TransactionQueue_]()_‹_[_ModifyMaxHolderPercentageProcedureArgs_]()_, void››_

_Defined in_ [_src/entities/SecurityToken/Transfers/Restrictions/PercentageRestrictions.ts:124_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Transfers/Restrictions/PercentageRestrictions.ts#L124)

Modify the maximum percentage of the total supply that a single tokenholder can own at a given time

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `maxHolderPercentage` | BigNumber |

**Returns:** _Promise‹_[_TransactionQueue_]()_‹_[_ModifyMaxHolderPercentageProcedureArgs_]()_, void››_

