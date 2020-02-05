# Interface: Params

Properties that uniquely identify a simple sto

## Hierarchy

- [Params](_entities_sto_.params.md)

  ↳ **Params**

## Index

### Properties

- [beneficialInvestmentsAllowed](_entities_simplesto_.params.md#beneficialinvestmentsallowed)
- [cap](_entities_simplesto_.params.md#cap)
- [capReached](_entities_simplesto_.params.md#capreached)
- [endDate](_entities_simplesto_.params.md#enddate)
- [fundraiseCurrencies](_entities_simplesto_.params.md#fundraisecurrencies)
- [investorCount](_entities_simplesto_.params.md#investorcount)
- [isFinalized](_entities_simplesto_.params.md#isfinalized)
- [isPaused](_entities_simplesto_.params.md#ispaused)
- [preIssueAllowed](_entities_simplesto_.params.md#preissueallowed)
- [raisedAmount](_entities_simplesto_.params.md#raisedamount)
- [raisedFundsWallet](_entities_simplesto_.params.md#raisedfundswallet)
- [rate](_entities_simplesto_.params.md#rate)
- [securityTokenSymbol](_entities_simplesto_.params.md#securitytokensymbol)
- [soldTokensAmount](_entities_simplesto_.params.md#soldtokensamount)
- [startDate](_entities_simplesto_.params.md#startdate)
- [unsoldTokensWallet](_entities_simplesto_.params.md#unsoldtokenswallet)

## Properties

### beneficialInvestmentsAllowed

• **beneficialInvestmentsAllowed**: _boolean_

_Inherited from [Params](_entities_sto_.params.md).[beneficialInvestmentsAllowed](_entities_sto_.params.md#beneficialinvestmentsallowed)_

_Defined in [src/entities/Sto.ts:92](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Sto.ts#L92)_

whether or not investments can be made on behalf of a beneficiary in the sto

---

### cap

• **cap**: _BigNumber_

_Defined in [src/entities/SimpleSto.ts:24](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/SimpleSto.ts#L24)_

cap for how many tokens can be sold

---

### capReached

• **capReached**: _boolean_

_Inherited from [Params](_entities_sto_.params.md).[capReached](_entities_sto_.params.md#capreached)_

_Defined in [src/entities/Sto.ts:80](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Sto.ts#L80)_

whether or not the cap has been reached for the sto

---

### endDate

• **endDate**: _Date_

_Inherited from [Params](_entities_sto_.params.md).[endDate](_entities_sto_.params.md#enddate)_

_Defined in [src/entities/Sto.ts:48](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Sto.ts#L48)_

expiry date of the sto

---

### fundraiseCurrencies

• **fundraiseCurrencies**: _Currency[]_

_Inherited from [Params](_entities_sto_.params.md).[fundraiseCurrencies](_entities_sto_.params.md#fundraisecurrencies)_

_Defined in [src/entities/Sto.ts:52](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Sto.ts#L52)_

currencies that can be used to fundraise in this sto

---

### investorCount

• **investorCount**: _number_

_Inherited from [Params](_entities_sto_.params.md).[investorCount](_entities_sto_.params.md#investorcount)_

_Defined in [src/entities/Sto.ts:72](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Sto.ts#L72)_

number of investors in the sto

---

### isFinalized

• **isFinalized**: _boolean_

_Inherited from [Params](_entities_sto_.params.md).[isFinalized](_entities_sto_.params.md#isfinalized)_

_Defined in [src/entities/Sto.ts:84](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Sto.ts#L84)_

whether or not the sto has been finalized

---

### isPaused

• **isPaused**: _boolean_

_Inherited from [Params](_entities_sto_.params.md).[isPaused](_entities_sto_.params.md#ispaused)_

_Defined in [src/entities/Sto.ts:76](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Sto.ts#L76)_

whether or not the sto is currently paused

---

### preIssueAllowed

• **preIssueAllowed**: _boolean_

_Inherited from [Params](_entities_sto_.params.md).[preIssueAllowed](_entities_sto_.params.md#preissueallowed)_

_Defined in [src/entities/Sto.ts:88](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Sto.ts#L88)_

whether or not pre issuance is allowed for the sto

---

### raisedAmount

• **raisedAmount**: _BigNumber_

_Inherited from [Params](_entities_sto_.params.md).[raisedAmount](_entities_sto_.params.md#raisedamount)_

_Defined in [src/entities/Sto.ts:64](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Sto.ts#L64)_

funds that have been raised to this date

---

### raisedFundsWallet

• **raisedFundsWallet**: _string_

_Inherited from [Params](_entities_sto_.params.md).[raisedFundsWallet](_entities_sto_.params.md#raisedfundswallet)_

_Defined in [src/entities/Sto.ts:56](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Sto.ts#L56)_

wallet address where raised funds will be stored

---

### rate

• **rate**: _BigNumber_

_Defined in [src/entities/SimpleSto.ts:28](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/SimpleSto.ts#L28)_

rate at which tokens will be sold

---

### securityTokenSymbol

• **securityTokenSymbol**: _string_

_Inherited from [Params](_entities_sto_.params.md).[securityTokenSymbol](_entities_sto_.params.md#securitytokensymbol)_

_Defined in [src/entities/Sto.ts:40](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Sto.ts#L40)_

symbol of security token

---

### soldTokensAmount

• **soldTokensAmount**: _BigNumber_

_Inherited from [Params](_entities_sto_.params.md).[soldTokensAmount](_entities_sto_.params.md#soldtokensamount)_

_Defined in [src/entities/Sto.ts:68](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Sto.ts#L68)_

amount of tokens that have been sold

---

### startDate

• **startDate**: _Date_

_Inherited from [Params](_entities_sto_.params.md).[startDate](_entities_sto_.params.md#startdate)_

_Defined in [src/entities/Sto.ts:44](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Sto.ts#L44)_

start date of the sto

---

### unsoldTokensWallet

• **unsoldTokensWallet**: _string_

_Inherited from [Params](_entities_sto_.params.md).[unsoldTokensWallet](_entities_sto_.params.md#unsoldtokenswallet)_

_Defined in [src/entities/Sto.ts:60](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/Sto.ts#L60)_

wallet address where unsold tokens will be returned to
