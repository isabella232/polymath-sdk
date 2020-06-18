# Polymath

Main entry point of the Polymath SDK

## Hierarchy

* **Polymath**

## Index

### Properties

* [context](../classes/_polymath_.polymath.md#private-context)
* [isConnected](../classes/_polymath_.polymath.md#isconnected)
* [isUnsupported](../classes/_polymath_.polymath.md#isunsupported)

### Methods

* [connect](../classes/_polymath_.polymath.md#connect)
* [getCurrentAddress](../classes/_polymath_.polymath.md#getcurrentaddress)
* [getLatestProtocolVersion](../classes/_polymath_.polymath.md#getlatestprotocolversion)
* [getPolyTokenAddress](../classes/_polymath_.polymath.md#getpolytokenaddress)
* [getSecurityToken](../classes/_polymath_.polymath.md#getsecuritytoken)
* [getSecurityTokenReservation](../classes/_polymath_.polymath.md#getsecuritytokenreservation)
* [getSecurityTokenReservations](../classes/_polymath_.polymath.md#getsecuritytokenreservations)
* [getSecurityTokenSymbols](../classes/_polymath_.polymath.md#getsecuritytokensymbols)
* [getSecurityTokens](../classes/_polymath_.polymath.md#getsecuritytokens)
* [getWallet](../classes/_polymath_.polymath.md#getwallet)
* [isSymbolAvailable](../classes/_polymath_.polymath.md#issymbolavailable)
* [isValidErc20](../classes/_polymath_.polymath.md#isvaliderc20)
* [reserveSecurityToken](../classes/_polymath_.polymath.md#reservesecuritytoken)

## Properties

### `Private` context

• **context**: [_Context_](../classes/_context_.context.md) = {} as Context

_Defined in_ [_src/Polymath.ts:98_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/Polymath.ts#L98)

### isConnected

• **isConnected**: _boolean_ = false

_Defined in_ [_src/Polymath.ts:96_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/Polymath.ts#L96)

### isUnsupported

• **isUnsupported**: _boolean_ = false

_Defined in_ [_src/Polymath.ts:94_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/Polymath.ts#L94)

## Methods

### connect

▸ **connect**\(`__namedParameters`: object\): _Promise‹this›_

_Defined in_ [_src/Polymath.ts:103_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/Polymath.ts#L103)

Connects the client to an Ethereum node

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `polymathRegistryAddress` | undefined \| string | - | address of a custom Polymath Registry contract. Defaults to the one deployed by Polymath |
| `privateKey` | undefined \| string | - | private key of the wallet that will sign transactions. If using Metamask, this parameter can be ignored |
| `providerUrl` | undefined \| string | - | URL of an Ethereum node. If using Metamask, this parameter can be ignored |
| `speed` | [TransactionSpeed](../enums/_types_index_.transactionspeed.md) | TransactionSpeed.Fast | desired transaction speed. More gas is spent if a faster speed is chosen |

**Returns:** _Promise‹this›_

### getCurrentAddress

▸ **getCurrentAddress**\(\): _Promise‹string›_

_Defined in_ [_src/Polymath.ts:451_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/Polymath.ts#L451)

Returns the wallet address of the current user

**Returns:** _Promise‹string›_

### getLatestProtocolVersion

▸ **getLatestProtocolVersion**\(\): _Promise‹string›_

_Defined in_ [_src/Polymath.ts:430_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/Polymath.ts#L430)

Get the current version of the Polymath Protocol

**Returns:** _Promise‹string›_

version string \(i.e. 3.0.0\)

### getPolyTokenAddress

▸ **getPolyTokenAddress**\(\): _Promise‹string›_

_Defined in_ [_src/Polymath.ts:442_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/Polymath.ts#L442)

Get the address of the POLY token

**Returns:** _Promise‹string›_

### getSecurityToken

▸ **getSecurityToken**\(`args`: object \| object \| string\): _Promise‹_[_SecurityToken_](../classes/_entities_securitytoken_securitytoken_.securitytoken.md)_›_

_Defined in_ [_src/Polymath.ts:320_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/Polymath.ts#L320)

Retrieve a security token by symbol, address or UUID

**Parameters:**

| Name | Type |
| :--- | :--- |
| `args` | object \| object \| string |

**Returns:** _Promise‹_[_SecurityToken_](../classes/_entities_securitytoken_securitytoken_.securitytoken.md)_›_

### getSecurityTokenReservation

▸ **getSecurityTokenReservation**\(`args`: object \| string\): _Promise‹_[_SecurityTokenReservation_](../classes/_entities_securitytokenreservation_.securitytokenreservation.md)_›_

_Defined in_ [_src/Polymath.ts:220_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/Polymath.ts#L220)

Retrieve a Security Token Reservation by symbol or UUID

**Parameters:**

| Name | Type |
| :--- | :--- |
| `args` | object \| string |

**Returns:** _Promise‹_[_SecurityTokenReservation_](../classes/_entities_securitytokenreservation_.securitytokenreservation.md)_›_

### getSecurityTokenReservations

▸ **getSecurityTokenReservations**\(`args?`: undefined \| object\): _Promise‹_[_SecurityTokenReservation_](../classes/_entities_securitytokenreservation_.securitytokenreservation.md)_\[\]›_

_Defined in_ [_src/Polymath.ts:188_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/Polymath.ts#L188)

Retrieve all Security Token Reservations currently owned by an issuer. This includes Security Tokens that have already been launched

**Parameters:**

| Name | Type |
| :--- | :--- |
| `args?` | undefined \| object |

**Returns:** _Promise‹_[_SecurityTokenReservation_](../classes/_entities_securitytokenreservation_.securitytokenreservation.md)_\[\]›_

### getSecurityTokenSymbols

▸ **getSecurityTokenSymbols**\(`args?`: undefined \| object\): _Promise‹string\[\]›_

_Defined in_ [_src/Polymath.ts:286_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/Polymath.ts#L286)

Retrieve the symbols of all launched Security Tokens related to a wallet. This includes tokens owned by the wallet and tokens for which the wallet holds some role

**Includes** token symbols for tokens with version 2.0 or lower

**Parameters:**

| Name | Type |
| :--- | :--- |
| `args?` | undefined \| object |

**Returns:** _Promise‹string\[\]›_

### getSecurityTokens

▸ **getSecurityTokens**\(`args?`: undefined \| object\): _Promise‹_[_SecurityToken_](../classes/_entities_securitytoken_securitytoken_.securitytoken.md)_\[\]›_

_Defined in_ [_src/Polymath.ts:244_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/Polymath.ts#L244)

Retrieve all launched Security Tokens related to a wallet. This includes tokens owned by the wallet and tokens for which the wallet holds some role

**Ignores** all tokens with version 2.0 or lower

NOTE: This method is extremely slow if the wallet in question owns more than 20 tokens. If that is your case, use [getSecurityTokenSymbols](../classes/_polymath_.polymath.md#getsecuritytokensymbols)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `args?` | undefined \| object |

**Returns:** _Promise‹_[_SecurityToken_](../classes/_entities_securitytoken_securitytoken_.securitytoken.md)_\[\]›_

### getWallet

▸ **getWallet**\(`args`: object\): [_Wallet_](../classes/_entities_wallet_.wallet.md)

_Defined in_ [_src/Polymath.ts:419_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/Polymath.ts#L419)

Retrieve a Wallet by address

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `address` | string |

**Returns:** [_Wallet_](../classes/_entities_wallet_.wallet.md)

### isSymbolAvailable

▸ **isSymbolAvailable**\(`args`: object\): _Promise‹boolean›_

_Defined in_ [_src/Polymath.ts:394_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/Polymath.ts#L394)

Check if a token symbol \(ticker\) is available for reservation

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `symbol` | string |

**Returns:** _Promise‹boolean›_

### isValidErc20

▸ **isValidErc20**\(`args`: object\): _Promise‹void›_

_Defined in_ [_src/Polymath.ts:405_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/Polymath.ts#L405)

Check if a token follows the ERC20 standard

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `address` | string |

**Returns:** _Promise‹void›_

### reserveSecurityToken

▸ **reserveSecurityToken**\(`args`: object\): _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹_[_ReserveSecurityTokenProcedureArgs_](../interfaces/_types_index_.reservesecuritytokenprocedureargs.md)_,_ [_SecurityTokenReservation_](../classes/_entities_securitytokenreservation_.securitytokenreservation.md)_››_

_Defined in_ [_src/Polymath.ts:176_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/Polymath.ts#L176)

Reserve a Security Token

**Parameters:**

▪ **args**: _object_

| Name | Type |
| :--- | :--- |
| `owner?` | undefined \| string |
| `symbol` | string |

**Returns:** _Promise‹_[_TransactionQueue_](../classes/_entities_transactionqueue_.transactionqueue.md)_‹_[_ReserveSecurityTokenProcedureArgs_](../interfaces/_types_index_.reservesecuritytokenprocedureargs.md)_,_ [_SecurityTokenReservation_](../classes/_entities_securitytokenreservation_.securitytokenreservation.md)_››_

