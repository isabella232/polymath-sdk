# CreateDividendDistributionProcedureArgs

Arguments for the [CreateDividendDistribution](../enums/_types_index_.proceduretype.md#createdividenddistribution) Procedure

## Hierarchy

* **CreateDividendDistributionProcedureArgs**

## Index

### Properties

* [amount](_types_index_.createdividenddistributionprocedureargs.md#amount)
* [checkpointIndex](_types_index_.createdividenddistributionprocedureargs.md#checkpointindex)
* [erc20Address](_types_index_.createdividenddistributionprocedureargs.md#erc20address)
* [excludedAddresses](_types_index_.createdividenddistributionprocedureargs.md#optional-excludedaddresses)
* [expiryDate](_types_index_.createdividenddistributionprocedureargs.md#expirydate)
* [maturityDate](_types_index_.createdividenddistributionprocedureargs.md#maturitydate)
* [name](_types_index_.createdividenddistributionprocedureargs.md#name)
* [symbol](_types_index_.createdividenddistributionprocedureargs.md#symbol)
* [taxWithholdings](_types_index_.createdividenddistributionprocedureargs.md#optional-taxwithholdings)

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

• **taxWithholdings**? : [_TaxWithholdingEntry_](_types_index_.taxwithholdingentry.md)_\[\]_

_Defined in_ [_src/types/index.ts:363_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L363)

tax withholding list for the Dividend Distribution

