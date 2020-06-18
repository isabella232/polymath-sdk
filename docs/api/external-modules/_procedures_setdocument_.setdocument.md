# SetDocument

Procedure that adds a document to a Security Token

## Type parameters

▪ **ReturnType**

## Hierarchy

* Procedure‹[SetDocumentProcedureArgs]()›

  ↳ **SetDocument**

## Index

### Constructors

* [constructor]()

### Properties

* [args]()
* [context]()
* [type]()

### Methods

* [addProcedure]()
* [addSignatureRequest]()
* [addTransaction]()
* [prepare]()
* [prepareTransactions]()

## Constructors

### constructor

+ **new SetDocument**\(`args`: [SetDocumentProcedureArgs](), `context`: [Context]()\): [_SetDocument_]()

_Inherited from void_

_Defined in_ [_src/procedures/Procedure.ts:40_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/procedures/Procedure.ts#L40)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `args` | [SetDocumentProcedureArgs]() |
| `context` | [Context]() |

**Returns:** [_SetDocument_]()

## Properties

### `Protected` args

• **args**: [_SetDocumentProcedureArgs_]()

_Inherited from void_

_Defined in_ [_src/procedures/Procedure.ts:34_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/procedures/Procedure.ts#L34)

### `Protected` context

• **context**: [_Context_]()

_Inherited from void_

_Defined in_ [_src/procedures/Procedure.ts:36_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/procedures/Procedure.ts#L36)

### type

• **type**: [_ProcedureType_]() = ProcedureType.SetDocument

_Overrides void_

_Defined in_ [_src/procedures/SetDocument.ts:10_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/procedures/SetDocument.ts#L10)

## Methods

### addProcedure

▸ **addProcedure**&lt;**A**, **R**&gt;\(`Proc`: [ProcedureClass]()‹A, R›\): _\(Anonymous function\)_

_Inherited from void_

_Defined in_ [_src/procedures/Procedure.ts:91_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/procedures/Procedure.ts#L91)

Appends a Procedure into the TransactionQueue's queue. This defines what will be run by the TransactionQueue when it is started.

**Type parameters:**

▪ **A**

▪ **R**: _any_

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `Proc` | [ProcedureClass]()‹A, R› | A Procedure that will be run in the Procedure's TransactionQueue |

**Returns:** _\(Anonymous function\)_

whichever value is returned by the Procedure

### addSignatureRequest

▸ **addSignatureRequest**&lt;**A**&gt;\(`request`: [SignatureRequest](_types_index_.md#signaturerequest)‹A›\): _\(Anonymous function\)_

_Inherited from void_

_Defined in_ [_src/procedures/Procedure.ts:179_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/procedures/Procedure.ts#L179)

Appends a signature request into the TransactionQueue's queue. This defines what will be run by the TransactionQueue when it is started.

**Type parameters:**

▪ **A**

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| `request` | [SignatureRequest](_types_index_.md#signaturerequest)‹A› | A signature request that will be run in the Procedure's TransactionQueue |

**Returns:** _\(Anonymous function\)_

a PostTransactionResolver that resolves to the signed data

### addTransaction

▸ **addTransaction**&lt;**A**, **R**, **V**&gt;\(`method`: [LowLevelMethod](_types_index_.md#lowlevelmethod)‹A› \| [FutureLowLevelMethod]()‹V, A›, `__namedParameters`: object\): _\(Anonymous function\)_

_Inherited from void_

_Defined in_ [_src/procedures/Procedure.ts:137_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/procedures/Procedure.ts#L137)

Appends a method or future method into the TransactionQueue's queue. This defines what will be run by the TransactionQueue when it is started.

**Type parameters:**

▪ **A**

▪ **R**: _any\[\]_

▪ **V**: _any_

**Parameters:**

▪ **method**: [_LowLevelMethod_](_types_index_.md#lowlevelmethod)_‹A› \|_ [_FutureLowLevelMethod_]()_‹V, A›_

A method \(or future method\) that will be run in the Procedure's TransactionQueue. A future method is a transaction that doesn't exist at prepare time \(for example a transaction on a module that hasn't been attached but will be by the time the previous transactions are run\)

▪`Default value` **\_\_namedParameters**: _object_= {}

| Name | Type | Default |
| :--- | :--- | :--- |
| `fees` | undefined \| [Fees]() | - |
| `resolvers` | object | \(\[\] as unknown\) as ResolverArray |
| `tag` | undefined \| [Any]() \| [GetTokens]() \| [ApproveErc20]() \| [TransferErc20]() \| [ReserveSecurityToken]() \| [CreateSecurityToken]() \| [CreateCheckpoint]() \| [CreateErc20DividendDistribution]() \| [SetErc20TaxWithholding]() \| [SetEtherTaxWithholding]() \| [SetDefaultExcluded]() \| [EnableDividends]() \| [EnableCappedSto]() \| [EnableTieredSto]() \| [EnableGeneralPermissionManager]() \| [EnableGeneralTransferManager]() \| [EnableCountTransferManager]() \| [EnablePercentageTransferManager]() \| [DisableController]() \| [FreezeIssuance]() \| [DisableFeature]() \| [ReclaimDividendFunds]() \| [WithdrawTaxWithholdings]() \| [PushDividendPayment]() \| [PullDividendPayment]() \| [SetDividendsWallet]() \| [AddDelegate]() \| [ChangePermission]() \| [ControllerTransfer]() \| [ControllerRedeem]() \| [PauseSto]() \| [UnpauseSto]() \| [FinalizeSto]() \| [SetController]() \| [SetDocument]() \| [RemoveDocument]() \| [ModifyKycDataMulti]() \| [ModifyInvestorFlagMulti]() \| [IssueMulti]() \| [AllowPreMinting]() \| [RevokePreMinting]() \| [ChangeAllowBeneficialInvestments]() \| [ModifyTimes]() \| [ModifyFunding]() \| [ModifyAddresses]() \| [ModifyTiers]() \| [ModifyLimits]() \| [ModifyOracles]() \| [BuyWithScRateLimited]() \| [BuyWithPolyRateLimited]() \| [BuyWithEthRateLimited]() \| [BuyTokens]() \| [BuyTokensWithPoly]() \| [ChangeHolderCount]() \| [ChangeHolderPercentage]() \| [ModifyWhitelistMulti]() \| [SetAllowPrimaryIssuance]() \| [TransferSecurityTokens]() \| [UnfreezeTransfers]() \| [FreezeTransfers]() \| [Signature]() \| [TransferReservationOwnership]() \| [TransferOwnership]() | - |

**Returns:** _\(Anonymous function\)_

a PostTransactionResolver that resolves to the value returned by the resolver function, or undefined if no resolver function was passed

### prepare

▸ **prepare**\(\): _Promise‹_[_TransactionQueue_]()_‹Args, ReturnType››_

_Inherited from void_

_Defined in_ [_src/procedures/Procedure.ts:52_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/procedures/Procedure.ts#L52)

Mandatory method that builds a list of transactions that will be run

**Returns:** _Promise‹_[_TransactionQueue_]()_‹Args, ReturnType››_

### prepareTransactions

▸ **prepareTransactions**\(\): _Promise‹void›_

_Overrides void_

_Defined in_ [_src/procedures/SetDocument.ts:20_](https://github.com/PolymathNetwork/polymath-sdk/blob/550676f/src/procedures/SetDocument.ts#L20)

Set a document on the Security Token

Note that this procedure will fail if:

* The current wallet is not the Security Token owner
* The name of the document is less than 1 or more than 32 characters long
* The document hash is less than 1 or more than 32 characters long

**Returns:** _Promise‹void›_

