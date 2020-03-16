# Interface: CreateDividendDistributionProcedureArgs

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

###  amount

• **amount**: *BigNumber*

*Defined in [src/types/index.ts:347](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L347)*

amount to be distributed as dividends

___

###  checkpointIndex

• **checkpointIndex**: *number*

*Defined in [src/types/index.ts:351](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L351)*

index of the Checkpoint in which the Dividend Distribution will be based

___

###  erc20Address

• **erc20Address**: *string*

*Defined in [src/types/index.ts:343](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L343)*

address of the ERC20 token

___

### `Optional` excludedAddresses

• **excludedAddresses**? : *string[]*

*Defined in [src/types/index.ts:359](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L359)*

list of addresses that will be excluded from receiving payment

___

###  expiryDate

• **expiryDate**: *Date*

*Defined in [src/types/index.ts:339](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L339)*

date on which the Dividend will expire

___

###  maturityDate

• **maturityDate**: *Date*

*Defined in [src/types/index.ts:335](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L335)*

date from which Dividend payments can be pushed/claimed

___

###  name

• **name**: *string*

*Defined in [src/types/index.ts:355](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L355)*

name of the distribution

___

###  symbol

• **symbol**: *string*

*Defined in [src/types/index.ts:331](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L331)*

symbol of the Security Token

___

### `Optional` taxWithholdings

• **taxWithholdings**? : *[TaxWithholdingEntry](_types_index_.taxwithholdingentry.md)[]*

*Defined in [src/types/index.ts:363](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L363)*

tax withholding list for the Dividend Distribution
