# InvestWithStableCoinArgs

## Hierarchy

* [InvestInTieredStoBaseProcedureArgs]()

  ↳ **InvestWithStableCoinArgs**

## Index

### Properties

* [amount]()
* [beneficiary]()
* [currency]()
* [minTokens]()
* [stableCoinAddress]()
* [stoAddress]()
* [symbol]()

## Properties

### amount

• **amount**: _BigNumber_

_Inherited from_ [_InvestInTieredStoBaseProcedureArgs_]()_._[_amount_]()

_Defined in_ [_src/types/index.ts:628_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L628)

amount to invest

### `Optional` beneficiary

• **beneficiary**? : _undefined \| string_

_Inherited from_ [_InvestInTieredStoBaseProcedureArgs_]()_._[_beneficiary_]()

_Defined in_ [_src/types/index.ts:641_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L641)

if specified, the investment will be made on behalf of this address

### currency

• **currency**: _Currency.StableCoin_

_Overrides_ [_InvestInTieredStoBaseProcedureArgs_]()_._[_currency_]()

_Defined in_ [_src/types/index.ts:645_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L645)

### `Optional` minTokens

• **minTokens**? : _BigNumber_

_Inherited from_ [_InvestInTieredStoBaseProcedureArgs_]()_._[_minTokens_]()

_Defined in_ [_src/types/index.ts:637_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L637)

minimum amount of Security Tokens that should be bought. If, because of price fluctuations, a lower amount is being bought, the transaction will revert

### stableCoinAddress

• **stableCoinAddress**: _string_

_Defined in_ [_src/types/index.ts:646_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L646)

### stoAddress

• **stoAddress**: _string_

_Inherited from_ [_InvestInTieredStoBaseProcedureArgs_]()_._[_stoAddress_]()

_Defined in_ [_src/types/index.ts:624_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L624)

address of the STO

### symbol

• **symbol**: _string_

_Inherited from_ [_InvestInTieredStoBaseProcedureArgs_]()_._[_symbol_]()

_Defined in_ [_src/types/index.ts:620_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L620)

symbol of the Security Token

