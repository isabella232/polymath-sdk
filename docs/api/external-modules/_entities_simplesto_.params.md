# Params

Properties that uniquely identify a simple sto

## Hierarchy

* [Params](../interfaces/_entities_sto_.params.md)

  ↳ **Params**

## Index

### Properties

* [beneficialInvestmentsAllowed](../interfaces/_entities_simplesto_.params.md#beneficialinvestmentsallowed)
* [cap](../interfaces/_entities_simplesto_.params.md#cap)
* [capReached](../interfaces/_entities_simplesto_.params.md#capreached)
* [endDate](../interfaces/_entities_simplesto_.params.md#enddate)
* [fundraiseCurrencies](../interfaces/_entities_simplesto_.params.md#fundraisecurrencies)
* [investorCount](../interfaces/_entities_simplesto_.params.md#investorcount)
* [isFinalized](../interfaces/_entities_simplesto_.params.md#isfinalized)
* [isPaused](../interfaces/_entities_simplesto_.params.md#ispaused)
* [preIssueAllowed](../interfaces/_entities_simplesto_.params.md#preissueallowed)
* [raisedAmount](../interfaces/_entities_simplesto_.params.md#raisedamount)
* [raisedFundsWallet](../interfaces/_entities_simplesto_.params.md#raisedfundswallet)
* [rate](../interfaces/_entities_simplesto_.params.md#rate)
* [securityTokenSymbol](../interfaces/_entities_simplesto_.params.md#securitytokensymbol)
* [soldTokensAmount](../interfaces/_entities_simplesto_.params.md#soldtokensamount)
* [startDate](../interfaces/_entities_simplesto_.params.md#startdate)
* [unsoldTokensWallet](../interfaces/_entities_simplesto_.params.md#unsoldtokenswallet)

## Properties

### beneficialInvestmentsAllowed

• **beneficialInvestmentsAllowed**: _boolean_

_Inherited from_ [_Params_](../interfaces/_entities_sto_.params.md)_._[_beneficialInvestmentsAllowed_](../interfaces/_entities_sto_.params.md#beneficialinvestmentsallowed)

_Defined in_ [_src/entities/Sto.ts:92_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L92)

whether or not investments can be made on behalf of a beneficiary in the sto

### cap

• **cap**: _BigNumber_

_Defined in_ [_src/entities/SimpleSto.ts:24_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SimpleSto.ts#L24)

cap for how many tokens can be sold

### capReached

• **capReached**: _boolean_

_Inherited from_ [_Params_](../interfaces/_entities_sto_.params.md)_._[_capReached_](../interfaces/_entities_sto_.params.md#capreached)

_Defined in_ [_src/entities/Sto.ts:80_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L80)

whether or not the cap has been reached for the sto

### endDate

• **endDate**: _Date_

_Inherited from_ [_Params_](../interfaces/_entities_sto_.params.md)_._[_endDate_](../interfaces/_entities_sto_.params.md#enddate)

_Defined in_ [_src/entities/Sto.ts:48_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L48)

expiry date of the sto

### fundraiseCurrencies

• **fundraiseCurrencies**: _Currency\[\]_

_Inherited from_ [_Params_](../interfaces/_entities_sto_.params.md)_._[_fundraiseCurrencies_](../interfaces/_entities_sto_.params.md#fundraisecurrencies)

_Defined in_ [_src/entities/Sto.ts:52_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L52)

currencies that can be used to fundraise in this sto

### investorCount

• **investorCount**: _number_

_Inherited from_ [_Params_](../interfaces/_entities_sto_.params.md)_._[_investorCount_](../interfaces/_entities_sto_.params.md#investorcount)

_Defined in_ [_src/entities/Sto.ts:72_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L72)

number of investors in the sto

### isFinalized

• **isFinalized**: _boolean_

_Inherited from_ [_Params_](../interfaces/_entities_sto_.params.md)_._[_isFinalized_](../interfaces/_entities_sto_.params.md#isfinalized)

_Defined in_ [_src/entities/Sto.ts:84_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L84)

whether or not the sto has been finalized

### isPaused

• **isPaused**: _boolean_

_Inherited from_ [_Params_](../interfaces/_entities_sto_.params.md)_._[_isPaused_](../interfaces/_entities_sto_.params.md#ispaused)

_Defined in_ [_src/entities/Sto.ts:76_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L76)

whether or not the sto is currently paused

### preIssueAllowed

• **preIssueAllowed**: _boolean_

_Inherited from_ [_Params_](../interfaces/_entities_sto_.params.md)_._[_preIssueAllowed_](../interfaces/_entities_sto_.params.md#preissueallowed)

_Defined in_ [_src/entities/Sto.ts:88_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L88)

whether or not pre issuance is allowed for the sto

### raisedAmount

• **raisedAmount**: _BigNumber_

_Inherited from_ [_Params_](../interfaces/_entities_sto_.params.md)_._[_raisedAmount_](../interfaces/_entities_sto_.params.md#raisedamount)

_Defined in_ [_src/entities/Sto.ts:64_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L64)

funds that have been raised to this date

### raisedFundsWallet

• **raisedFundsWallet**: _string_

_Inherited from_ [_Params_](../interfaces/_entities_sto_.params.md)_._[_raisedFundsWallet_](../interfaces/_entities_sto_.params.md#raisedfundswallet)

_Defined in_ [_src/entities/Sto.ts:56_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L56)

wallet address where raised funds will be stored

### rate

• **rate**: _BigNumber_

_Defined in_ [_src/entities/SimpleSto.ts:28_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SimpleSto.ts#L28)

rate at which tokens will be sold

### securityTokenSymbol

• **securityTokenSymbol**: _string_

_Inherited from_ [_Params_](../interfaces/_entities_sto_.params.md)_._[_securityTokenSymbol_](../interfaces/_entities_sto_.params.md#securitytokensymbol)

_Defined in_ [_src/entities/Sto.ts:40_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L40)

symbol of security token

### soldTokensAmount

• **soldTokensAmount**: _BigNumber_

_Inherited from_ [_Params_](../interfaces/_entities_sto_.params.md)_._[_soldTokensAmount_](../interfaces/_entities_sto_.params.md#soldtokensamount)

_Defined in_ [_src/entities/Sto.ts:68_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L68)

amount of tokens that have been sold

### startDate

• **startDate**: _Date_

_Inherited from_ [_Params_](../interfaces/_entities_sto_.params.md)_._[_startDate_](../interfaces/_entities_sto_.params.md#startdate)

_Defined in_ [_src/entities/Sto.ts:44_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L44)

start date of the sto

### unsoldTokensWallet

• **unsoldTokensWallet**: _string_

_Inherited from_ [_Params_](../interfaces/_entities_sto_.params.md)_._[_unsoldTokensWallet_](../interfaces/_entities_sto_.params.md#unsoldtokenswallet)

_Defined in_ [_src/entities/Sto.ts:60_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L60)

wallet address where unsold tokens will be returned to

