# LaunchTieredStoCustomCurrencyBothParams

## Hierarchy

* [LaunchTieredStoParams](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md)

  ↳ **LaunchTieredStoCustomCurrencyBothParams**

## Index

### Properties

* [allowPreIssuance](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencybothparams.md#optional-allowpreissuance)
* [currencies](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencybothparams.md#currencies)
* [customCurrency](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencybothparams.md#customcurrency)
* [endDate](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencybothparams.md#enddate)
* [minimumInvestment](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencybothparams.md#minimuminvestment)
* [nonAccreditedInvestmentLimit](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencybothparams.md#nonaccreditedinvestmentlimit)
* [raisedFundsWallet](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencybothparams.md#raisedfundswallet)
* [stableCoinAddresses](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencybothparams.md#stablecoinaddresses)
* [startDate](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencybothparams.md#startdate)
* [tiers](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencybothparams.md#tiers)
* [unsoldTokensWallet](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencybothparams.md#unsoldtokenswallet)

## Properties

### `Optional` allowPreIssuance

• **allowPreIssuance**? : _undefined \| false \| true_

_Inherited from_ [_LaunchTieredStoParams_](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md)_._[_allowPreIssuance_](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#optional-allowpreissuance)

_Defined in_ [_src/entities/SecurityToken/Issuance/Offerings.ts:29_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L29)

### currencies

• **currencies**: [_AllCurrencies_](_entities_securitytoken_issuance_offerings_.md#allcurrencies)

_Overrides_ [_LaunchTieredStoParams_](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md)_._[_currencies_](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#currencies)

_Defined in_ [_src/entities/SecurityToken/Issuance/Offerings.ts:103_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L103)

### customCurrency

• **customCurrency**: _object_

_Overrides_ [_LaunchTieredStoParams_](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md)_._[_customCurrency_](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#optional-customcurrency)

_Defined in_ [_src/entities/SecurityToken/Issuance/Offerings.ts:104_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L104)

#### Type declaration:

* **currencySymbol**? : _undefined \| string_
* **ethOracleAddress**: _string_
* **polyOracleAddress**: _string_

### endDate

• **endDate**: _Date_

_Inherited from_ [_LaunchTieredStoParams_](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md)_._[_endDate_](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#enddate)

_Defined in_ [_src/entities/SecurityToken/Issuance/Offerings.ts:20_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L20)

### minimumInvestment

• **minimumInvestment**: _BigNumber_

_Inherited from_ [_LaunchTieredStoParams_](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md)_._[_minimumInvestment_](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#minimuminvestment)

_Defined in_ [_src/entities/SecurityToken/Issuance/Offerings.ts:23_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L23)

### nonAccreditedInvestmentLimit

• **nonAccreditedInvestmentLimit**: _BigNumber_

_Inherited from_ [_LaunchTieredStoParams_](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md)_._[_nonAccreditedInvestmentLimit_](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#nonaccreditedinvestmentlimit)

_Defined in_ [_src/entities/SecurityToken/Issuance/Offerings.ts:22_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L22)

### raisedFundsWallet

• **raisedFundsWallet**: _string_

_Inherited from_ [_LaunchTieredStoParams_](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md)_._[_raisedFundsWallet_](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#raisedfundswallet)

_Defined in_ [_src/entities/SecurityToken/Issuance/Offerings.ts:25_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L25)

### stableCoinAddresses

• **stableCoinAddresses**: _string\[\]_

_Overrides_ [_LaunchTieredStoParams_](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md)_._[_stableCoinAddresses_](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#optional-stablecoinaddresses)

_Defined in_ [_src/entities/SecurityToken/Issuance/Offerings.ts:109_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L109)

### startDate

• **startDate**: _Date_

_Inherited from_ [_LaunchTieredStoParams_](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md)_._[_startDate_](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#startdate)

_Defined in_ [_src/entities/SecurityToken/Issuance/Offerings.ts:19_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L19)

### tiers

• **tiers**: [_StoTier_](../interfaces/_types_index_.stotier.md)_\[\]_

_Inherited from_ [_LaunchTieredStoParams_](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md)_._[_tiers_](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#tiers)

_Defined in_ [_src/entities/SecurityToken/Issuance/Offerings.ts:21_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L21)

### unsoldTokensWallet

• **unsoldTokensWallet**: _string_

_Inherited from_ [_LaunchTieredStoParams_](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md)_._[_unsoldTokensWallet_](../interfaces/_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#unsoldtokenswallet)

_Defined in_ [_src/entities/SecurityToken/Issuance/Offerings.ts:26_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L26)

