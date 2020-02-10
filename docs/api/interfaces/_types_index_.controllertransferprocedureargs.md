# Interface: ControllerTransferProcedureArgs

Arguments for the [ControllerTransfer](../enums/_types_index_.proceduretype.md#controllertransfer) Procedure

## Hierarchy

* **ControllerTransferProcedureArgs**

## Index

### Properties

* [amount](_types_index_.controllertransferprocedureargs.md#amount)
* [data](_types_index_.controllertransferprocedureargs.md#optional-data)
* [from](_types_index_.controllertransferprocedureargs.md#from)
* [log](_types_index_.controllertransferprocedureargs.md#optional-log)
* [symbol](_types_index_.controllertransferprocedureargs.md#symbol)
* [to](_types_index_.controllertransferprocedureargs.md#to)

## Properties

###  amount

• **amount**: *BigNumber*

*Defined in [src/types/index.ts:949](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/types/index.ts#L949)*

amount of tokens being forcefully transferred

___

### `Optional` data

• **data**? : *undefined | string*

*Defined in [src/types/index.ts:953](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/types/index.ts#L953)*

extra KYC transfer data

___

###  from

• **from**: *string*

*Defined in [src/types/index.ts:937](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/types/index.ts#L937)*

sender's wallet address

___

### `Optional` log

• **log**? : *undefined | string*

*Defined in [src/types/index.ts:957](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/types/index.ts#L957)*

extra log information

___

###  symbol

• **symbol**: *string*

*Defined in [src/types/index.ts:945](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/types/index.ts#L945)*

symbol of the Security Token

___

###  to

• **to**: *string*

*Defined in [src/types/index.ts:941](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/types/index.ts#L941)*

receiver's wallet address
