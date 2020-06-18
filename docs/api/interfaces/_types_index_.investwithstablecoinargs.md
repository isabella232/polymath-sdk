# Interface: InvestWithStableCoinArgs

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

###  amount

• **amount**: *BigNumber*

*Inherited from [InvestInTieredStoBaseProcedureArgs](_types_index_.investintieredstobaseprocedureargs.md).[amount](_types_index_.investintieredstobaseprocedureargs.md#amount)*

*Defined in [src/types/index.ts:628](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/types/index.ts#L628)*

amount to invest

___

### `Optional` beneficiary

• **beneficiary**? : *undefined | string*

*Inherited from [InvestInTieredStoBaseProcedureArgs](_types_index_.investintieredstobaseprocedureargs.md).[beneficiary](_types_index_.investintieredstobaseprocedureargs.md#optional-beneficiary)*

*Defined in [src/types/index.ts:641](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/types/index.ts#L641)*

if specified, the investment will be made on behalf of this address

___

###  currency

• **currency**: *Currency.StableCoin*

*Overrides [InvestInTieredStoBaseProcedureArgs](_types_index_.investintieredstobaseprocedureargs.md).[currency](_types_index_.investintieredstobaseprocedureargs.md#currency)*

*Defined in [src/types/index.ts:645](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/types/index.ts#L645)*

___

### `Optional` minTokens

• **minTokens**? : *BigNumber*

*Inherited from [InvestInTieredStoBaseProcedureArgs](_types_index_.investintieredstobaseprocedureargs.md).[minTokens](_types_index_.investintieredstobaseprocedureargs.md#optional-mintokens)*

*Defined in [src/types/index.ts:637](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/types/index.ts#L637)*

minimum amount of Security Tokens that should be bought.
If, because of price fluctuations, a lower amount is being bought, the transaction will revert

___

###  stableCoinAddress

• **stableCoinAddress**: *string*

*Defined in [src/types/index.ts:646](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/types/index.ts#L646)*

___

###  stoAddress

• **stoAddress**: *string*

*Inherited from [InvestInTieredStoBaseProcedureArgs](_types_index_.investintieredstobaseprocedureargs.md).[stoAddress](_types_index_.investintieredstobaseprocedureargs.md#stoaddress)*

*Defined in [src/types/index.ts:624](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/types/index.ts#L624)*

address of the STO

___

###  symbol

• **symbol**: *string*

*Inherited from [InvestInTieredStoBaseProcedureArgs](_types_index_.investintieredstobaseprocedureargs.md).[symbol](_types_index_.investintieredstobaseprocedureargs.md#symbol)*

*Defined in [src/types/index.ts:620](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/types/index.ts#L620)*

symbol of the Security Token
