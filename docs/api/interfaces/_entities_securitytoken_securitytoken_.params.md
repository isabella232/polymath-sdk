# Interface: Params

Security Token constructor parameters

## Hierarchy

* **Params**

## Index

### Properties

* [address](_entities_securitytoken_securitytoken_.params.md#address)
* [currentCheckpoint](_entities_securitytoken_securitytoken_.params.md#currentcheckpoint)
* [granularity](_entities_securitytoken_securitytoken_.params.md#granularity)
* [name](_entities_securitytoken_securitytoken_.params.md#name)
* [owner](_entities_securitytoken_securitytoken_.params.md#owner)
* [tokenDetails](_entities_securitytoken_securitytoken_.params.md#tokendetails)
* [totalSupply](_entities_securitytoken_securitytoken_.params.md#totalsupply)
* [treasuryWallet](_entities_securitytoken_securitytoken_.params.md#treasurywallet)
* [version](_entities_securitytoken_securitytoken_.params.md#version)

## Properties

###  address

• **address**: *string*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:44](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/SecurityToken/SecurityToken.ts#L44)*

address of the Security Token contract

___

###  currentCheckpoint

• **currentCheckpoint**: *number*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:59](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/SecurityToken/SecurityToken.ts#L59)*

index of the current checkpoint

___

###  granularity

• **granularity**: *number*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:54](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/SecurityToken/SecurityToken.ts#L54)*

___

###  name

• **name**: *string*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:40](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/SecurityToken/SecurityToken.ts#L40)*

___

###  owner

• **owner**: *string*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:48](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/SecurityToken/SecurityToken.ts#L48)*

address that owns the Security Token

___

###  tokenDetails

• **tokenDetails**: *string*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:52](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/SecurityToken/SecurityToken.ts#L52)*

URL pointing to off-chain data associated with the Security Token

___

###  totalSupply

• **totalSupply**: *BigNumber*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:55](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/SecurityToken/SecurityToken.ts#L55)*

___

###  treasuryWallet

• **treasuryWallet**: *string*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:64](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/SecurityToken/SecurityToken.ts#L64)*

default treasury wallet used by some features.
***For example, if an STO reaches its end date (or is finalized before that), remaining unsold tokens get transferred to this wallet unless otherwise specified by the STO itself***

___

###  version

• **version**: *Version*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:53](https://github.com/PolymathNetwork/polymath-sdk/blob/45453ad/src/entities/SecurityToken/SecurityToken.ts#L53)*
