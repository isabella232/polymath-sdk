# Class: Shareholder

Used to manage a Shareholder

## Hierarchy

- [Entity](_entities_entity_.entity.md)‹[Params](../interfaces/_entities_shareholder_.params.md)›

  ↳ **Shareholder**

## Index

### Constructors

- [constructor](_entities_shareholder_.shareholder.md#constructor)

### Properties

- [address](_entities_shareholder_.shareholder.md#address)
- [balance](_entities_shareholder_.shareholder.md#balance)
- [canBuyFromSto](_entities_shareholder_.shareholder.md#canbuyfromsto)
- [canReceiveAfter](_entities_shareholder_.shareholder.md#canreceiveafter)
- [canSendAfter](_entities_shareholder_.shareholder.md#cansendafter)
- [isAccredited](_entities_shareholder_.shareholder.md#isaccredited)
- [kycExpiry](_entities_shareholder_.shareholder.md#kycexpiry)
- [securityTokenId](_entities_shareholder_.shareholder.md#securitytokenid)
- [securityTokenSymbol](_entities_shareholder_.shareholder.md#securitytokensymbol)
- [uid](_entities_shareholder_.shareholder.md#uid)

### Methods

- [\_refresh](_entities_shareholder_.shareholder.md#_refresh)
- [isRevoked](_entities_shareholder_.shareholder.md#isrevoked)
- [toPojo](_entities_shareholder_.shareholder.md#topojo)
- [generateId](_entities_shareholder_.shareholder.md#static-generateid)
- [unserialize](_entities_shareholder_.shareholder.md#static-unserialize)

## Constructors

### constructor

\+ **new Shareholder**(`params`: [Params](../interfaces/_entities_shareholder_.params.md) & [UniqueIdentifiers](../interfaces/_entities_shareholder_.uniqueidentifiers.md)): _[Shareholder](_entities_shareholder_.shareholder.md)_

_Defined in [src/entities/Shareholder.ts:112](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Shareholder.ts#L112)_

Create a new Shareholder instance

**Parameters:**

| Name     | Type                                                                                                                                      |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `params` | [Params](../interfaces/_entities_shareholder_.params.md) & [UniqueIdentifiers](../interfaces/_entities_shareholder_.uniqueidentifiers.md) |

**Returns:** _[Shareholder](_entities_shareholder_.shareholder.md)_

## Properties

### address

• **address**: _string_

_Defined in [src/entities/Shareholder.ts:112](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Shareholder.ts#L112)_

wallet address

---

### balance

• **balance**: _BigNumber_

_Defined in [src/entities/Shareholder.ts:107](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Shareholder.ts#L107)_

total Security Token balance of the Shareholder

---

### canBuyFromSto

• **canBuyFromSto**: _boolean_

_Defined in [src/entities/Shareholder.ts:102](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Shareholder.ts#L102)_

whether the Shareholder can purchase from an STO or not

---

### canReceiveAfter

• **canReceiveAfter**: _Date_

_Defined in [src/entities/Shareholder.ts:87](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Shareholder.ts#L87)_

date after which a Shareholder can transfer tokens to their address

---

### canSendAfter

• **canSendAfter**: _Date_

_Defined in [src/entities/Shareholder.ts:82](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Shareholder.ts#L82)_

date after which a Shareholder can transfer tokens from their address

---

### isAccredited

• **isAccredited**: _boolean_

_Defined in [src/entities/Shareholder.ts:97](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Shareholder.ts#L97)_

whether the Shareholder is accredited or not

---

### kycExpiry

• **kycExpiry**: _Date_

_Defined in [src/entities/Shareholder.ts:92](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Shareholder.ts#L92)_

date when the Shareholder's KYC will expire

---

### securityTokenId

• **securityTokenId**: _string_

_Defined in [src/entities/Shareholder.ts:77](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Shareholder.ts#L77)_

---

### securityTokenSymbol

• **securityTokenSymbol**: _string_

_Defined in [src/entities/Shareholder.ts:75](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Shareholder.ts#L75)_

---

### uid

• **uid**: _string_

_Overrides [Entity](_entities_entity_.entity.md).[uid](_entities_entity_.entity.md#abstract-uid)_

_Defined in [src/entities/Shareholder.ts:73](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Shareholder.ts#L73)_

unique generated id for a Shareholder

## Methods

### \_refresh

▸ **\_refresh**(`params`: Partial‹[Params](../interfaces/_entities_shareholder_.params.md)›): _void_

_Overrides [Entity](_entities_entity_.entity.md).[\_refresh](_entities_entity_.entity.md#abstract-_refresh)_

_Defined in [src/entities/Shareholder.ts:195](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Shareholder.ts#L195)_

Hydrate the entity

**Parameters:**

| Name     | Type                                                              |
| -------- | ----------------------------------------------------------------- |
| `params` | Partial‹[Params](../interfaces/_entities_shareholder_.params.md)› |

**Returns:** _void_

---

### isRevoked

▸ **isRevoked**(): _boolean_

_Defined in [src/entities/Shareholder.ts:150](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Shareholder.ts#L150)_

Checks if this Shareholder's KYC has been manually revoked

**Returns:** _boolean_

---

### toPojo

▸ **toPojo**(): _object_

_Overrides [Entity](_entities_entity_.entity.md).[toPojo](_entities_entity_.entity.md#abstract-topojo)_

_Defined in [src/entities/Shareholder.ts:164](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Shareholder.ts#L164)_

Convert entity to a POJO (Plain Old Javascript Object)

**Returns:** _object_

- **address**: _string_

- **balance**: _BigNumber_

- **canBuyFromSto**: _boolean_

- **canReceiveAfter**: _Date_

- **canSendAfter**: _Date_

- **isAccredited**: _boolean_

- **kycExpiry**: _Date_

- **securityTokenId**: _string_

- **securityTokenSymbol**: _string_

- **uid**: _string_

---

### `Static` generateId

▸ **generateId**(`__namedParameters`: object): _string_

_Defined in [src/entities/Shareholder.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Shareholder.ts#L45)_

Generate the Shareholder's UUID from its identifying properties

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name              | Type   |
| ----------------- | ------ |
| `address`         | string |
| `securityTokenId` | string |

**Returns:** _string_

---

### `Static` unserialize

▸ **unserialize**(`serialized`: string): _[UniqueIdentifiers](../interfaces/_entities_shareholder_.uniqueidentifiers.md)_

_Defined in [src/entities/Shareholder.ts:57](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Shareholder.ts#L57)_

Unserialize a serialized Shareholder entity

**Parameters:**

| Name         | Type   | Description                                |
| ------------ | ------ | ------------------------------------------ |
| `serialized` | string | string with Shareholder entity information |

**Returns:** _[UniqueIdentifiers](../interfaces/_entities_shareholder_.uniqueidentifiers.md)_
