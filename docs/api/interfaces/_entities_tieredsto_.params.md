# Params

Represents a Tiered STO

## Hierarchy

* [Params](_entities_sto_.params.md)

  ↳ **Params**

## Index

### Properties

* [beneficialInvestmentsAllowed](_entities_tieredsto_.params.md#beneficialinvestmentsallowed)
* [capReached](_entities_tieredsto_.params.md#capreached)
* [currentTier](_entities_tieredsto_.params.md#currenttier)
* [endDate](_entities_tieredsto_.params.md#enddate)
* [fundraiseCurrencies](_entities_tieredsto_.params.md#fundraisecurrencies)
* [investorCount](_entities_tieredsto_.params.md#investorcount)
* [isFinalized](_entities_tieredsto_.params.md#isfinalized)
* [isPaused](_entities_tieredsto_.params.md#ispaused)
* [minimumInvestment](_entities_tieredsto_.params.md#minimuminvestment)
* [nonAccreditedInvestmentLimit](_entities_tieredsto_.params.md#nonaccreditedinvestmentlimit)
* [preIssueAllowed](_entities_tieredsto_.params.md#preissueallowed)
* [raisedAmount](_entities_tieredsto_.params.md#raisedamount)
* [raisedFundsWallet](_entities_tieredsto_.params.md#raisedfundswallet)
* [securityTokenSymbol](_entities_tieredsto_.params.md#securitytokensymbol)
* [soldTokensAmount](_entities_tieredsto_.params.md#soldtokensamount)
* [stableCoinAddresses](_entities_tieredsto_.params.md#stablecoinaddresses)
* [startDate](_entities_tieredsto_.params.md#startdate)
* [tiers](_entities_tieredsto_.params.md#tiers)
* [unsoldTokensWallet](_entities_tieredsto_.params.md#unsoldtokenswallet)

## Properties

### beneficialInvestmentsAllowed

• **beneficialInvestmentsAllowed**: _boolean_

_Inherited from_ [_Params_](_entities_sto_.params.md)_._[_beneficialInvestmentsAllowed_](_entities_sto_.params.md#beneficialinvestmentsallowed)

_Defined in_ [_src/entities/Sto.ts:92_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L92)

whether or not investments can be made on behalf of a beneficiary in the sto

### capReached

• **capReached**: _boolean_

_Inherited from_ [_Params_](_entities_sto_.params.md)_._[_capReached_](_entities_sto_.params.md#capreached)

_Defined in_ [_src/entities/Sto.ts:80_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L80)

whether or not the cap has been reached for the sto

### currentTier

• **currentTier**: _number_

_Defined in_ [_src/entities/TieredSto.ts:57_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TieredSto.ts#L57)

numerical identifier for the current tier index

### endDate

• **endDate**: _Date_

_Inherited from_ [_Params_](_entities_sto_.params.md)_._[_endDate_](_entities_sto_.params.md#enddate)

_Defined in_ [_src/entities/Sto.ts:48_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L48)

expiry date of the sto

### fundraiseCurrencies

• **fundraiseCurrencies**: _Currency\[\]_

_Inherited from_ [_Params_](_entities_sto_.params.md)_._[_fundraiseCurrencies_](_entities_sto_.params.md#fundraisecurrencies)

_Defined in_ [_src/entities/Sto.ts:52_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L52)

currencies that can be used to fundraise in this sto

### investorCount

• **investorCount**: _number_

_Inherited from_ [_Params_](_entities_sto_.params.md)_._[_investorCount_](_entities_sto_.params.md#investorcount)

_Defined in_ [_src/entities/Sto.ts:72_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L72)

number of investors in the sto

### isFinalized

• **isFinalized**: _boolean_

_Inherited from_ [_Params_](_entities_sto_.params.md)_._[_isFinalized_](_entities_sto_.params.md#isfinalized)

_Defined in_ [_src/entities/Sto.ts:84_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L84)

whether or not the sto has been finalized

### isPaused

• **isPaused**: _boolean_

_Inherited from_ [_Params_](_entities_sto_.params.md)_._[_isPaused_](_entities_sto_.params.md#ispaused)

_Defined in_ [_src/entities/Sto.ts:76_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L76)

whether or not the sto is currently paused

### minimumInvestment

• **minimumInvestment**: _BigNumber_

_Defined in_ [_src/entities/TieredSto.ts:63_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TieredSto.ts#L63)

### nonAccreditedInvestmentLimit

• **nonAccreditedInvestmentLimit**: _BigNumber_

_Defined in_ [_src/entities/TieredSto.ts:62_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TieredSto.ts#L62)

### preIssueAllowed

• **preIssueAllowed**: _boolean_

_Inherited from_ [_Params_](_entities_sto_.params.md)_._[_preIssueAllowed_](_entities_sto_.params.md#preissueallowed)

_Defined in_ [_src/entities/Sto.ts:88_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L88)

whether or not pre issuance is allowed for the sto

### raisedAmount

• **raisedAmount**: _BigNumber_

_Inherited from_ [_Params_](_entities_sto_.params.md)_._[_raisedAmount_](_entities_sto_.params.md#raisedamount)

_Defined in_ [_src/entities/Sto.ts:64_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L64)

funds that have been raised to this date

### raisedFundsWallet

• **raisedFundsWallet**: _string_

_Inherited from_ [_Params_](_entities_sto_.params.md)_._[_raisedFundsWallet_](_entities_sto_.params.md#raisedfundswallet)

_Defined in_ [_src/entities/Sto.ts:56_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L56)

wallet address where raised funds will be stored

### securityTokenSymbol

• **securityTokenSymbol**: _string_

_Inherited from_ [_Params_](_entities_sto_.params.md)_._[_securityTokenSymbol_](_entities_sto_.params.md#securitytokensymbol)

_Defined in_ [_src/entities/Sto.ts:40_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L40)

symbol of security token

### soldTokensAmount

• **soldTokensAmount**: _BigNumber_

_Inherited from_ [_Params_](_entities_sto_.params.md)_._[_soldTokensAmount_](_entities_sto_.params.md#soldtokensamount)

_Defined in_ [_src/entities/Sto.ts:68_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L68)

amount of tokens that have been sold

### stableCoinAddresses

• **stableCoinAddresses**: _string\[\]_

_Defined in_ [_src/entities/TieredSto.ts:64_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TieredSto.ts#L64)

### startDate

• **startDate**: _Date_

_Inherited from_ [_Params_](_entities_sto_.params.md)_._[_startDate_](_entities_sto_.params.md#startdate)

_Defined in_ [_src/entities/Sto.ts:44_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L44)

start date of the sto

### tiers

• **tiers**: [_Tier_](_entities_tieredsto_.tier.md)_\[\]_

_Defined in_ [_src/entities/TieredSto.ts:61_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/TieredSto.ts#L61)

array of tier information

### unsoldTokensWallet

• **unsoldTokensWallet**: _string_

_Inherited from_ [_Params_](_entities_sto_.params.md)_._[_unsoldTokensWallet_](_entities_sto_.params.md#unsoldtokenswallet)

_Defined in_ [_src/entities/Sto.ts:60_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/Sto.ts#L60)

wallet address where unsold tokens will be returned to

