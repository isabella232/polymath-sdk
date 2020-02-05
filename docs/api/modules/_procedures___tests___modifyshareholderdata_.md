# External module: "procedures/**tests**/ModifyShareholderData"

## Index

### Variables

- [oldShareholdersData](_procedures___tests___modifyshareholderdata_.md#const-oldshareholdersdata)
- [testAddress](_procedures___tests___modifyshareholderdata_.md#const-testaddress)
- [testAddress2](_procedures___tests___modifyshareholderdata_.md#const-testaddress2)

### Object literals

- [params](_procedures___tests___modifyshareholderdata_.md#const-params)

## Variables

### `Const` oldShareholdersData

• **oldShareholdersData**: _object[]_ = [
{
address: testAddress,
canSendAfter: new Date(1980, 1),
canReceiveAfter: new Date(1980, 1),
kycExpiry: new Date(2035, 1),
canBuyFromSto: false,
isAccredited: false,
},
{
address: testAddress2,
canSendAfter: new Date(1980, 1),
canReceiveAfter: new Date(1980, 1),
kycExpiry: new Date(2035, 1),
canBuyFromSto: false,
isAccredited: false,
},
]

_Defined in [src/procedures/**tests**/ModifyShareholderData.ts:25](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/procedures/__tests__/ModifyShareholderData.ts#L25)_

---

### `Const` testAddress

• **testAddress**: _"0x6666666666666666666666666666666666666666"_ = "0x6666666666666666666666666666666666666666"

_Defined in [src/procedures/**tests**/ModifyShareholderData.ts:23](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/procedures/__tests__/ModifyShareholderData.ts#L23)_

---

### `Const` testAddress2

• **testAddress2**: _"0x9999999999999999999999999999999999999999"_ = "0x9999999999999999999999999999999999999999"

_Defined in [src/procedures/**tests**/ModifyShareholderData.ts:24](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/procedures/__tests__/ModifyShareholderData.ts#L24)_

## Object literals

### `Const` params

### ▪ **params**: _object_

_Defined in [src/procedures/**tests**/ModifyShareholderData.ts:43](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/procedures/__tests__/ModifyShareholderData.ts#L43)_

### name

• **name**: _string_ = "Test Token 1"

_Defined in [src/procedures/**tests**/ModifyShareholderData.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/procedures/__tests__/ModifyShareholderData.ts#L45)_

### owner

• **owner**: _string_ = "0x3"

_Defined in [src/procedures/**tests**/ModifyShareholderData.ts:46](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/procedures/__tests__/ModifyShareholderData.ts#L46)_

### shareholderData

• **shareholderData**: _object[]_ = [
{
address: testAddress,
canSendAfter: new Date(2030, 1),
canReceiveAfter: new Date(1981, 1),
kycExpiry: new Date(2035, 2),
canBuyFromSto: true,
isAccredited: true,
},
{
address: testAddress2,
canSendAfter: new Date(2030, 1),
canReceiveAfter: new Date(1981, 1),
kycExpiry: new Date(2035, 2),
canBuyFromSto: true,
isAccredited: true,
},
]

_Defined in [src/procedures/**tests**/ModifyShareholderData.ts:47](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/procedures/__tests__/ModifyShareholderData.ts#L47)_

### symbol

• **symbol**: _string_ = "TEST1"

_Defined in [src/procedures/**tests**/ModifyShareholderData.ts:44](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/procedures/__tests__/ModifyShareholderData.ts#L44)_
