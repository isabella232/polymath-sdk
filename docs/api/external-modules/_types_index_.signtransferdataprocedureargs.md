# SignTransferDataProcedureArgs

Arguments for the [SignTransferData](../enums/_types_index_.proceduretype.md#signtransferdata) Procedure

## Hierarchy

* **SignTransferDataProcedureArgs**

## Index

### Properties

* [kycData](../interfaces/_types_index_.signtransferdataprocedureargs.md#kycdata)
* [symbol](../interfaces/_types_index_.signtransferdataprocedureargs.md#symbol)
* [validFrom](../interfaces/_types_index_.signtransferdataprocedureargs.md#validfrom)
* [validTo](../interfaces/_types_index_.signtransferdataprocedureargs.md#validto)

## Properties

### kycData

• **kycData**: [_Omit_](_types_index_.md#omit)_‹_[_Omit_](_types_index_.md#omit)_‹_[_TokenholderDataEntry_](../interfaces/_types_index_.tokenholderdataentry.md)_, "isAccredited"›, "canBuyFromSto"›\[\]_

_Defined in_ [_src/types/index.ts:1293_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L1293)

KYC data to sign

### symbol

• **symbol**: _string_

_Defined in_ [_src/types/index.ts:1289_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L1289)

symbol of the Security Token

### validFrom

• **validFrom**: _Date_

_Defined in_ [_src/types/index.ts:1297_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L1297)

date from which the signature is valid

### validTo

• **validTo**: _Date_

_Defined in_ [_src/types/index.ts:1301_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L1301)

date until which the signature is valid

