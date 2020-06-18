# BaseDividend

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
* [tokenholders](_polymathbase_.basedividend.md#tokenholders)
* [totalSupply](_polymathbase_.basedividend.md#totalsupply)
* [totalWithheld](_polymathbase_.basedividend.md#totalwithheld)
* [totalWithheldWithdrawn](_polymathbase_.basedividend.md#totalwithheldwithdrawn)

## Properties

### amount

• **amount**: _BigNumber_

_Defined in_ [_src/PolymathBase.ts:301_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/PolymathBase.ts#L301)

amount of tokens provided in the Dividend

### checkpointId

• **checkpointId**: _number_

_Defined in_ [_src/PolymathBase.ts:285_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/PolymathBase.ts#L285)

checkpoint UUID to which this Dividend Distribution is associated

### claimedAmount

• **claimedAmount**: _BigNumber_

_Defined in_ [_src/PolymathBase.ts:305_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/PolymathBase.ts#L305)

amount of tokens paid so far

### created

• **created**: _Date_

_Defined in_ [_src/PolymathBase.ts:289_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/PolymathBase.ts#L289)

date at which the Dividend was created

### currency

• **currency**: _string \| null_

_Defined in_ [_src/PolymathBase.ts:329_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/PolymathBase.ts#L329)

symbol of the currency in which Dividends are being distributed

### expiry

• **expiry**: _Date_

_Defined in_ [_src/PolymathBase.ts:297_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/PolymathBase.ts#L297)

date at which the Dividend will expire

### index

• **index**: _number_

_Defined in_ [_src/PolymathBase.ts:281_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/PolymathBase.ts#L281)

index of the dividend

### maturity

• **maturity**: _Date_

_Defined in_ [_src/PolymathBase.ts:293_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/PolymathBase.ts#L293)

date from which payments can be distributed

### name

• **name**: _string_

_Defined in_ [_src/PolymathBase.ts:325_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/PolymathBase.ts#L325)

name of the Dividend

### reclaimed

• **reclaimed**: _boolean_

_Defined in_ [_src/PolymathBase.ts:313_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/PolymathBase.ts#L313)

whether expired payments have been reclaimed

### tokenholders

• **tokenholders**: [_DividendTokenholderStatus_](_types_index_.dividendtokenholderstatus.md)_\[\]_

_Defined in_ [_src/PolymathBase.ts:333_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/PolymathBase.ts#L333)

dividend Tokenholders

### totalSupply

• **totalSupply**: _BigNumber_

_Defined in_ [_src/PolymathBase.ts:309_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/PolymathBase.ts#L309)

total supply of the Security Token

### totalWithheld

• **totalWithheld**: _BigNumber_

_Defined in_ [_src/PolymathBase.ts:317_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/PolymathBase.ts#L317)

total amount of tokens withheld as tax so far

### totalWithheldWithdrawn

• **totalWithheldWithdrawn**: _BigNumber_

_Defined in_ [_src/PolymathBase.ts:321_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/PolymathBase.ts#L321)

total amount of withheld taxes already withdrawn from the storage wallet

