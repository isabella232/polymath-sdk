# Interface: SignTransferDataProcedureArgs

Arguments for the [SignTransferData](../enums/_types_index_.proceduretype.md#signtransferdata) Procedure

## Hierarchy

* **SignTransferDataProcedureArgs**

## Index

### Properties

* [kycData](_types_index_.signtransferdataprocedureargs.md#kycdata)
* [symbol](_types_index_.signtransferdataprocedureargs.md#symbol)
* [validFrom](_types_index_.signtransferdataprocedureargs.md#validfrom)
* [validTo](_types_index_.signtransferdataprocedureargs.md#validto)

## Properties

###  kycData

• **kycData**: *[Omit](../modules/_types_index_.md#omit)‹[Omit](../modules/_types_index_.md#omit)‹[ShareholderDataEntry](_types_index_.shareholderdataentry.md), "isAccredited"›, "canBuyFromSto"›[]*

*Defined in [src/types/index.ts:1293](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/types/index.ts#L1293)*

KYC data to sign

___

###  symbol

• **symbol**: *string*

*Defined in [src/types/index.ts:1289](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/types/index.ts#L1289)*

symbol of the Security Token

___

###  validFrom

• **validFrom**: *Date*

*Defined in [src/types/index.ts:1297](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/types/index.ts#L1297)*

date from which the signature is valid

___

###  validTo

• **validTo**: *Date*

*Defined in [src/types/index.ts:1301](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/types/index.ts#L1301)*

date until which the signature is valid
