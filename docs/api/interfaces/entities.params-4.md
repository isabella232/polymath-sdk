# Interface: Params

STO constructor parameters

## Hierarchy

* **Params**

  ↳ [Params](entities.params-9.md)

  ↳ [Params](entities.params-8.md)

## Index

### Properties

* [beneficialInvestmentsAllowed](entities.params-4.md#beneficialinvestmentsallowed)
* [capReached](entities.params-4.md#capreached)
* [endDate](entities.params-4.md#enddate)
* [fundraiseCurrencies](entities.params-4.md#fundraisecurrencies)
* [investorCount](entities.params-4.md#investorcount)
* [isFinalized](entities.params-4.md#isfinalized)
* [isPaused](entities.params-4.md#ispaused)
* [preIssueAllowed](entities.params-4.md#preissueallowed)
* [raisedAmount](entities.params-4.md#raisedamount)
* [raisedFundsWallet](entities.params-4.md#raisedfundswallet)
* [securityTokenSymbol](entities.params-4.md#securitytokensymbol)
* [soldTokensAmount](entities.params-4.md#soldtokensamount)
* [startDate](entities.params-4.md#startdate)
* [unsoldTokensWallet](entities.params-4.md#unsoldtokenswallet)

## Properties

###  beneficialInvestmentsAllowed

• **beneficialInvestmentsAllowed**: *boolean*

*Defined in [src/entities/Sto.ts:97](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L97)*

whether or not investments can be made on behalf of a beneficiary in the sto

___

###  capReached

• **capReached**: *boolean*

*Defined in [src/entities/Sto.ts:85](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L85)*

whether or not the cap has been reached for the sto

___

###  endDate

• **endDate**: *Date*

*Defined in [src/entities/Sto.ts:53](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L53)*

expiry date of the sto

___

###  fundraiseCurrencies

• **fundraiseCurrencies**: *Currency[]*

*Defined in [src/entities/Sto.ts:57](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L57)*

currencies that can be used to fundraise in this sto

___

###  investorCount

• **investorCount**: *number*

*Defined in [src/entities/Sto.ts:77](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L77)*

number of investors in the sto

___

###  isFinalized

• **isFinalized**: *boolean*

*Defined in [src/entities/Sto.ts:89](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L89)*

whether or not the sto has been finalized

___

###  isPaused

• **isPaused**: *boolean*

*Defined in [src/entities/Sto.ts:81](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L81)*

whether or not the sto is currently paused

___

###  preIssueAllowed

• **preIssueAllowed**: *boolean*

*Defined in [src/entities/Sto.ts:93](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L93)*

whether or not pre issuance is allowed for the sto

___

###  raisedAmount

• **raisedAmount**: *BigNumber*

*Defined in [src/entities/Sto.ts:69](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L69)*

funds that have been raised to this date

___

###  raisedFundsWallet

• **raisedFundsWallet**: *string*

*Defined in [src/entities/Sto.ts:61](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L61)*

wallet address where raised funds will be stored

___

###  securityTokenSymbol

• **securityTokenSymbol**: *string*

*Defined in [src/entities/Sto.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L45)*

symbol of security token

___

###  soldTokensAmount

• **soldTokensAmount**: *BigNumber*

*Defined in [src/entities/Sto.ts:73](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L73)*

amount of tokens that have been sold

___

###  startDate

• **startDate**: *Date*

*Defined in [src/entities/Sto.ts:49](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L49)*

start date of the sto

___

###  unsoldTokensWallet

• **unsoldTokensWallet**: *string*

*Defined in [src/entities/Sto.ts:65](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/Sto.ts#L65)*

wallet address where unsold tokens will be returned to
