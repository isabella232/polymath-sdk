# Investment

Used to manage an Investment in a Security Token Offering

## Hierarchy

* [Entity]()‹[Params]()›

  ↳ **Investment**

## Index

### Constructors

* [constructor]()

### Properties

* [address]()
* [index]()
* [investedFunds]()
* [securityTokenId]()
* [securityTokenSymbol]()
* [stoId]()
* [tokenAmount]()
* [uid]()

### Methods

* [\_refresh]()
* [toPojo]()
* [generateId]()
* [unserialize]()

## Constructors

### constructor

+ **new Investment**\(`params`: [Params]() & [UniqueIdentifiers]()\): [_Investment_]()

_Defined in_ [_src/entities/Investment.ts:103_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Investment.ts#L103)

Create an Investment instance

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | [Params]() & [UniqueIdentifiers]() |

**Returns:** [_Investment_]()

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

_Overrides_ [_Entity_]()_._[_uid_]()

_Defined in_ [_src/entities/Investment.ts:74_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Investment.ts#L74)

unique generated identifier for an Investment

## Methods

### \_refresh

▸ **\_refresh**\(`params`: Partial‹[Params]()›\): _void_

_Overrides_ [_Entity_]()_._[_\_refresh_]()

_Defined in_ [_src/entities/Investment.ts:165_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Investment.ts#L165)

Hydrate the entity

**Parameters:**

| Name | Type |
| :--- | :--- |
| `params` | Partial‹[Params]()› |

**Returns:** _void_

### toPojo

▸ **toPojo**\(\): _object_

_Overrides_ [_Entity_]()_._[_toPojo_]()

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

▸ **unserialize**\(`serialized`: string\): [_UniqueIdentifiers_]()

_Defined in_ [_src/entities/Investment.ts:58_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Investment.ts#L58)

Unserialize a serialized Investment entity

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `serialized` | string | string with Investment entity information |

**Returns:** [_UniqueIdentifiers_]()

