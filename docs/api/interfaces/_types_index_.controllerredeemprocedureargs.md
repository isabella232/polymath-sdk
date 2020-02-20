# Interface: ControllerRedeemProcedureArgs

Arguments for the [ControllerRedeem](../enums/_types_index_.proceduretype.md#controllerredeem) Procedure

## Hierarchy

* **ControllerRedeemProcedureArgs**

## Index

### Properties

* [amount](_types_index_.controllerredeemprocedureargs.md#amount)
* [data](_types_index_.controllerredeemprocedureargs.md#optional-data)
* [from](_types_index_.controllerredeemprocedureargs.md#from)
* [reason](_types_index_.controllerredeemprocedureargs.md#optional-reason)
* [symbol](_types_index_.controllerredeemprocedureargs.md#symbol)

## Properties

###  amount

• **amount**: *BigNumber*

*Defined in [src/types/index.ts:975](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/types/index.ts#L975)*

amount of tokens being redeemed (burned)

___

### `Optional` data

• **data**? : *undefined | string*

*Defined in [src/types/index.ts:979](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/types/index.ts#L979)*

extra KYC transfer data

___

###  from

• **from**: *string*

*Defined in [src/types/index.ts:967](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/types/index.ts#L967)*

wallet address from which tokens will be redeemed (burned)

___

### `Optional` reason

• **reason**? : *undefined | string*

*Defined in [src/types/index.ts:983](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/types/index.ts#L983)*

reason why tokens are being redeemed

___

###  symbol

• **symbol**: *string*

*Defined in [src/types/index.ts:971](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/types/index.ts#L971)*

symbol of the Security Token
