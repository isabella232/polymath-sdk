# Interface: BaseDividend

Internal representation of a Dividend Distribution

## Hierarchy

* **BaseDividend**

## Index

### Properties

* [amount](_polymathbase_.basedividend.md#amount)
* [checkpointId](_polymathbase_.basedividend.md#checkpointid)
* [claimedAmount](_polymathbase_.basedividend.md#claimedamount)
* [created](_polymathbase_.basedividend.md#created)
* [currency](_polymathbase_.basedividend.md#currency)
* [expiry](_polymathbase_.basedividend.md#expiry)
* [index](_polymathbase_.basedividend.md#index)
* [maturity](_polymathbase_.basedividend.md#maturity)
* [name](_polymathbase_.basedividend.md#name)
* [reclaimed](_polymathbase_.basedividend.md#reclaimed)
* [shareholders](_polymathbase_.basedividend.md#shareholders)
* [totalSupply](_polymathbase_.basedividend.md#totalsupply)
* [totalWithheld](_polymathbase_.basedividend.md#totalwithheld)
* [totalWithheldWithdrawn](_polymathbase_.basedividend.md#totalwithheldwithdrawn)

## Properties

###  amount

• **amount**: *BigNumber*

*Defined in [src/PolymathBase.ts:301](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/PolymathBase.ts#L301)*

amount of tokens provided in the Dividend

___

###  checkpointId

• **checkpointId**: *number*

*Defined in [src/PolymathBase.ts:285](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/PolymathBase.ts#L285)*

checkpoint UUID to which this Dividend Distribution is associated

___

###  claimedAmount

• **claimedAmount**: *BigNumber*

*Defined in [src/PolymathBase.ts:305](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/PolymathBase.ts#L305)*

amount of tokens paid so far

___

###  created

• **created**: *Date*

*Defined in [src/PolymathBase.ts:289](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/PolymathBase.ts#L289)*

date at which the Dividend was created

___

###  currency

• **currency**: *string | null*

*Defined in [src/PolymathBase.ts:329](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/PolymathBase.ts#L329)*

symbol of the currency in which Dividends are being distributed

___

###  expiry

• **expiry**: *Date*

*Defined in [src/PolymathBase.ts:297](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/PolymathBase.ts#L297)*

date at which the Dividend will expire

___

###  index

• **index**: *number*

*Defined in [src/PolymathBase.ts:281](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/PolymathBase.ts#L281)*

index of the dividend

___

###  maturity

• **maturity**: *Date*

*Defined in [src/PolymathBase.ts:293](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/PolymathBase.ts#L293)*

date from which payments can be distributed

___

###  name

• **name**: *string*

*Defined in [src/PolymathBase.ts:325](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/PolymathBase.ts#L325)*

name of the Dividend

___

###  reclaimed

• **reclaimed**: *boolean*

*Defined in [src/PolymathBase.ts:313](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/PolymathBase.ts#L313)*

whether expired payments have been reclaimed

___

###  shareholders

• **shareholders**: *DividendShareholderStatus[]*

*Defined in [src/PolymathBase.ts:333](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/PolymathBase.ts#L333)*

dividend Shareholders

___

###  totalSupply

• **totalSupply**: *BigNumber*

*Defined in [src/PolymathBase.ts:309](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/PolymathBase.ts#L309)*

total supply of the Security Token

___

###  totalWithheld

• **totalWithheld**: *BigNumber*

*Defined in [src/PolymathBase.ts:317](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/PolymathBase.ts#L317)*

total amount of tokens withheld as tax so far

___

###  totalWithheldWithdrawn

• **totalWithheldWithdrawn**: *BigNumber*

*Defined in [src/PolymathBase.ts:321](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/PolymathBase.ts#L321)*

total amount of withheld taxes already withdrawn from the storage wallet
