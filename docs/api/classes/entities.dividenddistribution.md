# Class: DividendDistribution

Class used to manage the dividend distribution functionality

## Hierarchy

* [Entity](entities.entity.md)‹[Params](../interfaces/entities.params-10.md)›

  ↳ **DividendDistribution**

## Index

### Constructors

* [constructor](entities.dividenddistribution.md#constructor)

### Properties

* [amount](entities.dividenddistribution.md#amount)
* [checkpointId](entities.dividenddistribution.md#checkpointid)
* [claimedAmount](entities.dividenddistribution.md#claimedamount)
* [context](entities.dividenddistribution.md#protected-context)
* [created](entities.dividenddistribution.md#created)
* [currency](entities.dividenddistribution.md#currency)
* [expiry](entities.dividenddistribution.md#expiry)
* [index](entities.dividenddistribution.md#index)
* [maturity](entities.dividenddistribution.md#maturity)
* [name](entities.dividenddistribution.md#name)
* [reclaimed](entities.dividenddistribution.md#reclaimed)
* [securityTokenId](entities.dividenddistribution.md#securitytokenid)
* [securityTokenSymbol](entities.dividenddistribution.md#securitytokensymbol)
* [shareholders](entities.dividenddistribution.md#shareholders)
* [totalSupply](entities.dividenddistribution.md#totalsupply)
* [totalWithheld](entities.dividenddistribution.md#totalwithheld)
* [totalWithheldWithdrawn](entities.dividenddistribution.md#totalwithheldwithdrawn)
* [uid](entities.dividenddistribution.md#uid)

### Methods

* [_refresh](entities.dividenddistribution.md#_refresh)
* [pullPayment](entities.dividenddistribution.md#pullpayment)
* [pushPayment](entities.dividenddistribution.md#pushpayment)
* [toPojo](entities.dividenddistribution.md#topojo)
* [withdrawTaxes](entities.dividenddistribution.md#withdrawtaxes)
* [generateId](entities.dividenddistribution.md#static-generateid)
* [unserialize](entities.dividenddistribution.md#static-unserialize)

## Constructors

###  constructor

\+ **new DividendDistribution**(`params`: [Params](../interfaces/entities.params-10.md) & [UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-4.md), `context`: [Context](_context_.context.md)): *[DividendDistribution](entities.dividenddistribution.md)*

*Defined in [src/entities/DividendDistribution.ts:151](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/DividendDistribution.ts#L151)*

Create a new Dividend Distribution instance

**Parameters:**

Name | Type |
------ | ------ |
`params` | [Params](../interfaces/entities.params-10.md) & [UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-4.md) |
`context` | [Context](_context_.context.md) |

**Returns:** *[DividendDistribution](entities.dividenddistribution.md)*

## Properties

###  amount

• **amount**: *BigNumber*

*Defined in [src/entities/DividendDistribution.ts:133](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/DividendDistribution.ts#L133)*

___

###  checkpointId

• **checkpointId**: *string*

*Defined in [src/entities/DividendDistribution.ts:121](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/DividendDistribution.ts#L121)*

___

###  claimedAmount

• **claimedAmount**: *BigNumber*

*Defined in [src/entities/DividendDistribution.ts:135](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/DividendDistribution.ts#L135)*

___

### `Protected` context

• **context**: *[Context](_context_.context.md)*

*Defined in [src/entities/DividendDistribution.ts:151](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/DividendDistribution.ts#L151)*

___

###  created

• **created**: *Date*

*Defined in [src/entities/DividendDistribution.ts:127](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/DividendDistribution.ts#L127)*

___

###  currency

• **currency**: *string | null*

*Defined in [src/entities/DividendDistribution.ts:149](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/DividendDistribution.ts#L149)*

___

###  expiry

• **expiry**: *Date*

*Defined in [src/entities/DividendDistribution.ts:131](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/DividendDistribution.ts#L131)*

___

###  index

• **index**: *number*

*Defined in [src/entities/DividendDistribution.ts:119](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/DividendDistribution.ts#L119)*

___

###  maturity

• **maturity**: *Date*

*Defined in [src/entities/DividendDistribution.ts:129](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/DividendDistribution.ts#L129)*

___

###  name

• **name**: *string*

*Defined in [src/entities/DividendDistribution.ts:147](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/DividendDistribution.ts#L147)*

___

###  reclaimed

• **reclaimed**: *boolean*

*Defined in [src/entities/DividendDistribution.ts:139](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/DividendDistribution.ts#L139)*

___

###  securityTokenId

• **securityTokenId**: *string*

*Defined in [src/entities/DividendDistribution.ts:125](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/DividendDistribution.ts#L125)*

___

###  securityTokenSymbol

• **securityTokenSymbol**: *string*

*Defined in [src/entities/DividendDistribution.ts:123](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/DividendDistribution.ts#L123)*

___

###  shareholders

• **shareholders**: *DividendShareholderStatus[]*

*Defined in [src/entities/DividendDistribution.ts:145](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/DividendDistribution.ts#L145)*

___

###  totalSupply

• **totalSupply**: *BigNumber*

*Defined in [src/entities/DividendDistribution.ts:137](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/DividendDistribution.ts#L137)*

___

###  totalWithheld

• **totalWithheld**: *BigNumber*

*Defined in [src/entities/DividendDistribution.ts:141](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/DividendDistribution.ts#L141)*

___

###  totalWithheldWithdrawn

• **totalWithheldWithdrawn**: *BigNumber*

*Defined in [src/entities/DividendDistribution.ts:143](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/DividendDistribution.ts#L143)*

___

###  uid

• **uid**: *string*

*Overrides [Entity](entities.entity.md).[uid](entities.entity.md#abstract-uid)*

*Defined in [src/entities/DividendDistribution.ts:117](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/DividendDistribution.ts#L117)*

## Methods

###  _refresh

▸ **_refresh**(`params`: Partial‹[Params](../interfaces/entities.params-10.md)›): *void*

*Overrides [Entity](entities.entity.md).[_refresh](entities.entity.md#abstract-_refresh)*

*Defined in [src/entities/DividendDistribution.ts:295](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/DividendDistribution.ts#L295)*

Hydrate the Dividend Distribution entity

**Parameters:**

Name | Type |
------ | ------ |
`params` | Partial‹[Params](../interfaces/entities.params-10.md)› |

**Returns:** *void*

___

###  pullPayment

▸ **pullPayment**(): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹PullDividendPaymentProcedureArgs, void››*

*Defined in [src/entities/DividendDistribution.ts:220](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/DividendDistribution.ts#L220)*

Pull payment from this dividend distribution to the current address

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹PullDividendPaymentProcedureArgs, void››*

___

###  pushPayment

▸ **pushPayment**(): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹PushDividendPaymentProcedureArgs, void››*

*Defined in [src/entities/DividendDistribution.ts:205](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/DividendDistribution.ts#L205)*

Push payment for this dividend distribution

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹PushDividendPaymentProcedureArgs, void››*

___

###  toPojo

▸ **toPojo**(): *object*

*Overrides [Entity](entities.entity.md).[toPojo](entities.entity.md#abstract-topojo)*

*Defined in [src/entities/DividendDistribution.ts:250](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/DividendDistribution.ts#L250)*

Convert entity to POJO (Plain Old Javascript Object)

**Returns:** *object*

___

###  withdrawTaxes

▸ **withdrawTaxes**(): *Promise‹[TransactionQueue](entities.transactionqueue.md)‹WithdrawTaxesProcedureArgs, void››*

*Defined in [src/entities/DividendDistribution.ts:235](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/DividendDistribution.ts#L235)*

Withdraw collected taxes from this dividend distribution

**Returns:** *Promise‹[TransactionQueue](entities.transactionqueue.md)‹WithdrawTaxesProcedureArgs, void››*

___

### `Static` generateId

▸ **generateId**(`__namedParameters`: object): *string*

*Defined in [src/entities/DividendDistribution.ts:92](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/DividendDistribution.ts#L92)*

Generate the Dividend Distribution's UUID from its identifying properties

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | object |

**Returns:** *string*

___

### `Static` unserialize

▸ **unserialize**(`serialized`: string): *[UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-4.md)*

*Defined in [src/entities/DividendDistribution.ts:104](https://github.com/PolymathNetwork/polymath-sdk/blob/73ecb26/src/entities/DividendDistribution.ts#L104)*

Unserialize string to a Dividend Distribution object representation

**Parameters:**

Name | Type |
------ | ------ |
`serialized` | string |

**Returns:** *[UniqueIdentifiers](../interfaces/entities.uniqueidentifiers-4.md)*
