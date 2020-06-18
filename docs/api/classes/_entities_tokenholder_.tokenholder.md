# Tokenholder

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

* [\_refresh](_entities_tokenholder_.tokenholder.md#_refresh)
* [isRevoked](_entities_tokenholder_.tokenholder.md#isrevoked)
* [toPojo](_entities_tokenholder_.tokenholder.md#topojo)
* [generateId](_entities_tokenholder_.tokenholder.md#static-generateid)
* [unserialize](_entities_tokenholder_.tokenholder.md#static-unserialize)

## Constructors

### constructor

+ **new Tokenholder**\(`params`: [Params](../interfaces/_entities_tokenholder_.params.md) & [UniqueIdentifiers](../interfaces/_entities_tokenholder_.uniqueidentifiers.md)\): [_Tokenholder_](_entities_tokenholder_.tokenholder.md)

Defined in src/entities/Tokenholder.ts:112

Create a new Tokenholder instance

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | [Params](../interfaces/_entities_tokenholder_.params.md) & [UniqueIdentifiers](../interfaces/_entities_tokenholder_.uniqueidentifiers.md) |

**Returns:** [_Tokenholder_](_entities_tokenholder_.tokenholder.md)

## Properties

### address

• **address**: _string_

Defined in src/entities/Tokenholder.ts:112

wallet address

### balance

• **balance**: _BigNumber_

Defined in src/entities/Tokenholder.ts:107

total Security Token balance of the Tokenholder

### canBuyFromSto

• **canBuyFromSto**: _boolean_

Defined in src/entities/Tokenholder.ts:102

whether the Tokenholder can purchase from an STO or not

### canReceiveAfter

• **canReceiveAfter**: _Date_

Defined in src/entities/Tokenholder.ts:87

date after which a Tokenholder can transfer tokens to their address

### canSendAfter

• **canSendAfter**: _Date_

Defined in src/entities/Tokenholder.ts:82

date after which a Tokenholder can transfer tokens from their address

### isAccredited

• **isAccredited**: _boolean_

Defined in src/entities/Tokenholder.ts:97

whether the Tokenholder is accredited or not

### kycExpiry

• **kycExpiry**: _Date_

Defined in src/entities/Tokenholder.ts:92

date when the Tokenholder's KYC will expire

### securityTokenId

• **securityTokenId**: _string_

Defined in src/entities/Tokenholder.ts:77

### securityTokenSymbol

• **securityTokenSymbol**: _string_

Defined in src/entities/Tokenholder.ts:75

### uid

• **uid**: _string_

_Overrides_ [_Entity_](_entities_entity_.entity.md)_._[_uid_](_entities_entity_.entity.md#abstract-uid)

Defined in src/entities/Tokenholder.ts:73

unique generated id for a Tokenholder

## Methods

### \_refresh

▸ **\_refresh**\(`params`: Partial‹[Params](../interfaces/_entities_tokenholder_.params.md)›\): _void_

_Overrides_ [_Entity_](_entities_entity_.entity.md)_._[_\_refresh_](_entities_entity_.entity.md#abstract-_refresh)

Defined in src/entities/Tokenholder.ts:195

Hydrate the entity

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | Partial‹[Params](../interfaces/_entities_tokenholder_.params.md)› |

**Returns:** _void_

### isRevoked

▸ **isRevoked**\(\): _boolean_

Defined in src/entities/Tokenholder.ts:150

Checks if this Tokenholder's KYC has been manually revoked

**Returns:** _boolean_

### toPojo

▸ **toPojo**\(\): _object_

_Overrides_ [_Entity_](_entities_entity_.entity.md)_._[_toPojo_](_entities_entity_.entity.md#abstract-topojo)

Defined in src/entities/Tokenholder.ts:164

Convert entity to a POJO \(Plain Old Javascript Object\)

**Returns:** _object_

* **address**: _string_
* **balance**: _BigNumber_
* **canBuyFromSto**: _boolean_
* **canReceiveAfter**: _Date_
* **canSendAfter**: _Date_
* **isAccredited**: _boolean_
* **kycExpiry**: _Date_
* **securityTokenId**: _string_
* **securityTokenSymbol**: _string_
* **uid**: _string_

### `Static` generateId

▸ **generateId**\(`__namedParameters`: object\): _string_

Defined in src/entities/Tokenholder.ts:45

Generate the Tokenholder's UUID from its identifying properties

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type |
| :--- | :--- |
| `address` | string |
| `securityTokenId` | string |

**Returns:** _string_

### `Static` unserialize

▸ **unserialize**\(`serialized`: string\): [_UniqueIdentifiers_](../interfaces/_entities_tokenholder_.uniqueidentifiers.md)

Defined in src/entities/Tokenholder.ts:57

Unserialize a serialized Tokenholder entity

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `serialized` | string | string with Tokenholder entity information |

**Returns:** [_UniqueIdentifiers_](../interfaces/_entities_tokenholder_.uniqueidentifiers.md)

