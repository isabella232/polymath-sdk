# Class: Tokenholder

Used to manage a Tokenholder

## Hierarchy

* [Entity](_entities_entity_.entity.md)‹[Params](../interfaces/_entities_tokenholder_.params.md)›

  ↳ **Tokenholder**

## Index

### Constructors

* [constructor](_entities_tokenholder_.tokenholder.md#constructor)

### Properties

* [address](_entities_tokenholder_.tokenholder.md#address)
* [balance](_entities_tokenholder_.tokenholder.md#balance)
* [canBuyFromSto](_entities_tokenholder_.tokenholder.md#canbuyfromsto)
* [canReceiveAfter](_entities_tokenholder_.tokenholder.md#canreceiveafter)
* [canSendAfter](_entities_tokenholder_.tokenholder.md#cansendafter)
* [isAccredited](_entities_tokenholder_.tokenholder.md#isaccredited)
* [kycExpiry](_entities_tokenholder_.tokenholder.md#kycexpiry)
* [securityTokenId](_entities_tokenholder_.tokenholder.md#securitytokenid)
* [securityTokenSymbol](_entities_tokenholder_.tokenholder.md#securitytokensymbol)
* [uid](_entities_tokenholder_.tokenholder.md#uid)

### Methods

* [_refresh](_entities_tokenholder_.tokenholder.md#_refresh)
* [isRevoked](_entities_tokenholder_.tokenholder.md#isrevoked)
* [toPojo](_entities_tokenholder_.tokenholder.md#topojo)
* [generateId](_entities_tokenholder_.tokenholder.md#static-generateid)
* [unserialize](_entities_tokenholder_.tokenholder.md#static-unserialize)

## Constructors

###  constructor

\+ **new Tokenholder**(`params`: [Params](../interfaces/_entities_tokenholder_.params.md) & [UniqueIdentifiers](../interfaces/_entities_tokenholder_.uniqueidentifiers.md)): *[Tokenholder](_entities_tokenholder_.tokenholder.md)*

Defined in src/entities/Tokenholder.ts:112

Create a new Tokenholder instance

**Parameters:**

Name | Type |
------ | ------ |
`params` | [Params](../interfaces/_entities_tokenholder_.params.md) & [UniqueIdentifiers](../interfaces/_entities_tokenholder_.uniqueidentifiers.md) |

**Returns:** *[Tokenholder](_entities_tokenholder_.tokenholder.md)*

## Properties

###  address

• **address**: *string*

Defined in src/entities/Tokenholder.ts:112

wallet address

___

###  balance

• **balance**: *BigNumber*

Defined in src/entities/Tokenholder.ts:107

total Security Token balance of the Tokenholder

___

###  canBuyFromSto

• **canBuyFromSto**: *boolean*

Defined in src/entities/Tokenholder.ts:102

whether the Tokenholder can purchase from an STO or not

___

###  canReceiveAfter

• **canReceiveAfter**: *Date*

Defined in src/entities/Tokenholder.ts:87

date after which a Tokenholder can transfer tokens to their address

___

###  canSendAfter

• **canSendAfter**: *Date*

Defined in src/entities/Tokenholder.ts:82

date after which a Tokenholder can transfer tokens from their address

___

###  isAccredited

• **isAccredited**: *boolean*

Defined in src/entities/Tokenholder.ts:97

whether the Tokenholder is accredited or not

___

###  kycExpiry

• **kycExpiry**: *Date*

Defined in src/entities/Tokenholder.ts:92

date when the Tokenholder's KYC will expire

___

###  securityTokenId

• **securityTokenId**: *string*

Defined in src/entities/Tokenholder.ts:77

___

###  securityTokenSymbol

• **securityTokenSymbol**: *string*

Defined in src/entities/Tokenholder.ts:75

___

###  uid

• **uid**: *string*

*Overrides [Entity](_entities_entity_.entity.md).[uid](_entities_entity_.entity.md#abstract-uid)*

Defined in src/entities/Tokenholder.ts:73

unique generated id for a Tokenholder

## Methods

###  _refresh

▸ **_refresh**(`params`: Partial‹[Params](../interfaces/_entities_tokenholder_.params.md)›): *void*

*Overrides [Entity](_entities_entity_.entity.md).[_refresh](_entities_entity_.entity.md#abstract-_refresh)*

Defined in src/entities/Tokenholder.ts:195

Hydrate the entity

**Parameters:**

Name | Type |
------ | ------ |
`params` | Partial‹[Params](../interfaces/_entities_tokenholder_.params.md)› |

**Returns:** *void*

___

###  isRevoked

▸ **isRevoked**(): *boolean*

Defined in src/entities/Tokenholder.ts:150

Checks if this Tokenholder's KYC has been manually revoked

**Returns:** *boolean*

___

###  toPojo

▸ **toPojo**(): *object*

*Overrides [Entity](_entities_entity_.entity.md).[toPojo](_entities_entity_.entity.md#abstract-topojo)*

Defined in src/entities/Tokenholder.ts:164

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** *object*

* **address**: *string*

* **balance**: *BigNumber*

* **canBuyFromSto**: *boolean*

* **canReceiveAfter**: *Date*

* **canSendAfter**: *Date*

* **isAccredited**: *boolean*

* **kycExpiry**: *Date*

* **securityTokenId**: *string*

* **securityTokenSymbol**: *string*

* **uid**: *string*

___

### `Static` generateId

▸ **generateId**(`__namedParameters`: object): *string*

Defined in src/entities/Tokenholder.ts:45

Generate the Tokenholder's UUID from its identifying properties

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`address` | string |
`securityTokenId` | string |

**Returns:** *string*

___

### `Static` unserialize

▸ **unserialize**(`serialized`: string): *[UniqueIdentifiers](../interfaces/_entities_tokenholder_.uniqueidentifiers.md)*

Defined in src/entities/Tokenholder.ts:57

Unserialize a serialized Tokenholder entity

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`serialized` | string | string with Tokenholder entity information  |

**Returns:** *[UniqueIdentifiers](../interfaces/_entities_tokenholder_.uniqueidentifiers.md)*
