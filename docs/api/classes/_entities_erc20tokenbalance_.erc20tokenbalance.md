# Class: Erc20TokenBalance

Used to manage a ERC20 token balance

## Hierarchy

- [Entity](_entities_entity_.entity.md)‹[Params](../interfaces/_entities_erc20tokenbalance_.params.md)›

  ↳ **Erc20TokenBalance**

## Index

### Constructors

- [constructor](_entities_erc20tokenbalance_.erc20tokenbalance.md#constructor)

### Properties

- [balance](_entities_erc20tokenbalance_.erc20tokenbalance.md#balance)
- [tokenAddress](_entities_erc20tokenbalance_.erc20tokenbalance.md#tokenaddress)
- [tokenSymbol](_entities_erc20tokenbalance_.erc20tokenbalance.md#tokensymbol)
- [uid](_entities_erc20tokenbalance_.erc20tokenbalance.md#uid)
- [walletAddress](_entities_erc20tokenbalance_.erc20tokenbalance.md#walletaddress)

### Methods

- [\_refresh](_entities_erc20tokenbalance_.erc20tokenbalance.md#_refresh)
- [toPojo](_entities_erc20tokenbalance_.erc20tokenbalance.md#topojo)
- [generateId](_entities_erc20tokenbalance_.erc20tokenbalance.md#static-generateid)
- [unserialize](_entities_erc20tokenbalance_.erc20tokenbalance.md#static-unserialize)

## Constructors

### constructor

\+ **new Erc20TokenBalance**(`params`: [Params](../interfaces/_entities_erc20tokenbalance_.params.md) & [UniqueIdentifiers](../interfaces/_entities_erc20tokenbalance_.uniqueidentifiers.md)): _[Erc20TokenBalance](_entities_erc20tokenbalance_.erc20tokenbalance.md)_

_Defined in [src/entities/Erc20TokenBalance.ts:84](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Erc20TokenBalance.ts#L84)_

Create an ERC20 Token balance instance

**Parameters:**

| Name     | Type                                                                                                                                                  |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `params` | [Params](../interfaces/_entities_erc20tokenbalance_.params.md) & [UniqueIdentifiers](../interfaces/_entities_erc20tokenbalance_.uniqueidentifiers.md) |

**Returns:** _[Erc20TokenBalance](_entities_erc20tokenbalance_.erc20tokenbalance.md)_

## Properties

### balance

• **balance**: _BigNumber_

_Defined in [src/entities/Erc20TokenBalance.ts:84](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Erc20TokenBalance.ts#L84)_

total number of tokens belonging to token holder

---

### tokenAddress

• **tokenAddress**: _string_

_Defined in [src/entities/Erc20TokenBalance.ts:74](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Erc20TokenBalance.ts#L74)_

address of the ERC20 token

---

### tokenSymbol

• **tokenSymbol**: _string | null_

_Defined in [src/entities/Erc20TokenBalance.ts:69](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Erc20TokenBalance.ts#L69)_

---

### uid

• **uid**: _string_

_Overrides [Entity](_entities_entity_.entity.md).[uid](_entities_entity_.entity.md#abstract-uid)_

_Defined in [src/entities/Erc20TokenBalance.ts:67](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Erc20TokenBalance.ts#L67)_

unique generated identifier for an ERC20 token balance

---

### walletAddress

• **walletAddress**: _string_

_Defined in [src/entities/Erc20TokenBalance.ts:79](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Erc20TokenBalance.ts#L79)_

wallet address of the token holder

## Methods

### \_refresh

▸ **\_refresh**(`params`: Partial‹[Params](../interfaces/_entities_erc20tokenbalance_.params.md)›): _void_

_Overrides [Entity](_entities_entity_.entity.md).[\_refresh](_entities_entity_.entity.md#abstract-_refresh)_

_Defined in [src/entities/Erc20TokenBalance.ts:122](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Erc20TokenBalance.ts#L122)_

Hydrate the entity

**Parameters:**

| Name     | Type                                                                    |
| -------- | ----------------------------------------------------------------------- |
| `params` | Partial‹[Params](../interfaces/_entities_erc20tokenbalance_.params.md)› |

**Returns:** _void_

---

### toPojo

▸ **toPojo**(): _object_

_Overrides [Entity](_entities_entity_.entity.md).[toPojo](_entities_entity_.entity.md#abstract-topojo)_

_Defined in [src/entities/Erc20TokenBalance.ts:107](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Erc20TokenBalance.ts#L107)_

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** _object_

- **balance**: _BigNumber_

- **tokenAddress**: _string_

- **tokenSymbol**: _null | string_

- **uid**: _string_

- **walletAddress**: _string_

---

### `Static` generateId

▸ **generateId**(`__namedParameters`: object): _string_

_Defined in [src/entities/Erc20TokenBalance.ts:39](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Erc20TokenBalance.ts#L39)_

Generate the ERC20 Token Balance's UUID from its identifying properties

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name            | Type   |
| --------------- | ------ |
| `tokenAddress`  | string |
| `walletAddress` | string |

**Returns:** _string_

---

### `Static` unserialize

▸ **unserialize**(`serialized`: any): _[UniqueIdentifiers](../interfaces/_entities_erc20tokenbalance_.uniqueidentifiers.md)_

_Defined in [src/entities/Erc20TokenBalance.ts:51](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Erc20TokenBalance.ts#L51)_

Unserialize a serialized erc20 token balance

**Parameters:**

| Name         | Type | Description                                        |
| ------------ | ---- | -------------------------------------------------- |
| `serialized` | any  | string with erc20 token balance entity information |

**Returns:** _[UniqueIdentifiers](../interfaces/_entities_erc20tokenbalance_.uniqueidentifiers.md)_
