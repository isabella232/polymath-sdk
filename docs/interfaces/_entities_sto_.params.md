[@polymathnetwork/sdk - v2.0.1-beta.120](../README.md) › [Globals](../globals.md) › ["entities/Sto"](../modules/_entities_sto_.md) › [Params](_entities_sto_.params.md)

# Interface: Params

STO constructor parameters

## Hierarchy

- **Params**

  ↳ [Params](_entities_simplesto_.params.md)

  ↳ [Params](_entities_tieredsto_.params.md)

## Index

### Properties

- [beneficialInvestmentsAllowed](_entities_sto_.params.md#beneficialinvestmentsallowed)
- [capReached](_entities_sto_.params.md#capreached)
- [endDate](_entities_sto_.params.md#enddate)
- [fundraiseCurrencies](_entities_sto_.params.md#fundraisecurrencies)
- [investorCount](_entities_sto_.params.md#investorcount)
- [isFinalized](_entities_sto_.params.md#isfinalized)
- [isPaused](_entities_sto_.params.md#ispaused)
- [preIssueAllowed](_entities_sto_.params.md#preissueallowed)
- [raisedAmount](_entities_sto_.params.md#raisedamount)
- [raisedFundsWallet](_entities_sto_.params.md#raisedfundswallet)
- [securityTokenSymbol](_entities_sto_.params.md#securitytokensymbol)
- [soldTokensAmount](_entities_sto_.params.md#soldtokensamount)
- [startDate](_entities_sto_.params.md#startdate)
- [unsoldTokensWallet](_entities_sto_.params.md#unsoldtokenswallet)

## Properties

### beneficialInvestmentsAllowed

• **beneficialInvestmentsAllowed**: _boolean_

_Defined in [src/entities/Sto.ts:92](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/Sto.ts#L92)_

whether or not investments can be made on behalf of a beneficiary in the sto

---

### capReached

• **capReached**: _boolean_

_Defined in [src/entities/Sto.ts:80](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/Sto.ts#L80)_

whether or not the cap has been reached for the sto

---

### endDate

• **endDate**: _Date_

_Defined in [src/entities/Sto.ts:48](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/Sto.ts#L48)_

expiry date of the sto

---

### fundraiseCurrencies

• **fundraiseCurrencies**: _Currency[]_

_Defined in [src/entities/Sto.ts:52](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/Sto.ts#L52)_

currencies that can be used to fundraise in this sto

---

### investorCount

• **investorCount**: _number_

_Defined in [src/entities/Sto.ts:72](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/Sto.ts#L72)_

number of investors in the sto

---

### isFinalized

• **isFinalized**: _boolean_

_Defined in [src/entities/Sto.ts:84](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/Sto.ts#L84)_

whether or not the sto has been finalized

---

### isPaused

• **isPaused**: _boolean_

_Defined in [src/entities/Sto.ts:76](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/Sto.ts#L76)_

whether or not the sto is currently paused

---

### preIssueAllowed

• **preIssueAllowed**: _boolean_

_Defined in [src/entities/Sto.ts:88](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/Sto.ts#L88)_

whether or not pre issuance is allowed for the sto

---

### raisedAmount

• **raisedAmount**: _BigNumber_

_Defined in [src/entities/Sto.ts:64](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/Sto.ts#L64)_

funds that have been raised to this date

---

### raisedFundsWallet

• **raisedFundsWallet**: _string_

_Defined in [src/entities/Sto.ts:56](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/Sto.ts#L56)_

wallet address where raised funds will be stored

---

### securityTokenSymbol

• **securityTokenSymbol**: _string_

_Defined in [src/entities/Sto.ts:40](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/Sto.ts#L40)_

symbol of security token

---

### soldTokensAmount

• **soldTokensAmount**: _BigNumber_

_Defined in [src/entities/Sto.ts:68](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/Sto.ts#L68)_

amount of tokens that have been sold

---

### startDate

• **startDate**: _Date_

_Defined in [src/entities/Sto.ts:44](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/Sto.ts#L44)_

start date of the sto

---

### unsoldTokensWallet

• **unsoldTokensWallet**: _string_

_Defined in [src/entities/Sto.ts:60](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/entities/Sto.ts#L60)_

wallet address where unsold tokens will be returned to
