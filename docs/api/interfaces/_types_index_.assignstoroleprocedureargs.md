# Interface: AssignStoRoleProcedureArgs

Arguments for the [AssignStoRole](../enums/_types_index_.proceduretype.md#assignstorole) Procedure

## Hierarchy

* **AssignStoRoleProcedureArgs**

## Index

### Properties

* [assign](_types_index_.assignstoroleprocedureargs.md#assign)
* [delegateAddress](_types_index_.assignstoroleprocedureargs.md#delegateaddress)
* [description](_types_index_.assignstoroleprocedureargs.md#optional-description)
* [role](_types_index_.assignstoroleprocedureargs.md#role)
* [stoAddress](_types_index_.assignstoroleprocedureargs.md#stoaddress)
* [symbol](_types_index_.assignstoroleprocedureargs.md#symbol)

## Properties

###  assign

• **assign**: *boolean*

*Defined in [src/types/index.ts:923](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L923)*

whether to assign or revoke the role

___

###  delegateAddress

• **delegateAddress**: *string*

*Defined in [src/types/index.ts:914](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L914)*

wallet address of the delegate

___

### `Optional` description

• **description**? : *undefined | string*

*Defined in [src/types/index.ts:927](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L927)*

description of the delegate (i.e. "company lawyer")

___

###  role

• **role**: *[StoRole](../enums/_types_index_.storole.md)*

*Defined in [src/types/index.ts:919](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L919)*

role to assign/revoke to/from the delegate

___

###  stoAddress

• **stoAddress**: *string*

*Defined in [src/types/index.ts:915](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L915)*

___

###  symbol

• **symbol**: *string*

*Defined in [src/types/index.ts:910](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L910)*

symbol of the Security Token
