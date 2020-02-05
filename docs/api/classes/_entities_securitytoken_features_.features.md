# Class: Features

Namespace that handles all Feature related functionality

## Hierarchy

- [SubModule](_entities_securitytoken_submodule_.submodule.md)

  ↳ **Features**

## Index

### Constructors

- [constructor](_entities_securitytoken_features_.features.md#constructor)

### Properties

- [context](_entities_securitytoken_features_.features.md#protected-context)
- [list](_entities_securitytoken_features_.features.md#list)
- [securityToken](_entities_securitytoken_features_.features.md#protected-securitytoken)

### Methods

- [disable](_entities_securitytoken_features_.features.md#disable)
- [enable](_entities_securitytoken_features_.features.md#enable)
- [getModuleNameFromFeature](_entities_securitytoken_features_.features.md#private-getmodulenamefromfeature)
- [getStatus](_entities_securitytoken_features_.features.md#getstatus)
- [isEnabled](_entities_securitytoken_features_.features.md#isenabled)

## Constructors

### constructor

\+ **new Features**(`securityToken`: [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md), `context`: [Context](_context_.context.md)): _[Features](_entities_securitytoken_features_.features.md)_

_Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[constructor](_entities_securitytoken_submodule_.submodule.md#constructor)_

_Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/SubModule.ts#L10)_

Create a new SubModule instance

**Parameters:**

| Name            | Type                                                                     |
| --------------- | ------------------------------------------------------------------------ |
| `securityToken` | [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md) |
| `context`       | [Context](_context_.context.md)                                          |

**Returns:** _[Features](_entities_securitytoken_features_.features.md)_

## Properties

### `Protected` context

• **context**: _[Context](_context_.context.md)_

_Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[context](_entities_securitytoken_submodule_.submodule.md#protected-context)_

_Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/SubModule.ts#L10)_

---

### list

• **list**: _[Feature](../enums/_types_index_.feature.md)[]_ = [
Feature.Permissions,
Feature.Shareholders,
Feature.Dividends,
Feature.ShareholderCountRestrictions,
Feature.PercentageOwnershipRestrictions,
]

_Defined in [src/entities/SecurityToken/Features.ts:80](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Features.ts#L80)_

List of all existing features

---

### `Protected` securityToken

• **securityToken**: _[SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)_

_Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[securityToken](_entities_securitytoken_submodule_.submodule.md#protected-securitytoken)_

_Defined in [src/entities/SecurityToken/SubModule.ts:8](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/SubModule.ts#L8)_

## Methods

### disable

▸ **disable**(`args`: object): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[DisableFeatureProcedureArgs](../interfaces/_types_index_.disablefeatureprocedureargs.md)››_

_Defined in [src/entities/SecurityToken/Features.ts:213](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Features.ts#L213)_

Disable a feature

**Parameters:**

▪ **args**: _object_

| Name      | Type                                         |
| --------- | -------------------------------------------- |
| `feature` | [Feature](../enums/_types_index_.feature.md) |

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[DisableFeatureProcedureArgs](../interfaces/_types_index_.disablefeatureprocedureargs.md)››_

---

### enable

▸ **enable**(`args`: object, `opts?`: [EnableOpts](../modules/_entities_securitytoken_features_.md#enableopts)): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)›_

_Defined in [src/entities/SecurityToken/Features.ts:138](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Features.ts#L138)_

Enable a feature

**Parameters:**

▪ **args**: _object_

| Name      | Type                                         |
| --------- | -------------------------------------------- |
| `feature` | [Feature](../enums/_types_index_.feature.md) |

▪`Optional` **opts**: _[EnableOpts](../modules/_entities_securitytoken_features_.md#enableopts)_

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)›_

---

### `Private` getModuleNameFromFeature

▸ **getModuleNameFromFeature**(`feature`: [Feature](../enums/_types_index_.feature.md)): _ModuleName_

_Defined in [src/entities/SecurityToken/Features.ts:240](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Features.ts#L240)_

**Parameters:**

| Name      | Type                                         |
| --------- | -------------------------------------------- |
| `feature` | [Feature](../enums/_types_index_.feature.md) |

**Returns:** _ModuleName_

---

### getStatus

▸ **getStatus**(): _Promise‹[FeatureStatuses](../interfaces/_entities_securitytoken_features_.featurestatuses.md)›_

_Defined in [src/entities/SecurityToken/Features.ts:111](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Features.ts#L111)_

Gets the status on all Security Token features (true = enabled, false = not enabled/disabled)

**Returns:** _Promise‹[FeatureStatuses](../interfaces/_entities_securitytoken_features_.featurestatuses.md)›_

---

### isEnabled

▸ **isEnabled**(`args`: object): _Promise‹boolean›_

_Defined in [src/entities/SecurityToken/Features.ts:93](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Features.ts#L93)_

Returns whether a particular feature has been enabled or not

**Parameters:**

▪ **args**: _object_

| Name      | Type                                         |
| --------- | -------------------------------------------- |
| `feature` | [Feature](../enums/_types_index_.feature.md) |

**Returns:** _Promise‹boolean›_
