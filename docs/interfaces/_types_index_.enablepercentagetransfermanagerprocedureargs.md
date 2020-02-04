[@polymathnetwork/sdk - v2.0.1-beta.120](../README.md) › [Globals](../globals.md) › ["types/index"](../modules/_types_index_.md) › [EnablePercentageTransferManagerProcedureArgs](_types_index_.enablepercentagetransfermanagerprocedureargs.md)

# Interface: EnablePercentageTransferManagerProcedureArgs

Arguments for the [EnablePercentageTransferManager](../enums/_types_index_.proceduretype.md#enablepercentagetransfermanager) Procedure

## Hierarchy

- **EnablePercentageTransferManagerProcedureArgs**

## Index

### Properties

- [allowPrimaryIssuance](_types_index_.enablepercentagetransfermanagerprocedureargs.md#optional-allowprimaryissuance)
- [maxHolderPercentage](_types_index_.enablepercentagetransfermanagerprocedureargs.md#maxholderpercentage)
- [symbol](_types_index_.enablepercentagetransfermanagerprocedureargs.md#symbol)

## Properties

### `Optional` allowPrimaryIssuance

• **allowPrimaryIssuance**? : _undefined | false | true_

_Defined in [src/types/index.ts:482](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/types/index.ts#L482)_

whether primary issuance is exempted from percentage restrictions.
If true, issuing tokens to a wallet that doesn't own tokens will bypass percentage restrictions

---

### maxHolderPercentage

• **maxHolderPercentage**: _BigNumber_

_Defined in [src/types/index.ts:477](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/types/index.ts#L477)_

maximum percentage of the total supply a single token holder can hold

---

### symbol

• **symbol**: _string_

_Defined in [src/types/index.ts:473](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/types/index.ts#L473)_

symbol of the Security Token
