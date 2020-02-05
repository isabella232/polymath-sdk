# Interface: LaunchTieredStoCustomCurrencyBothParams

## Hierarchy

- [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md)

  ↳ **LaunchTieredStoCustomCurrencyBothParams**

## Index

### Properties

- [allowPreIssuance](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencybothparams.md#optional-allowpreissuance)
- [currencies](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencybothparams.md#currencies)
- [customCurrency](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencybothparams.md#customcurrency)
- [endDate](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencybothparams.md#enddate)
- [minimumInvestment](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencybothparams.md#minimuminvestment)
- [nonAccreditedInvestmentLimit](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencybothparams.md#nonaccreditedinvestmentlimit)
- [raisedFundsWallet](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencybothparams.md#raisedfundswallet)
- [stableCoinAddresses](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencybothparams.md#stablecoinaddresses)
- [startDate](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencybothparams.md#startdate)
- [tiers](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencybothparams.md#tiers)
- [unsoldTokensWallet](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencybothparams.md#unsoldtokenswallet)

## Properties

### `Optional` allowPreIssuance

• **allowPreIssuance**? : _undefined | false | true_

_Inherited from [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[allowPreIssuance](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#optional-allowpreissuance)_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:29](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityToken/Issuance/Offerings.ts#L29)_

---

### currencies

• **currencies**: _[AllCurrencies](../modules/_entities_securitytoken_issuance_offerings_.md#allcurrencies)_

_Overrides [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[currencies](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#currencies)_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:103](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityToken/Issuance/Offerings.ts#L103)_

---

### customCurrency

• **customCurrency**: _object_

_Overrides [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[customCurrency](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#optional-customcurrency)_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:104](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityToken/Issuance/Offerings.ts#L104)_

#### Type declaration:

- **currencySymbol**? : _undefined | string_

- **ethOracleAddress**: _string_

- **polyOracleAddress**: _string_

---

### endDate

• **endDate**: _Date_

_Inherited from [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[endDate](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#enddate)_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:20](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityToken/Issuance/Offerings.ts#L20)_

---

### minimumInvestment

• **minimumInvestment**: _BigNumber_

_Inherited from [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[minimumInvestment](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#minimuminvestment)_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:23](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityToken/Issuance/Offerings.ts#L23)_

---

### nonAccreditedInvestmentLimit

• **nonAccreditedInvestmentLimit**: _BigNumber_

_Inherited from [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[nonAccreditedInvestmentLimit](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#nonaccreditedinvestmentlimit)_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:22](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityToken/Issuance/Offerings.ts#L22)_

---

### raisedFundsWallet

• **raisedFundsWallet**: _string_

_Inherited from [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[raisedFundsWallet](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#raisedfundswallet)_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:25](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityToken/Issuance/Offerings.ts#L25)_

---

### stableCoinAddresses

• **stableCoinAddresses**: _string[]_

_Overrides [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[stableCoinAddresses](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#optional-stablecoinaddresses)_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:109](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityToken/Issuance/Offerings.ts#L109)_

---

### startDate

• **startDate**: _Date_

_Inherited from [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[startDate](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#startdate)_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:19](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityToken/Issuance/Offerings.ts#L19)_

---

### tiers

• **tiers**: _[StoTier](_types_index_.stotier.md)[]_

_Inherited from [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[tiers](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#tiers)_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:21](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityToken/Issuance/Offerings.ts#L21)_

---

### unsoldTokensWallet

• **unsoldTokensWallet**: _string_

_Inherited from [LaunchTieredStoParams](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md).[unsoldTokensWallet](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#unsoldtokenswallet)_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:26](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityToken/Issuance/Offerings.ts#L26)_
