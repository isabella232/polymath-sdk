# Interface: LaunchTieredStoCustomCurrencyPolyParams

## Hierarchy

- [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md)

  ↳ **LaunchTieredStoCustomCurrencyPolyParams**

## Index

### Properties

- [allowPreIssuance](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencypolyparams.md#optional-allowpreissuance)
- [currencies](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencypolyparams.md#currencies)
- [customCurrency](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencypolyparams.md#customcurrency)
- [endDate](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencypolyparams.md#enddate)
- [minimumInvestment](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencypolyparams.md#minimuminvestment)
- [nonAccreditedInvestmentLimit](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencypolyparams.md#nonaccreditedinvestmentlimit)
- [raisedFundsWallet](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencypolyparams.md#raisedfundswallet)
- [stableCoinAddresses](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencypolyparams.md#stablecoinaddresses)
- [startDate](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencypolyparams.md#startdate)
- [tiers](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencypolyparams.md#tiers)
- [unsoldTokensWallet](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencypolyparams.md#unsoldtokenswallet)

## Properties

### `Optional` allowPreIssuance

• **allowPreIssuance**? : _undefined | false | true_

_Inherited from [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[allowPreIssuance](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#optional-allowpreissuance)_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:29](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Issuance/Offerings.ts#L29)_

---

### currencies

• **currencies**: _[OnlyPoly](../modules/_entities_securitytoken_issuance_offerings_.md#onlypoly) | [PolyAndStableCoin](../modules/_entities_securitytoken_issuance_offerings_.md#polyandstablecoin)_

_Overrides [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[currencies](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#currencies)_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:85](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Issuance/Offerings.ts#L85)_

---

### customCurrency

• **customCurrency**: _object_

_Overrides [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[customCurrency](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#optional-customcurrency)_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:86](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Issuance/Offerings.ts#L86)_

#### Type declaration:

- **currencySymbol**? : _undefined | string_

- **polyOracleAddress**: _string_

---

### endDate

• **endDate**: _Date_

_Inherited from [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[endDate](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#enddate)_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:20](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Issuance/Offerings.ts#L20)_

---

### minimumInvestment

• **minimumInvestment**: _BigNumber_

_Inherited from [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[minimumInvestment](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#minimuminvestment)_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:23](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Issuance/Offerings.ts#L23)_

---

### nonAccreditedInvestmentLimit

• **nonAccreditedInvestmentLimit**: _BigNumber_

_Inherited from [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[nonAccreditedInvestmentLimit](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#nonaccreditedinvestmentlimit)_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:22](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Issuance/Offerings.ts#L22)_

---

### raisedFundsWallet

• **raisedFundsWallet**: _string_

_Inherited from [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[raisedFundsWallet](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#raisedfundswallet)_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:25](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Issuance/Offerings.ts#L25)_

---

### stableCoinAddresses

• **stableCoinAddresses**: _string[]_

_Overrides [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[stableCoinAddresses](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#optional-stablecoinaddresses)_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:90](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Issuance/Offerings.ts#L90)_

---

### startDate

• **startDate**: _Date_

_Inherited from [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[startDate](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#startdate)_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:19](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Issuance/Offerings.ts#L19)_

---

### tiers

• **tiers**: _[StoTier](_types_index_.stotier.md)[]_

_Inherited from [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[tiers](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#tiers)_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:21](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Issuance/Offerings.ts#L21)_

---

### unsoldTokensWallet

• **unsoldTokensWallet**: _string_

_Inherited from [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[unsoldTokensWallet](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#unsoldtokenswallet)_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:26](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Issuance/Offerings.ts#L26)_
