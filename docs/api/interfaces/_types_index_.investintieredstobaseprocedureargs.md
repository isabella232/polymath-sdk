# Interface: InvestInTieredStoBaseProcedureArgs

## Hierarchy

- **InvestInTieredStoBaseProcedureArgs**

  ↳ [InvestWithStableCoinArgs](_types_index_.investwithstablecoinargs.md)

## Index

### Properties

- [amount](_types_index_.investintieredstobaseprocedureargs.md#amount)
- [beneficiary](_types_index_.investintieredstobaseprocedureargs.md#optional-beneficiary)
- [currency](_types_index_.investintieredstobaseprocedureargs.md#currency)
- [minTokens](_types_index_.investintieredstobaseprocedureargs.md#optional-mintokens)
- [stoAddress](_types_index_.investintieredstobaseprocedureargs.md#stoaddress)
- [symbol](_types_index_.investintieredstobaseprocedureargs.md#symbol)

## Properties

### amount

• **amount**: _BigNumber_

_Defined in [src/types/index.ts:628](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/types/index.ts#L628)_

amount to invest

---

### `Optional` beneficiary

• **beneficiary**? : _undefined | string_

_Defined in [src/types/index.ts:641](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/types/index.ts#L641)_

if specified, the investment will be made on behalf of this address

---

### currency

• **currency**: _Currency_

_Defined in [src/types/index.ts:632](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/types/index.ts#L632)_

currency type in which the investment is being made

---

### `Optional` minTokens

• **minTokens**? : _BigNumber_

_Defined in [src/types/index.ts:637](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/types/index.ts#L637)_

minimum amount of Security Tokens that should be bought.
If, because of price fluctuations, a lower amount is being bought, the transaction will revert

---

### stoAddress

• **stoAddress**: _string_

_Defined in [src/types/index.ts:624](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/types/index.ts#L624)_

address of the STO

---

### symbol

• **symbol**: _string_

_Defined in [src/types/index.ts:620](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/types/index.ts#L620)_

symbol of the Security Token
