# Interface: AssignSecurityTokenRoleProcedureArgs

Arguments for the [AssignSecurityTokenRole](../enums/_types_index_.proceduretype.md#assignsecuritytokenrole) Procedure

## Hierarchy

* **AssignSecurityTokenRoleProcedureArgs**

## Index

### Properties

* [assign](_types_index_.assignsecuritytokenroleprocedureargs.md#assign)
* [delegateAddress](_types_index_.assignsecuritytokenroleprocedureargs.md#delegateaddress)
* [description](_types_index_.assignsecuritytokenroleprocedureargs.md#description)
* [role](_types_index_.assignsecuritytokenroleprocedureargs.md#role)
* [symbol](_types_index_.assignsecuritytokenroleprocedureargs.md#symbol)

## Properties

###  assign

• **assign**: *boolean*

*Defined in [src/types/index.ts:896](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L896)*

whether to assign or revoke the role

___

###  delegateAddress

• **delegateAddress**: *string*

*Defined in [src/types/index.ts:888](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L888)*

wallet address of the delegate

___

###  description

• **description**: *string*

*Defined in [src/types/index.ts:900](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L900)*

description of the delegate (i.e. "company accountant")

___

###  role

• **role**: *[SecurityTokenRole](../enums/_types_index_.securitytokenrole.md)*

*Defined in [src/types/index.ts:892](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L892)*

role to assign/revoke to/from the delegate

___

###  symbol

• **symbol**: *string*

*Defined in [src/types/index.ts:884](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L884)*

the symbol of the Security Token
