# TransactionSpec

Schema of a specific transaction

## Type parameters

▪ **Args**

▪ **Value**: _any\[\]_

▪ **Receipt**: _any_

▪ **FutureValue**: _any_

## Hierarchy

* **TransactionSpec**

## Index

### Properties

* [args](_types_index_.transactionspec.md#args)
* [method](_types_index_.transactionspec.md#method)
* [postTransactionResolvers](_types_index_.transactionspec.md#optional-posttransactionresolvers)
* [tag](_types_index_.transactionspec.md#optional-tag)

## Properties

### args

• **args**: [_MapMaybeResolver_](../external-modules/_types_index_.md#mapmayberesolver)_‹Args›_

_Defined in_ [_src/types/index.ts:1562_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L1562)

### method

• **method**: [_LowLevelMethod_](../external-modules/_types_index_.md#lowlevelmethod)_‹Args› \|_ [_SignatureRequest_](../external-modules/_types_index_.md#signaturerequest)_‹Args› \|_ [_FutureLowLevelMethod_](_types_index_.futurelowlevelmethod.md)_‹FutureValue, Args›_

_Defined in_ [_src/types/index.ts:1561_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L1561)

### `Optional` postTransactionResolvers

• **postTransactionResolvers**? : [_PostTransactionResolverArray_](../external-modules/_types_index_.md#posttransactionresolverarray)_‹Value, Receipt›_

_Defined in_ [_src/types/index.ts:1563_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L1563)

### `Optional` tag

• **tag**? : [_PolyTransactionTag_](../enums/_types_index_.polytransactiontag.md)

_Defined in_ [_src/types/index.ts:1564_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L1564)

