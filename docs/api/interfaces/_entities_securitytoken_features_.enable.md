# Interface: Enable

## Hierarchy

* **Enable**

## Callable

▸ (`args`: object): *Promise‹[TransactionQueue](../classes/_entities_transactionqueue_.transactionqueue.md)‹[EnableGeneralPermissionManagerProcedureArgs](_types_index_.enablegeneralpermissionmanagerprocedureargs.md)››*

*Defined in [src/entities/SecurityToken/Features.ts:53](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Features.ts#L53)*

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`feature` | [Permissions](../enums/_types_index_.feature.md#permissions) |

**Returns:** *Promise‹[TransactionQueue](../classes/_entities_transactionqueue_.transactionqueue.md)‹[EnableGeneralPermissionManagerProcedureArgs](_types_index_.enablegeneralpermissionmanagerprocedureargs.md)››*

▸ (`args`: object): *Promise‹[TransactionQueue](../classes/_entities_transactionqueue_.transactionqueue.md)‹[EnableGeneralTransferManagerProcedureArgs](_types_index_.enablegeneraltransfermanagerprocedureargs.md)››*

*Defined in [src/entities/SecurityToken/Features.ts:56](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Features.ts#L56)*

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`feature` | [Tokenholders](../enums/_types_index_.feature.md#tokenholders) |

**Returns:** *Promise‹[TransactionQueue](../classes/_entities_transactionqueue_.transactionqueue.md)‹[EnableGeneralTransferManagerProcedureArgs](_types_index_.enablegeneraltransfermanagerprocedureargs.md)››*

▸ (`args`: object, `opts`: [EnableErc20DividendsOpts](_entities_securitytoken_features_.enableerc20dividendsopts.md)): *Promise‹[TransactionQueue](../classes/_entities_transactionqueue_.transactionqueue.md)‹[EnableDividendManagerProcedureArgs](_types_index_.enabledividendmanagerprocedureargs.md)››*

*Defined in [src/entities/SecurityToken/Features.ts:59](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Features.ts#L59)*

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`feature` | [Dividends](../enums/_types_index_.feature.md#dividends) |

▪ **opts**: *[EnableErc20DividendsOpts](_entities_securitytoken_features_.enableerc20dividendsopts.md)*

**Returns:** *Promise‹[TransactionQueue](../classes/_entities_transactionqueue_.transactionqueue.md)‹[EnableDividendManagerProcedureArgs](_types_index_.enabledividendmanagerprocedureargs.md)››*

▸ (`args`: object, `opts`: [EnableTokenholderCountRestrictionsOpts](_entities_securitytoken_features_.enabletokenholdercountrestrictionsopts.md)): *Promise‹[TransactionQueue](../classes/_entities_transactionqueue_.transactionqueue.md)‹[EnableCountTransferManagerProcedureArgs](_types_index_.enablecounttransfermanagerprocedureargs.md)››*

*Defined in [src/entities/SecurityToken/Features.ts:62](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Features.ts#L62)*

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`feature` | [TokenholderCountRestrictions](../enums/_types_index_.feature.md#tokenholdercountrestrictions) |

▪ **opts**: *[EnableTokenholderCountRestrictionsOpts](_entities_securitytoken_features_.enabletokenholdercountrestrictionsopts.md)*

**Returns:** *Promise‹[TransactionQueue](../classes/_entities_transactionqueue_.transactionqueue.md)‹[EnableCountTransferManagerProcedureArgs](_types_index_.enablecounttransfermanagerprocedureargs.md)››*

▸ (`args`: object, `opts`: [EnablePercentageOwnershipRestrictionsOpts](_entities_securitytoken_features_.enablepercentageownershiprestrictionsopts.md)): *Promise‹[TransactionQueue](../classes/_entities_transactionqueue_.transactionqueue.md)‹[EnablePercentageTransferManagerProcedureArgs](_types_index_.enablepercentagetransfermanagerprocedureargs.md)››*

*Defined in [src/entities/SecurityToken/Features.ts:66](https://github.com/PolymathNetwork/polymath-sdk/blob/e8bbc1e/src/entities/SecurityToken/Features.ts#L66)*

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`feature` | [PercentageOwnershipRestrictions](../enums/_types_index_.feature.md#percentageownershiprestrictions) |

▪ **opts**: *[EnablePercentageOwnershipRestrictionsOpts](_entities_securitytoken_features_.enablepercentageownershiprestrictionsopts.md)*

**Returns:** *Promise‹[TransactionQueue](../classes/_entities_transactionqueue_.transactionqueue.md)‹[EnablePercentageTransferManagerProcedureArgs](_types_index_.enablepercentagetransfermanagerprocedureargs.md)››*
