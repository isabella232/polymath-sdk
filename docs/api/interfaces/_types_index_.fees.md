# Interface: Fees

Fees associated with running a [TransactionQueue](../classes/_entities_transactionqueue_.transactionqueue.md)

## Hierarchy

- **Fees**

## Index

### Properties

- [poly](_types_index_.fees.md#poly)
- [usd](_types_index_.fees.md#usd)

## Properties

### poly

• **poly**: _BigNumber_

_Defined in [src/types/index.ts:1409](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/types/index.ts#L1409)_

fees expressed in POLY

---

### usd

• **usd**: _BigNumber | null_

_Defined in [src/types/index.ts:1405](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/types/index.ts#L1405)_

fees expressed in USD. Can be null if the Smart Contract doesn't specify one
