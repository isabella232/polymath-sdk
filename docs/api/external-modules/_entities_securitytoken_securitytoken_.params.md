# Params

Security Token constructor parameters

## Hierarchy

* **Params**

## Index

### Properties

* [address](../interfaces/_entities_securitytoken_securitytoken_.params.md#address)
* [currentCheckpoint](../interfaces/_entities_securitytoken_securitytoken_.params.md#currentcheckpoint)
* [granularity](../interfaces/_entities_securitytoken_securitytoken_.params.md#granularity)
* [name](../interfaces/_entities_securitytoken_securitytoken_.params.md#name)
* [owner](../interfaces/_entities_securitytoken_securitytoken_.params.md#owner)
* [tokenDetails](../interfaces/_entities_securitytoken_securitytoken_.params.md#tokendetails)
* [totalSupply](../interfaces/_entities_securitytoken_securitytoken_.params.md#totalsupply)
* [treasuryWallet](../interfaces/_entities_securitytoken_securitytoken_.params.md#treasurywallet)
* [version](../interfaces/_entities_securitytoken_securitytoken_.params.md#version)

## Properties

### address

• **address**: _string_

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:44_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L44)

address of the Security Token contract

### currentCheckpoint

• **currentCheckpoint**: _number_

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:59_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L59)

index of the current checkpoint

### granularity

• **granularity**: _number_

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:54_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L54)

### name

• **name**: _string_

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:40_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L40)

### owner

• **owner**: _string_

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:48_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L48)

address that owns the Security Token

### tokenDetails

• **tokenDetails**: _string_

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:52_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L52)

URL pointing to off-chain data associated with the Security Token

### totalSupply

• **totalSupply**: _BigNumber_

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:55_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L55)

### treasuryWallet

• **treasuryWallet**: _string_

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:64_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L64)

default treasury wallet used by some features. _**For example, if an STO reaches its end date \(or is finalized before that\), remaining unsold tokens get transferred to this wallet unless otherwise specified by the STO itself**_

### version

• **version**: _Version_

_Defined in_ [_src/entities/SecurityToken/SecurityToken.ts:53_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/SecurityToken.ts#L53)

