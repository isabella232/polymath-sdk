# Offerings

Namespace that handles all Offering related functionality

## Hierarchy

* [SubModule]()

  ↳ **Offerings**

## Index

### Constructors

* [constructor]()

### Properties

* [context]()
* [securityToken]()

### Methods

* [getSto]()
* [getStos]()
* [launchSimpleSto]()
* [launchTieredSto]()

## Constructors

### constructor

+ **new Offerings**\(`securityToken`: [SecurityToken](), `context`: [Context]()\): [_Offerings_]()

_Inherited from_ [_SubModule_]()_._[_constructor_]()

_Defined in_ [_src/entities/SecurityToken/SubModule.ts:10_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/SubModule.ts#L10)

Create a new SubModule instance

**Parameters:**

| Name | Type |
| :--- | :--- |
| `securityToken` | [SecurityToken]() |
| `context` | [Context]() |

**Returns:** [_Offerings_]()

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

### getSto

▸ **getSto**\(`args`: [GetStoParams]() \| string\): _Promise‹any›_

_Defined in_ [_src/entities/SecurityToken/Issuance/Offerings.ts:223_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Issuance/Offerings.ts#L223)

Retrieve an STO by type and address or UUID

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `args` | [GetStoParams]() \| string | STO uuid or object containing its type and address |

**Returns:** _Promise‹any›_

### getStos

▸ **getStos**\(`opts`: object\): _Promise‹_[_SimpleSto_]() _\|_ [_TieredSto_]()_\[\]›_

_Defined in_ [_src/entities/SecurityToken/Issuance/Offerings.ts:260_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Issuance/Offerings.ts#L260)

Retrieve all STOs attached to a security token

**Parameters:**

▪`Default value` **opts**: _object_= { stoTypes: \[StoType.Simple, StoType.Tiered\], }

| Name | Type |
| :--- | :--- |
| `stoTypes` | [StoType]()\[\] |

**Returns:** _Promise‹_[_SimpleSto_]() _\|_ [_TieredSto_]()_\[\]›_

### launchSimpleSto

▸ **launchSimpleSto**\(`args`: object\): _Promise‹_[_TransactionQueue_]()_‹_[_LaunchSimpleStoProcedureArgs_]()_,_ [_SimpleSto_]()_››_

_Defined in_ [_src/entities/SecurityToken/Issuance/Offerings.ts:168_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Issuance/Offerings.ts#L168)

Launch a Simple STO

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `allowPreIssuance?` | undefined \| false \| true |
| `currency` | Currency.ETH \| Currency.POLY |
| `endDate` | Date |
| `raisedFundsWallet` | string |
| `rate` | BigNumber |
| `startDate` | Date |
| `tokensOnSale` | BigNumber |
| `unsoldTokensWallet` | string |

**Returns:** _Promise‹_[_TransactionQueue_]()_‹_[_LaunchSimpleStoProcedureArgs_]()_,_ [_SimpleSto_]()_››_

### launchTieredSto

▸ **launchTieredSto**\(`args`: [LaunchTieredStoParams]()\): _Promise‹any›_

_Defined in_ [_src/entities/SecurityToken/Issuance/Offerings.ts:203_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SecurityToken/Issuance/Offerings.ts#L203)

Launch a Tiered STO

**Parameters:**

| Name | Type |
| :--- | :--- |
| `args` | [LaunchTieredStoParams]() |

**Returns:** _Promise‹any›_

