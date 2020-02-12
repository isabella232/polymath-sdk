# Interface: LaunchTieredStoCustomCurrencyPolyParams

## Hierarchy

* [LaunchTieredStoParams](entities.securitytoken.issuance.launchtieredstoparams.md)

  ↳ **LaunchTieredStoCustomCurrencyPolyParams**

## Index

### Properties

* [allowPreIssuance](entities.securitytoken.issuance.launchtieredstocustomcurrencypolyparams.md#optional-allowpreissuance)
* [currencies](entities.securitytoken.issuance.launchtieredstocustomcurrencypolyparams.md#currencies)
* [customCurrency](entities.securitytoken.issuance.launchtieredstocustomcurrencypolyparams.md#customcurrency)
* [endDate](entities.securitytoken.issuance.launchtieredstocustomcurrencypolyparams.md#enddate)
* [minimumInvestment](entities.securitytoken.issuance.launchtieredstocustomcurrencypolyparams.md#minimuminvestment)
* [nonAccreditedInvestmentLimit](entities.securitytoken.issuance.launchtieredstocustomcurrencypolyparams.md#nonaccreditedinvestmentlimit)
* [raisedFundsWallet](entities.securitytoken.issuance.launchtieredstocustomcurrencypolyparams.md#raisedfundswallet)
* [stableCoinAddresses](entities.securitytoken.issuance.launchtieredstocustomcurrencypolyparams.md#stablecoinaddresses)
* [startDate](entities.securitytoken.issuance.launchtieredstocustomcurrencypolyparams.md#startdate)
* [tiers](entities.securitytoken.issuance.launchtieredstocustomcurrencypolyparams.md#tiers)
* [unsoldTokensWallet](entities.securitytoken.issuance.launchtieredstocustomcurrencypolyparams.md#unsoldtokenswallet)

## Properties

### `Optional` allowPreIssuance

• **allowPreIssuance**? : *undefined | false | true*

*Inherited from [LaunchTieredStoParams](entities.securitytoken.issuance.launchtieredstoparams.md).[allowPreIssuance](entities.securitytoken.issuance.launchtieredstoparams.md#optional-allowpreissuance)*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:34](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/Issuance/Offerings.ts#L34)*

___

###  currencies

• **currencies**: *[OnlyPoly](../modules/entities.securitytoken.issuance.md#onlypoly) | [PolyAndStableCoin](../modules/entities.securitytoken.issuance.md#polyandstablecoin)*

*Overrides [LaunchTieredStoParams](entities.securitytoken.issuance.launchtieredstoparams.md).[currencies](entities.securitytoken.issuance.launchtieredstoparams.md#currencies)*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:90](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/Issuance/Offerings.ts#L90)*

___

###  customCurrency

• **customCurrency**: *object*

*Overrides [LaunchTieredStoParams](entities.securitytoken.issuance.launchtieredstoparams.md).[customCurrency](entities.securitytoken.issuance.launchtieredstoparams.md#optional-customcurrency)*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:91](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/Issuance/Offerings.ts#L91)*

#### Type declaration:

* **currencySymbol**? : *undefined | string*

* **polyOracleAddress**: *string*

___

###  endDate

• **endDate**: *Date*

*Inherited from [LaunchTieredStoParams](entities.securitytoken.issuance.launchtieredstoparams.md).[endDate](entities.securitytoken.issuance.launchtieredstoparams.md#enddate)*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:25](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/Issuance/Offerings.ts#L25)*

___

###  minimumInvestment

• **minimumInvestment**: *BigNumber*

*Inherited from [LaunchTieredStoParams](entities.securitytoken.issuance.launchtieredstoparams.md).[minimumInvestment](entities.securitytoken.issuance.launchtieredstoparams.md#minimuminvestment)*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:28](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/Issuance/Offerings.ts#L28)*

___

###  nonAccreditedInvestmentLimit

• **nonAccreditedInvestmentLimit**: *BigNumber*

*Inherited from [LaunchTieredStoParams](entities.securitytoken.issuance.launchtieredstoparams.md).[nonAccreditedInvestmentLimit](entities.securitytoken.issuance.launchtieredstoparams.md#nonaccreditedinvestmentlimit)*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:27](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/Issuance/Offerings.ts#L27)*

___

###  raisedFundsWallet

• **raisedFundsWallet**: *string*

*Inherited from [LaunchTieredStoParams](entities.securitytoken.issuance.launchtieredstoparams.md).[raisedFundsWallet](entities.securitytoken.issuance.launchtieredstoparams.md#raisedfundswallet)*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:30](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/Issuance/Offerings.ts#L30)*

___

###  stableCoinAddresses

• **stableCoinAddresses**: *string[]*

*Overrides [LaunchTieredStoParams](entities.securitytoken.issuance.launchtieredstoparams.md).[stableCoinAddresses](entities.securitytoken.issuance.launchtieredstoparams.md#optional-stablecoinaddresses)*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:95](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/Issuance/Offerings.ts#L95)*

___

###  startDate

• **startDate**: *Date*

*Inherited from [LaunchTieredStoParams](entities.securitytoken.issuance.launchtieredstoparams.md).[startDate](entities.securitytoken.issuance.launchtieredstoparams.md#startdate)*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:24](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/Issuance/Offerings.ts#L24)*

___

###  tiers

• **tiers**: *[StoTier](_types_index_.stotier.md)[]*

*Inherited from [LaunchTieredStoParams](entities.securitytoken.issuance.launchtieredstoparams.md).[tiers](entities.securitytoken.issuance.launchtieredstoparams.md#tiers)*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:26](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/Issuance/Offerings.ts#L26)*

___

###  unsoldTokensWallet

• **unsoldTokensWallet**: *string*

*Inherited from [LaunchTieredStoParams](entities.securitytoken.issuance.launchtieredstoparams.md).[unsoldTokensWallet](entities.securitytoken.issuance.launchtieredstoparams.md#unsoldtokenswallet)*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:31](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/Issuance/Offerings.ts#L31)*
