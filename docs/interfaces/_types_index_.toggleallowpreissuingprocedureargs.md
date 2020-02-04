[@polymathnetwork/sdk - v2.0.1-beta.120](../README.md) › [Globals](../globals.md) › ["types/index"](../modules/_types_index_.md) › [ToggleAllowPreIssuingProcedureArgs](_types_index_.toggleallowpreissuingprocedureargs.md)

# Interface: ToggleAllowPreIssuingProcedureArgs

Arguments for the [ToggleAllowPreIssuing](../enums/_types_index_.proceduretype.md#toggleallowpreissuing) Procedure

## Hierarchy

- **ToggleAllowPreIssuingProcedureArgs**

## Index

### Properties

- [allowPreIssuing](_types_index_.toggleallowpreissuingprocedureargs.md#allowpreissuing)
- [stoAddress](_types_index_.toggleallowpreissuingprocedureargs.md#stoaddress)
- [stoType](_types_index_.toggleallowpreissuingprocedureargs.md#stotype)
- [symbol](_types_index_.toggleallowpreissuingprocedureargs.md#symbol)

## Properties

### allowPreIssuing

• **allowPreIssuing**: _boolean_

_Defined in [src/types/index.ts:576](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/types/index.ts#L576)_

whether the total amount of Security Tokens that will be sold should be issued at the time the STO starts.
Otherwise, they will be issued on each purchase. Defaults to false

---

### stoAddress

• **stoAddress**: _string_

_Defined in [src/types/index.ts:567](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/types/index.ts#L567)_

address of the STO

---

### stoType

• **stoType**: _[StoType](../enums/_types_index_.stotype.md)_

_Defined in [src/types/index.ts:571](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/types/index.ts#L571)_

type of the STO (Simple, Tiered, etc)

---

### symbol

• **symbol**: _string_

_Defined in [src/types/index.ts:563](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/types/index.ts#L563)_

symbol of the Security Token
