# Interface: ModifyPercentageExemptionsProcedureArgs

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

• **allowPrimaryIssuance**? : *undefined | false | true*

*Defined in [src/types/index.ts:1239](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/types/index.ts#L1239)*

whether primary issuance is exempted from percentage restrictions.
If true, issuing tokens to a wallet that doesn't own tokens will bypass percentage restrictions

___

###  symbol

• **symbol**: *string*

*Defined in [src/types/index.ts:1230](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/types/index.ts#L1230)*

symbol of the Security Token

___

### `Optional` whitelistEntries

• **whitelistEntries**? : *[PercentageWhitelistEntry](_types_index_.percentagewhitelistentry.md)[]*

*Defined in [src/types/index.ts:1234](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/types/index.ts#L1234)*

list of Shareholders to add/remove to/from the whitelist
