# Features

Namespace that handles all Feature related functionality

## Hierarchy

* [SubModule](../classes/_entities_securitytoken_submodule_.submodule.md)

  ↳ **Features**

## Index

### Constructors

* [constructor](../classes/_entities_securitytoken_features_.features.md#constructor)

### Properties

* [context](../classes/_entities_securitytoken_features_.features.md#protected-context)
* [list](../classes/_entities_securitytoken_features_.features.md#list)
* [securityToken](../classes/_entities_securitytoken_features_.features.md#protected-securitytoken)

### Methods

* [disable](../classes/_entities_securitytoken_features_.features.md#disable)
* [enable](../classes/_entities_securitytoken_features_.features.md#enable)
* [getModuleNameFromFeature](../classes/_entities_securitytoken_features_.features.md#private-getmodulenamefromfeature)
* [getStatus](../classes/_entities_securitytoken_features_.features.md#getstatus)
* [isEnabled](../classes/_entities_securitytoken_features_.features.md#isenabled)

## Constructors

### constructor

+ **new Features**\(`securityToken`: [SecurityToken](../classes/_entities_securitytoken_securitytoken_.securitytoken.md), `context`: [Context](../classes/_context_.context.md)\): [_Features_](../classes/_entities_securitytoken_features_.features.md)

_Inherited from_ [_SubModule_](../classes/_entities_securitytoken_submodule_.submodule.md)_._[_constructor_](../classes/_entities_securitytoken_submodule_.submodule.md#constructor)

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:10_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SubModule.ts#L10)

Create a new SubModule instance

**Parameters:**

| Name | Type |
| :--- | :--- |
| `securityToken` | [SecurityToken](../classes/_entities_securitytoken_securitytoken_.securitytoken.md) |
| `context` | [Context](../classes/_context_.context.md) |

**Returns:** [_Features_](../classes/_entities_securitytoken_features_.features.md)

## Properties

### `Protected` context

• **context**: [_Context_](../classes/_context_.context.md)

_Inherited from_ [_SubModule_](../classes/_entities_securitytoken_submodule_.submodule.md)_._[_context_](../classes/_entities_securitytoken_submodule_.submodule.md#protected-context)

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:10_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SubModule.ts#L10)

### list

• **list**: [_Feature_](../enums/_types_index_.feature.md)_\[\]_ = \[ Feature.Permissions, Feature.Tokenholders, Feature.Dividends, Feature.TokenholderCountRestrictions, Feature.PercentageOwnershipRestrictions, \]

_Defined in_ [_src/entities/SecurityToken/Features.ts:80_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Features.ts#L80)

List of all existing features

### `Protected` securityToken

• **securityToken**: [_SecurityToken_](../classes/_entities_securitytoken_securitytoken_.securitytoken.md)

_Inherited from_ [_SubModule_](../classes/_entities_securitytoken_submodule_.submodule.md)_._[_securityToken_](../classes/_entities_securitytoken_submodule_.submodule.md#protected-securitytoken)

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:8_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SubModule.ts#L8)

## Methods

### disable

▸ **disable**\(`args`: object\): _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹_[_DisableFeatureProcedureArgs_](../interfaces/_types_index_.disablefeatureprocedureargs.md)_››_

_Defined in_ [_src/entities/SecurityToken/Features.ts:213_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Features.ts#L213)

Disable a feature

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `feature` | [Feature](../enums/_types_index_.feature.md) |

**Returns:** _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹_[_DisableFeatureProcedureArgs_](../interfaces/_types_index_.disablefeatureprocedureargs.md)_››_

### enable

▸ **enable**\(`args`: object, `opts?`: [EnableOpts](_entities_securitytoken_features_.md#enableopts)\): _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_›_

_Defined in_ [_src/entities/SecurityToken/Features.ts:138_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Features.ts#L138)

Enable a feature

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `feature` | [Feature](../enums/_types_index_.feature.md) |

▪`Optional` **opts**: [_EnableOpts_](_entities_securitytoken_features_.md#enableopts)

**Returns:** _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_›_

### `Private` getModuleNameFromFeature

▸ **getModuleNameFromFeature**\(`feature`: [Feature](../enums/_types_index_.feature.md)\): _ModuleName_

_Defined in_ [_src/entities/SecurityToken/Features.ts:240_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Features.ts#L240)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `feature` | [Feature](../enums/_types_index_.feature.md) |

**Returns:** _ModuleName_

### getStatus

▸ **getStatus**\(\): _Promise‹_[_FeatureStatuses_](../interfaces/_entities_securitytoken_features_.featurestatuses.md)_›_

_Defined in_ [_src/entities/SecurityToken/Features.ts:111_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Features.ts#L111)

Gets the status on all Security Token features \(true = enabled, false = not enabled/disabled\)

**Returns:** _Promise‹_[_FeatureStatuses_](../interfaces/_entities_securitytoken_features_.featurestatuses.md)_›_

### isEnabled

▸ **isEnabled**\(`args`: object\): _Promise‹boolean›_

_Defined in_ [_src/entities/SecurityToken/Features.ts:93_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Features.ts#L93)

Returns whether a particular feature has been enabled or not

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `feature` | [Feature](../enums/_types_index_.feature.md) |

**Returns:** _Promise‹boolean›_

