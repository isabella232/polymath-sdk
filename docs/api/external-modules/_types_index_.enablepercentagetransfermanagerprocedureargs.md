# EnablePercentageTransferManagerProcedureArgs

Arguments for the [EnablePercentageTransferManager]() Procedure

## Hierarchy

* **EnablePercentageTransferManagerProcedureArgs**

## Index

### Properties

* [allowPrimaryIssuance]()
* [maxHolderPercentage]()
* [symbol]()

## Properties

### `Optional` allowPrimaryIssuance

• **allowPrimaryIssuance**? : _undefined \| false \| true_

_Defined in_ [_src/types/index.ts:482_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L482)

whether primary issuance is exempted from percentage restrictions. If true, issuing tokens to a wallet that doesn't own tokens will bypass percentage restrictions

### maxHolderPercentage

• **maxHolderPercentage**: _BigNumber_

_Defined in_ [_src/types/index.ts:477_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L477)

maximum percentage of the total supply a single token holder can hold

### symbol

• **symbol**: _string_

_Defined in_ [_src/types/index.ts:473_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L473)

symbol of the Security Token

