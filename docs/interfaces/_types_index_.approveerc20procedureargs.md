[@polymathnetwork/sdk - v2.0.1-beta.120](../README.md) › [Globals](../globals.md) › ["types/index"](../modules/_types_index_.md) › [ApproveErc20ProcedureArgs](_types_index_.approveerc20procedureargs.md)

# Interface: ApproveErc20ProcedureArgs

Arguments for the [ApproveErc20](../enums/_types_index_.proceduretype.md#approveerc20) Procedure

## Hierarchy

- **ApproveErc20ProcedureArgs**

## Index

### Properties

- [amount](_types_index_.approveerc20procedureargs.md#amount)
- [spender](_types_index_.approveerc20procedureargs.md#spender)
- [tokenAddress](_types_index_.approveerc20procedureargs.md#optional-tokenaddress)

## Properties

### amount

• **amount**: _BigNumber_

_Defined in [src/types/index.ts:285](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/types/index.ts#L285)_

amount of tokens to be approved

---

### spender

• **spender**: _string_

_Defined in [src/types/index.ts:289](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/types/index.ts#L289)_

the spender of the tokens being approved

---

### `Optional` tokenAddress

• **tokenAddress**? : _undefined | string_

_Defined in [src/types/index.ts:293](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/types/index.ts#L293)_

address of the ERC20 token (defaults to POLY)
