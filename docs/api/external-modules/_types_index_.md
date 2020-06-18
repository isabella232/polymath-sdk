# types/index

## Index

### Enumerations

* [ErrorCode]()
* [Feature]()
* [PolyTransactionTag]()
* [ProcedureType]()
* [SecurityTokenRole]()
* [StoRole]()
* [StoType]()
* [TransactionSpeed]()
* [TransactionStatus]()
* [TransferStatusCode]()

### Interfaces

* [ApproveErc20ProcedureArgs]()
* [AssignSecurityTokenRoleProcedureArgs]()
* [AssignStoRoleProcedureArgs]()
* [ControllerRedeemProcedureArgs]()
* [ControllerTransferProcedureArgs]()
* [CreateCheckpointProcedureArgs]()
* [CreateDividendDistributionProcedureArgs]()
* [CreateSecurityTokenProcedureArgs]()
* [CustomCurrency]()
* [DisableControllerProcedureArgs]()
* [DisableFeatureProcedureArgs]()
* [DividendTokenholderStatus]()
* [EnableCountTransferManagerProcedureArgs]()
* [EnableDividendManagerProcedureArgs]()
* [EnableGeneralPermissionManagerProcedureArgs]()
* [EnableGeneralTransferManagerProcedureArgs]()
* [EnablePercentageTransferManagerProcedureArgs]()
* [Fees]()
* [FinalizeStoProcedureArgs]()
* [FreezeIssuanceProcedureArgs]()
* [FutureLowLevelMethod]()
* [InvestInSimpleStoProcedureArgs]()
* [InvestInTieredStoBaseProcedureArgs]()
* [InvestWithStableCoinArgs]()
* [IssuanceDataEntry]()
* [IssueTokensProcedureArgs]()
* [LaunchSimpleStoProcedureArgs]()
* [LaunchTieredStoProcedureArgs]()
* [ModifyDividendsDefaultExclusionListProcedureArgs]()
* [ModifyMaxHolderCountProcedureArgs]()
* [ModifyMaxHolderPercentageProcedureArgs]()
* [ModifyPercentageExemptionsProcedureArgs]()
* [ModifyTieredStoDataProcedureArgs]()
* [ModifyTokenholderDataProcedureArgs]()
* [PercentageWhitelistEntry]()
* [Pojo]()
* [PullDividendPaymentProcedureArgs]()
* [PushDividendPaymentProcedureArgs]()
* [ReclaimFundsProcedureArgs]()
* [RemoveDocumentProcedureArgs]()
* [ReserveSecurityTokenProcedureArgs]()
* [RevokeKycProcedureArgs]()
* [SetControllerProcedureArgs]()
* [SetDividendsWalletProcedureArgs]()
* [SetDocumentProcedureArgs]()
* [SignDisableControllerAckProcedureArgs]()
* [SignFreezeIssuanceAckProcedureArgs]()
* [SignTransferDataProcedureArgs]()
* [StoTier]()
* [TaxWithholdingEntry]()
* [ToggleAllowBeneficialInvestmentsProcedureArgs]()
* [ToggleAllowPreIssuingProcedureArgs]()
* [ToggleFreezeTransfersProcedureArgs]()
* [TogglePauseStoProcedureArgs]()
* [TokenholderBalance]()
* [TokenholderDataEntry]()
* [TransactionSpec]()
* [TransferErc20ProcedureArgs]()
* [TransferOwnershipProcedureArgs]()
* [TransferReservationOwnershipProcedureArgs]()
* [TransferSecurityTokensProcedureArgs]()
* [UpdateDividendsTaxWithholdingListProcedureArgs]()
* [WithdrawTaxesProcedureArgs]()

### Type aliases

* [InvestInTieredStoProcedureArgs](_types_index_.md#investintieredstoprocedureargs)
* [LowLevelMethod](_types_index_.md#lowlevelmethod)
* [MapMaybeResolver](_types_index_.md#mapmayberesolver)
* [MaybeResolver](_types_index_.md#mayberesolver)
* [Omit](_types_index_.md#omit)
* [PostTransactionResolverArray](_types_index_.md#posttransactionresolverarray)
* [ResolverArray](_types_index_.md#resolverarray)
* [SignatureRequest](_types_index_.md#signaturerequest)

### Functions

* [isInvestWithStableCoinArgs](_types_index_.md#isinvestwithstablecoinargs)
* [isPojo](_types_index_.md#ispojo)
* [isStoType](_types_index_.md#isstotype)

## Type aliases

### InvestInTieredStoProcedureArgs

Ƭ **InvestInTieredStoProcedureArgs**: [_InvestInTieredStoBaseProcedureArgs_]() _& object \|_ [_InvestWithStableCoinArgs_]()

_Defined in_ [_src/types/index.ts:652_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L652)

Arguments for the [InvestInTieredSto]() Procedure

### LowLevelMethod

Ƭ **LowLevelMethod**: _function_

_Defined in_ [_src/types/index.ts:1499_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L1499)

Transaction method from the contract-wrappers package

#### Type declaration:

▸ \(`args`: A\): _Promise‹PolyResponse›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `args` | A |

### MapMaybeResolver

Ƭ **MapMaybeResolver**: _object_

_Defined in_ [_src/types/index.ts:1550_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L1550)

Apply the MaybeResolver type to a tuple of types

#### Type declaration:

### MaybeResolver

Ƭ **MaybeResolver**: _PostTransactionResolver‹T, any› \| T_

_Defined in_ [_src/types/index.ts:1545_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L1545)

Either a specific type or a Post Transaction Resolver that resolves to that type

### Omit

Ƭ **Omit**: _Pick‹T, Exclude‹keyof T, K››_

_Defined in_ [_src/types/index.ts:1492_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L1492)

Return the type that results from excluding a property from another type

### PostTransactionResolverArray

Ƭ **PostTransactionResolverArray**: _object_

_Defined in_ [_src/types/index.ts:1538_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L1538)

Transforms a tuple of types into an array of Post Transaction Resolvers. For each type in the tuple, the corresponding Post Transaction Resolver resolves to that type

#### Type declaration:

### ResolverArray

Ƭ **ResolverArray**: _object_

_Defined in_ [_src/types/index.ts:1529_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L1529)

Transforms a tuple of types into an array of resolver functions. For each type in the tuple, the corresponding resolver function returns that type wrapped in a promise

#### Type declaration:

### SignatureRequest

Ƭ **SignatureRequest**: _function_

_Defined in_ [_src/types/index.ts:1506_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L1506)

Signature request method from the contract-wrappers package

#### Type declaration:

▸ \(`args`: A\): _Promise‹string›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `args` | A |

## Functions

### isInvestWithStableCoinArgs

▸ **isInvestWithStableCoinArgs**\(`args`: any\): _args is InvestWithStableCoinArgs_

_Defined in_ [_src/types/index.ts:690_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L690)

Check whether the arguments are of type [InvestWithStableCoinArgs]()

**Parameters:**

| Name | Type |
| :--- | :--- |
| `args` | any |

**Returns:** _args is InvestWithStableCoinArgs_

### isPojo

▸ **isPojo**\(`pojo`: any\): _pojo is Pojo_

_Defined in_ [_src/types/index.ts:1427_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L1427)

Check to see if an object is a Plain Old Javascript Object \(POJO\)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `pojo` | any |

**Returns:** _pojo is Pojo_

### isStoType

▸ **isStoType**\(`type`: any\): _type is StoType_

_Defined in_ [_src/types/index.ts:58_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/types/index.ts#L58)

Check if the argument is of type \[\[STOType\]\]

**Parameters:**

| Name | Type |
| :--- | :--- |
| `type` | any |

**Returns:** _type is StoType_

