# Interface: FutureLowLevelMethod <**T, U**>

Represents a contract method that doesn't exist yet but will exist
once a certain post transaction resolver is resolved

## Type parameters

▪ **T**

type of the value that will be resolved by the post transaction resolver

▪ **U**

type of the arguments object that the future method will accept

## Hierarchy

- **FutureLowLevelMethod**

## Index

### Properties

- [futureMethod](_types_index_.futurelowlevelmethod.md#futuremethod)
- [futureValue](_types_index_.futurelowlevelmethod.md#futurevalue)

## Properties

### futureMethod

• **futureMethod**: _function_

_Defined in [src/types/index.ts:1519](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/types/index.ts#L1519)_

function that returns a low level method

#### Type declaration:

▸ (`resolvedValue`: T): _Promise‹[LowLevelMethod](../modules/_types_index_.md#lowlevelmethod)‹U››_

**Parameters:**

| Name            | Type |
| --------------- | ---- |
| `resolvedValue` | T    |

---

### futureValue

• **futureValue**: _PostTransactionResolver‹T›_

_Defined in [src/types/index.ts:1523](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/types/index.ts#L1523)_

post transaction resolver that resolves into the value that is passed to the future method
