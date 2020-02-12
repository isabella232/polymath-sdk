# Class: Investment

Used to manage an Investment in a Security Token Offering

## Hierarchy

* [Entity](entities.entity.md)‹[Params](../interfaces/entities.params-7.md)›

  ↳ **Investment**

## Index

### Constructors

* [constructor](entities.investment.md#constructor)

### Properties

* [address](entities.investment.md#address)
* [index](entities.investment.md#index)
* [investedFunds](entities.investment.md#investedfunds)
* [securityTokenId](entities.investment.md#securitytokenid)
* [securityTokenSymbol](entities.investment.md#securitytokensymbol)
* [stoId](entities.investment.md#stoid)
* [tokenAmount](entities.investment.md#tokenamount)
* [uid](entities.investment.md#uid)

### Methods

* [_refresh](entities.investment.md#_refresh)
* [toPojo](entities.investment.md#topojo)
* [generateId](entities.investment.md#static-generateid)
* [unserialize](entities.investment.md#static-unserialize)

## Constructors

###  constructor

\+ **new Investment**(`params`: [Params](../interfaces/entities.params-7.md) & [UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-1.md)): *[Investment](entities.investment.md)*

*Defined in [src/entities/Investment.ts:108](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Investment.ts#L108)*

Create an Investment instance

**Parameters:**

Name | Type |
------ | ------ |
`params` | [Params](../interfaces/entities.params-7.md) & [UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-1.md) |

**Returns:** *[Investment](entities.investment.md)*

## Properties

###  address

• **address**: *string*

*Defined in [src/entities/Investment.ts:93](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Investment.ts#L93)*

wallet address of token holder

___

###  index

• **index**: *number*

*Defined in [src/entities/Investment.ts:98](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Investment.ts#L98)*

index of the Investment

___

###  investedFunds

• **investedFunds**: *BigNumber*

*Defined in [src/entities/Investment.ts:108](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Investment.ts#L108)*

amount of funds used to make Investment

___

###  securityTokenId

• **securityTokenId**: *string*

*Defined in [src/entities/Investment.ts:81](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Investment.ts#L81)*

___

###  securityTokenSymbol

• **securityTokenSymbol**: *string*

*Defined in [src/entities/Investment.ts:88](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Investment.ts#L88)*

___

###  stoId

• **stoId**: *string*

*Defined in [src/entities/Investment.ts:86](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Investment.ts#L86)*

unique ID for the Investment

___

###  tokenAmount

• **tokenAmount**: *BigNumber*

*Defined in [src/entities/Investment.ts:103](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Investment.ts#L103)*

total amount of tokens involved in the Investment

___

###  uid

• **uid**: *string*

*Overrides [Entity](entities.entity.md).[uid](entities.entity.md#abstract-uid)*

*Defined in [src/entities/Investment.ts:79](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Investment.ts#L79)*

unique generated identifier for an Investment

## Methods

###  _refresh

▸ **_refresh**(`params`: Partial‹[Params](../interfaces/entities.params-7.md)›): *void*

*Overrides [Entity](entities.entity.md).[_refresh](entities.entity.md#abstract-_refresh)*

*Defined in [src/entities/Investment.ts:170](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Investment.ts#L170)*

Hydrate the entity

**Parameters:**

Name | Type |
------ | ------ |
`params` | Partial‹[Params](../interfaces/entities.params-7.md)› |

**Returns:** *void*

___

###  toPojo

▸ **toPojo**(): *object*

*Overrides [Entity](entities.entity.md).[toPojo](entities.entity.md#abstract-topojo)*

*Defined in [src/entities/Investment.ts:143](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Investment.ts#L143)*

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** *object*

___

### `Static` generateId

▸ **generateId**(`__namedParameters`: object): *string*

*Defined in [src/entities/Investment.ts:50](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Investment.ts#L50)*

Generate the Investment's UUID from its identifying properties

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | object |

**Returns:** *string*

___

### `Static` unserialize

▸ **unserialize**(`serialized`: string): *[UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-1.md)*

*Defined in [src/entities/Investment.ts:63](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Investment.ts#L63)*

Unserialize a serialized Investment entity

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`serialized` | string | string with Investment entity information  |

**Returns:** *[UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-1.md)*
