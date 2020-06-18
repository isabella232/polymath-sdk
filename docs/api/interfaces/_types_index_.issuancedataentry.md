# Interface: IssuanceDataEntry

Specifies how many tokens to issue and who to issue them to

## Hierarchy

* **IssuanceDataEntry**

## Index

### Properties

* [address](_types_index_.issuancedataentry.md#address)
* [amount](_types_index_.issuancedataentry.md#amount)
* [tokenholderData](_types_index_.issuancedataentry.md#optional-tokenholderdata)

## Properties

###  address

• **address**: *string*

*Defined in [src/types/index.ts:83](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/types/index.ts#L83)*

wallet address where Tokens will be received

___

###  amount

• **amount**: *BigNumber*

*Defined in [src/types/index.ts:87](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/types/index.ts#L87)*

amount of tokens to be issued

___

### `Optional` tokenholderData

• **tokenholderData**? : *[Omit](../modules/_types_index_.md#omit)‹[TokenholderDataEntry](_types_index_.tokenholderdataentry.md), "address"›*

*Defined in [src/types/index.ts:91](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/types/index.ts#L91)*

KYC data for the Tokenholder
