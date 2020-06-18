# TransferSecurityTokensProcedureArgs

Arguments for the [TransferSecurityTokens](../enums/_types_index_.proceduretype.md#transfersecuritytokens) Procedure

## Hierarchy

* **TransferSecurityTokensProcedureArgs**

## Index

### Properties

* [amount](_types_index_.transfersecuritytokensprocedureargs.md#amount)
* [data](_types_index_.transfersecuritytokensprocedureargs.md#optional-data)
* [from](_types_index_.transfersecuritytokensprocedureargs.md#optional-from)
* [symbol](_types_index_.transfersecuritytokensprocedureargs.md#symbol)
* [to](_types_index_.transfersecuritytokensprocedureargs.md#to)

## Properties

### amount

• **amount**: _BigNumber_

_Defined in_ [_src/types/index.ts:1257_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L1257)

amount of tokens being transferred

### `Optional` data

• **data**? : _undefined \| string_

_Defined in_ [_src/types/index.ts:1261_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L1261)

signed KYC data that will be considered \(and applied to the Security Token\) when checking for transfer restrictions

### `Optional` from

• **from**? : _undefined \| string_

_Defined in_ [_src/types/index.ts:1265_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L1265)

wallet address sending Security Tokens. Defaults to the current wallet

### symbol

• **symbol**: _string_

_Defined in_ [_src/types/index.ts:1249_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L1249)

symbol of the Security Token

### to

• **to**: _string_

_Defined in_ [_src/types/index.ts:1253_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L1253)

wallet address receiving Security Tokens

