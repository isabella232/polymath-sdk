# Class: PolymathError

Wraps an error to give more information about it's type

## Hierarchy

- Error

  ↳ **PolymathError**

## Index

### Constructors

- [constructor](_polymatherror_.polymatherror.md#constructor)

### Properties

- [code](_polymatherror_.polymatherror.md#code)
- [message](_polymatherror_.polymatherror.md#message)
- [name](_polymatherror_.polymatherror.md#name)
- [stack](_polymatherror_.polymatherror.md#optional-stack)
- [Error](_polymatherror_.polymatherror.md#static-error)

## Constructors

### constructor

\+ **new PolymathError**(`__namedParameters`: object): _[PolymathError](_polymatherror_.polymatherror.md)_

_Defined in [src/PolymathError.ts:24](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/PolymathError.ts#L24)_

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name      | Type                                             |
| --------- | ------------------------------------------------ |
| `code`    | [ErrorCode](../enums/_types_index_.errorcode.md) |
| `message` | undefined &#124; string                          |

**Returns:** _[PolymathError](_polymatherror_.polymatherror.md)_

## Properties

### code

• **code**: _[ErrorCode](../enums/_types_index_.errorcode.md)_

_Defined in [src/PolymathError.ts:24](https://github.com/PolymathNetwork/polymath-sdk/blob/d34930f/src/PolymathError.ts#L24)_

---

### message

• **message**: _string_

_Inherited from void_

Defined in node_modules/typescript/lib/lib.es5.d.ts:964

---

### name

• **name**: _string_

_Inherited from void_

Defined in node_modules/typescript/lib/lib.es5.d.ts:963

---

### `Optional` stack

• **stack**? : _undefined | string_

_Inherited from void_

_Overrides void_

Defined in node_modules/typescript/lib/lib.es5.d.ts:965

---

### `Static` Error

▪ **Error**: _ErrorConstructor_

Defined in node_modules/typescript/lib/lib.es5.d.ts:974
