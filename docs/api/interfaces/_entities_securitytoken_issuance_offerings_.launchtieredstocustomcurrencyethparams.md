# Interface: LaunchTieredStoCustomCurrencyEthParams

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

• **allowPreIssuance**? : *undefined | false | true*

*Inherited from [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[allowPreIssuance](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#optional-allowpreissuance)*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:29](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L29)*

___

###  currencies

• **currencies**: *[OnlyEth](../modules/_entities_securitytoken_issuance_offerings_.md#onlyeth) | [EthAndStableCoin](../modules/_entities_securitytoken_issuance_offerings_.md#ethandstablecoin)*

*Overrides [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[currencies](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#currencies)*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:67](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L67)*

___

###  customCurrency

• **customCurrency**: *object*

*Overrides [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[customCurrency](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#optional-customcurrency)*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:68](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L68)*

#### Type declaration:

* **currencySymbol**? : *undefined | string*

* **ethOracleAddress**: *string*

___

###  endDate

• **endDate**: *Date*

*Inherited from [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[endDate](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#enddate)*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:20](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L20)*

___

###  minimumInvestment

• **minimumInvestment**: *BigNumber*

*Inherited from [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[minimumInvestment](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#minimuminvestment)*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:23](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L23)*

___

###  nonAccreditedInvestmentLimit

• **nonAccreditedInvestmentLimit**: *BigNumber*

*Inherited from [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[nonAccreditedInvestmentLimit](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#nonaccreditedinvestmentlimit)*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:22](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L22)*

___

###  raisedFundsWallet

• **raisedFundsWallet**: *string*

*Inherited from [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[raisedFundsWallet](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#raisedfundswallet)*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:25](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L25)*

___

###  stableCoinAddresses

• **stableCoinAddresses**: *string[]*

*Overrides [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[stableCoinAddresses](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#optional-stablecoinaddresses)*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:72](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L72)*

___

###  startDate

• **startDate**: *Date*

*Inherited from [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[startDate](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#startdate)*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:19](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L19)*

___

###  tiers

• **tiers**: *[StoTier](_types_index_.stotier.md)[]*

*Inherited from [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[tiers](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#tiers)*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:21](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L21)*

___

###  unsoldTokensWallet

• **unsoldTokensWallet**: *string*

*Inherited from [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[unsoldTokensWallet](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#unsoldtokenswallet)*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:26](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Issuance/Offerings.ts#L26)*
