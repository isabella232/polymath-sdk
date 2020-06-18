# Tokenholder

Used to manage a Tokenholder

## Hierarchy

* [Entity]()‹[Params]()›

  ↳ **Tokenholder**

## Index

### Constructors

* [constructor]()

### Properties

* [address]()
* [balance]()
* [canBuyFromSto]()
* [canReceiveAfter]()
* [canSendAfter]()
* [isAccredited]()
* [kycExpiry]()
* [securityTokenId]()
* [securityTokenSymbol]()
* [uid]()

### Methods

* [\_refresh]()
* [isRevoked]()
* [toPojo]()
* [generateId]()
* [unserialize]()

## Constructors

### constructor

+ **new Tokenholder**\(`params`: [Params]() & [UniqueIdentifiers]()\): [_Tokenholder_]()

Defined in src/entities/Tokenholder.ts:112

Create a new Tokenholder instance

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | [Params]() & [UniqueIdentifiers]() |

**Returns:** [_Tokenholder_]()

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

_Overrides_ [_Entity_]()_._[_uid_]()

Defined in src/entities/Tokenholder.ts:73

unique generated id for a Tokenholder

## Methods

### \_refresh

▸ **\_refresh**\(`params`: Partial‹[Params]()›\): _void_

_Overrides_ [_Entity_]()_._[_\_refresh_]()

Defined in src/entities/Tokenholder.ts:195

Hydrate the entity

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | Partial‹[Params]()› |

**Returns:** _void_

### isRevoked

▸ **isRevoked**\(\): _boolean_

Defined in src/entities/Tokenholder.ts:150

Checks if this Tokenholder's KYC has been manually revoked

**Returns:** _boolean_

### toPojo

▸ **toPojo**\(\): _object_

_Overrides_ [_Entity_]()_._[_toPojo_]()

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

▸ **unserialize**\(`serialized`: string\): [_UniqueIdentifiers_]()

Defined in src/entities/Tokenholder.ts:57

Unserialize a serialized Tokenholder entity

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `serialized` | string | string with Tokenholder entity information |

**Returns:** [_UniqueIdentifiers_]()

