# Interface: TokenholderDataEntry

A Tokenholder's KYC data

## Hierarchy

* **TokenholderDataEntry**

## Index

### Properties

* [address](_types_index_.tokenholderdataentry.md#address)
* [canBuyFromSto](_types_index_.tokenholderdataentry.md#canbuyfromsto)
* [canReceiveAfter](_types_index_.tokenholderdataentry.md#canreceiveafter)
* [canSendAfter](_types_index_.tokenholderdataentry.md#cansendafter)
* [isAccredited](_types_index_.tokenholderdataentry.md#isaccredited)
* [kycExpiry](_types_index_.tokenholderdataentry.md#kycexpiry)

## Properties

###  address

• **address**: *string*

*Defined in [src/types/index.ts:1130](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L1130)*

tokenholder wallet address to whitelist

___

###  canBuyFromSto

• **canBuyFromSto**: *boolean*

*Defined in [src/types/index.ts:1150](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L1150)*

whether the tokenholder is allowed to purchase tokens in an STO

___

###  canReceiveAfter

• **canReceiveAfter**: *Date*

*Defined in [src/types/index.ts:1138](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L1138)*

date from which the tokenholder can receive tokens

___

###  canSendAfter

• **canSendAfter**: *Date*

*Defined in [src/types/index.ts:1134](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L1134)*

date from which the tokenholder can transfer tokens

___

###  isAccredited

• **isAccredited**: *boolean*

*Defined in [src/types/index.ts:1146](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L1146)*

whether the tokenholder is accredited

___

###  kycExpiry

• **kycExpiry**: *Date*

*Defined in [src/types/index.ts:1142](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L1142)*

date at which the tokenholder's KYC expires
