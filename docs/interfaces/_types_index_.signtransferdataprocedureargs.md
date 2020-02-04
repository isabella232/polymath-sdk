[@polymathnetwork/sdk - v2.0.1-beta.120](../README.md) › [Globals](../globals.md) › ["types/index"](../modules/_types_index_.md) › [SignTransferDataProcedureArgs](_types_index_.signtransferdataprocedureargs.md)

# Interface: SignTransferDataProcedureArgs

Arguments for the [SignTransferData](../enums/_types_index_.proceduretype.md#signtransferdata) Procedure

## Hierarchy

- **SignTransferDataProcedureArgs**

## Index

### Properties

- [kycData](_types_index_.signtransferdataprocedureargs.md#kycdata)
- [symbol](_types_index_.signtransferdataprocedureargs.md#symbol)
- [validFrom](_types_index_.signtransferdataprocedureargs.md#validfrom)
- [validTo](_types_index_.signtransferdataprocedureargs.md#validto)

## Properties

### kycData

• **kycData**: _[Omit](../modules/_types_index_.md#omit)‹[Omit](../modules/_types_index_.md#omit)‹[ShareholderDataEntry](_types_index_.shareholderdataentry.md), "isAccredited"›, "canBuyFromSto"›[]_

_Defined in [src/types/index.ts:1293](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/types/index.ts#L1293)_

KYC data to sign

---

### symbol

• **symbol**: _string_

_Defined in [src/types/index.ts:1289](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/types/index.ts#L1289)_

symbol of the Security Token

---

### validFrom

• **validFrom**: _Date_

_Defined in [src/types/index.ts:1297](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/types/index.ts#L1297)_

date from which the signature is valid

---

### validTo

• **validTo**: _Date_

_Defined in [src/types/index.ts:1301](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/types/index.ts#L1301)_

date until which the signature is valid
