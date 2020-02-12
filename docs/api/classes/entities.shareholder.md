# Class: Shareholder

Used to manage a Shareholder

## Hierarchy

* [Entity](entities.entity.md)‹[Params](../interfaces/entities.params-5.md)›

  ↳ **Shareholder**

## Index

### Constructors

* [constructor](entities.shareholder.md#constructor)

### Properties

* [address](entities.shareholder.md#address)
* [balance](entities.shareholder.md#balance)
* [canBuyFromSto](entities.shareholder.md#canbuyfromsto)
* [canReceiveAfter](entities.shareholder.md#canreceiveafter)
* [canSendAfter](entities.shareholder.md#cansendafter)
* [isAccredited](entities.shareholder.md#isaccredited)
* [kycExpiry](entities.shareholder.md#kycexpiry)
* [securityTokenId](entities.shareholder.md#securitytokenid)
* [securityTokenSymbol](entities.shareholder.md#securitytokensymbol)
* [uid](entities.shareholder.md#uid)

### Methods

* [_refresh](entities.shareholder.md#_refresh)
* [isRevoked](entities.shareholder.md#isrevoked)
* [toPojo](entities.shareholder.md#topojo)
* [generateId](entities.shareholder.md#static-generateid)
* [unserialize](entities.shareholder.md#static-unserialize)

## Constructors

###  constructor

\+ **new Shareholder**(`params`: [Params](../interfaces/entities.params-5.md) & [UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-2.md)): *[Shareholder](entities.shareholder.md)*

*Defined in [src/entities/Shareholder.ts:117](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Shareholder.ts#L117)*

Create a new Shareholder instance

**Parameters:**

Name | Type |
------ | ------ |
`params` | [Params](../interfaces/entities.params-5.md) & [UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-2.md) |

**Returns:** *[Shareholder](entities.shareholder.md)*

## Properties

###  address

• **address**: *string*

*Defined in [src/entities/Shareholder.ts:117](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Shareholder.ts#L117)*

wallet address

___

###  balance

• **balance**: *BigNumber*

*Defined in [src/entities/Shareholder.ts:112](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Shareholder.ts#L112)*

total Security Token balance of the Shareholder

___

###  canBuyFromSto

• **canBuyFromSto**: *boolean*

*Defined in [src/entities/Shareholder.ts:107](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Shareholder.ts#L107)*

whether the Shareholder can purchase from an STO or not

___

###  canReceiveAfter

• **canReceiveAfter**: *Date*

*Defined in [src/entities/Shareholder.ts:92](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Shareholder.ts#L92)*

date after which a Shareholder can transfer tokens to their address

___

###  canSendAfter

• **canSendAfter**: *Date*

*Defined in [src/entities/Shareholder.ts:87](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Shareholder.ts#L87)*

date after which a Shareholder can transfer tokens from their address

___

###  isAccredited

• **isAccredited**: *boolean*

*Defined in [src/entities/Shareholder.ts:102](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Shareholder.ts#L102)*

whether the Shareholder is accredited or not

___

###  kycExpiry

• **kycExpiry**: *Date*

*Defined in [src/entities/Shareholder.ts:97](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Shareholder.ts#L97)*

date when the Shareholder's KYC will expire

___

###  securityTokenId

• **securityTokenId**: *string*

*Defined in [src/entities/Shareholder.ts:82](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Shareholder.ts#L82)*

___

###  securityTokenSymbol

• **securityTokenSymbol**: *string*

*Defined in [src/entities/Shareholder.ts:80](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Shareholder.ts#L80)*

___

###  uid

• **uid**: *string*

*Overrides [Entity](entities.entity.md).[uid](entities.entity.md#abstract-uid)*

*Defined in [src/entities/Shareholder.ts:78](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Shareholder.ts#L78)*

unique generated id for a Shareholder

## Methods

###  _refresh

▸ **_refresh**(`params`: Partial‹[Params](../interfaces/entities.params-5.md)›): *void*

*Overrides [Entity](entities.entity.md).[_refresh](entities.entity.md#abstract-_refresh)*

*Defined in [src/entities/Shareholder.ts:200](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Shareholder.ts#L200)*

Hydrate the entity

**Parameters:**

Name | Type |
------ | ------ |
`params` | Partial‹[Params](../interfaces/entities.params-5.md)› |

**Returns:** *void*

___

###  isRevoked

▸ **isRevoked**(): *boolean*

*Defined in [src/entities/Shareholder.ts:155](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Shareholder.ts#L155)*

Checks if this Shareholder's KYC has been manually revoked

**Returns:** *boolean*

___

###  toPojo

▸ **toPojo**(): *object*

*Overrides [Entity](entities.entity.md).[toPojo](entities.entity.md#abstract-topojo)*

*Defined in [src/entities/Shareholder.ts:169](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Shareholder.ts#L169)*

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** *object*

___

### `Static` generateId

▸ **generateId**(`__namedParameters`: object): *string*

*Defined in [src/entities/Shareholder.ts:50](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Shareholder.ts#L50)*

Generate the Shareholder's UUID from its identifying properties

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | object |

**Returns:** *string*

___

### `Static` unserialize

▸ **unserialize**(`serialized`: string): *[UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-2.md)*

*Defined in [src/entities/Shareholder.ts:62](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Shareholder.ts#L62)*

Unserialize a serialized Shareholder entity

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`serialized` | string | string with Shareholder entity information  |

**Returns:** *[UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-2.md)*
