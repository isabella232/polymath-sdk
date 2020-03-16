# Interface: Ethereum

## Hierarchy

* Provider

  ↳ **Ethereum**

## Index

### Properties

* [_metamask](_browserutils_.ethereum.md#optional-_metamask)
* [networkVersion](_browserutils_.ethereum.md#networkversion)

### Methods

* [enable](_browserutils_.ethereum.md#enable)
* [sendAsync](_browserutils_.ethereum.md#sendasync)

## Properties

### `Optional` _metamask

• **_metamask**? : *undefined | object*

*Defined in [src/browserUtils.ts:15](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/browserUtils.ts#L15)*

___

###  networkVersion

• **networkVersion**: *string*

*Defined in [src/browserUtils.ts:14](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/browserUtils.ts#L14)*

## Methods

###  enable

▸ **enable**(): *Promise‹any›*

*Defined in [src/browserUtils.ts:18](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/browserUtils.ts#L18)*

**Returns:** *Promise‹any›*

___

###  sendAsync

▸ **sendAsync**(`payload`: JSONRPCRequestPayload, `callback`: JSONRPCErrorCallback): *void*

*Inherited from void*

Defined in node_modules/ethereum-types/lib/index.d.ts:13

**Parameters:**

Name | Type |
------ | ------ |
`payload` | JSONRPCRequestPayload |
`callback` | JSONRPCErrorCallback |

**Returns:** *void*
