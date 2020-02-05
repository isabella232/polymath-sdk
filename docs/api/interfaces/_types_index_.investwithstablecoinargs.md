# Interface: InvestWithStableCoinArgs

## Hierarchy

- [InvestInTieredStoBaseProcedureArgs](_types_index_.investintieredstobaseprocedureargs.md)

  ↳ **InvestWithStableCoinArgs**

## Index

### Properties

- [amount](_types_index_.investwithstablecoinargs.md#amount)
- [beneficiary](_types_index_.investwithstablecoinargs.md#optional-beneficiary)
- [currency](_types_index_.investwithstablecoinargs.md#currency)
- [minTokens](_types_index_.investwithstablecoinargs.md#optional-mintokens)
- [stableCoinAddress](_types_index_.investwithstablecoinargs.md#stablecoinaddress)
- [stoAddress](_types_index_.investwithstablecoinargs.md#stoaddress)
- [symbol](_types_index_.investwithstablecoinargs.md#symbol)

## Properties

### amount

• **amount**: _BigNumber_

_Inherited from [InvestInTieredStoBaseProcedureArgs](_types_index_.investintieredstobaseprocedureargs.md).[amount](_types_index_.investintieredstobaseprocedureargs.md#amount)_

_Defined in [src/types/index.ts:628](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/types/index.ts#L628)_

amount to invest

---

### `Optional` beneficiary

• **beneficiary**? : _undefined | string_

_Inherited from [InvestInTieredStoBaseProcedureArgs](_types_index_.investintieredstobaseprocedureargs.md).[beneficiary](_types_index_.investintieredstobaseprocedureargs.md#optional-beneficiary)_

_Defined in [src/types/index.ts:641](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/types/index.ts#L641)_

if specified, the investment will be made on behalf of this address

---

### currency

• **currency**: _Currency.StableCoin_

_Overrides [InvestInTieredStoBaseProcedureArgs](_types_index_.investintieredstobaseprocedureargs.md).[currency](_types_index_.investintieredstobaseprocedureargs.md#currency)_

_Defined in [src/types/index.ts:645](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/types/index.ts#L645)_

---

### `Optional` minTokens

• **minTokens**? : _BigNumber_

_Inherited from [InvestInTieredStoBaseProcedureArgs](_types_index_.investintieredstobaseprocedureargs.md).[minTokens](_types_index_.investintieredstobaseprocedureargs.md#optional-mintokens)_

_Defined in [src/types/index.ts:637](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/types/index.ts#L637)_

minimum amount of Security Tokens that should be bought.
If, because of price fluctuations, a lower amount is being bought, the transaction will revert

---

### stableCoinAddress

• **stableCoinAddress**: _string_

_Defined in [src/types/index.ts:646](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/types/index.ts#L646)_

---

### stoAddress

• **stoAddress**: _string_

_Inherited from [InvestInTieredStoBaseProcedureArgs](_types_index_.investintieredstobaseprocedureargs.md).[stoAddress](_types_index_.investintieredstobaseprocedureargs.md#stoaddress)_

_Defined in [src/types/index.ts:624](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/types/index.ts#L624)_

address of the STO

---

### symbol

• **symbol**: _string_

_Inherited from [InvestInTieredStoBaseProcedureArgs](_types_index_.investintieredstobaseprocedureargs.md).[symbol](_types_index_.investintieredstobaseprocedureargs.md#symbol)_

_Defined in [src/types/index.ts:620](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/types/index.ts#L620)_

symbol of the Security Token
