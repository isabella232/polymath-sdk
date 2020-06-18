# Investment

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

* [\_refresh](_entities_investment_.investment.md#_refresh)
* [toPojo](_entities_investment_.investment.md#topojo)
* [generateId](_entities_investment_.investment.md#static-generateid)
* [unserialize](_entities_investment_.investment.md#static-unserialize)

## Constructors

### constructor

+ **new Investment**\(`params`: [Params](../interfaces/_entities_investment_.params.md) & [UniqueIdentifiers](../interfaces/_entities_investment_.uniqueidentifiers.md)\): [_Investment_](_entities_investment_.investment.md)

_Defined in_ [_src/entities/Investment.ts:103_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Investment.ts#L103)

Create an Investment instance

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | [Params](../interfaces/_entities_investment_.params.md) & [UniqueIdentifiers](../interfaces/_entities_investment_.uniqueidentifiers.md) |

**Returns:** [_Investment_](_entities_investment_.investment.md)

## Properties

### address

• **address**: _string_

_Defined in_ [_src/entities/Investment.ts:88_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Investment.ts#L88)

wallet address of token holder

### index

• **index**: _number_

_Defined in_ [_src/entities/Investment.ts:93_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Investment.ts#L93)

index of the Investment

### investedFunds

• **investedFunds**: _BigNumber_

_Defined in_ [_src/entities/Investment.ts:103_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Investment.ts#L103)

amount of funds used to make Investment

### securityTokenId

• **securityTokenId**: _string_

_Defined in_ [_src/entities/Investment.ts:76_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Investment.ts#L76)

### securityTokenSymbol

• **securityTokenSymbol**: _string_

_Defined in_ [_src/entities/Investment.ts:83_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Investment.ts#L83)

### stoId

• **stoId**: _string_

_Defined in_ [_src/entities/Investment.ts:81_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Investment.ts#L81)

unique ID for the Investment

### tokenAmount

• **tokenAmount**: _BigNumber_

_Defined in_ [_src/entities/Investment.ts:98_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Investment.ts#L98)

total amount of tokens involved in the Investment

### uid

• **uid**: _string_

_Overrides_ [_Entity_](_entities_entity_.entity.md)_._[_uid_](_entities_entity_.entity.md#abstract-uid)

_Defined in_ [_src/entities/Investment.ts:74_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Investment.ts#L74)

unique generated identifier for an Investment

## Methods

### \_refresh

▸ **\_refresh**\(`params`: Partial‹[Params](../interfaces/_entities_investment_.params.md)›\): _void_

_Overrides_ [_Entity_](_entities_entity_.entity.md)_._[_\_refresh_](_entities_entity_.entity.md#abstract-_refresh)

_Defined in_ [_src/entities/Investment.ts:165_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Investment.ts#L165)

Hydrate the entity

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | Partial‹[Params](../interfaces/_entities_investment_.params.md)› |

**Returns:** _void_

### toPojo

▸ **toPojo**\(\): _object_

_Overrides_ [_Entity_](_entities_entity_.entity.md)_._[_toPojo_](_entities_entity_.entity.md#abstract-topojo)

_Defined in_ [_src/entities/Investment.ts:138_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Investment.ts#L138)

Convert entity to a POJO \(Plain Old Javascript Object\)

**Returns:** _object_

* **address**: _string_
* **index**: _number_
* **investedFunds**: _BigNumber_
* **securityTokenId**: _string_
* **securityTokenSymbol**: _string_
* **stoId**: _string_
* **tokenAmount**: _BigNumber_
* **uid**: _string_

### `Static` generateId

▸ **generateId**\(`__namedParameters`: object\): _string_

_Defined in_ [_src/entities/Investment.ts:45_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Investment.ts#L45)

Generate the Investment's UUID from its identifying properties

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type |
| :--- | :--- |
| `index` | number |
| `securityTokenId` | string |
| `stoId` | string |

**Returns:** _string_

### `Static` unserialize

▸ **unserialize**\(`serialized`: string\): [_UniqueIdentifiers_](../interfaces/_entities_investment_.uniqueidentifiers.md)

_Defined in_ [_src/entities/Investment.ts:58_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Investment.ts#L58)

Unserialize a serialized Investment entity

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `serialized` | string | string with Investment entity information |

**Returns:** [_UniqueIdentifiers_](../interfaces/_entities_investment_.uniqueidentifiers.md)

