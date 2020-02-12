# Interface: Params

Represents a Tiered STO

## Hierarchy

* [Params](entities.params-4.md)

  ↳ **Params**

## Index

### Properties

* [beneficialInvestmentsAllowed](entities.params-8.md#beneficialinvestmentsallowed)
* [capReached](entities.params-8.md#capreached)
* [currentTier](entities.params-8.md#currenttier)
* [endDate](entities.params-8.md#enddate)
* [fundraiseCurrencies](entities.params-8.md#fundraisecurrencies)
* [investorCount](entities.params-8.md#investorcount)
* [isFinalized](entities.params-8.md#isfinalized)
* [isPaused](entities.params-8.md#ispaused)
* [minimumInvestment](entities.params-8.md#minimuminvestment)
* [nonAccreditedInvestmentLimit](entities.params-8.md#nonaccreditedinvestmentlimit)
* [preIssueAllowed](entities.params-8.md#preissueallowed)
* [raisedAmount](entities.params-8.md#raisedamount)
* [raisedFundsWallet](entities.params-8.md#raisedfundswallet)
* [securityTokenSymbol](entities.params-8.md#securitytokensymbol)
* [soldTokensAmount](entities.params-8.md#soldtokensamount)
* [stableCoinAddresses](entities.params-8.md#stablecoinaddresses)
* [startDate](entities.params-8.md#startdate)
* [tiers](entities.params-8.md#tiers)
* [unsoldTokensWallet](entities.params-8.md#unsoldtokenswallet)

## Properties

###  beneficialInvestmentsAllowed

• **beneficialInvestmentsAllowed**: *boolean*

*Inherited from [Params](entities.params-4.md).[beneficialInvestmentsAllowed](entities.params-4.md#beneficialinvestmentsallowed)*

*Defined in [src/entities/Sto.ts:97](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/Sto.ts#L97)*

whether or not investments can be made on behalf of a beneficiary in the sto

___

###  capReached

• **capReached**: *boolean*

*Inherited from [Params](entities.params-4.md).[capReached](entities.params-4.md#capreached)*

*Defined in [src/entities/Sto.ts:85](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/Sto.ts#L85)*

whether or not the cap has been reached for the sto

___

###  currentTier

• **currentTier**: *number*

*Defined in [src/entities/TieredSto.ts:62](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/TieredSto.ts#L62)*

numerical identifier for the current tier index

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

###  minimumInvestment

• **minimumInvestment**: *BigNumber*

*Defined in [src/entities/TieredSto.ts:68](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/TieredSto.ts#L68)*

___

###  nonAccreditedInvestmentLimit

• **nonAccreditedInvestmentLimit**: *BigNumber*

*Defined in [src/entities/TieredSto.ts:67](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/TieredSto.ts#L67)*

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

###  stableCoinAddresses

• **stableCoinAddresses**: *string[]*

*Defined in [src/entities/TieredSto.ts:69](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/TieredSto.ts#L69)*

___

###  startDate

• **startDate**: *Date*

*Inherited from [Params](entities.params-4.md).[startDate](entities.params-4.md#startdate)*

*Defined in [src/entities/Sto.ts:49](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/Sto.ts#L49)*

start date of the sto

___

###  tiers

• **tiers**: *[Tier](entities.tier.md)[]*

*Defined in [src/entities/TieredSto.ts:66](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/TieredSto.ts#L66)*

array of tier information

___

###  unsoldTokensWallet

• **unsoldTokensWallet**: *string*

*Inherited from [Params](entities.params-4.md).[unsoldTokensWallet](entities.params-4.md#unsoldtokenswallet)*

*Defined in [src/entities/Sto.ts:65](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/Sto.ts#L65)*

wallet address where unsold tokens will be returned to
