# Tokenholder

Used to manage a Tokenholder

## Hierarchy

* [Entity](../classes/_entities_entity_.entity.md)‹[Params](../interfaces/_entities_tokenholder_.params.md)›

  ↳ **Tokenholder**

## Index

### Constructors

* [constructor](../classes/_entities_tokenholder_.tokenholder.md#constructor)

### Properties

* [address](../classes/_entities_tokenholder_.tokenholder.md#address)
* [balance](../classes/_entities_tokenholder_.tokenholder.md#balance)
* [canBuyFromSto](../classes/_entities_tokenholder_.tokenholder.md#canbuyfromsto)
* [canReceiveAfter](../classes/_entities_tokenholder_.tokenholder.md#canreceiveafter)
* [canSendAfter](../classes/_entities_tokenholder_.tokenholder.md#cansendafter)
* [isAccredited](../classes/_entities_tokenholder_.tokenholder.md#isaccredited)
* [kycExpiry](../classes/_entities_tokenholder_.tokenholder.md#kycexpiry)
* [securityTokenId](../classes/_entities_tokenholder_.tokenholder.md#securitytokenid)
* [securityTokenSymbol](../classes/_entities_tokenholder_.tokenholder.md#securitytokensymbol)
* [uid](../classes/_entities_tokenholder_.tokenholder.md#uid)

### Methods

* [\_refresh](../classes/_entities_tokenholder_.tokenholder.md#_refresh)
* [isRevoked](../classes/_entities_tokenholder_.tokenholder.md#isrevoked)
* [toPojo](../classes/_entities_tokenholder_.tokenholder.md#topojo)
* [generateId](../classes/_entities_tokenholder_.tokenholder.md#static-generateid)
* [unserialize](../classes/_entities_tokenholder_.tokenholder.md#static-unserialize)

## Constructors

### constructor

+ **new Tokenholder**\(`params`: [Params](../interfaces/_entities_tokenholder_.params.md) & [UniqueIdentifiers](../interfaces/_entities_tokenholder_.uniqueidentifiers.md)\): [_Tokenholder_](../classes/_entities_tokenholder_.tokenholder.md)

_Defined in_ [_src/entities/Tokenholder.ts:112_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Tokenholder.ts#L112)

Create a new Tokenholder instance

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | [Params](../interfaces/_entities_tokenholder_.params.md) & [UniqueIdentifiers](../interfaces/_entities_tokenholder_.uniqueidentifiers.md) |

**Returns:** [_Tokenholder_](../classes/_entities_tokenholder_.tokenholder.md)

## Properties

### address

• **address**: _string_

_Defined in_ [_src/entities/Tokenholder.ts:112_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Tokenholder.ts#L112)

wallet address

### balance

• **balance**: _BigNumber_

_Defined in_ [_src/entities/Tokenholder.ts:107_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Tokenholder.ts#L107)

total Security Token balance of the Tokenholder

### canBuyFromSto

• **canBuyFromSto**: _boolean_

_Defined in_ [_src/entities/Tokenholder.ts:102_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Tokenholder.ts#L102)

whether the Tokenholder can purchase from an STO or not

### canReceiveAfter

• **canReceiveAfter**: _Date_

_Defined in_ [_src/entities/Tokenholder.ts:87_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Tokenholder.ts#L87)

date after which a Tokenholder can transfer tokens to their address

### canSendAfter

• **canSendAfter**: _Date_

_Defined in_ [_src/entities/Tokenholder.ts:82_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Tokenholder.ts#L82)

date after which a Tokenholder can transfer tokens from their address

### isAccredited

• **isAccredited**: _boolean_

_Defined in_ [_src/entities/Tokenholder.ts:97_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Tokenholder.ts#L97)

whether the Tokenholder is accredited or not

### kycExpiry

• **kycExpiry**: _Date_

_Defined in_ [_src/entities/Tokenholder.ts:92_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Tokenholder.ts#L92)

date when the Tokenholder's KYC will expire

### securityTokenId

• **securityTokenId**: _string_

_Defined in_ [_src/entities/Tokenholder.ts:77_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Tokenholder.ts#L77)

### securityTokenSymbol

• **securityTokenSymbol**: _string_

_Defined in_ [_src/entities/Tokenholder.ts:75_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Tokenholder.ts#L75)

### uid

• **uid**: _string_

_Overrides_ [_Entity_](../classes/_entities_entity_.entity.md)_._[_uid_](../classes/_entities_entity_.entity.md#abstract-uid)

_Defined in_ [_src/entities/Tokenholder.ts:73_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Tokenholder.ts#L73)

unique generated id for a Tokenholder

## Methods

### \_refresh

▸ **\_refresh**\(`params`: Partial‹[Params](../interfaces/_entities_tokenholder_.params.md)›\): _void_

_Overrides_ [_Entity_](../classes/_entities_entity_.entity.md)_._[_\_refresh_](../classes/_entities_entity_.entity.md#abstract-_refresh)

_Defined in_ [_src/entities/Tokenholder.ts:195_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Tokenholder.ts#L195)

Hydrate the entity

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | Partial‹[Params](../interfaces/_entities_tokenholder_.params.md)› |

**Returns:** _void_

### isRevoked

▸ **isRevoked**\(\): _boolean_

_Defined in_ [_src/entities/Tokenholder.ts:150_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Tokenholder.ts#L150)

Checks if this Tokenholder's KYC has been manually revoked

**Returns:** _boolean_

### toPojo

▸ **toPojo**\(\): _object_

_Overrides_ [_Entity_](../classes/_entities_entity_.entity.md)_._[_toPojo_](../classes/_entities_entity_.entity.md#abstract-topojo)

_Defined in_ [_src/entities/Tokenholder.ts:164_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Tokenholder.ts#L164)

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

_Defined in_ [_src/entities/Tokenholder.ts:45_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Tokenholder.ts#L45)

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

_Defined in_ [_src/entities/Tokenholder.ts:57_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Tokenholder.ts#L57)

Unserialize a serialized Tokenholder entity

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `serialized` | string | string with Tokenholder entity information |

**Returns:** [_UniqueIdentifiers_](../interfaces/_entities_tokenholder_.uniqueidentifiers.md)

