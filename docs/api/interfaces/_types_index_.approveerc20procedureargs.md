# Interface: ApproveErc20ProcedureArgs

Arguments for the [ApproveErc20](../enums/_types_index_.proceduretype.md#approveerc20) Procedure

## Hierarchy

* **ApproveErc20ProcedureArgs**

## Index

### Properties

* [amount](_types_index_.approveerc20procedureargs.md#amount)
* [spender](_types_index_.approveerc20procedureargs.md#spender)
* [tokenAddress](_types_index_.approveerc20procedureargs.md#optional-tokenaddress)

## Properties

###  amount

• **amount**: *BigNumber*

*Defined in [src/types/index.ts:285](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/types/index.ts#L285)*

amount of tokens to be approved

___

###  spender

• **spender**: *string*

*Defined in [src/types/index.ts:289](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/types/index.ts#L289)*

the spender of the tokens being approved

___

### `Optional` tokenAddress

• **tokenAddress**? : *undefined | string*

*Defined in [src/types/index.ts:293](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/types/index.ts#L293)*

address of the ERC20 token (defaults to POLY)
