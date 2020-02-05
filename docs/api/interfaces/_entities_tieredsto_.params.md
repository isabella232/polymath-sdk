# Interface: Params

Represents a Tiered STO

## Hierarchy

- [Params](_entities_sto_.params.md)

  ↳ **Params**

## Index

### Properties

- [beneficialInvestmentsAllowed](_entities_tieredsto_.params.md#beneficialinvestmentsallowed)
- [capReached](_entities_tieredsto_.params.md#capreached)
- [currentTier](_entities_tieredsto_.params.md#currenttier)
- [endDate](_entities_tieredsto_.params.md#enddate)
- [fundraiseCurrencies](_entities_tieredsto_.params.md#fundraisecurrencies)
- [investorCount](_entities_tieredsto_.params.md#investorcount)
- [isFinalized](_entities_tieredsto_.params.md#isfinalized)
- [isPaused](_entities_tieredsto_.params.md#ispaused)
- [minimumInvestment](_entities_tieredsto_.params.md#minimuminvestment)
- [nonAccreditedInvestmentLimit](_entities_tieredsto_.params.md#nonaccreditedinvestmentlimit)
- [preIssueAllowed](_entities_tieredsto_.params.md#preissueallowed)
- [raisedAmount](_entities_tieredsto_.params.md#raisedamount)
- [raisedFundsWallet](_entities_tieredsto_.params.md#raisedfundswallet)
- [securityTokenSymbol](_entities_tieredsto_.params.md#securitytokensymbol)
- [soldTokensAmount](_entities_tieredsto_.params.md#soldtokensamount)
- [stableCoinAddresses](_entities_tieredsto_.params.md#stablecoinaddresses)
- [startDate](_entities_tieredsto_.params.md#startdate)
- [tiers](_entities_tieredsto_.params.md#tiers)
- [unsoldTokensWallet](_entities_tieredsto_.params.md#unsoldtokenswallet)

## Properties

### beneficialInvestmentsAllowed

• **beneficialInvestmentsAllowed**: _boolean_

_Inherited from [Params](_entities_sto_.params.md).[beneficialInvestmentsAllowed](_entities_sto_.params.md#beneficialinvestmentsallowed)_

_Defined in [src/entities/Sto.ts:92](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L92)_

whether or not investments can be made on behalf of a beneficiary in the sto

---

### capReached

• **capReached**: _boolean_

_Inherited from [Params](_entities_sto_.params.md).[capReached](_entities_sto_.params.md#capreached)_

_Defined in [src/entities/Sto.ts:80](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L80)_

whether or not the cap has been reached for the sto

---

### currentTier

• **currentTier**: _number_

_Defined in [src/entities/TieredSto.ts:57](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/TieredSto.ts#L57)_

numerical identifier for the current tier index

---

### endDate

• **endDate**: _Date_

_Inherited from [Params](_entities_sto_.params.md).[endDate](_entities_sto_.params.md#enddate)_

_Defined in [src/entities/Sto.ts:48](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L48)_

expiry date of the sto

---

### fundraiseCurrencies

• **fundraiseCurrencies**: _Currency[]_

_Inherited from [Params](_entities_sto_.params.md).[fundraiseCurrencies](_entities_sto_.params.md#fundraisecurrencies)_

_Defined in [src/entities/Sto.ts:52](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L52)_

currencies that can be used to fundraise in this sto

---

### investorCount

• **investorCount**: _number_

_Inherited from [Params](_entities_sto_.params.md).[investorCount](_entities_sto_.params.md#investorcount)_

_Defined in [src/entities/Sto.ts:72](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L72)_

number of investors in the sto

---

### isFinalized

• **isFinalized**: _boolean_

_Inherited from [Params](_entities_sto_.params.md).[isFinalized](_entities_sto_.params.md#isfinalized)_

_Defined in [src/entities/Sto.ts:84](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L84)_

whether or not the sto has been finalized

---

### isPaused

• **isPaused**: _boolean_

_Inherited from [Params](_entities_sto_.params.md).[isPaused](_entities_sto_.params.md#ispaused)_

_Defined in [src/entities/Sto.ts:76](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L76)_

whether or not the sto is currently paused

---

### minimumInvestment

• **minimumInvestment**: _BigNumber_

_Defined in [src/entities/TieredSto.ts:63](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/TieredSto.ts#L63)_

---

### nonAccreditedInvestmentLimit

• **nonAccreditedInvestmentLimit**: _BigNumber_

_Defined in [src/entities/TieredSto.ts:62](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/TieredSto.ts#L62)_

---

### preIssueAllowed

• **preIssueAllowed**: _boolean_

_Inherited from [Params](_entities_sto_.params.md).[preIssueAllowed](_entities_sto_.params.md#preissueallowed)_

_Defined in [src/entities/Sto.ts:88](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L88)_

whether or not pre issuance is allowed for the sto

---

### raisedAmount

• **raisedAmount**: _BigNumber_

_Inherited from [Params](_entities_sto_.params.md).[raisedAmount](_entities_sto_.params.md#raisedamount)_

_Defined in [src/entities/Sto.ts:64](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L64)_

funds that have been raised to this date

---

### raisedFundsWallet

• **raisedFundsWallet**: _string_

_Inherited from [Params](_entities_sto_.params.md).[raisedFundsWallet](_entities_sto_.params.md#raisedfundswallet)_

_Defined in [src/entities/Sto.ts:56](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L56)_

wallet address where raised funds will be stored

---

### securityTokenSymbol

• **securityTokenSymbol**: _string_

_Inherited from [Params](_entities_sto_.params.md).[securityTokenSymbol](_entities_sto_.params.md#securitytokensymbol)_

_Defined in [src/entities/Sto.ts:40](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L40)_

symbol of security token

---

### soldTokensAmount

• **soldTokensAmount**: _BigNumber_

_Inherited from [Params](_entities_sto_.params.md).[soldTokensAmount](_entities_sto_.params.md#soldtokensamount)_

_Defined in [src/entities/Sto.ts:68](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L68)_

amount of tokens that have been sold

---

### stableCoinAddresses

• **stableCoinAddresses**: _string[]_

_Defined in [src/entities/TieredSto.ts:64](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/TieredSto.ts#L64)_

---

### startDate

• **startDate**: _Date_

_Inherited from [Params](_entities_sto_.params.md).[startDate](_entities_sto_.params.md#startdate)_

_Defined in [src/entities/Sto.ts:44](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L44)_

start date of the sto

---

### tiers

• **tiers**: _[Tier](_entities_tieredsto_.tier.md)[]_

_Defined in [src/entities/TieredSto.ts:61](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/TieredSto.ts#L61)_

array of tier information

---

### unsoldTokensWallet

• **unsoldTokensWallet**: _string_

_Inherited from [Params](_entities_sto_.params.md).[unsoldTokensWallet](_entities_sto_.params.md#unsoldtokenswallet)_

_Defined in [src/entities/Sto.ts:60](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/entities/Sto.ts#L60)_

wallet address where unsold tokens will be returned to
