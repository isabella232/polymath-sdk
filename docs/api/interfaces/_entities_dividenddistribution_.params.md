# Interface: Params

Dividend Distribution constructor parameters

## Hierarchy

- **Params**

## Index

### Properties

- [amount](_entities_dividenddistribution_.params.md#amount)
- [checkpointId](_entities_dividenddistribution_.params.md#checkpointid)
- [claimedAmount](_entities_dividenddistribution_.params.md#claimedamount)
- [created](_entities_dividenddistribution_.params.md#created)
- [currency](_entities_dividenddistribution_.params.md#currency)
- [expiry](_entities_dividenddistribution_.params.md#expiry)
- [maturity](_entities_dividenddistribution_.params.md#maturity)
- [name](_entities_dividenddistribution_.params.md#name)
- [reclaimed](_entities_dividenddistribution_.params.md#reclaimed)
- [securityTokenSymbol](_entities_dividenddistribution_.params.md#securitytokensymbol)
- [shareholders](_entities_dividenddistribution_.params.md#shareholders)
- [totalSupply](_entities_dividenddistribution_.params.md#totalsupply)
- [totalWithheld](_entities_dividenddistribution_.params.md#totalwithheld)
- [totalWithheldWithdrawn](_entities_dividenddistribution_.params.md#totalwithheldwithdrawn)

## Properties

### amount

• **amount**: _BigNumber_

_Defined in [src/entities/DividendDistribution.ts:57](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/DividendDistribution.ts#L57)_

dividend amount

---

### checkpointId

• **checkpointId**: _string_

_Defined in [src/entities/DividendDistribution.ts:41](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/DividendDistribution.ts#L41)_

---

### claimedAmount

• **claimedAmount**: _BigNumber_

_Defined in [src/entities/DividendDistribution.ts:61](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/DividendDistribution.ts#L61)_

amount of dividend claimed so far

---

### created

• **created**: _Date_

_Defined in [src/entities/DividendDistribution.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/DividendDistribution.ts#L45)_

date at which the dividend was created

---

### currency

• **currency**: _string | null_

_Defined in [src/entities/DividendDistribution.ts:77](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/DividendDistribution.ts#L77)_

symbol of the currency in which this dividend distribution is being paid

---

### expiry

• **expiry**: _Date_

_Defined in [src/entities/DividendDistribution.ts:53](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/DividendDistribution.ts#L53)_

date until which dividend can be claimed

---

### maturity

• **maturity**: _Date_

_Defined in [src/entities/DividendDistribution.ts:49](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/DividendDistribution.ts#L49)_

date after which dividend can be claimed

---

### name

• **name**: _string_

_Defined in [src/entities/DividendDistribution.ts:73](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/DividendDistribution.ts#L73)_

---

### reclaimed

• **reclaimed**: _boolean_

_Defined in [src/entities/DividendDistribution.ts:69](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/DividendDistribution.ts#L69)_

true if expiry has passed and issuer has reclaimed remaining dividend

---

### securityTokenSymbol

• **securityTokenSymbol**: _string_

_Defined in [src/entities/DividendDistribution.ts:40](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/DividendDistribution.ts#L40)_

---

### shareholders

• **shareholders**: _[DividendShareholderStatus](_types_index_.dividendshareholderstatus.md)[]_

_Defined in [src/entities/DividendDistribution.ts:72](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/DividendDistribution.ts#L72)_

---

### totalSupply

• **totalSupply**: _BigNumber_

_Defined in [src/entities/DividendDistribution.ts:65](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/DividendDistribution.ts#L65)_

total supply at the associated checkpoint

---

### totalWithheld

• **totalWithheld**: _BigNumber_

_Defined in [src/entities/DividendDistribution.ts:70](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/DividendDistribution.ts#L70)_

---

### totalWithheldWithdrawn

• **totalWithheldWithdrawn**: _BigNumber_

_Defined in [src/entities/DividendDistribution.ts:71](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/DividendDistribution.ts#L71)_
