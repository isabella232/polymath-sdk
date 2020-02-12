# Interface: LaunchTieredStoParams

## Hierarchy

* **LaunchTieredStoParams**

  ↳ [LaunchTieredStoCustomCurrencyEthParams](entities.securitytoken.issuance.launchtieredstocustomcurrencyethparams.md)

  ↳ [LaunchTieredStoCustomCurrencyPolyParams](entities.securitytoken.issuance.launchtieredstocustomcurrencypolyparams.md)

  ↳ [LaunchTieredStoCustomCurrencyBothParams](entities.securitytoken.issuance.launchtieredstocustomcurrencybothparams.md)

## Index

### Properties

* [allowPreIssuance](entities.securitytoken.issuance.launchtieredstoparams.md#optional-allowpreissuance)
* [currencies](entities.securitytoken.issuance.launchtieredstoparams.md#currencies)
* [customCurrency](entities.securitytoken.issuance.launchtieredstoparams.md#optional-customcurrency)
* [endDate](entities.securitytoken.issuance.launchtieredstoparams.md#enddate)
* [minimumInvestment](entities.securitytoken.issuance.launchtieredstoparams.md#minimuminvestment)
* [nonAccreditedInvestmentLimit](entities.securitytoken.issuance.launchtieredstoparams.md#nonaccreditedinvestmentlimit)
* [raisedFundsWallet](entities.securitytoken.issuance.launchtieredstoparams.md#raisedfundswallet)
* [stableCoinAddresses](entities.securitytoken.issuance.launchtieredstoparams.md#optional-stablecoinaddresses)
* [startDate](entities.securitytoken.issuance.launchtieredstoparams.md#startdate)
* [tiers](entities.securitytoken.issuance.launchtieredstoparams.md#tiers)
* [unsoldTokensWallet](entities.securitytoken.issuance.launchtieredstoparams.md#unsoldtokenswallet)

## Properties

### `Optional` allowPreIssuance

• **allowPreIssuance**? : *undefined | false | true*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:34](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/Issuance/Offerings.ts#L34)*

___

###  currencies

• **currencies**: *Currency[]*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:29](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/Issuance/Offerings.ts#L29)*

___

### `Optional` customCurrency

• **customCurrency**? : *Partial‹[CustomCurrency](_types_index_.customcurrency.md)›*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:33](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/Issuance/Offerings.ts#L33)*

___

###  endDate

• **endDate**: *Date*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:25](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/Issuance/Offerings.ts#L25)*

___

###  minimumInvestment

• **minimumInvestment**: *BigNumber*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:28](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/Issuance/Offerings.ts#L28)*

___

###  nonAccreditedInvestmentLimit

• **nonAccreditedInvestmentLimit**: *BigNumber*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:27](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/Issuance/Offerings.ts#L27)*

___

###  raisedFundsWallet

• **raisedFundsWallet**: *string*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:30](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/Issuance/Offerings.ts#L30)*

___

### `Optional` stableCoinAddresses

• **stableCoinAddresses**? : *string[]*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:32](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/Issuance/Offerings.ts#L32)*

___

###  startDate

• **startDate**: *Date*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:24](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/Issuance/Offerings.ts#L24)*

___

###  tiers

• **tiers**: *[StoTier](_types_index_.stotier.md)[]*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:26](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/Issuance/Offerings.ts#L26)*

___

###  unsoldTokensWallet

• **unsoldTokensWallet**: *string*

*Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:31](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/Issuance/Offerings.ts#L31)*
