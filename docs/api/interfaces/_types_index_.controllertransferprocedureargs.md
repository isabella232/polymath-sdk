# Interface: ControllerTransferProcedureArgs

Arguments for the [ControllerTransfer](../enums/_types_index_.proceduretype.md#controllertransfer) Procedure

## Hierarchy

- **ControllerTransferProcedureArgs**

## Index

### Properties

- [amount](_types_index_.controllertransferprocedureargs.md#amount)
- [data](_types_index_.controllertransferprocedureargs.md#optional-data)
- [from](_types_index_.controllertransferprocedureargs.md#from)
- [log](_types_index_.controllertransferprocedureargs.md#optional-log)
- [symbol](_types_index_.controllertransferprocedureargs.md#symbol)
- [to](_types_index_.controllertransferprocedureargs.md#to)

## Properties

### amount

• **amount**: _BigNumber_

_Defined in [src/types/index.ts:949](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/types/index.ts#L949)_

amount of tokens being forcefully transferred

---

### `Optional` data

• **data**? : _undefined | string_

_Defined in [src/types/index.ts:953](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/types/index.ts#L953)_

extra KYC transfer data

---

### from

• **from**: _string_

_Defined in [src/types/index.ts:937](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/types/index.ts#L937)_

sender's wallet address

---

### `Optional` log

• **log**? : _undefined | string_

_Defined in [src/types/index.ts:957](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/types/index.ts#L957)_

extra log information

---

### symbol

• **symbol**: _string_

_Defined in [src/types/index.ts:945](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/types/index.ts#L945)_

symbol of the Security Token

---

### to

• **to**: _string_

_Defined in [src/types/index.ts:941](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/types/index.ts#L941)_

receiver's wallet address
