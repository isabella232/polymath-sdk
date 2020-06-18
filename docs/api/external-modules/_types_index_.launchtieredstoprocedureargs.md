# LaunchTieredStoProcedureArgs

Arguments for the [LaunchTieredSto](../enums/_types_index_.proceduretype.md#launchtieredsto) Procedure

## Hierarchy

* **LaunchTieredStoProcedureArgs**

## Index

### Properties

* [allowPreIssuing](../interfaces/_types_index_.launchtieredstoprocedureargs.md#optional-allowpreissuing)
* [currencies](../interfaces/_types_index_.launchtieredstoprocedureargs.md#currencies)
* [customCurrency](../interfaces/_types_index_.launchtieredstoprocedureargs.md#optional-customcurrency)
* [endDate](../interfaces/_types_index_.launchtieredstoprocedureargs.md#enddate)
* [minimumInvestment](../interfaces/_types_index_.launchtieredstoprocedureargs.md#minimuminvestment)
* [nonAccreditedInvestmentLimit](../interfaces/_types_index_.launchtieredstoprocedureargs.md#nonaccreditedinvestmentlimit)
* [raisedFundsWallet](../interfaces/_types_index_.launchtieredstoprocedureargs.md#raisedfundswallet)
* [stableCoinAddresses](../interfaces/_types_index_.launchtieredstoprocedureargs.md#optional-stablecoinaddresses)
* [startDate](../interfaces/_types_index_.launchtieredstoprocedureargs.md#startdate)
* [symbol](../interfaces/_types_index_.launchtieredstoprocedureargs.md#symbol)
* [tiers](../interfaces/_types_index_.launchtieredstoprocedureargs.md#tiers)
* [unsoldTokensWallet](../interfaces/_types_index_.launchtieredstoprocedureargs.md#unsoldtokenswallet)

## Properties

### `Optional` allowPreIssuing

• **allowPreIssuing**? : _undefined \| false \| true_

_Defined in_ [_src/types/index.ts:791_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L791)

whether the total amount of Security Tokens that will be sold should be issued at the time the STO starts. Otherwise, they will be issued on each purchase. Defaults to false

### currencies

• **currencies**: _Currency\[\]_

_Defined in_ [_src/types/index.ts:769_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L769)

currencies with which Security Tokens can be purchased in the STO

### `Optional` customCurrency

• **customCurrency**? : _Partial‹_[_CustomCurrency_](../interfaces/_types_index_.customcurrency.md)_›_

_Defined in_ [_src/types/index.ts:786_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L786)

if raising in Stable Coin, this parameter can be used to specify a currency different than USD for the STO to be pegged in

### endDate

• **endDate**: _Date_

_Defined in_ [_src/types/index.ts:753_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L753)

end date of the STO

### minimumInvestment

• **minimumInvestment**: _BigNumber_

_Defined in_ [_src/types/index.ts:765_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L765)

minimum amount that can be invested by any investor

### nonAccreditedInvestmentLimit

• **nonAccreditedInvestmentLimit**: _BigNumber_

_Defined in_ [_src/types/index.ts:761_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L761)

maximum amount that can be invested by non accredited investors

### raisedFundsWallet

• **raisedFundsWallet**: _string_

_Defined in_ [_src/types/index.ts:773_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L773)

wallet where raised funds will be sent

### `Optional` stableCoinAddresses

• **stableCoinAddresses**? : _string\[\]_

_Defined in_ [_src/types/index.ts:781_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L781)

list of the addresses of the Stable Coins that can be used to purchase Security Tokens in the STO

### startDate

• **startDate**: _Date_

_Defined in_ [_src/types/index.ts:749_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L749)

start date of the STO

### symbol

• **symbol**: _string_

_Defined in_ [_src/types/index.ts:745_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L745)

symbol of the Security Token

### tiers

• **tiers**: [_StoTier_](../interfaces/_types_index_.stotier.md)_\[\]_

_Defined in_ [_src/types/index.ts:757_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L757)

array of Tier information

### unsoldTokensWallet

• **unsoldTokensWallet**: _string_

_Defined in_ [_src/types/index.ts:777_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L777)

wallet where unsold tokens will be sent if the STO expires

