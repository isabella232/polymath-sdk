# Features

Namespace that handles all Feature related functionality

## Hierarchy

* [SubModule]()

  ↳ **Features**

## Index

### Constructors

* [constructor]()

### Properties

* [context]()
* [list]()
* [securityToken]()

### Methods

* [disable]()
* [enable]()
* [getModuleNameFromFeature]()
* [getStatus]()
* [isEnabled]()

## Constructors

### constructor

+ **new Features**\(`securityToken`: [SecurityToken](), `context`: [Context]()\): [_Features_]()

_Inherited from_ [_SubModule_]()_._[_constructor_]()

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:10_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SubModule.ts#L10)

Create a new SubModule instance

**Parameters:**

| Name | Type |
| :--- | :--- |
| `securityToken` | [SecurityToken]() |
| `context` | [Context]() |

**Returns:** [_Features_]()

## Properties

### `Protected` context

• **context**: [_Context_]()

_Inherited from_ [_SubModule_]()_._[_context_]()

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:10_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SubModule.ts#L10)

### list

• **list**: [_Feature_]()_\[\]_ = \[ Feature.Permissions, Feature.Tokenholders, Feature.Dividends, Feature.TokenholderCountRestrictions, Feature.PercentageOwnershipRestrictions, \]

_Defined in_ [_src/entities/SecurityToken/Features.ts:80_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Features.ts#L80)

List of all existing features

### `Protected` securityToken

• **securityToken**: [_SecurityToken_]()

_Inherited from_ [_SubModule_]()_._[_securityToken_]()

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:8_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SubModule.ts#L8)

## Methods

### disable

▸ **disable**\(`args`: object\): _Promise‹_[_TransactionQueue_]()_‹_[_DisableFeatureProcedureArgs_]()_››_

_Defined in_ [_src/entities/SecurityToken/Features.ts:213_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Features.ts#L213)

Disable a feature

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `feature` | [Feature]() |

**Returns:** _Promise‹_[_TransactionQueue_]()_‹_[_DisableFeatureProcedureArgs_]()_››_

### enable

▸ **enable**\(`args`: object, `opts?`: [EnableOpts](_entities_securitytoken_features_.md#enableopts)\): _Promise‹_[_TransactionQueue_]()_›_

_Defined in_ [_src/entities/SecurityToken/Features.ts:138_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Features.ts#L138)

Enable a feature

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `feature` | [Feature]() |

▪`Optional` **opts**: [_EnableOpts_](_entities_securitytoken_features_.md#enableopts)

**Returns:** _Promise‹_[_TransactionQueue_]()_›_

### `Private` getModuleNameFromFeature

▸ **getModuleNameFromFeature**\(`feature`: [Feature]()\): _ModuleName_

_Defined in_ [_src/entities/SecurityToken/Features.ts:240_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Features.ts#L240)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `feature` | [Feature]() |

**Returns:** _ModuleName_

### getStatus

▸ **getStatus**\(\): _Promise‹_[_FeatureStatuses_]()_›_

_Defined in_ [_src/entities/SecurityToken/Features.ts:111_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Features.ts#L111)

Gets the status on all Security Token features \(true = enabled, false = not enabled/disabled\)

**Returns:** _Promise‹_[_FeatureStatuses_]()_›_

### isEnabled

▸ **isEnabled**\(`args`: object\): _Promise‹boolean›_

_Defined in_ [_src/entities/SecurityToken/Features.ts:93_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Features.ts#L93)

Returns whether a particular feature has been enabled or not

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `feature` | [Feature]() |

**Returns:** _Promise‹boolean›_

