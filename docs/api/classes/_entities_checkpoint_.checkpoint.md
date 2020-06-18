# Checkpoint

Represents a snapshot of the Security Token's supply and Tokenholder balances at a certain point in time

## Hierarchy

* [Entity](_entities_entity_.entity.md)‹[Params](../interfaces/_entities_checkpoint_.params.md)›

  ↳ **Checkpoint**

## Index

### Constructors

* [constructor](_entities_checkpoint_.checkpoint.md#constructor)

### Properties

* [createdAt](_entities_checkpoint_.checkpoint.md#createdat)
* [dividendDistributions](_entities_checkpoint_.checkpoint.md#dividenddistributions)
* [index](_entities_checkpoint_.checkpoint.md#index)
* [securityTokenId](_entities_checkpoint_.checkpoint.md#securitytokenid)
* [securityTokenSymbol](_entities_checkpoint_.checkpoint.md#securitytokensymbol)
* [tokenholderBalances](_entities_checkpoint_.checkpoint.md#tokenholderbalances)
* [totalSupply](_entities_checkpoint_.checkpoint.md#totalsupply)
* [uid](_entities_checkpoint_.checkpoint.md#uid)

### Methods

* [\_refresh](_entities_checkpoint_.checkpoint.md#_refresh)
* [toPojo](_entities_checkpoint_.checkpoint.md#topojo)
* [generateId](_entities_checkpoint_.checkpoint.md#static-generateid)
* [unserialize](_entities_checkpoint_.checkpoint.md#static-unserialize)

## Constructors

### constructor

+ **new Checkpoint**\(`params`: [Params](../interfaces/_entities_checkpoint_.params.md) & [UniqueIdentifiers](../interfaces/_entities_checkpoint_.uniqueidentifiers.md)\): [_Checkpoint_](_entities_checkpoint_.checkpoint.md)

_Defined in_ [_src/entities/Checkpoint.ts:106_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Checkpoint.ts#L106)

Create a new Chekpoint instance

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | [Params](../interfaces/_entities_checkpoint_.params.md) & [UniqueIdentifiers](../interfaces/_entities_checkpoint_.uniqueidentifiers.md) |

**Returns:** [_Checkpoint_](_entities_checkpoint_.checkpoint.md)

## Properties

### createdAt

• **createdAt**: _Date_

_Defined in_ [_src/entities/Checkpoint.ts:106_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Checkpoint.ts#L106)

### dividendDistributions

• **dividendDistributions**: [_DividendDistribution_](_entities_dividenddistribution_.dividenddistribution.md)_\[\]_

_Defined in_ [_src/entities/Checkpoint.ts:88_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Checkpoint.ts#L88)

dividend distributions associated to this snapshot

### index

• **index**: _number_

_Defined in_ [_src/entities/Checkpoint.ts:97_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Checkpoint.ts#L97)

numerical index of the checkpoint associated to this snapshot

### securityTokenId

• **securityTokenId**: _string_

_Defined in_ [_src/entities/Checkpoint.ts:92_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Checkpoint.ts#L92)

### securityTokenSymbol

• **securityTokenSymbol**: _string_

_Defined in_ [_src/entities/Checkpoint.ts:90_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Checkpoint.ts#L90)

### tokenholderBalances

• **tokenholderBalances**: [_TokenholderBalance_](../interfaces/_types_index_.tokenholderbalance.md)_\[\]_

_Defined in_ [_src/entities/Checkpoint.ts:102_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Checkpoint.ts#L102)

tokenholder balances at this specific checkpoint

### totalSupply

• **totalSupply**: _BigNumber_

_Defined in_ [_src/entities/Checkpoint.ts:104_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Checkpoint.ts#L104)

### uid

• **uid**: _string_

_Overrides_ [_Entity_](_entities_entity_.entity.md)_._[_uid_](_entities_entity_.entity.md#abstract-uid)

_Defined in_ [_src/entities/Checkpoint.ts:83_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Checkpoint.ts#L83)

## Methods

### \_refresh

▸ **\_refresh**\(`params`: Partial‹[Params](../interfaces/_entities_checkpoint_.params.md)›\): _void_

_Overrides_ [_Entity_](_entities_entity_.entity.md)_._[_\_refresh_](_entities_entity_.entity.md#abstract-_refresh)

_Defined in_ [_src/entities/Checkpoint.ts:164_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Checkpoint.ts#L164)

Hydrate the entity

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | Partial‹[Params](../interfaces/_entities_checkpoint_.params.md)› |

**Returns:** _void_

### toPojo

▸ **toPojo**\(\): _object_

_Overrides_ [_Entity_](_entities_entity_.entity.md)_._[_toPojo_](_entities_entity_.entity.md#abstract-topojo)

_Defined in_ [_src/entities/Checkpoint.ts:137_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Checkpoint.ts#L137)

Convert entity to a POJO \(Plain Old Javascript Object\)

**Returns:** _object_

* **createdAt**: _Date_
* **dividendDistributions**: _object\[\]_ = dividendDistributions.map\(distribution =&gt; distribution.toPojo\(\)\)
* **index**: _number_
* **securityTokenId**: _string_
* **securityTokenSymbol**: _string_
* **tokenholderBalances**: [_TokenholderBalance_](../interfaces/_types_index_.tokenholderbalance.md)_\[\]_
* **totalSupply**: _BigNumber_
* **uid**: _string_

### `Static` generateId

▸ **generateId**\(`__namedParameters`: object\): _string_

_Defined in_ [_src/entities/Checkpoint.ts:58_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Checkpoint.ts#L58)

Generate the Checkpoint's UUID from its identifying properties

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type |
| :--- | :--- |
| `index` | number |
| `securityTokenId` | string |

**Returns:** _string_

### `Static` unserialize

▸ **unserialize**\(`serialized`: string\): [_UniqueIdentifiers_](../interfaces/_entities_checkpoint_.uniqueidentifiers.md)

_Defined in_ [_src/entities/Checkpoint.ts:70_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Checkpoint.ts#L70)

Unserialize string to Checkpoint object

**Parameters:**

| Name | Type |
| :--- | :--- |
| `serialized` | string |

**Returns:** [_UniqueIdentifiers_](../interfaces/_entities_checkpoint_.uniqueidentifiers.md)

