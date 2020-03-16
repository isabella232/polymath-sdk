# Class: InvestmentFactory

Factory generates information for an Investment entity

## Hierarchy

* [Factory](_entities_factories_factory_.factory.md)‹[Investment](_entities_investment_.investment.md), [Params](../interfaces/_entities_investment_.params.md), [UniqueIdentifiers](../interfaces/_entities_investment_.uniqueidentifiers.md)›

  ↳ **InvestmentFactory**

## Index

### Constructors

* [constructor](_entities_factories_investmentfactory_.investmentfactory.md#constructor)

### Properties

* [Entity](_entities_factories_investmentfactory_.investmentfactory.md#entity)
* [cache](_entities_factories_investmentfactory_.investmentfactory.md#cache)
* [context](_entities_factories_investmentfactory_.investmentfactory.md#context)

### Methods

* [create](_entities_factories_investmentfactory_.investmentfactory.md#create)
* [fetch](_entities_factories_investmentfactory_.investmentfactory.md#fetch)
* [refresh](_entities_factories_investmentfactory_.investmentfactory.md#refresh)
* [update](_entities_factories_investmentfactory_.investmentfactory.md#update)

## Constructors

###  constructor

\+ **new InvestmentFactory**(`context`: [Context](_context_.context.md)): *[InvestmentFactory](_entities_factories_investmentfactory_.investmentfactory.md)*

*Overrides [Factory](_entities_factories_factory_.factory.md).[constructor](_entities_factories_factory_.factory.md#constructor)*

*Defined in [src/entities/factories/InvestmentFactory.ts:106](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/factories/InvestmentFactory.ts#L106)*

Create an instance of the Investment Factory

**Parameters:**

Name | Type |
------ | ------ |
`context` | [Context](_context_.context.md) |

**Returns:** *[InvestmentFactory](_entities_factories_investmentfactory_.investmentfactory.md)*

## Properties

###  Entity

• **Entity**: *[EntityClass](../interfaces/_entities_factories_factory_.entityclass.md)‹[Params](../interfaces/_entities_investment_.params.md), [UniqueIdentifiers](../interfaces/_entities_investment_.uniqueidentifiers.md)›*

*Inherited from [Factory](_entities_factories_factory_.factory.md).[Entity](_entities_factories_factory_.factory.md#entity)*

*Defined in [src/entities/factories/Factory.ts:37](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/factories/Factory.ts#L37)*

entity class that this Factory is in charge of generating and caching

___

###  cache

• **cache**: *object*

*Inherited from [Factory](_entities_factories_factory_.factory.md).[cache](_entities_factories_factory_.factory.md#cache)*

*Defined in [src/entities/factories/Factory.ts:28](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/factories/Factory.ts#L28)*

#### Type declaration:

* \[ **key**: *string*\]: [Investment](_entities_investment_.investment.md) | undefined

___

###  context

• **context**: *[Context](_context_.context.md)*

*Inherited from [Factory](_entities_factories_factory_.factory.md).[context](_entities_factories_factory_.factory.md#context)*

*Defined in [src/entities/factories/Factory.ts:32](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/factories/Factory.ts#L32)*

## Methods

###  create

▸ **create**(`uid`: string, `params`: [Params](../interfaces/_entities_investment_.params.md)): *EntityType*

*Inherited from [Factory](_entities_factories_factory_.factory.md).[create](_entities_factories_factory_.factory.md#create)*

*Defined in [src/entities/factories/Factory.ts:87](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/factories/Factory.ts#L87)*

Get an entity from the cache. Creates it if it isn't cached, updates it if it is

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`uid` | string | unique identifier for the entity |
`params` | [Params](../interfaces/_entities_investment_.params.md) | constructor data for the entity  |

**Returns:** *EntityType*

___

###  fetch

▸ **fetch**(`uid`: string): *Promise‹EntityType›*

*Inherited from [Factory](_entities_factories_factory_.factory.md).[fetch](_entities_factories_factory_.factory.md#fetch)*

*Defined in [src/entities/factories/Factory.ts:57](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/factories/Factory.ts#L57)*

Get an entity from the cache. Fetches the necessary data to create it if it isn't cached, refreshes it if it is

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`uid` | string | unique identifier for the entity  |

**Returns:** *Promise‹EntityType›*

___

###  refresh

▸ **refresh**(`uid`: string): *Promise‹void›*

*Inherited from [Factory](_entities_factories_factory_.factory.md).[refresh](_entities_factories_factory_.factory.md#refresh)*

*Defined in [src/entities/factories/Factory.ts:108](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/factories/Factory.ts#L108)*

Fetch the data for an entity and updates its properties

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`uid` | string | unique identifier for the entity  |

**Returns:** *Promise‹void›*

___

###  update

▸ **update**(`uid`: string, `params`: Partial‹[Params](../interfaces/_entities_investment_.params.md)›): *Promise‹void›*

*Inherited from [Factory](_entities_factories_factory_.factory.md).[update](_entities_factories_factory_.factory.md#update)*

*Defined in [src/entities/factories/Factory.ts:126](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/factories/Factory.ts#L126)*

Update an entity's properties in place

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`uid` | string | unique identifier for the entity |
`params` | Partial‹[Params](../interfaces/_entities_investment_.params.md)› | properties that should be updated  |

**Returns:** *Promise‹void›*
