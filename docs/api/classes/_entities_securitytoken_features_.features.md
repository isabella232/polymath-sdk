# Features

Namespace that handles all Feature related functionality

## Hierarchy

* [SubModule](_entities_securitytoken_submodule_.submodule.md)

  ↳ **Features**

## Index

### Constructors

* [constructor](_entities_securitytoken_features_.features.md#constructor)

### Properties

* [context](_entities_securitytoken_features_.features.md#protected-context)
* [list](_entities_securitytoken_features_.features.md#list)
* [securityToken](_entities_securitytoken_features_.features.md#protected-securitytoken)

### Methods

* [disable](_entities_securitytoken_features_.features.md#disable)
* [enable](_entities_securitytoken_features_.features.md#enable)
* [getModuleNameFromFeature](_entities_securitytoken_features_.features.md#private-getmodulenamefromfeature)
* [getStatus](_entities_securitytoken_features_.features.md#getstatus)
* [isEnabled](_entities_securitytoken_features_.features.md#isenabled)

## Constructors

### constructor

+ **new Features**\(`securityToken`: [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md), `context`: [Context](_context_.context.md)\): [_Features_](_entities_securitytoken_features_.features.md)

_Inherited from_ [_SubModule_](_entities_securitytoken_submodule_.submodule.md)_._[_constructor_](_entities_securitytoken_submodule_.submodule.md#constructor)

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:10_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SubModule.ts#L10)

Create a new SubModule instance

**Parameters:**

| Name | Type |
| :--- | :--- |
| `securityToken` | [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md) |
| `context` | [Context](_context_.context.md) |

**Returns:** [_Features_](_entities_securitytoken_features_.features.md)

## Properties

### `Protected` context

• **context**: [_Context_](_context_.context.md)

_Inherited from_ [_SubModule_](_entities_securitytoken_submodule_.submodule.md)_._[_context_](_entities_securitytoken_submodule_.submodule.md#protected-context)

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:10_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SubModule.ts#L10)

### list

• **list**: [_Feature_](../enums/_types_index_.feature.md)_\[\]_ = \[ Feature.Permissions, Feature.Tokenholders, Feature.Dividends, Feature.TokenholderCountRestrictions, Feature.PercentageOwnershipRestrictions, \]

_Defined in_ [_src/entities/SecurityToken/Features.ts:80_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Features.ts#L80)

List of all existing features

### `Protected` securityToken

• **securityToken**: [_SecurityToken_](_entities_securitytoken_securitytoken_.securitytoken.md)

_Inherited from_ [_SubModule_](_entities_securitytoken_submodule_.submodule.md)_._[_securityToken_](_entities_securitytoken_submodule_.submodule.md#protected-securitytoken)

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:8_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SubModule.ts#L8)

## Methods

### disable

▸ **disable**\(`args`: object\): _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_DisableFeatureProcedureArgs_](../interfaces/_types_index_.disablefeatureprocedureargs.md)_››_

_Defined in_ [_src/entities/SecurityToken/Features.ts:213_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Features.ts#L213)

Disable a feature

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `feature` | [Feature](../enums/_types_index_.feature.md) |

**Returns:** _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_‹_[_DisableFeatureProcedureArgs_](../interfaces/_types_index_.disablefeatureprocedureargs.md)_››_

### enable

▸ **enable**\(`args`: object, `opts?`: [EnableOpts](../external-modules/_entities_securitytoken_features_.md#enableopts)\): _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_›_

_Defined in_ [_src/entities/SecurityToken/Features.ts:138_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Features.ts#L138)

Enable a feature

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `feature` | [Feature](../enums/_types_index_.feature.md) |

▪`Optional` **opts**: [_EnableOpts_](../external-modules/_entities_securitytoken_features_.md#enableopts)

**Returns:** _Promise‹_[_TransactionQueue_](_entities_transactionqueue_.transactionqueue.md)_›_

### `Private` getModuleNameFromFeature

▸ **getModuleNameFromFeature**\(`feature`: [Feature](../enums/_types_index_.feature.md)\): _ModuleName_

_Defined in_ [_src/entities/SecurityToken/Features.ts:240_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Features.ts#L240)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `feature` | [Feature](../enums/_types_index_.feature.md) |

**Returns:** _ModuleName_

### getStatus

▸ **getStatus**\(\): _Promise‹_[_FeatureStatuses_](../interfaces/_entities_securitytoken_features_.featurestatuses.md)_›_

_Defined in_ [_src/entities/SecurityToken/Features.ts:111_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Features.ts#L111)

Gets the status on all Security Token features \(true = enabled, false = not enabled/disabled\)

**Returns:** _Promise‹_[_FeatureStatuses_](../interfaces/_entities_securitytoken_features_.featurestatuses.md)_›_

### isEnabled

▸ **isEnabled**\(`args`: object\): _Promise‹boolean›_

_Defined in_ [_src/entities/SecurityToken/Features.ts:93_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Features.ts#L93)

Returns whether a particular feature has been enabled or not

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `feature` | [Feature](../enums/_types_index_.feature.md) |

**Returns:** _Promise‹boolean›_

