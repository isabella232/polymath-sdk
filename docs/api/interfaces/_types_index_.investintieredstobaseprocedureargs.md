# Interface: InvestInTieredStoBaseProcedureArgs

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

###  amount

• **amount**: *BigNumber*

*Defined in [src/types/index.ts:628](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/types/index.ts#L628)*

amount to invest

___

### `Optional` beneficiary

• **beneficiary**? : *undefined | string*

*Defined in [src/types/index.ts:641](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/types/index.ts#L641)*

if specified, the investment will be made on behalf of this address

___

###  currency

• **currency**: *Currency*

*Defined in [src/types/index.ts:632](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/types/index.ts#L632)*

currency type in which the investment is being made

___

### `Optional` minTokens

• **minTokens**? : *BigNumber*

*Defined in [src/types/index.ts:637](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/types/index.ts#L637)*

minimum amount of Security Tokens that should be bought.
If, because of price fluctuations, a lower amount is being bought, the transaction will revert

___

###  stoAddress

• **stoAddress**: *string*

*Defined in [src/types/index.ts:624](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/types/index.ts#L624)*

address of the STO

___

###  symbol

• **symbol**: *string*

*Defined in [src/types/index.ts:620](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/types/index.ts#L620)*

symbol of the Security Token
