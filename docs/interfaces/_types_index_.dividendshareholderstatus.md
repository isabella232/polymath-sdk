[@polymathnetwork/sdk - v2.0.1-beta.120](../README.md) › [Globals](../globals.md) › ["types/index"](../modules/_types_index_.md) › [DividendShareholderStatus](_types_index_.dividendshareholderstatus.md)

# Interface: DividendShareholderStatus

Status of a Shareholder in regards to a Dividend Distribution

## Hierarchy

- **DividendShareholderStatus**

## Index

### Properties

- [address](_types_index_.dividendshareholderstatus.md#address)
- [amountReceived](_types_index_.dividendshareholderstatus.md#amountreceived)
- [balance](_types_index_.dividendshareholderstatus.md#balance)
- [excluded](_types_index_.dividendshareholderstatus.md#excluded)
- [paymentReceived](_types_index_.dividendshareholderstatus.md#paymentreceived)
- [withheldTax](_types_index_.dividendshareholderstatus.md#withheldtax)

## Properties

### address

• **address**: _string_

_Defined in [src/types/index.ts:27](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/types/index.ts#L27)_

wallet address of the Shareholder

---

### amountReceived

• **amountReceived**: _BigNumber_

_Defined in [src/types/index.ts:43](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/types/index.ts#L43)_

the amount of tokens the Shareholder has received as Dividend payment

---

### balance

• **balance**: _BigNumber_

_Defined in [src/types/index.ts:47](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/types/index.ts#L47)_

the balance of the Shareholder

---

### excluded

• **excluded**: _boolean_

_Defined in [src/types/index.ts:35](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/types/index.ts#L35)_

whether the Shareholder is excluded from the Dividend distribution

---

### paymentReceived

• **paymentReceived**: _boolean_

_Defined in [src/types/index.ts:31](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/types/index.ts#L31)_

whether the Shareholder has received payment

---

### withheldTax

• **withheldTax**: _BigNumber_

_Defined in [src/types/index.ts:39](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/types/index.ts#L39)_

amount of tokens withheld for tax purposes
