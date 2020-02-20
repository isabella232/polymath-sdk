# Class: Features

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

###  constructor

\+ **new Features**(`securityToken`: [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md), `context`: [Context](_context_.context.md)): *[Features](_entities_securitytoken_features_.features.md)*

*Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[constructor](_entities_securitytoken_submodule_.submodule.md#constructor)*

*Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/SubModule.ts#L10)*

Create a new SubModule instance

**Parameters:**

Name | Type |
------ | ------ |
`securityToken` | [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[Features](_entities_securitytoken_features_.features.md)*

## Properties

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[context](_entities_securitytoken_submodule_.submodule.md#protected-context)*

*Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/SubModule.ts#L10)*

___

###  list

• **list**: *[Feature](../enums/_types_index_.feature.md)[]* =  [
    Feature.Permissions,
    Feature.Shareholders,
    Feature.Dividends,
    Feature.ShareholderCountRestrictions,
    Feature.PercentageOwnershipRestrictions,
  ]

*Defined in [src/entities/SecurityToken/Features.ts:80](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Features.ts#L80)*

List of all existing features

___

### `Protected` securityToken

• **securityToken**: *[SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)*

*Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[securityToken](_entities_securitytoken_submodule_.submodule.md#protected-securitytoken)*

*Defined in [src/entities/SecurityToken/SubModule.ts:8](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/SubModule.ts#L8)*

## Methods

###  disable

▸ **disable**(`args`: object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[DisableFeatureProcedureArgs](../interfaces/_types_index_.disablefeatureprocedureargs.md)››*

*Defined in [src/entities/SecurityToken/Features.ts:213](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Features.ts#L213)*

Disable a feature

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`feature` | [Feature](../enums/_types_index_.feature.md) |

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[DisableFeatureProcedureArgs](../interfaces/_types_index_.disablefeatureprocedureargs.md)››*

___

###  enable

▸ **enable**(`args`: object, `opts?`: [EnableOpts](../modules/_entities_securitytoken_features_.md#enableopts)): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)›*

*Defined in [src/entities/SecurityToken/Features.ts:138](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Features.ts#L138)*

Enable a feature

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`feature` | [Feature](../enums/_types_index_.feature.md) |

▪`Optional`  **opts**: *[EnableOpts](../modules/_entities_securitytoken_features_.md#enableopts)*

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)›*

___

### `Private` getModuleNameFromFeature

▸ **getModuleNameFromFeature**(`feature`: [Feature](../enums/_types_index_.feature.md)): *ModuleName*

*Defined in [src/entities/SecurityToken/Features.ts:240](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Features.ts#L240)*

**Parameters:**

Name | Type |
------ | ------ |
`feature` | [Feature](../enums/_types_index_.feature.md) |

**Returns:** *ModuleName*

___

###  getStatus

▸ **getStatus**(): *Promise‹[FeatureStatuses](../interfaces/_entities_securitytoken_features_.featurestatuses.md)›*

*Defined in [src/entities/SecurityToken/Features.ts:111](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Features.ts#L111)*

Gets the status on all Security Token features (true = enabled, false = not enabled/disabled)

**Returns:** *Promise‹[FeatureStatuses](../interfaces/_entities_securitytoken_features_.featurestatuses.md)›*

___

###  isEnabled

▸ **isEnabled**(`args`: object): *Promise‹boolean›*

*Defined in [src/entities/SecurityToken/Features.ts:93](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Features.ts#L93)*

Returns whether a particular feature has been enabled or not

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`feature` | [Feature](../enums/_types_index_.feature.md) |

**Returns:** *Promise‹boolean›*
