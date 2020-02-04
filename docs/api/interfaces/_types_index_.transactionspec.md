# Interface: TransactionSpec <**Args, Value, Receipt, FutureValue**>

Schema of a specific transaction

## Type parameters

▪ **Args**

▪ **Value**: _any[]_

▪ **Receipt**: _any_

▪ **FutureValue**: _any_

## Hierarchy

- **TransactionSpec**

## Index

### Properties

- [args](_types_index_.transactionspec.md#args)
- [method](_types_index_.transactionspec.md#method)
- [postTransactionResolvers](_types_index_.transactionspec.md#optional-posttransactionresolvers)
- [tag](_types_index_.transactionspec.md#optional-tag)

## Properties

### args

• **args**: _[MapMaybeResolver](../modules/_types_index_.md#mapmayberesolver)‹Args›_

_Defined in [src/types/index.ts:1562](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/types/index.ts#L1562)_

---

### method

• **method**: _[LowLevelMethod](../modules/_types_index_.md#lowlevelmethod)‹Args› | [SignatureRequest](../modules/_types_index_.md#signaturerequest)‹Args› | [FutureLowLevelMethod](_types_index_.futurelowlevelmethod.md)‹FutureValue, Args›_

_Defined in [src/types/index.ts:1561](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/types/index.ts#L1561)_

---

### `Optional` postTransactionResolvers

• **postTransactionResolvers**? : _[PostTransactionResolverArray](../modules/_types_index_.md#posttransactionresolverarray)‹Value, Receipt›_

_Defined in [src/types/index.ts:1563](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/types/index.ts#L1563)_

---

### `Optional` tag

• **tag**? : _[PolyTransactionTag](../enums/_types_index_.polytransactiontag.md)_

_Defined in [src/types/index.ts:1564](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/types/index.ts#L1564)_
