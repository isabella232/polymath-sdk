# Interface: CustomCurrency

Custom currency in which a Tiered STO can raise funds

## Hierarchy

* **CustomCurrency**

## Index

### Properties

* [currencySymbol](_types_index_.customcurrency.md#currencysymbol)
* [ethOracleAddress](_types_index_.customcurrency.md#ethoracleaddress)
* [polyOracleAddress](_types_index_.customcurrency.md#polyoracleaddress)

## Properties

###  currencySymbol

• **currencySymbol**: *string*

*Defined in [src/types/index.ts:727](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L727)*

symbol of the custom currency (USD, CAD, EUR, etc. Default is USD)

___

###  ethOracleAddress

• **ethOracleAddress**: *string*

*Defined in [src/types/index.ts:731](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L731)*

address of the oracle that states the price of ETH in the custom currency. Only required if raising funds in ETH

___

###  polyOracleAddress

• **polyOracleAddress**: *string*

*Defined in [src/types/index.ts:735](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L735)*

address of the oracle that states the price of POLY in the custom currency. Only required if raising funds in POLY
