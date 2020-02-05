# Interface: AssignSecurityTokenRoleProcedureArgs

Arguments for the [AssignSecurityTokenRole](../enums/_types_index_.proceduretype.md#assignsecuritytokenrole) Procedure

## Hierarchy

- **AssignSecurityTokenRoleProcedureArgs**

## Index

### Properties

- [assign](_types_index_.assignsecuritytokenroleprocedureargs.md#assign)
- [delegateAddress](_types_index_.assignsecuritytokenroleprocedureargs.md#delegateaddress)
- [description](_types_index_.assignsecuritytokenroleprocedureargs.md#description)
- [role](_types_index_.assignsecuritytokenroleprocedureargs.md#role)
- [symbol](_types_index_.assignsecuritytokenroleprocedureargs.md#symbol)

## Properties

### assign

• **assign**: _boolean_

_Defined in [src/types/index.ts:896](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/types/index.ts#L896)_

whether to assign or revoke the role

---

### delegateAddress

• **delegateAddress**: _string_

_Defined in [src/types/index.ts:888](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/types/index.ts#L888)_

wallet address of the delegate

---

### description

• **description**: _string_

_Defined in [src/types/index.ts:900](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/types/index.ts#L900)_

description of the delegate (i.e. "company accountant")

---

### role

• **role**: _[SecurityTokenRole](../enums/_types_index_.securitytokenrole.md)_

_Defined in [src/types/index.ts:892](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/types/index.ts#L892)_

role to assign/revoke to/from the delegate

---

### symbol

• **symbol**: _string_

_Defined in [src/types/index.ts:884](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/types/index.ts#L884)_

the symbol of the Security Token
