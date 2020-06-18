# CustomCurrency

Custom currency in which a Tiered STO can raise funds

## Hierarchy

* **CustomCurrency**

## Index

### Properties

* [currencySymbol]()
* [ethOracleAddress]()
* [polyOracleAddress]()

## Properties

### currencySymbol

• **currencySymbol**: _string_

_Defined in_ [_src/types/index.ts:727_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L727)

symbol of the custom currency \(USD, CAD, EUR, etc. Default is USD\)

### ethOracleAddress

• **ethOracleAddress**: _string_

_Defined in_ [_src/types/index.ts:731_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L731)

address of the oracle that states the price of ETH in the custom currency. Only required if raising funds in ETH

### polyOracleAddress

• **polyOracleAddress**: _string_

_Defined in_ [_src/types/index.ts:735_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L735)

address of the oracle that states the price of POLY in the custom currency. Only required if raising funds in POLY

