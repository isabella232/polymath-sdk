# Checkpoint

Represents a snapshot of the Security Token's supply and Tokenholder balances at a certain point in time

## Hierarchy

* [Entity]()‹[Params]()›

  ↳ **Checkpoint**

## Index

### Constructors

* [constructor]()

### Properties

* [createdAt]()
* [dividendDistributions]()
* [index]()
* [securityTokenId]()
* [securityTokenSymbol]()
* [tokenholderBalances]()
* [totalSupply]()
* [uid]()

### Methods

* [\_refresh]()
* [toPojo]()
* [generateId]()
* [unserialize]()

## Constructors

### constructor

+ **new Checkpoint**\(`params`: [Params]() & [UniqueIdentifiers]()\): [_Checkpoint_]()

_Defined in_ [_src/entities/Checkpoint.ts:106_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Checkpoint.ts#L106)

Create a new Chekpoint instance

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | [Params]() & [UniqueIdentifiers]() |

**Returns:** [_Checkpoint_]()

## Properties

### createdAt

• **createdAt**: _Date_

_Defined in_ [_src/entities/Checkpoint.ts:106_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Checkpoint.ts#L106)

### dividendDistributions

• **dividendDistributions**: [_DividendDistribution_]()_\[\]_

_Defined in_ [_src/entities/Checkpoint.ts:88_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Checkpoint.ts#L88)

dividend distributions associated to this snapshot

### index

• **index**: _number_

_Defined in_ [_src/entities/Checkpoint.ts:97_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Checkpoint.ts#L97)

numerical index of the checkpoint associated to this snapshot

### securityTokenId

• **securityTokenId**: _string_

_Defined in_ [_src/entities/Checkpoint.ts:92_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Checkpoint.ts#L92)

### securityTokenSymbol

• **securityTokenSymbol**: _string_

_Defined in_ [_src/entities/Checkpoint.ts:90_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Checkpoint.ts#L90)

### tokenholderBalances

• **tokenholderBalances**: [_TokenholderBalance_]()_\[\]_

_Defined in_ [_src/entities/Checkpoint.ts:102_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Checkpoint.ts#L102)

tokenholder balances at this specific checkpoint

### totalSupply

• **totalSupply**: _BigNumber_

_Defined in_ [_src/entities/Checkpoint.ts:104_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Checkpoint.ts#L104)

### uid

• **uid**: _string_

_Overrides_ [_Entity_]()_._[_uid_]()

_Defined in_ [_src/entities/Checkpoint.ts:83_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Checkpoint.ts#L83)

## Methods

### \_refresh

▸ **\_refresh**\(`params`: Partial‹[Params]()›\): _void_

_Overrides_ [_Entity_]()_._[_\_refresh_]()

_Defined in_ [_src/entities/Checkpoint.ts:164_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Checkpoint.ts#L164)

Hydrate the entity

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | Partial‹[Params]()› |

**Returns:** _void_

### toPojo

▸ **toPojo**\(\): _object_

_Overrides_ [_Entity_]()_._[_toPojo_]()

_Defined in_ [_src/entities/Checkpoint.ts:137_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Checkpoint.ts#L137)

Convert entity to a POJO \(Plain Old Javascript Object\)

**Returns:** _object_

* **createdAt**: _Date_
* **dividendDistributions**: _object\[\]_ = dividendDistributions.map\(distribution =&gt; distribution.toPojo\(\)\)
* **index**: _number_
* **securityTokenId**: _string_
* **securityTokenSymbol**: _string_
* **tokenholderBalances**: [_TokenholderBalance_]()_\[\]_
* **totalSupply**: _BigNumber_
* **uid**: _string_

### `Static` generateId

▸ **generateId**\(`__namedParameters`: object\): _string_

_Defined in_ [_src/entities/Checkpoint.ts:58_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Checkpoint.ts#L58)

Generate the Checkpoint's UUID from its identifying properties

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type |
| :--- | :--- |
| `index` | number |
| `securityTokenId` | string |

**Returns:** _string_

### `Static` unserialize

▸ **unserialize**\(`serialized`: string\): [_UniqueIdentifiers_]()

_Defined in_ [_src/entities/Checkpoint.ts:70_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Checkpoint.ts#L70)

Unserialize string to Checkpoint object

**Parameters:**

| Name | Type |
| :--- | :--- |
| `serialized` | string |

**Returns:** [_UniqueIdentifiers_]()

