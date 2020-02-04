[@polymathnetwork/sdk - v2.0.1-beta.120](../README.md) › [Globals](../globals.md) › ["PolymathBase"](../modules/_polymathbase_.md) › [BaseDividend](_polymathbase_.basedividend.md)

# Interface: BaseDividend

Internal representation of a Dividend Distribution

## Hierarchy

- **BaseDividend**

## Index

### Properties

- [amount](_polymathbase_.basedividend.md#amount)
- [checkpointId](_polymathbase_.basedividend.md#checkpointid)
- [claimedAmount](_polymathbase_.basedividend.md#claimedamount)
- [created](_polymathbase_.basedividend.md#created)
- [currency](_polymathbase_.basedividend.md#currency)
- [expiry](_polymathbase_.basedividend.md#expiry)
- [index](_polymathbase_.basedividend.md#index)
- [maturity](_polymathbase_.basedividend.md#maturity)
- [name](_polymathbase_.basedividend.md#name)
- [reclaimed](_polymathbase_.basedividend.md#reclaimed)
- [shareholders](_polymathbase_.basedividend.md#shareholders)
- [totalSupply](_polymathbase_.basedividend.md#totalsupply)
- [totalWithheld](_polymathbase_.basedividend.md#totalwithheld)
- [totalWithheldWithdrawn](_polymathbase_.basedividend.md#totalwithheldwithdrawn)

## Properties

### amount

• **amount**: _BigNumber_

_Defined in [src/PolymathBase.ts:301](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/PolymathBase.ts#L301)_

amount of tokens provided in the Dividend

---

### checkpointId

• **checkpointId**: _number_

_Defined in [src/PolymathBase.ts:285](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/PolymathBase.ts#L285)_

checkpoint UUID to which this Dividend Distribution is associated

---

### claimedAmount

• **claimedAmount**: _BigNumber_

_Defined in [src/PolymathBase.ts:305](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/PolymathBase.ts#L305)_

amount of tokens paid so far

---

### created

• **created**: _Date_

_Defined in [src/PolymathBase.ts:289](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/PolymathBase.ts#L289)_

date at which the Dividend was created

---

### currency

• **currency**: _string | null_

_Defined in [src/PolymathBase.ts:329](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/PolymathBase.ts#L329)_

symbol of the currency in which Dividends are being distributed

---

### expiry

• **expiry**: _Date_

_Defined in [src/PolymathBase.ts:297](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/PolymathBase.ts#L297)_

date at which the Dividend will expire

---

### index

• **index**: _number_

_Defined in [src/PolymathBase.ts:281](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/PolymathBase.ts#L281)_

index of the dividend

---

### maturity

• **maturity**: _Date_

_Defined in [src/PolymathBase.ts:293](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/PolymathBase.ts#L293)_

date from which payments can be distributed

---

### name

• **name**: _string_

_Defined in [src/PolymathBase.ts:325](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/PolymathBase.ts#L325)_

name of the Dividend

---

### reclaimed

• **reclaimed**: _boolean_

_Defined in [src/PolymathBase.ts:313](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/PolymathBase.ts#L313)_

whether expired payments have been reclaimed

---

### shareholders

• **shareholders**: _[DividendShareholderStatus](_types_index_.dividendshareholderstatus.md)[]_

_Defined in [src/PolymathBase.ts:333](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/PolymathBase.ts#L333)_

dividend Shareholders

---

### totalSupply

• **totalSupply**: _BigNumber_

_Defined in [src/PolymathBase.ts:309](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/PolymathBase.ts#L309)_

total supply of the Security Token

---

### totalWithheld

• **totalWithheld**: _BigNumber_

_Defined in [src/PolymathBase.ts:317](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/PolymathBase.ts#L317)_

total amount of tokens withheld as tax so far

---

### totalWithheldWithdrawn

• **totalWithheldWithdrawn**: _BigNumber_

_Defined in [src/PolymathBase.ts:321](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/PolymathBase.ts#L321)_

total amount of withheld taxes already withdrawn from the storage wallet
