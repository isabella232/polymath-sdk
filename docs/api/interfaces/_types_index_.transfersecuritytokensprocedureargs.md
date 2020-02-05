# Interface: TransferSecurityTokensProcedureArgs

Arguments for the [TransferSecurityTokens](../enums/_types_index_.proceduretype.md#transfersecuritytokens) Procedure

## Hierarchy

- **TransferSecurityTokensProcedureArgs**

## Index

### Properties

- [amount](_types_index_.transfersecuritytokensprocedureargs.md#amount)
- [data](_types_index_.transfersecuritytokensprocedureargs.md#optional-data)
- [from](_types_index_.transfersecuritytokensprocedureargs.md#optional-from)
- [symbol](_types_index_.transfersecuritytokensprocedureargs.md#symbol)
- [to](_types_index_.transfersecuritytokensprocedureargs.md#to)

## Properties

### amount

• **amount**: _BigNumber_

_Defined in [src/types/index.ts:1257](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/types/index.ts#L1257)_

amount of tokens being transferred

---

### `Optional` data

• **data**? : _undefined | string_

_Defined in [src/types/index.ts:1261](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/types/index.ts#L1261)_

signed KYC data that will be considered (and applied to the Security Token) when checking for transfer restrictions

---

### `Optional` from

• **from**? : _undefined | string_

_Defined in [src/types/index.ts:1265](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/types/index.ts#L1265)_

wallet address sending Security Tokens. Defaults to the current wallet

---

### symbol

• **symbol**: _string_

_Defined in [src/types/index.ts:1249](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/types/index.ts#L1249)_

symbol of the Security Token

---

### to

• **to**: _string_

_Defined in [src/types/index.ts:1253](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/types/index.ts#L1253)_

wallet address receiving Security Tokens
