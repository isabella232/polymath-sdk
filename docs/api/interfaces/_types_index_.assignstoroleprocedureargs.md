# Interface: AssignStoRoleProcedureArgs

Arguments for the [AssignStoRole](../enums/_types_index_.proceduretype.md#assignstorole) Procedure

## Hierarchy

- **AssignStoRoleProcedureArgs**

## Index

### Properties

- [assign](_types_index_.assignstoroleprocedureargs.md#assign)
- [delegateAddress](_types_index_.assignstoroleprocedureargs.md#delegateaddress)
- [description](_types_index_.assignstoroleprocedureargs.md#optional-description)
- [role](_types_index_.assignstoroleprocedureargs.md#role)
- [stoAddress](_types_index_.assignstoroleprocedureargs.md#stoaddress)
- [symbol](_types_index_.assignstoroleprocedureargs.md#symbol)

## Properties

### assign

• **assign**: _boolean_

_Defined in [src/types/index.ts:923](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/types/index.ts#L923)_

whether to assign or revoke the role

---

### delegateAddress

• **delegateAddress**: _string_

_Defined in [src/types/index.ts:914](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/types/index.ts#L914)_

wallet address of the delegate

---

### `Optional` description

• **description**? : _undefined | string_

_Defined in [src/types/index.ts:927](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/types/index.ts#L927)_

description of the delegate (i.e. "company lawyer")

---

### role

• **role**: _[StoRole](../enums/_types_index_.storole.md)_

_Defined in [src/types/index.ts:919](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/types/index.ts#L919)_

role to assign/revoke to/from the delegate

---

### stoAddress

• **stoAddress**: _string_

_Defined in [src/types/index.ts:915](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/types/index.ts#L915)_

---

### symbol

• **symbol**: _string_

_Defined in [src/types/index.ts:910](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/types/index.ts#L910)_

symbol of the Security Token
