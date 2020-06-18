# LaunchSimpleStoProcedureArgs

Arguments for the [LaunchSimpleSto](../enums/_types_index_.proceduretype.md#launchsimplesto) Procedure

## Hierarchy

* **LaunchSimpleStoProcedureArgs**

## Index

### Properties

* [allowPreIssuing](_types_index_.launchsimplestoprocedureargs.md#optional-allowpreissuing)
* [currency](_types_index_.launchsimplestoprocedureargs.md#currency)
* [endDate](_types_index_.launchsimplestoprocedureargs.md#enddate)
* [raisedFundsWallet](_types_index_.launchsimplestoprocedureargs.md#raisedfundswallet)
* [rate](_types_index_.launchsimplestoprocedureargs.md#rate)
* [startDate](_types_index_.launchsimplestoprocedureargs.md#startdate)
* [symbol](_types_index_.launchsimplestoprocedureargs.md#symbol)
* [tokensOnSale](_types_index_.launchsimplestoprocedureargs.md#tokensonsale)
* [unsoldTokensWallet](_types_index_.launchsimplestoprocedureargs.md#unsoldtokenswallet)

## Properties

### `Optional` allowPreIssuing

• **allowPreIssuing**? : _undefined \| false \| true_

_Defined in_ [_src/types/index.ts:539_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L539)

whether the total amount of Security Tokens that will be sold should be issued at the time the STO starts. Otherwise, they will be issued on each purchase. Defaults to false

### currency

• **currency**: _Currency.ETH \| Currency.POLY_

_Defined in_ [_src/types/index.ts:526_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L526)

currency for the Simple STO fund raise

### endDate

• **endDate**: _Date_

_Defined in_ [_src/types/index.ts:514_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L514)

end date of the STO

### raisedFundsWallet

• **raisedFundsWallet**: _string_

_Defined in_ [_src/types/index.ts:530_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L530)

wallet to which raised funds will be sent

### rate

• **rate**: _BigNumber_

_Defined in_ [_src/types/index.ts:522_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L522)

amount of tokens sold per unit of currency

### startDate

• **startDate**: _Date_

_Defined in_ [_src/types/index.ts:510_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L510)

start date of the STO

### symbol

• **symbol**: _string_

_Defined in_ [_src/types/index.ts:506_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L506)

symbol of the Security Token

### tokensOnSale

• **tokensOnSale**: _BigNumber_

_Defined in_ [_src/types/index.ts:518_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L518)

number of tokens that will be sold

### unsoldTokensWallet

• **unsoldTokensWallet**: _string_

_Defined in_ [_src/types/index.ts:534_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L534)

wallet to which unsold tokens will be sent if the STO expires

