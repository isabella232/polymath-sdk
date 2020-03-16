# Class: Polymath

Main entry point of the Polymath SDK

## Hierarchy

* **Polymath**

## Index

### Properties

* [context](_polymath_.polymath.md#private-context)
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

### `Private` context

• **context**: *[Context](_context_.context.md)* =  {} as Context

*Defined in [src/Polymath.ts:98](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/Polymath.ts#L98)*

___

###  isConnected

• **isConnected**: *boolean* = false

*Defined in [src/Polymath.ts:96](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/Polymath.ts#L96)*

___

###  isUnsupported

• **isUnsupported**: *boolean* = false

*Defined in [src/Polymath.ts:94](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/Polymath.ts#L94)*

## Methods

###  connect

▸ **connect**(`__namedParameters`: object): *Promise‹this›*

*Defined in [src/Polymath.ts:103](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/Polymath.ts#L103)*

Connects the client to an Ethereum node

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`polymathRegistryAddress` | undefined &#124; string | - | address of a custom Polymath Registry contract. Defaults to the one deployed by Polymath |
`privateKey` | undefined &#124; string | - | private key of the wallet that will sign transactions. If using Metamask, this parameter can be ignored |
`providerUrl` | undefined &#124; string | - | URL of an Ethereum node. If using Metamask, this parameter can be ignored |
`speed` | [TransactionSpeed](../enums/_types_index_.transactionspeed.md) |  TransactionSpeed.Fast | desired transaction speed. More gas is spent if a faster speed is chosen |

**Returns:** *Promise‹this›*

___

###  getCurrentAddress

▸ **getCurrentAddress**(): *Promise‹string›*

*Defined in [src/Polymath.ts:451](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/Polymath.ts#L451)*

Returns the wallet address of the current user

**Returns:** *Promise‹string›*

___

###  getLatestProtocolVersion

▸ **getLatestProtocolVersion**(): *Promise‹string›*

*Defined in [src/Polymath.ts:430](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/Polymath.ts#L430)*

Get the current version of the Polymath Protocol

**Returns:** *Promise‹string›*

version string (i.e. 3.0.0)

___

###  getPolyTokenAddress

▸ **getPolyTokenAddress**(): *Promise‹string›*

*Defined in [src/Polymath.ts:442](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/Polymath.ts#L442)*

Get the address of the POLY token

**Returns:** *Promise‹string›*

___

###  getSecurityToken

▸ **getSecurityToken**(`args`: object | object | string): *Promise‹[SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)›*

*Defined in [src/Polymath.ts:320](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/Polymath.ts#L320)*

Retrieve a security token by symbol, address or UUID

**Parameters:**

Name | Type |
------ | ------ |
`args` | object &#124; object &#124; string |

**Returns:** *Promise‹[SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)›*

___

###  getSecurityTokenReservation

▸ **getSecurityTokenReservation**(`args`: object | string): *Promise‹[SecurityTokenReservation](_entities_securitytokenreservation_.securitytokenreservation.md)›*

*Defined in [src/Polymath.ts:220](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/Polymath.ts#L220)*

Retrieve a Security Token Reservation by symbol or UUID

**Parameters:**

Name | Type |
------ | ------ |
`args` | object &#124; string |

**Returns:** *Promise‹[SecurityTokenReservation](_entities_securitytokenreservation_.securitytokenreservation.md)›*

___

###  getSecurityTokenReservations

▸ **getSecurityTokenReservations**(`args?`: undefined | object): *Promise‹[SecurityTokenReservation](_entities_securitytokenreservation_.securitytokenreservation.md)[]›*

*Defined in [src/Polymath.ts:188](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/Polymath.ts#L188)*

Retrieve all Security Token Reservations currently owned by an issuer. This includes
Security Tokens that have already been launched

**Parameters:**

Name | Type |
------ | ------ |
`args?` | undefined &#124; object |

**Returns:** *Promise‹[SecurityTokenReservation](_entities_securitytokenreservation_.securitytokenreservation.md)[]›*

___

###  getSecurityTokenSymbols

▸ **getSecurityTokenSymbols**(`args?`: undefined | object): *Promise‹string[]›*

*Defined in [src/Polymath.ts:286](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/Polymath.ts#L286)*

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

▸ **getSecurityTokens**(`args?`: undefined | object): *Promise‹[SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)[]›*

*Defined in [src/Polymath.ts:244](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/Polymath.ts#L244)*

Retrieve all launched Security Tokens related to a wallet.
This includes tokens owned by the wallet and tokens for which the wallet holds some role

**Ignores** all tokens with version 2.0 or lower

NOTE: This method is extremely slow if the wallet in question owns more than 20 tokens.
If that is your case, use [getSecurityTokenSymbols](_polymath_.polymath.md#getsecuritytokensymbols)

**Parameters:**

Name | Type |
------ | ------ |
`args?` | undefined &#124; object |

**Returns:** *Promise‹[SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)[]›*

___

###  getWallet

▸ **getWallet**(`args`: object): *[Wallet](_entities_wallet_.wallet.md)*

*Defined in [src/Polymath.ts:419](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/Polymath.ts#L419)*

Retrieve a Wallet by address

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`address` | string |

**Returns:** *[Wallet](_entities_wallet_.wallet.md)*

___

###  isSymbolAvailable

▸ **isSymbolAvailable**(`args`: object): *Promise‹boolean›*

*Defined in [src/Polymath.ts:394](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/Polymath.ts#L394)*

Check if a token symbol (ticker) is available for reservation

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`symbol` | string |

**Returns:** *Promise‹boolean›*

___

###  isValidErc20

▸ **isValidErc20**(`args`: object): *Promise‹void›*

*Defined in [src/Polymath.ts:405](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/Polymath.ts#L405)*

Check if a token follows the ERC20 standard

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`address` | string |

**Returns:** *Promise‹void›*

___

###  reserveSecurityToken

▸ **reserveSecurityToken**(`args`: object): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ReserveSecurityTokenProcedureArgs](../interfaces/_types_index_.reservesecuritytokenprocedureargs.md), [SecurityTokenReservation](_entities_securitytokenreservation_.securitytokenreservation.md)››*

*Defined in [src/Polymath.ts:176](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/Polymath.ts#L176)*

Reserve a Security Token

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`owner?` | undefined &#124; string |
`symbol` | string |

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ReserveSecurityTokenProcedureArgs](../interfaces/_types_index_.reservesecuritytokenprocedureargs.md), [SecurityTokenReservation](_entities_securitytokenreservation_.securitytokenreservation.md)››*
