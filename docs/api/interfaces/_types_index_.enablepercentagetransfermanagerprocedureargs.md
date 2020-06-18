# Interface: EnablePercentageTransferManagerProcedureArgs

Arguments for the [EnablePercentageTransferManager](../enums/_types_index_.proceduretype.md#enablepercentagetransfermanager) Procedure

## Hierarchy

* **EnablePercentageTransferManagerProcedureArgs**

## Index

### Properties

* [allowPrimaryIssuance](_types_index_.enablepercentagetransfermanagerprocedureargs.md#optional-allowprimaryissuance)
* [maxHolderPercentage](_types_index_.enablepercentagetransfermanagerprocedureargs.md#maxholderpercentage)
* [symbol](_types_index_.enablepercentagetransfermanagerprocedureargs.md#symbol)

## Properties

### `Optional` allowPrimaryIssuance

• **allowPrimaryIssuance**? : *undefined | false | true*

*Defined in [src/types/index.ts:482](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L482)*

whether primary issuance is exempted from percentage restrictions.
If true, issuing tokens to a wallet that doesn't own tokens will bypass percentage restrictions

___

###  maxHolderPercentage

• **maxHolderPercentage**: *BigNumber*

*Defined in [src/types/index.ts:477](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L477)*

maximum percentage of the total supply a single token holder can hold

___

###  symbol

• **symbol**: *string*

*Defined in [src/types/index.ts:473](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L473)*

symbol of the Security Token
