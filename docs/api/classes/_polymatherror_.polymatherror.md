# PolymathError

Wraps an error to give more information about it's type

## Hierarchy

* Error

  ↳ **PolymathError**

## Index

### Constructors

* [constructor](_polymatherror_.polymatherror.md#constructor)

### Properties

* [code](_polymatherror_.polymatherror.md#code)
* [message](_polymatherror_.polymatherror.md#message)
* [name](_polymatherror_.polymatherror.md#name)
* [stack](_polymatherror_.polymatherror.md#optional-stack)
* [Error](_polymatherror_.polymatherror.md#static-error)

## Constructors

### constructor

+ **new PolymathError**\(`__namedParameters`: object\): [_PolymathError_](_polymatherror_.polymatherror.md)

_Defined in_ [_src/PolymathError.ts:24_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/PolymathError.ts#L24)

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name | Type |
| :--- | :--- |
| `code` | [ErrorCode](../enums/_types_index_.errorcode.md) |
| `message` | undefined \| string |

**Returns:** [_PolymathError_](_polymatherror_.polymatherror.md)

## Properties

### code

• **code**: [_ErrorCode_](../enums/_types_index_.errorcode.md)

_Defined in_ [_src/PolymathError.ts:24_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/PolymathError.ts#L24)

### message

• **message**: _string_

_Inherited from void_

Defined in node\_modules/typescript/lib/lib.es5.d.ts:964

### name

• **name**: _string_

_Inherited from void_

Defined in node\_modules/typescript/lib/lib.es5.d.ts:963

### `Optional` stack

• **stack**? : _undefined \| string_

_Inherited from void_

_Overrides void_

Defined in node\_modules/typescript/lib/lib.es5.d.ts:965

### `Static` Error

▪ **Error**: _ErrorConstructor_

Defined in node\_modules/typescript/lib/lib.es5.d.ts:974

