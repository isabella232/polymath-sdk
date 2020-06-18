# CreateDividendDistributionProcedureArgs

Arguments for the [CreateDividendDistribution]() Procedure

## Hierarchy

* **CreateDividendDistributionProcedureArgs**

## Index

### Properties

* [amount]()
* [checkpointIndex]()
* [erc20Address]()
* [excludedAddresses]()
* [expiryDate]()
* [maturityDate]()
* [name]()
* [symbol]()
* [taxWithholdings]()

## Properties

### amount

• **amount**: _BigNumber_

_Defined in_ [_src/types/index.ts:347_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L347)

amount to be distributed as dividends

### checkpointIndex

• **checkpointIndex**: _number_

_Defined in_ [_src/types/index.ts:351_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L351)

index of the Checkpoint in which the Dividend Distribution will be based

### erc20Address

• **erc20Address**: _string_

_Defined in_ [_src/types/index.ts:343_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L343)

address of the ERC20 token

### `Optional` excludedAddresses

• **excludedAddresses**? : _string\[\]_

_Defined in_ [_src/types/index.ts:359_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L359)

list of addresses that will be excluded from receiving payment

### expiryDate

• **expiryDate**: _Date_

_Defined in_ [_src/types/index.ts:339_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L339)

date on which the Dividend will expire

### maturityDate

• **maturityDate**: _Date_

_Defined in_ [_src/types/index.ts:335_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L335)

date from which Dividend payments can be pushed/claimed

### name

• **name**: _string_

_Defined in_ [_src/types/index.ts:355_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L355)

name of the distribution

### symbol

• **symbol**: _string_

_Defined in_ [_src/types/index.ts:331_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L331)

symbol of the Security Token

### `Optional` taxWithholdings

• **taxWithholdings**? : [_TaxWithholdingEntry_]()_\[\]_

_Defined in_ [_src/types/index.ts:363_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L363)

tax withholding list for the Dividend Distribution

