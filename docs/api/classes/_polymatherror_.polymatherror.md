# Class: PolymathError

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

###  constructor

\+ **new PolymathError**(`__namedParameters`: object): *[PolymathError](_polymatherror_.polymatherror.md)*

*Defined in [src/PolymathError.ts:24](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/PolymathError.ts#L24)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`code` | [ErrorCode](../enums/_types_index_.errorcode.md) |
`message` | undefined &#124; string |

**Returns:** *[PolymathError](_polymatherror_.polymatherror.md)*

## Properties

###  code

• **code**: *[ErrorCode](../enums/_types_index_.errorcode.md)*

*Defined in [src/PolymathError.ts:24](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/PolymathError.ts#L24)*

___

###  message

• **message**: *string*

*Inherited from void*

Defined in node_modules/typescript/lib/lib.es5.d.ts:964

___

###  name

• **name**: *string*

*Inherited from void*

Defined in node_modules/typescript/lib/lib.es5.d.ts:963

___

### `Optional` stack

• **stack**? : *undefined | string*

*Inherited from void*

*Overrides void*

Defined in node_modules/typescript/lib/lib.es5.d.ts:965

___

### `Static` Error

▪ **Error**: *ErrorConstructor*

Defined in node_modules/typescript/lib/lib.es5.d.ts:974
