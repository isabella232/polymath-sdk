[@polymathnetwork/sdk - v2.0.1-beta.120](../README.md) › [Globals](../globals.md) › ["Context"](../modules/_context_.md) › [Context](_context_.context.md)

# Class: Context

Context in which the SDK is being used

- Holds the current instance of the contract wrappers
- Holds the current wallet
- Holds the factories that create and cache entities

## Hierarchy

- **Context**

## Index

### Constructors

- [constructor](_context_.context.md#constructor)

### Properties

- [contractWrappers](_context_.context.md#contractwrappers)
- [currentWallet](_context_.context.md#currentwallet)
- [factories](_context_.context.md#factories)

## Constructors

### constructor

\+ **new Context**(`params`: [ConstructorParams](../interfaces/_context_.constructorparams.md)): _[Context](_context_.context.md)_

_Defined in [src/Context.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/Context.ts#L45)_

**Parameters:**

| Name     | Type                                                              |
| -------- | ----------------------------------------------------------------- |
| `params` | [ConstructorParams](../interfaces/_context_.constructorparams.md) |

**Returns:** _[Context](_context_.context.md)_

## Properties

### contractWrappers

• **contractWrappers**: _[PolymathBase](_polymathbase_.polymathbase.md)_

_Defined in [src/Context.ts:41](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/Context.ts#L41)_

---

### currentWallet

• **currentWallet**: _Wallet_

_Defined in [src/Context.ts:43](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/Context.ts#L43)_

---

### factories

• **factories**: _[Factories](../interfaces/_context_.factories.md)_

_Defined in [src/Context.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/1da5bc5/src/Context.ts#L45)_
