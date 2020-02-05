# Interface: LaunchTieredStoProcedureArgs

Arguments for the [LaunchTieredSto](../enums/_types_index_.proceduretype.md#launchtieredsto) Procedure

## Hierarchy

* **LaunchTieredStoProcedureArgs**

## Index

### Properties

* [allowPreIssuing](_types_index_.launchtieredstoprocedureargs.md#optional-allowpreissuing)
* [currencies](_types_index_.launchtieredstoprocedureargs.md#currencies)
* [customCurrency](_types_index_.launchtieredstoprocedureargs.md#optional-customcurrency)
* [endDate](_types_index_.launchtieredstoprocedureargs.md#enddate)
* [minimumInvestment](_types_index_.launchtieredstoprocedureargs.md#minimuminvestment)
* [nonAccreditedInvestmentLimit](_types_index_.launchtieredstoprocedureargs.md#nonaccreditedinvestmentlimit)
* [raisedFundsWallet](_types_index_.launchtieredstoprocedureargs.md#raisedfundswallet)
* [stableCoinAddresses](_types_index_.launchtieredstoprocedureargs.md#optional-stablecoinaddresses)
* [startDate](_types_index_.launchtieredstoprocedureargs.md#startdate)
* [symbol](_types_index_.launchtieredstoprocedureargs.md#symbol)
* [tiers](_types_index_.launchtieredstoprocedureargs.md#tiers)
* [unsoldTokensWallet](_types_index_.launchtieredstoprocedureargs.md#unsoldtokenswallet)

## Properties

### `Optional` allowPreIssuing

• **allowPreIssuing**? : *undefined | false | true*

*Defined in [src/types/index.ts:791](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/types/index.ts#L791)*

whether the total amount of Security Tokens that will be sold should be issued at the time the STO starts.
Otherwise, they will be issued on each purchase. Defaults to false

___

###  currencies

• **currencies**: *Currency[]*

*Defined in [src/types/index.ts:769](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/types/index.ts#L769)*

currencies with which Security Tokens can be purchased in the STO

___

### `Optional` customCurrency

• **customCurrency**? : *Partial‹[CustomCurrency](_types_index_.customcurrency.md)›*

*Defined in [src/types/index.ts:786](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/types/index.ts#L786)*

if raising in Stable Coin,
this parameter can be used to specify a currency different than USD for the STO to be pegged in

___

###  endDate

• **endDate**: *Date*

*Defined in [src/types/index.ts:753](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/types/index.ts#L753)*

end date of the STO

___

###  minimumInvestment

• **minimumInvestment**: *BigNumber*

*Defined in [src/types/index.ts:765](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/types/index.ts#L765)*

minimum amount that can be invested by any investor

___

###  nonAccreditedInvestmentLimit

• **nonAccreditedInvestmentLimit**: *BigNumber*

*Defined in [src/types/index.ts:761](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/types/index.ts#L761)*

maximum amount that can be invested by non accredited investors

___

###  raisedFundsWallet

• **raisedFundsWallet**: *string*

*Defined in [src/types/index.ts:773](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/types/index.ts#L773)*

wallet where raised funds will be sent

___

### `Optional` stableCoinAddresses

• **stableCoinAddresses**? : *string[]*

*Defined in [src/types/index.ts:781](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/types/index.ts#L781)*

list of the addresses of the Stable Coins that can be used to purchase Security Tokens in the STO

___

###  startDate

• **startDate**: *Date*

*Defined in [src/types/index.ts:749](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/types/index.ts#L749)*

start date of the STO

___

###  symbol

• **symbol**: *string*

*Defined in [src/types/index.ts:745](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/types/index.ts#L745)*

symbol of the Security Token

___

###  tiers

• **tiers**: *[StoTier](_types_index_.stotier.md)[]*

*Defined in [src/types/index.ts:757](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/types/index.ts#L757)*

array of Tier information

___

###  unsoldTokensWallet

• **unsoldTokensWallet**: *string*

*Defined in [src/types/index.ts:777](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/types/index.ts#L777)*

wallet where unsold tokens will be sent if the STO expires
