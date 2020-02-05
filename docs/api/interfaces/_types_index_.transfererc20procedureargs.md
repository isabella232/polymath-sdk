# Interface: TransferErc20ProcedureArgs

Arguments for the [TransferErc20](../enums/_types_index_.proceduretype.md#transfererc20) Procedure

## Hierarchy

- **TransferErc20ProcedureArgs**

## Index

### Properties

- [amount](_types_index_.transfererc20procedureargs.md#amount)
- [receiver](_types_index_.transfererc20procedureargs.md#receiver)
- [tokenAddress](_types_index_.transfererc20procedureargs.md#optional-tokenaddress)

## Properties

### amount

• **amount**: _BigNumber_

_Defined in [src/types/index.ts:303](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/types/index.ts#L303)_

amount of tokens to be transferred

---

### receiver

• **receiver**: _string_

_Defined in [src/types/index.ts:307](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/types/index.ts#L307)_

the receiver of tokens being transferred

---

### `Optional` tokenAddress

• **tokenAddress**? : _undefined | string_

_Defined in [src/types/index.ts:311](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/types/index.ts#L311)_

address of the ERC20 token (defaults to POLY)
