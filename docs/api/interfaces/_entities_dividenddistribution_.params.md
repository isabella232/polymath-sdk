# Interface: Params

Dividend Distribution constructor parameters

## Hierarchy

* **Params**

## Index

### Properties

* [amount](_entities_dividenddistribution_.params.md#amount)
* [checkpointId](_entities_dividenddistribution_.params.md#checkpointid)
* [claimedAmount](_entities_dividenddistribution_.params.md#claimedamount)
* [created](_entities_dividenddistribution_.params.md#created)
* [currency](_entities_dividenddistribution_.params.md#currency)
* [expiry](_entities_dividenddistribution_.params.md#expiry)
* [maturity](_entities_dividenddistribution_.params.md#maturity)
* [name](_entities_dividenddistribution_.params.md#name)
* [reclaimed](_entities_dividenddistribution_.params.md#reclaimed)
* [securityTokenSymbol](_entities_dividenddistribution_.params.md#securitytokensymbol)
* [tokenholders](_entities_dividenddistribution_.params.md#tokenholders)
* [totalSupply](_entities_dividenddistribution_.params.md#totalsupply)
* [totalWithheld](_entities_dividenddistribution_.params.md#totalwithheld)
* [totalWithheldWithdrawn](_entities_dividenddistribution_.params.md#totalwithheldwithdrawn)

## Properties

###  amount

• **amount**: *BigNumber*

*Defined in [src/entities/DividendDistribution.ts:57](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/DividendDistribution.ts#L57)*

dividend amount

___

###  checkpointId

• **checkpointId**: *string*

*Defined in [src/entities/DividendDistribution.ts:41](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/DividendDistribution.ts#L41)*

___

###  claimedAmount

• **claimedAmount**: *BigNumber*

*Defined in [src/entities/DividendDistribution.ts:61](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/DividendDistribution.ts#L61)*

amount of dividend claimed so far

___

###  created

• **created**: *Date*

*Defined in [src/entities/DividendDistribution.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/DividendDistribution.ts#L45)*

date at which the dividend was created

___

###  currency

• **currency**: *string | null*

*Defined in [src/entities/DividendDistribution.ts:77](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/DividendDistribution.ts#L77)*

symbol of the currency in which this dividend distribution is being paid

___

###  expiry

• **expiry**: *Date*

*Defined in [src/entities/DividendDistribution.ts:53](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/DividendDistribution.ts#L53)*

date until which dividend can be claimed

___

###  maturity

• **maturity**: *Date*

*Defined in [src/entities/DividendDistribution.ts:49](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/DividendDistribution.ts#L49)*

date after which dividend can be claimed

___

###  name

• **name**: *string*

*Defined in [src/entities/DividendDistribution.ts:73](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/DividendDistribution.ts#L73)*

___

###  reclaimed

• **reclaimed**: *boolean*

*Defined in [src/entities/DividendDistribution.ts:69](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/DividendDistribution.ts#L69)*

true if expiry has passed and issuer has reclaimed remaining dividend

___

###  securityTokenSymbol

• **securityTokenSymbol**: *string*

*Defined in [src/entities/DividendDistribution.ts:40](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/DividendDistribution.ts#L40)*

___

###  tokenholders

• **tokenholders**: *[DividendTokenholderStatus](_types_index_.dividendtokenholderstatus.md)[]*

*Defined in [src/entities/DividendDistribution.ts:72](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/DividendDistribution.ts#L72)*

___

###  totalSupply

• **totalSupply**: *BigNumber*

*Defined in [src/entities/DividendDistribution.ts:65](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/DividendDistribution.ts#L65)*

total supply at the associated checkpoint

___

###  totalWithheld

• **totalWithheld**: *BigNumber*

*Defined in [src/entities/DividendDistribution.ts:70](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/DividendDistribution.ts#L70)*

___

###  totalWithheldWithdrawn

• **totalWithheldWithdrawn**: *BigNumber*

*Defined in [src/entities/DividendDistribution.ts:71](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/DividendDistribution.ts#L71)*
