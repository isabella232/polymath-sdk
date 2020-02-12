# Interface: Params

Properties that uniquely identify a simple sto

## Hierarchy

* [Params](entities.params-4.md)

  ↳ **Params**

## Index

### Properties

* [beneficialInvestmentsAllowed](entities.params-9.md#beneficialinvestmentsallowed)
* [cap](entities.params-9.md#cap)
* [capReached](entities.params-9.md#capreached)
* [endDate](entities.params-9.md#enddate)
* [fundraiseCurrencies](entities.params-9.md#fundraisecurrencies)
* [investorCount](entities.params-9.md#investorcount)
* [isFinalized](entities.params-9.md#isfinalized)
* [isPaused](entities.params-9.md#ispaused)
* [preIssueAllowed](entities.params-9.md#preissueallowed)
* [raisedAmount](entities.params-9.md#raisedamount)
* [raisedFundsWallet](entities.params-9.md#raisedfundswallet)
* [rate](entities.params-9.md#rate)
* [securityTokenSymbol](entities.params-9.md#securitytokensymbol)
* [soldTokensAmount](entities.params-9.md#soldtokensamount)
* [startDate](entities.params-9.md#startdate)
* [unsoldTokensWallet](entities.params-9.md#unsoldtokenswallet)

## Properties

###  beneficialInvestmentsAllowed

• **beneficialInvestmentsAllowed**: *boolean*

*Inherited from [Params](entities.params-4.md).[beneficialInvestmentsAllowed](entities.params-4.md#beneficialinvestmentsallowed)*

*Defined in [src/entities/Sto.ts:97](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/Sto.ts#L97)*

whether or not investments can be made on behalf of a beneficiary in the sto

___

###  cap

• **cap**: *BigNumber*

*Defined in [src/entities/SimpleSto.ts:29](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SimpleSto.ts#L29)*

cap for how many tokens can be sold

___

###  capReached

• **capReached**: *boolean*

*Inherited from [Params](entities.params-4.md).[capReached](entities.params-4.md#capreached)*

*Defined in [src/entities/Sto.ts:85](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/Sto.ts#L85)*

whether or not the cap has been reached for the sto

___

###  endDate

• **endDate**: *Date*

*Inherited from [Params](entities.params-4.md).[endDate](entities.params-4.md#enddate)*

*Defined in [src/entities/Sto.ts:53](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/Sto.ts#L53)*

expiry date of the sto

___

###  fundraiseCurrencies

• **fundraiseCurrencies**: *Currency[]*

*Inherited from [Params](entities.params-4.md).[fundraiseCurrencies](entities.params-4.md#fundraisecurrencies)*

*Defined in [src/entities/Sto.ts:57](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/Sto.ts#L57)*

currencies that can be used to fundraise in this sto

___

###  investorCount

• **investorCount**: *number*

*Inherited from [Params](entities.params-4.md).[investorCount](entities.params-4.md#investorcount)*

*Defined in [src/entities/Sto.ts:77](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/Sto.ts#L77)*

number of investors in the sto

___

###  isFinalized

• **isFinalized**: *boolean*

*Inherited from [Params](entities.params-4.md).[isFinalized](entities.params-4.md#isfinalized)*

*Defined in [src/entities/Sto.ts:89](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/Sto.ts#L89)*

whether or not the sto has been finalized

___

###  isPaused

• **isPaused**: *boolean*

*Inherited from [Params](entities.params-4.md).[isPaused](entities.params-4.md#ispaused)*

*Defined in [src/entities/Sto.ts:81](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/Sto.ts#L81)*

whether or not the sto is currently paused

___

###  preIssueAllowed

• **preIssueAllowed**: *boolean*

*Inherited from [Params](entities.params-4.md).[preIssueAllowed](entities.params-4.md#preissueallowed)*

*Defined in [src/entities/Sto.ts:93](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/Sto.ts#L93)*

whether or not pre issuance is allowed for the sto

___

###  raisedAmount

• **raisedAmount**: *BigNumber*

*Inherited from [Params](entities.params-4.md).[raisedAmount](entities.params-4.md#raisedamount)*

*Defined in [src/entities/Sto.ts:69](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/Sto.ts#L69)*

funds that have been raised to this date

___

###  raisedFundsWallet

• **raisedFundsWallet**: *string*

*Inherited from [Params](entities.params-4.md).[raisedFundsWallet](entities.params-4.md#raisedfundswallet)*

*Defined in [src/entities/Sto.ts:61](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/Sto.ts#L61)*

wallet address where raised funds will be stored

___

###  rate

• **rate**: *BigNumber*

*Defined in [src/entities/SimpleSto.ts:33](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/SimpleSto.ts#L33)*

rate at which tokens will be sold

___

###  securityTokenSymbol

• **securityTokenSymbol**: *string*

*Inherited from [Params](entities.params-4.md).[securityTokenSymbol](entities.params-4.md#securitytokensymbol)*

*Defined in [src/entities/Sto.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/Sto.ts#L45)*

symbol of security token

___

###  soldTokensAmount

• **soldTokensAmount**: *BigNumber*

*Inherited from [Params](entities.params-4.md).[soldTokensAmount](entities.params-4.md#soldtokensamount)*

*Defined in [src/entities/Sto.ts:73](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/Sto.ts#L73)*

amount of tokens that have been sold

___

###  startDate

• **startDate**: *Date*

*Inherited from [Params](entities.params-4.md).[startDate](entities.params-4.md#startdate)*

*Defined in [src/entities/Sto.ts:49](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/Sto.ts#L49)*

start date of the sto

___

###  unsoldTokensWallet

• **unsoldTokensWallet**: *string*

*Inherited from [Params](entities.params-4.md).[unsoldTokensWallet](entities.params-4.md#unsoldtokenswallet)*

*Defined in [src/entities/Sto.ts:65](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/Sto.ts#L65)*

wallet address where unsold tokens will be returned to
