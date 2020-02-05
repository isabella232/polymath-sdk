# Interface: LaunchTieredStoParams

## Hierarchy

* **LaunchTieredStoParams**

  ↳ [LaunchTieredStoCustomCurrencyEthParams](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencyethparams.md)

  ↳ [LaunchTieredStoCustomCurrencyPolyParams](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencypolyparams.md)

  ↳ [LaunchTieredStoCustomCurrencyBothParams](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencybothparams.md)

## Index

### Properties

* [allowPreIssuance](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#optional-allowpreissuance)
* [currencies](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#currencies)
* [customCurrency](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#optional-customcurrency)
* [endDate](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#enddate)
* [minimumInvestment](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#minimuminvestment)
* [nonAccreditedInvestmentLimit](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#nonaccreditedinvestmentlimit)
* [raisedFundsWallet](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#raisedfundswallet)
* [stableCoinAddresses](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#optional-stablecoinaddresses)
* [startDate](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#startdate)
* [tiers](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#tiers)
* [unsoldTokensWallet](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#unsoldtokenswallet)

## Properties

### `Optional` allowPreIssuance

• **allowPreIssuance**? : *undefined | false | true*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:29](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/SecurityToken/Issuance/Offerings.ts#L29)*

___

###  currencies

• **currencies**: *Currency[]*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:24](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/SecurityToken/Issuance/Offerings.ts#L24)*

___

### `Optional` customCurrency

• **customCurrency**? : *Partial‹[CustomCurrency](_types_index_.customcurrency.md)›*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:28](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/SecurityToken/Issuance/Offerings.ts#L28)*

___

###  endDate

• **endDate**: *Date*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:20](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/SecurityToken/Issuance/Offerings.ts#L20)*

___

###  minimumInvestment

• **minimumInvestment**: *BigNumber*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:23](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/SecurityToken/Issuance/Offerings.ts#L23)*

___

###  nonAccreditedInvestmentLimit

• **nonAccreditedInvestmentLimit**: *BigNumber*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:22](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/SecurityToken/Issuance/Offerings.ts#L22)*

___

###  raisedFundsWallet

• **raisedFundsWallet**: *string*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:25](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/SecurityToken/Issuance/Offerings.ts#L25)*

___

### `Optional` stableCoinAddresses

• **stableCoinAddresses**? : *string[]*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:27](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/SecurityToken/Issuance/Offerings.ts#L27)*

___

###  startDate

• **startDate**: *Date*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:19](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/SecurityToken/Issuance/Offerings.ts#L19)*

___

###  tiers

• **tiers**: *[StoTier](_types_index_.stotier.md)[]*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:21](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/SecurityToken/Issuance/Offerings.ts#L21)*

___

###  unsoldTokensWallet

• **unsoldTokensWallet**: *string*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:26](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/SecurityToken/Issuance/Offerings.ts#L26)*
