# Interface: Params

STO constructor parameters

## Hierarchy

* **Params**

  ↳ [Params](_entities_simplesto_.params.md)

  ↳ [Params](_entities_tieredsto_.params.md)

## Index

### Properties

* [beneficialInvestmentsAllowed](_entities_sto_.params.md#beneficialinvestmentsallowed)
* [capReached](_entities_sto_.params.md#capreached)
* [endDate](_entities_sto_.params.md#enddate)
* [fundraiseCurrencies](_entities_sto_.params.md#fundraisecurrencies)
* [investorCount](_entities_sto_.params.md#investorcount)
* [isFinalized](_entities_sto_.params.md#isfinalized)
* [isPaused](_entities_sto_.params.md#ispaused)
* [preIssueAllowed](_entities_sto_.params.md#preissueallowed)
* [raisedAmount](_entities_sto_.params.md#raisedamount)
* [raisedFundsWallet](_entities_sto_.params.md#raisedfundswallet)
* [securityTokenSymbol](_entities_sto_.params.md#securitytokensymbol)
* [soldTokensAmount](_entities_sto_.params.md#soldtokensamount)
* [startDate](_entities_sto_.params.md#startdate)
* [unsoldTokensWallet](_entities_sto_.params.md#unsoldtokenswallet)

## Properties

###  beneficialInvestmentsAllowed

• **beneficialInvestmentsAllowed**: *boolean*

*Defined in [src/entities/Sto.ts:92](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/Sto.ts#L92)*

whether or not investments can be made on behalf of a beneficiary in the sto

___

###  capReached

• **capReached**: *boolean*

*Defined in [src/entities/Sto.ts:80](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/Sto.ts#L80)*

whether or not the cap has been reached for the sto

___

###  endDate

• **endDate**: *Date*

*Defined in [src/entities/Sto.ts:48](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/Sto.ts#L48)*

expiry date of the sto

___

###  fundraiseCurrencies

• **fundraiseCurrencies**: *Currency[]*

*Defined in [src/entities/Sto.ts:52](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/Sto.ts#L52)*

currencies that can be used to fundraise in this sto

___

###  investorCount

• **investorCount**: *number*

*Defined in [src/entities/Sto.ts:72](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/Sto.ts#L72)*

number of investors in the sto

___

###  isFinalized

• **isFinalized**: *boolean*

*Defined in [src/entities/Sto.ts:84](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/Sto.ts#L84)*

whether or not the sto has been finalized

___

###  isPaused

• **isPaused**: *boolean*

*Defined in [src/entities/Sto.ts:76](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/Sto.ts#L76)*

whether or not the sto is currently paused

___

###  preIssueAllowed

• **preIssueAllowed**: *boolean*

*Defined in [src/entities/Sto.ts:88](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/Sto.ts#L88)*

whether or not pre issuance is allowed for the sto

___

###  raisedAmount

• **raisedAmount**: *BigNumber*

*Defined in [src/entities/Sto.ts:64](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/Sto.ts#L64)*

funds that have been raised to this date

___

###  raisedFundsWallet

• **raisedFundsWallet**: *string*

*Defined in [src/entities/Sto.ts:56](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/Sto.ts#L56)*

wallet address where raised funds will be stored

___

###  securityTokenSymbol

• **securityTokenSymbol**: *string*

*Defined in [src/entities/Sto.ts:40](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/Sto.ts#L40)*

symbol of security token

___

###  soldTokensAmount

• **soldTokensAmount**: *BigNumber*

*Defined in [src/entities/Sto.ts:68](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/Sto.ts#L68)*

amount of tokens that have been sold

___

###  startDate

• **startDate**: *Date*

*Defined in [src/entities/Sto.ts:44](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/Sto.ts#L44)*

start date of the sto

___

###  unsoldTokensWallet

• **unsoldTokensWallet**: *string*

*Defined in [src/entities/Sto.ts:60](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/Sto.ts#L60)*

wallet address where unsold tokens will be returned to
