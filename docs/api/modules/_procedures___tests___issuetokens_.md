# External module: "procedures/**tests**/IssueTokens"

## Index

### Variables

- [securityTokenId](_procedures___tests___issuetokens_.md#const-securitytokenid)
- [testAddress](_procedures___tests___issuetokens_.md#const-testaddress)
- [testAddress2](_procedures___tests___issuetokens_.md#const-testaddress2)
- [testAddress3](_procedures___tests___issuetokens_.md#const-testaddress3)

### Object literals

- [params](_procedures___tests___issuetokens_.md#const-params)

## Variables

### `Const` securityTokenId

• **securityTokenId**: _"ST ID"_ = "ST ID"

_Defined in [src/procedures/**tests**/IssueTokens.ts:33](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/procedures/__tests__/IssueTokens.ts#L33)_

---

### `Const` testAddress

• **testAddress**: _"0x6666666666666666666666666666666666666666"_ = "0x6666666666666666666666666666666666666666"

_Defined in [src/procedures/**tests**/IssueTokens.ts:34](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/procedures/__tests__/IssueTokens.ts#L34)_

---

### `Const` testAddress2

• **testAddress2**: _"0x9999999999999999999999999999999999999999"_ = "0x9999999999999999999999999999999999999999"

_Defined in [src/procedures/**tests**/IssueTokens.ts:35](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/procedures/__tests__/IssueTokens.ts#L35)_

---

### `Const` testAddress3

• **testAddress3**: _"0x8888888888888888888888888888888888888888"_ = "0x8888888888888888888888888888888888888888"

_Defined in [src/procedures/**tests**/IssueTokens.ts:36](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/procedures/__tests__/IssueTokens.ts#L36)_

## Object literals

### `Const` params

### ▪ **params**: _object_

_Defined in [src/procedures/**tests**/IssueTokens.ts:37](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/procedures/__tests__/IssueTokens.ts#L37)_

### issuanceData

• **issuanceData**: _object | object[]_ = [
{
address: testAddress3,
amount: new BigNumber(1),
shareholderData: {
canSendAfter: new Date(2030, 1),
canReceiveAfter: new Date(1980, 1),
kycExpiry: new Date(2035, 1),
canBuyFromSto: true,
isAccredited: true,
},
},
{
address: testAddress,
amount: new BigNumber(1),
},
]

_Defined in [src/procedures/**tests**/IssueTokens.ts:39](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/procedures/__tests__/IssueTokens.ts#L39)_

### symbol

• **symbol**: _string_ = "TEST1"

_Defined in [src/procedures/**tests**/IssueTokens.ts:38](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/procedures/__tests__/IssueTokens.ts#L38)_
