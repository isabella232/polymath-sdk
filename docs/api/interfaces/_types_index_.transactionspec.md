# Interface: TransactionSpec <**Args, Value, Receipt, FutureValue**>

Schema of a specific transaction

## Type parameters

▪ **Args**

▪ **Value**: *any[]*

▪ **Receipt**: *any*

▪ **FutureValue**: *any*

## Hierarchy

* **TransactionSpec**

## Index

### Properties

* [args](_types_index_.transactionspec.md#args)
* [method](_types_index_.transactionspec.md#method)
* [postTransactionResolvers](_types_index_.transactionspec.md#optional-posttransactionresolvers)
* [tag](_types_index_.transactionspec.md#optional-tag)

## Properties

###  args

• **args**: *[MapMaybeResolver](../modules/_types_index_.md#mapmayberesolver)‹Args›*

*Defined in [src/types/index.ts:1562](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L1562)*

___

###  method

• **method**: *[LowLevelMethod](../modules/_types_index_.md#lowlevelmethod)‹Args› | [SignatureRequest](../modules/_types_index_.md#signaturerequest)‹Args› | [FutureLowLevelMethod](_types_index_.futurelowlevelmethod.md)‹FutureValue, Args›*

*Defined in [src/types/index.ts:1561](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L1561)*

___

### `Optional` postTransactionResolvers

• **postTransactionResolvers**? : *[PostTransactionResolverArray](../modules/_types_index_.md#posttransactionresolverarray)‹Value, Receipt›*

*Defined in [src/types/index.ts:1563](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L1563)*

___

### `Optional` tag

• **tag**? : *[PolyTransactionTag](../enums/_types_index_.polytransactiontag.md)*

*Defined in [src/types/index.ts:1564](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L1564)*
