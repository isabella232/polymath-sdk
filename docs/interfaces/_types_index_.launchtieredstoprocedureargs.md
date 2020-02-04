[@polymathnetwork/sdk - v2.0.1-beta.120](../README.md) › [Globals](../globals.md) › ["types/index"](../modules/_types_index_.md) › [LaunchTieredStoProcedureArgs](_types_index_.launchtieredstoprocedureargs.md)

# Interface: LaunchTieredStoProcedureArgs

Arguments for the [LaunchTieredSto](../enums/_types_index_.proceduretype.md#launchtieredsto) Procedure

## Hierarchy

- **LaunchTieredStoProcedureArgs**

## Index

### Properties

- [allowPreIssuing](_types_index_.launchtieredstoprocedureargs.md#optional-allowpreissuing)
- [currencies](_types_index_.launchtieredstoprocedureargs.md#currencies)
- [customCurrency](_types_index_.launchtieredstoprocedureargs.md#optional-customcurrency)
- [endDate](_types_index_.launchtieredstoprocedureargs.md#enddate)
- [minimumInvestment](_types_index_.launchtieredstoprocedureargs.md#minimuminvestment)
- [nonAccreditedInvestmentLimit](_types_index_.launchtieredstoprocedureargs.md#nonaccreditedinvestmentlimit)
- [raisedFundsWallet](_types_index_.launchtieredstoprocedureargs.md#raisedfundswallet)
- [stableCoinAddresses](_types_index_.launchtieredstoprocedureargs.md#optional-stablecoinaddresses)
- [startDate](_types_index_.launchtieredstoprocedureargs.md#startdate)
- [symbol](_types_index_.launchtieredstoprocedureargs.md#symbol)
- [tiers](_types_index_.launchtieredstoprocedureargs.md#tiers)
- [unsoldTokensWallet](_types_index_.launchtieredstoprocedureargs.md#unsoldtokenswallet)

## Properties

### `Optional` allowPreIssuing

• **allowPreIssuing**? : _undefined | false | true_

_Defined in [src/types/index.ts:791](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/types/index.ts#L791)_

whether the total amount of Security Tokens that will be sold should be issued at the time the STO starts.
Otherwise, they will be issued on each purchase. Defaults to false

---

### currencies

• **currencies**: _Currency[]_

_Defined in [src/types/index.ts:769](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/types/index.ts#L769)_

currencies with which Security Tokens can be purchased in the STO

---

### `Optional` customCurrency

• **customCurrency**? : _Partial‹[CustomCurrency](_types_index_.customcurrency.md)›_

_Defined in [src/types/index.ts:786](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/types/index.ts#L786)_

if raising in Stable Coin,
this parameter can be used to specify a currency different than USD for the STO to be pegged in

---

### endDate

• **endDate**: _Date_

_Defined in [src/types/index.ts:753](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/types/index.ts#L753)_

end date of the STO

---

### minimumInvestment

• **minimumInvestment**: _BigNumber_

_Defined in [src/types/index.ts:765](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/types/index.ts#L765)_

minimum amount that can be invested by any investor

---

### nonAccreditedInvestmentLimit

• **nonAccreditedInvestmentLimit**: _BigNumber_

_Defined in [src/types/index.ts:761](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/types/index.ts#L761)_

maximum amount that can be invested by non accredited investors

---

### raisedFundsWallet

• **raisedFundsWallet**: _string_

_Defined in [src/types/index.ts:773](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/types/index.ts#L773)_

wallet where raised funds will be sent

---

### `Optional` stableCoinAddresses

• **stableCoinAddresses**? : _string[]_

_Defined in [src/types/index.ts:781](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/types/index.ts#L781)_

list of the addresses of the Stable Coins that can be used to purchase Security Tokens in the STO

---

### startDate

• **startDate**: _Date_

_Defined in [src/types/index.ts:749](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/types/index.ts#L749)_

start date of the STO

---

### symbol

• **symbol**: _string_

_Defined in [src/types/index.ts:745](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/types/index.ts#L745)_

symbol of the Security Token

---

### tiers

• **tiers**: _[StoTier](_types_index_.stotier.md)[]_

_Defined in [src/types/index.ts:757](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/types/index.ts#L757)_

array of Tier information

---

### unsoldTokensWallet

• **unsoldTokensWallet**: _string_

_Defined in [src/types/index.ts:777](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/types/index.ts#L777)_

wallet where unsold tokens will be sent if the STO expires
