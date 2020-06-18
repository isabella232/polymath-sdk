# Interface: TransferErc20ProcedureArgs

Arguments for the [TransferErc20](../enums/_types_index_.proceduretype.md#transfererc20) Procedure

## Hierarchy

* **TransferErc20ProcedureArgs**

## Index

### Properties

* [amount](_types_index_.transfererc20procedureargs.md#amount)
* [receiver](_types_index_.transfererc20procedureargs.md#receiver)
* [tokenAddress](_types_index_.transfererc20procedureargs.md#optional-tokenaddress)

## Properties

###  amount

• **amount**: *BigNumber*

*Defined in [src/types/index.ts:303](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/types/index.ts#L303)*

amount of tokens to be transferred

___

###  receiver

• **receiver**: *string*

*Defined in [src/types/index.ts:307](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/types/index.ts#L307)*

the receiver of tokens being transferred

___

### `Optional` tokenAddress

• **tokenAddress**? : *undefined | string*

*Defined in [src/types/index.ts:311](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/types/index.ts#L311)*

address of the ERC20 token (defaults to POLY)
