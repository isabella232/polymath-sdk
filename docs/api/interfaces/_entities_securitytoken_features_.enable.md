# Interface: Enable

## Hierarchy

- **Enable**

## Callable

▸ (`args`: object): _Promise‹[TransactionQueue](../classes/_entities_transactionqueue_.transactionqueue.md)‹[EnableGeneralPermissionManagerProcedureArgs](_types_index_.enablegeneralpermissionmanagerprocedureargs.md)››_

_Defined in [src/entities/SecurityToken/Features.ts:53](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Features.ts#L53)_

**Parameters:**

▪ **args**: _object_

| Name      | Type                                                         |
| --------- | ------------------------------------------------------------ |
| `feature` | [Permissions](../enums/_types_index_.feature.md#permissions) |

**Returns:** _Promise‹[TransactionQueue](../classes/_entities_transactionqueue_.transactionqueue.md)‹[EnableGeneralPermissionManagerProcedureArgs](_types_index_.enablegeneralpermissionmanagerprocedureargs.md)››_

▸ (`args`: object): _Promise‹[TransactionQueue](../classes/_entities_transactionqueue_.transactionqueue.md)‹[EnableGeneralTransferManagerProcedureArgs](_types_index_.enablegeneraltransfermanagerprocedureargs.md)››_

_Defined in [src/entities/SecurityToken/Features.ts:56](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Features.ts#L56)_

**Parameters:**

▪ **args**: _object_

| Name      | Type                                                           |
| --------- | -------------------------------------------------------------- |
| `feature` | [Shareholders](../enums/_types_index_.feature.md#shareholders) |

**Returns:** _Promise‹[TransactionQueue](../classes/_entities_transactionqueue_.transactionqueue.md)‹[EnableGeneralTransferManagerProcedureArgs](_types_index_.enablegeneraltransfermanagerprocedureargs.md)››_

▸ (`args`: object, `opts`: [EnableErc20DividendsOpts](_entities_securitytoken_features_.enableerc20dividendsopts.md)): _Promise‹[TransactionQueue](../classes/_entities_transactionqueue_.transactionqueue.md)‹[EnableDividendManagerProcedureArgs](_types_index_.enabledividendmanagerprocedureargs.md)››_

_Defined in [src/entities/SecurityToken/Features.ts:59](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Features.ts#L59)_

**Parameters:**

▪ **args**: _object_

| Name      | Type                                                     |
| --------- | -------------------------------------------------------- |
| `feature` | [Dividends](../enums/_types_index_.feature.md#dividends) |

▪ **opts**: _[EnableErc20DividendsOpts](_entities_securitytoken_features_.enableerc20dividendsopts.md)_

**Returns:** _Promise‹[TransactionQueue](../classes/_entities_transactionqueue_.transactionqueue.md)‹[EnableDividendManagerProcedureArgs](_types_index_.enabledividendmanagerprocedureargs.md)››_

▸ (`args`: object, `opts`: [EnableShareholderCountRestrictionsOpts](_entities_securitytoken_features_.enableshareholdercountrestrictionsopts.md)): _Promise‹[TransactionQueue](../classes/_entities_transactionqueue_.transactionqueue.md)‹[EnableCountTransferManagerProcedureArgs](_types_index_.enablecounttransfermanagerprocedureargs.md)››_

_Defined in [src/entities/SecurityToken/Features.ts:62](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Features.ts#L62)_

**Parameters:**

▪ **args**: _object_

| Name      | Type                                                                                           |
| --------- | ---------------------------------------------------------------------------------------------- |
| `feature` | [ShareholderCountRestrictions](../enums/_types_index_.feature.md#shareholdercountrestrictions) |

▪ **opts**: _[EnableShareholderCountRestrictionsOpts](_entities_securitytoken_features_.enableshareholdercountrestrictionsopts.md)_

**Returns:** _Promise‹[TransactionQueue](../classes/_entities_transactionqueue_.transactionqueue.md)‹[EnableCountTransferManagerProcedureArgs](_types_index_.enablecounttransfermanagerprocedureargs.md)››_

▸ (`args`: object, `opts`: [EnablePercentageOwnershipRestrictionsOpts](_entities_securitytoken_features_.enablepercentageownershiprestrictionsopts.md)): _Promise‹[TransactionQueue](../classes/_entities_transactionqueue_.transactionqueue.md)‹[EnablePercentageTransferManagerProcedureArgs](_types_index_.enablepercentagetransfermanagerprocedureargs.md)››_

_Defined in [src/entities/SecurityToken/Features.ts:66](https://github.com/PolymathNetwork/polymath-sdk/blob/a1cd5e3/src/entities/SecurityToken/Features.ts#L66)_

**Parameters:**

▪ **args**: _object_

| Name      | Type                                                                                                 |
| --------- | ---------------------------------------------------------------------------------------------------- |
| `feature` | [PercentageOwnershipRestrictions](../enums/_types_index_.feature.md#percentageownershiprestrictions) |

▪ **opts**: _[EnablePercentageOwnershipRestrictionsOpts](_entities_securitytoken_features_.enablepercentageownershiprestrictionsopts.md)_

**Returns:** _Promise‹[TransactionQueue](../classes/_entities_transactionqueue_.transactionqueue.md)‹[EnablePercentageTransferManagerProcedureArgs](_types_index_.enablepercentagetransfermanagerprocedureargs.md)››_
