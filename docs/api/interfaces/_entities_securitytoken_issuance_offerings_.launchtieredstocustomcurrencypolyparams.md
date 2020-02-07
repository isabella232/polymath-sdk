# Interface: LaunchTieredStoCustomCurrencyPolyParams

## Hierarchy

* [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md)

  ↳ **LaunchTieredStoCustomCurrencyPolyParams**

## Index

### Properties

* [allowPreIssuance](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencypolyparams.md#optional-allowpreissuance)
* [currencies](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencypolyparams.md#currencies)
* [customCurrency](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencypolyparams.md#customcurrency)
* [endDate](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencypolyparams.md#enddate)
* [minimumInvestment](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencypolyparams.md#minimuminvestment)
* [nonAccreditedInvestmentLimit](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencypolyparams.md#nonaccreditedinvestmentlimit)
* [raisedFundsWallet](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencypolyparams.md#raisedfundswallet)
* [stableCoinAddresses](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencypolyparams.md#stablecoinaddresses)
* [startDate](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencypolyparams.md#startdate)
* [tiers](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencypolyparams.md#tiers)
* [unsoldTokensWallet](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencypolyparams.md#unsoldtokenswallet)

## Properties

### `Optional` allowPreIssuance

• **allowPreIssuance**? : *undefined | false | true*

*Inherited from [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[allowPreIssuance](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#optional-allowpreissuance)*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:29](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Issuance/Offerings.ts#L29)*

___

###  currencies

• **currencies**: *[OnlyPoly](../modules/_entities_securitytoken_issuance_offerings_.md#onlypoly) | [PolyAndStableCoin](../modules/_entities_securitytoken_issuance_offerings_.md#polyandstablecoin)*

*Overrides [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[currencies](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#currencies)*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:85](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Issuance/Offerings.ts#L85)*

___

###  customCurrency

• **customCurrency**: *object*

*Overrides [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[customCurrency](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#optional-customcurrency)*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:86](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Issuance/Offerings.ts#L86)*

#### Type declaration:

* **currencySymbol**? : *undefined | string*

* **polyOracleAddress**: *string*

___

###  endDate

• **endDate**: *Date*

*Inherited from [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[endDate](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#enddate)*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:20](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Issuance/Offerings.ts#L20)*

___

###  minimumInvestment

• **minimumInvestment**: *BigNumber*

*Inherited from [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[minimumInvestment](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#minimuminvestment)*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:23](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Issuance/Offerings.ts#L23)*

___

###  nonAccreditedInvestmentLimit

• **nonAccreditedInvestmentLimit**: *BigNumber*

*Inherited from [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[nonAccreditedInvestmentLimit](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#nonaccreditedinvestmentlimit)*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:22](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Issuance/Offerings.ts#L22)*

___

###  raisedFundsWallet

• **raisedFundsWallet**: *string*

*Inherited from [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[raisedFundsWallet](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#raisedfundswallet)*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:25](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Issuance/Offerings.ts#L25)*

___

###  stableCoinAddresses

• **stableCoinAddresses**: *string[]*

*Overrides [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[stableCoinAddresses](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#optional-stablecoinaddresses)*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:90](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Issuance/Offerings.ts#L90)*

___

###  startDate

• **startDate**: *Date*

*Inherited from [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[startDate](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#startdate)*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:19](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Issuance/Offerings.ts#L19)*

___

###  tiers

• **tiers**: *[StoTier](_types_index_.stotier.md)[]*

*Inherited from [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[tiers](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#tiers)*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:21](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Issuance/Offerings.ts#L21)*

___

###  unsoldTokensWallet

• **unsoldTokensWallet**: *string*

*Inherited from [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[unsoldTokensWallet](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#unsoldtokenswallet)*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:26](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/entities/SecurityToken/Issuance/Offerings.ts#L26)*
