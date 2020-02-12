# Class: Checkpoint

Represents a snapshot of the Security Token's supply and Shareholder balances at a certain point in time

## Hierarchy

* [Entity](entities.entity.md)‹[Params](../interfaces/entities.params-6.md)›

  ↳ **Checkpoint**

## Index

### Constructors

* [constructor](entities.checkpoint.md#constructor)

### Properties

* [createdAt](entities.checkpoint.md#createdat)
* [dividendDistributions](entities.checkpoint.md#dividenddistributions)
* [index](entities.checkpoint.md#index)
* [securityTokenId](entities.checkpoint.md#securitytokenid)
* [securityTokenSymbol](entities.checkpoint.md#securitytokensymbol)
* [shareholderBalances](entities.checkpoint.md#shareholderbalances)
* [totalSupply](entities.checkpoint.md#totalsupply)
* [uid](entities.checkpoint.md#uid)

### Methods

* [_refresh](entities.checkpoint.md#_refresh)
* [toPojo](entities.checkpoint.md#topojo)
* [generateId](entities.checkpoint.md#static-generateid)
* [unserialize](entities.checkpoint.md#static-unserialize)

## Constructors

###  constructor

\+ **new Checkpoint**(`params`: [Params](../interfaces/entities.params-6.md) & [UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-5.md)): *[Checkpoint](entities.checkpoint.md)*

*Defined in [src/entities/Checkpoint.ts:111](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Checkpoint.ts#L111)*

Create a new Chekpoint instance

**Parameters:**

Name | Type |
------ | ------ |
`params` | [Params](../interfaces/entities.params-6.md) & [UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-5.md) |

**Returns:** *[Checkpoint](entities.checkpoint.md)*

## Properties

###  createdAt

• **createdAt**: *Date*

*Defined in [src/entities/Checkpoint.ts:111](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Checkpoint.ts#L111)*

___

###  dividendDistributions

• **dividendDistributions**: *[DividendDistribution](entities.dividenddistribution.md)[]*

*Defined in [src/entities/Checkpoint.ts:93](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Checkpoint.ts#L93)*

dividend distributions associated to this snapshot

___

###  index

• **index**: *number*

*Defined in [src/entities/Checkpoint.ts:102](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Checkpoint.ts#L102)*

numerical index of the checkpoint associated to this snapshot

___

###  securityTokenId

• **securityTokenId**: *string*

*Defined in [src/entities/Checkpoint.ts:97](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Checkpoint.ts#L97)*

___

###  securityTokenSymbol

• **securityTokenSymbol**: *string*

*Defined in [src/entities/Checkpoint.ts:95](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Checkpoint.ts#L95)*

___

###  shareholderBalances

• **shareholderBalances**: *[ShareholderBalance](../interfaces/_types_index_.shareholderbalance.md)[]*

*Defined in [src/entities/Checkpoint.ts:107](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Checkpoint.ts#L107)*

shareholder balances at this specific checkpoint

___

###  totalSupply

• **totalSupply**: *BigNumber*

*Defined in [src/entities/Checkpoint.ts:109](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Checkpoint.ts#L109)*

___

###  uid

• **uid**: *string*

*Overrides [Entity](entities.entity.md).[uid](entities.entity.md#abstract-uid)*

*Defined in [src/entities/Checkpoint.ts:88](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Checkpoint.ts#L88)*

## Methods

###  _refresh

▸ **_refresh**(`params`: Partial‹[Params](../interfaces/entities.params-6.md)›): *void*

*Overrides [Entity](entities.entity.md).[_refresh](entities.entity.md#abstract-_refresh)*

*Defined in [src/entities/Checkpoint.ts:169](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Checkpoint.ts#L169)*

Hydrate the entity

**Parameters:**

Name | Type |
------ | ------ |
`params` | Partial‹[Params](../interfaces/entities.params-6.md)› |

**Returns:** *void*

___

###  toPojo

▸ **toPojo**(): *object*

*Overrides [Entity](entities.entity.md).[toPojo](entities.entity.md#abstract-topojo)*

*Defined in [src/entities/Checkpoint.ts:142](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Checkpoint.ts#L142)*

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** *object*

* **createdAt**: *Date*

* **dividendDistributions**: *object[]* =  dividendDistributions.map(distribution => distribution.toPojo())

* **index**: *number*

* **securityTokenId**: *string*

* **securityTokenSymbol**: *string*

* **shareholderBalances**: *[ShareholderBalance](../interfaces/_types_index_.shareholderbalance.md)[]*

* **totalSupply**: *BigNumber*

* **uid**: *string*

___

### `Static` generateId

▸ **generateId**(`__namedParameters`: object): *string*

*Defined in [src/entities/Checkpoint.ts:63](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Checkpoint.ts#L63)*

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

▸ **unserialize**(`serialized`: string): *[UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-5.md)*

*Defined in [src/entities/Checkpoint.ts:75](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/Checkpoint.ts#L75)*

Unserialize string to Checkpoint object

**Parameters:**

Name | Type |
------ | ------ |
`serialized` | string |

**Returns:** *[UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-5.md)*
