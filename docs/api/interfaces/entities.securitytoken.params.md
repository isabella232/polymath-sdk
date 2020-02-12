# Interface: Params

Security Token constructor parameters

## Hierarchy

* **Params**

## Index

### Properties

* [address](entities.securitytoken.params.md#address)
* [currentCheckpoint](entities.securitytoken.params.md#currentcheckpoint)
* [granularity](entities.securitytoken.params.md#granularity)
* [name](entities.securitytoken.params.md#name)
* [owner](entities.securitytoken.params.md#owner)
* [tokenDetails](entities.securitytoken.params.md#tokendetails)
* [totalSupply](entities.securitytoken.params.md#totalsupply)
* [treasuryWallet](entities.securitytoken.params.md#treasurywallet)
* [version](entities.securitytoken.params.md#version)

## Properties

###  address

• **address**: *string*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:49](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityToken/SecurityToken.ts#L49)*

address of the Security Token contract

___

###  currentCheckpoint

• **currentCheckpoint**: *number*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:64](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityToken/SecurityToken.ts#L64)*

index of the current checkpoint

___

###  granularity

• **granularity**: *number*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:59](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityToken/SecurityToken.ts#L59)*

___

###  name

• **name**: *string*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityToken/SecurityToken.ts#L45)*

___

###  owner

• **owner**: *string*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:53](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityToken/SecurityToken.ts#L53)*

address that owns the Security Token

___

###  tokenDetails

• **tokenDetails**: *string*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:57](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityToken/SecurityToken.ts#L57)*

URL pointing to off-chain data associated with the Security Token

___

###  totalSupply

• **totalSupply**: *BigNumber*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:60](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityToken/SecurityToken.ts#L60)*

___

###  treasuryWallet

• **treasuryWallet**: *string*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:69](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityToken/SecurityToken.ts#L69)*

default treasury wallet used by some features.
***For example, if an STO reaches its end date (or is finalized before that), remaining unsold tokens get transferred to this wallet unless otherwise specified by the STO itself***

___

###  version

• **version**: *Version*

*Defined in [src/entities/SecurityToken/SecurityToken.ts:58](https://github.com/PolymathNetwork/polymath-sdk/blob/ce52226/src/entities/SecurityToken/SecurityToken.ts#L58)*
