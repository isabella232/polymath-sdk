# Class: Investment

Used to manage an Investment in a Security Token Offering

## Hierarchy

- [Entity](_entities_entity_.entity.md)‹[Params](../interfaces/_entities_investment_.params.md)›

  ↳ **Investment**

## Index

### Constructors

- [constructor](_entities_investment_.investment.md#constructor)

### Properties

- [address](_entities_investment_.investment.md#address)
- [index](_entities_investment_.investment.md#index)
- [investedFunds](_entities_investment_.investment.md#investedfunds)
- [securityTokenId](_entities_investment_.investment.md#securitytokenid)
- [securityTokenSymbol](_entities_investment_.investment.md#securitytokensymbol)
- [stoId](_entities_investment_.investment.md#stoid)
- [tokenAmount](_entities_investment_.investment.md#tokenamount)
- [uid](_entities_investment_.investment.md#uid)

### Methods

- [\_refresh](_entities_investment_.investment.md#_refresh)
- [toPojo](_entities_investment_.investment.md#topojo)
- [generateId](_entities_investment_.investment.md#static-generateid)
- [unserialize](_entities_investment_.investment.md#static-unserialize)

## Constructors

### constructor

\+ **new Investment**(`params`: [Params](../interfaces/_entities_investment_.params.md) & [UniqueIdentifiers](../interfaces/_entities_investment_.uniqueidentifiers.md)): _[Investment](_entities_investment_.investment.md)_

_Defined in [src/entities/Investment.ts:103](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Investment.ts#L103)_

Create an Investment instance

**Parameters:**

| Name     | Type                                                                                                                                    |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `params` | [Params](../interfaces/_entities_investment_.params.md) & [UniqueIdentifiers](../interfaces/_entities_investment_.uniqueidentifiers.md) |

**Returns:** _[Investment](_entities_investment_.investment.md)_

## Properties

### address

• **address**: _string_

_Defined in [src/entities/Investment.ts:88](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Investment.ts#L88)_

wallet address of token holder

---

### index

• **index**: _number_

_Defined in [src/entities/Investment.ts:93](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Investment.ts#L93)_

index of the Investment

---

### investedFunds

• **investedFunds**: _BigNumber_

_Defined in [src/entities/Investment.ts:103](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Investment.ts#L103)_

amount of funds used to make Investment

---

### securityTokenId

• **securityTokenId**: _string_

_Defined in [src/entities/Investment.ts:76](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Investment.ts#L76)_

---

### securityTokenSymbol

• **securityTokenSymbol**: _string_

_Defined in [src/entities/Investment.ts:83](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Investment.ts#L83)_

---

### stoId

• **stoId**: _string_

_Defined in [src/entities/Investment.ts:81](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Investment.ts#L81)_

unique ID for the Investment

---

### tokenAmount

• **tokenAmount**: _BigNumber_

_Defined in [src/entities/Investment.ts:98](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Investment.ts#L98)_

total amount of tokens involved in the Investment

---

### uid

• **uid**: _string_

_Overrides [Entity](_entities_entity_.entity.md).[uid](_entities_entity_.entity.md#abstract-uid)_

_Defined in [src/entities/Investment.ts:74](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Investment.ts#L74)_

unique generated identifier for an Investment

## Methods

### \_refresh

▸ **\_refresh**(`params`: Partial‹[Params](../interfaces/_entities_investment_.params.md)›): _void_

_Overrides [Entity](_entities_entity_.entity.md).[\_refresh](_entities_entity_.entity.md#abstract-_refresh)_

_Defined in [src/entities/Investment.ts:165](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Investment.ts#L165)_

Hydrate the entity

**Parameters:**

| Name     | Type                                                             |
| -------- | ---------------------------------------------------------------- |
| `params` | Partial‹[Params](../interfaces/_entities_investment_.params.md)› |

**Returns:** _void_

---

### toPojo

▸ **toPojo**(): _object_

_Overrides [Entity](_entities_entity_.entity.md).[toPojo](_entities_entity_.entity.md#abstract-topojo)_

_Defined in [src/entities/Investment.ts:138](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Investment.ts#L138)_

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** _object_

- **address**: _string_

- **index**: _number_

- **investedFunds**: _BigNumber_

- **securityTokenId**: _string_

- **securityTokenSymbol**: _string_

- **stoId**: _string_

- **tokenAmount**: _BigNumber_

- **uid**: _string_

---

### `Static` generateId

▸ **generateId**(`__namedParameters`: object): _string_

_Defined in [src/entities/Investment.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Investment.ts#L45)_

Generate the Investment's UUID from its identifying properties

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name              | Type   |
| ----------------- | ------ |
| `index`           | number |
| `securityTokenId` | string |
| `stoId`           | string |

**Returns:** _string_

---

### `Static` unserialize

▸ **unserialize**(`serialized`: string): _[UniqueIdentifiers](../interfaces/_entities_investment_.uniqueidentifiers.md)_

_Defined in [src/entities/Investment.ts:58](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Investment.ts#L58)_

Unserialize a serialized Investment entity

**Parameters:**

| Name         | Type   | Description                               |
| ------------ | ------ | ----------------------------------------- |
| `serialized` | string | string with Investment entity information |

**Returns:** _[UniqueIdentifiers](../interfaces/_entities_investment_.uniqueidentifiers.md)_
