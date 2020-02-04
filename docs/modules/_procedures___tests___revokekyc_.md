[@polymathnetwork/sdk - v2.0.1-beta.120](../README.md) › [Globals](../globals.md) › ["procedures/**tests**/RevokeKyc"](_procedures___tests___revokekyc_.md)

# External module: "procedures/**tests**/RevokeKyc"

## Index

### Variables

- [oldShareholdersData](_procedures___tests___revokekyc_.md#const-oldshareholdersdata)
- [testAddress](_procedures___tests___revokekyc_.md#const-testaddress)
- [testAddress2](_procedures___tests___revokekyc_.md#const-testaddress2)

### Object literals

- [params](_procedures___tests___revokekyc_.md#const-params)

## Variables

### `Const` oldShareholdersData

• **oldShareholdersData**: _[Shareholder](../classes/_entities_shareholder_.shareholder.md)[]_ = [
new Shareholder({
address: testAddress,
canSendAfter: new Date(1980, 1),
canReceiveAfter: new Date(1980, 1),
kycExpiry: new Date(2035, 1),
canBuyFromSto: true,
isAccredited: true,
securityTokenId: 'Id',
securityTokenSymbol: params.symbol,
balance: new BigNumber(1),
}),
new Shareholder({
address: testAddress2,
canSendAfter: new Date(1980, 1),
canReceiveAfter: new Date(1980, 1),
kycExpiry: new Date(2035, 1),
canBuyFromSto: true,
isAccredited: true,
securityTokenId: 'Id',
securityTokenSymbol: params.symbol,
balance: new BigNumber(1),
}),
]

_Defined in [src/procedures/**tests**/RevokeKyc.ts:31](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/procedures/__tests__/RevokeKyc.ts#L31)_

---

### `Const` testAddress

• **testAddress**: _"0x6666666666666666666666666666666666666666"_ = "0x6666666666666666666666666666666666666666"

_Defined in [src/procedures/**tests**/RevokeKyc.ts:23](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/procedures/__tests__/RevokeKyc.ts#L23)_

---

### `Const` testAddress2

• **testAddress2**: _"0x9999999999999999999999999999999999999999"_ = "0x9999999999999999999999999999999999999999"

_Defined in [src/procedures/**tests**/RevokeKyc.ts:24](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/procedures/__tests__/RevokeKyc.ts#L24)_

## Object literals

### `Const` params

### ▪ **params**: _object_

_Defined in [src/procedures/**tests**/RevokeKyc.ts:26](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/procedures/__tests__/RevokeKyc.ts#L26)_

### shareholderAddresses

• **shareholderAddresses**: _string[]_ = [testAddress, testAddress2]

_Defined in [src/procedures/**tests**/RevokeKyc.ts:28](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/procedures/__tests__/RevokeKyc.ts#L28)_

### symbol

• **symbol**: _string_ = "TEST1"

_Defined in [src/procedures/**tests**/RevokeKyc.ts:27](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/procedures/__tests__/RevokeKyc.ts#L27)_
