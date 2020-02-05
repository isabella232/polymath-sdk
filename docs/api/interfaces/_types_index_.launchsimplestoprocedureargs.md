# Interface: LaunchSimpleStoProcedureArgs

Arguments for the [LaunchSimpleSto](../enums/_types_index_.proceduretype.md#launchsimplesto) Procedure

## Hierarchy

- **LaunchSimpleStoProcedureArgs**

## Index

### Properties

- [allowPreIssuing](_types_index_.launchsimplestoprocedureargs.md#optional-allowpreissuing)
- [currency](_types_index_.launchsimplestoprocedureargs.md#currency)
- [endDate](_types_index_.launchsimplestoprocedureargs.md#enddate)
- [raisedFundsWallet](_types_index_.launchsimplestoprocedureargs.md#raisedfundswallet)
- [rate](_types_index_.launchsimplestoprocedureargs.md#rate)
- [startDate](_types_index_.launchsimplestoprocedureargs.md#startdate)
- [symbol](_types_index_.launchsimplestoprocedureargs.md#symbol)
- [tokensOnSale](_types_index_.launchsimplestoprocedureargs.md#tokensonsale)
- [unsoldTokensWallet](_types_index_.launchsimplestoprocedureargs.md#unsoldtokenswallet)

## Properties

### `Optional` allowPreIssuing

• **allowPreIssuing**? : _undefined | false | true_

_Defined in [src/types/index.ts:539](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/types/index.ts#L539)_

whether the total amount of Security Tokens that will be sold should be issued at the time the STO starts.
Otherwise, they will be issued on each purchase. Defaults to false

---

### currency

• **currency**: _Currency.ETH | Currency.POLY_

_Defined in [src/types/index.ts:526](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/types/index.ts#L526)_

currency for the Simple STO fund raise

---

### endDate

• **endDate**: _Date_

_Defined in [src/types/index.ts:514](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/types/index.ts#L514)_

end date of the STO

---

### raisedFundsWallet

• **raisedFundsWallet**: _string_

_Defined in [src/types/index.ts:530](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/types/index.ts#L530)_

wallet to which raised funds will be sent

---

### rate

• **rate**: _BigNumber_

_Defined in [src/types/index.ts:522](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/types/index.ts#L522)_

amount of tokens sold per unit of currency

---

### startDate

• **startDate**: _Date_

_Defined in [src/types/index.ts:510](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/types/index.ts#L510)_

start date of the STO

---

### symbol

• **symbol**: _string_

_Defined in [src/types/index.ts:506](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/types/index.ts#L506)_

symbol of the Security Token

---

### tokensOnSale

• **tokensOnSale**: _BigNumber_

_Defined in [src/types/index.ts:518](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/types/index.ts#L518)_

number of tokens that will be sold

---

### unsoldTokensWallet

• **unsoldTokensWallet**: _string_

_Defined in [src/types/index.ts:534](https://github.com/PolymathNetwork/polymath-sdk/blob/d80c6e9/src/types/index.ts#L534)_

wallet to which unsold tokens will be sent if the STO expires
