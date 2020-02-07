# External module: "browserUtils"

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

###  getBrowserSupport

▸ **getBrowserSupport**(): *[NoMetamask](../enums/_browserutils_.browsersupport.md#nometamask) | [MetamaskLegacy](../enums/_browserutils_.browsersupport.md#metamasklegacy) | [MetamaskModern](../enums/_browserutils_.browsersupport.md#metamaskmodern) | [None](../enums/_browserutils_.browsersupport.md#none)*

*Defined in [src/browserUtils.ts:45](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/browserUtils.ts#L45)*

Returns the browser support for Ethereum

**Returns:** *[NoMetamask](../enums/_browserutils_.browsersupport.md#nometamask) | [MetamaskLegacy](../enums/_browserutils_.browsersupport.md#metamasklegacy) | [MetamaskModern](../enums/_browserutils_.browsersupport.md#metamaskmodern) | [None](../enums/_browserutils_.browsersupport.md#none)*

___

###  onAddressChange

▸ **onAddressChange**(`cb`: function): *(Anonymous function)*

*Defined in [src/browserUtils.ts:189](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/browserUtils.ts#L189)*

Runs the callback anytime the wallet address changes in the browser

**Parameters:**

▪ **cb**: *function*

callback that receives the new address and the previous one

▸ (`newAddress`: string, `previousAddress?`: undefined | string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`newAddress` | string |
`previousAddress?` | undefined &#124; string |

**Returns:** *(Anonymous function)*

an unsubscribe function

___

###  onNetworkChange

▸ **onNetworkChange**(`cb`: function): *(Anonymous function)*

*Defined in [src/browserUtils.ts:225](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/browserUtils.ts#L225)*

Runs the callback anytime the current network changes in the browser

**Parameters:**

▪ **cb**: *function*

callback that receives the new network id and the previous one

▸ (`newNetwork`: number, `previousNetwork?`: undefined | number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`newNetwork` | number |
`previousNetwork?` | undefined &#124; number |

**Returns:** *(Anonymous function)*

an unsubscribe function
