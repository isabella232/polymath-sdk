# Interface: LaunchTieredStoParams

## Hierarchy

- **LaunchTieredStoParams**

  ↳ [LaunchTieredStoCustomCurrencyEthParams](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencyethparams.md)

  ↳ [LaunchTieredStoCustomCurrencyPolyParams](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencypolyparams.md)

  ↳ [LaunchTieredStoCustomCurrencyBothParams](_entities_securitytoken_issuance_offerings_.launchtieredstocustomcurrencybothparams.md)

## Index

### Properties

- [allowPreIssuance](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#optional-allowpreissuance)
- [currencies](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#currencies)
- [customCurrency](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#optional-customcurrency)
- [endDate](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#enddate)
- [minimumInvestment](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#minimuminvestment)
- [nonAccreditedInvestmentLimit](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#nonaccreditedinvestmentlimit)
- [raisedFundsWallet](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#raisedfundswallet)
- [stableCoinAddresses](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#optional-stablecoinaddresses)
- [startDate](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#startdate)
- [tiers](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#tiers)
- [unsoldTokensWallet](_entities_securitytoken_issuance_offerings_.launchtieredstoparams.md#unsoldtokenswallet)

## Properties

### `Optional` allowPreIssuance

• **allowPreIssuance**? : _undefined | false | true_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:29](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/entities/SecurityToken/Issuance/Offerings.ts#L29)_

---

### currencies

• **currencies**: _Currency[]_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:24](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/entities/SecurityToken/Issuance/Offerings.ts#L24)_

---

### `Optional` customCurrency

• **customCurrency**? : _Partial‹[CustomCurrency](_types_index_.customcurrency.md)›_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:28](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/entities/SecurityToken/Issuance/Offerings.ts#L28)_

---

### endDate

• **endDate**: _Date_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:20](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/entities/SecurityToken/Issuance/Offerings.ts#L20)_

---

### minimumInvestment

• **minimumInvestment**: _BigNumber_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:23](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/entities/SecurityToken/Issuance/Offerings.ts#L23)_

---

### nonAccreditedInvestmentLimit

• **nonAccreditedInvestmentLimit**: _BigNumber_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:22](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/entities/SecurityToken/Issuance/Offerings.ts#L22)_

---

### raisedFundsWallet

• **raisedFundsWallet**: _string_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:25](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/entities/SecurityToken/Issuance/Offerings.ts#L25)_

---

### `Optional` stableCoinAddresses

• **stableCoinAddresses**? : _string[]_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:27](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/entities/SecurityToken/Issuance/Offerings.ts#L27)_

---

### startDate

• **startDate**: _Date_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:19](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/entities/SecurityToken/Issuance/Offerings.ts#L19)_

---

### tiers

• **tiers**: _[StoTier](_types_index_.stotier.md)[]_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:21](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/entities/SecurityToken/Issuance/Offerings.ts#L21)_

---

### unsoldTokensWallet

• **unsoldTokensWallet**: _string_

_Defined in [src/entities/SecurityToken/Issuance/Offerings.ts:26](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/entities/SecurityToken/Issuance/Offerings.ts#L26)_
