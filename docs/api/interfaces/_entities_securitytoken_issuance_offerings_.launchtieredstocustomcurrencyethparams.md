# LaunchTieredStoCustomCurrencyEthParams

## Hierarchy

* [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md)

  ↳ **LaunchTieredStoCustomCurrencyEthParams**

## Index

### Properties

* [allowPreIssuance](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencyethparams.md#optional-allowpreissuance)
* [currencies](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencyethparams.md#currencies)
* [customCurrency](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencyethparams.md#customcurrency)
* [endDate](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencyethparams.md#enddate)
* [minimumInvestment](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencyethparams.md#minimuminvestment)
* [nonAccreditedInvestmentLimit](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencyethparams.md#nonaccreditedinvestmentlimit)
* [raisedFundsWallet](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencyethparams.md#raisedfundswallet)
* [stableCoinAddresses](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencyethparams.md#stablecoinaddresses)
* [startDate](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencyethparams.md#startdate)
* [tiers](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencyethparams.md#tiers)
* [unsoldTokensWallet](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencyethparams.md#unsoldtokenswallet)

## Properties

### `Optional` allowPreIssuance

• **allowPreIssuance**? : _undefined \| false \| true_

_Inherited from_ [_LaunchTieredStoParams_](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md)_._[_allowPreIssuance_](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#optional-allowpreissuance)

_Defined in_ [_src/entities/SecurityToken/Issuance/Offerings.ts:29_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L29)

### currencies

• **currencies**: [_OnlyEth_](../external-modules/_entities_securitytoken_issuance_offerings_.md#onlyeth) _\|_ [_EthAndStableCoin_](../external-modules/_entities_securitytoken_issuance_offerings_.md#ethandstablecoin)

_Overrides_ [_LaunchTieredStoParams_](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md)_._[_currencies_](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#currencies)

_Defined in_ [_src/entities/SecurityToken/Issuance/Offerings.ts:67_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L67)

### customCurrency

• **customCurrency**: _object_

_Overrides_ [_LaunchTieredStoParams_](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md)_._[_customCurrency_](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#optional-customcurrency)

_Defined in_ [_src/entities/SecurityToken/Issuance/Offerings.ts:68_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L68)

#### Type declaration:

* **currencySymbol**? : _undefined \| string_
* **ethOracleAddress**: _string_

### endDate

• **endDate**: _Date_

_Inherited from_ [_LaunchTieredStoParams_](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md)_._[_endDate_](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#enddate)

_Defined in_ [_src/entities/SecurityToken/Issuance/Offerings.ts:20_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L20)

### minimumInvestment

• **minimumInvestment**: _BigNumber_

_Inherited from_ [_LaunchTieredStoParams_](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md)_._[_minimumInvestment_](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#minimuminvestment)

_Defined in_ [_src/entities/SecurityToken/Issuance/Offerings.ts:23_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L23)

### nonAccreditedInvestmentLimit

• **nonAccreditedInvestmentLimit**: _BigNumber_

_Inherited from_ [_LaunchTieredStoParams_](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md)_._[_nonAccreditedInvestmentLimit_](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#nonaccreditedinvestmentlimit)

_Defined in_ [_src/entities/SecurityToken/Issuance/Offerings.ts:22_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L22)

### raisedFundsWallet

• **raisedFundsWallet**: _string_

_Inherited from_ [_LaunchTieredStoParams_](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md)_._[_raisedFundsWallet_](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#raisedfundswallet)

_Defined in_ [_src/entities/SecurityToken/Issuance/Offerings.ts:25_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L25)

### stableCoinAddresses

• **stableCoinAddresses**: _string\[\]_

_Overrides_ [_LaunchTieredStoParams_](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md)_._[_stableCoinAddresses_](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#optional-stablecoinaddresses)

_Defined in_ [_src/entities/SecurityToken/Issuance/Offerings.ts:72_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L72)

### startDate

• **startDate**: _Date_

_Inherited from_ [_LaunchTieredStoParams_](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md)_._[_startDate_](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#startdate)

_Defined in_ [_src/entities/SecurityToken/Issuance/Offerings.ts:19_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L19)

### tiers

• **tiers**: [_StoTier_](_types_index_.stotier.md)_\[\]_

_Inherited from_ [_LaunchTieredStoParams_](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md)_._[_tiers_](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#tiers)

_Defined in_ [_src/entities/SecurityToken/Issuance/Offerings.ts:21_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L21)

### unsoldTokensWallet

• **unsoldTokensWallet**: _string_

_Inherited from_ [_LaunchTieredStoParams_](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md)_._[_unsoldTokensWallet_](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#unsoldtokenswallet)

_Defined in_ [_src/entities/SecurityToken/Issuance/Offerings.ts:26_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L26)

