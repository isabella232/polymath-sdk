# Interface: TransferSecurityTokensProcedureArgs

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

###  amount

• **amount**: *BigNumber*

*Defined in [src/types/index.ts:1257](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/types/index.ts#L1257)*

amount of tokens being transferred

___

### `Optional` data

• **data**? : *undefined | string*

*Defined in [src/types/index.ts:1261](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/types/index.ts#L1261)*

signed KYC data that will be considered (and applied to the Security Token) when checking for transfer restrictions

___

### `Optional` from

• **from**? : *undefined | string*

*Defined in [src/types/index.ts:1265](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/types/index.ts#L1265)*

wallet address sending Security Tokens. Defaults to the current wallet

___

###  symbol

• **symbol**: *string*

*Defined in [src/types/index.ts:1249](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/types/index.ts#L1249)*

symbol of the Security Token

___

###  to

• **to**: *string*

*Defined in [src/types/index.ts:1253](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/types/index.ts#L1253)*

wallet address receiving Security Tokens
