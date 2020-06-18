# InvestWithStableCoinArgs

## Hierarchy

* [InvestInTieredStoBaseProcedureArgs](_types_index_.investintieredstobaseprocedureargs.md)

  ↳ **InvestWithStableCoinArgs**

## Index

### Properties

* [amount](_types_index_.investwithstablecoinargs.md#amount)
* [beneficiary](_types_index_.investwithstablecoinargs.md#optional-beneficiary)
* [currency](_types_index_.investwithstablecoinargs.md#currency)
* [minTokens](_types_index_.investwithstablecoinargs.md#optional-mintokens)
* [stableCoinAddress](_types_index_.investwithstablecoinargs.md#stablecoinaddress)
* [stoAddress](_types_index_.investwithstablecoinargs.md#stoaddress)
* [symbol](_types_index_.investwithstablecoinargs.md#symbol)

## Properties

### amount

• **amount**: _BigNumber_

_Inherited from_ [_InvestInTieredStoBaseProcedureArgs_](_types_index_.investintieredstobaseprocedureargs.md)_._[_amount_](_types_index_.investintieredstobaseprocedureargs.md#amount)

_Defined in_ [_src/types/index.ts:628_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L628)

amount to invest

### `Optional` beneficiary

• **beneficiary**? : _undefined \| string_

_Inherited from_ [_InvestInTieredStoBaseProcedureArgs_](_types_index_.investintieredstobaseprocedureargs.md)_._[_beneficiary_](_types_index_.investintieredstobaseprocedureargs.md#optional-beneficiary)

_Defined in_ [_src/types/index.ts:641_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L641)

if specified, the investment will be made on behalf of this address

### currency

• **currency**: _Currency.StableCoin_

_Overrides_ [_InvestInTieredStoBaseProcedureArgs_](_types_index_.investintieredstobaseprocedureargs.md)_._[_currency_](_types_index_.investintieredstobaseprocedureargs.md#currency)

_Defined in_ [_src/types/index.ts:645_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L645)

### `Optional` minTokens

• **minTokens**? : _BigNumber_

_Inherited from_ [_InvestInTieredStoBaseProcedureArgs_](_types_index_.investintieredstobaseprocedureargs.md)_._[_minTokens_](_types_index_.investintieredstobaseprocedureargs.md#optional-mintokens)

_Defined in_ [_src/types/index.ts:637_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L637)

minimum amount of Security Tokens that should be bought. If, because of price fluctuations, a lower amount is being bought, the transaction will revert

### stableCoinAddress

• **stableCoinAddress**: _string_

_Defined in_ [_src/types/index.ts:646_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L646)

### stoAddress

• **stoAddress**: _string_

_Inherited from_ [_InvestInTieredStoBaseProcedureArgs_](_types_index_.investintieredstobaseprocedureargs.md)_._[_stoAddress_](_types_index_.investintieredstobaseprocedureargs.md#stoaddress)

_Defined in_ [_src/types/index.ts:624_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L624)

address of the STO

### symbol

• **symbol**: _string_

_Inherited from_ [_InvestInTieredStoBaseProcedureArgs_](_types_index_.investintieredstobaseprocedureargs.md)_._[_symbol_](_types_index_.investintieredstobaseprocedureargs.md#symbol)

_Defined in_ [_src/types/index.ts:620_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L620)

symbol of the Security Token

