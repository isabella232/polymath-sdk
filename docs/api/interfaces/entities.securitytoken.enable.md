# Interface: Enable

## Hierarchy

* **Enable**

## Callable

▸ (`args`: object): *Promise‹[TransactionQueue](../classes/entities.transactionqueue.md)‹[EnableGeneralPermissionManagerProcedureArgs](_types_index_.enablegeneralpermissionmanagerprocedureargs.md)››*

*Defined in [src/entities/SecurityToken/Features.ts:58](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/Features.ts#L58)*

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`feature` | [Permissions](../enums/_types_index_.feature.md#permissions) |

**Returns:** *Promise‹[TransactionQueue](../classes/entities.transactionqueue.md)‹[EnableGeneralPermissionManagerProcedureArgs](_types_index_.enablegeneralpermissionmanagerprocedureargs.md)››*

▸ (`args`: object): *Promise‹[TransactionQueue](../classes/entities.transactionqueue.md)‹[EnableGeneralTransferManagerProcedureArgs](_types_index_.enablegeneraltransfermanagerprocedureargs.md)››*

*Defined in [src/entities/SecurityToken/Features.ts:61](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/Features.ts#L61)*

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`feature` | [Shareholders](../enums/_types_index_.feature.md#shareholders) |

**Returns:** *Promise‹[TransactionQueue](../classes/entities.transactionqueue.md)‹[EnableGeneralTransferManagerProcedureArgs](_types_index_.enablegeneraltransfermanagerprocedureargs.md)››*

▸ (`args`: object, `opts`: [EnableErc20DividendsOpts](entities.securitytoken.enableerc20dividendsopts.md)): *Promise‹[TransactionQueue](../classes/entities.transactionqueue.md)‹[EnableDividendManagerProcedureArgs](_types_index_.enabledividendmanagerprocedureargs.md)››*

*Defined in [src/entities/SecurityToken/Features.ts:64](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/Features.ts#L64)*

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`feature` | [Dividends](../enums/_types_index_.feature.md#dividends) |

▪ **opts**: *[EnableErc20DividendsOpts](entities.securitytoken.enableerc20dividendsopts.md)*

**Returns:** *Promise‹[TransactionQueue](../classes/entities.transactionqueue.md)‹[EnableDividendManagerProcedureArgs](_types_index_.enabledividendmanagerprocedureargs.md)››*

▸ (`args`: object, `opts`: [EnableShareholderCountRestrictionsOpts](entities.securitytoken.enableshareholdercountrestrictionsopts.md)): *Promise‹[TransactionQueue](../classes/entities.transactionqueue.md)‹[EnableCountTransferManagerProcedureArgs](_types_index_.enablecounttransfermanagerprocedureargs.md)››*

*Defined in [src/entities/SecurityToken/Features.ts:67](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/Features.ts#L67)*

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`feature` | [ShareholderCountRestrictions](../enums/_types_index_.feature.md#shareholdercountrestrictions) |

▪ **opts**: *[EnableShareholderCountRestrictionsOpts](entities.securitytoken.enableshareholdercountrestrictionsopts.md)*

**Returns:** *Promise‹[TransactionQueue](../classes/entities.transactionqueue.md)‹[EnableCountTransferManagerProcedureArgs](_types_index_.enablecounttransfermanagerprocedureargs.md)››*

▸ (`args`: object, `opts`: [EnablePercentageOwnershipRestrictionsOpts](entities.securitytoken.enablepercentageownershiprestrictionsopts.md)): *Promise‹[TransactionQueue](../classes/entities.transactionqueue.md)‹[EnablePercentageTransferManagerProcedureArgs](_types_index_.enablepercentagetransfermanagerprocedureargs.md)››*

*Defined in [src/entities/SecurityToken/Features.ts:71](https://github.com/PolymathNetwork/polymath-sdk/blob/454d285/src/entities/SecurityToken/Features.ts#L71)*

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`feature` | [PercentageOwnershipRestrictions](../enums/_types_index_.feature.md#percentageownershiprestrictions) |

▪ **opts**: *[EnablePercentageOwnershipRestrictionsOpts](entities.securitytoken.enablepercentageownershiprestrictionsopts.md)*

**Returns:** *Promise‹[TransactionQueue](../classes/entities.transactionqueue.md)‹[EnablePercentageTransferManagerProcedureArgs](_types_index_.enablepercentagetransfermanagerprocedureargs.md)››*
