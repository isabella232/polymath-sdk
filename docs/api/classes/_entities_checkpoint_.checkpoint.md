# Class: Checkpoint

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

* [_refresh](_entities_checkpoint_.checkpoint.md#_refresh)
* [toPojo](_entities_checkpoint_.checkpoint.md#topojo)
* [generateId](_entities_checkpoint_.checkpoint.md#static-generateid)
* [unserialize](_entities_checkpoint_.checkpoint.md#static-unserialize)

## Constructors

###  constructor

\+ **new Checkpoint**(`params`: [Params](../interfaces/_entities_checkpoint_.params.md) & [UniqueIdentifiers](../interfaces/_entities_checkpoint_.uniqueidentifiers.md)): *[Checkpoint](_entities_checkpoint_.checkpoint.md)*

*Defined in [src/entities/Checkpoint.ts:106](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Checkpoint.ts#L106)*

Create a new Chekpoint instance

**Parameters:**

Name | Type |
------ | ------ |
`params` | [Params](../interfaces/_entities_checkpoint_.params.md) & [UniqueIdentifiers](../interfaces/_entities_checkpoint_.uniqueidentifiers.md) |

**Returns:** *[Checkpoint](_entities_checkpoint_.checkpoint.md)*

## Properties

###  createdAt

• **createdAt**: *Date*

*Defined in [src/entities/Checkpoint.ts:106](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Checkpoint.ts#L106)*

___

###  dividendDistributions

• **dividendDistributions**: *[DividendDistribution](_entities_dividenddistribution_.dividenddistribution.md)[]*

*Defined in [src/entities/Checkpoint.ts:88](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Checkpoint.ts#L88)*

dividend distributions associated to this snapshot

___

###  index

• **index**: *number*

*Defined in [src/entities/Checkpoint.ts:97](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Checkpoint.ts#L97)*

numerical index of the checkpoint associated to this snapshot

___

###  securityTokenId

• **securityTokenId**: *string*

*Defined in [src/entities/Checkpoint.ts:92](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Checkpoint.ts#L92)*

___

###  securityTokenSymbol

• **securityTokenSymbol**: *string*

*Defined in [src/entities/Checkpoint.ts:90](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Checkpoint.ts#L90)*

___

###  tokenholderBalances

• **tokenholderBalances**: *[TokenholderBalance](../interfaces/_types_index_.tokenholderbalance.md)[]*

*Defined in [src/entities/Checkpoint.ts:102](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Checkpoint.ts#L102)*

tokenholder balances at this specific checkpoint

___

###  totalSupply

• **totalSupply**: *BigNumber*

*Defined in [src/entities/Checkpoint.ts:104](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Checkpoint.ts#L104)*

___

###  uid

• **uid**: *string*

*Overrides [Entity](_entities_entity_.entity.md).[uid](_entities_entity_.entity.md#abstract-uid)*

*Defined in [src/entities/Checkpoint.ts:83](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Checkpoint.ts#L83)*

## Methods

###  _refresh

▸ **_refresh**(`params`: Partial‹[Params](../interfaces/_entities_checkpoint_.params.md)›): *void*

*Overrides [Entity](_entities_entity_.entity.md).[_refresh](_entities_entity_.entity.md#abstract-_refresh)*

*Defined in [src/entities/Checkpoint.ts:164](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Checkpoint.ts#L164)*

Hydrate the entity

**Parameters:**

Name | Type |
------ | ------ |
`params` | Partial‹[Params](../interfaces/_entities_checkpoint_.params.md)› |

**Returns:** *void*

___

###  toPojo

▸ **toPojo**(): *object*

*Overrides [Entity](_entities_entity_.entity.md).[toPojo](_entities_entity_.entity.md#abstract-topojo)*

*Defined in [src/entities/Checkpoint.ts:137](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Checkpoint.ts#L137)*

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** *object*

* **createdAt**: *Date*

* **dividendDistributions**: *object[]* =  dividendDistributions.map(distribution => distribution.toPojo())

* **index**: *number*

* **securityTokenId**: *string*

* **securityTokenSymbol**: *string*

* **tokenholderBalances**: *[TokenholderBalance](../interfaces/_types_index_.tokenholderbalance.md)[]*

* **totalSupply**: *BigNumber*

* **uid**: *string*

___

### `Static` generateId

▸ **generateId**(`__namedParameters`: object): *string*

*Defined in [src/entities/Checkpoint.ts:58](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Checkpoint.ts#L58)*

Generate the Checkpoint's UUID from its identifying properties

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`index` | number |
`securityTokenId` | string |

**Returns:** *string*

___

### `Static` unserialize

▸ **unserialize**(`serialized`: string): *[UniqueIdentifiers](../interfaces/_entities_checkpoint_.uniqueidentifiers.md)*

*Defined in [src/entities/Checkpoint.ts:70](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Checkpoint.ts#L70)*

Unserialize string to Checkpoint object

**Parameters:**

Name | Type |
------ | ------ |
`serialized` | string |

**Returns:** *[UniqueIdentifiers](../interfaces/_entities_checkpoint_.uniqueidentifiers.md)*
