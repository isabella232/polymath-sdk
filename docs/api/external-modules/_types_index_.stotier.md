# StoTier

Represents a tier of investment in a Tiered STO. Different tiers can sell different Security Token amounts at different prices, and apply discounts when purchasing with POLY

## Hierarchy

* **StoTier**

## Index

### Properties

* [discountedPrice](../interfaces/_types_index_.stotier.md#optional-discountedprice)
* [price](../interfaces/_types_index_.stotier.md#price)
* [tokensOnSale](../interfaces/_types_index_.stotier.md#tokensonsale)
* [tokensWithDiscount](../interfaces/_types_index_.stotier.md#optional-tokenswithdiscount)

## Properties

### `Optional` discountedPrice

• **discountedPrice**? : _BigNumber_

_Defined in_ [_src/types/index.ts:717_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L717)

Price of tokens sold at a discount

### price

• **price**: _BigNumber_

_Defined in_ [_src/types/index.ts:708_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L708)

Price of each token in this tier

### tokensOnSale

• **tokensOnSale**: _BigNumber_

_Defined in_ [_src/types/index.ts:704_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L704)

Amount of tokens to sell in this tier

### `Optional` tokensWithDiscount

• **tokensWithDiscount**? : _BigNumber_

_Defined in_ [_src/types/index.ts:713_](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/types/index.ts#L713)

Amount of tokens to sell at a discount if paid in POLY. Must be less than the amount of tokens on sale

