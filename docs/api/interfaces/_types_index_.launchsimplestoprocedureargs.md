# Interface: LaunchSimpleStoProcedureArgs

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

• **allowPreIssuing**? : *undefined | false | true*

*Defined in [src/types/index.ts:539](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/types/index.ts#L539)*

whether the total amount of Security Tokens that will be sold should be issued at the time the STO starts.
Otherwise, they will be issued on each purchase. Defaults to false

___

###  currency

• **currency**: *Currency.ETH | Currency.POLY*

*Defined in [src/types/index.ts:526](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/types/index.ts#L526)*

currency for the Simple STO fund raise

___

###  endDate

• **endDate**: *Date*

*Defined in [src/types/index.ts:514](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/types/index.ts#L514)*

end date of the STO

___

###  raisedFundsWallet

• **raisedFundsWallet**: *string*

*Defined in [src/types/index.ts:530](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/types/index.ts#L530)*

wallet to which raised funds will be sent

___

###  rate

• **rate**: *BigNumber*

*Defined in [src/types/index.ts:522](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/types/index.ts#L522)*

amount of tokens sold per unit of currency

___

###  startDate

• **startDate**: *Date*

*Defined in [src/types/index.ts:510](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/types/index.ts#L510)*

start date of the STO

___

###  symbol

• **symbol**: *string*

*Defined in [src/types/index.ts:506](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/types/index.ts#L506)*

symbol of the Security Token

___

###  tokensOnSale

• **tokensOnSale**: *BigNumber*

*Defined in [src/types/index.ts:518](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/types/index.ts#L518)*

number of tokens that will be sold

___

###  unsoldTokensWallet

• **unsoldTokensWallet**: *string*

*Defined in [src/types/index.ts:534](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/types/index.ts#L534)*

wallet to which unsold tokens will be sent if the STO expires
