# Class: Polymath

Main entry point of the Polymath SDK

## Hierarchy

* **Polymath**

## Index

### Properties

* [isConnected](_polymath_.polymath.md#isconnected)
* [isUnsupported](_polymath_.polymath.md#isunsupported)

### Methods

* [connect](_polymath_.polymath.md#connect)
* [getCurrentAddress](_polymath_.polymath.md#getcurrentaddress)
* [getLatestProtocolVersion](_polymath_.polymath.md#getlatestprotocolversion)
* [getPolyTokenAddress](_polymath_.polymath.md#getpolytokenaddress)
* [getSecurityToken](_polymath_.polymath.md#getsecuritytoken)
* [getSecurityTokenReservation](_polymath_.polymath.md#getsecuritytokenreservation)
* [getSecurityTokenReservations](_polymath_.polymath.md#getsecuritytokenreservations)
* [getSecurityTokenSymbols](_polymath_.polymath.md#getsecuritytokensymbols)
* [getSecurityTokens](_polymath_.polymath.md#getsecuritytokens)
* [getWallet](_polymath_.polymath.md#getwallet)
* [isSymbolAvailable](_polymath_.polymath.md#issymbolavailable)
* [isValidErc20](_polymath_.polymath.md#isvaliderc20)
* [reserveSecurityToken](_polymath_.polymath.md#reservesecuritytoken)

## Properties

###  isConnected

• **isConnected**: *boolean* = false

*Defined in [src/Polymath.ts:96](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/Polymath.ts#L96)*

___

###  isUnsupported

• **isUnsupported**: *boolean* = false

*Defined in [src/Polymath.ts:94](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/Polymath.ts#L94)*

## Methods

###  connect

▸ **connect**(`__namedParameters`: object): *Promise‹this›*

*Defined in [src/Polymath.ts:103](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/Polymath.ts#L103)*

Connects the client to an Ethereum node

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | object |

**Returns:** *Promise‹this›*

___

###  getCurrentAddress

▸ **getCurrentAddress**(): *Promise‹string›*

*Defined in [src/Polymath.ts:449](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/Polymath.ts#L449)*

Returns the wallet address of the current user

**Returns:** *Promise‹string›*

___

###  getLatestProtocolVersion

▸ **getLatestProtocolVersion**(): *Promise‹string›*

*Defined in [src/Polymath.ts:428](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/Polymath.ts#L428)*

Get the current version of the Polymath Protocol

**Returns:** *Promise‹string›*

version string (i.e. 3.0.0)

___

###  getPolyTokenAddress

▸ **getPolyTokenAddress**(): *Promise‹string›*

*Defined in [src/Polymath.ts:440](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/Polymath.ts#L440)*

Get the address of the POLY token

**Returns:** *Promise‹string›*

___

###  getSecurityToken

▸ **getSecurityToken**(`args`: object | object | string): *Promise‹[SecurityToken](entities.securitytoken.securitytoken.md)›*

*Defined in [src/Polymath.ts:318](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/Polymath.ts#L318)*

Retrieve a security token by symbol, address or UUID

**Parameters:**

Name | Type |
------ | ------ |
`args` | object &#124; object &#124; string |

**Returns:** *Promise‹[SecurityToken](entities.securitytoken.securitytoken.md)›*

___

###  getSecurityTokenReservation

▸ **getSecurityTokenReservation**(`args`: object | string): *Promise‹[SecurityTokenReservation](entities.securitytokenreservation.md)›*

*Defined in [src/Polymath.ts:220](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/Polymath.ts#L220)*

Retrieve a Security Token Reservation by symbol or UUID

**Parameters:**

Name | Type |
------ | ------ |
`args` | object &#124; string |

**Returns:** *Promise‹[SecurityTokenReservation](entities.securitytokenreservation.md)›*

___

###  getSecurityTokenReservations

▸ **getSecurityTokenReservations**(`args?`: undefined | object): *Promise‹[SecurityTokenReservation](entities.securitytokenreservation.md)[]›*

*Defined in [src/Polymath.ts:188](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/Polymath.ts#L188)*

Retrieve all Security Token Reservations currently owned by an issuer. This includes
Security Tokens that have already been launched

**Parameters:**

Name | Type |
------ | ------ |
`args?` | undefined &#124; object |

**Returns:** *Promise‹[SecurityTokenReservation](entities.securitytokenreservation.md)[]›*

___

###  getSecurityTokenSymbols

▸ **getSecurityTokenSymbols**(`args?`: undefined | object): *Promise‹string[]›*

*Defined in [src/Polymath.ts:286](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/Polymath.ts#L286)*

Retrieve the symbols of all launched Security Tokens related to a wallet.
This includes tokens owned by the wallet and tokens for which the wallet holds some role

**Includes** token symbols for tokens with version 2.0 or lower

**Parameters:**

Name | Type |
------ | ------ |
`args?` | undefined &#124; object |

**Returns:** *Promise‹string[]›*

___

###  getSecurityTokens

▸ **getSecurityTokens**(`args?`: undefined | object): *Promise‹[SecurityToken](entities.securitytoken.securitytoken.md)[]›*

*Defined in [src/Polymath.ts:244](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/Polymath.ts#L244)*

Retrieve all launched Security Tokens related to a wallet.
This includes tokens owned by the wallet and tokens for which the wallet holds some role

**Ignores** all tokens with version 2.0 or lower

NOTE: This method is extremely slow if the wallet in question owns more than 20 tokens.
If that is your case, use [getSecurityTokenSymbols](_polymath_.polymath.md#getsecuritytokensymbols)

**Parameters:**

Name | Type |
------ | ------ |
`args?` | undefined &#124; object |

**Returns:** *Promise‹[SecurityToken](entities.securitytoken.securitytoken.md)[]›*

___

###  getWallet

▸ **getWallet**(`args`: object): *[Wallet](entities.wallet.md)*

*Defined in [src/Polymath.ts:417](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/Polymath.ts#L417)*

Retrieve a Wallet by address

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *[Wallet](entities.wallet.md)*

___

###  isSymbolAvailable

▸ **isSymbolAvailable**(`args`: object): *Promise‹boolean›*

*Defined in [src/Polymath.ts:392](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/Polymath.ts#L392)*

Check if a token symbol (ticker) is available for reservation

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *Promise‹boolean›*

___

###  isValidErc20

▸ **isValidErc20**(`args`: object): *Promise‹void›*

*Defined in [src/Polymath.ts:403](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/Polymath.ts#L403)*

Check if a token follows the ERC20 standard

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *Promise‹void›*

___

###  reserveSecurityToken

▸ **reserveSecurityToken**(`args`: object): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹ReserveSecurityTokenProcedureArgs, [SecurityTokenReservation](entities.securitytokenreservation.md)››*

*Defined in [src/Polymath.ts:176](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/Polymath.ts#L176)*

Reserve a Security Token

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹ReserveSecurityTokenProcedureArgs, [SecurityTokenReservation](entities.securitytokenreservation.md)››*
