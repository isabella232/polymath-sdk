# Interface: IssuanceDataEntry

Specifies how many tokens to issue and who to issue them to

## Hierarchy

- **IssuanceDataEntry**

## Index

### Properties

- [address](_types_index_.issuancedataentry.md#address)
- [amount](_types_index_.issuancedataentry.md#amount)
- [shareholderData](_types_index_.issuancedataentry.md#optional-shareholderdata)

## Properties

### address

• **address**: _string_

_Defined in [src/types/index.ts:83](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/types/index.ts#L83)_

wallet address where Tokens will be received

---

### amount

• **amount**: _BigNumber_

_Defined in [src/types/index.ts:87](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/types/index.ts#L87)_

amount of tokens to be issued

---

### `Optional` shareholderData

• **shareholderData**? : _[Omit](../modules/_types_index_.md#omit)‹[ShareholderDataEntry](_types_index_.shareholderdataentry.md), "address"›_

_Defined in [src/types/index.ts:91](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/types/index.ts#L91)_

KYC data for the Shareholder
