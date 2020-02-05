# Interface: Ethereum

## Hierarchy

- Provider

  ↳ **Ethereum**

## Index

### Properties

- [\_metamask](_browserutils_.ethereum.md#optional-_metamask)
- [networkVersion](_browserutils_.ethereum.md#networkversion)

### Methods

- [enable](_browserutils_.ethereum.md#enable)
- [sendAsync](_browserutils_.ethereum.md#sendasync)

## Properties

### `Optional` \_metamask

• **\_metamask**? : _undefined | object_

_Defined in [src/browserUtils.ts:15](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/browserUtils.ts#L15)_

---

### networkVersion

• **networkVersion**: _string_

_Defined in [src/browserUtils.ts:14](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/browserUtils.ts#L14)_

## Methods

### enable

▸ **enable**(): _Promise‹any›_

_Defined in [src/browserUtils.ts:18](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/browserUtils.ts#L18)_

**Returns:** _Promise‹any›_

---

### sendAsync

▸ **sendAsync**(`payload`: JSONRPCRequestPayload, `callback`: JSONRPCErrorCallback): _void_

_Inherited from void_

Defined in node_modules/ethereum-types/lib/index.d.ts:13

**Parameters:**

| Name       | Type                  |
| ---------- | --------------------- |
| `payload`  | JSONRPCRequestPayload |
| `callback` | JSONRPCErrorCallback  |

**Returns:** _void_
