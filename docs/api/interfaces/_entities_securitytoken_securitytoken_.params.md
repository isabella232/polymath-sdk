# Interface: Params

Security Token constructor parameters

## Hierarchy

- **Params**

## Index

### Properties

- [address](_entities_securitytoken_securitytoken_.params.md#address)
- [currentCheckpoint](_entities_securitytoken_securitytoken_.params.md#currentcheckpoint)
- [granularity](_entities_securitytoken_securitytoken_.params.md#granularity)
- [name](_entities_securitytoken_securitytoken_.params.md#name)
- [owner](_entities_securitytoken_securitytoken_.params.md#owner)
- [tokenDetails](_entities_securitytoken_securitytoken_.params.md#tokendetails)
- [totalSupply](_entities_securitytoken_securitytoken_.params.md#totalsupply)
- [treasuryWallet](_entities_securitytoken_securitytoken_.params.md#treasurywallet)
- [version](_entities_securitytoken_securitytoken_.params.md#version)

## Properties

### address

• **address**: _string_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:44](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityToken/SecurityToken.ts#L44)_

address of the Security Token contract

---

### currentCheckpoint

• **currentCheckpoint**: _number_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:59](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityToken/SecurityToken.ts#L59)_

index of the current checkpoint

---

### granularity

• **granularity**: _number_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:54](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityToken/SecurityToken.ts#L54)_

---

### name

• **name**: _string_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:40](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityToken/SecurityToken.ts#L40)_

---

### owner

• **owner**: _string_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:48](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityToken/SecurityToken.ts#L48)_

address that owns the Security Token

---

### tokenDetails

• **tokenDetails**: _string_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:52](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityToken/SecurityToken.ts#L52)_

URL pointing to off-chain data associated with the Security Token

---

### totalSupply

• **totalSupply**: _BigNumber_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:55](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityToken/SecurityToken.ts#L55)_

---

### treasuryWallet

• **treasuryWallet**: _string_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:64](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityToken/SecurityToken.ts#L64)_

default treasury wallet used by some features.
**_For example, if an STO reaches its end date (or is finalized before that), remaining unsold tokens get transferred to this wallet unless otherwise specified by the STO itself_**

---

### version

• **version**: _Version_

_Defined in [src/entities/SecurityToken/SecurityToken.ts:53](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/entities/SecurityToken/SecurityToken.ts#L53)_
