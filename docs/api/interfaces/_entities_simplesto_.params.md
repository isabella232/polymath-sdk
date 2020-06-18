# Interface: Params

Properties that uniquely identify a simple sto

## Hierarchy

* [Params](_entities_sto_.params.md)

  ↳ **Params**

## Index

### Properties

* [beneficialInvestmentsAllowed](_entities_simplesto_.params.md#beneficialinvestmentsallowed)
* [cap](_entities_simplesto_.params.md#cap)
* [capReached](_entities_simplesto_.params.md#capreached)
* [endDate](_entities_simplesto_.params.md#enddate)
* [fundraiseCurrencies](_entities_simplesto_.params.md#fundraisecurrencies)
* [investorCount](_entities_simplesto_.params.md#investorcount)
* [isFinalized](_entities_simplesto_.params.md#isfinalized)
* [isPaused](_entities_simplesto_.params.md#ispaused)
* [preIssueAllowed](_entities_simplesto_.params.md#preissueallowed)
* [raisedAmount](_entities_simplesto_.params.md#raisedamount)
* [raisedFundsWallet](_entities_simplesto_.params.md#raisedfundswallet)
* [rate](_entities_simplesto_.params.md#rate)
* [securityTokenSymbol](_entities_simplesto_.params.md#securitytokensymbol)
* [soldTokensAmount](_entities_simplesto_.params.md#soldtokensamount)
* [startDate](_entities_simplesto_.params.md#startdate)
* [unsoldTokensWallet](_entities_simplesto_.params.md#unsoldtokenswallet)

## Properties

###  beneficialInvestmentsAllowed

• **beneficialInvestmentsAllowed**: *boolean*

*Inherited from [Params](_entities_sto_.params.md).[beneficialInvestmentsAllowed](_entities_sto_.params.md#beneficialinvestmentsallowed)*

*Defined in [src/entities/Sto.ts:92](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L92)*

whether or not investments can be made on behalf of a beneficiary in the sto

___

###  cap

• **cap**: *BigNumber*

*Defined in [src/entities/SimpleSto.ts:24](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SimpleSto.ts#L24)*

cap for how many tokens can be sold

___

###  capReached

• **capReached**: *boolean*

*Inherited from [Params](_entities_sto_.params.md).[capReached](_entities_sto_.params.md#capreached)*

*Defined in [src/entities/Sto.ts:80](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L80)*

whether or not the cap has been reached for the sto

___

###  endDate

• **endDate**: *Date*

*Inherited from [Params](_entities_sto_.params.md).[endDate](_entities_sto_.params.md#enddate)*

*Defined in [src/entities/Sto.ts:48](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L48)*

expiry date of the sto

___

###  fundraiseCurrencies

• **fundraiseCurrencies**: *Currency[]*

*Inherited from [Params](_entities_sto_.params.md).[fundraiseCurrencies](_entities_sto_.params.md#fundraisecurrencies)*

*Defined in [src/entities/Sto.ts:52](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L52)*

currencies that can be used to fundraise in this sto

___

###  investorCount

• **investorCount**: *number*

*Inherited from [Params](_entities_sto_.params.md).[investorCount](_entities_sto_.params.md#investorcount)*

*Defined in [src/entities/Sto.ts:72](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L72)*

number of investors in the sto

___

###  isFinalized

• **isFinalized**: *boolean*

*Inherited from [Params](_entities_sto_.params.md).[isFinalized](_entities_sto_.params.md#isfinalized)*

*Defined in [src/entities/Sto.ts:84](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L84)*

whether or not the sto has been finalized

___

###  isPaused

• **isPaused**: *boolean*

*Inherited from [Params](_entities_sto_.params.md).[isPaused](_entities_sto_.params.md#ispaused)*

*Defined in [src/entities/Sto.ts:76](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L76)*

whether or not the sto is currently paused

___

###  preIssueAllowed

• **preIssueAllowed**: *boolean*

*Inherited from [Params](_entities_sto_.params.md).[preIssueAllowed](_entities_sto_.params.md#preissueallowed)*

*Defined in [src/entities/Sto.ts:88](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L88)*

whether or not pre issuance is allowed for the sto

___

###  raisedAmount

• **raisedAmount**: *BigNumber*

*Inherited from [Params](_entities_sto_.params.md).[raisedAmount](_entities_sto_.params.md#raisedamount)*

*Defined in [src/entities/Sto.ts:64](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L64)*

funds that have been raised to this date

___

###  raisedFundsWallet

• **raisedFundsWallet**: *string*

*Inherited from [Params](_entities_sto_.params.md).[raisedFundsWallet](_entities_sto_.params.md#raisedfundswallet)*

*Defined in [src/entities/Sto.ts:56](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L56)*

wallet address where raised funds will be stored

___

###  rate

• **rate**: *BigNumber*

*Defined in [src/entities/SimpleSto.ts:28](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/SimpleSto.ts#L28)*

rate at which tokens will be sold

___

###  securityTokenSymbol

• **securityTokenSymbol**: *string*

*Inherited from [Params](_entities_sto_.params.md).[securityTokenSymbol](_entities_sto_.params.md#securitytokensymbol)*

*Defined in [src/entities/Sto.ts:40](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L40)*

symbol of security token

___

###  soldTokensAmount

• **soldTokensAmount**: *BigNumber*

*Inherited from [Params](_entities_sto_.params.md).[soldTokensAmount](_entities_sto_.params.md#soldtokensamount)*

*Defined in [src/entities/Sto.ts:68](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L68)*

amount of tokens that have been sold

___

###  startDate

• **startDate**: *Date*

*Inherited from [Params](_entities_sto_.params.md).[startDate](_entities_sto_.params.md#startdate)*

*Defined in [src/entities/Sto.ts:44](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L44)*

start date of the sto

___

###  unsoldTokensWallet

• **unsoldTokensWallet**: *string*

*Inherited from [Params](_entities_sto_.params.md).[unsoldTokensWallet](_entities_sto_.params.md#unsoldtokenswallet)*

*Defined in [src/entities/Sto.ts:60](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/entities/Sto.ts#L60)*

wallet address where unsold tokens will be returned to
