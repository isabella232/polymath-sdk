# Class: Checkpoint

Represents a snapshot of the Security Token's supply and Shareholder balances at a certain point in time

## Hierarchy

- [Entity](_entities_entity_.entity.md)‹[Params](../interfaces/_entities_checkpoint_.params.md)›

  ↳ **Checkpoint**

## Index

### Constructors

- [constructor](_entities_checkpoint_.checkpoint.md#constructor)

### Properties

- [createdAt](_entities_checkpoint_.checkpoint.md#createdat)
- [dividendDistributions](_entities_checkpoint_.checkpoint.md#dividenddistributions)
- [index](_entities_checkpoint_.checkpoint.md#index)
- [securityTokenId](_entities_checkpoint_.checkpoint.md#securitytokenid)
- [securityTokenSymbol](_entities_checkpoint_.checkpoint.md#securitytokensymbol)
- [shareholderBalances](_entities_checkpoint_.checkpoint.md#shareholderbalances)
- [totalSupply](_entities_checkpoint_.checkpoint.md#totalsupply)
- [uid](_entities_checkpoint_.checkpoint.md#uid)

### Methods

- [\_refresh](_entities_checkpoint_.checkpoint.md#_refresh)
- [toPojo](_entities_checkpoint_.checkpoint.md#topojo)
- [generateId](_entities_checkpoint_.checkpoint.md#static-generateid)
- [unserialize](_entities_checkpoint_.checkpoint.md#static-unserialize)

## Constructors

### constructor

\+ **new Checkpoint**(`params`: [Params](../interfaces/_entities_checkpoint_.params.md) & [UniqueIdentifiers](../interfaces/_entities_checkpoint_.uniqueidentifiers.md)): _[Checkpoint](_entities_checkpoint_.checkpoint.md)_

_Defined in [src/entities/Checkpoint.ts:106](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Checkpoint.ts#L106)_

Create a new Chekpoint instance

**Parameters:**

| Name     | Type                                                                                                                                    |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `params` | [Params](../interfaces/_entities_checkpoint_.params.md) & [UniqueIdentifiers](../interfaces/_entities_checkpoint_.uniqueidentifiers.md) |

**Returns:** _[Checkpoint](_entities_checkpoint_.checkpoint.md)_

## Properties

### createdAt

• **createdAt**: _Date_

_Defined in [src/entities/Checkpoint.ts:106](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Checkpoint.ts#L106)_

---

### dividendDistributions

• **dividendDistributions**: _[DividendDistribution](_entities_dividenddistribution_.dividenddistribution.md)[]_

_Defined in [src/entities/Checkpoint.ts:88](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Checkpoint.ts#L88)_

dividend distributions associated to this snapshot

---

### index

• **index**: _number_

_Defined in [src/entities/Checkpoint.ts:97](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Checkpoint.ts#L97)_

numerical index of the checkpoint associated to this snapshot

---

### securityTokenId

• **securityTokenId**: _string_

_Defined in [src/entities/Checkpoint.ts:92](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Checkpoint.ts#L92)_

---

### securityTokenSymbol

• **securityTokenSymbol**: _string_

_Defined in [src/entities/Checkpoint.ts:90](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Checkpoint.ts#L90)_

---

### shareholderBalances

• **shareholderBalances**: _[ShareholderBalance](../interfaces/_types_index_.shareholderbalance.md)[]_

_Defined in [src/entities/Checkpoint.ts:102](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Checkpoint.ts#L102)_

shareholder balances at this specific checkpoint

---

### totalSupply

• **totalSupply**: _BigNumber_

_Defined in [src/entities/Checkpoint.ts:104](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Checkpoint.ts#L104)_

---

### uid

• **uid**: _string_

_Overrides [Entity](_entities_entity_.entity.md).[uid](_entities_entity_.entity.md#abstract-uid)_

_Defined in [src/entities/Checkpoint.ts:83](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Checkpoint.ts#L83)_

## Methods

### \_refresh

▸ **\_refresh**(`params`: Partial‹[Params](../interfaces/_entities_checkpoint_.params.md)›): _void_

_Overrides [Entity](_entities_entity_.entity.md).[\_refresh](_entities_entity_.entity.md#abstract-_refresh)_

_Defined in [src/entities/Checkpoint.ts:164](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Checkpoint.ts#L164)_

Hydrate the entity

**Parameters:**

| Name     | Type                                                             |
| -------- | ---------------------------------------------------------------- |
| `params` | Partial‹[Params](../interfaces/_entities_checkpoint_.params.md)› |

**Returns:** _void_

---

### toPojo

▸ **toPojo**(): _object_

_Overrides [Entity](_entities_entity_.entity.md).[toPojo](_entities_entity_.entity.md#abstract-topojo)_

_Defined in [src/entities/Checkpoint.ts:137](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Checkpoint.ts#L137)_

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** _object_

- **createdAt**: _Date_

- **dividendDistributions**: _object[]_ = dividendDistributions.map(distribution => distribution.toPojo())

- **index**: _number_

- **securityTokenId**: _string_

- **securityTokenSymbol**: _string_

- **shareholderBalances**: _[ShareholderBalance](../interfaces/_types_index_.shareholderbalance.md)[]_

- **totalSupply**: _BigNumber_

- **uid**: _string_

---

### `Static` generateId

▸ **generateId**(`__namedParameters`: object): _string_

_Defined in [src/entities/Checkpoint.ts:58](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Checkpoint.ts#L58)_

Generate the Checkpoint's UUID from its identifying properties

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name              | Type   |
| ----------------- | ------ |
| `index`           | number |
| `securityTokenId` | string |

**Returns:** _string_

---

### `Static` unserialize

▸ **unserialize**(`serialized`: string): _[UniqueIdentifiers](../interfaces/_entities_checkpoint_.uniqueidentifiers.md)_

_Defined in [src/entities/Checkpoint.ts:70](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Checkpoint.ts#L70)_

Unserialize string to Checkpoint object

**Parameters:**

| Name         | Type   |
| ------------ | ------ |
| `serialized` | string |

**Returns:** _[UniqueIdentifiers](../interfaces/_entities_checkpoint_.uniqueidentifiers.md)_
