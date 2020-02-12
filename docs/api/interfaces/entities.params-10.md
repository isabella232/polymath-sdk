# Interface: Params

Dividend Distribution constructor parameters

## Hierarchy

* **Params**

## Index

### Properties

* [amount](entities.params-10.md#amount)
* [checkpointId](entities.params-10.md#checkpointid)
* [claimedAmount](entities.params-10.md#claimedamount)
* [created](entities.params-10.md#created)
* [currency](entities.params-10.md#currency)
* [expiry](entities.params-10.md#expiry)
* [maturity](entities.params-10.md#maturity)
* [name](entities.params-10.md#name)
* [reclaimed](entities.params-10.md#reclaimed)
* [securityTokenSymbol](entities.params-10.md#securitytokensymbol)
* [shareholders](entities.params-10.md#shareholders)
* [totalSupply](entities.params-10.md#totalsupply)
* [totalWithheld](entities.params-10.md#totalwithheld)
* [totalWithheldWithdrawn](entities.params-10.md#totalwithheldwithdrawn)

## Properties

###  amount

• **amount**: *BigNumber*

*Defined in [src/entities/DividendDistribution.ts:62](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/DividendDistribution.ts#L62)*

dividend amount

___

###  checkpointId

• **checkpointId**: *string*

*Defined in [src/entities/DividendDistribution.ts:46](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/DividendDistribution.ts#L46)*

___

###  claimedAmount

• **claimedAmount**: *BigNumber*

*Defined in [src/entities/DividendDistribution.ts:66](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/DividendDistribution.ts#L66)*

amount of dividend claimed so far

___

###  created

• **created**: *Date*

*Defined in [src/entities/DividendDistribution.ts:50](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/DividendDistribution.ts#L50)*

date at which the dividend was created

___

###  currency

• **currency**: *string | null*

*Defined in [src/entities/DividendDistribution.ts:82](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/DividendDistribution.ts#L82)*

symbol of the currency in which this dividend distribution is being paid

___

###  expiry

• **expiry**: *Date*

*Defined in [src/entities/DividendDistribution.ts:58](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/DividendDistribution.ts#L58)*

date until which dividend can be claimed

___

###  maturity

• **maturity**: *Date*

*Defined in [src/entities/DividendDistribution.ts:54](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/DividendDistribution.ts#L54)*

date after which dividend can be claimed

___

###  name

• **name**: *string*

*Defined in [src/entities/DividendDistribution.ts:78](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/DividendDistribution.ts#L78)*

___

###  reclaimed

• **reclaimed**: *boolean*

*Defined in [src/entities/DividendDistribution.ts:74](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/DividendDistribution.ts#L74)*

true if expiry has passed and issuer has reclaimed remaining dividend

___

###  securityTokenSymbol

• **securityTokenSymbol**: *string*

*Defined in [src/entities/DividendDistribution.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/DividendDistribution.ts#L45)*

___

###  shareholders

• **shareholders**: *DividendShareholderStatus[]*

*Defined in [src/entities/DividendDistribution.ts:77](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/DividendDistribution.ts#L77)*

___

###  totalSupply

• **totalSupply**: *BigNumber*

*Defined in [src/entities/DividendDistribution.ts:70](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/DividendDistribution.ts#L70)*

total supply at the associated checkpoint

___

###  totalWithheld

• **totalWithheld**: *BigNumber*

*Defined in [src/entities/DividendDistribution.ts:75](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/DividendDistribution.ts#L75)*

___

###  totalWithheldWithdrawn

• **totalWithheldWithdrawn**: *BigNumber*

*Defined in [src/entities/DividendDistribution.ts:76](https://github.com/PolymathNetwork/polymath-sdk/blob/1abe1ae/src/entities/DividendDistribution.ts#L76)*
