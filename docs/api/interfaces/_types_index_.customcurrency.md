# Interface: CustomCurrency

Custom currency in which a Tiered STO can raise funds

## Hierarchy

- **CustomCurrency**

## Index

### Properties

- [currencySymbol](_types_index_.customcurrency.md#currencysymbol)
- [ethOracleAddress](_types_index_.customcurrency.md#ethoracleaddress)
- [polyOracleAddress](_types_index_.customcurrency.md#polyoracleaddress)

## Properties

### currencySymbol

• **currencySymbol**: _string_

_Defined in [src/types/index.ts:727](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/types/index.ts#L727)_

symbol of the custom currency (USD, CAD, EUR, etc. Default is USD)

---

### ethOracleAddress

• **ethOracleAddress**: _string_

_Defined in [src/types/index.ts:731](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/types/index.ts#L731)_

address of the oracle that states the price of ETH in the custom currency. Only required if raising funds in ETH

---

### polyOracleAddress

• **polyOracleAddress**: _string_

_Defined in [src/types/index.ts:735](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/types/index.ts#L735)_

address of the oracle that states the price of POLY in the custom currency. Only required if raising funds in POLY
