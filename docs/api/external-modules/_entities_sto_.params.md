# Params

STO constructor parameters

## Hierarchy

* **Params**

  ↳ [Params](../interfaces/_entities_simplesto_.params.md)

  ↳ [Params](../interfaces/_entities_tieredsto_.params.md)

## Index

### Properties

* [beneficialInvestmentsAllowed](../interfaces/_entities_sto_.params.md#beneficialinvestmentsallowed)
* [capReached](../interfaces/_entities_sto_.params.md#capreached)
* [endDate](../interfaces/_entities_sto_.params.md#enddate)
* [fundraiseCurrencies](../interfaces/_entities_sto_.params.md#fundraisecurrencies)
* [investorCount](../interfaces/_entities_sto_.params.md#investorcount)
* [isFinalized](../interfaces/_entities_sto_.params.md#isfinalized)
* [isPaused](../interfaces/_entities_sto_.params.md#ispaused)
* [preIssueAllowed](../interfaces/_entities_sto_.params.md#preissueallowed)
* [raisedAmount](../interfaces/_entities_sto_.params.md#raisedamount)
* [raisedFundsWallet](../interfaces/_entities_sto_.params.md#raisedfundswallet)
* [securityTokenSymbol](../interfaces/_entities_sto_.params.md#securitytokensymbol)
* [soldTokensAmount](../interfaces/_entities_sto_.params.md#soldtokensamount)
* [startDate](../interfaces/_entities_sto_.params.md#startdate)
* [unsoldTokensWallet](../interfaces/_entities_sto_.params.md#unsoldtokenswallet)

## Properties

### beneficialInvestmentsAllowed

• **beneficialInvestmentsAllowed**: _boolean_

_Defined in_ [_src/entities/Sto.ts:92_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L92)

whether or not investments can be made on behalf of a beneficiary in the sto

### capReached

• **capReached**: _boolean_

_Defined in_ [_src/entities/Sto.ts:80_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L80)

whether or not the cap has been reached for the sto

### endDate

• **endDate**: _Date_

_Defined in_ [_src/entities/Sto.ts:48_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L48)

expiry date of the sto

### fundraiseCurrencies

• **fundraiseCurrencies**: _Currency\[\]_

_Defined in_ [_src/entities/Sto.ts:52_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L52)

currencies that can be used to fundraise in this sto

### investorCount

• **investorCount**: _number_

_Defined in_ [_src/entities/Sto.ts:72_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L72)

number of investors in the sto

### isFinalized

• **isFinalized**: _boolean_

_Defined in_ [_src/entities/Sto.ts:84_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L84)

whether or not the sto has been finalized

### isPaused

• **isPaused**: _boolean_

_Defined in_ [_src/entities/Sto.ts:76_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L76)

whether or not the sto is currently paused

### preIssueAllowed

• **preIssueAllowed**: _boolean_

_Defined in_ [_src/entities/Sto.ts:88_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L88)

whether or not pre issuance is allowed for the sto

### raisedAmount

• **raisedAmount**: _BigNumber_

_Defined in_ [_src/entities/Sto.ts:64_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L64)

funds that have been raised to this date

### raisedFundsWallet

• **raisedFundsWallet**: _string_

_Defined in_ [_src/entities/Sto.ts:56_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L56)

wallet address where raised funds will be stored

### securityTokenSymbol

• **securityTokenSymbol**: _string_

_Defined in_ [_src/entities/Sto.ts:40_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L40)

symbol of security token

### soldTokensAmount

• **soldTokensAmount**: _BigNumber_

_Defined in_ [_src/entities/Sto.ts:68_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L68)

amount of tokens that have been sold

### startDate

• **startDate**: _Date_

_Defined in_ [_src/entities/Sto.ts:44_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L44)

start date of the sto

### unsoldTokensWallet

• **unsoldTokensWallet**: _string_

_Defined in_ [_src/entities/Sto.ts:60_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L60)

wallet address where unsold tokens will be returned to

