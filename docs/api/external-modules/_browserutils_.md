# browserUtils

## Index

### Enumerations

* [BrowserSupport]()

### Interfaces

* [Ethereum]()
* [ExtendedWindow]()
* [InjectedWeb3]()
* [Web3VersionAPI]()
* [WindowWithEthereum]()
* [WindowWithWeb3]()

### Functions

* [getBrowserSupport](_browserutils_.md#getbrowsersupport)
* [onAddressChange](_browserutils_.md#onaddresschange)
* [onNetworkChange](_browserutils_.md#onnetworkchange)

## Functions

### getBrowserSupport

▸ **getBrowserSupport**\(\): [_NoMetamask_]() _\|_ [_MetamaskLegacy_]() _\|_ [_MetamaskModern_]() _\|_ [_None_]()

_Defined in_ [_src/browserUtils.ts:45_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/browserUtils.ts#L45)

Returns the browser support for Ethereum

**Returns:** [_NoMetamask_]() _\|_ [_MetamaskLegacy_]() _\|_ [_MetamaskModern_]() _\|_ [_None_]()

### onAddressChange

▸ **onAddressChange**\(`cb`: function\): _\(Anonymous function\)_

_Defined in_ [_src/browserUtils.ts:189_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/browserUtils.ts#L189)

Runs the callback anytime the wallet address changes in the browser

**Parameters:**

▪ **cb**: _function_

callback that receives the new address and the previous one

▸ \(`newAddress`: string, `previousAddress?`: undefined \| string\): _void_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `newAddress` | string |
| `previousAddress?` | undefined \| string |

**Returns:** _\(Anonymous function\)_

an unsubscribe function

### onNetworkChange

▸ **onNetworkChange**\(`cb`: function\): _\(Anonymous function\)_

_Defined in_ [_src/browserUtils.ts:225_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/browserUtils.ts#L225)

Runs the callback anytime the current network changes in the browser

**Parameters:**

▪ **cb**: _function_

callback that receives the new network id and the previous one

▸ \(`newNetwork`: number, `previousNetwork?`: undefined \| number\): _void_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `newNetwork` | number |
| `previousNetwork?` | undefined \| number |

**Returns:** _\(Anonymous function\)_

an unsubscribe function

