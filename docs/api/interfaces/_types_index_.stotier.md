# Interface: StoTier

Represents a tier of investment in a Tiered STO.
Different tiers can sell different Security Token amounts at different prices, and apply discounts when purchasing with POLY

## Hierarchy

* **StoTier**

## Index

### Properties

* [discountedPrice](_types_index_.stotier.md#optional-discountedprice)
* [price](_types_index_.stotier.md#price)
* [tokensOnSale](_types_index_.stotier.md#tokensonsale)
* [tokensWithDiscount](_types_index_.stotier.md#optional-tokenswithdiscount)

## Properties

### `Optional` discountedPrice

• **discountedPrice**? : *BigNumber*

*Defined in [src/types/index.ts:717](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/types/index.ts#L717)*

Price of tokens sold at a discount

___

###  price

• **price**: *BigNumber*

*Defined in [src/types/index.ts:708](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/types/index.ts#L708)*

Price of each token in this tier

___

###  tokensOnSale

• **tokensOnSale**: *BigNumber*

*Defined in [src/types/index.ts:704](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/types/index.ts#L704)*

Amount of tokens to sell in this tier

___

### `Optional` tokensWithDiscount

• **tokensWithDiscount**? : *BigNumber*

*Defined in [src/types/index.ts:713](https://github.com/PolymathNetwork/polymath-sdk/blob/ade5412/src/types/index.ts#L713)*

Amount of tokens to sell at a discount if paid in POLY.
Must be less than the amount of tokens on sale
