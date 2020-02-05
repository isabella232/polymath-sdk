# Class: DividendDistribution

Class used to manage the dividend distribution functionality

## Hierarchy

* [Entity](_entities_entity_.entity.md)‹[Params](../interfaces/_entities_dividenddistribution_.params.md)›

  ↳ **DividendDistribution**

## Index

### Constructors

* [constructor](_entities_dividenddistribution_.dividenddistribution.md#constructor)

### Properties

* [amount](_entities_dividenddistribution_.dividenddistribution.md#amount)
* [checkpointId](_entities_dividenddistribution_.dividenddistribution.md#checkpointid)
* [claimedAmount](_entities_dividenddistribution_.dividenddistribution.md#claimedamount)
* [context](_entities_dividenddistribution_.dividenddistribution.md#protected-context)
* [created](_entities_dividenddistribution_.dividenddistribution.md#created)
* [currency](_entities_dividenddistribution_.dividenddistribution.md#currency)
* [expiry](_entities_dividenddistribution_.dividenddistribution.md#expiry)
* [index](_entities_dividenddistribution_.dividenddistribution.md#index)
* [maturity](_entities_dividenddistribution_.dividenddistribution.md#maturity)
* [name](_entities_dividenddistribution_.dividenddistribution.md#name)
* [reclaimed](_entities_dividenddistribution_.dividenddistribution.md#reclaimed)
* [securityTokenId](_entities_dividenddistribution_.dividenddistribution.md#securitytokenid)
* [securityTokenSymbol](_entities_dividenddistribution_.dividenddistribution.md#securitytokensymbol)
* [shareholders](_entities_dividenddistribution_.dividenddistribution.md#shareholders)
* [totalSupply](_entities_dividenddistribution_.dividenddistribution.md#totalsupply)
* [totalWithheld](_entities_dividenddistribution_.dividenddistribution.md#totalwithheld)
* [totalWithheldWithdrawn](_entities_dividenddistribution_.dividenddistribution.md#totalwithheldwithdrawn)
* [uid](_entities_dividenddistribution_.dividenddistribution.md#uid)

### Methods

* [_refresh](_entities_dividenddistribution_.dividenddistribution.md#_refresh)
* [pullPayment](_entities_dividenddistribution_.dividenddistribution.md#pullpayment)
* [pushPayment](_entities_dividenddistribution_.dividenddistribution.md#pushpayment)
* [toPojo](_entities_dividenddistribution_.dividenddistribution.md#topojo)
* [withdrawTaxes](_entities_dividenddistribution_.dividenddistribution.md#withdrawtaxes)
* [generateId](_entities_dividenddistribution_.dividenddistribution.md#static-generateid)
* [unserialize](_entities_dividenddistribution_.dividenddistribution.md#static-unserialize)

## Constructors

###  constructor

\+ **new DividendDistribution**(`params`: [Params](../interfaces/_entities_dividenddistribution_.params.md) & [UniqueIdentifiers](../interfaces/_entities_dividenddistribution_.uniqueidentifiers.md), `context`: [Context](_context_.context.md)): *[DividendDistribution](_entities_dividenddistribution_.dividenddistribution.md)*

*Defined in [src/entities/DividendDistribution.ts:146](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/DividendDistribution.ts#L146)*

Create a new Dividend Distribution instance

**Parameters:**

Name | Type |
------ | ------ |
`params` | [Params](../interfaces/_entities_dividenddistribution_.params.md) & [UniqueIdentifiers](../interfaces/_entities_dividenddistribution_.uniqueidentifiers.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[DividendDistribution](_entities_dividenddistribution_.dividenddistribution.md)*

## Properties

###  amount

• **amount**: *BigNumber*

*Defined in [src/entities/DividendDistribution.ts:128](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/DividendDistribution.ts#L128)*

___

###  checkpointId

• **checkpointId**: *string*

*Defined in [src/entities/DividendDistribution.ts:116](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/DividendDistribution.ts#L116)*

___

###  claimedAmount

• **claimedAmount**: *BigNumber*

*Defined in [src/entities/DividendDistribution.ts:130](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/DividendDistribution.ts#L130)*

___

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Defined in [src/entities/DividendDistribution.ts:146](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/DividendDistribution.ts#L146)*

___

###  created

• **created**: *Date*

*Defined in [src/entities/DividendDistribution.ts:122](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/DividendDistribution.ts#L122)*

___

###  currency

• **currency**: *string | null*

*Defined in [src/entities/DividendDistribution.ts:144](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/DividendDistribution.ts#L144)*

___

###  expiry

• **expiry**: *Date*

*Defined in [src/entities/DividendDistribution.ts:126](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/DividendDistribution.ts#L126)*

___

###  index

• **index**: *number*

*Defined in [src/entities/DividendDistribution.ts:114](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/DividendDistribution.ts#L114)*

___

###  maturity

• **maturity**: *Date*

*Defined in [src/entities/DividendDistribution.ts:124](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/DividendDistribution.ts#L124)*

___

###  name

• **name**: *string*

*Defined in [src/entities/DividendDistribution.ts:142](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/DividendDistribution.ts#L142)*

___

###  reclaimed

• **reclaimed**: *boolean*

*Defined in [src/entities/DividendDistribution.ts:134](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/DividendDistribution.ts#L134)*

___

###  securityTokenId

• **securityTokenId**: *string*

*Defined in [src/entities/DividendDistribution.ts:120](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/DividendDistribution.ts#L120)*

___

###  securityTokenSymbol

• **securityTokenSymbol**: *string*

*Defined in [src/entities/DividendDistribution.ts:118](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/DividendDistribution.ts#L118)*

___

###  shareholders

• **shareholders**: *[DividendShareholderStatus](../interfaces/_types_index_.dividendshareholderstatus.md)[]*

*Defined in [src/entities/DividendDistribution.ts:140](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/DividendDistribution.ts#L140)*

___

###  totalSupply

• **totalSupply**: *BigNumber*

*Defined in [src/entities/DividendDistribution.ts:132](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/DividendDistribution.ts#L132)*

___

###  totalWithheld

• **totalWithheld**: *BigNumber*

*Defined in [src/entities/DividendDistribution.ts:136](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/DividendDistribution.ts#L136)*

___

###  totalWithheldWithdrawn

• **totalWithheldWithdrawn**: *BigNumber*

*Defined in [src/entities/DividendDistribution.ts:138](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/DividendDistribution.ts#L138)*

___

###  uid

• **uid**: *string*

*Overrides [Entity](_entities_entity_.entity.md).[uid](_entities_entity_.entity.md#abstract-uid)*

*Defined in [src/entities/DividendDistribution.ts:112](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/DividendDistribution.ts#L112)*

## Methods

###  _refresh

▸ **_refresh**(`params`: Partial‹[Params](../interfaces/_entities_dividenddistribution_.params.md)›): *void*

*Overrides [Entity](_entities_entity_.entity.md).[_refresh](_entities_entity_.entity.md#abstract-_refresh)*

*Defined in [src/entities/DividendDistribution.ts:290](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/DividendDistribution.ts#L290)*

Hydrate the Dividend Distribution entity

**Parameters:**

Name | Type |
------ | ------ |
`params` | Partial‹[Params](../interfaces/_entities_dividenddistribution_.params.md)› |

**Returns:** *void*

___

###  pullPayment

▸ **pullPayment**(): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[PullDividendPaymentProcedureArgs](../interfaces/_types_index_.pulldividendpaymentprocedureargs.md), void››*

*Defined in [src/entities/DividendDistribution.ts:215](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/DividendDistribution.ts#L215)*

Pull payment from this dividend distribution to the current address

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[PullDividendPaymentProcedureArgs](../interfaces/_types_index_.pulldividendpaymentprocedureargs.md), void››*

___

###  pushPayment

▸ **pushPayment**(): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[PushDividendPaymentProcedureArgs](../interfaces/_types_index_.pushdividendpaymentprocedureargs.md), void››*

*Defined in [src/entities/DividendDistribution.ts:200](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/DividendDistribution.ts#L200)*

Push payment for this dividend distribution

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[PushDividendPaymentProcedureArgs](../interfaces/_types_index_.pushdividendpaymentprocedureargs.md), void››*

___

###  toPojo

▸ **toPojo**(): *object*

*Overrides [Entity](_entities_entity_.entity.md).[toPojo](_entities_entity_.entity.md#abstract-topojo)*

*Defined in [src/entities/DividendDistribution.ts:245](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/DividendDistribution.ts#L245)*

Convert entity to POJO (Plain Old Javascript Object)

**Returns:** *object*

* **amount**: *BigNumber*

* **checkpointId**: *string*

* **claimedAmount**: *BigNumber*

* **created**: *Date*

* **currency**: *null | string*

* **expiry**: *Date*

* **index**: *number*

* **maturity**: *Date*

* **name**: *string*

* **reclaimed**: *boolean*

* **securityTokenId**: *string*

* **securityTokenSymbol**: *string*

* **shareholders**: *[DividendShareholderStatus](../interfaces/_types_index_.dividendshareholderstatus.md)[]*

* **totalSupply**: *BigNumber*

* **totalWithheld**: *BigNumber*

* **totalWithheldWithdrawn**: *BigNumber*

* **uid**: *string*

___

###  withdrawTaxes

▸ **withdrawTaxes**(): *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[WithdrawTaxesProcedureArgs](../interfaces/_types_index_.withdrawtaxesprocedureargs.md), void››*

*Defined in [src/entities/DividendDistribution.ts:230](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/DividendDistribution.ts#L230)*

Withdraw collected taxes from this dividend distribution

**Returns:** *Promise‹[TransactionQueue](_entities_transactionqueue_.transactionqueue.md)‹[WithdrawTaxesProcedureArgs](../interfaces/_types_index_.withdrawtaxesprocedureargs.md), void››*

___

### `Static` generateId

▸ **generateId**(`__namedParameters`: object): *string*

*Defined in [src/entities/DividendDistribution.ts:87](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/DividendDistribution.ts#L87)*

Generate the Dividend Distribution's UUID from its identifying properties

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`index` | number |
`securityTokenId` | string |

**Returns:** *string*

___

### `Static` unserialize

▸ **unserialize**(`serialized`: string): *[UniqueIdentifiers](../interfaces/_entities_dividenddistribution_.uniqueidentifiers.md)*

*Defined in [src/entities/DividendDistribution.ts:99](https://github.com/PolymathNetwork/polymath-sdk/blob/fb8c7c9/src/entities/DividendDistribution.ts#L99)*

Unserialize string to a Dividend Distribution object representation

**Parameters:**

Name | Type |
------ | ------ |
`serialized` | string |

**Returns:** *[UniqueIdentifiers](../interfaces/_entities_dividenddistribution_.uniqueidentifiers.md)*
