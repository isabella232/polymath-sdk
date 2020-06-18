# InvestInTieredStoBaseProcedureArgs

## Hierarchy

* **InvestInTieredStoBaseProcedureArgs**

  ↳ [InvestWithStableCoinArgs](_types_index_.investwithstablecoinargs.md)

## Index

### Properties

* [amount](_types_index_.investintieredstobaseprocedureargs.md#amount)
* [beneficiary](_types_index_.investintieredstobaseprocedureargs.md#optional-beneficiary)
* [currency](_types_index_.investintieredstobaseprocedureargs.md#currency)
* [minTokens](_types_index_.investintieredstobaseprocedureargs.md#optional-mintokens)
* [stoAddress](_types_index_.investintieredstobaseprocedureargs.md#stoaddress)
* [symbol](_types_index_.investintieredstobaseprocedureargs.md#symbol)

## Properties

### amount

• **amount**: _BigNumber_

_Defined in_ [_src/types/index.ts:628_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L628)

amount to invest

### `Optional` beneficiary

• **beneficiary**? : _undefined \| string_

_Defined in_ [_src/types/index.ts:641_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L641)

if specified, the investment will be made on behalf of this address

### currency

• **currency**: _Currency_

_Defined in_ [_src/types/index.ts:632_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L632)

currency type in which the investment is being made

### `Optional` minTokens

• **minTokens**? : _BigNumber_

_Defined in_ [_src/types/index.ts:637_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L637)

minimum amount of Security Tokens that should be bought. If, because of price fluctuations, a lower amount is being bought, the transaction will revert

### stoAddress

• **stoAddress**: _string_

_Defined in_ [_src/types/index.ts:624_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L624)

address of the STO

### symbol

• **symbol**: _string_

_Defined in_ [_src/types/index.ts:620_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L620)

symbol of the Security Token

