# Class: Investment

Used to manage an Investment in a Security Token Offering

## Hierarchy

* [Entity](_entities_entity_.entity.md)‹[Params](../interfaces/_entities_investment_.params.md)›

  ↳ **Investment**

## Index

### Constructors

* [constructor](_entities_investment_.investment.md#constructor)

### Properties

* [address](_entities_investment_.investment.md#address)
* [index](_entities_investment_.investment.md#index)
* [investedFunds](_entities_investment_.investment.md#investedfunds)
* [securityTokenId](_entities_investment_.investment.md#securitytokenid)
* [securityTokenSymbol](_entities_investment_.investment.md#securitytokensymbol)
* [stoId](_entities_investment_.investment.md#stoid)
* [tokenAmount](_entities_investment_.investment.md#tokenamount)
* [uid](_entities_investment_.investment.md#uid)

### Methods

* [_refresh](_entities_investment_.investment.md#_refresh)
* [toPojo](_entities_investment_.investment.md#topojo)
* [generateId](_entities_investment_.investment.md#static-generateid)
* [unserialize](_entities_investment_.investment.md#static-unserialize)

## Constructors

###  constructor

\+ **new Investment**(`params`: [Params](../interfaces/_entities_investment_.params.md) & [UniqueIdentifiers](../interfaces/_entities_investment_.uniqueidentifiers.md)): *[Investment](_entities_investment_.investment.md)*

*Defined in [src/entities/Investment.ts:103](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/Investment.ts#L103)*

Create an Investment instance

**Parameters:**

Name | Type |
------ | ------ |
`params` | [Params](../interfaces/_entities_investment_.params.md) & [UniqueIdentifiers](../interfaces/_entities_investment_.uniqueidentifiers.md) |

**Returns:** *[Investment](_entities_investment_.investment.md)*

## Properties

###  address

• **address**: *string*

*Defined in [src/entities/Investment.ts:88](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/Investment.ts#L88)*

wallet address of token holder

___

###  index

• **index**: *number*

*Defined in [src/entities/Investment.ts:93](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/Investment.ts#L93)*

index of the Investment

___

###  investedFunds

• **investedFunds**: *BigNumber*

*Defined in [src/entities/Investment.ts:103](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/Investment.ts#L103)*

amount of funds used to make Investment

___

###  securityTokenId

• **securityTokenId**: *string*

*Defined in [src/entities/Investment.ts:76](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/Investment.ts#L76)*

___

###  securityTokenSymbol

• **securityTokenSymbol**: *string*

*Defined in [src/entities/Investment.ts:83](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/Investment.ts#L83)*

___

###  stoId

• **stoId**: *string*

*Defined in [src/entities/Investment.ts:81](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/Investment.ts#L81)*

unique ID for the Investment

___

###  tokenAmount

• **tokenAmount**: *BigNumber*

*Defined in [src/entities/Investment.ts:98](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/Investment.ts#L98)*

total amount of tokens involved in the Investment

___

###  uid

• **uid**: *string*

*Overrides [Entity](_entities_entity_.entity.md).[uid](_entities_entity_.entity.md#abstract-uid)*

*Defined in [src/entities/Investment.ts:74](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/Investment.ts#L74)*

unique generated identifier for an Investment

## Methods

###  _refresh

▸ **_refresh**(`params`: Partial‹[Params](../interfaces/_entities_investment_.params.md)›): *void*

*Overrides [Entity](_entities_entity_.entity.md).[_refresh](_entities_entity_.entity.md#abstract-_refresh)*

*Defined in [src/entities/Investment.ts:165](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/Investment.ts#L165)*

Hydrate the entity

**Parameters:**

Name | Type |
------ | ------ |
`params` | Partial‹[Params](../interfaces/_entities_investment_.params.md)› |

**Returns:** *void*

___

###  toPojo

▸ **toPojo**(): *object*

*Overrides [Entity](_entities_entity_.entity.md).[toPojo](_entities_entity_.entity.md#abstract-topojo)*

*Defined in [src/entities/Investment.ts:138](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/Investment.ts#L138)*

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** *object*

* **address**: *string*

* **index**: *number*

* **investedFunds**: *BigNumber*

* **securityTokenId**: *string*

* **securityTokenSymbol**: *string*

* **stoId**: *string*

* **tokenAmount**: *BigNumber*

* **uid**: *string*

___

### `Static` generateId

▸ **generateId**(`__namedParameters`: object): *string*

*Defined in [src/entities/Investment.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/Investment.ts#L45)*

Generate the Investment's UUID from its identifying properties

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`index` | number |
`securityTokenId` | string |
`stoId` | string |

**Returns:** *string*

___

### `Static` unserialize

▸ **unserialize**(`serialized`: string): *[UniqueIdentifiers](../interfaces/_entities_investment_.uniqueidentifiers.md)*

*Defined in [src/entities/Investment.ts:58](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/Investment.ts#L58)*

Unserialize a serialized Investment entity

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`serialized` | string | string with Investment entity information  |

**Returns:** *[UniqueIdentifiers](../interfaces/_entities_investment_.uniqueidentifiers.md)*
