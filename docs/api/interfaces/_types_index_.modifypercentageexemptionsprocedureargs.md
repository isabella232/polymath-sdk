# ModifyPercentageExemptionsProcedureArgs

Arguments for the [ModifyPercentageExemptions](../enums/_types_index_.proceduretype.md#modifypercentageexemptions) Procedure

## Hierarchy

* **ModifyPercentageExemptionsProcedureArgs**

## Index

### Properties

* [allowPrimaryIssuance](_types_index_.modifypercentageexemptionsprocedureargs.md#optional-allowprimaryissuance)
* [symbol](_types_index_.modifypercentageexemptionsprocedureargs.md#symbol)
* [whitelistEntries](_types_index_.modifypercentageexemptionsprocedureargs.md#optional-whitelistentries)

## Properties

### `Optional` allowPrimaryIssuance

• **allowPrimaryIssuance**? : _undefined \| false \| true_

_Defined in_ [_src/types/index.ts:1239_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L1239)

whether primary issuance is exempted from percentage restrictions. If true, issuing tokens to a wallet that doesn't own tokens will bypass percentage restrictions

### symbol

• **symbol**: _string_

_Defined in_ [_src/types/index.ts:1230_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L1230)

symbol of the Security Token

### `Optional` whitelistEntries

• **whitelistEntries**? : [_PercentageWhitelistEntry_](_types_index_.percentagewhitelistentry.md)_\[\]_

_Defined in_ [_src/types/index.ts:1234_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L1234)

list of Tokenholders to add/remove to/from the whitelist

