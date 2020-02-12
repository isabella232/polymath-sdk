# Class: Factory <**EntityType, T, U**>

Factories are tasked with creating instances of their corresponding Entity and managing the internal cache for that Entity type.
So, for example, the Security Token Factory is tasked with fetching necessary data to instance a Security Token,
as well as fetching/refreshing the internal Security Token cache

## Type parameters

▪ **EntityType**: *[Entity](entities.entity.md)‹T›*

▪ **T**: *any*

▪ **U**: *any*

## Hierarchy

* **Factory**

  ↳ [Erc20TokenBalanceFactory](entities.factories.erc20tokenbalancefactory.md)

  ↳ [InvestmentFactory](entities.factories.investmentfactory.md)

  ↳ [SimpleStoFactory](entities.factories.simplestofactory.md)

  ↳ [TieredStoFactory](entities.factories.tieredstofactory.md)

  ↳ [ShareholderFactory](entities.factories.shareholderfactory.md)

  ↳ [TaxWithholdingFactory](entities.factories.taxwithholdingfactory.md)

  ↳ [WalletFactory](entities.factories.walletfactory.md)

## Index

### Constructors

* [constructor](entities.factories.factory.md#constructor)

### Properties

* [Entity](entities.factories.factory.md#entity)
* [cache](entities.factories.factory.md#cache)
* [context](entities.factories.factory.md#context)

### Methods

* [create](entities.factories.factory.md#create)
* [fetch](entities.factories.factory.md#fetch)
* [refresh](entities.factories.factory.md#refresh)
* [update](entities.factories.factory.md#update)

## Constructors

###  constructor

\+ **new Factory**(`eClass`: [EntityClass](../interfaces/entities.factories.entityclass.md)‹T, U›, `context`: [Context](_context_.context.md)): *[Factory](entities.factories.factory.md)*

*Defined in [src/entities/factories/Factory.ts:47](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/factories/Factory.ts#L47)*

Create a factory that can generate an entity

**Parameters:**

Name | Type |
------ | ------ |
`eClass` | [EntityClass](../interfaces/entities.factories.entityclass.md)‹T, U› |
`context` | [Context](_context_.context.md) |

**Returns:** *[Factory](entities.factories.factory.md)*

## Properties

###  Entity

• **Entity**: *[EntityClass](../interfaces/entities.factories.entityclass.md)‹T, U›*

*Defined in [src/entities/factories/Factory.ts:42](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/factories/Factory.ts#L42)*

entity class that this Factory is in charge of generating and caching

___

###  cache

• **cache**: *object*

*Defined in [src/entities/factories/Factory.ts:33](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/factories/Factory.ts#L33)*

#### Type declaration:

* \[ **key**: *string*\]: EntityType | undefined

___

###  context

• **context**: *[Context](_context_.context.md)*

*Defined in [src/entities/factories/Factory.ts:37](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/factories/Factory.ts#L37)*

## Methods

###  create

▸ **create**(`uid`: string, `params`: T): *EntityType*

*Defined in [src/entities/factories/Factory.ts:92](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/factories/Factory.ts#L92)*

Get an entity from the cache. Creates it if it isn't cached, updates it if it is

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`uid` | string | unique identifier for the entity |
`params` | T | constructor data for the entity  |

**Returns:** *EntityType*

___

###  fetch

▸ **fetch**(`uid`: string): *Promise‹EntityType›*

*Defined in [src/entities/factories/Factory.ts:62](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/factories/Factory.ts#L62)*

Get an entity from the cache. Fetches the necessary data to create it if it isn't cached, refreshes it if it is

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`uid` | string | unique identifier for the entity  |

**Returns:** *Promise‹EntityType›*

___

###  refresh

▸ **refresh**(`uid`: string): *Promise‹void›*

*Defined in [src/entities/factories/Factory.ts:113](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/factories/Factory.ts#L113)*

Fetch the data for an entity and updates its properties

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`uid` | string | unique identifier for the entity  |

**Returns:** *Promise‹void›*

___

###  update

▸ **update**(`uid`: string, `params`: Partial‹T›): *Promise‹void›*

*Defined in [src/entities/factories/Factory.ts:131](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/factories/Factory.ts#L131)*

Update an entity's properties in place

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`uid` | string | unique identifier for the entity |
`params` | Partial‹T› | properties that should be updated  |

**Returns:** *Promise‹void›*
