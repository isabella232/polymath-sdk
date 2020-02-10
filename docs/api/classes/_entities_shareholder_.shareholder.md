# Class: Shareholder

Used to manage a Shareholder

## Hierarchy

* [Entity](_entities_entity_.entity.md)‹[Params](../interfaces/_entities_shareholder_.params.md)›

  ↳ **Shareholder**

## Index

### Constructors

* [constructor](_entities_shareholder_.shareholder.md#constructor)

### Properties

* [address](_entities_shareholder_.shareholder.md#address)
* [balance](_entities_shareholder_.shareholder.md#balance)
* [canBuyFromSto](_entities_shareholder_.shareholder.md#canbuyfromsto)
* [canReceiveAfter](_entities_shareholder_.shareholder.md#canreceiveafter)
* [canSendAfter](_entities_shareholder_.shareholder.md#cansendafter)
* [isAccredited](_entities_shareholder_.shareholder.md#isaccredited)
* [kycExpiry](_entities_shareholder_.shareholder.md#kycexpiry)
* [securityTokenId](_entities_shareholder_.shareholder.md#securitytokenid)
* [securityTokenSymbol](_entities_shareholder_.shareholder.md#securitytokensymbol)
* [uid](_entities_shareholder_.shareholder.md#uid)

### Methods

* [_refresh](_entities_shareholder_.shareholder.md#_refresh)
* [isRevoked](_entities_shareholder_.shareholder.md#isrevoked)
* [toPojo](_entities_shareholder_.shareholder.md#topojo)
* [generateId](_entities_shareholder_.shareholder.md#static-generateid)
* [unserialize](_entities_shareholder_.shareholder.md#static-unserialize)

## Constructors

###  constructor

\+ **new Shareholder**(`params`: [Params](../interfaces/_entities_shareholder_.params.md) & [UniqueIdentifiers](../interfaces/_entities_shareholder_.uniqueidentifiers.md)): *[Shareholder](_entities_shareholder_.shareholder.md)*

*Defined in [src/entities/Shareholder.ts:112](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Shareholder.ts#L112)*

Create a new Shareholder instance

**Parameters:**

Name | Type |
------ | ------ |
`params` | [Params](../interfaces/_entities_shareholder_.params.md) & [UniqueIdentifiers](../interfaces/_entities_shareholder_.uniqueidentifiers.md) |

**Returns:** *[Shareholder](_entities_shareholder_.shareholder.md)*

## Properties

###  address

• **address**: *string*

*Defined in [src/entities/Shareholder.ts:112](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Shareholder.ts#L112)*

wallet address

___

###  balance

• **balance**: *BigNumber*

*Defined in [src/entities/Shareholder.ts:107](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Shareholder.ts#L107)*

total Security Token balance of the Shareholder

___

###  canBuyFromSto

• **canBuyFromSto**: *boolean*

*Defined in [src/entities/Shareholder.ts:102](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Shareholder.ts#L102)*

whether the Shareholder can purchase from an STO or not

___

###  canReceiveAfter

• **canReceiveAfter**: *Date*

*Defined in [src/entities/Shareholder.ts:87](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Shareholder.ts#L87)*

date after which a Shareholder can transfer tokens to their address

___

###  canSendAfter

• **canSendAfter**: *Date*

*Defined in [src/entities/Shareholder.ts:82](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Shareholder.ts#L82)*

date after which a Shareholder can transfer tokens from their address

___

###  isAccredited

• **isAccredited**: *boolean*

*Defined in [src/entities/Shareholder.ts:97](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Shareholder.ts#L97)*

whether the Shareholder is accredited or not

___

###  kycExpiry

• **kycExpiry**: *Date*

*Defined in [src/entities/Shareholder.ts:92](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Shareholder.ts#L92)*

date when the Shareholder's KYC will expire

___

###  securityTokenId

• **securityTokenId**: *string*

*Defined in [src/entities/Shareholder.ts:77](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Shareholder.ts#L77)*

___

###  securityTokenSymbol

• **securityTokenSymbol**: *string*

*Defined in [src/entities/Shareholder.ts:75](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Shareholder.ts#L75)*

___

###  uid

• **uid**: *string*

*Overrides [Entity](_entities_entity_.entity.md).[uid](_entities_entity_.entity.md#abstract-uid)*

*Defined in [src/entities/Shareholder.ts:73](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Shareholder.ts#L73)*

unique generated id for a Shareholder

## Methods

###  _refresh

▸ **_refresh**(`params`: Partial‹[Params](../interfaces/_entities_shareholder_.params.md)›): *void*

*Overrides [Entity](_entities_entity_.entity.md).[_refresh](_entities_entity_.entity.md#abstract-_refresh)*

*Defined in [src/entities/Shareholder.ts:195](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Shareholder.ts#L195)*

Hydrate the entity

**Parameters:**

Name | Type |
------ | ------ |
`params` | Partial‹[Params](../interfaces/_entities_shareholder_.params.md)› |

**Returns:** *void*

___

###  isRevoked

▸ **isRevoked**(): *boolean*

*Defined in [src/entities/Shareholder.ts:150](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Shareholder.ts#L150)*

Checks if this Shareholder's KYC has been manually revoked

**Returns:** *boolean*

___

###  toPojo

▸ **toPojo**(): *object*

*Overrides [Entity](_entities_entity_.entity.md).[toPojo](_entities_entity_.entity.md#abstract-topojo)*

*Defined in [src/entities/Shareholder.ts:164](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Shareholder.ts#L164)*

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

*Defined in [src/entities/Shareholder.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Shareholder.ts#L45)*

Generate the Shareholder's UUID from its identifying properties

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`address` | string |
`securityTokenId` | string |

**Returns:** *string*

___

### `Static` unserialize

▸ **unserialize**(`serialized`: string): *[UniqueIdentifiers](../interfaces/_entities_shareholder_.uniqueidentifiers.md)*

*Defined in [src/entities/Shareholder.ts:57](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/Shareholder.ts#L57)*

Unserialize a serialized Shareholder entity

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`serialized` | string | string with Shareholder entity information  |

**Returns:** *[UniqueIdentifiers](../interfaces/_entities_shareholder_.uniqueidentifiers.md)*
