# IssuanceDataEntry

Specifies how many tokens to issue and who to issue them to

## Hierarchy

* **IssuanceDataEntry**

## Index

### Properties

* [address](_types_index_.issuancedataentry.md#address)
* [amount](_types_index_.issuancedataentry.md#amount)
* [tokenholderData](_types_index_.issuancedataentry.md#optional-tokenholderdata)

## Properties

### address

• **address**: _string_

_Defined in_ [_src/types/index.ts:83_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L83)

wallet address where Tokens will be received

### amount

• **amount**: _BigNumber_

_Defined in_ [_src/types/index.ts:87_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L87)

amount of tokens to be issued

### `Optional` tokenholderData

• **tokenholderData**? : [_Omit_](../external-modules/_types_index_.md#omit)_‹_[_TokenholderDataEntry_](_types_index_.tokenholderdataentry.md)_, "address"›_

_Defined in_ [_src/types/index.ts:91_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L91)

KYC data for the Tokenholder

