# Interface: ModifyPercentageExemptionsProcedureArgs

Arguments for the [ModifyPercentageExemptions](../enums/_types_index_.proceduretype.md#modifypercentageexemptions) Procedure

## Hierarchy

- **ModifyPercentageExemptionsProcedureArgs**

## Index

### Properties

- [allowPrimaryIssuance](_types_index_.modifypercentageexemptionsprocedureargs.md#optional-allowprimaryissuance)
- [symbol](_types_index_.modifypercentageexemptionsprocedureargs.md#symbol)
- [whitelistEntries](_types_index_.modifypercentageexemptionsprocedureargs.md#optional-whitelistentries)

## Properties

### `Optional` allowPrimaryIssuance

• **allowPrimaryIssuance**? : _undefined | false | true_

_Defined in [src/types/index.ts:1239](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/types/index.ts#L1239)_

whether primary issuance is exempted from percentage restrictions.
If true, issuing tokens to a wallet that doesn't own tokens will bypass percentage restrictions

---

### symbol

• **symbol**: _string_

_Defined in [src/types/index.ts:1230](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/types/index.ts#L1230)_

symbol of the Security Token

---

### `Optional` whitelistEntries

• **whitelistEntries**? : _[PercentageWhitelistEntry](_types_index_.percentagewhitelistentry.md)[]_

_Defined in [src/types/index.ts:1234](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/types/index.ts#L1234)_

list of Shareholders to add/remove to/from the whitelist
