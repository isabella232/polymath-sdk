# ToggleAllowPreIssuingProcedureArgs

Arguments for the [ToggleAllowPreIssuing](../enums/_types_index_.proceduretype.md#toggleallowpreissuing) Procedure

## Hierarchy

* **ToggleAllowPreIssuingProcedureArgs**

## Index

### Properties

* [allowPreIssuing](_types_index_.toggleallowpreissuingprocedureargs.md#allowpreissuing)
* [stoAddress](_types_index_.toggleallowpreissuingprocedureargs.md#stoaddress)
* [stoType](_types_index_.toggleallowpreissuingprocedureargs.md#stotype)
* [symbol](_types_index_.toggleallowpreissuingprocedureargs.md#symbol)

## Properties

### allowPreIssuing

• **allowPreIssuing**: _boolean_

_Defined in_ [_src/types/index.ts:576_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L576)

whether the total amount of Security Tokens that will be sold should be issued at the time the STO starts. Otherwise, they will be issued on each purchase. Defaults to false

### stoAddress

• **stoAddress**: _string_

_Defined in_ [_src/types/index.ts:567_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L567)

address of the STO

### stoType

• **stoType**: [_StoType_](../enums/_types_index_.stotype.md)

_Defined in_ [_src/types/index.ts:571_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L571)

type of the STO \(Simple, Tiered, etc\)

### symbol

• **symbol**: _string_

_Defined in_ [_src/types/index.ts:563_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L563)

symbol of the Security Token

