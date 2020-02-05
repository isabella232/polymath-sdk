# Interface: StoTier

Represents a tier of investment in a Tiered STO.
Different tiers can sell different Security Token amounts at different prices, and apply discounts when purchasing with POLY

## Hierarchy

- **StoTier**

## Index

### Properties

- [discountedPrice](_types_index_.stotier.md#optional-discountedprice)
- [price](_types_index_.stotier.md#price)
- [tokensOnSale](_types_index_.stotier.md#tokensonsale)
- [tokensWithDiscount](_types_index_.stotier.md#optional-tokenswithdiscount)

## Properties

### `Optional` discountedPrice

• **discountedPrice**? : _BigNumber_

_Defined in [src/types/index.ts:717](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/types/index.ts#L717)_

Price of tokens sold at a discount

---

### price

• **price**: _BigNumber_

_Defined in [src/types/index.ts:708](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/types/index.ts#L708)_

Price of each token in this tier

---

### tokensOnSale

• **tokensOnSale**: _BigNumber_

_Defined in [src/types/index.ts:704](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/types/index.ts#L704)_

Amount of tokens to sell in this tier

---

### `Optional` tokensWithDiscount

• **tokensWithDiscount**? : _BigNumber_

_Defined in [src/types/index.ts:713](https://github.com/PolymathNetwork/polymath-sdk/blob/c47ae7a/src/types/index.ts#L713)_

Amount of tokens to sell at a discount if paid in POLY.
Must be less than the amount of tokens on sale
