# Params

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

### amount

• **amount**: _BigNumber_

_Defined in_ [_src/entities/DividendDistribution.ts:57_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/DividendDistribution.ts#L57)

dividend amount

### checkpointId

• **checkpointId**: _string_

_Defined in_ [_src/entities/DividendDistribution.ts:41_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/DividendDistribution.ts#L41)

### claimedAmount

• **claimedAmount**: _BigNumber_

_Defined in_ [_src/entities/DividendDistribution.ts:61_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/DividendDistribution.ts#L61)

amount of dividend claimed so far

### created

• **created**: _Date_

_Defined in_ [_src/entities/DividendDistribution.ts:45_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/DividendDistribution.ts#L45)

date at which the dividend was created

### currency

• **currency**: _string \| null_

_Defined in_ [_src/entities/DividendDistribution.ts:77_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/DividendDistribution.ts#L77)

symbol of the currency in which this dividend distribution is being paid

### expiry

• **expiry**: _Date_

_Defined in_ [_src/entities/DividendDistribution.ts:53_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/DividendDistribution.ts#L53)

date until which dividend can be claimed

### maturity

• **maturity**: _Date_

_Defined in_ [_src/entities/DividendDistribution.ts:49_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/DividendDistribution.ts#L49)

date after which dividend can be claimed

### name

• **name**: _string_

_Defined in_ [_src/entities/DividendDistribution.ts:73_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/DividendDistribution.ts#L73)

### reclaimed

• **reclaimed**: _boolean_

_Defined in_ [_src/entities/DividendDistribution.ts:69_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/DividendDistribution.ts#L69)

true if expiry has passed and issuer has reclaimed remaining dividend

### securityTokenSymbol

• **securityTokenSymbol**: _string_

_Defined in_ [_src/entities/DividendDistribution.ts:40_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/DividendDistribution.ts#L40)

### tokenholders

• **tokenholders**: [_DividendTokenholderStatus_](_types_index_.dividendtokenholderstatus.md)_\[\]_

_Defined in_ [_src/entities/DividendDistribution.ts:72_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/DividendDistribution.ts#L72)

### totalSupply

• **totalSupply**: _BigNumber_

_Defined in_ [_src/entities/DividendDistribution.ts:65_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/DividendDistribution.ts#L65)

total supply at the associated checkpoint

### totalWithheld

• **totalWithheld**: _BigNumber_

_Defined in_ [_src/entities/DividendDistribution.ts:70_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/DividendDistribution.ts#L70)

### totalWithheldWithdrawn

• **totalWithheldWithdrawn**: _BigNumber_

_Defined in_ [_src/entities/DividendDistribution.ts:71_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/DividendDistribution.ts#L71)

