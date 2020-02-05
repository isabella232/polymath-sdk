# Class: Polymath

Main entry point of the Polymath SDK

## Hierarchy

- **Polymath**

## Index

### Properties

- [context](_polymath_.polymath.md#private-context)
- [isConnected](_polymath_.polymath.md#isconnected)
- [isUnsupported](_polymath_.polymath.md#isunsupported)

### Methods

- [connect](_polymath_.polymath.md#connect)
- [getCurrentAddress](_polymath_.polymath.md#getcurrentaddress)
- [getLatestProtocolVersion](_polymath_.polymath.md#getlatestprotocolversion)
- [getPolyTokenAddress](_polymath_.polymath.md#getpolytokenaddress)
- [getSecurityToken](_polymath_.polymath.md#getsecuritytoken)
- [getSecurityTokenReservation](_polymath_.polymath.md#getsecuritytokenreservation)
- [getSecurityTokenReservations](_polymath_.polymath.md#getsecuritytokenreservations)
- [getSecurityTokenSymbols](_polymath_.polymath.md#getsecuritytokensymbols)
- [getSecurityTokens](_polymath_.polymath.md#getsecuritytokens)
- [getWallet](_polymath_.polymath.md#getwallet)
- [isSymbolAvailable](_polymath_.polymath.md#issymbolavailable)
- [isValidErc20](_polymath_.polymath.md#isvaliderc20)
- [reserveSecurityToken](_polymath_.polymath.md#reservesecuritytoken)

## Properties

### `Private` context

• **context**: _[Context](_context_.context.md)_ = {} as Context

_Defined in [src/Polymath.ts:98](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/Polymath.ts#L98)_

---

### isConnected

• **isConnected**: _boolean_ = false

_Defined in [src/Polymath.ts:96](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/Polymath.ts#L96)_

---

### isUnsupported

• **isUnsupported**: _boolean_ = false

_Defined in [src/Polymath.ts:94](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/Polymath.ts#L94)_

## Methods

### connect

▸ **connect**(`__namedParameters`: object): _Promise‹this›_

_Defined in [src/Polymath.ts:103](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/Polymath.ts#L103)_

Connects the client to an Ethereum node

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name                      | Type                                                           | Default               | Description                                                                                             |
| ------------------------- | -------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------- |
| `polymathRegistryAddress` | undefined &#124; string                                        | -                     | address of a custom Polymath Registry contract. Defaults to the one deployed by Polymath                |
| `privateKey`              | undefined &#124; string                                        | -                     | private key of the wallet that will sign transactions. If using Metamask, this parameter can be ignored |
| `providerUrl`             | undefined &#124; string                                        | -                     | URL of an Ethereum node. If using Metamask, this parameter can be ignored                               |
| `speed`                   | [TransactionSpeed](../enums/_types_index_.transactionspeed.md) | TransactionSpeed.Fast | desired transaction speed. More gas is spent if a faster speed is chosen                                |

**Returns:** _Promise‹this›_

---

### getCurrentAddress

▸ **getCurrentAddress**(): _Promise‹string›_

_Defined in [src/Polymath.ts:449](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/Polymath.ts#L449)_

Returns the wallet address of the current user

**Returns:** _Promise‹string›_

---

### getLatestProtocolVersion

▸ **getLatestProtocolVersion**(): _Promise‹string›_

_Defined in [src/Polymath.ts:428](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/Polymath.ts#L428)_

Get the current version of the Polymath Protocol

**Returns:** _Promise‹string›_

version string (i.e. 3.0.0)

---

### getPolyTokenAddress

▸ **getPolyTokenAddress**(): _Promise‹string›_

_Defined in [src/Polymath.ts:440](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/Polymath.ts#L440)_

Get the address of the POLY token

**Returns:** _Promise‹string›_

---

### getSecurityToken

▸ **getSecurityToken**(`args`: object | object | string): _Promise‹[SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)›_

_Defined in [src/Polymath.ts:318](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/Polymath.ts#L318)_

Retrieve a security token by symbol, address or UUID

**Parameters:**

| Name   | Type                               |
| ------ | ---------------------------------- |
| `args` | object &#124; object &#124; string |

**Returns:** _Promise‹[SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)›_

---

### getSecurityTokenReservation

▸ **getSecurityTokenReservation**(`args`: object | string): _Promise‹[SecurityTokenReservation](_entities_securitytokenreservation_.securitytokenreservation.md)›_

_Defined in [src/Polymath.ts:220](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/Polymath.ts#L220)_

Retrieve a Security Token Reservation by symbol or UUID

**Parameters:**

| Name   | Type                 |
| ------ | -------------------- |
| `args` | object &#124; string |

**Returns:** _Promise‹[SecurityTokenReservation](_entities_securitytokenreservation_.securitytokenreservation.md)›_

---

### getSecurityTokenReservations

▸ **getSecurityTokenReservations**(`args?`: undefined | object): _Promise‹[SecurityTokenReservation](_entities_securitytokenreservation_.securitytokenreservation.md)[]›_

_Defined in [src/Polymath.ts:188](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/Polymath.ts#L188)_

Retrieve all Security Token Reservations currently owned by an issuer. This includes
Security Tokens that have already been launched

**Parameters:**

| Name    | Type                    |
| ------- | ----------------------- |
| `args?` | undefined &#124; object |

**Returns:** _Promise‹[SecurityTokenReservation](_entities_securitytokenreservation_.securitytokenreservation.md)[]›_

---

### getSecurityTokenSymbols

▸ **getSecurityTokenSymbols**(`args?`: undefined | object): _Promise‹string[]›_

_Defined in [src/Polymath.ts:286](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/Polymath.ts#L286)_

Retrieve the symbols of all launched Security Tokens related to a wallet.
This includes tokens owned by the wallet and tokens for which the wallet holds some role

**Includes** token symbols for tokens with version 2.0 or lower

**Parameters:**

| Name    | Type                    |
| ------- | ----------------------- |
| `args?` | undefined &#124; object |

**Returns:** _Promise‹string[]›_

---

### getSecurityTokens

▸ **getSecurityTokens**(`args?`: undefined | object): _Promise‹[SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)[]›_

_Defined in [src/Polymath.ts:244](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/Polymath.ts#L244)_

Retrieve all launched Security Tokens related to a wallet.
This includes tokens owned by the wallet and tokens for which the wallet holds some role

**Ignores** all tokens with version 2.0 or lower

NOTE: This method is extremely slow if the wallet in question owns more than 20 tokens.
If that is your case, use [getSecurityTokenSymbols](_polymath_.polymath.md#getsecuritytokensymbols)

**Parameters:**

| Name    | Type                    |
| ------- | ----------------------- |
| `args?` | undefined &#124; object |

**Returns:** _Promise‹[SecurityToken](_entities_securitytoken_securitytoken_.securitytoken.md)[]›_

---

### getWallet

▸ **getWallet**(`args`: object): _[Wallet](_entities_wallet_.wallet.md)_

_Defined in [src/Polymath.ts:417](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/Polymath.ts#L417)_

Retrieve a Wallet by address

**Parameters:**

▪ **args**: _object_

| Name      | Type   |
| --------- | ------ |
| `address` | string |

**Returns:** _[Wallet](_entities_wallet_.wallet.md)_

---

### isSymbolAvailable

▸ **isSymbolAvailable**(`args`: object): _Promise‹boolean›_

_Defined in [src/Polymath.ts:392](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/Polymath.ts#L392)_

Check if a token symbol (ticker) is available for reservation

**Parameters:**

▪ **args**: _object_

| Name     | Type   |
| -------- | ------ |
| `symbol` | string |

**Returns:** _Promise‹boolean›_

---

### isValidErc20

▸ **isValidErc20**(`args`: object): _Promise‹void›_

_Defined in [src/Polymath.ts:403](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/Polymath.ts#L403)_

Check if a token follows the ERC20 standard

**Parameters:**

▪ **args**: _object_

| Name      | Type   |
| --------- | ------ |
| `address` | string |

**Returns:** _Promise‹void›_

---

### reserveSecurityToken

▸ **reserveSecurityToken**(`args`: object): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ReserveSecurityTokenProcedureArgs](../interfaces/_types_index_.reservesecuritytokenprocedureargs.md), [SecurityTokenReservation](_entities_securitytokenreservation_.securitytokenreservation.md)››_

_Defined in [src/Polymath.ts:176](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/Polymath.ts#L176)_

Reserve a Security Token

**Parameters:**

▪ **args**: _object_

| Name     | Type                    |
| -------- | ----------------------- |
| `owner?` | undefined &#124; string |
| `symbol` | string                  |

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[ReserveSecurityTokenProcedureArgs](../interfaces/_types_index_.reservesecuritytokenprocedureargs.md), [SecurityTokenReservation](_entities_securitytokenreservation_.securitytokenreservation.md)››_
