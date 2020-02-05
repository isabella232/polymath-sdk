# Class: Context

Context in which the SDK is being used

- Holds the current instance of the contract wrappers
- Holds the current wallet
- Holds the factories that create and cache entities

## Hierarchy

* **Context**

## Index

### Constructors

* [constructor](_context_.context.md#constructor)

### Properties

* [contractWrappers](_context_.context.md#contractwrappers)
* [currentWallet](_context_.context.md#currentwallet)
* [factories](_context_.context.md#factories)

## Constructors

###  constructor

\+ **new Context**(`params`: [ConstructorParams](../interfaces/_context_.constructorparams.md)): *[Context](_context_.context.md)*

*Defined in [src/Context.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/Context.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`params` | [ConstructorParams](../interfaces/_context_.constructorparams.md) |

**Returns:** *[Context](_context_.context.md)*

## Properties

###  contractWrappers

• **contractWrappers**: *[PolymathBase](_polymathbase_.polymathbase.md)*

*Defined in [src/Context.ts:41](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/Context.ts#L41)*

___

###  currentWallet

• **currentWallet**: *Wallet*

*Defined in [src/Context.ts:43](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/Context.ts#L43)*

___

###  factories

• **factories**: *[Factories](../interfaces/_context_.factories.md)*

*Defined in [src/Context.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/Context.ts#L45)*
