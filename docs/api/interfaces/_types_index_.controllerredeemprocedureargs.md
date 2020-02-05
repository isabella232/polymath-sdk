# Interface: ControllerRedeemProcedureArgs

Arguments for the [ControllerRedeem](../enums/_types_index_.proceduretype.md#controllerredeem) Procedure

## Hierarchy

- **ControllerRedeemProcedureArgs**

## Index

### Properties

- [amount](_types_index_.controllerredeemprocedureargs.md#amount)
- [data](_types_index_.controllerredeemprocedureargs.md#optional-data)
- [from](_types_index_.controllerredeemprocedureargs.md#from)
- [reason](_types_index_.controllerredeemprocedureargs.md#optional-reason)
- [symbol](_types_index_.controllerredeemprocedureargs.md#symbol)

## Properties

### amount

• **amount**: _BigNumber_

_Defined in [src/types/index.ts:975](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/types/index.ts#L975)_

amount of tokens being redeemed (burned)

---

### `Optional` data

• **data**? : _undefined | string_

_Defined in [src/types/index.ts:979](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/types/index.ts#L979)_

extra KYC transfer data

---

### from

• **from**: _string_

_Defined in [src/types/index.ts:967](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/types/index.ts#L967)_

wallet address from which tokens will be redeemed (burned)

---

### `Optional` reason

• **reason**? : _undefined | string_

_Defined in [src/types/index.ts:983](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/types/index.ts#L983)_

reason why tokens are being redeemed

---

### symbol

• **symbol**: _string_

_Defined in [src/types/index.ts:971](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/types/index.ts#L971)_

symbol of the Security Token
