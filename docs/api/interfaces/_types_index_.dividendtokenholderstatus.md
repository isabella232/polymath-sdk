# Interface: DividendTokenholderStatus

Status of a Tokenholder in regards to a Dividend Distribution

## Hierarchy

* **DividendTokenholderStatus**

## Index

### Properties

* [address](_types_index_.dividendtokenholderstatus.md#address)
* [amountReceived](_types_index_.dividendtokenholderstatus.md#amountreceived)
* [balance](_types_index_.dividendtokenholderstatus.md#balance)
* [excluded](_types_index_.dividendtokenholderstatus.md#excluded)
* [paymentReceived](_types_index_.dividendtokenholderstatus.md#paymentreceived)
* [withheldTax](_types_index_.dividendtokenholderstatus.md#withheldtax)

## Properties

###  address

• **address**: *string*

*Defined in [src/types/index.ts:27](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/types/index.ts#L27)*

wallet address of the Tokenholder

___

###  amountReceived

• **amountReceived**: *BigNumber*

*Defined in [src/types/index.ts:43](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/types/index.ts#L43)*

the amount of tokens the Tokenholder has received as Dividend payment

___

###  balance

• **balance**: *BigNumber*

*Defined in [src/types/index.ts:47](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/types/index.ts#L47)*

the balance of the Tokenholder

___

###  excluded

• **excluded**: *boolean*

*Defined in [src/types/index.ts:35](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/types/index.ts#L35)*

whether the Tokenholder is excluded from the Dividend distribution

___

###  paymentReceived

• **paymentReceived**: *boolean*

*Defined in [src/types/index.ts:31](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/types/index.ts#L31)*

whether the Tokenholder has received payment

___

###  withheldTax

• **withheldTax**: *BigNumber*

*Defined in [src/types/index.ts:39](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/types/index.ts#L39)*

amount of tokens withheld for tax purposes
