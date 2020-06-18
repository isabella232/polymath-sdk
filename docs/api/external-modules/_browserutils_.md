# browserUtils

## Index

### Enumerations

* [BrowserSupport](../enums/_browserutils_.browsersupport.md)

### Interfaces

* [Ethereum](../interfaces/_browserutils_.ethereum.md)
* [ExtendedWindow](../interfaces/_browserutils_.extendedwindow.md)
* [InjectedWeb3](../interfaces/_browserutils_.injectedweb3.md)
* [Web3VersionAPI](../interfaces/_browserutils_.web3versionapi.md)
* [WindowWithEthereum](../interfaces/_browserutils_.windowwithethereum.md)
* [WindowWithWeb3](../interfaces/_browserutils_.windowwithweb3.md)

### Functions

* [getBrowserSupport](_browserutils_.md#getbrowsersupport)
* [onAddressChange](_browserutils_.md#onaddresschange)
* [onNetworkChange](_browserutils_.md#onnetworkchange)

## Functions

### getBrowserSupport

▸ **getBrowserSupport**\(\): [_NoMetamask_](../enums/_browserutils_.browsersupport.md#nometamask) _\|_ [_MetamaskLegacy_](../enums/_browserutils_.browsersupport.md#metamasklegacy) _\|_ [_MetamaskModern_](../enums/_browserutils_.browsersupport.md#metamaskmodern) _\|_ [_None_](../enums/_browserutils_.browsersupport.md#none)

_Defined in_ [_src/browserUtils.ts:45_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/browserUtils.ts#L45)

Returns the browser support for Ethereum

**Returns:** [_NoMetamask_](../enums/_browserutils_.browsersupport.md#nometamask) _\|_ [_MetamaskLegacy_](../enums/_browserutils_.browsersupport.md#metamasklegacy) _\|_ [_MetamaskModern_](../enums/_browserutils_.browsersupport.md#metamaskmodern) _\|_ [_None_](../enums/_browserutils_.browsersupport.md#none)

### onAddressChange

▸ **onAddressChange**\(`cb`: function\): _\(Anonymous function\)_

_Defined in_ [_src/browserUtils.ts:189_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/browserUtils.ts#L189)

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

_Defined in_ [_src/browserUtils.ts:225_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/browserUtils.ts#L225)

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

