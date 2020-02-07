# Interface: ToggleAllowPreIssuingProcedureArgs

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

###  allowPreIssuing

• **allowPreIssuing**: *boolean*

*Defined in [src/types/index.ts:576](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/types/index.ts#L576)*

whether the total amount of Security Tokens that will be sold should be issued at the time the STO starts.
Otherwise, they will be issued on each purchase. Defaults to false

___

###  stoAddress

• **stoAddress**: *string*

*Defined in [src/types/index.ts:567](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/types/index.ts#L567)*

address of the STO

___

###  stoType

• **stoType**: *[StoType](../enums/_types_index_.stotype.md)*

*Defined in [src/types/index.ts:571](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/types/index.ts#L571)*

type of the STO (Simple, Tiered, etc)

___

###  symbol

• **symbol**: *string*

*Defined in [src/types/index.ts:563](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/types/index.ts#L563)*

symbol of the Security Token
