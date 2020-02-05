# Class: DividendDistribution

Class used to manage the dividend distribution functionality

## Hierarchy

- [Entity](_entities_entity_.entity.md)‹[Params](../interfaces/_entities_dividenddistribution_.params.md)›

  ↳ **DividendDistribution**

## Index

### Constructors

- [constructor](_entities_dividenddistribution_.dividenddistribution.md#constructor)

### Properties

- [amount](_entities_dividenddistribution_.dividenddistribution.md#amount)
- [checkpointId](_entities_dividenddistribution_.dividenddistribution.md#checkpointid)
- [claimedAmount](_entities_dividenddistribution_.dividenddistribution.md#claimedamount)
- [context](_entities_dividenddistribution_.dividenddistribution.md#protected-context)
- [created](_entities_dividenddistribution_.dividenddistribution.md#created)
- [currency](_entities_dividenddistribution_.dividenddistribution.md#currency)
- [expiry](_entities_dividenddistribution_.dividenddistribution.md#expiry)
- [index](_entities_dividenddistribution_.dividenddistribution.md#index)
- [maturity](_entities_dividenddistribution_.dividenddistribution.md#maturity)
- [name](_entities_dividenddistribution_.dividenddistribution.md#name)
- [reclaimed](_entities_dividenddistribution_.dividenddistribution.md#reclaimed)
- [securityTokenId](_entities_dividenddistribution_.dividenddistribution.md#securitytokenid)
- [securityTokenSymbol](_entities_dividenddistribution_.dividenddistribution.md#securitytokensymbol)
- [shareholders](_entities_dividenddistribution_.dividenddistribution.md#shareholders)
- [totalSupply](_entities_dividenddistribution_.dividenddistribution.md#totalsupply)
- [totalWithheld](_entities_dividenddistribution_.dividenddistribution.md#totalwithheld)
- [totalWithheldWithdrawn](_entities_dividenddistribution_.dividenddistribution.md#totalwithheldwithdrawn)
- [uid](_entities_dividenddistribution_.dividenddistribution.md#uid)

### Methods

- [\_refresh](_entities_dividenddistribution_.dividenddistribution.md#_refresh)
- [pullPayment](_entities_dividenddistribution_.dividenddistribution.md#pullpayment)
- [pushPayment](_entities_dividenddistribution_.dividenddistribution.md#pushpayment)
- [toPojo](_entities_dividenddistribution_.dividenddistribution.md#topojo)
- [withdrawTaxes](_entities_dividenddistribution_.dividenddistribution.md#withdrawtaxes)
- [generateId](_entities_dividenddistribution_.dividenddistribution.md#static-generateid)
- [unserialize](_entities_dividenddistribution_.dividenddistribution.md#static-unserialize)

## Constructors

### constructor

\+ **new DividendDistribution**(`params`: [Params](../interfaces/_entities_dividenddistribution_.params.md) & [UniqueIdentifiers](../interfaces/_entities_dividenddistribution_.uniqueidentifiers.md), `context`: [Context](_context_.context.md)): _[DividendDistribution](_entities_dividenddistribution_.dividenddistribution.md)_

_Defined in [src/entities/DividendDistribution.ts:146](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/DividendDistribution.ts#L146)_

Create a new Dividend Distribution instance

**Parameters:**

| Name      | Type                                                                                                                                                        |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `params`  | [Params](../interfaces/_entities_dividenddistribution_.params.md) & [UniqueIdentifiers](../interfaces/_entities_dividenddistribution_.uniqueidentifiers.md) |
| `context` | [Context](_context_.context.md)                                                                                                                             |

**Returns:** _[DividendDistribution](_entities_dividenddistribution_.dividenddistribution.md)_

## Properties

### amount

• **amount**: _BigNumber_

_Defined in [src/entities/DividendDistribution.ts:128](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/DividendDistribution.ts#L128)_

---

### checkpointId

• **checkpointId**: _string_

_Defined in [src/entities/DividendDistribution.ts:116](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/DividendDistribution.ts#L116)_

---

### claimedAmount

• **claimedAmount**: _BigNumber_

_Defined in [src/entities/DividendDistribution.ts:130](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/DividendDistribution.ts#L130)_

---

### `Protected` context

• **context**: _[Context](_context_.context.md)_

_Defined in [src/entities/DividendDistribution.ts:146](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/DividendDistribution.ts#L146)_

---

### created

• **created**: _Date_

_Defined in [src/entities/DividendDistribution.ts:122](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/DividendDistribution.ts#L122)_

---

### currency

• **currency**: _string | null_

_Defined in [src/entities/DividendDistribution.ts:144](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/DividendDistribution.ts#L144)_

---

### expiry

• **expiry**: _Date_

_Defined in [src/entities/DividendDistribution.ts:126](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/DividendDistribution.ts#L126)_

---

### index

• **index**: _number_

_Defined in [src/entities/DividendDistribution.ts:114](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/DividendDistribution.ts#L114)_

---

### maturity

• **maturity**: _Date_

_Defined in [src/entities/DividendDistribution.ts:124](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/DividendDistribution.ts#L124)_

---

### name

• **name**: _string_

_Defined in [src/entities/DividendDistribution.ts:142](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/DividendDistribution.ts#L142)_

---

### reclaimed

• **reclaimed**: _boolean_

_Defined in [src/entities/DividendDistribution.ts:134](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/DividendDistribution.ts#L134)_

---

### securityTokenId

• **securityTokenId**: _string_

_Defined in [src/entities/DividendDistribution.ts:120](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/DividendDistribution.ts#L120)_

---

### securityTokenSymbol

• **securityTokenSymbol**: _string_

_Defined in [src/entities/DividendDistribution.ts:118](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/DividendDistribution.ts#L118)_

---

### shareholders

• **shareholders**: _[DividendShareholderStatus](../interfaces/_types_index_.dividendshareholderstatus.md)[]_

_Defined in [src/entities/DividendDistribution.ts:140](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/DividendDistribution.ts#L140)_

---

### totalSupply

• **totalSupply**: _BigNumber_

_Defined in [src/entities/DividendDistribution.ts:132](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/DividendDistribution.ts#L132)_

---

### totalWithheld

• **totalWithheld**: _BigNumber_

_Defined in [src/entities/DividendDistribution.ts:136](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/DividendDistribution.ts#L136)_

---

### totalWithheldWithdrawn

• **totalWithheldWithdrawn**: _BigNumber_

_Defined in [src/entities/DividendDistribution.ts:138](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/DividendDistribution.ts#L138)_

---

### uid

• **uid**: _string_

_Overrides [Entity](_entities_entity_.entity.md).[uid](_entities_entity_.entity.md#abstract-uid)_

_Defined in [src/entities/DividendDistribution.ts:112](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/DividendDistribution.ts#L112)_

## Methods

### \_refresh

▸ **\_refresh**(`params`: Partial‹[Params](../interfaces/_entities_dividenddistribution_.params.md)›): _void_

_Overrides [Entity](_entities_entity_.entity.md).[\_refresh](_entities_entity_.entity.md#abstract-_refresh)_

_Defined in [src/entities/DividendDistribution.ts:290](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/DividendDistribution.ts#L290)_

Hydrate the Dividend Distribution entity

**Parameters:**

| Name     | Type                                                                       |
| -------- | -------------------------------------------------------------------------- |
| `params` | Partial‹[Params](../interfaces/_entities_dividenddistribution_.params.md)› |

**Returns:** _void_

---

### pullPayment

▸ **pullPayment**(): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[PullDividendPaymentProcedureArgs](../interfaces/_types_index_.pulldividendpaymentprocedureargs.md), void››_

_Defined in [src/entities/DividendDistribution.ts:215](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/DividendDistribution.ts#L215)_

Pull payment from this dividend distribution to the current address

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[PullDividendPaymentProcedureArgs](../interfaces/_types_index_.pulldividendpaymentprocedureargs.md), void››_

---

### pushPayment

▸ **pushPayment**(): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[PushDividendPaymentProcedureArgs](../interfaces/_types_index_.pushdividendpaymentprocedureargs.md), void››_

_Defined in [src/entities/DividendDistribution.ts:200](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/DividendDistribution.ts#L200)_

Push payment for this dividend distribution

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[PushDividendPaymentProcedureArgs](../interfaces/_types_index_.pushdividendpaymentprocedureargs.md), void››_

---

### toPojo

▸ **toPojo**(): _object_

_Overrides [Entity](_entities_entity_.entity.md).[toPojo](_entities_entity_.entity.md#abstract-topojo)_

_Defined in [src/entities/DividendDistribution.ts:245](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/DividendDistribution.ts#L245)_

Convert entity to POJO (Plain Old Javascript Object)

**Returns:** _object_

- **amount**: _BigNumber_

- **checkpointId**: _string_

- **claimedAmount**: _BigNumber_

- **created**: _Date_

- **currency**: _null | string_

- **expiry**: _Date_

- **index**: _number_

- **maturity**: _Date_

- **name**: _string_

- **reclaimed**: _boolean_

- **securityTokenId**: _string_

- **securityTokenSymbol**: _string_

- **shareholders**: _[DividendShareholderStatus](../interfaces/_types_index_.dividendshareholderstatus.md)[]_

- **totalSupply**: _BigNumber_

- **totalWithheld**: _BigNumber_

- **totalWithheldWithdrawn**: _BigNumber_

- **uid**: _string_

---

### withdrawTaxes

▸ **withdrawTaxes**(): _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[WithdrawTaxesProcedureArgs](../interfaces/_types_index_.withdrawtaxesprocedureargs.md), void››_

_Defined in [src/entities/DividendDistribution.ts:230](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/DividendDistribution.ts#L230)_

Withdraw collected taxes from this dividend distribution

**Returns:** _Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[WithdrawTaxesProcedureArgs](../interfaces/_types_index_.withdrawtaxesprocedureargs.md), void››_

---

### `Static` generateId

▸ **generateId**(`__namedParameters`: object): _string_

_Defined in [src/entities/DividendDistribution.ts:87](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/DividendDistribution.ts#L87)_

Generate the Dividend Distribution's UUID from its identifying properties

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name              | Type   |
| ----------------- | ------ |
| `index`           | number |
| `securityTokenId` | string |

**Returns:** _string_

---

### `Static` unserialize

▸ **unserialize**(`serialized`: string): _[UniqueIdentifiers](../interfaces/_entities_dividenddistribution_.uniqueidentifiers.md)_

_Defined in [src/entities/DividendDistribution.ts:99](https://github.com/PolymathNetwork/polymath-sdk/blob/660aba8/src/entities/DividendDistribution.ts#L99)_

Unserialize string to a Dividend Distribution object representation

**Parameters:**

| Name         | Type   |
| ------------ | ------ |
| `serialized` | string |

**Returns:** _[UniqueIdentifiers](../interfaces/_entities_dividenddistribution_.uniqueidentifiers.md)_
