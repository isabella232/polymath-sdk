# Interface: CreateDividendDistributionProcedureArgs

Arguments for the [CreateDividendDistribution](../enums/_types_index_.proceduretype.md#createdividenddistribution) Procedure

## Hierarchy

- **CreateDividendDistributionProcedureArgs**

## Index

### Properties

- [amount](_types_index_.createdividenddistributionprocedureargs.md#amount)
- [checkpointIndex](_types_index_.createdividenddistributionprocedureargs.md#checkpointindex)
- [erc20Address](_types_index_.createdividenddistributionprocedureargs.md#erc20address)
- [excludedAddresses](_types_index_.createdividenddistributionprocedureargs.md#optional-excludedaddresses)
- [expiryDate](_types_index_.createdividenddistributionprocedureargs.md#expirydate)
- [maturityDate](_types_index_.createdividenddistributionprocedureargs.md#maturitydate)
- [name](_types_index_.createdividenddistributionprocedureargs.md#name)
- [symbol](_types_index_.createdividenddistributionprocedureargs.md#symbol)
- [taxWithholdings](_types_index_.createdividenddistributionprocedureargs.md#optional-taxwithholdings)

## Properties

### amount

• **amount**: _BigNumber_

_Defined in [src/types/index.ts:347](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/types/index.ts#L347)_

amount to be distributed as dividends

---

### checkpointIndex

• **checkpointIndex**: _number_

_Defined in [src/types/index.ts:351](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/types/index.ts#L351)_

index of the Checkpoint in which the Dividend Distribution will be based

---

### erc20Address

• **erc20Address**: _string_

_Defined in [src/types/index.ts:343](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/types/index.ts#L343)_

address of the ERC20 token

---

### `Optional` excludedAddresses

• **excludedAddresses**? : _string[]_

_Defined in [src/types/index.ts:359](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/types/index.ts#L359)_

list of addresses that will be excluded from receiving payment

---

### expiryDate

• **expiryDate**: _Date_

_Defined in [src/types/index.ts:339](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/types/index.ts#L339)_

date on which the Dividend will expire

---

### maturityDate

• **maturityDate**: _Date_

_Defined in [src/types/index.ts:335](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/types/index.ts#L335)_

date from which Dividend payments can be pushed/claimed

---

### name

• **name**: _string_

_Defined in [src/types/index.ts:355](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/types/index.ts#L355)_

name of the distribution

---

### symbol

• **symbol**: _string_

_Defined in [src/types/index.ts:331](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/types/index.ts#L331)_

symbol of the Security Token

---

### `Optional` taxWithholdings

• **taxWithholdings**? : _[TaxWithholdingEntry](_types_index_.taxwithholdingentry.md)[]_

_Defined in [src/types/index.ts:363](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/types/index.ts#L363)_

tax withholding list for the Dividend Distribution
