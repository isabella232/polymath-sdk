# Class: PercentageRestrictions

Namespace that handles all Percentage Restriction related functionality

## Hierarchy

- [SubModule](_entities_securitytoken_submodule_.submodule.md)

  ↳ **PercentageRestrictions**

## Index

### Constructors

- [constructor](_entities_securitytoken_transfers_restrictions_percentagerestrictions_.percentagerestrictions.md#constructor)

### Properties

- [context](_entities_securitytoken_transfers_restrictions_percentagerestrictions_.percentagerestrictions.md#protected-context)
- [securityToken](_entities_securitytoken_transfers_restrictions_percentagerestrictions_.percentagerestrictions.md#protected-securitytoken)

### Methods

- [getExemptions](_entities_securitytoken_transfers_restrictions_percentagerestrictions_.percentagerestrictions.md#getexemptions)
- [getMaxHolderPercentage](_entities_securitytoken_transfers_restrictions_percentagerestrictions_.percentagerestrictions.md#getmaxholderpercentage)
- [modifyExemptions](_entities_securitytoken_transfers_restrictions_percentagerestrictions_.percentagerestrictions.md#modifyexemptions)
- [modifyMaxHolderPercentage](_entities_securitytoken_transfers_restrictions_percentagerestrictions_.percentagerestrictions.md#modifymaxholderpercentage)

## Constructors

### constructor

\+ **new PercentageRestrictions**(`securityToken`: [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md), `context`: [Context](_context_.context.md)): _[PercentageRestrictions](_entities_securitytoken_transfers_restrictions_percentagerestrictions_.percentagerestrictions.md)_

_Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[constructor](_entities_securitytoken_submodule_.submodule.md#constructor)_

_Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/SecurityToken/SubModule.ts#L10)_

Create a new SubModule instance

**Parameters:**

| Name            | Type                                                                     |
| --------------- | ------------------------------------------------------------------------ |
| `securityToken` | [SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md) |
| `context`       | [Context](_context_.context.md)                                          |

**Returns:** _[PercentageRestrictions](_entities_securitytoken_transfers_restrictions_percentagerestrictions_.percentagerestrictions.md)_

## Properties

### `Protected` context

• **context**: _[Context](_context_.context.md)_

_Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[context](_entities_securitytoken_submodule_.submodule.md#protected-context)_

_Defined in [src/entities/SecurityToken/SubModule.ts:10](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/SecurityToken/SubModule.ts#L10)_

---

### `Protected` securityToken

• **securityToken**: _[SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)_

_Inherited from [SubModule](_entities_securitytoken_submodule_.submodule.md).[securityToken](_entities_securitytoken_submodule_.submodule.md#protected-securitytoken)_

_Defined in [src/entities/SecurityToken/SubModule.ts:8](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/SecurityToken/SubModule.ts#L8)_

## Methods

### getExemptions

▸ **getExemptions**(): _Promise‹object›_

_Defined in [src/entities/SecurityToken/Transfers/Restrictions/PercentageRestrictions.ts:66](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/SecurityToken/Transfers/Restrictions/PercentageRestrictions.ts#L66)_

Retrieve all exemptions that currently apply to percentage restrictions. That includes the whitelist and whether primary issuance (minting) is allowed to bypass percentage ownership restrictions

Can be modified with `modifyPercentageExemptions`

**Returns:** _Promise‹object›_

---

### getMaxHolderPercentage

▸ **getMaxHolderPercentage**(): _Promise‹BigNumber›_

_Defined in [src/entities/SecurityToken/Transfers/Restrictions/PercentageRestrictions.ts:139](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/SecurityToken/Transfers/Restrictions/PercentageRestrictions.ts#L139)_

Retrieve the maximum percentage of the total supply that a single shareholder can own
Can be modified with `modifyMaxHolderPercentage`

**Returns:** _Promise‹BigNumber›_

---

### modifyExemptions

▸ **modifyExemptions**(`args`: object): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ModifyPercentageExemptionsProcedureArgs](../interfaces/_types_index_.modifypercentageexemptionsprocedureargs.md), void››_

_Defined in [src/entities/SecurityToken/Transfers/Restrictions/PercentageRestrictions.ts:47](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/SecurityToken/Transfers/Restrictions/PercentageRestrictions.ts#L47)_

Modify the conditions for exemption from percentage ownership restrictions. There are two (independent) methods of exemption:

- Whitelisting: an address can be whitelisted and thus percentage ownership restrictions will not apply to it
- Primary issuance: if enabled, issuing tokens to an address will bypass percentage ownership restrictions (for example, if issuing tokens to a particular address would leave that address with a higher percentage than the limit, having this option set to `true` will allow that issuance operation)

**Parameters:**

▪ **args**: _object_

| Name                    | Type                                                                                  |
| ----------------------- | ------------------------------------------------------------------------------------- |
| `allowPrimaryIssuance?` | undefined &#124; false &#124; true                                                    |
| `whitelistEntries?`     | [PercentageWhitelistEntry](../interfaces/_types_index_.percentagewhitelistentry.md)[] |

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ModifyPercentageExemptionsProcedureArgs](../interfaces/_types_index_.modifypercentageexemptionsprocedureargs.md), void››_

---

### modifyMaxHolderPercentage

▸ **modifyMaxHolderPercentage**(`args`: object): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ModifyMaxHolderPercentageProcedureArgs](../interfaces/_types_index_.modifymaxholderpercentageprocedureargs.md), void››_

_Defined in [src/entities/SecurityToken/Transfers/Restrictions/PercentageRestrictions.ts:124](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/SecurityToken/Transfers/Restrictions/PercentageRestrictions.ts#L124)_

Modify the maximum percentage of the total supply that a single shareholder can own at a given time

**Parameters:**

▪ **args**: _object_

| Name                  | Type      |
| --------------------- | --------- |
| `maxHolderPercentage` | BigNumber |

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ModifyMaxHolderPercentageProcedureArgs](../interfaces/_types_index_.modifymaxholderpercentageprocedureargs.md), void››_
